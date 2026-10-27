import { pageMetadata } from "@/lib/metadata";
import { Building2, Network } from "lucide-react";
import { publishedClients } from "@/data/clients";
import { publishedPartners } from "@/data/partners";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactCTA } from "@/components/ui/contact-cta";
import { IndustrySection } from "@/components/sections/industry-section";
import { RelationshipGrid } from "@/components/sections/relationship-grid";
import { ProjectPreview } from "@/components/sections/project-preview";
export const metadata = pageMetadata("Clients, Industries & Technology Partners", "Explore relevant industry applications and ESSCOM’s client and technology-partner publication area. Names and logos are shared only with verified attribution and approval.", "/clients-partners/");
export default function ClientsPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="BUSINESS RELATIONSHIPS"
        title="Clients, industries & technology partners."
        description="Relevant technology begins with an understanding of the organizations and environments it serves."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Clients & Partners", href: "/clients-partners/" },
        ]}
      />
      <IndustrySection />
      <SectionWrapper className="section-white">
        <div className="section-top">
          <SectionHeading
            eyebrow="OUR CLIENTS"
            title="References built on clear attribution."
            description="Client names and logos are published only when the relationship and permission to share them have been confirmed."
          />
        </div>
        {publishedClients.length ? (
          <RelationshipGrid items={publishedClients} />
        ) : (
          <div className="relationship-pending">
            <Building2 size={30} aria-hidden="true" />
            <div>
              <h3>Client references awaiting approval.</h3>
              <p>
                There are no approved ESSCOM client names or logos to display
                yet. The industry examples above illustrate potential
                applications of the solutions.
              </p>
            </div>
          </div>
        )}
      </SectionWrapper>
      <SectionWrapper>
        <div className="section-top">
          <SectionHeading
            eyebrow="TECHNOLOGY PARTNERS"
            title="Relationships with a defined role."
            description="Technology partnerships are distinguished from product manufacturers and historical profile references."
          />
        </div>
        {publishedPartners.length ? (
          <RelationshipGrid items={publishedPartners} />
        ) : (
          <div className="relationship-pending">
            <Network size={30} aria-hidden="true" />
            <div>
              <h3>Partner details awaiting confirmation.</h3>
              <p>
                Current ESSCOM partnerships and logo permissions are being
                verified. No exclusive, certified, or authorized relationship is
                claimed in this preview.
              </p>
            </div>
          </div>
        )}
      </SectionWrapper>
      <ProjectPreview />
      <ContactCTA
        title="Explore technology for your organization."
        description="Discover solution applications across workplaces, service environments, and commercial spaces."
      />
    </>
  );
}
