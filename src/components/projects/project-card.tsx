import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/catalog";
import { ApprovedImage } from "@/components/ui/approved-image";
export function ProjectGrid({
  items,
  categories,
}: {
  items: Project[];
  categories: { id: string; name: string }[];
}) {
  return (
    <div className="equipment-grid project-grid">
      {items.map((project) => (
        <article className="equipment-card project-card" key={project.id}>
          <div className="project-card-image">
            <ApprovedImage image={project.images[0]} label={project.title} />
          </div>
          <div className="equipment-copy">
            <p className="micro-label">{project.industry}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul className="category-tags">
              {project.solutionIds.map((id) => (
                <li key={id}>
                  {categories.find((item) => item.id === id)?.name}
                </li>
              ))}
            </ul>
            <Link
              href={`/projects/${project.slug}/`}
              className="text-link"
              aria-label={`View project: ${project.title}`}
            >
              View project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
