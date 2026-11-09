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
import { ProductGrid } from "@/components/catalog/product-card";
import { featuredCatalogItems } from "@/data/products";
import { IndustrySection } from "@/components/sections/industry-section";
import { EquipmentSection } from "@/components/sections/equipment-section";
import { ProjectPreview } from "@/components/sections/project-preview";
import { ClientPartnerPreview } from "@/components/sections/client-partner-preview";
import { WhyEsscom } from "@/components/sections/why-esscom";
import { companyIntroduction, capabilityHighlights } from "@/data/company";

export const metadata = pageMetadata("ESSCOM | Company Profile & Equipment", "Browse equipment and technology references from the supplied Techno World International profile, with division attribution and current availability clearly distinguished.", "/");
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
                The supplied profile identifies an ESS-Queue Management System and shows a display marked Powered by ESSCOM Solutions.
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
                Queue tickets <span aria-hidden="true">/</span>{" "}
                Counter displays
              </div>
            </div>
            <SystemIllustration />
          </div>
          <div className="hero-bottom">
            <span>
              ESSCOM <span className="hero-bottom-separator">/</span> QUEUE MANAGEMENT
              PROFILE REFERENCE
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
            eyebrow="PROFILE-SOURCED CATEGORIES"
            title="Technology and equipment referenced in the profile."
            description="The wider company document lists equipment across security, attendance, retail, display, and office categories. Each catalog record distinguishes ESSCom-specific references, other divisions, and ownership that remains unconfirmed."
            id="core-solutions-heading"
          />
          <Link className="text-link" href="/products/">
            Explore the product catalog <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <ProductGrid items={featuredCatalogItems} />
      </SectionWrapper>
      <SectionWrapper className="section-white">
        <div className="split-layout about-intro">
          <ConnectedSystems />
          <div className="editorial-copy">
            <SectionHeading
              eyebrow="ABOUT ESSCOM"
              title="Company profile context, carefully separated."
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
