import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";

const origin = process.argv[2] || "http://127.0.0.1:3001";
const explicitChromePath = process.argv[4] || process.env.CHROME_PATH;
const label = process.argv[3] || "final";
await mkdir("artifacts", { recursive: true });
const chrome = await launch({ chromeFlags: ["--headless=new"], chromePath: explicitChromePath });
const records = [];
try {
  for (const path of ["/", "/products/", "/contact/"]) {
    const result = await lighthouse(new URL(path, origin).href, { port: chrome.port, output: "json", onlyCategories: ["performance", "accessibility", "best-practices", "seo"], logLevel: "error" });
    const { lhr } = result;
    const record = { path, lighthouseVersion: lhr.lighthouseVersion, userAgent: lhr.userAgent, scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), lcpMs: lhr.audits["largest-contentful-paint"].numericValue, cls: lhr.audits["cumulative-layout-shift"].numericValue, tbtMs: lhr.audits["total-blocking-time"].numericValue, failedAudits: Object.values(lhr.audits).filter((audit) => audit.score !== null && audit.score < 1).map(({ id, title, displayValue }) => ({ id, title, displayValue })) };
    records.push(record);
    await writeFile(`artifacts/lighthouse-${label}-${path.replaceAll("/", "") || "home"}.json`, JSON.stringify(lhr, null, 2));
    console.log(JSON.stringify(record));
  }
  await writeFile(`artifacts/performance-${label}.json`, JSON.stringify({ conditions: "Single cold-navigation run per route; Lighthouse default simulated mobile throttling; local Windows Chrome, static HTTP server with gzip and immutable hashed-asset caching; INP not measured by navigation audit.", records }, null, 2));
} finally { await chrome.kill(); }
