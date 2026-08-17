"use client";

import { useEffect, useState } from "react";

const BRAND_NAME = "MB Home Services";
const PHONE = "(800) 555-0142";
const PHONE_HREF = "tel:+18005550142";

const LINKS = [
  { label: "Home", href: "#header" },
  { label: "How We Help", href: "#how-we-help" },
  { label: "Coverage", href: "#coverage" },
  { label: "Our Process", href: "#process" },
  { label: "Stories", href: "#testimonials" },
];

/**
 * Shared easing for the pill -> docked-bar morph.
 *
 * Everything that changes here is interpolatable on purpose: max-width in px,
 * border-radius in px, padding, and colours. An earlier version toggled
 * `w-fit` / `w-full`, which cannot be interpolated — the width snapped while
 * the padding animated, which is what made the bar look shaky.
 */
const MORPH =
  "transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function SiteNav() {
  const [docked, setDocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /**
   * Docked width is measured rather than a large constant: max-width only
   * interpolates px-to-px, and an endpoint past the viewport would make the bar
   * hit full width long before the transition finishes.
   */
  const [viewport, setViewport] = useState(0);

  useEffect(() => {
    const onResize = () => {
      const width = document.documentElement.clientWidth;
      setViewport(width);
      // Resizing past the breakpoint must not leave the panel orphaned open.
      if (width >= 768) setMenuOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Docks the moment the page moves at all, rather than waiting for the
    // header to finish scrolling past.
    const onScroll = () => setDocked(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const shellWidth = docked && viewport ? `${viewport}px` : "980px";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${MORPH} ${
        docked ? "pt-0" : "pt-7"
      }`}
      id="site-nav"
    >
      <div
        style={{ maxWidth: shellWidth }}
        className={`mx-auto flex w-full items-center gap-1 border-b border-solid bg-white ${MORPH} ${
          docked
            ? "rounded-none border-outline-variant/60 px-margin-mobile py-3 shadow-[0_2px_20px_rgba(0,32,70,0.08)] md:px-margin-desktop"
            : "rounded-full border-transparent px-4 py-2 shadow-[0_10px_30px_rgba(0,32,70,0.18)]"
        } ${menuOpen ? "rounded-b-none" : ""}`}
      >
        <a className="flex shrink-0 items-center" href="#header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mb-logo.webp"
            alt={BRAND_NAME}
            width={235}
            height={120}
            className={`w-auto ${MORPH} ${docked ? "h-9" : "h-9 md:h-10"}`}
          />
        </a>

        {/* Spacers keep the link group optically centred once the bar is
            docked and spans the full viewport. */}
        <div className="hidden flex-1 md:block" />

        <ul className="hidden items-center md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                className="block whitespace-nowrap rounded-full px-4 py-2.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-primary/5 hover:text-primary"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden flex-1 md:block" />

        <a
          className={`ml-auto hidden shrink-0 items-center gap-2 bg-primary px-5 py-2.5 font-label-md text-label-md text-on-primary shadow-md ${MORPH} hover:bg-secondary md:flex ${
            docked ? "rounded-lg" : "rounded-full"
          }`}
          href={PHONE_HREF}
        >
          <span className="material-symbols-outlined text-base">call</span>
          <span>{PHONE}</span>
        </a>

        {/* Mobile: call shortcut, then the hamburger. */}
        <a
          href={PHONE_HREF}
          aria-label={`Call ${PHONE}`}
          className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary md:hidden"
        >
          <span className="material-symbols-outlined text-lg">call</span>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-2 flex size-10 shrink-0 items-center justify-center rounded-full border border-outline-variant text-primary transition-colors hover:bg-primary/5 md:hidden"
        >
          <span className="material-symbols-outlined text-xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="site-nav-menu"
        style={{ maxWidth: shellWidth }}
        className={`mx-auto overflow-hidden bg-white transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          docked ? "rounded-b-none" : "rounded-b-3xl"
        } ${
          menuOpen
            ? "max-h-96 border-b border-outline-variant/60 opacity-100 shadow-[0_10px_30px_rgba(0,32,70,0.12)]"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 py-3">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 font-body-md text-[16px] text-on-surface transition-colors hover:bg-primary/5 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 border-t border-outline-variant/60 pt-3">
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-label-md text-label-md text-on-primary"
            >
              Book a consultation
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
