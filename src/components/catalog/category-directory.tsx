import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { productCategories } from "@/data/product-categories";
import { catalogItems } from "@/data/products";
import { ApprovedImage } from "@/components/ui/approved-image";
import { EquipmentIllustration } from "@/components/ui/equipment-illustration";

export function ProductCategoryDirectory({ limit }: { limit?: number }) {
  const available = productCategories.flatMap((category) => {
    const items = catalogItems.filter((item) => item.categoryId === category.id);
    if (!items.length) return [];
    return [{ category, items, image: items.find((item) => item.image?.approved)?.image }];
  });
  const visible = limit ? available.slice(0, limit) : available;
  return <div className="category-directory">{visible.map(({ category, items, image }, index) => <Link className="category-tile" href={`/products/category/${category.id}/`} key={category.id}>
    <div className="category-tile-visual">{image ? <ApprovedImage image={image} label={category.title} visual={category.visual} sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 25vw" /> : <EquipmentIllustration variant={category.visual} label={category.title} />}<span className="category-number">{String(index + 1).padStart(2,"0")}</span></div>
    <div className="category-tile-copy"><div><span className="micro-label">{items.length} profile references</span><h3>{category.shortTitle}</h3></div><span className="category-arrow" aria-hidden="true"><ArrowUpRight size={18}/></span></div>
    <p>{category.description}</p>
  </Link>)}</div>;
}
