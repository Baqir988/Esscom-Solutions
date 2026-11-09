import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { solutionNavigation } from "@/data/solutions";
import { Container } from "@/components/ui/container";
import { Wordmark } from "./wordmark";
import { contactActions, directionsHref } from "@/lib/contact";
import { officialWebsite } from "@/lib/publication";
export function Footer() {
  const actions = contactActions();
  const socials = siteConfig.socialLinks.flatMap((social) => {
    const url = officialWebsite(social.url);
    return url ? [{ ...social, url }] : [];
  });
  const directions = siteConfig.contact.address?.trim() ? directionsHref() : undefined;
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark />
            <p>{siteConfig.description}</p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              {navigation
                .filter(
                  (item) =>
                    !["/", "/solutions/", "/contact/"].includes(item.href),
                )
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2>Solutions</h2>
            <ul>
              {solutionNavigation.map((solution) => (
                <li key={solution.slug}>
                  <Link href={solution.href}>{solution.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-contact">
            <h2>Get in touch</h2>
            {actions.length === 0 && (
              <p>Our verified contact details will be available soon.</p>
            )}
            {actions.map((action) => <a key={action.id} href={action.href}>{action.id === "email" ? siteConfig.contact.email : action.id === "phone" ? siteConfig.contact.phone : action.label}</a>)}
            {siteConfig.contact.address && (
              <address>{siteConfig.contact.address}</address>
            )}
            {directions && <a href={directions} target="_blank" rel="noopener noreferrer">Office directions<span className="sr-only"> (opens Google Maps in a new tab)</span></a>}
            <Link href="/contact/" className="footer-contact-link">
              Contact information <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            {socials.length > 0 && (
              <ul>
                {socials.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {social.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <span className="preview-label">
            Website preview · Content subject to approval
          </span>
          <Link href="/privacy/">Privacy Policy</Link>
        </div>
      </Container>
    </footer>
  );
}
