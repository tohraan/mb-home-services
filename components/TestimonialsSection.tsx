"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useCountUp from "./useCountUp";

/** How long each testimonial holds before rotating on. */
const ROTATE_MS = 6000;

const REVIEWS = [
  {
    name: "Robert Mercer",
    relation: "Son of a patient",
    area: "Oakland County",
    rating: 5,
    photo: "/team/03.webp",
    quote:
      "The care my father received after his surgery was exceptional. The nurses were not only skilled but incredibly compassionate. They made a difficult time much easier for our whole family.",
  },
  {
    name: "Susan Thorne",
    relation: "Patient",
    area: "Washtenaw County",
    rating: 5,
    photo: "/team/05.webp",
    quote:
      "The physical therapy team helped me regain my mobility faster than I ever thought possible. They were encouraging, professional, and always arrived on time. I would recommend them to anyone.",
  },
  {
    name: "David Lindqvist",
    relation: "Discharge planner",
    area: "Wayne County",
    rating: 5,
    photo: "/team/01.webp",
    quote:
      "As a discharge planner I rely on agencies that are responsive and dependable. MB always answers the phone and makes the referral process seamless. A true partner to our hospital.",
  },
  {
    name: "Angela Duarte",
    relation: "Daughter of a patient",
    area: "Macomb County",
    rating: 5,
    photo: "/team/02.webp",
    quote:
      "They handled the insurance side entirely, which took an enormous weight off me. Mum kept the same nurse the whole way through and genuinely looked forward to her visits.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex text-[#F5B301]"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="material-symbols-outlined text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const statRef = useRef<HTMLParagraphElement>(null);
  useCountUp(statRef);

  const go = useCallback((direction: 1 | -1) => {
    setActive((n) => (n + direction + REVIEWS.length) % REVIEWS.length);
  }, []);

  // Auto-rotate. The timer restarts whenever `active` changes, so a manual
  // click also resets the dwell time rather than cutting it short.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setActive((n) => (n + 1) % REVIEWS.length),
      ROTATE_MS
    );
    return () => window.clearTimeout(id);
  }, [active]);

  const current = REVIEWS[active];

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-container-max px-margin-mobile pb-14 pt-4 md:px-margin-desktop md:pb-section-gap"
    >
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-5 font-label-md text-label-md uppercase tracking-[0.2em] text-secondary">
          Testimonials
        </p>

        <h2 className="font-display-lg text-[clamp(2.25rem,4.4vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.03em] text-primary">
          This is what{" "}
          {/* Fixed-width slot so the rotating name cannot reflow the heading. */}
          <span className="relative inline-grid text-left align-bottom">
            {REVIEWS.map((review, index) => (
              <span
                key={review.name}
                aria-hidden={index !== active}
                className={`col-start-1 row-start-1 whitespace-nowrap text-secondary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  index === active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1.5 opacity-0"
                }`}
              >
                {review.name}
              </span>
            ))}
          </span>{" "}
          says about us
        </h2>

        <p
          ref={statRef}
          className="mt-5 font-body-lg text-body-lg text-on-surface-variant"
        >
          <span data-count="12400" data-suffix="+" className="font-bold text-primary">
            0+
          </span>{" "}
          people served across Michigan.
        </p>
      </div>

      {/* Arrows flank the card. */}
      <div className="mx-auto flex max-w-4xl items-center gap-4 md:gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-primary transition-all hover:border-primary hover:bg-primary hover:text-on-primary md:flex"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </button>

        <div className="grid flex-1">
          {REVIEWS.map((review, index) => (
            <article
              key={review.name}
              aria-hidden={index !== active}
              className={`col-start-1 row-start-1 rounded-[28px] border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-[0_10px_30px_rgba(0,32,70,0.05)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-7 ${
                index === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              {/* Avatar + name left, rating right */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="size-12 shrink-0 rounded-full object-cover ring-1 ring-outline-variant/50"
                  />
                  <div>
                    <p className="font-headline-md text-[17px] font-semibold text-primary">
                      {review.name}
                    </p>
                    <p className="mt-1 font-body-md text-[14px] text-on-surface-variant">
                      {review.relation}
                    </p>
                  </div>
                </div>

                <Stars rating={review.rating} />
              </div>

              {/* Review body in its own inset box */}
              <blockquote className="mt-5 rounded-2xl bg-surface-container-low p-5 font-body-md text-[16px] leading-relaxed text-on-surface-variant md:p-6">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              {/* Area, bottom right */}
              <p className="mt-4 flex items-center justify-end gap-1.5 font-label-md text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-secondary">
                  location_on
                </span>
                {review.area}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-primary transition-all hover:border-primary hover:bg-primary hover:text-on-primary md:flex"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Position dots — also the mobile control. */}
      <div className="mt-7 flex items-center justify-center gap-2.5">
        {REVIEWS.map((review, index) => (
          <button
            key={review.name}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show testimonial from ${review.name}`}
            aria-current={index === active}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === active
                ? "w-8 bg-secondary"
                : "w-2 bg-outline-variant hover:bg-outline"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing testimonial from {current.name}, {current.area}.
      </p>
    </section>
  );
}
