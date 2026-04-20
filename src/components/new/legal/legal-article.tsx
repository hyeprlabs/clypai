import { cn } from "@/lib/utils";
import type React from "react";
import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

type LegalArticleItem = {
  title: string;
  description: string;
  points?: string[];
};

type LegalArticleProps = React.ComponentProps<"article"> & {
  title: string;
  description: string;
  updatedAt: string;
  items: LegalArticleItem[];
  contactHref: string;
  contactLabel: string;
};

export function LegalArticle({
  title,
  description,
  updatedAt,
  items,
  contactHref,
  contactLabel,
  className,
  ...props
}: LegalArticleProps) {
  return (
    <article
      className={cn(
        "mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl",
        className,
      )}
      {...props}
    >
      <header className="mx-auto max-w-3xl text-center py-8">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          {description} Last updated: {updatedAt}.
        </p>
      </header>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="overflow-hidden border border-x-0 bg-background">
          {items.map((item, index) => (
            <LegalItemSection
              className={cn(index > 0 && "border-t")}
              item={item}
              key={item.title}
            />
          ))}
        </div>

        <section className="flex flex-col gap-4 border border-x-0 border-t-0 bg-background p-4 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="text-muted-foreground text-sm md:text-base">
            Questions about this document? Reach out to our team.
          </p>
          <Button asChild variant="outline">
            <a href={contactHref}>
              {contactLabel}
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                strokeWidth={2}
                data-icon="inline-end"
              />
            </a>
          </Button>
        </section>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </article>
  );
}

function LegalItemSection({
  item,
  className,
  ...props
}: React.ComponentProps<"section"> & { item: LegalArticleItem }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background p-4 md:p-8",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <HugeiconsIcon
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-foreground/75"
          icon={CheckmarkCircle02Icon}
          strokeWidth={2}
        />
        <h3 className="text-base md:text-md">{item.title}</h3>
      </div>

      <p className="relative z-20 mt-4 max-w-3xl text-muted-foreground text-sm md:text-base">
        {item.description}
      </p>
      {item.points?.length ? (
        <ul className="mt-4 space-y-2">
          {item.points.map((point) => (
            <li
              className="flex items-start gap-2 text-sm md:text-base"
              key={point}
            >
              <HugeiconsIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-foreground/75"
                icon={CheckmarkCircle02Icon}
                strokeWidth={2}
              />
              <span className="text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export type { LegalArticleItem };
