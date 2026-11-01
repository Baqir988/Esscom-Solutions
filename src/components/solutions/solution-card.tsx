import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SolutionIcon } from "@/components/ui/solution-icon";
import { solutionHref } from "@/data/solutions";
import type { Solution } from "@/types/solution";
import { solutionMedia } from "@/data/media";
import { ApprovedImage } from "@/components/ui/approved-image";

export function SolutionCard({
  solution,
  index = 0,
  detailed = false,
}: {
  solution: Solution;
  index?: number;
  detailed?: boolean;
}) {
  const image = solutionMedia(solution.slug);
  return (
    <Card className="solution-card linked-card">
      {image && (
        <figure className="solution-card-media">
          <ApprovedImage image={image} label={solution.title} visual={solution.visual} />
          <figcaption>{image.caption}</figcaption>
        </figure>
      )}
      <div className="card-top">
        <span className="solution-icon">
          <SolutionIcon name={solution.icon} />
        </span>
        <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{solution.title}</h3>
      <p>{solution.shortDescription}</p>
      {detailed && (
        <ul className="category-equipment">
          {solution.equipment.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
      <Link
        className="card-link stretched-link"
        href={solutionHref(solution.slug)}
        aria-label={`Explore solution: ${solution.title}`}
      >
        Explore solution <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </Card>
  );
}
export function SolutionGrid({
  solutions,
  detailed = false,
}: {
  solutions: Solution[];
  detailed?: boolean;
}) {
  return (
    <div className="solution-grid">
      {solutions.map((solution, index) => (
        <SolutionCard
          solution={solution}
          index={index}
          detailed={detailed}
          key={solution.slug}
        />
      ))}
    </div>
  );
}
