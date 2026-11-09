import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label={siteConfig.name + " home"}>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
