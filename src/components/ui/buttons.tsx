import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type ButtonProps = ComponentProps<typeof Link> & { arrow?: boolean };
export function PrimaryButton({
  children,
  className,
  arrow = true,
  ...props
}: ButtonProps) {
  return (
    <Link className={cn("button button-primary", className)} {...props}>
      {children}
      {arrow && <ArrowUpRight size={18} aria-hidden="true" />}
    </Link>
  );
}
export function SecondaryButton({
  children,
  className,
  arrow = false,
  ...props
}: ButtonProps) {
  return (
    <Link className={cn("button button-secondary", className)} {...props}>
      {children}
      {arrow && <ArrowUpRight size={18} aria-hidden="true" />}
    </Link>
  );
}
