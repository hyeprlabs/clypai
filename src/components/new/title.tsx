import { cn } from "@/lib/utils";

interface TitleProps {
  heading: string;
  description: string;
}

export function Title({ heading, description }: TitleProps) {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="relative flex flex-col items-center justify-center gap-3 md:gap-5 py-8 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-1 size-full overflow-hidden"
        >
          <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
          <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
          <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
          <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
        </div>

        <h1
          className={cn(
            "fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl",
            "text-shadow-[0_0px_50px_theme(--color-foreground/.2)]",
          )}
        >
          {heading}
        </h1>

        <p className="fade-in slide-in-from-bottom-10 mx-auto w-full max-w-[34ch] px-3 animate-in fill-mode-backwards text-center text-base text-foreground/80 tracking-wider delay-200 duration-500 ease-out sm:max-w-[46ch] sm:px-0 sm:text-lg md:max-w-[52ch] md:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
