import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/home/full-width-divider";
import { ArrowRightIcon, PhoneCallIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section>
      <div className="relative left-1/2 flex min-h-[calc(100vh-3.5rem)] w-screen max-w-none -translate-x-1/2 items-center justify-center px-4 py-12 md:min-h-[calc(100vh-3rem)] md:px-4 md:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="-z-10 absolute inset-2 overflow-hidden rounded-2xl sm:inset-4"
        >
          {/* Faded Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
          >
            <div className="absolute inset-0 bg-[size:64px_64px] [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px)]" />
          </div>
          <img alt="" className="size-full object-cover" src="/bg.png" />
        </div>

        <div className="-translate-y-28 flex flex-col items-center gap-5 sm:-translate-y-16 md:-translate-y-24 lg:-translate-y-36">
          <a
            className={cn(
              "group mx-auto flex w-fit max-w-[90vw] items-center gap-2 rounded-sm border bg-card p-1 shadow sm:gap-3",
              "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out",
            )}
            href="#link"
          >
            <div className="shrink-0 rounded-xs border bg-card px-1.5 py-0.5 shadow-sm">
              <p className="font-mono text-xs">NOW</p>
            </div>

            <span className="truncate text-xs">
              accepting new client projects
            </span>
            <span className="block h-5 shrink-0 border-l" />

            <div className="shrink-0 pr-1">
              <ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
            </div>
          </a>

          <h1
            className={cn(
              "max-w-2xl text-balance text-center font-serif font-medium text-3xl text-foreground md:text-5xl lg:text-6xl",
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

          <div className="fade-in slide-in-from-bottom-10 flex w-fit flex-wrap animate-in items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
            <Button variant="outline">
              <PhoneCallIcon data-icon="inline-start" /> Book a Call
            </Button>
            <Button>
              Get started <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
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
          className="h-auto w-full dark:hidden"
          src="https://storage.efferd.com/screen/dashboard-light.webp"
        />
        <img
          alt="dark app screen"
          className="hidden h-auto w-full dark:block"
          src="https://storage.efferd.com/screen/dashboard-dark.webp"
        />
      </div>
      <FullWidthDivider className="-bottom-px" />
    </div>
  );
}
