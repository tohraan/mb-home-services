"use client";

import { useState } from "react";

import Field, { FIELD_SHELL } from "./form/Field";
import SelectField from "./form/SelectField";

const RECIPIENTS = [
  "Myself",
  "My parent",
  "My spouse or partner",
  "Another family member",
];

const CARE_TYPES = [
  "Skilled nursing",
  "Physical therapy",
  "Occupational therapy",
  "Personal & daily assistance",
  "Not sure yet",
];

const URGENCY = [
  "As soon as possible",
  "Within a week",
  "Within a month",
  "Planning ahead",
];

const COVERAGE = ["Medicare", "Medicaid", "Private insurance", "Private pay"];

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: POST new FormData(event.currentTarget) to the intake endpoint.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-3xl bg-surface-container-lowest p-8 text-center shadow-[0_24px_70px_rgba(0,32,70,0.28)]">
        <span
          className="material-symbols-outlined mb-4 text-5xl text-secondary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <h3 className="mb-2 font-headline-md text-headline-md text-primary">
          Request received
        </h3>
        <p className="max-w-xs font-body-md text-body-md text-on-surface-variant">
          A care coordinator will call you within one business day to schedule
          your free consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-surface-container-lowest p-8 shadow-[0_24px_70px_rgba(0,32,70,0.28)] ring-1 ring-white/50"
    >
      <div className="mb-7">
        <h2 className="font-headline-md text-[25px] font-semibold text-primary">
          Book a free consultation
        </h2>
        <p className="mt-2 font-body-md text-[15px] text-on-surface-variant">
          A nurse reviews your needs and builds a care plan. No cost, no
          obligation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2">
        <Field id="cf-name" label="Your name">
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Whitmore"
            className={FIELD_SHELL}
          />
        </Field>

        <Field id="cf-phone" label="Phone">
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(313) 555-0142"
            className={FIELD_SHELL}
          />
        </Field>

        <Field id="cf-email" label="Email">
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            className={FIELD_SHELL}
          />
        </Field>

        <Field id="cf-location" label="County or ZIP">
          <input
            id="cf-location"
            name="location"
            type="text"
            required
            autoComplete="postal-code"
            placeholder="Oakland County"
            className={FIELD_SHELL}
          />
        </Field>

        <SelectField
          name="careFor"
          label="Care is for"
          options={RECIPIENTS}
          placeholder="Choose one"
          required
        />

        <SelectField
          name="careType"
          label="Care needed"
          options={CARE_TYPES}
          placeholder="Choose one"
          required
        />

        <SelectField
          name="urgency"
          label="How soon"
          options={URGENCY}
          placeholder="Choose one"
          required
        />

        <SelectField
          name="coverage"
          label="Paying with"
          options={COVERAGE}
          placeholder="Choose one"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-9 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-[1.15rem] font-headline-md text-[18px] font-semibold text-on-primary shadow-[0_12px_32px_rgba(0,32,70,0.32)] transition-all hover:bg-secondary active:scale-[0.99]"
      >
        Book Consultation Now
        <span className="material-symbols-outlined text-xl">arrow_forward</span>
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 font-label-md text-[12.5px] leading-none text-on-surface-variant/80">
        <span className="material-symbols-outlined text-sm text-secondary">
          lock
        </span>
        Private and secure. We never share your details.
      </p>
    </form>
  );
}
