import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

export function FeaturesPlatformSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="mx-auto max-w-3xl py-8 text-center">
          <h2 className="font-heading text-balance text-2xl md:text-4xl lg:text-5xl">
            Production-Grade Foundation
          </h2>
          <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
            Designed to support solo creators and teams with reliability,
            quality, and scale.
          </p>
        </div>

        <div className="overflow-hidden border-x-0 border-t">
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
            <article className="bg-background p-6 md:p-8">
              <h3 className="text-xl text-foreground">Creator Experience</h3>
              <ul className="mt-5 space-y-3 text-muted-foreground text-sm leading-6">
                <li>Fast processing for long recordings</li>
                <li>Minimal manual timeline work</li>
                <li>Consistent outputs across projects</li>
                <li>Simple controls with smart defaults</li>
              </ul>
            </article>
            <article className="bg-background p-6 md:p-8">
              <h3 className="text-xl text-foreground">Team Operations</h3>
              <ul className="mt-5 space-y-3 text-muted-foreground text-sm leading-6">
                <li>Shared brand standards for every export</li>
                <li>Reliable rendering and delivery</li>
                <li>Scalable workflows across content pipelines</li>
                <li>Faster turnaround from raw to published</li>
              </ul>
            </article>
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
