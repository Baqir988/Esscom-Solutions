import { Container } from "./container";
import { Breadcrumb } from "./breadcrumb";
import type { NavigationItem } from "@/types/site";
import type { ReactNode } from "react";
export function PageHero({
  title,
  description,
  breadcrumbs,
  eyebrow,
  visual,
  actions,
}: {
  title: string;
  description: string;
  breadcrumbs: NavigationItem[];
  eyebrow?: string;
  visual?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Container>
        <Breadcrumb items={breadcrumbs} />
        <div className={visual ? "page-hero-grid" : undefined}>
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            <p className="page-hero-description">{description}</p>
            {actions && <div className="hero-actions">{actions}</div>}
          </div>
          {visual}
        </div>
      </Container>
    </section>
  );
}
