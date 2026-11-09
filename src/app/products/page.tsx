import { pageMetadata } from "@/lib/metadata";
import { catalogItems, publishedProducts } from "@/data/products";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { EquipmentIllustration } from "@/components/ui/equipment-illustration";
import { PrimaryButton } from "@/components/ui/buttons";
import { ContactCTA } from "@/components/ui/contact-cta";
import { ProductCatalog } from "@/components/catalog/product-catalog";
import { ProductCategoryDirectory } from "@/components/catalog/category-directory";
export const metadata = pageMetadata("Products & Equipment", "Browse products and equipment categories found in the supplied Techno World International profile. Division ownership and current availability are labeled for each reference.", "/products/");
export default function ProductsPage() {
  const hasProducts = publishedProducts.length > 0;
  return (
    <>
      <PageHero
        eyebrow="PRODUCTS & EQUIPMENT"
        title="Explore our technology & equipment."
        description="Browse equipment, systems, and services documented across the company profile, with division attribution shown wherever the source identifies it."
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
        <div className="catalog-category-intro"><SectionHeading eyebrow="BROWSE BY CATEGORY" title="Start with the equipment area." description="Every category opens a dedicated view of all catalog references assigned to it. No category is limited to featured items." /></div>
        <ProductCategoryDirectory />
        <div className="section-top">
          <SectionHeading
            eyebrow={hasProducts ? "COMPLETE CATALOG" : "EQUIPMENT EXPLORER"}
            title={
              hasProducts
                ? "Search across every product reference."
                : "Browse the profile product references."
            }
            description="Search across product names, models and keywords, or filter the profile references by category."
          />
          <p className="context-note">
            {hasProducts
              ? "Profile-sourced category records. Current product ownership, models, availability, and pricing are not confirmed by this historical document."
              : "This historical profile catalog is not a confirmation of current ESSCOM stock or services. Every record identifies its source and division attribution status."}
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
