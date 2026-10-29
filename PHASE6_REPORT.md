# ESSCOM Phase 6 media report

Updated 29 October 2026 (Asia/Karachi). Extraction, private optimization, media infrastructure and regression testing are implemented. **Public source-image integration remains pending company approval. No Vercel deployment was performed.**

## Complete extraction and inventory

The supplied DOCX was found at `C:\Users\Lenovo\Downloads\PROFILE TECHNOWORD (NEW)_compressed (2) (1).docx` (21,857,004 bytes). The original was not modified. ZIP/XML extraction preserved every media candidate and mapped its relationship, source part, nearby text, section and cached page segment. Every candidate was referenced; no external image references were found.

| Inventory measure | Count |
| --- | ---: |
| Embedded candidates extracted and decoded | 906 |
| SHA-256-distinct images | 616 |
| Exact duplicate files, preserved privately | 290 |
| Unique images privately optimized | 221 |
| Responsive WebP files generated | 502 |
| Source images integrated publicly | **0** |
| Unique relevant candidates awaiting specific approval | 105 |
| Unique other-division/context, fabrication, stock or ambiguous assets withheld | 116 |
| Unique rasterized text/decorative fragments excluded from website placement | 395 |

The unique-image categories sum to 616; duplicates are counted separately. Withheld assets are preserved, not deleted. A visual review of all 13 original contact sheets covered all 616 unique images; exact duplicates inherit their identical image's assessment. Five derivative sheets cover the 221 optimized images. Automated checks verify every original hash and every generated derivative. Five same-basename PNG/JPEG collisions were fixed with distinct inventory IDs.

The complete internal deliverables are [MEDIA_INVENTORY.md](MEDIA_INVENTORY.md), [src/data/media-manifest.json](src/data/media-manifest.json), and the [private review gallery](private/company-profile/review.html). The gallery contains 18 proposed selections and all unique originals. Originals, derivatives, manifest, inventory and human source annotations are excluded from public Git. Keep an authorized private backup.

The document reports 43 pages but has 62 cached page-break markers. Cached segments/section references are precise XML locators, **not verified printed page numbers**. Approximate printed ranges follow the user's brief; no fresh Word pagination was performed.

## Quality and optimization

| Size measure | Bytes |
| --- | ---: |
| All extracted original files, including duplicates | 21,263,599 |
| Unique originals | 13,702,246 |
| Originals corresponding to the 221 prepared image sets | 8,190,449 |
| Largest WebP representation per prepared image | 3,744,924 |
| All 502 responsive variants combined | 7,528,130 |

Largest-representation reduction: **54.28%** against the same prepared originals. Including every responsive variant: **8.09%** reduction. These are private preparation savings, not measured public website download savings. Exact duplicates share derivatives while original files remain intact.

PNG/JPEG sources were converted to WebP, using lossless encoding for logo/diagram records and quality 86 with alpha quality 100 for photographic records. Width variants use 160/320/640/960/1280 where useful plus the capped native width; no image was enlarged. Full framing, aspect ratios and transparency were preserved, and unnecessary EXIF/XMP/IPTC data was removed. No AI editing, product-feature changes, cropping, background replacement or vector tracing was performed. No vector source assets were present.

206 of the 221 prepared images have limited source dimensions for larger or retina presentation under the inventory's width/height review rule. This is a placement limitation, not a reason to discard them. The ESSCom Solutions logo is only 196 × 47 pixels; request an authorized SVG or larger transparent original. Many POS, queue-display and signage images also need higher-resolution replacements. Source compression artifacts remain visible where already present; optimization cannot restore lost detail. Physical color accuracy and image rights cannot be established from the compressed profile alone.

## Website changes and publication boundaries

- Added the centralized public allowlist and placement mappings in `src/data/media.ts`; it currently contains no approved assets. The private manifest is never imported into the application.
- Extended `MediaAsset`, `ApprovedImage` and gallery styling for static responsive WebP sources, dimensions, meaningful alt text, lazy loading, priority handling and existing fallbacks. Browser-native `picture/source` selection avoids the Next runtime image API. `scale-down` avoids enlarging small originals.
- Connected the shared Home/Solutions cards, solution-detail hero/equipment visuals, and Home/Products equipment cards to approved media selectors. Existing illustrations remain visible because the publication list is empty.
- Existing product/project galleries can reuse approved media records without new dependencies. No product models, project records, logos, partner relationships, factory ownership claims, specifications or contacts were fabricated.
- About, Contact, general homepage hero, Projects and Clients/Partners receive no source photographs until suitable attributed assets and records are approved. The website design and static-export architecture are preserved.

All installation images remain private, including those showing identifiable organizations or screen content. Factory/CNC/fabrication and Technovation/solar assets remain separate. Historical partner-logo appearance does not establish a current ESSCOM relationship. Two small devices in the biometric section were classified as ambiguous rather than incorrectly labeled as CCTV recorders. Brochure composites with embedded promotional claims are flagged for review.

## Executed validation

The following checks were executed on the Phase 6 changes (27 October, with final HTTP/performance follow-up on 29 October):

| Check | Actual result |
| --- | --- |
| TypeScript | PASS, explicit `npm run typecheck` and build typecheck. |
| ESLint | PASS, zero warnings. |
| Unit/rendering suite | PASS, 28 tests including responsive source validation, unapproved fallback and static image markup. |
| Production build | PASS; static export generated, with all existing routes preserved. |
| Export audit | PASS; 16 HTML outputs, 32 unique local link/asset targets, 12 content routes with metadata and indexing policy. |
| Media provenance/derivatives | PASS; 906 original hashes, 616 unique IDs, 502 WebP outputs, dimensions, aspect ratios, alpha and stripped metadata; no private-media references in static output. |
| Website browser suite | PASS; 32 Chrome/WebKit tests in 4.4 minutes, 234 route/viewport observations and 52 automated accessibility scans. |
| Private media browser checks | PASS in Chrome and WebKit; 1×/2× responsive selection, reserved dimensions, no unnecessary largest-source request, all 634 private review image instances decoded, mobile review fits. |
| Static HTTP checks | PASS on 29 October; 13 public routes and 15 assets return 200, five missing/unpublished routes return custom 404s. |
| Asset budget | PASS; 150,498 gzip bytes modern JavaScript, 9,280 gzip bytes CSS, 48,256 font bytes and 22,507 gzip bytes homepage HTML. |

Website browser checks include navigation/mobile focus and Escape, search/filter/sort/reset/counts, FAQ keyboard use, pending states, images, console/runtime errors, reduced motion and widths 320/360/390/430/768/1024/1280/1440/1920. Private media checks use isolated local fixtures, never public test routes or fake business records. Public product/project gallery selection with approved records and physical Android/iPhone testing remain pending. Contact encoding and missing-channel behavior are tested; no actual messages or calls were sent.

### Performance measured 29 October

Lighthouse 13.5.0, Chrome 156 on Windows, one cold navigation per route, default simulated mobile throttling, local static HTTP with gzip and immutable hashed-asset caching. No other browser audit or image-optimization job was running. Raw reports are retained in ignored `artifacts/lighthouse-phase6-*.json` and `artifacts/performance-phase6.json`.

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 94 | 100 | 100 | 63 | 2.57 s | 0 | 207 ms |
| Products | 98 | 100 | 100 | 63 | 2.36 s | 0 | 85 ms |
| Contact | 95 | 100 | 100 | 63 | 2.46 s | 0 | 177 ms |

Home LCP is slightly above the 2.5-second target. **INP was not measured**; TBT is not INP. SEO reflects intentional staging noindex. These are single-run local lab measurements, not deployed/real-user metrics or proof of complete accessibility conformance. No source photographs are public yet, so their eventual page-load effect must be measured after approval and integration. Small differences from Phase 5 should not be interpreted as proven optimization gains.

## Deployment and remaining approval steps

No authorized Vercel account/project link or token is configured, and no Git remote is configured. **Actual preview URL: none.** No production promotion, billing change or domain purchase was performed. README and DEPLOYMENT_CHECKLIST.md contain the exact commercial-team preview steps. Keep staging noindex and deployment protection enabled.

To complete public image integration, approve specific asset IDs and placements from the private gallery, confirm usage rights and ESSCOM attribution, supply larger source files where required, and separately approve project/client/partner/facility records. Then copy only those approved variants into `public/images/company-profile/`, populate the public media registry/mappings, rerun checks and deploy a protected preview using the authorized team. Pending review is not approval; this report does not mark public integration as complete.
