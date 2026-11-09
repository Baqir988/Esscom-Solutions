import { featuredCatalogItems, publishedProducts } from "@/data/products";
import { ProductGrid } from "@/components/catalog/product-card";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { SecondaryButton } from "@/components/ui/buttons";
export function EquipmentSection() {
  return (
    <SectionWrapper>
      <div className="section-top">
        <SectionHeading
          eyebrow="EQUIPMENT IN FOCUS"
          title="The components behind the solution."
          description={
            publishedProducts.length
              ? "Browse equipment shown in the supplied company profile. Division ownership and current availability are identified for each reference."
              : "Explore equipment categories and their documented profile references."
          }
        />
        <SecondaryButton href="/products/" arrow>
          Explore the catalog
        </SecondaryButton>
      </div>
      <ProductGrid items={featuredCatalogItems} />
      <p className="content-note">These are historical profile references, not confirmation of current ESSCOM stock or capability.</p>
    </SectionWrapper>
  );
}
