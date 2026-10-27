import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedSolutions, getSolution } from "@/data/solutions";
import { SolutionDetail } from "@/components/solutions/solution-detail";

export const dynamicParams = false;
export function generateStaticParams() {
  return publishedSolutions.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  return pageMetadata(solution.title, solution.metaDescription, `/solutions/${solution.slug}/`);
}
export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  return <SolutionDetail solution={solution} />;
}
