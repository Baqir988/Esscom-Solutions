import { solutionHref } from "./solutions";
import type { EquipmentVisual } from "@/types/solution";

// Featured equipment is centralized in products.ts.

export type ApplicationPreview = {
  id: string;
  title: string;
  description: string;
  visual: EquipmentVisual;
  links: { title: string; href: string }[];
  kind: "illustrative-application";
};
export const applicationPreviews: ApplicationPreview[] = [
  {
    id: "arrival",
    title: "An organized arrival",
    description:
      "Consider ticket collection, a visible queue display, and clear visitor information within a service reception.",
    visual: "queue",
    kind: "illustrative-application",
    links: [
      { title: "Queue management", href: solutionHref("queue-management") },
      { title: "Digital signage", href: solutionHref("digital-signage") },
    ],
  },
  {
    id: "workplace",
    title: "A considered workplace",
    description:
      "Plan staff attendance and entry points alongside camera coverage of selected shared spaces.",
    visual: "biometric",
    kind: "illustrative-application",
    links: [
      {
        title: "Attendance & access",
        href: solutionHref("biometric-access-control"),
      },
      { title: "CCTV & surveillance", href: solutionHref("cctv-surveillance") },
    ],
  },
  {
    id: "counter",
    title: "A connected commercial space",
    description:
      "Bring the transaction counter, supporting peripherals, and customer-facing information into the same planning conversation.",
    visual: "pos",
    kind: "illustrative-application",
    links: [
      { title: "Point of sale", href: solutionHref("point-of-sale") },
      { title: "Digital signage", href: solutionHref("digital-signage") },
    ],
  },
];
