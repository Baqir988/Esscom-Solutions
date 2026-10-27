import { emailHref } from "./contact";
// Compatibility adapter; new inquiry flows use contactActions.
export function productInquiryHref(name: string, approvedEmail: string | null) {
  return emailHref(`Product enquiry: ${name}`, `Hello ESSCOM,\n\nI would like to request information and a quote for ${name}.\n\nOrganization:\nRequirements:\nPreferred contact details:`, approvedEmail);
}
