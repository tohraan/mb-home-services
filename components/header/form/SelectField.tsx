"use client";

import { useEffect, useId, useRef, useState } from "react";

import Field, { FIELD_SHELL } from "./Field";

type Props = {
  name: string;
  label: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
};

/**
 * Custom listbox. Replaces the native <select> so the control matches the rest
 * of the form on every platform, while still posting a value with the form via
 * a hidden input.
 */
export default function SelectField({
  name,
  label,
  options,
  placeholder = "Select…",
  required,
}: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const choose = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + delta + options.length) % options.length);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(options[active]);
      else setOpen(true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setActive(options.length - 1);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <Field id={id} label={label}>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-controls={`${id}-listbox`}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => {
            setOpen((o) => !o);
            setActive(Math.max(0, options.indexOf(value)));
          }}
          onKeyDown={onKeyDown}
          className={`${FIELD_SHELL} flex items-center justify-between gap-2 ${
            open ? "border-secondary ring-4 ring-secondary/12" : ""
          }`}
        >
          <span
            className={value ? "text-on-surface" : "text-on-surface-variant/45"}
          >
            {value || placeholder}
          </span>
          <span
            aria-hidden="true"
            className={`material-symbols-outlined shrink-0 text-lg text-on-surface-variant transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </button>
      </Field>

      {/* Hidden mirror so the value posts with the form. */}
      <input type="hidden" name={name} value={value} required={required} />

      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-56 overflow-y-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-1.5 shadow-[0_20px_50px_rgba(0,32,70,0.22)]"
        >
          {options.map((option, index) => {
            const selected = option === value;
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(option)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left font-body-md text-[14.5px] transition-colors ${
                    index === active
                      ? "bg-surface-container-high text-primary"
                      : "text-on-surface"
                  }`}
                >
                  {option}
                  {selected && (
                    <span className="material-symbols-outlined text-base text-secondary">
                      check
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
