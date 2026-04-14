import { cn } from "@/lib/utils";
import { Header } from "@/components/new/header"; // @efferd/header-2
import { HeroSection } from "@/components/new/hero";
import { LogosSection } from "@/components/new/logos-section";
import { FeatureSection } from "@/components/new/feature-section";
import { TestimonialsSection } from "@/components/new/testimonials-section";
import { Integrations } from "@/components/new/integrations";
import { CallToAction } from "@/components/new/cta";
import { Footer } from "@/components/new/footer";

export default function page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />
      <main
        className={cn(
          "relative mx-auto max-w-4xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <HeroSection />
        <LogosSection />
        <FeatureSection />
        <TestimonialsSection />
        <Integrations />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
