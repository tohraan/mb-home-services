"use client";

import { useState } from "react";

import Field, { FIELD_SHELL } from "./header/form/Field";
import SelectField from "./header/form/SelectField";

const RELATIONSHIPS = [
  "I am the patient",
  "Parent",
  "Spouse or partner",
  "Other family member",
  "Legal guardian / POA",
  "Case manager or planner",
];

const SERVICES = [
  "Skilled nursing",
  "Physical therapy",
  "Occupational therapy",
  "Speech therapy",
  "Personal & daily assistance",
  "Not sure yet",
];

const URGENCY = [
  "As soon as possible",
  "Within a week",
  "Within a month",
  "Planning ahead",
];

const CURRENT_LOCATION = [
  "At home",
  "In hospital",
  "In rehab or skilled nursing",
  "Assisted living",
];

const COVERAGE = [
  "Medicare",
  "Medicare Advantage",
  "Medicaid",
  "Blue Cross Blue Shield",
  "Blue Care Network",
  "Auto insurance (no-fault)",
  "Workers' compensation",
  "Private pay",
  "Not sure",
];

const CALL_TIMES = [
  "Morning (8am – 12pm)",
  "Afternoon (12pm – 5pm)",
  "Evening (5pm – 8pm)",
  "Any time",
];

const CONTACT_DETAILS = [
  {
    icon: "call",
    label: "24/7 intake line",
    value: "248-442-7500",
    href: "tel:2484427500",
  },
  {
    icon: "location_on",
    label: "Office",
    value: "30300 Northwestern Hwy, Suite 220, Farmington Hills, MI 48334",
  },
  {
    icon: "schedule",
    label: "Response time",
    value: "A coordinator calls back within one business day",
  },
];

/** Section heading used inside the form to group related questions. */
function Group({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-outline-variant/60 pt-7 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <p className="mb-6 flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-label-md text-[12px] font-bold text-on-primary">
          {step}
        </span>
        <span className="font-headline-md text-[17px] font-semibold text-primary">
          {title}
        </span>
      </p>
      <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2">
        {children}
      </div>
    </fieldset>
  );
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  /** The full intake is long; only the first three fields show up front. */
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: POST new FormData(event.currentTarget) to the intake endpoint.
    setSubmitted(true);
  }

  return (
    <section
      id="book"
      className="mx-auto max-w-container-max scroll-mt-24 px-margin-mobile py-14 md:px-margin-desktop md:py-section-gap"
    >
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="font-display-lg text-[clamp(2.25rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-primary">
          Book Your Free Consultation
        </h2>

        <p className="mx-auto mt-5 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          The more you tell us here, the more useful the callback. Everything
          below is optional except your contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Contact details */}
        <aside className="lg:col-span-4">
          <div className="rounded-[28px] bg-primary p-6 text-on-primary md:p-8">
            <h3 className="font-headline-md text-[20px] font-semibold">
              Prefer to talk?
            </h3>
            <p className="mt-2.5 font-body-md text-[15px] text-white/75">
              Our intake team answers around the clock — no phone trees, no
              call centres.
            </p>

            <ul className="mt-8 space-y-6">
              {CONTACT_DETAILS.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <span className="material-symbols-outlined text-secondary-fixed-dim">
                      {item.icon}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md uppercase tracking-[0.12em] text-white/55">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1.5 block font-headline-md text-[19px] font-semibold transition-colors hover:text-secondary-fixed-dim"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1.5 font-body-md text-[15px] leading-snug text-white/85">
                        {item.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 flex items-start gap-2 border-t border-white/15 pt-6 font-label-md text-[12.5px] leading-relaxed text-white/60">
              <span className="material-symbols-outlined text-sm text-secondary-fixed-dim">
                lock
              </span>
              Your information is used only to arrange care. We never sell or
              share it.
            </p>
          </div>
        </aside>

        {/* Detailed intake form */}
        <div className="lg:col-span-8">
          {submitted ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[28px] border border-outline-variant/60 bg-surface-container-lowest p-10 text-center">
              <span
                className="material-symbols-outlined mb-5 text-6xl text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <h3 className="font-headline-md text-headline-md text-primary">
                Request received
              </h3>
              <p className="mt-3 max-w-sm font-body-md text-body-md text-on-surface-variant">
                A care coordinator will call you within one business day. If you
                need someone sooner, call 248-442-7500 — the line is staffed
                24/7.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-8 rounded-[28px] border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-[0_10px_30px_rgba(0,32,70,0.05)] md:p-9"
            >
              <Group step="1" title="Your details">
                <Field id="bk-name" label="Your name">
                  <input
                    id="bk-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Whitmore"
                    className={FIELD_SHELL}
                  />
                </Field>

                <Field id="bk-phone" label="Phone">
                  <input
                    id="bk-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(313) 555-0142"
                    className={FIELD_SHELL}
                  />
                </Field>

                <Field id="bk-email" label="Email">
                  <input
                    id="bk-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className={FIELD_SHELL}
                  />
                </Field>

              </Group>

              {!expanded && (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-surface-container-low px-6 py-4 font-headline-md text-[16px] font-semibold text-primary transition-colors hover:bg-surface-container"
                >
                  Continue &mdash; add care details
                  <span className="material-symbols-outlined text-xl">
                    expand_more
                  </span>
                </button>
              )}

              <div className={expanded ? "space-y-8" : "hidden"}>
              <Group step="2" title="When to reach you">
                <SelectField
                  name="callTime"
                  label="Best time to call"
                  options={CALL_TIMES}
                  placeholder="Choose one"
                />
              </Group>

              <Group step="3" title="Who needs care">
                <Field id="bk-patient" label="Patient name">
                  <input
                    id="bk-patient"
                    name="patientName"
                    type="text"
                    placeholder="Margaret Whitmore"
                    className={FIELD_SHELL}
                  />
                </Field>

                <SelectField
                  name="relationship"
                  label="Your relationship"
                  options={RELATIONSHIPS}
                  placeholder="Choose one"
                />

                <Field id="bk-age" label="Patient age">
                  <input
                    id="bk-age"
                    name="patientAge"
                    type="number"
                    min={0}
                    max={120}
                    placeholder="78"
                    className={FIELD_SHELL}
                  />
                </Field>

                <SelectField
                  name="currentLocation"
                  label="Currently"
                  options={CURRENT_LOCATION}
                  placeholder="Choose one"
                />
              </Group>

              <Group step="4" title="Care needed">
                <SelectField
                  name="careType"
                  label="Service"
                  options={SERVICES}
                  placeholder="Choose one"
                />

                <SelectField
                  name="urgency"
                  label="How soon"
                  options={URGENCY}
                  placeholder="Choose one"
                />

                <Field id="bk-address" label="Street address">
                  <input
                    id="bk-address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="482 Maple Ave"
                    className={FIELD_SHELL}
                  />
                </Field>

                <Field id="bk-county" label="County or ZIP">
                  <input
                    id="bk-county"
                    name="location"
                    type="text"
                    required
                    autoComplete="postal-code"
                    placeholder="Oakland County"
                    className={FIELD_SHELL}
                  />
                </Field>
              </Group>

              <Group step="5" title="Coverage">
                <SelectField
                  name="coverage"
                  label="Paying with"
                  options={COVERAGE}
                  placeholder="Choose one"
                />

                <Field id="bk-member" label="Member ID">
                  <input
                    id="bk-member"
                    name="memberId"
                    type="text"
                    placeholder="Optional"
                    className={FIELD_SHELL}
                  />
                </Field>

                <Field id="bk-physician" label="Referring physician">
                  <input
                    id="bk-physician"
                    name="physician"
                    type="text"
                    placeholder="Dr. Alan Reyes"
                    className={FIELD_SHELL}
                  />
                </Field>

                <Field id="bk-practice" label="Practice or hospital">
                  <input
                    id="bk-practice"
                    name="practice"
                    type="text"
                    placeholder="Beaumont Royal Oak"
                    className={FIELD_SHELL}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field id="bk-notes" label="Anything we should know">
                    <textarea
                      id="bk-notes"
                      name="notes"
                      rows={4}
                      placeholder="Recent hospital stay, mobility needs, medications, preferred visit times…"
                      className={`${FIELD_SHELL} resize-none`}
                    />
                  </Field>
                </div>
              </Group>

              </div>

              <label className={`${expanded ? "flex" : "hidden"} items-start gap-3 font-body-md text-[14.5px] leading-relaxed text-on-surface-variant`}>
                <input
                  type="checkbox"
                  name="consent"
                  required={expanded}
                  className="mt-1 size-4 shrink-0 rounded border-outline-variant text-primary focus:ring-secondary/25"
                />
                I agree to be contacted about home health services. This form is
                not for medical emergencies — call 911 if care is urgent.
              </label>

              <button
                type="submit"
                className={`${expanded ? "flex" : "hidden"} w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-[1.15rem] font-headline-md text-[18px] font-semibold text-on-primary shadow-[0_12px_32px_rgba(0,32,70,0.32)] transition-all hover:bg-secondary active:scale-[0.99]`}
              >
                Book Consultation Now
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
