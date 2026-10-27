# ESSCOM website

A corporate technology website built through Phases 1-5 with Next.js App Router, React, strict TypeScript, Tailwind CSS, Lucide icons, and locally bundled Inter. The application is frontend-only and exports static files. No database, authentication, API backend, analytics, or non-operational contact form is included.

The current release is a **staging/review website**. Contact infrastructure is implemented, but approved ESSCOM contact channels are still missing. Product models, installations, client/partner relationships, legal copy, and company media remain approval-dependent. Phase 6 image extraction/integration has not started.

## Setup and local preview

Use Node.js **24.x** and npm. Exact dependency versions are recorded in package-lock.json. On Windows, use npm.cmd if PowerShell blocks npm.ps1.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production preview:

```sh
npm run build
npm run preview
```

Preview serves out/ on loopback port 3000. Stop the dev server first, or set PORT to another port (PowerShell: `$env:PORT='3001'`). The preview utility is for local QA, not an application backend. It uses gzip and immutable caching for hashed assets to approximate CDN transfer behavior.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run check:export
npm run check:assets
npm run test:browser:install
npm run test:e2e
```

For a build-level indexing check, run `npm run check:indexing` with no preview/browser test running. It builds production and preview fixtures with reserved test origins, verifies canonicals/sitemaps/robots, and always rebuilds the actual environment afterward. Do not deploy the intermediate fixture output.

Browser tests require installed Google Chrome and Playwright WebKit. They start and stop their own static server on port 3100. The suite covers 13 public routes at 320, 360, 390, 430, 768, 1024, 1280, 1440, and 1920 pixels; navigation, focus, search/filter/sort/reset, FAQs, 404s, and axe WCAG A/AA checks. These are desktop browser engines, not physical Android/iPhone tests. WebKit link keyboard activation is tested with explicit focus because its platform default can skip links on Tab. Unit tests cover publication gates and unexposed product/project templates using synthetic fixtures confined to tests/.

With a separate preview running:

```sh
npm run check:routes -- http://127.0.0.1:3001
npm run measure:performance -- http://127.0.0.1:3001 final
```

Lighthouse uses one cold navigation per representative route, default simulated mobile throttling, and local headless Chrome. JSON reports go to ignored artifacts/. INP requires interaction/field measurement and is not supplied by this navigation audit. Test screenshots and traces are in ignored test-results/; HTML results are in playwright-report/. See PHASE5_REPORT.md and VALIDATION.md for executed results and limitations.

## Structure

- src/app/: homepage, About, Solutions and five detail pages, Products, Projects, Clients & Partners, Contact, staging Privacy, custom 404, robots and sitemap.
- src/components/: shared layout/UI, contact, catalog, portfolio, and content sections.
- src/data/: centralized solutions, products, projects, clients, partners, and brand/contact configuration.
- src/types/: typed records, media, publication gates, and contact data.
- src/lib/: search/filter logic, contact URLs, publication selectors, deployment policy, metadata, route inventory.
- src/hooks/: hydration readiness and mobile dialog behavior.
- public/images/, public/logos/, public/icons/: approved local assets.
- scripts/: static compatibility, export/link checks, local server, performance measurement.
- tests/: unit/rendering tests plus tests/e2e/ browser coverage.

The internal CONTENT_VERIFICATION.md is maintained locally and excluded from GitHub by .gitignore. Share it only through an approved internal channel. Do not commit source profiles, private records, credentials, .env.local, build outputs, or QA artifacts.

## Updating content

### Solutions

Edit src/data/solutions.ts. The same records power navigation, directory cards, homepage, related links, and static detail routes. Use unique slugs and valid relatedSlugs. Only the five approved website categories are published; IT & Communication requires approval. Copy describes proposed applications, not verified clients, specifications, or guarantees.

### Products

Add typed Product records to src/data/products.ts. Every model needs a unique id/slug, a published solution categoryId, description/overview, keywords, approved images, applications, and valid relatedProductIds. Publish only with verificationStatus: "approved" and published: true. Features/specifications have separate verified flags. Never infer availability, pricing, stock, warranties, or manufacturer relationships.

With no approved models, the catalog shows 15 clearly labeled equipment categories and links to solutions. Product detail templates exist, but no fictional detail routes are generated. next.config.ts enables the page.product.tsx extension only when published records exist; keep this convention because Next static export rejects discovered dynamic routes with no generated parameters.

### Projects

Add Project records to src/data/projects.ts with attributed scope, requirements, solution, technology, industry, valid solutionIds, and permission to publish. Approval and publication flags plus an approved actual-installation photograph are required. Outcome records have separate verification flags. Do not expose sensitive site/security layouts. page.project.tsx uses the same conditional route convention as products. Filters appear only when the published collection has enough applicable records.

### Clients and partners

Use src/data/clients.ts and partners.ts. Names, logo rights, relationship type, and any official HTTPS links require approval. A manufacturer or historical parent-company reference is not automatically an ESSCOM partner. Unapproved names belong outside src/ and public/.

### Contact information

Update only src/data/site.ts with company-approved phone/WhatsApp numbers (international country code included), email, office address, Google Maps URL, and HTTPS social links. Do not copy the broader profile's contact block. Missing/invalid channels are hidden; no form claims to send anything.

src/lib/contact.ts normalizes telephone/WhatsApp numbers without guessing a country, encodes contextual messages and email subjects, and validates Maps destinations. ContactActions, ContactCTA, product quote links, and the footer share this configuration. The product/solution/project name comes from structured data. Links open the chosen app; the visitor must send the inquiry there. Automated tests validate URL construction with synthetic fixtures, not actual message delivery. [WhatsApp click-to-chat reference](https://faq.whatsapp.com/5913398998672934).

### Images and fonts

Current visuals are original SVG/HTML illustrations and a 219-byte SVG favicon; there are no raster photos to recompress. Inter is one local variable WOFF2 (48,256 bytes) with swap display. Avoid adding remote font requests.

Future approved assets should be resized and compressed to appropriate WebP/AVIF dimensions before entering public/. Store src, alt, width, height, approved, and kind in MediaAsset. Keep aspect ratios reserved. ApprovedImage provides lazy loading and error fallback; MediaGallery supports approved thumbnails. The static export does not use a Next image optimization server. Do not bulk-extract the company profile in Phase 5.

## SEO and indexing

Copy .env.example to .env.local only if you need local URL configuration. Variables are read at build time; changing them requires a rebuild.

| Variable | Meaning |
| --- | --- |
| NEXT_PUBLIC_SITE_URL | Actual assigned HTTPS origin, without a path/query/fragment; never a fictional custom domain. |
| SITE_INDEXING | Defaults to staging. Set production only after business and launch approval. |
| VERCEL_ENV / VERCEL_URL | Vercel-provided deployment context; previews use their own generated origin and always stay noindex. |
| VERCEL_PROJECT_PRODUCTION_URL | Vercel's fallback production origin; does not enable indexing by itself. |

Local builds without a URL omit canonicals and structured data. Preview builds emit noindex/nofollow and an empty sitemap. robots.txt allows crawling so search engines can read the noindex metadata; noindex is not access control. Keep Vercel Deployment Protection enabled for review releases.

Production indexing requires both SITE_INDEXING=production and an explicit valid NEXT_PUBLIC_SITE_URL outside a Vercel preview environment. Only published content routes enter the sitemap. Privacy stays noindex and excluded until legal wording is approved; the custom 404 remains noindex. Each page has unique title/description and Open Graph/Twitter metadata. WebSite JSON-LD includes only the brand name and real configured URL; no unsupported company claims, ratings, addresses, or awards are added.

## Static build and compatibility

next.config.ts retains output: "export", trailingSlash: true, and images.unoptimized: true. Build with npm run build, not next export or next start. Metadata route handlers are force-static; there are no request-time APIs or server actions.

The build runs scripts/fix-static-segments.mjs after Next. It adds missing flat-name aliases for nested RSC segment files produced on Windows. It preserves originals, checks collisions, and is a no-op for correctly named files. This fixes observed navigation/prefetch 404s without disabling routing. [Upstream Next issue](https://github.com/vercel/next.js/issues/85374).

## GitHub preparation

A local Git repository is initialized; no remote is configured or pushed. Create/select an authorized GitHub repository, preferably private while reviewing business content. Before pushing, verify git remote -v and git status. Review staged files with git diff --cached --stat. .gitignore excludes node_modules, .next, out, secrets, private source documents, internal content verification, and test artifacts; only .env.example is allowlisted.

Add the exact authorized remote with git remote add origin YOUR_REPOSITORY_URL, then push the intended branch. Never substitute an unrelated account/repository or force-push existing history.

## Vercel staging deployment

The repository includes vercel.json: Next.js framework, npm ci, npm run build, output out/, trailing slashes, and basic response headers. Select Node.js 24.x and root directory esscom-website if importing the parent folder, or repository root if this folder is the Git root. Vercel handles asset compression; confirm deployed response headers during post-deployment QA.

ESSCOM is commercial. [Vercel requires Pro or Enterprise for commercial usage](https://vercel.com/docs/limits/fair-use-guidelines). An authorized owner must verify the existing team plan; do not use Hobby, purchase a plan automatically, or change billing.

For the first preview, after verifying the account/team:

```sh
npx vercel login
npx vercel whoami
npx vercel teams ls
npx vercel link --scope AUTHORIZED_TEAM
npx vercel --scope AUTHORIZED_TEAM
```

Use an existing authorized project or create ESSCOM under the confirmed team. Do not add --prod for this first release. Keep SITE_INDEXING=staging in both Preview and Production environment settings initially. Leave NEXT_PUBLIC_SITE_URL unset for preview so VERCEL_URL supplies the actual generated origin. Keep system environment variables exposed to the build and retain deployment protection. Confirm the CLI's account, project, plan, and returned .vercel.app URL; do not paste credentials into source files or chat.

After preview verification, connect the authorized GitHub repository in the Vercel project's Git settings. Choose the production branch deliberately; pushes to other branches create previews. Review environment-variable scopes before each deployment. [Vercel preview environments](https://vercel.com/docs/deployments/environments) and [system variables](https://vercel.com/docs/environment-variables/system-environment-variables).

Verify HTTPS, direct/deep links and refresh, custom 404s, assets and prefetched RSC files, mobile menus, catalog controls, FAQs, console, and configured contact links on the actual URL. Do not disable protection to get a public performance scan. Record the verified URL in DEPLOYMENT_CHECKLIST.md. No actual Vercel deployment is currently recorded.

## Later production/domain release

Before indexing: approve the legal/privacy text, company copy, contact channels, asset rights, and required business records; complete physical-device checks and authorize launch. Set NEXT_PUBLIC_SITE_URL to the assigned production .vercel.app origin and SITE_INDEXING=production only then. Rebuild and inspect canonical URLs, sitemap, robots, structured data, and response headers.

A future custom domain must first be purchased/owned and authorized separately. Add it in Vercel Project Settings > Domains, apply Vercel's displayed DNS records, verify HTTPS and redirects, update NEXT_PUBLIC_SITE_URL, and redeploy. No domain purchase or billing change is part of this phase.
