import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CatalogItem } from "@/types/catalog";
import { ApprovedImage } from "@/components/ui/approved-image";
import { EquipmentIllustration } from "@/components/ui/equipment-illustration";

export function ProductCard({ item }: { item: CatalogItem }) {
  return (
    <article className="equipment-card catalog-card">
      <Link
        href={item.href}
        className="catalog-card-image"
        aria-label={`${item.kind === "product" ? "View" : "Explore"} ${item.name}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {!item.image?.approved ? <EquipmentIllustration variant={item.visual} label={item.name} /> : <ApprovedImage
          image={item.image}
          label={item.name}
          visual={item.visual}
        />}
      </Link>
      <div className="equipment-copy">
        <p className="micro-label">{item.category}</p>
        <h3>{item.name}</h3>
        {item.model && <p className="model-label">Model: {item.model}</p>}
        <p>{item.description}</p>
        <div className="catalog-card-actions">
          <Link
            className="text-link"
            href={item.href}
            aria-label={`${item.kind === "product" ? "View details for" : "Explore solution for"} ${item.name}`}
          >
            {item.kind === "product" ? "View details" : "Explore solution"}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          {item.quoteHref && (
            <a
              className="text-link"
              href={item.quoteHref}
              aria-label={`Request a quote for ${item.name}`}
            >
              Request a quote <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
        {item.kind === "equipment-category" && (
          <span className="catalog-kind">
            Equipment category · Model details pending
          </span>
        )}
      </div>
    </article>
  );
}
export function ProductGrid({ items }: { items: CatalogItem[] }) {
  return (
    <div className="equipment-grid">
      {items.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
}
