import type { Metadata } from "next";
import { Title } from "@/components/new/title";
import { ChangelogAlert } from "@/components/new/changelog/changelog-alert";
import { ChangelogHighlightsSection } from "@/components/new/changelog/changelog-highlights-section";
import { ChangelogListSection } from "@/components/new/changelog/changelog-list-section";
import { ChangelogNoteSection } from "@/components/new/changelog/changelog-note-section";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Track product updates, improvements, and upcoming releases across the ClypAI platform.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="Changelog"
        description="Track what changed, what improved, and what is shipping next across the ClypAI product."
      />
      <ChangelogAlert />
      <ChangelogHighlightsSection />
      <ChangelogListSection />
      <ChangelogNoteSection />
      <CallToAction />
    </>
  );
}
