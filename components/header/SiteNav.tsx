"use client";

import { useEffect, useState } from "react";

const BRAND_NAME = "MB Home Services";

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
  /**
   * Docked width is measured rather than a large constant: max-width only
   * interpolates px-to-px, and an endpoint past the viewport would make the bar
   * hit full width long before the transition finishes.
   */
  const [viewport, setViewport] = useState(0);

  useEffect(() => {
    const onResize = () => setViewport(document.documentElement.clientWidth);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${MORPH} ${
        docked ? "pt-0" : "pt-7"
      }`}
      id="site-nav"
    >
      <div
        style={{
          maxWidth: docked && viewport ? `${viewport}px` : "980px",
        }}
        className={`mx-auto flex w-full items-center gap-1 border-b border-solid bg-white ${MORPH} ${
          docked
            ? "rounded-none border-outline-variant/60 px-margin-mobile py-3 shadow-[0_2px_20px_rgba(0,32,70,0.08)] md:px-margin-desktop"
            : "rounded-full border-transparent px-4 py-2 shadow-[0_10px_30px_rgba(0,32,70,0.18)]"
        }`}
      >
        <a
          className="flex shrink-0 items-center gap-2 text-primary"
          href="#header"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            medical_services
          </span>
          <span className="hidden whitespace-nowrap text-base font-bold sm:block">
            {BRAND_NAME}
          </span>
        </a>

        <span className="mx-3 hidden h-6 w-px bg-primary/15 lg:block" />

        {/* Spacer keeps the link group optically centred once the bar is
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
          className={`ml-auto flex shrink-0 items-center gap-2 bg-primary px-5 py-2.5 font-label-md text-label-md text-on-primary shadow-md ${MORPH} hover:bg-secondary ${
            docked ? "rounded-lg" : "rounded-full"
          }`}
          href="tel:+18005550142"
        >
          <span className="material-symbols-outlined text-base">call</span>
          <span className="hidden sm:inline">(800) 555-0142</span>
        </a>
      </div>
    </header>
  );
}
