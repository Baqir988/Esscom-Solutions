import type { BusinessRelationship } from "@/types/catalog";
import { officialWebsite } from "@/lib/publication";
import { ApprovedImage } from "@/components/ui/approved-image";
export function RelationshipGrid({ items }: { items: BusinessRelationship[] }) {
  return (
    <div className="relationship-grid">
      {items.map((item) => {
        const website = officialWebsite(item.website);
        return (
          <article className="relationship-card" key={item.id}>
            <div className="relationship-logo">
              <ApprovedImage
                image={item.logo}
                label={item.name}
                sizes="(max-width: 699px) 50vw, 220px"
              />
            </div>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            {website && (
              <a
                href={website}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${item.name} official website (opens in a new tab)`}
              >
                Official website ↗
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}
