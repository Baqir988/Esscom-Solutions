import type { BusinessRelationship } from "@/types/catalog";
import { isApproved } from "@/lib/publication";
// Manufacturers and historical logo references are not current technology partners.
export const partners: BusinessRelationship[] = [];
export const publishedPartners = partners.filter(
  (item) =>
    isApproved(item) &&
    item.relationship === "technology-partner" &&
    item.logo.approved &&
    item.logo.kind === "logo",
);
