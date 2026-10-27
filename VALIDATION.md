# ESSCOM validation

## Phase 5 — 27 October 2026

Executed locally on Windows with Node 24.17.0, Next.js 16.4.3, installed Chrome 156, Playwright 1.64.1, and Playwright WebKit 27.2. Earlier phase records below are historical; this section supersedes their browser-testing limitations for currently published routes.

| Check | Executed result |
| --- | --- |
| TypeScript and ESLint | PASS; strict typecheck and lint with zero warnings. |
| Unit/rendering tests | PASS, 25 tests covering catalog logic, publication gates, data references, templates, contact encoding, deployment policy, and Windows export aliases. |
| Production build and export | PASS; static output contains 16 HTML files, including custom/internal 404 output. No backend runtime is required. |
| Export validation | PASS; 32 unique local link/asset targets, 12 content routes with metadata, one H1, contact/publication gates, robots/sitemap and indexing policy. Privacy is checked separately and remains noindex. |
| Indexing build matrix | PASS; explicit production URL/indexing, Vercel preview overriding production indexing/canonical, and restored actual staging configuration. Fixture origins are not left in the final export. |
| Static HTTP checks | PASS; 13 public routes and 15 assets return 200; five unknown/unpublished destinations return custom 404s. |
| Browser suite | PASS, 32 aggregate tests in 4.2 minutes across Chrome and WebKit. |
| Responsive coverage | PASS; 13 routes × nine widths × two engines = 234 route/viewport observations, checking horizontal overflow, headings, image loading, footer bounds, runtime errors and console errors. Widths: 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px. |
| Automated accessibility | PASS; 52 axe scans across all 13 routes at 390px and 1440px in both engines, with no violations of the selected WCAG A/AA and 2.1 A/AA rules. This is not a claim of complete accessibility conformance. |
| Interactions | PASS; modal focus containment, Escape/focus restoration, route/resize closing, desktop navigation/dropdown, skip link, search normalization, combined filters, sorting, counts, reset, no-results state, solution links, FAQ keyboard toggles, reduced motion and custom 404s. |
| Asset budgets | PASS; initial modern JavaScript 150,263 gzip bytes, CSS 9,207 gzip bytes, local font 48,256 bytes, HTML 22,490 gzip bytes. |
| Runtime dependency audit | PASS; zero reported vulnerabilities in the executed production-dependency audit. |
| Development server | PASS; ready in 1.463 seconds, HTTP 200 for Home, Contact and Queue Management. The task-owned server was stopped after verification. |

Representative Home, Products and Contact screenshots were generated at 320, 390, 768, 1440 and 1920px in both engines. Desktop Products and desktop/mobile Contact screenshots received visual review. Full-height mobile Home capture is too tall for detailed review at its rendered preview size; measured browser assertions provide the responsive coverage above.

Lighthouse 13.5.0 used one cold navigation per sampled route, default simulated mobile conditions, and a local gzip-enabled static server. Home/Products/Contact scored Performance **94/96/97**, Accessibility **100/100/100**, Best Practices **100/100/100**, and SEO **63/63/63**. LCP was **2.56/2.53/2.37 seconds**, CLS **0** on all samples, and TBT **194/114/94 ms**. Home and Products narrowly missed the LCP target. SEO is reduced by intentional staging noindex. **INP was not measured**; TBT is not an INP substitute. These are local lab results, not deployed or field measurements. See PHASE5_REPORT.md for conditions and baseline limitations.

### Remaining validation boundaries

- No approved product models, installation projects, or client/partner logos are published. Public detail-gallery interactions, populated project filtering and external relationship links remain pending real approved records; isolated fixtures test templates and selectors without publishing them.
- All contact details remain unconfigured. URL encoding and unavailable-channel behavior are tested; actual message delivery, phone calls and directions were not attempted.
- WebKit on Windows is not a physical iPhone/Safari test. Android/iPhone device checks, assistive-technology review, and Safari OS keyboard preferences remain manual follow-ups. WebKit's default Tab behavior skips ordinary links; keyboard activation tests explicitly focus those links, while Chrome also checks normal Tab traversal.
- Browser route observations use fresh pages and detach error listeners only during page disposal to avoid classifying canceled prefetches from document teardown as application failures. Client-side navigation is exercised separately.
- No Vercel deployment or hosted URL exists. HTTPS, CDN caching/compression, preview protection and live-route checks remain pending authorized commercial account/project access.
- Raw Playwright reports, screenshots and Lighthouse JSON are retained in ignored local test-results/, playwright-report/ and artifacts/ directories. No Phase 6 image extraction was performed.

## Phase 3 — 26 October 2026

Validated with Node.js 24.17.0 and the existing dependency set. No application or test packages were added.

| Check                  | Actual result                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`    | PASS. Next route types and TypeScript `--noEmit`, including templates that are not currently published.                                                                                                                                                                                                                                                                                                 |
| `npm run lint`         | PASS. Application, scripts, and tests; zero warnings.                                                                                                                                                                                                                                                                                                                                                   |
| `npm test`             | PASS: 13 tests. Case/whitespace normalization; name/category/keyword/model search; combined filters and empty results; reset state; all three sorts; non-mutating filtering; current equipment data and links; publication gates; related products; portfolio filters; inquiry encoding; ID/reference checks; conditional route discovery; isolated product/project rendering; approved gallery markup. |
| Production build       | PASS after resolving the empty dynamic-route export constraint. Next.js produces the static `out/` site.                                                                                                                                                                                                                                                                                                |
| `npm run check:export` | PASS. 16 HTML files, 32 unique local links/assets, 11 developed routes with unique metadata and one H1. Checks solution FAQs/breadcrumbs, catalog controls, pending publication states, withheld detail routes, and preview noindex.                                                                                                                                                                    |
| Static HTTP checks     | PASS. 13 public URLs and 13 static assets returned HTTP 200. Missing page, unknown solution, unpublished IT category, unpublished product, and unpublished project URLs returned the custom 404.                                                                                                                                                                                                        |
| Development server     | Existing server on port 3000 returned HTTP 200 for Products, Projects, and Clients & Partners without staging labels. An attempted second server correctly refused the existing lock. The existing server was preserved.                                                                                                                                                                                |

### Static export correction

Next.js 16.4.3 rejects `generateStaticParams()` returning an empty array with `output: "export"`. Product/project detail templates use custom `.product.tsx` / `.project.tsx` page extensions, enabled by `next.config.ts` only when approved records exist. No fabricated or sentinel records were introduced. Route-matcher tests cover both disabled and enabled discovery; templates are typechecked and rendered with isolated test fixtures. A production build containing real approved detail records remains pending those records.

### Browser and visual coverage

Browser QA was attempted through Computer Use. Chrome's profile picker was observable, but input failed with “coordinate input geometry is unavailable” and then “foreground window did not report a process id.” The next window inventory no longer contained Chrome. No Phase 3 browser interaction, responsive screenshot, or console check is claimed as passed.

The 320px, 390px, 768px, 1024px, and 1440px visual matrix remains unverified for Phase 3. CSS provides stacked controls/cards on mobile, two-column tablet grids, and three-column desktop grids; this is implementation review, not measured browser evidence. Search/filter/sort behavior was tested at the function level. Render tests cover native gallery buttons, active state, approved-media selection, and detail sections; they do not prove thumbnail clicks, image-error handling, or keyboard operation in a browser.

Approved product/project pages and relationship logos have no public records to exercise. Real-media loading, gallery interaction, partner external links, and approved portfolio filters require browser verification when records are supplied. Synthetic fixtures remain under `tests/` and are never application data or public routes.

No Phase 4 work or deployment was performed. Only the static-preview server created for these checks was stopped; the pre-existing development server was left running.

## Phase 2 — 25 October 2026

Executed with the existing Node.js 24.17.0 / npm 11.13.0 environment. No application dependencies were added.

| Check                                                 | Result                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`                                   | PASS. Route type generation and TypeScript `--noEmit`.                                                                                                                                                                                                                             |
| `npm run lint`                                        | PASS. Zero warnings allowed.                                                                                                                                                                                                                                                       |
| `npm run build`                                       | PASS. Production compilation, TypeScript, and static export.                                                                                                                                                                                                                       |
| `npm run check:export`                                | PASS. 16 HTML files; 28 unique local links/assets resolve. Eight content routes have unique titles/descriptions and one H1 each. All five solution pages contain four native FAQs, breadcrumbs, and related-solution sections. Anchors, noindex, and withheld IT category checked. |
| `npm run dev`                                         | PASS. Homepage and Queue Management rendered with HTTP 200 during browser checks.                                                                                                                                                                                                  |
| `npm run preview`                                     | PASS. Built output served on loopback port 3001.                                                                                                                                                                                                                                   |
| `node scripts/check-routes.mjs http://127.0.0.1:3001` | PASS. All 13 public routes and 11 referenced static assets returned HTTP 200 with content. Missing page, unknown solution, and unpublished IT category returned the custom HTTP 404. This checks direct navigation requests rather than relying on client routing.                 |
| Content/asset implementation review                   | No product model, stock, price, client logo, project claim, company statistic, or contact details invented. Original inline illustrations have accessible labels and stable aspect ratios. Client/partner component renders no section with an empty approved dataset.             |

### Browser checks actually executed

Chrome Guest mode opened the development site using Computer Use. Visual inspection covered:

- Homepage hero at 320px and an approximately 1038px browser window before DevTools docking.
- Queue Management hero/breadcrumbs/illustration at 320px and 390px, plus the overview section at 390px.
- No clipped text, overlap, or visible horizontal overflow in those inspected regions. This is a visual observation, not a document-wide overflow measurement.
- Mobile menu at 320px: opened with an opaque, scrollable panel; close control received a visible focus ring; Escape dismissed it and restored the visible trigger focus ring. Selecting Queue Management closed the menu and loaded the correct detail route.

Computer Use then stopped with: “it could not determine the current browser URL on Windows with enough confidence to enforce policy.” No more browser input was issued.

### Remaining browser verification

The full requested matrix is **not complete**. 768px, 1024px, and 1440px were not tested at exact viewport sizes. Full-page inspection across all eight content routes, FAQ expand/collapse and keyboard operation, desktop dropdown interaction, mobile Tab/Shift+Tab containment, related-link clicks, footer interaction, reduced-motion emulation, and browser console checks remain unverified. Native FAQ markup and exported links were checked structurally; those checks do not replace interaction testing. HTTP asset checks passed, but browser loading/fallback behavior was only visually observed for the illustrations in the inspected regions.

All development and static-preview servers started for this phase were stopped after verification. No deployment, Phase 3 work, or external messages were performed. Content approval and browser coverage remain required before a production launch.

## Archived Phase 1 validation

Executed locally on 25 October 2026 with Node.js 24.17.0 and npm 11.13.0.

## Executed checks

| Check                                   | Result                                                                                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run typecheck`                     | PASS. Next route type generation and TypeScript `--noEmit`.                                                                                                                    |
| `npm run lint`                          | PASS. ESLint with zero warnings allowed.                                                                                                                                       |
| `npm run build`                         | PASS. Next.js production build and static prerender/export to `out/`.                                                                                                          |
| `npm run check:export`                  | PASS. 16 exported HTML files, 19 unique local link/asset targets; anchors resolve; preview noindex exists; unverified IT category is absent.                                   |
| `npm run dev`                           | PASS. Server started; homepage returned HTTP 200.                                                                                                                              |
| `npm run preview`                       | PASS. Export served at loopback port 3001 for verification.                                                                                                                    |
| HTTP route checks against static export | PASS. Homepage, all 7 general staging routes, and all 5 solution staging routes returned HTTP 200. Each later-phase page included its staging label.                           |
| Missing static URL                      | PASS. `/missing-page/` returned HTTP 404 with the custom page.                                                                                                                 |
| Dependency install/audit                | PASS. npm reported zero vulnerabilities. ESLint 9 deprecation is documented in README.                                                                                         |
| Text contrast calculations              | PASS for the representative foreground/background combinations below, using sRGB relative luminance and a 4.5:1 normal-text threshold. This is not a full accessibility audit. |

| Text pairing                          | Contrast ratio |
| ------------------------------------- | -------------- |
| White / Corporate Blue primary button | 5.17:1         |
| Navy / White heading                  | 16.52:1        |
| Secondary text `#52647B` / White      | 6.06:1         |
| Slate Gray / Off White note           | 4.55:1         |
| Hero body `#BAC9D9` / Navy            | 9.79:1         |
| Hero accent `#7DDCE7` / Navy          | 10.43:1        |
| Footer text `#B7C5D6` / Navy          | 9.42:1         |
| Muted footer `#92AFC1` / Navy         | 7.18:1         |

## Phase 1 browser verification limitation

Computer Use was invoked for the local preview. It ended before interaction because it could not determine Chrome's current URL on Windows with enough confidence to enforce policy. No further UI automation was attempted. **No browser screenshot, interaction, console, or measured viewport check is claimed as passed.**

CSS and component structure were reviewed for stacking, content sizing, opaque menus, modal focus behavior, active navigation, and reduced motion. These are implementation checks, not substitutes for browser execution.

## Phase 1 browser checklist (historical; see Phase 2 coverage above)

Run this checklist when browser access is available; it remains unexecuted in this session.

| Width  | Expected layout                                                       | Verification status |
| ------ | --------------------------------------------------------------------- | ------------------- |
| 320px  | Stacked hero/cards; wrapping actions; mobile modal                    | Not browser-tested  |
| 390px  | Stacked hero/cards; mobile modal                                      | Not browser-tested  |
| 768px  | Two-column hero, three preview cards; mobile navigation               | Not browser-tested  |
| 1024px | Two-column hero, three cards; mobile navigation                       | Not browser-tested  |
| 1440px | Full desktop navigation/dropdown; two-column hero; four-column footer | Not browser-tested  |

At each width, inspect the full page for horizontal scrolling, clipped text, and overlap. Open and close mobile navigation; verify initial focus on Close, Tab/Shift+Tab containment, Escape dismissal, scroll lock, trigger focus restoration, closing after a route click, and resizing across 1200px. On desktop, verify disclosure click/keyboard behavior, outside-click/blur/Escape dismissal, active states, and routing. Check back/forward navigation, reduced-motion preference, and the browser console. Verify touch-target spacing on small screens and test one long staging breadcrumb.

Mobile dialog entry/exit uses progressive CSS discrete transitions; unsupported browsers retain native dialog behavior with an immediate transition. Reduced-motion preferences disable transitions.

## Content review limitation

The DOCX text, structure, and division graphics were reviewed without altering the source. Its page count metadata conflicts with cached break markers. CONTENT_VERIFICATION.md supplies explicit provisional page locators and source section headings; printed page numbers require a fresh rendering. Other image-only pages were not comprehensively visually reviewed, and no client/product/project/partner image claims were published.

## Scope

Phase 1 only. Full content pages, catalog, portfolio, advanced interactions, comprehensive SEO, cross-browser regression testing, and deployment were not performed. No remote publication or external messages were sent.
