import { cn } from "@/lib/utils";
import type React from "react";
import { LegalTabs } from "@/components/new/legal/legal-tabs";
import { Contact } from "@/components/new/contact";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

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
};

export function LegalArticle({
  title,
  description,
  updatedAt,
  items,
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
      <header className="mx-auto max-w-3xl px-2 py-6 text-left md:py-8">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-sm md:text-base">
          {description} Last updated: {updatedAt}.
        </p>

        <LegalTabs className="mt-5" />
      </header>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <section className="mx-auto max-w-3xl space-y-8 px-2 py-6 md:space-y-10 md:py-8">
          {items.map((item) => (
            <LegalItemSection item={item} key={item.title} />
          ))}
        </section>

        <FullWidthDivider className="-bottom-px" />
      </div>

      <Contact />
    </article>
  );
}

function LegalItemSection({
  item,
  ...props
}: React.ComponentProps<"section"> & { item: LegalArticleItem }) {
  return (
    <section className="text-foreground" {...props}>
      <h3 className="text-lg font-medium tracking-tight md:text-xl">
        {item.title}
      </h3>

      <p className="mt-3 text-muted-foreground text-sm leading-relaxed md:text-base">
        {item.description}
      </p>
      {item.points?.length ? (
        <ol className="mt-3 space-y-2 pl-6 text-muted-foreground text-sm leading-relaxed list-decimal md:text-base">
          {item.points.map((point, index) => (
            <li key={`${item.title}-${index}`}>{point}</li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export type { LegalArticleItem };
