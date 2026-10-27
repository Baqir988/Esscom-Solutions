import { Check, ArrowRight } from "lucide-react";
import { getRelatedSolutions, solutionHref } from "@/data/solutions";
import type { Solution } from "@/types/solution";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { EquipmentIllustration } from "@/components/ui/equipment-illustration";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { ContactCTA } from "@/components/ui/contact-cta";
import { FAQList } from "@/components/ui/faq-list";
import { SolutionGrid } from "./solution-card";
import { publishedProducts, toProductCard } from "@/data/products";
import { ProductGrid } from "@/components/catalog/product-card";
import { ProjectPreview } from "@/components/sections/project-preview";

export function SolutionDetail({ solution }: { solution: Solution }) {
  const related = getRelatedSolutions(solution);
  const products = publishedProducts
    .filter((item) => item.categoryId === solution.slug)
    .slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={solution.title}
        title={solution.heroTitle}
        description={solution.heroDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions/" },
          { label: solution.shortTitle, href: solutionHref(solution.slug) },
        ]}
        visual={
          <figure className="solution-hero-art">
            <EquipmentIllustration
              variant={solution.visual}
              label={solution.title}
            />
            <figcaption>Concept illustration · Equipment category</figcaption>
          </figure>
        }
        actions={
          <>
            <PrimaryButton href="#solution-overview">
              Explore the solution
            </PrimaryButton>
            <SecondaryButton href="/contact/" arrow>
              Contact ESSCOM
            </SecondaryButton>
          </>
        }
      />
      <SectionWrapper className="section-white" id="solution-overview">
        <div className="split-layout overview-layout">
          <SectionHeading
            eyebrow="SOLUTION OVERVIEW"
            title={`${solution.shortTitle}, in context.`}
          />
          <div className="editorial-copy">
            {solution.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeading
          eyebrow="KEY FEATURES"
          title="What goes into the system."
          description="The building blocks to consider when exploring this solution category."
        />
        <div className="feature-grid">
          {solution.features.map((feature, index) => (
            <article className="feature-item" key={feature.title}>
              <span className="process-number">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper className="section-white">
        <div className="section-top">
          <SectionHeading
            eyebrow="EQUIPMENT & COMPONENTS"
            title="Understand the equipment options."
            description="Category-level information to support a more useful selection conversation."
          />
          <p className="context-note">
            Illustrations are generic. Models, specifications, and availability
            require confirmation.
          </p>
        </div>
        <div className="equipment-grid detail-equipment">
          {solution.equipment.map((item) => (
            <article className="equipment-card" key={item.id}>
              <div className="equipment-art">
                <EquipmentIllustration
                  variant={item.visual}
                  label={item.title}
                />
              </div>
              <div className="equipment-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="section-top">
          <SectionHeading
            eyebrow="BUSINESS APPLICATIONS"
            title="Where it can make sense."
            description="Consider these examples in relation to your own operating environment."
          />
          <p className="context-note">
            Potential uses, not confirmed ESSCOM client installations.
          </p>
        </div>
        <div className="use-case-grid">
          {solution.applications.map((item) => (
            <article key={item.title}>
              <ArrowRight size={21} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper className="section-white">
        <div className="split-layout benefits-layout">
          <div>
            <SectionHeading
              eyebrow="PRACTICAL BENEFITS"
              title="Connect the equipment to a useful outcome."
            />
            <div className="benefit-list">
              {solution.benefits.map((benefit) => (
                <article key={benefit.title}>
                  <Check size={19} aria-hidden="true" />
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="selection-panel">
            <p className="eyebrow">BEFORE YOU SELECT</p>
            <h2>Start with the right questions.</h2>
            <ol>
              {solution.considerations.map((question, index) => (
                <li key={question}>
                  <span>0{index + 1}</span>
                  {question}
                </li>
              ))}
            </ol>
            <p className="selection-note">
              Final suitability depends on the selected equipment, site
              conditions, and agreed requirements.
            </p>
          </aside>
        </div>
      </SectionWrapper>
      {related.length > 0 && (
        <SectionWrapper>
          <div className="section-top">
            <SectionHeading
              eyebrow="RELATED SOLUTIONS"
              title="Think beyond a single system."
              description="Explore complementary categories for the same environment. Compatibility should always be confirmed."
            />
          </div>
          <SolutionGrid solutions={related} />
        </SectionWrapper>
      )}
      <SectionWrapper className="section-white">
        <div className="split-layout faq-layout">
          <SectionHeading
            eyebrow="COMMON QUESTIONS"
            title="A little more clarity."
            description={`Answers to common questions about ${solution.shortTitle.toLowerCase()}.`}
          />
          <FAQList items={solution.faqs} />
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="section-top">
          <SectionHeading
            eyebrow="PRODUCTS & EQUIPMENT"
            title="Continue exploring the equipment."
            description={
              products.length
                ? "Published equipment in this solution category."
                : "Browse the equipment-category catalog. Model details and current availability await confirmation."
            }
          />
          <SecondaryButton href="/products/" arrow>
            Browse catalog
          </SecondaryButton>
        </div>
        {products.length > 0 && (
          <ProductGrid items={products.map(toProductCard)} />
        )}
      </SectionWrapper>
      <ProjectPreview solutionId={solution.slug} />
      <ContactCTA
        inquiry={{ kind: "solution", name: solution.title }}
        title={`Considering ${solution.shortTitle.toLowerCase()}?`}
        description="Start with the needs of your people, spaces, and operations. Explore the wider solution range or view ESSCOM contact information."
      />
    </>
  );
}
