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
import { ProductCategoryDirectory } from "@/components/catalog/category-directory";
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
                Technology for
                <br />
                <span>better operations.</span>
              </h1>
              <p className="hero-description">
                The company profile documents equipment across security, workplace, and customer-service categories. It specifically identifies an ESS-Queue Management System with ESSCom Solutions.
              </p>
              <div className="hero-actions">
                <PrimaryButton href="/products/">
                  Explore Equipment
                </PrimaryButton>
                <SecondaryButton href="/about/">
                  About ESSCOM <ArrowRight size={18} aria-hidden="true" />
                </SecondaryButton>
              </div>
              <div className="hero-footnote">
                <span className="small-rule" />
                Queue management <span aria-hidden="true">/</span> Attendance <span aria-hidden="true">/</span> Security <span aria-hidden="true">/</span> Retail
              </div>
            </div>
            <SystemIllustration />
          </div>
          <div className="hero-bottom">
            <span>
              PROFILE-REFERENCED TECHNOLOGY PORTFOLIO <span className="hero-bottom-separator">/</span> DIVISION ATTRIBUTION SHOWN THROUGHOUT
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
            eyebrow="EXPLORE THE CATALOG"
            title="A portfolio spanning workplace and service technology."
            description="Browse categories documented across the company profile. Each category keeps its source and division context visible, so historic group references are not confused with confirmed ESSCOM offerings."
            id="core-solutions-heading"
          />
          <Link className="text-link" href="/products/">
            Explore the product catalog <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <ProductCategoryDirectory limit={6} />
        <div className="catalog-browse-footer"><span>Explore all documented equipment categories</span><Link className="button button-secondary" href="/products/">Open complete catalog <ArrowRight size={17}/></Link></div>
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
