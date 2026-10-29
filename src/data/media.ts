import type { MediaAsset } from "@/types/catalog";

/** Public allowlist only. Never import media-manifest.json: it contains private review material. */
export const approvedMedia: Record<string, MediaAsset> = {};

/** Add mappings only after the specific asset AND placement have been approved. */
export const mediaPlacements: {
  solutions: Record<string, string>;
  equipment: Record<string, string>;
} = { solutions: {}, equipment: {} };

export function getApprovedMedia(id?: string): MediaAsset | undefined {
  const media = id ? approvedMedia[id] : undefined;
  return media?.approved ? media : undefined;
}

export function solutionMedia(slug: string) {
  return getApprovedMedia(mediaPlacements.solutions[slug]);
}

export function equipmentMedia(id: string) {
  return getApprovedMedia(mediaPlacements.equipment[id]);
}
