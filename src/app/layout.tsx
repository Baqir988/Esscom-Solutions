import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/data/site";
import { solutionNavigation } from "@/data/solutions";
import { deployment } from "@/lib/deployment";

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "ESSCOM | Company Information Preview",
    template: "%s | ESSCOM",
  },
  description: siteConfig.description,
  robots: { index: deployment.indexable, follow: deployment.indexable },
  icons: { icon: "/icons/queue-favicon.svg" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        {deployment.url && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: deployment.url,
          }).replace(/</g, "\\u003c") }} />
        )}
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar solutions={solutionNavigation} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
