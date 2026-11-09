import { pageMetadata } from "@/lib/metadata";
import { Target, Telescope } from "lucide-react";
import { companyIntroduction, proposedDirection } from "@/data/company";
import { publishedSolutions } from "@/data/solutions";
import { PageHero } from "@/components/ui/page-hero";
import { ConnectedSystems } from "@/components/ui/connected-systems";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { PrimaryButton } from "@/components/ui/buttons";
import { ContactCTA } from "@/components/ui/contact-cta";
import { SolutionGrid } from "@/components/solutions/solution-card";
import { IndustrySection } from "@/components/sections/industry-section";
import { ApproachSection } from "@/components/sections/approach-section";

export const metadata = pageMetadata("About ESSCOM", "Read the supplied profile context for ESSCom Solutions and its specifically identified queue-management system.", "/about/");
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT ESSCOM"
        title="About ESSCom Solutions."
        description="Company information is being verified against the supplied multi-division profile."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about/" },
        ]}
        visual={<ConnectedSystems />}
        actions={
          <PrimaryButton href="/solutions/">
            Explore our solutions
          </PrimaryButton>
        }
      />
      <SectionWrapper className="section-white">
        <div className="split-layout overview-layout">
          <SectionHeading
            eyebrow="PROFILE CONTEXT"
            title="A distinct division in a wider company profile."
          />
          <div className="editorial-copy">
            {companyIntroduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="background-panel">
          <div>
            <p className="eyebrow">COMPANY BACKGROUND</p>
            <h2>ESSCom Solutions and the wider profile.</h2>
          </div>
          <div className="editorial-copy">
            <p>
              The profile presents ESSCom Solutions alongside ESSCom Engineering,
              Techno Solar, and Technovation. It also contains material associated
              with Techno World International and Salman Traders.
            </p>
            <p>
              This wider document is historical reference material. Its products,
              projects, client list, partners, contacts, and company history are
              not treated as ESSCOM-specific or current without confirmation.
            </p>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper className="section-white">
        <div className="section-top">
          <SectionHeading
            eyebrow="MISSION & VISION"
            title="A clear direction for useful technology."
          />
          <p className="context-note">
            Proposed ESSCOM website wording, subject to company approval.
          </p>
        </div>
        <div className="direction-grid">
          <article>
            <Target size={29} strokeWidth={1.5} aria-hidden="true" />
            <h3>Our proposed mission</h3>
            <p>{proposedDirection.mission}</p>
          </article>
          <article>
            <Telescope size={29} strokeWidth={1.5} aria-hidden="true" />
            <h3>Our proposed vision</h3>
            <p>{proposedDirection.vision}</p>
          </article>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="section-top">
          <SectionHeading
            eyebrow="IDENTIFIED SOLUTION"
            title="The ESS-Queue Management System."
            description="The supplied profile identifies this system by name and includes a screen marked Powered by ESSCOM Solutions."
          />
        </div>
        <SolutionGrid solutions={publishedSolutions} />
      </SectionWrapper>
      <ApproachSection />
      <IndustrySection title="Technology considered in its setting." />
      <ContactCTA />
    </>
  );
}
