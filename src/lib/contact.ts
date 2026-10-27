import { siteConfig } from "../data/site";
import { officialWebsite } from "./publication";
import type { SiteContact } from "../types/site";

export type Inquiry =
  | { kind: "general" }
  | { kind: "product" | "solution" | "project"; name: string };
export type ContactAction = {
  id: "whatsapp" | "email" | "phone";
  label: string;
  href: string;
};

/** Accept international numbers only; never infer a country code from a local number. */
export function normalizePhone(number: string | null | undefined) {
  if (!number || !/^(?:\+|00)?[\d\s().-]+$/.test(number.trim())) return undefined;
  let digits = number.trim().replace(/[\s().-]/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("+")) digits = digits.slice(1);
  return /^[1-9]\d{6,14}$/.test(digits) ? `+${digits}` : undefined;
}
export function telephoneHref(number = siteConfig.contact.phone) {
  const normalized = normalizePhone(number);
  return normalized ? `tel:${normalized}` : undefined;
}
export function whatsappHref(message: string, number = siteConfig.contact.whatsapp) {
  const normalized = normalizePhone(number);
  return normalized
    ? `https://wa.me/${normalized.slice(1)}?text=${encodeURIComponent(message)}`
    : undefined;
}
export function emailHref(subject: string, body: string, email = siteConfig.contact.email) {
  const address = email?.trim();
  if (!address || !/^[a-z\d.!$%'+/=_`{|}~-]+@[a-z\d](?:[a-z\d.-]*[a-z\d])?\.[a-z]{2,}$/i.test(address))
    return undefined;
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export function directionsHref(mapsUrl = siteConfig.contact.mapsUrl) {
  const safe = officialWebsite(mapsUrl ?? undefined);
  if (!safe) return undefined;
  const { hostname, pathname } = new URL(safe);
  return hostname === "maps.google.com" || hostname === "maps.app.goo.gl" ||
    ((hostname === "www.google.com" || hostname === "google.com" || hostname === "goo.gl") && /^\/maps(?:\/|$)/.test(pathname))
    ? safe : undefined;
}
export function inquiryMessage(inquiry: Inquiry = { kind: "general" }) {
  const greeting = `Hello ${siteConfig.name},`;
  switch (inquiry.kind) {
    case "product": return `${greeting} I am interested in ${inquiry.name}. Please share more details and the quotation process.`;
    case "solution": return `${greeting} I would like information about your ${inquiry.name} solutions.`;
    case "project": return `${greeting} I would like to discuss a project involving ${inquiry.name}.`;
    default: return `${greeting} I would like to know more about your technology solutions.`;
  }
}
export function contactActions(
  inquiry: Inquiry = { kind: "general" },
  contact: SiteContact = siteConfig.contact,
): ContactAction[] {
  const message = inquiryMessage(inquiry);
  const subject = inquiry.kind === "general"
    ? `${siteConfig.name} Business Inquiry`
    : `${siteConfig.name} ${inquiry.kind[0].toUpperCase()}${inquiry.kind.slice(1)} Inquiry — ${inquiry.name}`;
  const candidates = [
    { id: "whatsapp", label: "Inquire on WhatsApp", href: whatsappHref(message, contact.whatsapp) },
    { id: "email", label: "Email ESSCOM", href: emailHref(subject, message, contact.email) },
    { id: "phone", label: "Call ESSCOM", href: telephoneHref(contact.phone) },
  ] as const;
  return candidates.flatMap((action) => action.href ? [{ ...action, href: action.href }] : []);
}
export function quoteHref(name: string) {
  return contactActions({ kind: "product", name }).find((action) => action.id !== "phone")?.href;
}
