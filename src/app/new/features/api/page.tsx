import { cn } from "@/lib/utils";
import { Header } from "@/components/new/header";
import { Title } from "@/components/new/title";
import { ApiAlert } from "@/components/new/features/api/api-alert";
import { ApiIntroSection } from "@/components/new/features/api/intro";
import { ApiEndpointsSection } from "@/components/new/features/api/endpoints";
import { ApiQuickstartSection } from "@/components/new/features/api/quickstart";
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
          heading="ClypAI API"
          description="One endpoint. Full AI pipeline. Zero infrastructure."
        />
        <ApiAlert />
        <ApiIntroSection />
        <ApiEndpointsSection />
        <ApiQuickstartSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
