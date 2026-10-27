import { ContactContent } from "@/components/contact/contact-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact ESSCOM",
  "Find ESSCOM business contact information and guidance for product, solution, installation, and organizational project inquiries.",
  "/contact/",
);
export default function ContactPage() { return <ContactContent />; }
