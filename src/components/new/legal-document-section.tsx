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

type LegalDocumentItem = {
  title: string;
  description: string;
  points?: string[];
};

type LegalDocumentSectionProps = React.ComponentProps<"section"> & {
  title: string;
  description: string;
  updatedAt: string;
  items: LegalDocumentItem[];
  contactHref: string;
  contactLabel: string;
};

export function LegalDocumentSection({
  title,
  description,
  updatedAt,
  items,
  contactHref,
  contactLabel,
  className,
  ...props
}: LegalDocumentSectionProps) {
  return (
    <section
      className={cn(
        "mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-3xl text-center py-8">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          {description} Last updated: {updatedAt}.
        </p>
      </div>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="overflow-hidden border border-x-0">
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
            {items.map((item) => (
              <LegalItemCard item={item} key={item.title} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border border-x-0 border-t-0 bg-background p-4 md:flex-row md:items-center md:justify-between md:p-8">
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
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

function LegalItemCard({
  item,
  className,
  ...props
}: React.ComponentProps<"div"> & { item: LegalDocumentItem }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background p-4 md:p-8",
        className,
      )}
      {...props}
    >
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
      </div>
      <h3 className="mt-10 text-base md:text-md">{item.title}</h3>
      <p className="relative z-20 mt-2 text-muted-foreground text-sm">
        {item.description}
      </p>
      {item.points?.length ? (
        <ul className="mt-4 space-y-2">
          {item.points.map((point) => (
            <li className="flex items-start gap-2 text-sm" key={point}>
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
    </div>
  );
}

export type { LegalDocumentItem };
