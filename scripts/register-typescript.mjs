// Test-only loader: use the already installed TypeScript compiler, no new runtime dependency.
import { registerHooks, createRequire } from "node:module";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
const root = resolve(".");
// Match Next's build-time .env loading when checking an existing export.
createRequire(import.meta.url)("@next/env").loadEnvConfig(root);
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "next/image")
      return { url: "test-next-image:interop", shortCircuit: true };
    let path;
    if (specifier.startsWith("@/"))
      path = resolve(root, "src", specifier.slice(2));
    else if (
      specifier.startsWith(".") &&
      context.parentURL?.startsWith("file:")
    )
      path = fileURLToPath(new URL(specifier, context.parentURL));
    if (path && !extname(path)) {
      for (const extension of [".ts", ".tsx"])
        if (existsSync(path + extension))
          return {
            url: pathToFileURL(path + extension).href,
            shortCircuit: true,
          };
    }
    if (path && existsSync(path) && statSync(path).isFile())
      return { url: pathToFileURL(path).href, shortCircuit: true };
    // Next's package subpaths resolve without suffix under the app bundler.
    if (
      specifier === "next/link" ||
      specifier === "next/navigation" ||
      specifier === "next/image"
    )
      return nextResolve(specifier + ".js", context);
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url === "test-next-image:interop")
      return {
        format: "module",
        shortCircuit: true,
        source: `import component from ${JSON.stringify(pathToFileURL(resolve(root, "node_modules/next/image.js")).href)}; export default component.default ?? component;`,
      };
    if (
      url.startsWith("file:") &&
      /\.tsx?$/.test(url) &&
      !url.includes("node_modules")
    ) {
      return {
        format: "module",
        shortCircuit: true,
        source: ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), {
          compilerOptions: {
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.ESNext,
            jsx: ts.JsxEmit.ReactJSX,
          },
        }).outputText,
      };
    }
    return nextLoad(url, context);
  },
});
