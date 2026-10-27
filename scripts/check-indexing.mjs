import { spawnSync } from "node:child_process";
const node = process.execPath;
function run(args, env) {
  const result = spawnSync(node, args, { env: { ...process.env, ...env }, stdio: "inherit" });
  if (result.status !== 0) throw new Error("Indexing check command failed: " + args.join(" "));
}
const modes = [
  { NEXT_PUBLIC_SITE_URL: "https://example.test", SITE_INDEXING: "production", VERCEL_ENV: "production", VERCEL_URL: "", VERCEL_PROJECT_PRODUCTION_URL: "" },
  { NEXT_PUBLIC_SITE_URL: "https://example.test", SITE_INDEXING: "production", VERCEL_ENV: "preview", VERCEL_URL: "example-preview.vercel.app", VERCEL_PROJECT_PRODUCTION_URL: "" },
];
try {
  for (const env of modes) {
    run(["node_modules/next/dist/bin/next", "build"], env);
    run(["scripts/fix-static-segments.mjs"], env);
    run(["--import", "./scripts/register-typescript.mjs", "scripts/check-export.mjs"], env);
  }
} finally {
  // Always restore the actual current environment; test hostnames must not ship.
  run(["node_modules/next/dist/bin/next", "build"], {});
  run(["scripts/fix-static-segments.mjs"], {});
  run(["--import", "./scripts/register-typescript.mjs", "scripts/check-export.mjs"], {});
}
