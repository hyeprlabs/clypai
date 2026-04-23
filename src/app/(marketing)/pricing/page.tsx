import type { Metadata } from "next";
import { Title } from "@/components/new/title";
import { PricingSection } from "@/components/new/pricing/pricing-section";
import { PricingTable } from "@/components/new/pricing/pricing-table";
import { CreditsSection } from "@/components/new/pricing/credits";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the ClypAI plan that fits your workflow and scale as your content production grows.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="Pricing"
        description="Choose the plan that fits your workflow. Scale up as your content grows."
      />
      <PricingSection />
      <PricingTable />
      <CreditsSection />
      <CallToAction />
    </>
  );
}
