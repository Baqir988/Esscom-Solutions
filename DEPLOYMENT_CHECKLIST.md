# ESSCOM deployment checklist

Last reviewed: 29 October 2026 (Asia/Karachi).

**Status: staging build prepared locally; not deployed to Vercel.**

Actual deployment URL: **none**. No Vercel authentication, linked project, token, or authorized commercial team was available. No Git remote was configured or pushed. Do not interpret the local preview address as a hosted release.

## Completed preparation

- [x] Existing architecture, routes, dependencies, assets, and content gates reviewed.
- [x] Static export retained: `output: "export"`, unoptimized static images, trailing slashes.
- [x] Build succeeds; Windows RSC filename compatibility aliases added and checked.
- [x] Production/preview indexing builds tested; actual staging output restored.
- [x] Explicit `NEXT_PUBLIC_SITE_URL` and `SITE_INDEXING` policy implemented.
- [x] Sitemap includes only published routes when production indexing is enabled.
- [x] Preview and unapproved privacy page remain noindex; custom 404 stays noindex.
- [x] Unique titles/descriptions, canonical policy, social metadata, favicon, minimal WebSite structured data checked.
- [x] Local Lighthouse measurements recorded with limitations in PHASE5_REPORT.md.
- [x] Runtime dependency audit reported zero vulnerabilities.
- [x] Development-only Playwright, axe, Lighthouse, route and asset checks available.
- [x] Final 25 unit/rendering tests and 32 Chrome/WebKit browser tests passed, including 234 route/viewport observations and 52 automated accessibility scans.
- [x] Current source assets remain lightweight; no Phase 6 media extraction performed.
- [x] `vercel.json`, Node 24.x requirement, lockfile, and `.env.example` prepared.
- [x] Local Git repository initialized; ignored files checked for build outputs, secrets, private documents, and internal attribution notes.
- [x] README documents content updates, local QA, GitHub setup, and Vercel preview instructions.

Final browser-suite outcome is recorded in VALIDATION.md; this checklist does not replace that evidence.

## Required before a Vercel preview

- [ ] Owner identifies the authorized Vercel team/project and authenticates locally.
- [ ] Verify the existing team is Pro or Enterprise. Hobby is restricted to non-commercial use under [Vercel's policy](https://vercel.com/docs/limits/fair-use-guidelines).
- [ ] Verify the GitHub remote before any push; use an authorized repository.
- [ ] Confirm root directory, Node 24.x, `npm ci`, `npm run build`, and `out/` output.
- [ ] Keep `SITE_INDEXING=staging` in Preview and initially in Production.
- [ ] Keep deployment protection enabled; confirm authorized reviewers can access it.
- [ ] Deploy a preview without `--prod`, record its actual `.vercel.app` URL.

No plan purchase, billing changes, custom domain purchase, or protection bypass is authorized by these instructions.

## Required after a real preview exists

- [ ] HTTPS and deployment protection verified.
- [ ] Home, About, all five solution routes, catalog, portfolio, relationships, Contact, and Privacy load directly and after refresh.
- [ ] Unknown/unpublished routes return the custom 404.
- [ ] JS/CSS/fonts/favicon, future images, and RSC navigation payloads load without 404s.
- [ ] Menu focus, Escape, navigation closing, filters/search/sort/reset, FAQs, and related links verified.
- [ ] Canonicals point to the real preview; noindex retained; preview sitemap has no indexable URLs.
- [ ] Compression, immutable asset caching, and configured security headers verified on Vercel responses.
- [ ] Console, responsive layouts, protected-preview performance, and physical Safari/Chrome devices reviewed.
- [ ] Actual contact destinations tested only after ESSCOM approval; no test messages sent without authorization.

## Business launch blockers

- [ ] Approved ESSCOM phone, WhatsApp, business email, address, Maps link, and socials.
- [ ] Reviewed Privacy Policy and final company narrative/mission/vision.
- [ ] Approved logo and rights/attribution for all future product/project/client/partner records and images.
- [ ] Company approval for public launch and indexing.
- [ ] Actual production URL configured, then `SITE_INDEXING=production` enabled deliberately and rebuilt.

Product models, public installation stories, and client/partner identities remain unpublished. The working equipment-category catalog and informative empty states are intentional. The internal CONTENT_VERIFICATION.md contains the detailed approval register and is excluded from public GitHub commits.

## Remaining measurement limitations

- No real-user INP or field Core Web Vitals.
- Lighthouse is a local single-run mobile simulation, not a deployment guarantee.
- Home and Products LCP were slightly above the 2.5-second target.
- Staging SEO scores are reduced by intentional noindex.
- Browser engines on Windows do not replace physical Android/iPhone checks.
- Approved product/project/gallery/logo routes cannot be tested publicly until approved records exist; templates and selectors are tested with private test fixtures.

Phase 6 extraction and private preparation are implemented: 906 embedded candidates, 616 unique images and 502 private WebP variants. Sixteen historical category-reference images (42 responsive WebP files, 775,402 bytes) are now integrated in the public preview with captions. This limited category use does not verify current ESSCOM products or installations. Confirm usage rights and attribution before production release. Installation/project, branding, client, partner, fabrication and other-division media remain unpublished. MediaAsset, ApprovedImage and the central registry support additional responsive media. See PHASE6_REPORT.md and the private review gallery.

## Phase 6 pre-deployment checks

- [x] Every original preserved privately and hash-verified; exact duplicates identified.
- [x] Full inventory, machine-readable manifest and private review gallery created.
- [x] Responsive derivatives checked for decoding, dimensions, transparency and metadata.
- [x] TypeScript, lint, 29 unit/rendering tests, production static export, media provenance/image output checks passed.
- [x] Static Chrome smoke check: 28 page/viewport combinations across 320, 390, 768 and 1440px; 244 image instances loaded with no horizontal overflow or console errors.
- [ ] Full Playwright suite after image integration timed out; rerun in an environment with a working local browser harness.
- [x] Static HTTP route/404 results recorded.
- [ ] Post-integration Lighthouse measurement: the local Chrome launcher could not connect to Chrome debugging; no final score claimed.
- [x] Private archive, human annotations, manifest and inventory excluded from public Git/static output.
- [ ] ESSCOM confirms public usage rights/current attribution for the 16 historical category references; captions avoid product-stock or installation claims.
- [ ] ESSCOM provides higher-resolution replacements for small/soft POS, queue, biometric and signage photos where needed.
- [x] Sixteen category references integrated into public registry/pages; TypeScript, asset, browser smoke and static export revalidated.
- [ ] Project/installation, client, partner, official-logo and other-division assets approved separately before publication.
- [ ] Authorized Vercel commercial account/project access supplied; preview deployed and verified.
