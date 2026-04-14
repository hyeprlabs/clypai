import { cn } from "@/lib/utils";
import { Header } from "@/components/new/header";
import { Title } from "@/components/new/title";
import { ManifestoSection } from "@/components/new/why/manifesto-section";
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
          heading="The Pulse of Content"
          description="The manifesto behind ClypAI and why we built a faster path from long-form to short-form impact."
        />
        <ManifestoSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
