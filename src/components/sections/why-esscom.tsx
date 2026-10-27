import {
  ScanLine,
  Layers3,
  BriefcaseBusiness,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";
import { positioningThemes } from "@/data/company";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
const icons = [
  ScanLine,
  Layers3,
  BriefcaseBusiness,
  Settings2,
  SlidersHorizontal,
];
export function WhyEsscom() {
  return (
    <SectionWrapper className="section-white">
      <div className="split-layout why-layout">
        <div>
          <SectionHeading
            eyebrow="WHY CONSIDER ESSCOM"
            title="Technology choices with operations in mind."
            description="A practical perspective on the systems an organization uses every day."
          />
          <p className="editorial-statement">
            The starting point is a useful question:{" "}
            <span>what does your organization need the technology to do?</span>
          </p>
        </div>
        <div className="reason-list">
          {positioningThemes.map((theme, index) => {
            const Icon = icons[index];
            return (
              <article key={theme.title}>
                <span className="reason-icon">
                  <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3>{theme.title}</h3>
                  <p>{theme.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
