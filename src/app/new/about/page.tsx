import type { Metadata } from "next";
import { Title } from "@/components/new/title";
import { StorySection } from "@/components/new/about/story-section";
import { ValuesSection } from "@/components/new/about/values-section";
import { FaqsSection } from "@/components/new/faqs";
import { Contact } from "@/components/new/contact";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how ClypAI helps creators turn long-form content into short-form impact with a clean, creator-first workflow.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="About"
        description="A clean, creator-first approach to turning long-form content into short-form impact."
      />
      <StorySection />
      <ValuesSection />
      <FaqsSection />
      <Contact />
      <CallToAction />
    </>
  );
}
