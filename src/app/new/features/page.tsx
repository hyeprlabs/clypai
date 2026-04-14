import { cn } from "@/lib/utils";
import { Header } from "@/components/new/header";
import { Title } from "@/components/new/title";
import { FeaturesOverviewSection } from "@/components/new/features/features-overview-section";
import { FeaturesWorkflowSection } from "@/components/new/features/features-workflow-section";
import { FeaturesPlatformSection } from "@/components/new/features/features-platform-section";
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
          heading="Features That Move Faster"
          description="Explore the full ClypAI toolkit built to turn long-form content into high-performing short-form outputs."
        />
        <FeaturesOverviewSection />
        <FeaturesWorkflowSection />
        <FeaturesPlatformSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
