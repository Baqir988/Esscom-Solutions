import test from "node:test";
import assert from "node:assert/strict";
import { deploymentConfig } from "../src/lib/deployment";
import { publicContentPaths } from "../src/lib/routes";
import { publishedProducts } from "../src/data/products";
import { publishedProjects } from "../src/data/projects";
import { productCategories } from "../src/data/product-categories";
import { segmentAlias } from "../scripts/fix-static-segments.mjs";

test("Windows RSC compatibility aliases preserve routes and leave normal exports untouched", () => {
  assert.equal(segmentAlias("about/__next.about/__PAGE__.txt"), "about/__next.about.__PAGE__.txt");
  assert.equal(segmentAlias("solutions\\queue-management\\__next.solutions\\$d$slug\\__PAGE__.txt"), "solutions/queue-management/__next.solutions.$d$slug.__PAGE__.txt");
  for (const path of ["about/index.txt", "about/__next._tree.txt", "about/__next.about/image.png"]) assert.equal(segmentAlias(path), undefined);
});

test("staging is the default and never invents a domain", () => {
  assert.deepEqual(deploymentConfig({}), { url: undefined, indexable: false });
  assert.deepEqual(deploymentConfig({ NEXT_PUBLIC_SITE_URL: "https://example.test/" }), { url: "https://example.test", indexable: false });
});
test("Vercel preview cannot inherit production indexing or canonical host", () => {
  const config = deploymentConfig({ VERCEL_ENV: "preview", VERCEL_URL: "test-preview.vercel.app", NEXT_PUBLIC_SITE_URL: "https://example.test", SITE_INDEXING: "production" });
  assert.deepEqual(config, { url: "https://test-preview.vercel.app", indexable: false });
  assert.equal(deploymentConfig({ VERCEL_ENV: "preview", NEXT_PUBLIC_SITE_URL: "https://example.test" }).url, undefined);
});
test("production indexing requires explicit intent and a safe canonical origin", () => {
  assert.equal(deploymentConfig({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://example.test", SITE_INDEXING: "production" }).indexable, true);
  assert.equal(deploymentConfig({ VERCEL_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "example.vercel.app" }).indexable, false);
  assert.throws(() => deploymentConfig({ SITE_INDEXING: "production" }));
  for (const value of ["http://example.test", "https://example.test/path", "https://example.test/?q=x", "https://user:secret@example.test", "invalid"])
    assert.throws(() => deploymentConfig({ NEXT_PUBLIC_SITE_URL: value }));
});
test("public route inventory excludes legal staging and unapproved detail records", () => {
  assert.equal(new Set(publicContentPaths).size, publicContentPaths.length);
  assert(!publicContentPaths.includes("/privacy/"));
  assert.equal(publicContentPaths.filter((path) => path.startsWith("/products/") && !path.startsWith("/products/category/") && path !== "/products/").length, publishedProducts.length);
  assert.equal(publicContentPaths.filter((path) => path.startsWith("/products/category/")).length, productCategories.length);
  assert.equal(publicContentPaths.filter((path) => path.startsWith("/projects/") && path !== "/projects/").length, publishedProjects.length);
});
