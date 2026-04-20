import { cn } from "@/lib/utils";
import type React from "react";
import { LegalTabs } from "@/components/new/legal/legal-tabs";

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
      <LegalTabs />

      <header className="mx-auto max-w-3xl text-center py-6 md:py-8">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          {description} Last updated: {updatedAt}.
        </p>
      </header>

      <section className="mx-auto max-w-3xl space-y-8 px-2 pb-8 md:space-y-10 md:px-0">
        {items.map((item) => (
          <LegalItemSection item={item} key={item.title} />
        ))}

        <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
          For legal inquiries, contact us at{" "}
          <a className="underline underline-offset-2" href={contactHref}>
            {contactLabel}
          </a>
          .
        </p>
      </section>
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
