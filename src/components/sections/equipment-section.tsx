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
              ? "Explore published equipment across our technology categories."
              : "Get to know the equipment categories that support everyday operations."
          }
        />
        <SecondaryButton href="/products/" arrow>
          Explore the catalog
        </SecondaryButton>
      </div>
      <ProductGrid items={featuredCatalogItems} />
    </SectionWrapper>
  );
}
