"use client";

import { useEffect, useRef, useState } from "react";

const BOOKING_ANCHOR = "book";

/** Scroll distance allotted to each stage, in viewport heights. */
const VH_PER_STEP = 85;

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    image: "/process/01.webp",
    description:
      "We start with a conversation, not paperwork. A care coordinator listens to what is actually happening at home, then verifies your insurance eligibility while you are still on the call — so you know where you stand before anything is committed to.",
    meta: "Same-day callback",
  },
  {
    number: "02",
    title: "Physician Order",
    image: "/process/02.webp",
    description:
      "We contact your doctor directly and handle the clinical orders, referrals and documentation ourselves. Families are usually surprised by how little they have to chase — that part is our job, not yours.",
    meta: "We handle the paperwork",
  },
  {
    number: "03",
    title: "Care Plan",
    image: "/process/03.webp",
    description:
      "A registered nurse visits your home, assesses the space as well as the patient, and builds a plan around both. Stairs, bathrooms, medication schedules, who is around during the day — all of it shapes the plan.",
    meta: "Built by an RN, in your home",
  },
  {
    number: "04",
    title: "Start of Care",
    image: "/process/04.webp",
    description:
      "Your assigned clinician arrives and care begins, typically within 48 hours of approval. You keep the same team throughout, and your coordinator stays reachable for the whole episode of care.",
    meta: "Care starts in 48 hrs",
  },
];

function BookNow() {
  return (
    <a
      href={`#${BOOKING_ANCHOR}`}
      className="group/cta inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 py-3 font-label-md text-label-md text-on-primary transition-colors hover:bg-secondary"
    >
      Book Now
      <span className="material-symbols-outlined text-base transition-transform group-hover/cta:translate-x-0.5">
        arrow_forward
      </span>
    </a>
  );
}

export default function CareProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const travel = track.offsetHeight - window.innerHeight;
      if (travel <= 0) return;

      // How far the pinned frame has been scrolled through, 0..1.
      const scrolled = -track.getBoundingClientRect().top;
      const progress = Math.min(Math.max(scrolled / travel, 0), 1);
      const next = Math.min(
        STEPS.length - 1,
        Math.floor(progress * STEPS.length)
      );

      // Only re-render when the stage actually changes.
      setActive((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="process" className="w-full">
      {/*
        A single pinned frame. The track behind it supplies the scroll distance;
        the frame itself never moves, and every stage is overlaid in the same
        grid cell so switching stages cannot shift the layout by a pixel.
      */}
      <div
        ref={trackRef}
        style={{ height: `${STEPS.length * VH_PER_STEP}vh` }}
        className="relative"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile py-8 md:px-margin-desktop">
            {/* Locked heading: lives inside the pinned frame so it stays in
                view for the whole interaction. */}
            <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">              <h2 className="font-display-lg text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em] text-primary">
                The Care Process
              </h2>
            </div>

            <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Stage image — all stages stacked, crossfaded. */}
              <div className="lg:col-span-6">
                <div className="relative grid overflow-hidden rounded-[28px] bg-surface-container">
                  {STEPS.map((step, index) => (
                    <div
                      key={step.number}
                      aria-hidden={index !== active}
                      className={`col-start-1 row-start-1 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        index === active ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={step.image}
                        alt={`${step.title} — MB Home Services care process`}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-[280px] w-full object-cover md:h-[380px] lg:h-[440px]"
                      />
                      <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 font-label-md text-label-md font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
                        {step.meta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage copy — same overlay technique, so the counter, title and
                  description box hold their exact positions between stages. */}
              <div className="grid lg:col-span-6">
                {STEPS.map((step, index) => (
                  <div
                    key={step.number}
                    aria-hidden={index !== active}
                    className={`col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      index === active
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <p className="font-display-lg text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[0.8] tracking-[-0.05em] text-primary/20">
                      {step.number}
                    </p>

                    <h3 className="mt-5 font-display-lg text-[clamp(2rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-primary">
                      {step.title}
                    </h3>

                    {/* Description lives in its own content box, CTA anchored
                        to its bottom-right corner. */}
                    <div className="mt-6 rounded-[24px] border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-[0_10px_30px_rgba(0,32,70,0.05)] md:p-7">
                      <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                        {step.description}
                      </p>
                      <div className="mt-6 flex justify-end">
                        <BookNow />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
