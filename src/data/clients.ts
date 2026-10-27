import type { BusinessRelationship } from "@/types/catalog";
import { isApproved } from "@/lib/publication";
export const clients: BusinessRelationship[] = [];
export const publishedClients = clients.filter(
  (item) =>
    isApproved(item) &&
    item.relationship === "client" &&
    item.logo.approved &&
    item.logo.kind === "logo",
);
