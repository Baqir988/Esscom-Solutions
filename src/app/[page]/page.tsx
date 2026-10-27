import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { stagingPages } from "@/data/site";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SecondaryButton } from "@/components/ui/buttons";
export const dynamicParams = false;
export function generateStaticParams() {
  return stagingPages.map(({ slug }) => ({ page: slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const entry = stagingPages.find((entry) => entry.slug === page);
  if (!entry) notFound();
  return { ...pageMetadata(entry.title, entry.description, `/${entry.slug}/`), robots: { index: false, follow: false } };
}
export default async function StagingPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const entry = stagingPages.find((entry) => entry.slug === page);
  if (!entry) notFound();
  return (
    <>
      <PageHero
        title={entry.title}
        description={entry.description}
        eyebrow="WEBSITE PREVIEW · STAGING PAGE"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: entry.title, href: `/${entry.slug}/` },
        ]}
      />
      <SectionWrapper className="staging-content">
        <p>This page is reserved for a later development phase.</p>
        <SecondaryButton href="/" arrow>
          Return to homepage
        </SecondaryButton>
      </SectionWrapper>
    </>
  );
}
