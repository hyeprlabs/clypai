import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

export function ValuesSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <article
          aria-labelledby="about-values-heading"
          className="mx-auto max-w-4xl p-6 md:p-12"
        >
          <h2
            id="about-values-heading"
            className="font-heading text-balance text-2xl md:text-4xl lg:text-5xl"
          >
            What Guides Us
          </h2>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            We build from a simple belief: creative tools should feel calm,
            clear, and powerful. Instead of stacking complexity, we focus on the
            smallest set of capabilities that unlocks the biggest creative
            momentum.
          </p>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            That means putting creators first, using AI in practical ways,
            shipping improvements quickly, and maintaining trust through
            consistency. Every interface decision, workflow change, and product
            update is held to that standard.
          </p>

          <p className="mt-8 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            We choose practical AI over flashy complexity. We choose clarity
            over clutter. We choose velocity with craftsmanship. And we choose
            reliability as a baseline, not a premium feature. These are not
            slogans; they are constraints we build inside.
          </p>
        </article>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
