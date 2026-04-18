import type { Metadata } from "next";
import { HeroSection } from "@/components/new/hero";
import { LogosSection } from "@/components/new/logos-section";
import { FeatureSection } from "@/components/new/feature-section";
import { TestimonialsSection } from "@/components/new/testimonials-section";
import { Integrations } from "@/components/new/integrations";
import { FaqsSection } from "@/components/new/faqs";
import { Contact } from "@/components/new/contact";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "Create More Clips, Faster",
  description:
    "Transform long-form videos into short-form content with AI-powered clipping and editing built for creators.",
};

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
