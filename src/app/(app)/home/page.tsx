import { cn } from "@/lib/utils";
import { Header } from "@/components/home/header"; // @efferd/header-2
import { HeroSection, HeroShowcase } from "@/components/home/hero";
import { LogosSection } from "@/components/home/logos-section";

export default function page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />
      <main className="relative mx-auto max-w-4xl grow">
        <HeroSection />
        <div
          className={cn(
            "relative",
            // X Borders
            "before:absolute before:top-0 before:-bottom-14 before:-left-px before:w-px before:bg-border",
            "after:absolute after:top-0 after:-bottom-14 after:-right-px after:w-px after:bg-border",
          )}
        >
          <HeroShowcase />
          <LogosSection />
        </div>
      </main>
    </div>
  );
}
