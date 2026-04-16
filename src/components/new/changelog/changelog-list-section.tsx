import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

type ChangelogEntry = {
  date: string;
  version: string;
  title: string;
  description: string;
  items: string[];
};

export function ChangelogListSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="overflow-hidden">
          <div className="divide-y">
            {entries.map((entry) => (
              <article
                className="px-6 py-8 md:px-8 md:py-10"
                key={entry.version}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
                    {entry.date}
                  </p>
                  <span className="rounded-full border px-2 py-0.5 text-foreground text-xs uppercase tracking-wider">
                    {entry.version}
                  </span>
                </div>

                <h3 className="mt-4 text-balance text-xl text-foreground md:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-3xl text-muted-foreground text-sm leading-7 md:text-base">
                  {entry.description}
                </p>

                <ul className="mt-5 space-y-2 text-muted-foreground text-sm leading-7 md:text-base">
                  {entry.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

const entries: ChangelogEntry[] = [
  {
    date: "Apr 14, 2026",
    version: "v0.9.0",
    title: "New Marketing Experience Rollout",
    description:
      "Introduced the new page system with cleaner layout architecture and more consistent section patterns across key routes.",
    items: [
      "Added new-style pricing, features, about, and manifesto pages",
      "Improved title/subheading readability across breakpoints",
      "Refined section border behavior to avoid overlap with page rails",
    ],
  },
  {
    date: "Apr 10, 2026",
    version: "v0.8.7",
    title: "Credits And Pricing Improvements",
    description:
      "Improved the credit top-up experience with better mobile behavior and clearer plan comparison details.",
    items: [
      "Enabled credits section rendering on mobile",
      "Adjusted slider/tick alignment for mobile and desktop",
      "Updated minimum credit logic for cleaner purchase steps",
    ],
  },
  {
    date: "Apr 05, 2026",
    version: "v0.8.2",
    title: "Core Workflow Stability",
    description:
      "Shipped reliability and UX fixes aimed at faster, more predictable clip production.",
    items: [
      "Reduced UI inconsistencies in new marketing components",
      "Improved section semantics for better accessibility and SEO",
      "Strengthened content structure for long-form editorial pages",
    ],
  },
];
