import type { ReactNode } from "react";

/**
 * Outlined field whose label sits on the border line rather than above it.
 * The label carries the surface colour so it cuts a notch out of the outline.
 */
export const FIELD_SHELL =
  "w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 pb-3.5 pt-4 text-left font-body-md text-[15.5px] text-on-surface transition-colors placeholder:text-on-surface-variant/45 hover:border-outline focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/12";

export default function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute -top-2 left-3 bg-surface-container-lowest px-1.5 font-label-md text-[11.5px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant"
      >
        {label}
      </label>
    </div>
  );
}
