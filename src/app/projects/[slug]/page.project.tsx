import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
// Discovered through next.config.ts only when approved projects exist.
import { notFound } from "next/navigation";
import { getProject, publishedProjects } from "@/data/projects";
import { ProjectDetail } from "@/components/projects/project-detail";
export const dynamicParams = false;
export function generateStaticParams() {
  return publishedProjects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.description, `/projects/${project.slug}/`);
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
