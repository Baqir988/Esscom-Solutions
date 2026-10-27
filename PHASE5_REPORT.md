# Phase 5 development report

Date: 27 October 2026 (Asia/Karachi). Status: implementation and local QA; Vercel deployment pending authenticated authorized commercial account/project.

## Changes

- Preserved design, routes, static export, content gates, and frontend-only architecture. No Phase 6 images were extracted.
- Added build-time staging/production indexing policy, environment-based canonicals, static sitemap/robots, Open Graph/Twitter metadata reuse, and minimal WebSite JSON-LD. Preview cannot inherit production indexing or canonical origin.
- Fixed observed Windows Next.js static-export prefetch 404s using collision-checked RSC filename aliases after build. Client routing remains enabled.
- Fixed visible-label/accessibility-name mismatches in wordmark and solution links; added modal Tab/Shift+Tab cycling including WebKit's default link-skipping behavior.
- Prevented pre-hydration search/navigation input loss by keeping JavaScript controls disabled until handlers are ready.
- Consolidated CSS overrides and removed duplicate URL configuration. Kept empty portfolio and category illustrations in static rendering where possible. No large application-bundle reduction is claimed.
- Retained one local 48,256-byte Inter variable font and lightweight illustrations with reserved dimensions. The favicon is 219 bytes; no raster photos exist to recompress.
- Local QA server supplies gzip and immutable hashed-asset caching to approximate CDN transfer behavior. Actual Vercel response headers remain a post-deployment check.
- Added browser, accessibility, asset-budget, indexing-build, and Lighthouse checks as development-only tooling. Runtime dependencies are unchanged.
- Pinned Node to 24.x and added Vercel static-output configuration and a safe .env.example.

## Performance measurements

Lighthouse 13.5.0, Chrome 156 on Windows, one cold navigation per route, default simulated mobile throttling, local static HTTP with gzip and immutable hashed assets. No other browser audit ran during these measurements. These are local lab results, not real-user Core Web Vitals or deployed measurements.

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| / | 94 | 100 | 100 | 63 | 2.56 s | 0 | 194 ms |
| /products/ | 96 | 100 | 100 | 63 | 2.53 s | 0 | 114 ms |
| /contact/ | 97 | 100 | 100 | 63 | 2.37 s | 0 | 94 ms |

The 90+ performance and 95+ accessibility targets were met on these samples. Home and Products LCP are slightly above 2.5 seconds. INP was **not measured**; TBT is not INP. SEO is intentionally reduced by noindex for this staging site. Indexing policy must not be weakened to increase the score.

The initial uncompressed-server baseline scored 75/82/83 Performance with LCP 5.71/4.89/4.63 seconds. Because compression/cache conditions changed, the difference is **not** attributable solely to application-code optimization. Final raw reports are retained locally in ignored artifacts/lighthouse-final-*.json and performance-final.json.

Initial homepage budget: 150,263 bytes gzip modern JavaScript; 9,207 bytes gzip CSS; 48,256 font bytes; 22,490 bytes gzip HTML. Legacy noModule code is excluded from the modern-browser JS total. Framework hydration remains the main JavaScript cost.

## Validation

TypeScript, ESLint, all 25 unit/rendering tests and all 32 Chrome/WebKit browser tests passed. Coverage includes 234 route/viewport observations and 52 automated accessibility scans. Production, preview-policy and restored-staging builds passed, alongside export, HTTP route and asset checks. See VALIDATION.md for full conditions and limitations. Unit fixtures validate configured contact URLs, product/project templates, and publication rules without publishing fake business records. Browser tests cover the actual equipment-category catalog and pending portfolio/relationship states. Public product galleries and portfolio filters await approved records before public-route testing.

## Deployment and repository

The local Git repository was initialized on main. No remote was supplied or pushed. .gitignore excludes secrets, internal CONTENT_VERIFICATION.md, source DOCX/PDF files, build outputs, and test artifacts. No Vercel authentication, project link, token, or authorized commercial team was available. No real Vercel URL or deployed/HTTPS verification is claimed. Exact instructions are in README.md and DEPLOYMENT_CHECKLIST.md.

## Approval-dependent work

Approved contact channels/address/Maps/socials; privacy text; final company narrative and brand assets; attributed models and verified specifications; installation photographs/scope/client consent; approved client/partner identities/logos; commercial Vercel access; and launch approval. Keep SITE_INDEXING=staging until ready. No actual message delivery was attempted.

## Main files changed

src/lib/deployment.ts, metadata.ts, routes.ts; src/app/layout.tsx, robots.ts, sitemap.ts, not-found.tsx, globals.css and privacy metadata; Navbar, Wordmark, SolutionCard, ProductCard, ProductCatalog and portfolio empty-state components; use-mobile-navigation.ts and use-hydrated.ts; static compatibility/export/asset/indexing/performance scripts; playwright.config.ts; tests/e2e/site.spec.ts and tests/phase5.test.ts; package.json/lockfile; .gitignore/.env.example; vercel.json; README and validation/deployment reports.
