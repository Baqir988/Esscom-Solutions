import { ArrowUpRight, Building2, Mail, MapPin, MessageCircle, PackageSearch, Phone, Settings2, Workflow } from "lucide-react";
import { siteConfig } from "@/data/site";
import type { SiteContact } from "@/types/site";
import { contactActions, directionsHref } from "@/lib/contact";
import { PageHero } from "@/components/ui/page-hero";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQList } from "@/components/ui/faq-list";
import { ContactActions } from "@/components/ui/contact-actions";
import { PrimaryButton } from "@/components/ui/buttons";

const inquiryTypes = [
  { icon: PackageSearch, title: "Product inquiries", description: "Identify the equipment category or published model, the intended use, and the details you need to confirm." },
  { icon: Workflow, title: "Solution consultations", description: "Describe your workflow, existing systems, and the operational requirements you want to explore." },
  { icon: Settings2, title: "Installation inquiries", description: "Outline the type of site and installation requirements. Scope and suitability need to be discussed for each request." },
  { icon: Building2, title: "Project discussions", description: "Introduce your organization, the technology categories involved, and the objectives of the proposed project." },
];

export function ContactContent({ contact = siteConfig.contact }: { contact?: SiteContact }) {
  const actions = contactActions({ kind: "general" }, contact);
  const available = actions.length > 0;
  const directions = contact.address?.trim() ? directionsHref(contact.mapsUrl) : undefined;
  const methods = [
    { id: "phone", title: "Phone", value: contact.phone, icon: Phone, action: actions.find((item) => item.id === "phone") },
    { id: "whatsapp", title: "WhatsApp", value: contact.whatsapp, icon: MessageCircle, action: actions.find((item) => item.id === "whatsapp") },
    { id: "email", title: "Business email", value: contact.email, icon: Mail, action: actions.find((item) => item.id === "email") },
  ];
  const channelNames = actions.map((item) => ({ phone: "phone", whatsapp: "WhatsApp", email: "email" })[item.id]).join(", ");
  const channelAnswer = available
    ? `Use the verified ${channelNames} details shown on this page. Include the solution or equipment name and a short description of your requirements.`
    : "ESSCOM's direct contact details are awaiting confirmation. Inquiries cannot currently be sent through this website. You can explore the solution pages and note the requirements you would like to discuss.";
  return (
    <>
      <PageHero
        eyebrow="CONTACT ESSCOM"
        title="Let's Discuss Your Technology Requirements"
        description="Connect with ESSCOM to discuss security, automation, and technology solutions for your organization."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us", href: "/contact/" }]}
      />
      <SectionWrapper className="section-white" aria-labelledby="contact-methods-heading">
        <div className="section-top">
          <SectionHeading id="contact-methods-heading" eyebrow="START A CONVERSATION" title="Connect with the right information."
            description={available ? "Choose a verified contact channel below to begin your inquiry." : "Direct contact channels are being confirmed. This preview does not yet accept business inquiries."} />
        </div>
        <div className="contact-grid">
          {methods.map(({ id, title, value, icon: Icon, action }) => (
            <article className="contact-card" key={id}>
              <Icon size={25} aria-hidden="true" /><h3>{title}</h3>
              <p className="contact-value">{action ? value : "Details awaiting confirmation"}</p>
              {action ? <a className="text-link" href={action.href}>{action.label}<ArrowUpRight size={17} aria-hidden="true" /></a>
                : <span className="contact-pending">Not yet available</span>}
            </article>
          ))}
          <article className="contact-card">
            <MapPin size={25} aria-hidden="true" /><h3>Office location</h3>
            {contact.address?.trim() ? <address className="contact-value">{contact.address}</address> : <p className="contact-value">Address awaiting confirmation</p>}
            {directions ? <a className="text-link" href={directions} target="_blank" rel="noopener noreferrer">Directions<span className="sr-only"> (opens Google Maps in a new tab)</span><ArrowUpRight size={17} aria-hidden="true" /></a>
              : <span className="contact-pending">{contact.address?.trim() ? "Map link not yet available" : "Not yet available"}</span>}
          </article>
        </div>
      </SectionWrapper>
      <SectionWrapper aria-labelledby="business-inquiries-heading">
        <div className="section-top"><SectionHeading id="business-inquiries-heading" eyebrow="BUSINESS INQUIRIES" title="Start with your organization's requirements." description="A clear description helps frame the conversation. These are suggested inquiry topics; scope and service arrangements require confirmation." /></div>
        <div className="inquiry-topics">
          {inquiryTypes.map(({ icon: Icon, title, description }) => <article className="inquiry-topic" key={title}><Icon size={24} aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></article>)}
        </div>
        <p className="contact-guidance">For an initial inquiry, share general requirements. Avoid sending passwords, access credentials, or sensitive security layouts.</p>
      </SectionWrapper>
      <SectionWrapper className="section-white" aria-labelledby="contact-faq-heading">
        <div className="split-layout overview-layout">
          <SectionHeading id="contact-faq-heading" eyebrow="HELPFUL INFORMATION" title="Before you get in touch." description="A few practical starting points for your inquiry." />
          <FAQList items={[
            { question: "How can I request information about a solution?", answer: channelAnswer },
            { question: "Can I discuss requirements for an organizational project?", answer: available ? `Use the ${channelNames} contact options above and describe the intended application, organization type, and project requirements. Any scope or service arrangements must be confirmed directly.` : "Organizational project requirements are a relevant inquiry topic. Direct contact channels are not yet available in this preview; the solution pages can help you identify the categories involved." },
            { question: "How do I inquire about product specifications?", answer: available ? "Include the equipment category or published product name in your inquiry using a contact option above. Exact specifications and compatibility need to be confirmed for the selected model." : "Browse the equipment categories and related solution pages. Model specifications and a direct inquiry channel are awaiting confirmation; this preview does not confirm model availability." },
            { question: "How can I contact the appropriate ESSCOM representative?", answer: available ? `Begin through the verified ${channelNames} channels listed above and explain the purpose of your inquiry. No individual representatives or support commitments are published here.` : "No individual representatives or verified business contact details are currently published. The contact options will be added here once confirmed by ESSCOM." },
          ]} />
        </div>
      </SectionWrapper>
      <SectionWrapper className="section-navy contact-final">
        <div className="final-cta-inner">
          <div><p className="eyebrow">YOUR NEXT STEP</p><h2>{available ? "Let's discuss the right solution for your organization." : "Explore the possibilities for your organization."}</h2><p>{available ? "Choose a contact option to share your requirements with ESSCOM." : "Browse the technology categories while direct business contact details are being confirmed."}</p></div>
          <div className="cta-actions">{available ? <ContactActions contact={contact} /> : <PrimaryButton href="/solutions/">Explore our solutions</PrimaryButton>}</div>
        </div>
      </SectionWrapper>
    </>
  );
}
