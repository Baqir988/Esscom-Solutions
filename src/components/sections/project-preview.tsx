import { publishedProjects } from "@/data/projects";
import { publishedSolutions } from "@/data/solutions";
import { ApplicationsPreview } from "./applications-preview";
import { ProjectGrid } from "@/components/projects/project-card";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { SecondaryButton } from "@/components/ui/buttons";
export function ProjectPreview({
  solutionId,
  fallback = false,
}: {
  solutionId?: string;
  fallback?: boolean;
}) {
  const items = publishedProjects
    .filter(
      (project) => !solutionId || project.solutionIds.includes(solutionId),
    )
    .slice(0, 3);
  if (!items.length) return fallback ? <ApplicationsPreview /> : null;
  return (
    <SectionWrapper className="section-white">
      <div className="section-top">
        <SectionHeading eyebrow="PROJECTS" title="Technology in practice." />
        <SecondaryButton href="/projects/" arrow>
          View portfolio
        </SecondaryButton>
      </div>
      <ProjectGrid
        items={items}
        categories={publishedSolutions.map((item) => ({
          id: item.slug,
          name: item.shortTitle,
        }))}
      />
    </SectionWrapper>
  );
}
