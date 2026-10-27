import { SectionWrapper } from "@/components/ui/section-wrapper";
import { PrimaryButton } from "@/components/ui/buttons";
export const metadata = { title: "Page not found | ESSCOM", robots: { index: false, follow: false } };
export default function NotFound() {
  return (
    <SectionWrapper className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p>The page you’re looking for isn’t available.</p>
      <PrimaryButton href="/">Return to homepage</PrimaryButton>
    </SectionWrapper>
  );
}
