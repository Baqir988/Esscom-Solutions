import { contactActions } from "@/lib/contact";
import { ContactActions } from "@/components/ui/contact-actions";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
export function QuoteCTA({ name, catalogHref="/products/" }: { name:string; catalogHref?:string }) {
 const inquiry={kind:"product" as const,name}; const hasContact=contactActions(inquiry).length>0;
 return <aside className="inquiry-panel"><p className="eyebrow">NEXT STEPS</p><h2>{hasContact?"Request details for "+name:"Review this profile reference."}</h2><p>{hasContact?"Share your requirements through an available ESSCOM contact channel.":"The company profile provides this product reference. Current ownership, model availability and commercial details must be confirmed."}</p><div className="hero-actions"><ContactActions inquiry={inquiry}/><PrimaryButton href={catalogHref}>Browse related categories</PrimaryButton><SecondaryButton href="/products/">Back to catalog</SecondaryButton></div></aside>;
}
