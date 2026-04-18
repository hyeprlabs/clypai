import { cn } from "@/lib/utils";
import React from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  Cancel01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

type PlanValue =
  | { type: "check" }
  | { type: "cross" }
  | { type: "text"; value: string };

type FeatureRow = {
  label: string;
  hint?: string;
  free: PlanValue;
  pro: PlanValue;
};

type FeatureCategory = {
  category: string;
  rows: FeatureRow[];
};

function PlanCell({ value }: { value: PlanValue }) {
  if (value.type === "check") {
    return (
      <HugeiconsIcon
        aria-label="Included"
        className="mx-auto size-4 text-foreground/80"
        icon={Tick02Icon}
        strokeWidth={2}
      />
    );
  }
  if (value.type === "cross") {
    return (
      <HugeiconsIcon
        aria-label="Not included"
        className="mx-auto size-4 text-muted-foreground/50"
        icon={Cancel01Icon}
        strokeWidth={2}
      />
    );
  }
  return (
    <span className="text-sm font-medium text-foreground">{value.value}</span>
  );
}

export function PricingTable({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("relative mx-auto w-full max-w-4xl", className)}
      {...props}
    >
      <div className="mx-auto max-w-3xl text-center py-6 lg:py-12">
        <h2 className="font-heading text-balance text-2xl md:text-4xl lg:text-5xl">
          Compare plans
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          A full breakdown of what&apos;s included in each plan.
        </p>
      </div>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <Table className="[&_th]:whitespace-normal [&_td]:whitespace-normal">
          {/* Plan header */}
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b *:border-border [&>:not(:first-child)]:border-l">
              <TableHead className="w-1/2 py-4 pl-4" />
              {plans.map((plan) => (
                <TableHead key={plan.key} className="w-1/4 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-muted-foreground text-sm uppercase tracking-wider font-normal">
                      {plan.name}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {featureCategories.map((category) => (
              <React.Fragment key={category.category}>
                {/* Category row */}
                <TableRow className="hover:bg-transparent border-b bg-muted/30">
                  <TableCell
                    colSpan={3}
                    className="py-2 pl-4 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {category.category}
                  </TableCell>
                </TableRow>

                {/* Feature rows */}
                {category.rows.map((row) => (
                  <TableRow
                    key={row.label}
                    className="*:border-border [&>:not(:first-child)]:border-l"
                  >
                    <TableCell className="py-3 pl-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-foreground/90">
                          {row.label}
                        </span>
                        {row.hint && (
                          <span
                            title={row.hint}
                            className="cursor-help text-muted-foreground/50"
                          >
                            <HugeiconsIcon
                              icon={InformationCircleIcon}
                              strokeWidth={2}
                              className="size-3.5"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{row.hint}</span>
                          </span>
                        )}
                      </div>
                    </TableCell>
                    {plans.map((plan) => (
                      <TableCell
                        key={plan.key}
                        className={cn(
                          "py-3 text-center",
                          plan.highlighted && "bg-muted/20",
                        )}
                      >
                        <PlanCell
                          value={row[plan.key as keyof FeatureRow] as PlanValue}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const plans: {
  key: "free" | "pro";
  name: string;
  price?: string;
  period?: string;
  highlighted: boolean;
}[] = [
  { key: "free", name: "FREE", highlighted: false },
  { key: "pro", name: "PRO", price: "$8", period: "month", highlighted: true },
];

const featureCategories: FeatureCategory[] = [
  {
    category: "Credits",
    rows: [
      {
        label: "Included credits / month",
        hint: "Credits are consumed by every AI action",
        free: { type: "text", value: "50" },
        pro: { type: "text", value: "500" },
      },
      {
        label: "Credits are fixed (no top-ups)",
        free: { type: "check" },
        pro: { type: "cross" },
      },
      {
        label: "Buy additional credits",
        free: { type: "cross" },
        pro: { type: "check" },
      },
      {
        label: "Additional credit rate",
        hint: "Cost per credit pack on top of your plan",
        free: { type: "text", value: "—" },
        pro: { type: "text", value: "$5 / 250cr" },
      },
    ],
  },
  {
    category: "Usage",
    rows: [
      {
        label: "Projects",
        free: { type: "text", value: "3" },
        pro: { type: "text", value: "Unlimited" },
      },
      {
        label: "Exports / month",
        free: { type: "text", value: "10" },
        pro: { type: "text", value: "Unlimited" },
      },
      {
        label: "Max video length",
        free: { type: "text", value: "10 min" },
        pro: { type: "text", value: "3 hours" },
      },
      {
        label: "Video storage",
        free: { type: "text", value: "2 GB" },
        pro: { type: "text", value: "50 GB" },
      },
    ],
  },
  {
    category: "AI Features",
    rows: [
      {
        label: "Auto-clipping",
        free: { type: "check" },
        pro: { type: "check" },
      },
      {
        label: "Auto-captions",
        free: { type: "cross" },
        pro: { type: "check" },
      },
      {
        label: "Highlight detection",
        free: { type: "cross" },
        pro: { type: "check" },
      },
      {
        label: "Export quality",
        free: { type: "text", value: "720p" },
        pro: { type: "text", value: "4K" },
      },
    ],
  },
  {
    category: "Branding & Collaboration",
    rows: [
      {
        label: "Brand kits",
        hint: "Upload logos, colors, and fonts for consistent exports",
        free: { type: "cross" },
        pro: { type: "text", value: "3" },
      },
      {
        label: "Custom watermarks",
        free: { type: "cross" },
        pro: { type: "check" },
      },
      {
        label: "Team members",
        free: { type: "text", value: "1" },
        pro: { type: "text", value: "5" },
      },
    ],
  },
  {
    category: "Integrations",
    rows: [
      {
        label: "Social publishing",
        hint: "Direct publish to YouTube, TikTok, Instagram",
        free: { type: "cross" },
        pro: { type: "check" },
      },
      {
        label: "API access",
        free: { type: "cross" },
        pro: { type: "cross" },
      },
    ],
  },
  {
    category: "Support",
    rows: [
      {
        label: "Email support",
        free: { type: "check" },
        pro: { type: "check" },
      },
      {
        label: "Priority support",
        free: { type: "cross" },
        pro: { type: "check" },
      },
    ],
  },
];
