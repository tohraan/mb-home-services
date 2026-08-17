"use client";

import { useEffect, useRef, useState } from "react";

import useCountUp from "./useCountUp";

/** Background slideshow frames. Cross-faded on a loop. */
const SLIDES = [
  "/coverage/01.webp",
  "/coverage/02.webp",
  "/coverage/03.webp",
  "/coverage/04.webp",
  "/coverage/05.webp",
];

const SLIDE_MS = 4200;

const AFFILIATIONS = [
  { icon: "verified", label: "CHAP Accredited" },
  { icon: "local_hospital", label: "Medicare Certified" },
  { icon: "shield", label: "State Licensed & Bonded" },
  { icon: "health_and_safety", label: "HIPAA Compliant" },
];

const INSURERS = [
  "Blue Cross Blue Shield",
  "Blue Care Network",
  "Medicare",
  "Medicare Advantage",
  "Medicaid",
  "Auto Insurance (No-Fault)",
  "Workers' Compensation",
  "Private Pay",
];

export default function CoverageSection() {
  const [slide, setSlide] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  useCountUp(panelRef);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setSlide((n) => (n + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="coverage" className="w-full px-3 py-8 md:px-4">
      <div
        ref={panelRef}
        className="relative isolate mx-auto flex w-full max-w-[1280px] flex-col overflow-hidden rounded-[28px] bg-primary-container"
      >
        {/* Looping imagery */}
        {SLIDES.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ease-linear ${
              index === slide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Hard blue overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#062f6b]/[0.93]"
        />

        <div className="grid grid-cols-1 gap-10 px-6 py-12 md:px-10 md:py-14 lg:grid-cols-12 lg:gap-12 lg:px-12">
          {/* Left: the claim, then accreditation as a quiet ruled list. */}
          <div className="text-center lg:col-span-5 lg:text-left">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 font-label-md text-label-md uppercase tracking-widest text-white">
              <span className="material-symbols-outlined text-base text-secondary-fixed-dim">
                map
              </span>
              Coverage &amp; Insurance
            </p>

            <h2 className="font-display-lg text-[clamp(1.85rem,3.2vw,2.6rem)] font-bold leading-[1.03] tracking-[-0.03em] text-white">
              Coverage &amp; Insurance
            </h2>

            <p className="mt-3.5 max-w-md font-body-md text-[15px] text-white/75">
              Serving{" "}
              <span data-count="86" data-suffix="+" className="font-bold text-white">
                0+
              </span>{" "}
              Michigan counties. A CHAP-accredited, Medicare-certified agency
              &mdash; we verify your benefits before care starts.
            </p>

            <ul className="mt-6 border-t border-white/15">
              {AFFILIATIONS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 border-b border-white/15 py-2.5"
                >
                  <span
                    className="material-symbols-outlined text-xl text-secondary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-headline-md text-[15px] font-semibold text-white">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: the practical answer, in one raised card. */}
          <div className="flex items-center lg:col-span-6 lg:col-start-7">
            <div className="w-full rounded-[24px] border border-white/15 bg-white/[0.08] p-6 md:p-7">
              <p className="font-label-md text-label-md uppercase tracking-[0.14em] text-white/55">
                Insurance we accept
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {INSURERS.map((name) => (
                  <li
                    key={name}
                    className="flex items-start gap-3 border-b border-white/10 py-2.5 font-body-md text-[14.5px] text-white"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-base text-secondary-fixed-dim">
                      check
                    </span>
                    {name}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-xs font-body-md text-[15px] text-white/70">
                  Not sure what you have? We&rsquo;ll check it for you on the
                  call.
                </p>
                <a
                  href="#book"
                  className="group/cta inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 font-label-md text-label-md text-primary transition-colors hover:bg-secondary-fixed"
                >
                  Check my coverage
                  <span className="material-symbols-outlined text-base transition-transform group-hover/cta:translate-x-0.5">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
