import { solutionHref } from "./solutions";
import type { EquipmentVisual } from "@/types/solution";

export type ApplicationPreview = { id: string; title: string; description: string; visual: EquipmentVisual; links: { title: string; href: string }[]; kind: "illustrative-application" };
export const applicationPreviews: ApplicationPreview[] = [{ id: "queue-service", title: "A clear service sequence", description: "Consider ticket collection, visible counter information, and visitor flow within a service area. This is a conceptual application, not a documented customer installation.", visual: "queue", kind: "illustrative-application", links: [{ title: "Queue management", href: solutionHref("queue-management") }] }];
