import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/home/full-width-divider";
import { ArrowRightIcon, PhoneCallIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-5 px-4 py-12 md:min-h-[calc(100vh-3rem)] md:px-4 md:py-24 lg:py-28">
        <a
          className={cn(
            "group mx-auto flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out",
          )}
          href="#link"
        >
          <div className="rounded-xs border bg-card px-1.5 py-0.5 shadow-sm">
            <p className="font-mono text-xs">NOW</p>
          </div>

          <span className="text-xs">accepting new client projects</span>
          <span className="block h-5 border-l" />

          <div className="pr-1">
            <ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
          </div>
        </a>

        <h1
          className={cn(
            "font-heading max-w-2xl text-balance text-center text-3xl text-foreground md:text-5xl lg:text-6xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out",
          )}
        >
          Building Digital Experiences That Drive Growth
        </h1>

        <p
          className={cn(
            "text-center text-muted-foreground text-sm tracking-wider sm:text-lg",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out",
          )}
        >
          We help brands scale faster through design, <br /> development and
          strategic execution.
        </p>

        <div className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
          <Button variant="outline">
            <PhoneCallIcon data-icon="inline-start" /> Book a Call
          </Button>
          <Button>
            Get started <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HeroShowcase() {
  return (
    <div className="relative">
      <FullWidthDivider className="-top-px" />
      <div className="overflow-hidden *:pointer-events-none *:aspect-video *:select-none">
        <img
          alt="light app screen"
          className="dark:hidden"
          height="auto"
          src="https://storage.efferd.com/screen/dashboard-light.webp"
          width="auto"
        />
        <img
          alt="dark app screen"
          className="hidden dark:block"
          height="auto"
          src="https://storage.efferd.com/screen/dashboard-dark.webp"
          width="auto"
        />
      </div>
      <FullWidthDivider className="-bottom-px" />
    </div>
  );
}
