import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
// Discovered through next.config.ts only when approved products exist.
import { notFound } from "next/navigation";
import { getProduct, publishedProducts } from "@/data/products";
import { ProductDetail } from "@/components/catalog/product-detail";
export const dynamicParams = false;
export function generateStaticParams() {
  return publishedProducts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return pageMetadata(product.name, product.description, `/products/${product.slug}/`);
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
