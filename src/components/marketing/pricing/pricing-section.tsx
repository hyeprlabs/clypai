"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FrequencyToggle } from "@/components/marketing/pricing/frequency-toggle";
import { CheckCircle } from "lucide-react";

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfect for editing individual videos",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "5 videos per month",
      "720p HD exports",
      "Basic analytics dashboard",
      "1 GB cloud storage",
      "Community support",
      "Standard templates"
    ],
  },
  {
    name: "Pro",
    description: "For professional creators and teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Unlimited videos",
      "4K Ultra HD exports",
      "Advanced analytics & insights",
      "100 GB cloud storage",
      "Custom branding & watermarks",
      "Priority email support",
      "Premium templates library",
      "Team workspace (up to 3)"
    ],
    popular: true,
  },
  {
    name: "Business",
    description: "For agencies and large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Pro",
      "Unlimited cloud storage",
      "24/7 Priority live support",
      "SSO & SAML integration",
      "Advanced team collaboration",
      "Dedicated account manager",
      "Custom contracts & invoicing",
      "API access & webhooks"
    ],
  },
];

export function PricingSection() {
  return (
    <section className="container my-20 gap-y-12 flex flex-col items-center">
      <FrequencyToggle />
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-6xl border border-dashed divide-y lg:divide-y-0 lg:divide-x divide-dashed divide-border/60">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const [frequency] = useQueryState("frequency");
  const isYearly = frequency === "yearly";
  const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div className="flex flex-col justify-between p-6 md:p-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-semibold">{plan.name}</span>
          {plan.popular && (
            <Badge className="rounded-full bg-blue-500 hover:bg-blue-600 border-none text-white">
              Popular
            </Badge>
          )}
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <span className="text-4xl font-bold">{displayPrice} €</span>
          <span className="text-muted-foreground text-sm">
            /{isYearly ? "year" : "month"}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-8 items-start flex">
          {plan.description}
        </p>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature: string, i: number) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={plan.popular ? "default" : "outline"}
        className="w-full rounded-full"
      >
        {plan.monthlyPrice === 0 ? "Get Started" : "Upgrade"}
      </Button>
    </div>
  );
}