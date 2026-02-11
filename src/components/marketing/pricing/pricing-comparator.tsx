import Link from "next/link";

import { Check, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/marketing/pricing/card";

const features = [
  { name: "Integrations", free: "5", pro: "Unlimited" },
  { name: "API Calls", free: "10K/mo", pro: "500K/mo" },
  { name: "Team Members", free: "2", pro: "20" },
  { name: "Support", free: "Email", pro: "Priority" },
  { name: "Analytics Dashboard", free: false, pro: true },
  { name: "Custom Webhooks", free: false, pro: true },
  { name: "Advanced Security", free: false, pro: true },
  { name: "API Access", free: false, pro: true },
];

export function PricingComparator() {

  return (
    <section className="@container py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
            Free vs. Pro
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance font-mono">
            See what you get with each plan.
          </p>
        </div>
        <Card
          variant="outline"
          className="@max-md:*:min-w-md mt-12 overflow-auto bg-linear-to-br from-background to-card"
        >
          <div className="grid grid-cols-3">
            <div className="p-4"></div>
            <div className="min-w-32 border-l p-4 text-center">
              <p className="text-foreground font-medium">Free</p>
              <p className="text-2xl font-medium">$0</p>
            </div>
            <div className="bg-primary/5 min-w-32 border-l p-4 text-center">
              <p className="text-foreground font-medium">Pro</p>
              <p className="text-2xl font-medium">$29</p>
            </div>
          </div>
          {features.map((feature) => (
            <div key={feature.name} className="grid grid-cols-3 border-t">
              <div className="text-muted-foreground p-4 text-sm font-mono text-start">
                {feature.name}
              </div>
              <div className="flex min-w-32 items-center justify-center border-l p-4 text-sm">
                {typeof feature.free === "boolean" ? (
                  feature.free ? (
                    <Check className="text-primary size-4" />
                  ) : (
                    <Minus className="text-muted-foreground/50 size-4" />
                  )
                ) : (
                  <span className="text-foreground font-mono">{feature.free}</span>
                )}
              </div>
              <div className="bg-primary/5 flex min-w-32 items-center justify-center border-l p-4 text-sm">
                {typeof feature.pro === "boolean" ? (
                  feature.pro ? (
                    <Check className="text-primary size-4" />
                  ) : (
                    <Minus className="text-muted-foreground/50 size-4" />
                  )
                ) : (
                  <span className="text-foreground font-mono">
                    {feature.pro}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-3 border-t">
            <div className="p-4"></div>
            <div className="min-w-32 border-l p-4">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="#link">Get Started</Link>
              </Button>
            </div>
            <div className="bg-primary/5 min-w-32 border-l p-4">
              <Button asChild size="sm" className="w-full">
                <Link href="#link">Upgrade</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}