"use client";
import { useCallback, useEffect, useRef, useState } from "react";
export function useMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
    if (triggerRef.current?.getClientRects().length) triggerRef.current.focus();
  }, []);
  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')).filter((element) => element.getClientRects().length);
      if (!controls.length) return;
      // Cycle every control explicitly: WebKit can otherwise skip links when
      // the OS full-keyboard-access setting is off.
      const current = controls.indexOf(document.activeElement as HTMLElement);
      const next = (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
      event.preventDefault();
      controls[next].focus();
    };
    dialog?.addEventListener("keydown", containFocus);
    const query = window.matchMedia("(min-width: 1200px)");
    const onResize = () => {
      if (query.matches) close();
    };
    query.addEventListener("change", onResize);
    window.addEventListener("popstate", close);
    return () => {
      document.body.style.overflow = previous;
      dialog?.removeEventListener("keydown", containFocus);
      query.removeEventListener("change", onResize);
      window.removeEventListener("popstate", close);
    };
  }, [isOpen, close]);
  return { isOpen, open, close, triggerRef, dialogRef };
}
