import assert from "node:assert/strict";

// Run after `npm run build` and start the static preview on another terminal.
const origin = process.argv[2] || "http://127.0.0.1:3001";
const pages = [
  "/",
  "/about/",
  "/solutions/",
  "/products/",
  "/projects/",
  "/clients-partners/",
  "/contact/",
  "/privacy/",
  "/solutions/queue-management/",
];
const assets = new Set();
assets.add("/robots.txt");
assets.add("/sitemap.xml");
for (const path of pages) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `Direct route failed: ${path}`);
  const html = await response.text();
  assert(
    html.includes('id="main-content"'),
    `Missing application content: ${path}`,
  );
  for (const [, asset] of html.matchAll(
    /(?:src|href)="(\/(?:_next\/|icons\/)[^"<>]+)"/g,
  )) {
    assets.add(asset);
  }
}
for (const asset of assets) {
  const response = await fetch(new URL(asset, origin));
  assert.equal(response.status, 200, `Asset failed: ${asset}`);
  assert(
    (await response.arrayBuffer()).byteLength > 0,
    `Empty asset: ${asset}`,
  );
}
for (const path of [
  "/missing-page/",
  "/solutions/unknown/",
  "/solutions/cctv-surveillance/",
  "/solutions/biometric-access-control/",
  "/solutions/point-of-sale/",
  "/solutions/digital-signage/",
  "/solutions/it-communication/",
  "/products/unapproved/",
  "/projects/unapproved/",
]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 404, `Expected 404: ${path}`);
  assert(
    (await response.text()).includes("Return to homepage"),
    `Missing custom 404: ${path}`,
  );
}
console.log(
  `PASS: ${pages.length} direct routes, ${assets.size} static assets, and 9 missing/unpublished-route 404s at ${origin}.`,
);
