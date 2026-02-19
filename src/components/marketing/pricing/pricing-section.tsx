"use client"

import Link from "next/link";

import { Check } from "lucide-react";

import { useQueryState } from "nuqs";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/marketing/pricing/card";

import { FrequencyToggle } from "@/components/marketing/pricing/frequency-toggle";

const plans = [
  {
    name: "Free",
    description: "Perfect for individuals and small projects.",
    monthly: 0,
    yearly: 0,
    features: [
      "Up to 3 integrations",
      "1,000 API calls/month",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing teams that need more power.",
    monthly: 29,
    yearly: 290,
    features: [
      "Unlimited integrations",
      "100,000 API calls/month",
      "Priority support",
      "Advanced analytics",
      "Custom webhooks",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

export function PricingSection() {
  const [frequency] = useQueryState("frequency");

  return (
    <section className="@container py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center hidden">
          <h2 className="text-balance text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance font-mono">
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>
        </div>
        <div className="flex justify-center">
          <FrequencyToggle />
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => {
            const price = frequency === "yearly" ? plan.yearly : plan.monthly;
            const period = frequency === "yearly" ? "/year" : "/month";

            return (
            <Card
              key={plan.name}
              variant={plan.highlighted ? "default" : "mixed"}
              className={cn(
                "relative flex flex-col p-6 bg-linear-to-br from-background to-card",
                plan.highlighted && "ring-primary",
              )}
            >
              <div>
                <h3 className="text-foreground font-mono text-start">{plan.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm text-start font-mono">
                  {plan.description}
                </p>
              </div>
              <div className="mt-6 text-start">
                <span className="font-serif text-4xl font-medium">
                  ${price}
                </span>
                <span className="text-muted-foreground">{period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-muted-foreground flex items-start gap-2 text-sm font-mono"
                  >
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.highlighted ? "default" : "outline"}
                className="mt-8 w-full"
              >
                <Link href="#link">{plan.cta}</Link>
              </Button>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}