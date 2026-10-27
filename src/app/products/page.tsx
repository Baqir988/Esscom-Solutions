import { pageMetadata } from "@/lib/metadata";
import { catalogItems, publishedProducts } from "@/data/products";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { EquipmentIllustration } from "@/components/ui/equipment-illustration";
import { PrimaryButton } from "@/components/ui/buttons";
import { ContactCTA } from "@/components/ui/contact-cta";
import { ProductCatalog } from "@/components/catalog/product-catalog";
export const metadata = pageMetadata("Products & Equipment", "Explore ESSCOM equipment categories for surveillance, access control, queues, point of sale, and digital signage. Search and filter by your requirements.", "/products/");
export default function ProductsPage() {
  const hasProducts = publishedProducts.length > 0;
  return (
    <>
      <PageHero
        eyebrow="PRODUCTS & EQUIPMENT"
        title="Explore our technology & equipment."
        description="From the entrance to the service counter, explore the equipment that connects your spaces, people, and operations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/" },
        ]}
        visual={
          <figure className="solution-hero-art">
            <EquipmentIllustration
              variant="biometric"
              label="Attendance equipment concept"
            />
            <figcaption>Equipment category · Concept illustration</figcaption>
          </figure>
        }
        actions={
          <PrimaryButton href="#equipment-catalog">
            Browse the catalog
          </PrimaryButton>
        }
      />
      <SectionWrapper id="equipment-catalog" className="section-white">
        <div className="section-top">
          <SectionHeading
            eyebrow={hasProducts ? "PRODUCT CATALOG" : "EQUIPMENT EXPLORER"}
            title={
              hasProducts
                ? "Find equipment for your requirements."
                : "Start with the right equipment category."
            }
            description="Search by name or keyword, narrow the category, and compare the possibilities."
          />
          <p className="context-note">
            {hasProducts
              ? "Published product information. Pricing and suitability are confirmed through an enquiry."
              : "Category-level information only. Specific models, specifications, and availability await approval."}
          </p>
        </div>
        <ProductCatalog items={catalogItems} />
      </SectionWrapper>
      <SectionWrapper>
        <div className="split-layout overview-layout">
          <SectionHeading
            eyebrow="A CONSIDERED SELECTION"
            title="Equipment makes sense in context."
          />
          <div className="editorial-copy">
            <p>
              Consider the task, installation environment, and existing systems
              before choosing a model. The solution pages explain how each
              category can fit into an organization’s workflow.
            </p>
            <p>
              Current specifications, compatibility, and supply details should
              be confirmed against the agreed requirement. This catalog is an
              information resource; it does not offer online purchasing.
            </p>
          </div>
        </div>
      </SectionWrapper>
      <ContactCTA
        title="Start with what your organization needs."
        description="Explore the wider solution, then consider the equipment and operating requirements together."
      />
    </>
  );
}
