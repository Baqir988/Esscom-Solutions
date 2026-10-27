"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import type { SolutionNavigation } from "@/types/solution";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { Container } from "@/components/ui/container";
import { SolutionIcon } from "@/components/ui/solution-icon";
import { Wordmark } from "./wordmark";
import { useHydrated } from "@/hooks/use-hydrated";

export function Navbar({ solutions }: { solutions: SolutionNavigation[] }) {
  const hydrated = useHydrated();
  const pathname = usePathname();
  const [dropdownPath, setDropdownPath] = useState<string | null>(null);
  const dropdown = dropdownPath === pathname;
  const setDropdown = (value: boolean) => setDropdownPath(value ? pathname : null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTrigger = useRef<HTMLButtonElement>(null);
  const { isOpen, open, close, triggerRef, dialogRef } = useMobileNavigation();
  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : `${pathname.replace(/\/$/, "")}/`.startsWith(href);
  useEffect(() => {
    if (!dropdown) return;
    const outside = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node))
        setDropdownPath(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownPath(null);
        dropdownTrigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [dropdown]);
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) =>
            item.href === "/solutions/" ? (
              <div
                className="nav-disclosure"
                key={item.href}
                ref={dropdownRef}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setDropdown(false);
                }}
              >
                <div className="solutions-nav">
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={active(item.href) ? "page" : undefined}
                    onClick={() => setDropdown(false)}
                  >
                    {item.label}
                  </Link>
                  <button
                    ref={dropdownTrigger}
                    disabled={!hydrated}
                    type="button"
                    aria-label="Solution categories"
                    aria-expanded={dropdown}
                    aria-controls="solutions-dropdown"
                    className="dropdown-trigger"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                </div>
                <div
                  id="solutions-dropdown"
                  className="solutions-dropdown"
                  hidden={!dropdown}
                >
                  <p className="eyebrow">Explore our solutions</p>
                  {solutions.map((solution) => (
                    <Link
                      href={solution.href}
                      key={solution.slug}
                      aria-current={active(solution.href) ? "page" : undefined}
                      onClick={() => setDropdown(false)}
                    >
                      <SolutionIcon name={solution.icon} size={20} />
                      <span>{solution.shortTitle}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={active(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <Link href="/contact/" className="button button-primary header-cta">
          Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          ref={triggerRef}
          disabled={!hydrated}
          onClick={open}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation"
        >
          <Menu size={25} aria-hidden="true" />
        </button>
        <dialog
          ref={dialogRef}
          id="mobile-navigation"
          className="mobile-dialog"
          aria-labelledby="mobile-navigation-title"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClose={() => {
            if (isOpen) close();
          }}
        >
          <div className="mobile-dialog-header">
            <span id="mobile-navigation-title">Navigation</span>
            <button
              type="button"
              className="menu-toggle"
              onClick={close}
              aria-label="Close navigation"
              autoFocus
            >
              <X size={25} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="mobile-nav-link"
                  aria-current={active(item.href) ? "page" : undefined}
                  onClick={close}
                >
                  {item.label}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                {item.href === "/solutions/" && (
                  <div className="mobile-solutions">
                    {solutions.map((solution) => (
                      <Link
                        href={solution.href}
                        key={solution.slug}
                        aria-current={active(solution.href) ? "page" : undefined}
                        onClick={close}
                      >
                        {solution.shortTitle}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link
            href="/contact/"
            className="button button-primary"
            onClick={close}
          >
            Contact ESSCOM <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </dialog>
      </Container>
    </header>
  );
}
