import type { Metadata } from "next";
import { Title } from "@/components/new/title";
import { FeaturesOverviewSection } from "@/components/new/features/features-overview-section";
import { FeaturesWorkflowSection } from "@/components/new/features/features-workflow-section";
import { FeaturesPlatformSection } from "@/components/new/features/features-platform-section";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore the complete ClypAI toolkit for clipping, editing, and publishing high-performing short-form videos.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="Features That Move Faster"
        description="Explore the full ClypAI toolkit built to turn long-form content into high-performing short-form outputs."
      />
      <FeaturesOverviewSection />
      <FeaturesWorkflowSection />
      <FeaturesPlatformSection />
      <CallToAction />
    </>
  );
}
