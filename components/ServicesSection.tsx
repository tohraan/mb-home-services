"use client";

import { useState } from "react";

const PEOPLE_HELPED = "12,400+";

/** Where every "Book Now" sends the user: the final booking form. */
const BOOKING_ANCHOR = "book";

/** Expand/collapse timing. One place to tune the whole interaction. */
const EASE = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

const SERVICES = [
  {
    number: "01",
    name: "Skilled Nursing",
    image: "/services/01.webp",
    /** Card accent. Deep enough to carry white type at low overlay opacity. */
    tint: "12,72,148",
    included: [
      "Medication setup and management",
      "Wound, ostomy and IV care",
      "Vitals and chronic condition monitoring",
      "Direct reporting to your doctor",
    ],
    helps:
      "Most readmissions happen in the first 30 days home. A nurse in the room catches the small problems while they are still small.",
    outcome: "Fewer hospital readmissions",
  },
  {
    number: "02",
    name: "Therapy at Home",
    image: "/services/02.webp",
    tint: "10,92,72",
    included: [
      "Gait, balance and fall-risk training",
      "Strength and mobility rebuilding",
      "Home safety assessment and fixes",
      "Speech and swallowing therapy",
    ],
    helps:
      "Therapy in a clinic teaches you to move in a clinic. Therapy at home teaches you to move where it counts.",
    outcome: "Independence restored faster",
  },
  {
    number: "03",
    name: "Aide & Social Work",
    image: "/services/03.webp",
    tint: "150,68,12",
    included: [
      "Bathing, dressing and personal care",
      "Mobility, transfers and safe movement",
      "Benefits, Medicaid and paperwork help",
      "Counselling and community referrals",
    ],
    helps:
      "A home health aide handles the hands-on hours a family cannot cover, and a medical social worker untangles the benefits, housing and long-term planning behind them.",
    outcome: "Practical and financial load lifted",
  },
];

function scrollToBooking() {
  document
    .getElementById(BOOKING_ANCHOR)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BookNow() {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        scrollToBooking();
      }}
      className="group/cta inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 px-4 py-2 font-label-md text-label-md text-primary transition-colors hover:bg-white"
    >
      Book Now
      <span className="material-symbols-outlined text-sm transition-transform group-hover/cta:translate-x-0.5">
        arrow_forward
      </span>
    </button>
  );
}

export default function ServicesSection() {
  /** Index of the card currently opened, or null for the even three-up state. */
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="how-we-help"
      className="mx-auto max-w-container-max px-margin-mobile py-14 md:px-margin-desktop md:py-section-gap"
    >
      <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-low px-3.5 py-2 font-label-md text-label-md uppercase tracking-widest text-primary">
          <span className="material-symbols-outlined text-base text-secondary">
            groups
          </span>
          <span className="font-bold">{PEOPLE_HELPED}</span>
          <span className="text-on-surface-variant">people helped</span>
        </p>

        <h2 className="font-display-lg text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-primary">
          How We Help You
        </h2>

        <p className="mx-auto mt-5 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          Three ways our clinicians step in. Hover a card to see what each one
          actually covers.
        </p>
      </div>

      {/*
        One composition, not three elements: on desktop every card is a flex
        child and the only thing that animates is flex-grow, so the row always
        sums to the same width and nothing can reflow or jump. On touch the
        cards keep their natural height and the same `active` state drives an
        accordion instead.
      */}
      <div
        className="flex flex-col gap-3 md:h-[500px] md:flex-row md:gap-4"
        onMouseLeave={() => setActive(null)}
      >
        {SERVICES.map((service, index) => {
          const isActive = active === index;
          const isCollapsed = active !== null && !isActive;

          return (
            <article
              key={service.number}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(isActive ? null : index)}
              aria-expanded={isActive}
              style={
                {
                  "--grow": isActive ? 7 : isCollapsed ? 0.62 : 1,
                } as React.CSSProperties
              }
              className={`group relative isolate flex min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[28px] transition-[flex-grow] ${EASE} md:[flex-basis:0] md:[flex-grow:var(--grow)]`}
            >
              {/* Photographic background. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              {/* One-sided tint: heavy where the type sits, clearing to almost
                  nothing on the far edge so the photograph stays visible. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                  background: `linear-gradient(100deg, rgba(${service.tint},0.92) 0%, rgba(${service.tint},0.72) 38%, rgba(${service.tint},0.28) 78%, rgba(${service.tint},0.12) 100%)`,
                }}
              />

              {/* Collapsed rail: number and name, turned on their side. */}
              <div
                aria-hidden={!isCollapsed}
                className={`absolute inset-0 hidden justify-center pt-9 transition-opacity duration-300 md:flex md:items-start ${
                  isCollapsed
                    ? "opacity-100 delay-150"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <div
                  className="flex items-start gap-5"
                  style={{ writingMode: "vertical-rl" }}
                >
                  <span className="font-display-lg text-5xl font-bold tracking-[-0.03em] text-white">
                    {service.number}
                  </span>
                  <span className="whitespace-nowrap font-headline-md text-lg font-semibold tracking-wide text-white/75">
                    {service.name}
                  </span>
                </div>
              </div>

              <div
                className={`flex min-w-0 flex-1 flex-col p-5 transition-opacity duration-300 md:p-9 ${
                  isCollapsed
                    ? "md:pointer-events-none md:opacity-0"
                    : "opacity-100 md:delay-100"
                }`}
              >
                {/* Number left, CTA parked on the right edge of the card. */}
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display-lg text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[0.85] tracking-[-0.04em] text-white">
                    {service.number}
                  </p>
                  <span
                    className={`transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <BookNow />
                  </span>
                </div>

                <h3 className="mt-4 whitespace-nowrap font-headline-lg text-[clamp(1.5rem,2.2vw,2rem)] font-semibold tracking-[-0.01em] text-white">
                  {service.name}
                </h3>


                {/*
                  Detail region. Absolute at md+ so it can never affect the
                  layout of an idle card; a plain max-height accordion on touch.
                */}
                <div className="relative mt-6 md:mt-9 md:flex-1">
                  <div
                    className={`overflow-hidden transition-all duration-300 md:absolute md:inset-0 md:max-h-none md:overflow-visible ${
                      isActive
                        ? "max-h-[640px] opacity-100 md:translate-y-0 md:delay-200"
                        : "pointer-events-none max-h-0 opacity-0 md:translate-y-2"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                      <div>
                        <p className="mb-4 font-label-md text-label-md uppercase tracking-[0.14em] text-white/60">
                          What&rsquo;s included
                        </p>
                        <ul className="space-y-3">
                          {service.included.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 font-body-md text-body-md text-white"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-white/70"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* "How it helps" gets its own highlighted panel. */}
                      <div className="self-start rounded-2xl bg-black/25 p-6 backdrop-blur-md">
                        <p className="mb-3 font-label-md text-label-md uppercase tracking-[0.14em] text-white/60">
                          How it helps
                        </p>
                        <p className="font-body-md text-body-md leading-relaxed text-white">
                          {service.helps}
                        </p>
                        <p className="mt-5 inline-flex w-fit items-center gap-2 font-label-md text-label-md font-semibold text-white">
                          <span className="material-symbols-outlined text-base">
                            trending_up
                          </span>
                          {service.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Default view already lists what is covered, with the CTA
                    sitting on the same base line. */}
                <div
                  className={`mt-auto transition-opacity duration-300 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <ul className="mb-5 space-y-2 border-t border-white/20 pt-5">
                    {service.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-body-md text-[14px] leading-snug text-white/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-white/60"
                        />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <BookNow />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
