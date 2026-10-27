import type { Metadata } from "next";
import { siteConfig } from "../data/site";
import { officialWebsite } from "./publication";
import { deployment } from "./deployment";

/** No invented production origin: canonical URLs are emitted only after configuration. */
export function pageMetadata(title: string, description: string, path: string, baseUrl: string | null | undefined = deployment.url): Metadata {
  const base = officialWebsite(baseUrl ?? undefined);
  const canonical = base ? new URL(path, base).href : undefined;
  const fullTitle = title.includes("ESSCOM") ? title : `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: fullTitle, description, type: "website", siteName: siteConfig.name,
      locale: "en_US", ...(canonical ? { url: canonical } : {}),
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
