import type { Product } from "@/types/catalog";
import { getSolution, solutionHref } from "@/data/solutions";
import { relatedProducts, toProductCard, productHref } from "@/data/products";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaGallery } from "@/components/ui/media-gallery";
import { ProductGrid } from "./product-card";
import { QuoteCTA } from "./quote-cta";

export function ProductDetail({ product }: { product: Product }) {
  const category = getSolution(product.categoryId)!;
  const related = relatedProducts(product);
  const features = product.features.filter((item) => item.verified);
  const specs = product.specifications.filter((item) => item.verified);
  return (
    <>
      <PageHero
        title={product.name}
        eyebrow={category.shortTitle}
        description={product.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/" },
          { label: product.name, href: productHref(product.slug) },
        ]}
      />
      <SectionWrapper className="section-white">
        <div className="split-layout product-overview">
          <MediaGallery
            key={product.id}
            title={product.name}
            images={product.images}
            visual={category.visual}
          />
          <div className="editorial-copy">
            <SectionHeading
              eyebrow="PRODUCT OVERVIEW"
              title="Understand the equipment."
            />
            <p>{product.overview}</p>
            {product.model && (
              <p>
                <strong>Model:</strong> {product.model}
              </p>
            )}
            {features.length > 0 && (
              <>
                <h3 className="subsection-title">Verified key features</h3>
                <ul className="detail-list">
                  {features.map((feature) => (
                    <li key={feature.text}>{feature.text}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </SectionWrapper>
      {specs.length > 0 && (
        <SectionWrapper>
          <SectionHeading
            eyebrow="TECHNICAL DETAILS"
            title="Verified specifications."
          />
          <table className="specification-table">
            <caption>Technical specifications for {product.name}</caption>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label}>
                  <th scope="row">{spec.label}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionWrapper>
      )}
      {product.applications.length > 0 && (
        <SectionWrapper className="section-white">
          <SectionHeading
            eyebrow="APPLICATIONS"
            title="Where this equipment can fit."
          />
          <ul className="application-list">
            {product.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionWrapper>
      )}
      {related.length > 0 && (
        <SectionWrapper>
          <div className="section-top">
            <SectionHeading
              eyebrow="RELATED EQUIPMENT"
              title="Explore compatible requirements."
              description="Related categories and models to consider. Compatibility must be confirmed for your chosen configuration."
            />
          </div>
          <ProductGrid items={related.map(toProductCard)} />
        </SectionWrapper>
      )}
      <SectionWrapper className="section-white">
        <QuoteCTA
          name={product.name}
          solutionHref={solutionHref(category.slug)}
        />
      </SectionWrapper>
    </>
  );
}
