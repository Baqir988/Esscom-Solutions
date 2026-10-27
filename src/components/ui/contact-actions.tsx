import { Mail, MessageCircle, Phone } from "lucide-react";
import { contactActions, type Inquiry } from "@/lib/contact";
import type { SiteContact } from "@/types/site";

const icons = { email: Mail, whatsapp: MessageCircle, phone: Phone };
export function ContactActions({ inquiry, contact }: { inquiry?: Inquiry; contact?: SiteContact }) {
  return contactActions(inquiry, contact).map((action) => {
    const Icon = icons[action.id];
    return (
      <a className="button button-primary" href={action.href} key={action.id}>
        <Icon size={18} aria-hidden="true" />{action.label}
      </a>
    );
  });
}
