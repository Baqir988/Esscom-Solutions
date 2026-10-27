import { contactActions } from "@/lib/contact";
import { ContactActions } from "@/components/ui/contact-actions";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
export function QuoteCTA({
  name,
  solutionHref,
}: {
  name: string;
  solutionHref: string;
}) {
  const inquiry = { kind: "product" as const, name };
  const href = contactActions(inquiry).length > 0;
  return (
    <aside className="inquiry-panel">
      <p className="eyebrow">NEXT STEPS</p>
      <h2>
        {href ? `Request a quote for ${name}` : "Plan your equipment enquiry."}
      </h2>
      <p>
        {href
          ? "Share your requirements with ESSCOM. Equipment suitability and commercial details can be confirmed for your enquiry."
          : "Direct quote requests will be available once ESSCOM’s contact channel is confirmed. In the meantime, explore the related solution and note your operational requirements."}
      </p>
      <div className="hero-actions">
        <ContactActions inquiry={inquiry} />
        <PrimaryButton href={solutionHref}>
          Explore related solution
        </PrimaryButton>
        <SecondaryButton href="/products/">Back to catalog</SecondaryButton>
      </div>
    </aside>
  );
}
