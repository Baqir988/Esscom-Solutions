import type { Project } from "@/types/catalog";
import { getSolution } from "@/data/solutions";
import { publishedProducts, toProductCard } from "@/data/products";
import { projectHref } from "@/data/projects";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaGallery } from "@/components/ui/media-gallery";
import { ContactCTA } from "@/components/ui/contact-cta";
import { SolutionGrid } from "@/components/solutions/solution-card";
import { ProductGrid } from "@/components/catalog/product-card";
export function ProjectDetail({ project }: { project: Project }) {
  const solutions = project.solutionIds.flatMap((id) => {
    const solution = getSolution(id);
    return solution ? [solution] : [];
  });
  const products = publishedProducts.filter((item) =>
    project.relatedProductIds.includes(item.id),
  );
  const outcomes = project.outcomes.filter((item) => item.verified);
  return (
    <>
      <PageHero
        title={project.title}
        eyebrow={project.industry}
        description={project.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects/" },
          { label: project.title, href: projectHref(project.slug) },
        ]}
      />
      <SectionWrapper className="section-white">
        <div className="split-layout product-overview">
          <MediaGallery
            key={project.id}
            images={project.images}
            title={project.title}
          />
          <div className="editorial-copy">
            <SectionHeading
              eyebrow="PROJECT OVERVIEW"
              title="The installation in context."
            />
            <p>{project.overview}</p>
            {project.clientName && (
              <p>
                <strong>Client:</strong> {project.clientName}
              </p>
            )}
            <p>
              <strong>Industry:</strong> {project.industry}
            </p>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="direction-grid">
          <article>
            <p className="eyebrow">THE REQUIREMENT</p>
            <h2>The operational need.</h2>
            <p>{project.requirement}</p>
          </article>
          <article>
            <p className="eyebrow">SOLUTION PROVIDED</p>
            <h2>The technology response.</h2>
            <p>{project.solutionProvided}</p>
          </article>
        </div>
      </SectionWrapper>
      <SectionWrapper className="section-white">
        <div className="split-layout overview-layout">
          <div>
            <SectionHeading
              eyebrow="INSTALLATION SCOPE"
              title="What the work involved."
            />
            <p className="content-note">{project.scope}</p>
          </div>
          <div>
            <h2>Technology involved</h2>
            <ul className="detail-list">
              {project.equipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        {outcomes.length > 0 && (
          <div className="project-outcomes">
            <h2>Verified outcomes</h2>
            <ul className="detail-list">
              {outcomes.map((item) => (
                <li key={item.text}>{item.text}</li>
              ))}
            </ul>
          </div>
        )}
      </SectionWrapper>
      {products.length > 0 && (
        <SectionWrapper>
          <div className="section-top">
            <SectionHeading
              eyebrow="EQUIPMENT"
              title="Explore the published equipment."
            />
          </div>
          <ProductGrid items={products.map(toProductCard)} />
        </SectionWrapper>
      )}
      <SectionWrapper>
        <div className="section-top">
          <SectionHeading
            eyebrow="RELATED SOLUTIONS"
            title="Understand the technology behind the work."
          />
        </div>
        <SolutionGrid solutions={solutions} />
      </SectionWrapper>
      <ContactCTA
        inquiry={{ kind: "project", name: solutions.map((solution) => solution.title).join(", ") }}
        title="Planning a similar requirement?"
        description="Explore the relevant solution categories and consider the needs of your organization."
      />
    </>
  );
}
