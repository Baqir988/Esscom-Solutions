export type NavigationItem = { label: string; href: string };
export type SiteContact = {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  mapsUrl: string | null;
};
export type SiteConfig = {
  name: string;
  description: string;
  contact: SiteContact;
  socialLinks: { label: string; url: string }[];
};
