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

export const metadata = pageMetadata("About ESSCOM", "Learn about ESSCOM’s focus on security, automation, and communication technology, its proposed direction, and a practical approach to organizational needs.", "/about/");
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT ESSCOM"
        title="Technology with a practical purpose."
        description="A focus on the systems that connect people, spaces, and everyday operations."
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
            eyebrow="OUR FOCUS"
            title="Relevant technology for real organizational needs."
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
            <h2>A focused identity within a broader reference.</h2>
          </div>
          <div className="editorial-copy">
            <p>
              The supplied company profile presents ESSCom Solutions among the
              divisions of Techno World International and also references Salman
              Traders and other business identities. Its broader range includes
              security, attendance, queue systems, point-of-sale equipment, and
              display technologies.
            </p>
            <p>
              This website develops ESSCOM’s positioning around those five
              technology areas. The wider profile provides context for the
              equipment categories; its company history, client lists, project
              records, and brand relationships are not presented here as
              ESSCOM-specific achievements.
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
            eyebrow="CORE TECHNOLOGY CAPABILITIES"
            title="Five areas. A connected perspective."
            description="Explore the categories at the heart of ESSCOM’s proposed business positioning."
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
