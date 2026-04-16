import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

export function ChangelogNoteSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <article
          aria-labelledby="changelog-note-heading"
          className="mx-auto max-w-3xl px-6 py-10 md:px-8 md:py-12"
        >
          <h2
            id="changelog-note-heading"
            className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl"
          >
            Release Philosophy
          </h2>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            We prefer steady shipping over occasional big drops. Most updates
            focus on reducing friction for creators, improving render quality,
            and keeping the workflow fast under real production pressure.
          </p>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            If an update changes behavior, we document it clearly here. If an
            update makes something simpler, we keep the note concise and let the
            product speak for itself.
          </p>
        </article>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
