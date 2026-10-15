import { cn } from "@/lib/utils";
import { Header } from "@/components/home/header"; // @efferd/header-2
import { HeroSection, HeroShowcase } from "@/components/home/hero";
import { LogoCloud } from "@/components/logo-cloud"; // @efferd/logo-cloud-4
import { LogosSection } from "@/components/home/logos-section";
import { FlowSection } from "@/components/home/flow-section";
import { IntegrationsSection } from "@/components/home/integrations-section";
import { PricingSection } from "@/components/home/pricing-section";
import { Footer } from "@/components/home/footer";

export default function page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[oklch(0.99_0.006_75)] px-4 supports-[overflow:clip]:overflow-clip">
      <Header />
      <main className="relative mx-auto w-full max-w-5xl grow">
        <HeroSection />
        <div
          className={cn(
            "relative",
            // X Borders
            "before:absolute before:top-0 before:-bottom-14 before:-left-px before:w-px before:bg-border",
            "after:absolute after:top-0 after:-bottom-14 after:-right-px after:w-px after:bg-border",
          )}
        >
          <LogoCloud />
          <HeroShowcase />
          <LogosSection />
          <FlowSection />
          <IntegrationsSection />
          <PricingSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
