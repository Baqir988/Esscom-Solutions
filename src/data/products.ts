import type { Product, CatalogItem } from "@/types/catalog";
import { publishedSolutions, getSolution, solutionHref } from "./solutions";
import { isApproved } from "../lib/publication";
import { quoteHref } from "../lib/contact";

// Add only reviewed public copy here; keep private/historical source records outside src/.
export const products: Product[] = [];
export function selectPublishedProducts(records: Product[]) {
  return records
    .filter((item) => isApproved(item) && !!getSolution(item.categoryId))
    .map((item) => ({
      ...item,
      images: item.images.filter((image) => image.approved),
      features: item.features.filter((feature) => feature.verified),
      specifications: item.specifications.filter(
        (specification) => specification.verified,
      ),
    }));
}
export const publishedProducts = selectPublishedProducts(products);
export const productHref = (slug: string) => `/products/${slug}/`;
export const getProduct = (slug: string) =>
  publishedProducts.find((item) => item.slug === slug);
export function relatedProducts(
  product: Product,
  candidates = publishedProducts,
) {
  return candidates
    .filter(
      (item) =>
        item.id !== product.id &&
        (product.relatedProductIds.includes(item.id) ||
          item.categoryId === product.categoryId),
    )
    .slice(0, 3);
}
export function toProductCard(product: Product): CatalogItem {
  const category = getSolution(product.categoryId)!;
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    categoryId: category.slug,
    category: category.shortTitle,
    keywords: product.keywords,
    model: product.model,
    visual: category.visual,
    image: product.images[0],
    kind: "product",
    href: productHref(product.slug),
    quoteHref: quoteHref(product.name),
  };
}
// Equipment categories reuse the approved Phase 2 category descriptions, not model records.
export const equipmentCatalog: CatalogItem[] = publishedSolutions.flatMap(
  (solution) =>
    solution.equipment.map((equipment) => ({
      id: `equipment-${equipment.id}`,
      name: equipment.title,
      description: equipment.description,
      categoryId: solution.slug,
      category: solution.shortTitle,
      keywords: [solution.title, equipment.title],
      visual: equipment.visual,
      kind: "equipment-category" as const,
      href: solutionHref(solution.slug),
      quoteHref: quoteHref(equipment.title),
    })),
);
export const catalogItems = publishedProducts.length
  ? publishedProducts.map(toProductCard)
  : equipmentCatalog;
export const featuredCatalogItems = catalogItems
  .filter(
    (item) =>
      item.kind === "product" ||
      [
        "equipment-attendance-terminals",
        "equipment-rfid-readers",
        "equipment-cctv-cameras",
        "equipment-queue-displays",
        "equipment-pos-terminals",
        "equipment-signage-screens",
      ].includes(item.id),
  )
  .slice(0, 6);
