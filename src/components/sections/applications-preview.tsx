import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { applicationPreviews, type ApplicationPreview } from "@/data/showcase";
import { EquipmentIllustration } from "@/components/ui/equipment-illustration";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
export function ApplicationsPreview({
  items = applicationPreviews,
}: {
  items?: ApplicationPreview[];
}) {
  if (!items.length) return null;
  return (
    <SectionWrapper className="section-navy applications-section">
      <div className="section-top">
        <SectionHeading
          eyebrow="TECHNOLOGY IN CONTEXT"
          title="Consider the whole environment."
          description="See how complementary categories can support different parts of an organization’s day."
        />
        <p className="context-note">
          Illustrative applications, not completed projects or verified
          installations.
        </p>
      </div>
      <div className="application-grid">
        {items.map((item) => (
          <article className="application-card" key={item.id}>
            <div className="application-art">
              <EquipmentIllustration variant={item.visual} label={item.title} />
            </div>
            <div className="application-copy">
              <p className="micro-label">
                {item.kind === "illustrative-application"
                  ? "ILLUSTRATIVE APPLICATION"
                  : "APPROVED PROJECT"}
              </p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="application-links">
                {item.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.title}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
