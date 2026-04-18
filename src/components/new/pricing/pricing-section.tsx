import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  href?: string;
  featuresTitle: string;
  features: string[];
  isPopular?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "FREE",
    price: "Free",
    description: "For creators just getting started",
    featuresTitle: "FREE, FOREVER:",
    features: [
      "50 credits / month (fixed)",
      "No credit top-ups available",
      "3 projects",
      "10 exports / month",
      "720p export quality",
      "Auto-clipping",
    ],
    href: "#",
  },
  {
    name: "PRO",
    isPopular: true,
    href: "#",
    price: "$8",
    period: "month",
    description: "For creators scaling their content",
    featuresTitle: "EVERYTHING IN FREE, PLUS:",
    features: [
      "500 credits / month included",
      "Buy additional credits anytime",
      "Unlimited projects & exports",
      "4K export quality",
      "Auto-captions & highlights",
      "Brand kits & watermarks",
      "5 team members",
      "Social publishing",
      "Priority support",
    ],
  },
];

export function PricingSection() {
  return (
    <section className="mx-auto w-full max-w-4xl place-content-center">
      <div className="relative">
        <FullWidthDivider position="top" />
        <FullWidthDivider position="bottom" />

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col bg-background p-4 md:col-span-2">
            <p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
              PRICING
            </p>
            <h1 className="font-heading text-3xl leading-tight md:text-5xl">
              Pricing that doesn't suck
            </h1>
          </div>

          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className="flex flex-col bg-background *:p-4">
      <div className="border-b">
        <p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
          {plan.name}
        </p>
        <div className="mb-2 flex items-baseline gap-2">
          <h2 className="font-bold text-4xl">{plan.price}</h2>
          {plan.period && (
            <span className="text-muted-foreground text-xs">
              / {plan.period}
            </span>
          )}
        </div>
        <p className="mb-8 line-clamp-1 text-muted-foreground">
          {plan.description}
        </p>

        <Button
          asChild
          className="w-full"
          variant={plan.isPopular ? "default" : "outline"}
        >
          <a href={plan.href}>Get started</a>
        </Button>
      </div>

      <div className="space-y-3 text-muted-foreground text-sm">
        <p className="mb-6 text-xs uppercase">{plan.featuresTitle}</p>

        {plan.features.map((feature) => (
          <p
            className="flex items-center gap-2 text-foreground/80"
            key={feature}
          >
            <HugeiconsIcon
              icon={Tick02Icon}
              strokeWidth={2}
              className="size-4"
            />
            {feature}
          </p>
        ))}
      </div>
    </div>
  );
}
