import type { Publication } from "../types/catalog";
export function isApproved(record: Publication) {
  return record.published && record.verificationStatus === "approved";
}
export function officialWebsite(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password
      ? parsed.href
      : undefined;
  } catch {
    return undefined;
  }
}
