import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavigationItem } from "@/types/site";
export function Breadcrumb({ items }: { items: NavigationItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
