import type { Metadata } from "next";
import { Title } from "@/components/new/title";
import { ApiAlert } from "@/components/new/features/api/api-alert";
import { ApiIntroSection } from "@/components/new/features/api/intro";
import { ApiEndpointsSection } from "@/components/new/features/api/endpoints";
import { ApiQuickstartSection } from "@/components/new/features/api/quickstart";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "API",
  description:
    "Integrate ClypAI into your stack with a streamlined API for AI-powered clipping and editing workflows.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="ClypAI API"
        description="One endpoint. Full AI pipeline. Zero infrastructure."
      />
      <ApiAlert />
      <ApiIntroSection />
      <ApiEndpointsSection />
      <ApiQuickstartSection />
      <CallToAction />
    </>
  );
}
