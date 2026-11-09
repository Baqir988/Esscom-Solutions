import type { MediaAsset } from "@/types/catalog";

/**
 * No source-profile photographs are currently published: reproduction rights,
 * division ownership, and current product attribution have not been approved.
 * Add only assets with documented permission and verified ESSCOM attribution.
 */
export const approvedMedia: Record<string, MediaAsset> = {};
export const mediaPlacements: { solutions: Record<string, string>; equipment: Record<string, string> } = {
  solutions: {},
  equipment: {},
};
export function getApprovedMedia(id?: string): MediaAsset | undefined {
  const media = id ? approvedMedia[id] : undefined;
  return media?.approved ? media : undefined;
}
export function solutionMedia(slug: string) { return getApprovedMedia(mediaPlacements.solutions[slug]); }
export function equipmentMedia(id: string) { return getApprovedMedia(mediaPlacements.equipment[id]); }
