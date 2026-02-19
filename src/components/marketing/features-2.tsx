import { cn } from "@/lib/utils";

import type React from "react";

import { GridPattern } from "@/components/ui/grid-pattern";

import {
  IconBolt,
  IconCpu,
  IconFingerprint,
  IconPencil,
  IconAdjustmentsHorizontal,
  IconSparkles,
} from "@tabler/icons-react";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export function Features() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 my-24">
      <div className="mx-auto max-w-md text-balance text-center">
        <h2 className="font-serif text-4xl">
          Your Shortcut to the Feed.
        </h2>
        <p className="text-muted-foreground mb-6 mt-4 text-balance font-mono text-sm">
          Transform long-form depth into short-form impact instantly. Stop scrubbing, start trending.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  feature: FeatureType;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-6", className)}
      {...props}
    >
      <div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/20"
          height={40}
          width={40}
          x={20}
        />
      </div>
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
        {feature.icon}
      </div>
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 text-muted-foreground text-sm">
        {feature.description}
      </p>
    </div>
  );
}

const features: FeatureType[] = [
  {
    title: "Instant Clips",
    icon: <IconBolt />,
    description:
      "Identify hooks and extract viral potential without scrubbing through hours of footage.",
  },
  {
    title: "Massive Scale",
    icon: <IconCpu />,
    description:
      "Turn a single podcast or stream into a week's worth of engaging social media posts.",
  },
  {
    title: "Creator Focus",
    icon: <IconFingerprint />,
    description:
      "Remove the grind of editing so you can focus on storytelling and making your voice heard.",
  },
  {
    title: "Auto-Captions",
    icon: <IconPencil />,
    description:
      "Generate perfect subtitles automatically. No more typing, syncing, or manual transcription.",
  },
  {
    title: "Smart Reframing",
    icon: <IconAdjustmentsHorizontal />,
    description:
      "Automatically reframe your landscape video for vertical screens like TikTok and Reels.",
  },
  {
    title: "AI Curation",
    icon: <IconSparkles />,
    description:
      "Let advanced AI models find the hidden gold nuggets and punchlines in your content.",
  },
];
