import type { EquipmentVisual } from "./solution";

export type VerificationStatus =
  "approved" | "pending" | "historical-reference";
export interface Publication {
  published: boolean;
  verificationStatus: VerificationStatus;
  sourceReference?: string;
}
export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  approved: boolean;
  kind: "photograph" | "illustration" | "logo";
}
export interface Product extends Publication {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  description: string;
  overview: string;
  model?: string;
  keywords: string[];
  images: MediaAsset[];
  features: { text: string; verified: boolean }[];
  specifications: { label: string; value: string; verified: boolean }[];
  applications: string[];
  relatedProductIds: string[];
}
export interface Project extends Publication {
  id: string;
  slug: string;
  title: string;
  industry: string;
  solutionIds: string[];
  description: string;
  overview: string;
  requirement: string;
  solutionProvided: string;
  equipment: string[];
  scope: string;
  outcomes: { text: string; verified: boolean }[];
  images: MediaAsset[];
  clientName?: string;
  relatedProductIds: string[];
}
export interface BusinessRelationship extends Publication {
  id: string;
  name: string;
  category: string;
  logo: MediaAsset;
  website?: string;
  relationship:
    "client" | "technology-partner" | "manufacturer" | "historical-reference";
}
export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: string;
  keywords: string[];
  model?: string;
  visual: EquipmentVisual;
  image?: MediaAsset;
  kind: "product" | "equipment-category";
  href: string;
  quoteHref?: string;
}
export type CatalogSort = "name-asc" | "name-desc" | "category";
export interface CatalogFilters {
  search: string;
  category: string;
  sort: CatalogSort;
}
