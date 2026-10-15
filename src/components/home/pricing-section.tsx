"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { DecorIcon } from "@/components/home/decor-icon";
import { FullWidthDivider } from "@/components/home/full-width-divider";
import {
  FrequencyToggle,
  type Frequency,
} from "@/components/home/frequency-toggle";

export function PricingSection() {
  const [frequency, setFrequency] = useState<Frequency>("monthly");

  return (
    <section className="relative mb-24 lg:mb-48">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />
      <FullWidthDivider className="-top-px" />
      <FullWidthDivider className="-bottom-px" />

      <Reveal className="flex flex-col items-start gap-6 p-4">
        <RevealItem>
          <h2 className="max-w-4xl text-4xl font-medium tracking-tight text-balance text-muted-foreground">
            <span className="text-foreground">Simple pricing.</span> <br />{" "}
            Scale as you grow.
          </h2>
        </RevealItem>
        <RevealItem>
          <FrequencyToggle value={frequency} onValueChange={setFrequency} />
        </RevealItem>
      </Reveal>

      <div className="relative mt-16 md:mt-32">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <FullWidthDivider className="-top-px" />

        <Reveal className="grid max-lg:divide-y lg:grid-cols-3 lg:divide-x">
          <PlanCard
            name="Starter"
            image="/pricing-clypai-1.png"
            description="For creators getting started"
            monthly={9.5}
            yearly={7.6}
            frequency={frequency}
            features={[
              "150 upload minutes / month",
              "AI clip detection",
              "Auto captions in 20+ languages",
              "1080p exports without watermark",
              "1 brand kit",
            ]}
          />

          <PlanCard
            popular
            name="Pro"
            image="/pricing-clypai-2.png"
            description="For creators posting daily"
            monthly={29.5}
            yearly={23.6}
            frequency={frequency}
            features={[
              "Everything in Starter",
              "600 upload minutes / month",
              "Viral score ranking",
              "Custom caption styles",
              "4K exports",
              "5 brand kits",
              "Auto-post to social channels",
              "Priority processing",
            ]}
          />

          <PlanCard
            name="Business"
            image="/pricing-clypai-3.png"
            description="For agencies and teams"
            monthly={79.5}
            yearly={63.6}
            frequency={frequency}
            features={[
              "Everything in Pro",
              "2,000 upload minutes / month",
              "5 team seats",
              "Unlimited brand kits",
              "Shared workspaces",
              "API access",
              "Priority support",
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}

type PlanCardProps = {
  name: string;
  image: string;
  description: string;
  monthly: number;
  yearly: number;
  frequency: Frequency;
  features: string[];
  popular?: boolean;
};

function PlanCard({
  name,
  image,
  description,
  monthly,
  yearly,
  frequency,
  features,
  popular = false,
}: PlanCardProps) {
  const price = frequency === "yearly" ? yearly : monthly;

  return (
    <RevealItem
      className={cn(
        "flex flex-col gap-8 p-6",
        popular && "bg-secondary dark:bg-secondary/30",
      )}
    >
      <div className="-mx-4 -mt-4 rounded-xl border p-1">
        <div className="relative isolate flex aspect-video flex-col justify-end overflow-hidden rounded-xl p-4 text-white after:absolute after:inset-0 after:rounded-xl after:inset-shadow-sm after:inset-ring after:inset-ring-black/5">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="-z-1 scale-105 object-cover blur-sm"
          />
          <div className="absolute inset-0 -z-1 bg-linear-to-t from-black/60 via-black/20 via-25% to-transparent to-60%" />
          <h3 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            {name}
            {popular && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                Popular
              </span>
            )}
          </h3>
          <p className="text-lg font-medium text-white/80">{description}</p>
        </div>
      </div>

      <div>
        <p className="text-4xl font-medium tracking-tight">
          <AnimatedCounter
            value={price}
            decimals={2}
            separator="."
            decimalSeparator=","
            prefix="€"
          />{" "}
          <span className="text-lg text-muted-foreground">/month</span>
        </p>
        <p
          aria-hidden={frequency === "monthly"}
          className={cn(
            "mb-8 text-sm text-muted-foreground transition-opacity duration-200 ease-out-strong",
            frequency === "monthly" && "opacity-0",
          )}
        >
          Billed yearly
        </p>

        <Button
          asChild
          variant={popular ? "default" : "outline"}
          className="w-full"
        >
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>

      <ul className="space-y-3 text-muted-foreground">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="size-3 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
    </RevealItem>
  );
}
