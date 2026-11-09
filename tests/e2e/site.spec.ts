import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/about/", "/solutions/", "/products/", "/projects/", "/clients-partners/", "/contact/", "/privacy/", "/solutions/queue-management/", "/products/tf-70-biometric-terminal/", "/products/pos-touch-system/", "/products/ess-queue-management-system/", "/products/es-900p-weatherproof-camera/", "/products/outdoor-p4-led-module/", "/products/techno-smart-lockers/", "/products/wallers-cnc-laser-cutting/", "/products/solar-panels/", "/products/multimedia-projector/"];
const widths = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920];
const responsiveRoutes = ["/", "/about/", "/solutions/", "/products/", "/products/es-900p-weatherproof-camera/", "/projects/", "/clients-partners/", "/contact/"];

for (const width of widths) {
  test(`all routes fit viewport ${width}px and load without runtime errors`, async ({ context }) => {
    test.setTimeout(90000);
    const errors: string[] = [];
    for (const route of responsiveRoutes) {
      // Isolate each layout observation from canceled prefetch requests during
      // document replacement. Real client navigation is exercised separately.
      const page = await context.newPage();
      await page.setViewportSize({ width, height: 900 });
      page.on("pageerror", (error) => errors.push(`${route}: ${error.message}`));
      page.on("console", (message) => { if (message.type() === "error") errors.push(`${route}: ${message.text()}`); });
      const response = await page.goto(route);
      await page.waitForLoadState("networkidle");
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), { message: `${route} overflows at ${width}px` }).toBe(true);
      expect(await page.locator("img").evaluateAll((images) => images.filter((image) => image instanceof HTMLImageElement && (!image.complete || image.naturalWidth === 0)).map((image) => image.getAttribute("src"))), route).toEqual([]);
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.waitForLoadState("networkidle");
      expect(await page.locator("footer").evaluate((element) => element.getBoundingClientRect().right <= window.innerWidth + 1), route).toBe(true);
      page.removeAllListeners("console");
      page.removeAllListeners("pageerror");
      await page.close();
    }
    expect(errors).toEqual([]);
  });
}

for (const width of [390, 1440]) test(`WCAG A/AA scan of every route at ${width}px`, async ({ page }) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width, height: 900 });
  for (const route of responsiveRoutes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) })), route).toEqual([]);
  }
});

test("mobile menu contains focus, closes with Escape, restores focus, and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close navigation" })).toBeFocused();
  for (let i = 0; i < 17; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Products", exact: true }).click();
  await expect(page).toHaveURL(/\/products\/$/);
  await expect(dialog).not.toBeVisible();
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(dialog).not.toBeVisible();
});

test("desktop navigation, dropdown and skip link work with keyboard", async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  // WebKit's platform default skips links with plain Tab; focus the skip link
  // directly there, then verify its keyboard activation and destination.
  if (browserName === "webkit") await page.getByRole("link", { name: "Skip to content" }).focus();
  else await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const trigger = page.getByRole("button", { name: "Solution categories" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  if (browserName === "webkit") await page.locator("#solutions-dropdown a").first().focus();
  else await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/solutions\/[^/]+\/$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  for (const [name, path] of [["Home", "/"], ["About Us", "/about/"], ["Products", "/products/"], ["Projects", "/projects/"], ["Clients & Partners", "/clients-partners/"], ["Contact Us", "/contact/"]]) {
    await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(path === "/" ? "/$" : `${path}$`));
  }
});

test("catalog search, combined filters, sort, counts, reset, and detail links", async ({ page }) => {
  await page.goto("/products/");
  const search = page.getByLabel("Search products", { exact: true });
  const status = page.getByRole("status");
  await expect(status).toContainText("113 of 113");
  await search.fill("  ES-900P  ");
  await expect(status).toContainText("1 of 113");
  await expect(page.getByRole("heading", { name: "ES-900P Weatherproof Color IR Camera" })).toBeVisible();
  await page.getByLabel("Category", { exact: true }).selectOption("cctv-surveillance");
  await expect(status).toContainText("1 of 113");
  await page.getByLabel("Category", { exact: true }).selectOption("pos-retail");
  await expect(status).toContainText("0 of 113");
  await expect(page.getByRole("heading", { name: "No matching products." })).toBeVisible();
  await page.getByRole("button", { name: "Reset search & filters" }).click();
  await expect(search).toBeFocused();
  await expect(status).toContainText("113 of 113");
  const headings = page.locator("#catalog-results h3");
  const ascending = await headings.allTextContents();
  await page.getByLabel("Sort by").selectOption("name-desc");
  expect(await headings.allTextContents()).toEqual([...ascending].reverse());
  await page.getByLabel("Sort by").selectOption("category");
  await page.getByLabel("Category", { exact: true }).selectOption("queue-management");
  await expect(status).toContainText("4 of 113");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(status).toContainText("113 of 113");
  await expect(page.getByRole("button", { name: "Clear filters" })).toBeDisabled();
  await page.locator("#catalog-results .text-link").first().click();
  await expect(page).toHaveURL(/\/products\/[^/]+\/$/);
});

test("FAQs, pending contact and portfolio states, and custom 404s", async ({ page }) => {
  for (const route of ["/contact/", ...routes.filter((path) => path.startsWith("/solutions/" ) && path !== "/solutions/")]) {
    await page.goto(route);
    const faq = page.locator("details").first();
    await faq.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(faq).toHaveAttribute("open", "");
    await page.keyboard.press("Enter");
    await expect(faq).not.toHaveAttribute("open");
  }
  await page.goto("/contact/");
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me/"]')).toHaveCount(0);
  await page.goto("/projects/");
  await expect(page.getByText("PROJECT PUBLICATION PENDING")).toBeVisible();
  await expect(page.locator("#project-solution")).toHaveCount(0);
  for (const path of ["/missing/", "/products/unapproved/", "/projects/unapproved/", "/solutions/unknown/", "/solutions/cctv-surveillance/"]) {
    expect((await page.goto(path))?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  }
});

test("reduced motion and representative review screenshots", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/products/", "/contact/"]) {
      await page.goto(route);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
      await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll("/", "") || "home"}-${width}.png`), fullPage: true });
    }
  }
});
