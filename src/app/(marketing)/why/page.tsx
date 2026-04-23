import type { Metadata } from "next";
import { Title } from "@/components/new/title";
import { ManifestoSection } from "@/components/new/why/manifesto-section";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "Why ClypAI",
  description:
    "Read the ClypAI manifesto and the principles behind building a faster path from long-form to short-form content.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="The Pulse of Content"
        description="The manifesto behind ClypAI and why we built a faster path from long-form to short-form impact."
      />
      <ManifestoSection />
      <CallToAction />
    </>
  );
}
