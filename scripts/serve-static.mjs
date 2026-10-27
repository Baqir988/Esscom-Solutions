import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const compressed = new Map();
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".xml": "application/xml; charset=utf-8",
  ".ico": "image/x-icon",
};
await stat(resolve(root, "index.html")).catch(() => {
  throw new Error("Run npm run build before previewing the static export.");
});
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    let file = resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const data = await readFile(file);
    const useGzip = /\bgzip\b/.test(request.headers["accept-encoding"] || "") && /\.(?:html|txt|js|css|xml|json|svg)$/.test(file);
    let body = data;
    if (useGzip) {
      const modified = (await stat(file)).mtimeMs;
      const cached = compressed.get(file);
      if (cached?.modified === modified) body = cached.data;
      else { body = gzipSync(data); compressed.set(file, { modified, data: body }); }
    }
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Vary": "Accept-Encoding",
      ...(useGzip ? { "Content-Encoding": "gzip" } : {}),
      "Cache-Control": pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readFile(resolve(root, "404.html")));
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Static preview: http://localhost:${port}`),
);
