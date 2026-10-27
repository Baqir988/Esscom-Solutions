import Link from "next/link";
import { siteConfig } from "@/data/site";
export function Wordmark() {
  return (
    <Link href="/" className="wordmark">
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        {siteConfig.name}{" "}
        <span className="wordmark-caption">TECHNOLOGY & AUTOMATION</span>
      </span>
      <span className="sr-only"> home</span>
    </Link>
  );
}
