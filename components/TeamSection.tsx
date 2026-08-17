"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TEAM = [
  { name: "Sarah Jenkins", role: "RN, Clinical Director", photo: "/team/01.webp" },
  { name: "Maria Delgado", role: "Physical Therapist", photo: "/team/02.webp" },
  { name: "Anne Whitfield", role: "Occupational Therapist", photo: "/team/03.webp" },
  { name: "Priya Raman", role: "RN, Case Manager", photo: "/team/04.webp" },
  { name: "Claire Boyd", role: "Care Coordinator", photo: "/team/05.webp" },
  { name: "Nadia Hassan", role: "Speech Therapist", photo: "/team/03.webp" },
  { name: "Ruth Okafor", role: "Home Health Aide", photo: "/team/01.webp" },
  { name: "Elena Marsh", role: "Intake Specialist", photo: "/team/05.webp" },
];

export default function TeamSection() {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const roll = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    // Advance a full row at a time.
    rail.scrollBy({ left: direction * rail.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      id="team"
      className="w-full px-margin-mobile py-section-gap md:px-margin-desktop"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-low px-3.5 py-2 font-label-md text-label-md uppercase tracking-widest text-primary">
          <span className="material-symbols-outlined text-base text-secondary">
            diversity_1
          </span>
          Our Team
        </p>

        <h2 className="font-display-lg text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-primary">
          Our Family
        </h2>

        <p className="mx-auto mt-5 max-w-lg font-body-lg text-body-lg text-on-surface-variant">
          The clinicians and coordinators helping 12,400+ families across
          Michigan.
        </p>
      </div>

      {/* Rail sits between the two arrows, so the row itself spans the
          section and always shows five whole profiles on desktop. */}
      <div className="mx-auto flex w-full max-w-[1720px] items-center gap-4 md:gap-6">
        <button
          type="button"
          onClick={() => roll(-1)}
          disabled={atStart}
          aria-label="Show previous team members"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-primary transition-all hover:border-primary hover:bg-primary hover:text-on-primary disabled:pointer-events-none disabled:opacity-30 md:flex"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <ul
          ref={railRef}
          onScroll={sync}
          className="hide-scrollbar flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 md:gap-6"
        >
          {TEAM.map((person) => (
            <li
              key={person.name}
              className="group flex w-[calc((100%-2rem)/2)] shrink-0 snap-start flex-col items-center text-center sm:w-[calc((100%-4rem)/3)] lg:w-[calc((100%-6rem)/4)] xl:w-[calc((100%-6rem)/5)]"
            >
              <div className="relative mb-5 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.photo}
                  alt={`${person.name}, ${person.role}`}
                  loading="lazy"
                  width={320}
                  height={320}
                  className="aspect-square w-full rounded-full object-cover shadow-[0_10px_30px_rgba(0,32,70,0.12)] ring-1 ring-outline-variant/50 transition-transform duration-300 group-hover:-translate-y-1.5"
                />
              </div>

              <p className="font-headline-md text-[clamp(0.95rem,1.15vw,1.15rem)] font-semibold leading-tight text-primary">
                {person.name}
              </p>
              <p className="mt-1.5 font-body-md text-[clamp(0.8rem,0.95vw,0.9rem)] leading-snug text-on-surface-variant">
                {person.role}
              </p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => roll(1)}
          disabled={atEnd}
          aria-label="Show more team members"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-primary transition-all hover:border-primary hover:bg-primary hover:text-on-primary disabled:pointer-events-none disabled:opacity-30 md:flex"
        >
          <span className="material-symbols-outlined text-xl">
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
}
