import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

export function FeaturesWorkflowSection() {
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
            From Upload To Publish
          </h2>
          <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
            A clean three-step flow to move from raw footage to platform-ready
            clips.
          </p>
        </div>

        <div className="overflow-hidden border-x-0 border-t">
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <article className="bg-background p-6" key={step.title}>
                <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  Step {index + 1}
                </p>
                <h3 className="mt-4 text-lg text-foreground">{step.title}</h3>
                <p className="mt-3 text-muted-foreground text-sm leading-6">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

const workflowSteps = [
  {
    title: "Upload Long-Form Content",
    description:
      "Bring in podcasts, interviews, streams, or webinars from your existing workflow without extra setup.",
  },
  {
    title: "Generate Smart Cuts",
    description:
      "Let ClypAI identify hooks, highlights, and high-retention moments, then refine the results in one place.",
  },
  {
    title: "Export And Distribute",
    description:
      "Ship polished clips with captions and consistent styling, ready for TikTok, Reels, Shorts, and more.",
  },
] as const;
