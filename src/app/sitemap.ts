import type { MetadataRoute } from "next";
import { deployment } from "@/lib/deployment";
import { publicContentPaths } from "@/lib/routes";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  // A preview has no indexable URLs. Never invent a hostname or modification date.
  if (!deployment.indexable || !deployment.url) return [];
  return publicContentPaths.map((path) => ({ url: new URL(path, deployment.url).href }));
}
