import { organizations } from "@/data/organizations";
import { RelationshipGrid } from "./relationship-grid";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
export function ClientPartnerPreview() {
  if (!organizations.length) return null;
  return (
    <SectionWrapper className="section-white">
      <SectionHeading
        eyebrow="CLIENTS & PARTNERS"
        title="Working relationships."
      />
      <RelationshipGrid items={organizations} />
    </SectionWrapper>
  );
}
