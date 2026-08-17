"use client";

import { useRef } from "react";

import useCountUp from "../useCountUp";

/** Compliance / assurance line — one row, no chips, so it reads as a footnote. */
const ASSURANCES = [
  "Medicare-certified",
  "HIPAA-compliant",
  "Care starts in 48 hrs",
];

const STATS = [
  { value: 12400, suffix: "+", label: "Families cared for since 2009" },
  { value: 86, suffix: "+", label: "Michigan counties served" },
  { value: 4.9, suffix: "", label: "Average family rating", decimals: 1 },
];

export default function HeaderCopy() {
  const statsRef = useRef<HTMLDivElement>(null);
  useCountUp(statsRef);

  return (
    <div className="max-w-xl">
      <h1 className="font-display-lg text-[clamp(2.5rem,3.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white drop-shadow-[0_2px_16px_rgba(0,9,27,0.75)]">
        Expert medical care,
        <br />
        without leaving home.
      </h1>

      <p className="mt-6 max-w-md font-body-lg text-body-lg text-white/90 drop-shadow-[0_1px_10px_rgba(0,9,27,0.75)]">
        So recovery happens where your family already feels safe.
      </p>

      {/* Social proof — one aligned row of three, then a single quiet
          assurance line. */}
      <div
        ref={statsRef}
        className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-primary/45 px-4 py-5">
            <p className="font-display-lg text-[clamp(1.5rem,2.1vw,2rem)] font-bold leading-none tracking-[-0.02em] text-white">
              <span
                data-count={stat.value}
                data-decimals={stat.decimals ?? 0}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </span>
            </p>
            <p className="mt-2.5 font-body-md text-[13px] leading-snug text-white/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-label-md text-label-md text-white/80 drop-shadow-[0_1px_8px_rgba(0,9,27,0.75)]">
        {ASSURANCES.map((item, index) => (
          <span key={item} className="flex items-center gap-3">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-white/40"
              />
            )}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}
