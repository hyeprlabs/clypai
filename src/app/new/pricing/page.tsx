import { cn } from "@/lib/utils";
import { Header } from "@/components/new/header"; // @efferd/header-2
import { Title } from "@/components/new/title";
import { PricingSection } from "@/components/new/pricing/pricing-section";
import { PricingTable } from "@/components/new/pricing/pricing-table";
import { CreditsSection } from "@/components/new/pricing/credits";
import { CallToAction } from "@/components/new/cta";
import { Footer } from "@/components/new/footer";

export default function Page() {
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
        <Title
          heading="Pricing"
          description="Choose the plan that fits your workflow. Scale up as your content grows."
        />
        <PricingSection />
        <PricingTable />
        <CreditsSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
