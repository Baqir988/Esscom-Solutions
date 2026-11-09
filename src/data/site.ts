import type { NavigationItem, SiteConfig } from "@/types/site";
export const siteConfig: SiteConfig = {
  name: "ESSCOM",
  description:
    "ESSCOM company profile and equipment references, with division attribution and current availability identified separately.",
  // Company-approved ESSCOM details only. Phone numbers must include country codes.
  contact: { email: null, phone: null, whatsapp: null, address: null, mapsUrl: null },
  socialLinks: [],
};
export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Products", href: "/products/" },
  { label: "Projects", href: "/projects/" },
  { label: "Clients & Partners", href: "/clients-partners/" },
  { label: "Contact Us", href: "/contact/" },
];
export const stagingPages = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "The privacy policy is awaiting review. This preview has no contact form, analytics, or account registration.",
  },
] as const;
