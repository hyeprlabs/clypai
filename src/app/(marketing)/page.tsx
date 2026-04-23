import { HeroSection } from "@/components/new/hero";
import { LogosSection } from "@/components/new/logos-section";
import { FeatureSection } from "@/components/new/feature-section";
import { TestimonialsSection } from "@/components/new/testimonials-section";
import { Integrations } from "@/components/new/integrations";
import { FaqsSection } from "@/components/new/faqs";
import { Contact } from "@/components/new/contact";
import { CallToAction } from "@/components/new/cta";

export default function Page() {
  return (
    <>
      <HeroSection />
      <LogosSection />
      <FeatureSection />
      <TestimonialsSection />
      <FaqsSection />
      <Integrations />
      <Contact />
      <CallToAction />
    </>
  );
}
