import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

export function CallToAction() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto flex w-full max-w-4xl flex-col justify-between dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <FullWidthDivider className="-top-px" />
      <div className="border-b px-2 py-8">
        <h2 className="font-heading text-center text-lg md:text-2xl">
          Plan the present. Build the future.
        </h2>
        <p className="text-balance text-center text-muted-foreground text-sm md:text-base">
          Start your journey today by clicking the button below.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 bg-secondary/80 p-4 dark:bg-secondary/40">
        <Button variant="outline">Contact Sales</Button>
        <Button>
          Get Started{" "}
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            strokeWidth={2}
            data-icon="inline-end"
          />
        </Button>
      </div>
      <FullWidthDivider className="-bottom-px" />
    </section>
  );
}
