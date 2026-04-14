import { cn } from "@/lib/utils";
import type React from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ZapIcon,
  CpuIcon,
  FingerPrintScanIcon,
  PencilIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export function FeatureSection() {
  return (
    <div className="mb-12 lg:mb-24 mx-auto w-full max-w-4xl border-t">
      <div className="mx-auto max-w-3xl text-center py-8">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          Power. Speed. Control.
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          Everything you need to build fast, secure, scalable apps.
        </p>
      </div>

      <div className="overflow-hidden border border-x-0">
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
      className={cn("relative overflow-hidden bg-background p-4", className)}
      {...props}
    >
      <div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/10"
          height={40}
          width={40}
          x={20}
        />
      </div>
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
        {feature.icon}
      </div>
      <h3 className="mt-10 text-base md:text-md font-medium">
        {feature.title}
      </h3>
      <p className="relative z-20 mt-2 text-muted-foreground text-sm">
        {feature.description}
      </p>
    </div>
  );
}

const features: FeatureType[] = [
  {
    title: "Faaast",
    icon: <HugeiconsIcon icon={ZapIcon} strokeWidth={2} />,
    description: "It supports an entire helping developers and innovate.",
  },
  {
    title: "Powerful",
    icon: <HugeiconsIcon icon={CpuIcon} strokeWidth={2} />,
    description: "It supports an entire helping developers and businesses.",
  },
  {
    title: "Security",
    icon: <HugeiconsIcon icon={FingerPrintScanIcon} strokeWidth={2} />,
    description: "It supports an helping developers businesses.",
  },
  {
    title: "Customization",
    icon: <HugeiconsIcon icon={PencilIcon} strokeWidth={2} />,
    description: "It supports helping developers and businesses innovate.",
  },
  {
    title: "Control",
    icon: <HugeiconsIcon icon={SlidersHorizontalIcon} strokeWidth={2} />,
    description: "It supports helping developers and businesses innovate.",
  },
  {
    title: "Built for AI",
    icon: <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} />,
    description: "It supports helping developers and businesses innovate.",
  },
];
