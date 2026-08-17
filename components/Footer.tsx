const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Skilled Nursing", href: "#how-we-help" },
      { label: "Therapy at Home", href: "#how-we-help" },
      { label: "Everyday Living", href: "#how-we-help" },
      { label: "Our Process", href: "#process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Family", href: "#team" },
      { label: "Coverage", href: "#coverage" },
      { label: "Stories", href: "#testimonials" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Book a consultation", href: "#book" },
      { label: "Insurance & billing", href: "#coverage" },
      { label: "Privacy policy", href: "#" },
      { label: "Notice of privacy practices", href: "#" },
    ],
  },
];

const BADGES = ["CHAP Accredited", "Medicare Certified", "HIPAA Compliant"];

export default function Footer() {
  return (
    <footer className="w-full px-3 pb-3 md:px-4 md:pb-4">
      <div className="mx-auto w-full max-w-[1720px] overflow-hidden rounded-[28px] bg-primary text-on-primary">
        <div className="px-7 pt-14 md:px-12 md:pt-16 lg:px-16">
          {/* Call to action band */}
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/12 pb-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display-lg text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Care can start this week.
              </h2>
              <p className="mt-3 max-w-md font-body-md text-[15px] text-white/65">
                Talk to a coordinator today — no cost, no obligation, no phone
                trees.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#book"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-label-md text-label-md font-semibold text-primary transition-colors hover:bg-secondary-fixed"
              >
                Book a consultation
                <span className="material-symbols-outlined text-base transition-transform group-hover/cta:translate-x-0.5">
                  arrow_forward
                </span>
              </a>
              <a
                href="tel:2484427500"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-label-md text-label-md transition-colors hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-base">
                  call
                </span>
                248-442-7500
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <span className="flex items-center gap-2 font-headline-md text-[19px] font-bold">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  medical_services
                </span>
                MB Home Services
              </span>
              <p className="mt-4 max-w-xs font-body-md text-[15px] leading-relaxed text-white/65">
                Skilled nursing, therapy and daily support delivered at home
                across Michigan.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {BADGES.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border border-white/20 px-3 py-1.5 font-label-md text-[11.5px] uppercase tracking-[0.1em] text-white/70"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            </div>

            {COLUMNS.map((column) => (
              <nav key={column.title} className="md:col-span-2">
                <h3 className="font-label-md text-label-md uppercase tracking-[0.14em] text-white/45">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body-md text-[15px] text-white/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <address className="not-italic md:col-span-2">
              <h3 className="font-label-md text-label-md uppercase tracking-[0.14em] text-white/45">
                Office
              </h3>
              <p className="mt-5 font-body-md text-[15px] leading-relaxed text-white/75">
                30300 Northwestern Hwy
                <br />
                Suite 220
                <br />
                Farmington Hills, MI 48334
              </p>
            </address>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4 border-t border-white/12 py-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-body-md text-[13px] text-white/45">
              &copy; {new Date().getFullYear()} MB Home Services. All rights
              reserved.
            </p>
            <p className="max-w-2xl font-body-md text-[13px] leading-relaxed text-white/45">
              MB Home Health Care provides services without discrimination on
              the basis of race, color, creed, sex, age, religion, disability,
              or place of origin.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
