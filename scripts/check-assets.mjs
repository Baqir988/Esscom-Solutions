import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";

const html = await readFile("out/index.html", "utf8");
const moduleScripts = [...html.matchAll(/<script\b([^>]+)>/g)]
  .filter((match) => !/noModule|nomodule/i.test(match[1]))
  .map((match) => match[1].match(/src="([^"]+)"/)?.[1]).filter(Boolean);
const paths = [...new Set([...moduleScripts, ...[...html.matchAll(/href="([^"]+\.(?:css|woff2))"/g)].map((match) => match[1])])];
const totals = { javascriptGzip: 0, cssGzip: 0, fontBytes: 0, htmlGzip: gzipSync(html).length };
for (const path of paths) {
  const bytes = await readFile(`out${path}`);
  if (path.endsWith(".js")) totals.javascriptGzip += gzipSync(bytes).length;
  else if (path.endsWith(".css")) totals.cssGzip += gzipSync(bytes).length;
  else totals.fontBytes += bytes.length;
}
assert(totals.javascriptGzip < 200 * 1024, "Homepage modern JS exceeds 200 KiB gzip budget");
assert(totals.cssGzip < 20 * 1024, "Styles exceed 20 KiB gzip budget");
assert(totals.fontBytes < 64 * 1024, "Initial font exceeds 64 KiB budget");
assert(totals.htmlGzip < 60 * 1024, "Homepage document exceeds 60 KiB gzip budget");
assert(!html.includes("/icons/esscom.svg"), "Unapproved placeholder logo must not be linked as a favicon");
console.log("PASS: initial modern-browser asset budgets", JSON.stringify(totals));
