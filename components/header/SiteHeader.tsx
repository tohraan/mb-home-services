import ConsultationForm from "./ConsultationForm";
import HeaderCopy from "./HeaderCopy";
import SiteNav from "./SiteNav";

const HEADER_SRC = "/header.webp";
const HEADER_SRC_SM = "/header-sm.webp";

export default function SiteHeader() {
  return (
    <>
      <SiteNav />

      {/* Outer section carries the page background; the inset gives the rounded
          container something to read against. */}
      <section
        id="header"
        className="relative flex min-h-screen w-full bg-background p-3 md:p-4 lg:h-screen"
      >
        <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-[28px] bg-primary">
          {/* Static background. No overlay or gradient — the copy carries its
              own shadow for legibility instead. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HEADER_SRC}
            srcSet={`${HEADER_SRC_SM} 1024w, ${HEADER_SRC} 1600w`}
            sizes="100vw"
            alt="A home health nurse reviewing a patient intake form on a tablet with a smiling elderly patient."
            fetchPriority="high"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          {/* Copy hard left, form hard right — edge-aligned rather than boxed
              into a centred container. */}
          <div className="relative z-10 flex w-full flex-1 items-center px-7 pb-14 pt-28 md:px-10 lg:min-h-0 lg:px-14 lg:pb-10 lg:pt-24">
            <div className="flex w-full flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
              <div className="w-full lg:max-w-[44%]">
                <HeaderCopy />
              </div>

              <div className="w-full lg:max-w-[520px] lg:shrink-0">
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
