import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { SystemIllustration } from "@/components/ui/system-illustration";
import { ConnectedSystems } from "@/components/ui/connected-systems";
import { ContactCTA } from "@/components/ui/contact-cta";
import { SolutionGrid } from "@/components/solutions/solution-card";
import { IndustrySection } from "@/components/sections/industry-section";
import { EquipmentSection } from "@/components/sections/equipment-section";
import { ProjectPreview } from "@/components/sections/project-preview";
import { ClientPartnerPreview } from "@/components/sections/client-partner-preview";
import { WhyEsscom } from "@/components/sections/why-esscom";
import { publishedSolutions } from "@/data/solutions";
import { companyIntroduction, capabilityHighlights } from "@/data/company";

export const metadata = pageMetadata("ESSCOM | Technology, Security & Automation Solutions", "Explore ESSCOM security, attendance, queue management, point-of-sale, and digital signage solutions for modern organizations.", "/");
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Container>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span /> TECHNOLOGY WITH PURPOSE
              </p>
              <h1>
                Smarter Systems.
                <br />
                Safer Spaces.
                <br />
                <span>Better Operations.</span>
              </h1>
              <p className="hero-description">
                Explore technology, security, and automation solutions designed
                to support modern organizations and their operational needs.
              </p>
              <div className="hero-actions">
                <PrimaryButton href="/solutions/">
                  Explore Solutions
                </PrimaryButton>
                <SecondaryButton href="/about/">
                  About ESSCOM <ArrowRight size={18} aria-hidden="true" />
                </SecondaryButton>
              </div>
              <div className="hero-footnote">
                <span className="small-rule" />
                Security & surveillance <span aria-hidden="true">/</span>{" "}
                Business automation
              </div>
            </div>
            <SystemIllustration />
          </div>
          <div className="hero-bottom">
            <span>
              ESSCOM <span className="hero-bottom-separator">/</span> CONNECTING
              TECHNOLOGY TO EVERYDAY OPERATIONS
            </span>
            <Link href="#core-solutions">
              Discover the possibilities{" "}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
      <SectionWrapper
        id="core-solutions"
        aria-labelledby="core-solutions-heading"
      >
        <div className="section-top">
          <SectionHeading
            eyebrow="OUR CORE SOLUTIONS"
            title="Purposeful technology. Practical possibilities."
            description="Five areas of technology, connected by a focus on everyday organizational needs."
            id="core-solutions-heading"
          />
          <Link className="text-link" href="/solutions/">
            View all solutions <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <SolutionGrid solutions={publishedSolutions} />
      </SectionWrapper>
      <SectionWrapper className="section-white">
        <div className="split-layout about-intro">
          <ConnectedSystems />
          <div className="editorial-copy">
            <SectionHeading
              eyebrow="ABOUT ESSCOM"
              title="Technology solutions for modern organizations."
            />
            {companyIntroduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="capability-highlights">
              {capabilityHighlights.map((text) => (
                <li key={text}>
                  <Check size={17} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            <SecondaryButton href="/about/" arrow>
              Learn more about ESSCOM
            </SecondaryButton>
          </div>
        </div>
      </SectionWrapper>
      <IndustrySection />
      <WhyEsscom />
      <EquipmentSection />
      <ProjectPreview fallback />
      <ClientPartnerPreview />
      <ContactCTA />
    </>
  );
}
