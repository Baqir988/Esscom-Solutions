import { approachSteps } from "@/data/company";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
export function ApproachSection() {
  return (
    <SectionWrapper className="section-white">
      <SectionHeading
        eyebrow="A PRACTICAL APPROACH"
        title="Start with the requirement. Build a clear plan."
        description="A useful framework for considering technology, before choosing individual devices."
      />
      <ol className="process-grid">
        {approachSteps.map((step, index) => (
          <li key={step.title}>
            <span className="process-number">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
