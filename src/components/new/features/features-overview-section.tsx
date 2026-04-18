import type React from "react";
import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ZapIcon,
  CpuIcon,
  FingerPrintScanIcon,
  PencilIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type FeatureCardProps = React.ComponentProps<"div"> & {
  item: FeatureItem;
};

function FeatureCard({ item, className, ...props }: FeatureCardProps) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-5", className)}
      {...props}
    >
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
        {item.icon}
      </div>
      <h3 className="mt-8 text-base md:text-md">{item.title}</h3>
      <p className="mt-2 text-muted-foreground text-sm">{item.description}</p>
    </div>
  );
}

export function FeaturesOverviewSection() {
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
            Built For Modern Creators
          </h2>
          <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
            Every feature is designed to remove friction between recording,
            editing, and publishing.
          </p>
        </div>

        <div className="overflow-hidden border-x-0 border-t">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
            {featureItems.map((item) => (
              <FeatureCard item={item} key={item.title} />
            ))}
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

const featureItems: FeatureItem[] = [
  {
    title: "Auto-clip Intelligence",
    description:
      "Find your strongest moments in long-form videos and turn them into short-form clips in minutes.",
    icon: <HugeiconsIcon icon={ZapIcon} strokeWidth={2} />,
  },
  {
    title: "AI Caption Engine",
    description:
      "Generate timed captions that stay readable, accurate, and platform-ready across formats.",
    icon: <HugeiconsIcon icon={CpuIcon} strokeWidth={2} />,
  },
  {
    title: "Frame Recomposition",
    description:
      "Adapt horizontal footage for vertical feeds while keeping the speaker and action centered.",
    icon: <HugeiconsIcon icon={FingerPrintScanIcon} strokeWidth={2} />,
  },
  {
    title: "Brand Presets",
    description:
      "Save reusable colors, fonts, and styling presets so every export stays visually consistent.",
    icon: <HugeiconsIcon icon={PencilIcon} strokeWidth={2} />,
  },
  {
    title: "Publishing Controls",
    description:
      "Manage output quality, pacing, and visual density with creator-first controls that stay simple.",
    icon: <HugeiconsIcon icon={SlidersHorizontalIcon} strokeWidth={2} />,
  },
  {
    title: "AI Workflow Assist",
    description:
      "Chain repetitive steps into a faster production loop so your team can ship more with less effort.",
    icon: <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} />,
  },
];
