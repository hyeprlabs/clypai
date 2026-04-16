import { cn } from "@/lib/utils";
import { Header } from "@/components/new/header";
import { Title } from "@/components/new/title";
import { ChangelogAlert } from "@/components/new/changelog/changelog-alert";
import { ChangelogHighlightsSection } from "@/components/new/changelog/changelog-highlights-section";
import { ChangelogListSection } from "@/components/new/changelog/changelog-list-section";
import { ChangelogNoteSection } from "@/components/new/changelog/changelog-note-section";
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
          heading="Changelog"
          description="Track what changed, what improved, and what is shipping next across the ClypAI product."
        />
        <ChangelogAlert />
        <ChangelogHighlightsSection />
        <ChangelogListSection />
        <ChangelogNoteSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
