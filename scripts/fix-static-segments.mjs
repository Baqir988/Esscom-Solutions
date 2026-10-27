import { readdir, readFile, copyFile } from "node:fs/promises";
import { resolve, relative, join } from "node:path";
import { fileURLToPath } from "node:url";

// Next 16 Windows exports can write nested RSC segment names while its client
// requests dot-separated names. Add portable aliases without altering source files.
// Upstream: https://github.com/vercel/next.js/issues/85374
export function segmentAlias(path) {
  const parts = path.split(/[\\/]/);
  const index = parts.findIndex((part) => part.startsWith("__next."));
  if (index < 0 || index === parts.length - 1 || !path.endsWith(".txt")) return undefined;
  return [...parts.slice(0, index), parts.slice(index).join(".")].join("/");
}
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name)))).flat();
}
export async function fixStaticSegments(root = resolve("out")) {
  let count = 0;
  for (const file of await walk(root)) {
    const alias = segmentAlias(relative(root, file));
    if (!alias) continue;
    const destination = resolve(root, alias);
    const existing = await readFile(destination).catch((error) => { if (error.code !== "ENOENT") throw error; });
    if (existing) {
      if (!existing.equals(await readFile(file))) throw new Error(`Conflicting RSC alias: ${alias}`);
    } else { await copyFile(file, destination); count++; }
  }
  console.log(`Static segment compatibility: ${count} aliases added.`);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await fixStaticSegments();
