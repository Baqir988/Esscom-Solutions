import test from "node:test";
import assert from "node:assert/strict";
import {
  filterCatalog,
  catalogCategories,
  defaultCatalogFilters,
  filterProjects,
} from "../src/lib/catalog";
import { isApproved, officialWebsite } from "../src/lib/publication";
import { productInquiryHref } from "../src/lib/inquiry";
import {
  catalogItems,
  productCountByCategory,
  products,
  publishedProducts,
  selectPublishedProducts,
  relatedProducts,
  getProduct,
} from "../src/data/products";
import {
  projects,
  publishedProjects,
  selectPublishedProjects,
  getProject,
} from "../src/data/projects";
import { clients, publishedClients } from "../src/data/clients";
import { partners, publishedPartners } from "../src/data/partners";
import { createValidFileMatcher } from "next/dist/server/lib/find-page-file.js";
import type { CatalogItem, Product, Project } from "../src/types/catalog";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProductDetail } from "../src/components/catalog/product-detail";
import { ProjectDetail } from "../src/components/projects/project-detail";
import { MediaGallery } from "../src/components/ui/media-gallery";

// Synthetic records exist only in tests, never in the website data or public output.
const item: CatalogItem = {
  id: "test-a",
  name: "Alpha terminal",
  categoryId: "access",
  category: "Access",
  description: "Test record",
  keywords: ["fingerprint"],
  model: "TEST-42",
  visual: "biometric",
  kind: "product",
  href: "/test-only/",
};
const sample = [
  item,
  {
    ...item,
    id: "test-b",
    name: "Zulu display",
    categoryId: "display",
    category: "Displays",
    model: "TEST-99",
    keywords: ["screen"],
  },
];
test("search normalizes case/whitespace and matches names, categories, keywords, models", () => {
  for (const search of [
    "  ALPHA  ",
    "ACCESS",
    "fingerprint",
    "test-42",
    "alpha   terminal",
  ])
    assert.deepEqual(
      filterCatalog(sample, { ...defaultCatalogFilters, search }).map(
        (i) => i.id,
      ),
      ["test-a"],
    );
  assert.equal(
    filterCatalog(sample, { ...defaultCatalogFilters, search: "  " }).length,
    2,
  );
});
test("filters combine, empty results and reset restore correct counts", () => {
  assert.equal(
    filterCatalog(sample, {
      search: "screen",
      category: "access",
      sort: "category",
    }).length,
    0,
  );
  assert.equal(
    filterCatalog(sample, {
      search: "screen",
      category: "display",
      sort: "name-desc",
    }).length,
    1,
  );
  assert.equal(
    filterCatalog(sample, {
      ...defaultCatalogFilters,
      search: "no-such-record",
    }).length,
    0,
  );
  assert.equal(
    filterCatalog(sample, { ...defaultCatalogFilters }).length,
    sample.length,
  );
});
test("all sorting modes are deterministic and do not mutate source", () => {
  assert.deepEqual(
    filterCatalog(sample, defaultCatalogFilters).map((i) => i.id),
    ["test-a", "test-b"],
  );
  assert.deepEqual(
    filterCatalog(sample, { ...defaultCatalogFilters, sort: "name-desc" }).map(
      (i) => i.id,
    ),
    ["test-b", "test-a"],
  );
  assert.deepEqual(
    filterCatalog([...sample].reverse(), {
      ...defaultCatalogFilters,
      sort: "category",
    }).map((i) => i.id),
    ["test-a", "test-b"],
  );
  assert.equal(sample[0].id, "test-a");
  assert.equal(catalogCategories([item, item]).length, 1);
});
test("profile-based product catalog has unique items across nonempty categories and valid detail routes", () => {
  assert(catalogItems.length > 0);
  assert.equal(new Set(catalogItems.map((i) => i.id)).size, catalogItems.length);
  assert.equal(publishedProducts.length, 113);
  assert.equal(productCountByCategory.length, 13);
  assert(productCountByCategory.every((entry) => entry.count > 0));
  assert.equal(catalogCategories(catalogItems).length, 13);
  for (const entry of catalogItems) {
    assert.equal(entry.kind, "product");
    assert(entry.href.startsWith("/products/"));
    assert(entry.attributionLabel);
    assert(publishedProducts.some((product) => product.slug === entry.href.split("/").filter(Boolean).at(-1)));
  }
});

const product: Product = {
  id: "test-product",
  slug: "test-product",
  name: "Test-only product",
  categoryId: "queue-management",
  description: "Test-only description",
  overview: "Test-only overview",
  keywords: [],
  images: [
    {
      src: "/test-only.webp",
      alt: "Test-only",
      width: 400,
      height: 300,
      kind: "photograph",
      approved: false,
    },
  ],
  features: [
    { text: "Unverified", verified: false },
    { text: "Verified test feature", verified: true },
  ],
  specifications: [{ label: "Hidden", value: "Private", verified: false }],
  applications: [],
  relatedProductIds: [],
  published: true,
  verificationStatus: "approved",
  divisionAttribution: "unconfirmed",
  divisionLabel: "Test only",
  sourcePages: [],
};
test("publication requires approval and valid category; unverified media/specs/features are removed", () => {
  assert(
    !isApproved({
      published: true,
      verificationStatus: "historical-reference",
    }),
  );
  assert.equal(
    selectPublishedProducts([
      { ...product, verificationStatus: "pending" },
      { ...product, published: false },
      { ...product, categoryId: "unverified" },
    ]).length,
    0,
  );
  const selected = selectPublishedProducts([product])[0];
  assert.equal(selected.images.length, 0);
  assert.equal(selected.specifications.length, 0);
  assert.deepEqual(
    selected.features.map((f) => f.text),
    ["Verified test feature"],
  );
  assert.equal(getProduct("test-product"), undefined);
});
test("related products exclude self and connect same-category or explicit records", () => {
  const others = selectPublishedProducts([
    product,
    { ...product, id: "test-other", slug: "test-other" },
    {
      ...product,
      id: "test-pos",
      slug: "test-pos",
      categoryId: "unknown-category",
    },
  ]);
  assert.deepEqual(
    relatedProducts(product, others).map((p) => p.id),
    ["test-other"],
  );
  const withExplicitRelated = selectPublishedProducts([
    product,
    { ...product, id: "test-other", slug: "test-other" },
    { ...product, id: "test-pos", slug: "test-pos" },
  ]);
  assert.equal(
    relatedProducts({ ...product, relatedProductIds: ["test-pos"] }, withExplicitRelated).length,
    2,
  );
});
const project: Project = {
  id: "test-project",
  slug: "test-project",
  title: "Test-only project",
  industry: "Test industry",
  solutionIds: ["queue-management"],
  description: "Test",
  overview: "Test",
  requirement: "Test",
  solutionProvided: "Test",
  equipment: [],
  scope: "Test",
  outcomes: [{ text: "Unverified outcome", verified: false }],
  images: [],
  relatedProductIds: [],
  published: true,
  verificationStatus: "approved",
};
test("projects need approved photographs; combined portfolio filters work", () => {
  assert.equal(selectPublishedProjects([project]).length, 0);
  const approved = {
    ...project,
    images: [
      {
        src: "/test-only.webp",
        alt: "Test-only photograph",
        width: 400,
        height: 300,
        approved: true,
        kind: "photograph" as const,
      },
    ],
  };
  const selected = selectPublishedProjects([
    approved,
    { ...approved, published: false },
  ]);
  assert.equal(selected.length, 1);
  assert.equal(selected[0].outcomes.length, 0);
  assert.equal(
    filterProjects(selected, "queue-management", "Test industry").length,
    1,
  );
  assert.equal(
    filterProjects(selected, "cctv-surveillance", "Test industry").length,
    0,
  );
  assert.equal(filterProjects(selected, "all", "other").length, 0);
  assert.equal(filterProjects(selected, "all", "all").length, 1);
  assert.equal(getProject("test-project"), undefined);
});
test("inquiry adapter encodes actual product name and stays absent without verified email", () => {
  assert.equal(productInquiryHref("A&B", null), undefined);
  assert.equal(productInquiryHref("A&B", "invalid"), undefined);
  const url = new URL(productInquiryHref("A&B / Test", "test@example.com")!);
  assert.equal(url.searchParams.get("subject"), "Product enquiry: A&B / Test");
  assert(url.searchParams.get("body")?.includes("A&B / Test"));
});
test("current data has no fabricated records or broken references", () => {
  for (const records of [products, projects, clients, partners])
    assert.equal(new Set(records.map((r) => r.id)).size, records.length);
  assert(publishedProducts.every((p) => p.verificationStatus === "profile-reference" || isApproved(p)));
  for (const records of [publishedProjects, publishedClients, publishedPartners]) assert(records.every(isApproved));
  assert.equal(officialWebsite("javascript:alert(1)"), undefined);
  assert.equal(officialWebsite("https://example.com"), "https://example.com/");
  for (const p of products) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug));
    for (const id of p.relatedProductIds)
      assert(products.some((r) => r.id === id));
  }
  for (const p of projects)
    for (const id of p.relatedProductIds)
      assert(products.some((r) => r.id === id));
});
test("Next route matcher discovers detail templates only when their extension is enabled", () => {
  const empty = createValidFileMatcher(["tsx", "ts"], undefined);
  assert(!empty.isAppRouterPage("/products/[slug]/page.product.tsx"));
  assert(!empty.isAppRouterPage("/projects/[slug]/page.project.tsx"));
  const enabled = createValidFileMatcher(
    ["tsx", "ts", "product.tsx", "project.tsx"],
    undefined,
  );
  assert(enabled.isAppRouterPage("/products/[slug]/page.product.tsx"));
  assert(enabled.isAppRouterPage("/projects/[slug]/page.project.tsx"));
});
test("product detail template renders real sections and omits unsupported specifications and quote links", () => {
  const html = renderToStaticMarkup(
    createElement(ProductDetail, {
      product: selectPublishedProducts([product])[0],
    }),
  );
  assert(html.includes("PRODUCT OVERVIEW"));
  assert(html.includes("Verified test feature"));
  assert(!html.includes("specification-table"));
  assert(!html.includes("mailto:"));
  assert(!html.includes("Unverified"));
  assert(!html.includes("Private"));
  const withSpecs = renderToStaticMarkup(
    createElement(ProductDetail, {
      product: {
        ...product,
        specifications: [
          {
            label: "Test field",
            value: "Test-only verified value",
            verified: true,
          },
        ],
      },
    }),
  );
  assert(withSpecs.includes('scope="row"'));
  assert(withSpecs.includes("Test-only verified value"));
});
test("gallery renders only approved media with thumbnail selection controls", () => {
  const images = [0, 1, 2].map((index) => ({
    src: `/test-only-${index}.webp`,
    alt: `Test image ${index}`,
    width: 400,
    height: 300,
    kind: "photograph" as const,
    approved: index < 2,
  }));
  const html = renderToStaticMarkup(
    createElement(MediaGallery, { images, title: "Test gallery" }),
  );
  assert.equal([...html.matchAll(/<button/g)].length, 2);
  assert(html.includes('aria-pressed="true"'));
  assert(html.includes('aria-pressed="false"'));
  assert(!html.includes("test-only-2"));
  assert(html.includes("1 of 2"));
});
test("project detail template keeps requirements, scope, and related solution links without unverified outcomes", () => {
  const html = renderToStaticMarkup(createElement(ProjectDetail, { project }));
  for (const section of [
    "PROJECT OVERVIEW",
    "THE REQUIREMENT",
    "SOLUTION PROVIDED",
    "INSTALLATION SCOPE",
    "RELATED SOLUTIONS",
  ])
    assert(html.includes(section));
  assert(!html.includes("Unverified outcome"));
  assert(/href="\/solutions\/queue-management\/?"/.test(html));
});
