import { pageMetadata } from "@/lib/metadata";
import { Check } from "lucide-react";
import { publishedSolutions } from "@/data/solutions";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { PrimaryButton } from "@/components/ui/buttons";
import { ContactCTA } from "@/components/ui/contact-cta";
import { ConnectedSystems } from "@/components/ui/connected-systems";
import { SolutionGrid } from "@/components/solutions/solution-card";
import { IndustrySection } from "@/components/sections/industry-section";

export const metadata = pageMetadata("Technology Solutions", "Find ESSCOM solution guides for CCTV, biometric attendance and access control, queue management, point of sale, and digital signage.", "/solutions/");
export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="ESSCOM SOLUTIONS"
        title="Find the technology that fits your environment."
        description="Explore security, automation, and communication systems through the operational needs they can support."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions/" },
        ]}
        visual={<ConnectedSystems />}
        actions={
          <PrimaryButton href="#solution-categories">
            Explore the categories
          </PrimaryButton>
        }
      />
      <SectionWrapper className="section-white" id="solution-categories">
        <div className="section-top">
          <SectionHeading
            eyebrow="THE SOLUTION DIRECTORY"
            title="Start with what your organization needs to do."
            description="Observe a space. Record attendance. Organize a queue. Handle a transaction. Communicate clearly. Each guide connects an operational need to relevant equipment and selection considerations."
          />
        </div>
        <SolutionGrid solutions={publishedSolutions} detailed />
        <p className="content-note">
          These are solution categories, not a live product catalog. Specific
          equipment, specifications, availability, and system compatibility
          require confirmation.
        </p>
      </SectionWrapper>
      <IndustrySection />
      <SectionWrapper className="section-white">
        <div className="split-layout integration-layout">
          <ConnectedSystems />
          <div className="editorial-copy">
            <SectionHeading
              eyebrow="WHY INTEGRATION MATTERS"
              title="Individual devices. A shared environment."
            />
            <p>
              Technology rarely operates in isolation. A reception area may need
              a queue display and visitor information. An office may need
              attendance records, controlled entry, and camera coverage.
              Considering these needs together helps identify connections and
              boundaries before equipment is selected.
            </p>
            <p>
              An integrated view is a planning approach, not a promise that
              every device or software platform will connect automatically. The
              interfaces, information flows, and responsibilities need to be
              confirmed for the actual system.
            </p>
            <ul className="capability-highlights">
              {[
                "Review the workflow as well as the equipment",
                "Check compatibility with existing systems",
                "Define the scope and operating requirements",
              ].map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>
      <ContactCTA
        title="Start with your operational requirements."
        description="Explore a solution guide or view ESSCOM contact information as the next step in understanding a suitable system."
      />
    </>
  );
}
