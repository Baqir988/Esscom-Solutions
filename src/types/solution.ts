export type SolutionIconName =
  "camera" | "fingerprint" | "queue" | "pos" | "display" | "network";
export type EquipmentVisual =
  "camera" | "biometric" | "rfid" | "queue" | "pos" | "display";
export type ContentPoint = { title: string; description: string };
export type FAQ = { question: string; answer: string };
export type EquipmentCategory = ContentPoint & {
  id: string;
  visual: EquipmentVisual;
};
export interface Solution {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  visual: EquipmentVisual;
  icon: SolutionIconName;
  overview: string[];
  features: ContentPoint[];
  equipment: EquipmentCategory[];
  applications: ContentPoint[];
  benefits: ContentPoint[];
  considerations: string[];
  faqs: FAQ[];
  relatedSlugs: string[];
  sourceReference: string;
  published: boolean;
}
export type SolutionNavigation = {
  slug: string;
  shortTitle: string;
  icon: SolutionIconName;
  href: string;
};
