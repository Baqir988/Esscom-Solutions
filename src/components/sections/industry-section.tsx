import {
  Landmark,
  HeartPulse,
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  Store,
} from "lucide-react";
import { industries } from "@/data/industries";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
const icons = {
  bank: Landmark,
  health: HeartPulse,
  education: GraduationCap,
  public: Building2,
  office: BriefcaseBusiness,
  retail: Store,
};
export function IndustrySection({
  title = "Different environments. Shared operational needs.",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  return (
    <SectionWrapper className={className}>
      <div className="section-top">
        <SectionHeading
          eyebrow="INDUSTRIES & APPLICATIONS"
          title={title}
          description="Explore where these systems can be applied, from a reception desk to a complete workplace."
        />
        <p className="context-note">
          Potential applications, not a list of confirmed ESSCOM clients.
        </p>
      </div>
      <div className="industry-grid">
        {industries.map((industry) => {
          const Icon = icons[industry.icon];
          return (
            <article className="industry-card" key={industry.id}>
              <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
