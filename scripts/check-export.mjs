import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname, sep } from "node:path";
import assert from "node:assert/strict";
import { publishedProducts } from "../src/data/products.ts";
import { productCategories } from "../src/data/product-categories.ts";
import { publishedProjects } from "../src/data/projects.ts";
import { publishedClients } from "../src/data/clients.ts";
import { publishedPartners } from "../src/data/partners.ts";
import { publishedSolutions, getRelatedSolutions, getSolution } from "../src/data/solutions.ts";
import { contactActions } from "../src/lib/contact.ts";
import { deployment } from "../src/lib/deployment.ts";
import { publicContentPaths } from "../src/lib/routes.ts";
const root = resolve("out");
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(resolve(directory, entry.name))
          : resolve(directory, entry.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const pages = files.filter((file) => file.endsWith(".html"));
const links = new Set();
const contentRoutes = [
  "",
  "about",
  "solutions",
  ...publishedSolutions.map((item) => `solutions/${item.slug}`),
  "products",
  "projects",
  "clients-partners",
  "contact",
  ...publishedProducts.map((item) => `products/${item.slug}`),
  ...productCategories.map((category) => `products/category/${category.id}`),
  ...publishedProjects.map((item) => `projects/${item.slug}`),
];
const titles = new Set();
const descriptions = new Set();
for (const route of contentRoutes) {
  const html = await readFile(resolve(root, route, "index.html"), "utf8");
  assert.equal(
    [...html.matchAll(/<h1(?:\s|>)/g)].length,
    1,
    `Expected one H1: ${route}`,
  );
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(
    /<meta name="description" content="([^"]+)"/,
  )?.[1];
  assert(title && !titles.has(title), `Missing or duplicate title: ${route}`);
  assert(
    description && !descriptions.has(description),
    `Missing or duplicate description: ${route}`,
  );
  titles.add(title);
  descriptions.add(description);
  assert(html.includes('property="og:title"'), `Missing social metadata: ${route}`);
  assert(html.includes('name="twitter:card"'), `Missing social summary: ${route}`);
  if (deployment.url) assert(html.includes(`rel="canonical" href="${new URL(route ? `/${route}/` : "/", deployment.url).href}"`), `Canonical mismatch: ${route}`);
  else assert(!html.includes('rel="canonical"'), `Invented canonical: ${route}`);
  assert(
    !html.includes("STAGING PAGE"),
    `Unexpected staging content: ${route}`,
  );
  if (route.startsWith("solutions/")) {
    assert.equal(
      [...html.matchAll(/<details(?:\s|>)/g)].length,
      4,
      `Missing accessible FAQs: ${route}`,
    );
    assert(
      html.includes('aria-label="Breadcrumb"'),
      `Missing breadcrumb: ${route}`,
    );
    const slug = route.split("/").at(-1);
    if (slug && getSolution(slug) && getRelatedSolutions(getSolution(slug)).length)
      assert(html.includes("RELATED SOLUTIONS"), `Missing related solutions: ${route}`);
  }
}
for (const page of pages) {
  const html = await readFile(page, "utf8");
  assert(!html.includes("Create Next App"), `Starter content in ${page}`);
  const alwaysNoindex = /(?:privacy|404|_not-found)/.test(page);
  assert(html.includes(`name="robots" content="${deployment.indexable && !alwaysNoindex ? "index, follow" : "noindex, nofollow"}"`), `Incorrect indexing policy: ${page}`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    assert(href !== "#", `Empty link in ${page}`);
    const url = new URL(href, "https://local.invalid/");
    const pathname = href.startsWith("#")
      ? ""
      : decodeURIComponent(url.pathname);
    const fragment = url.hash.slice(1);
    let target = pathname.startsWith("/")
      ? resolve(root, "." + pathname)
      : pathname
        ? resolve(dirname(page), pathname)
        : page;
    if ((await stat(target)).isDirectory())
      target = resolve(target, "index.html");
    await stat(target);
    if (fragment)
      assert(
        (await readFile(target, "utf8")).includes(`id="${fragment}"`),
        `Missing anchor ${href}`,
      );
    links.add(href);
  }
}
assert(pages.length >= contentRoutes.length, "Missing expected static pages");
assert(productCategories.every((category) => publishedProducts.some((product) => product.categoryId === category.id)), "Every documented catalog category must contain at least one record");
for (const product of publishedProducts) assert(files.some((file) => file.includes("products" + sep + product.slug + sep + "index.html")), `Missing product route: ${product.slug}`);
const catalogHtml = await readFile(
  resolve(root, "products/index.html"),
  "utf8",
);
for (const control of [
  "catalog-search",
  "catalog-category",
  "catalog-sort",
  "catalog-results",
])
  assert(
    catalogHtml.includes(`id="${control}"`),
    `Missing catalog control ${control}`,
  );
assert(catalogHtml.includes("division attribution") || catalogHtml.includes("Division attribution"), "Catalog attribution note missing");
if (!contactActions().length) {
  for (const page of pages) {
    const html = await readFile(page, "utf8");
    assert(!/href="(?:mailto:|tel:|https:\/\/wa.me\/)/.test(html), `Unconfigured contact action: ${page}`);
  }
}
const contactHtml = await readFile(resolve(root, "contact/index.html"), "utf8");
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(sitemapUrls.sort(), deployment.indexable ? publicContentPaths.map((path) => new URL(path, deployment.url).href).sort() : [], "Sitemap must contain only indexable, published URLs");
const robots = await readFile(resolve(root, "robots.txt"), "utf8");
assert(robots.includes("Allow: /"), "Crawlers need access to noindex directives");
assert.equal(robots.includes("Sitemap:"), deployment.indexable, "Only production advertises sitemap");
assert.equal([...contactHtml.matchAll(/<details(?:\s|>)/g)].length, 4, "Missing contact FAQs");
assert(!contactHtml.includes("<form"), "Contact page must not have a non-operational form");
for (const route of ["products", "projects"]) {
  const allowed = contentRoutes
    .filter((path) => path === route || path.startsWith(route + "/"))
    .map((path) => resolve(root, path, "index.html"));
  assert(
    !pages.some(
      (file) =>
        file.startsWith(resolve(root, route) + sep) && !allowed.includes(file),
    ),
    `Unexpected unapproved ${route} detail export`,
  );
}
if (!publishedProjects.length)
  assert(
    (await readFile(resolve(root, "projects/index.html"), "utf8")).includes(
      "PROJECT PUBLICATION PENDING",
    ),
  );
const relationships = await readFile(
  resolve(root, "clients-partners/index.html"),
  "utf8",
);
if (!publishedClients.length)
  assert(relationships.includes("Client references awaiting approval"));
if (!publishedPartners.length)
  assert(relationships.includes("Partner details awaiting confirmation"));
console.log(
  `PASS: ${pages.length} HTML pages, ${links.size} unique local links/assets resolve; ${contentRoutes.length} content routes have unique metadata and one H1; solution FAQs/breadcrumbs, catalog controls, pending-record states, and indexing policy verified.`,
);
