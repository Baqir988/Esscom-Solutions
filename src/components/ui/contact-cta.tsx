import { PrimaryButton, SecondaryButton } from "./buttons";
import { Container } from "./container";
import { ContactActions } from "./contact-actions";
import { contactActions, type Inquiry } from "@/lib/contact";
export function ContactCTA({
  inquiry,
  title = "Let’s find the right technology solution for your organization.",
  description = "Explore solutions around your operational requirements and consider the next steps with ESSCOM.",
}: {
  inquiry?: Inquiry;
  title?: string;
  description?: string;
}) {
  return (
    <section className="final-cta section-navy">
      <Container>
        <div className="final-cta-inner">
          <div>
            <p className="eyebrow">YOUR NEXT STEP</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-actions">
            <ContactActions inquiry={inquiry} />
            <PrimaryButton href="/solutions/">
              Explore our solutions
            </PrimaryButton>
            {contactActions(inquiry).length === 0 && <SecondaryButton href="/contact/" arrow>
              Contact ESSCOM
            </SecondaryButton>}
          </div>
        </div>
      </Container>
    </section>
  );
}
