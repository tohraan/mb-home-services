import SiteHeader from "@/components/header/SiteHeader";
import Reveal from "@/components/Reveal";
import ServicesSection from "@/components/ServicesSection";
import CoverageSection from "@/components/CoverageSection";
import TeamSection from "@/components/TeamSection";
import CareProcessSection from "@/components/CareProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Static header. Renders the site nav itself so the pill and the docked
          bar are one continuous element. */}
      <SiteHeader />

      <main>
        {/* How We Help You */}
        <Reveal>
          <ServicesSection />
        </Reveal>
        {/* Coverage & Insurance Section */}
        <Reveal>
          <CoverageSection />
        </Reveal>
        {/* Our Family / Team Section */}
        <Reveal>
          <TeamSection />
        </Reveal>
        {/* Our Care Process Section */}
        <Reveal>
          <CareProcessSection />
        </Reveal>
        {/* Testimonials Section */}
        <Reveal>
          <TestimonialsSection />
        </Reveal>
        {/* Final Contact/Callback Section */}
        <Reveal>
          <ContactSection />
        </Reveal>
      </main>

      {/* Footer */}
      <Reveal>
        <Footer />
      </Reveal>
    </>
  );
}
