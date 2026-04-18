import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

export function ChangelogHighlightsSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <article
          aria-labelledby="changelog-highlights-heading"
          className="mx-auto max-w-4xl px-6 py-10 md:px-8 md:py-12"
        >
          <h2
            id="changelog-highlights-heading"
            className="font-heading text-balance text-2xl md:text-4xl lg:text-5xl"
          >
            Product Updates That Matter
          </h2>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            This changelog focuses on practical improvements that affect your
            real workflow. We ship for speed, clarity, and output quality,
            without burying you in noise.
          </p>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            Expect concise notes across features, performance, reliability, and
            creator experience so you can immediately understand what changed,
            why it changed, and how to use it.
          </p>
        </article>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
