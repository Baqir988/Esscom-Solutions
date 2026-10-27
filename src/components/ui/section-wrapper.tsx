import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
export function SectionWrapper({
  children,
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn("section", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
