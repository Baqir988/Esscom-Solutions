import type { MetadataRoute } from "next";
import { deployment } from "@/lib/deployment";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must be able to read preview noindex meta tags. Protection is configured in Vercel.
    rules: { userAgent: "*", allow: "/" },
    ...(deployment.indexable && deployment.url ? { sitemap: `${deployment.url}/sitemap.xml` } : {}),
  };
}
