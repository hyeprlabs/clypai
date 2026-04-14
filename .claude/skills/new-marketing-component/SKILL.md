---
name: new-marketing-component
description: Create new marketing page sections and components for ClypAI that match the exact structure, styling, and patterns used in src/components/new/. Use when the user asks to add a new section, feature block, or marketing component to the landing page.
---

# New Marketing Component

Create components in `src/components/new/` that match the exact patterns from the existing marketing page. Follow every rule below without deviation.

---

## File Location & Naming

- Place in `src/components/new/<component-name>.tsx`
- Use kebab-case for filenames: `pricing-section.tsx`, `faq-section.tsx`
- Export named functions in PascalCase: `PricingSection`, `FaqSection`
- Add `"use client"` only when using React state, effects, or event listeners

---

## Required Import Order

```tsx
// 1. "use client" directive (if needed)
"use client";

// 2. cn utility (if using conditional/merged classes)
import { cn } from "@/lib/utils";

// 3. React (only if needed for types or hooks)
import type React from "react";
import React from "react"; // only for useState/useEffect

// 4. UI primitives
import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

// 5. New marketing components (Logo, MobileNav, etc.)
import { Logo } from "@/components/new/logo";

// 6. Icons — always both imports together
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, SomeOtherIcon } from "@hugeicons/core-free-icons";

// 7. Custom hooks
import { useScroll } from "@/hooks/use-scroll";
```

---

## Section Shell Pattern

Every section uses this exact outer structure:

```tsx
<section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
  {/* content */}
</section>
```

- `mb-12 lg:mb-24` — standard section bottom margin
- `max-w-4xl` — standard page column width
- `relative` — required for DecorIcons and absolute positioned children

---

## FullWidthDivider + DecorIcon Corner Pattern

Use this pattern to wrap a visually boxed content block:

```tsx
<div className="relative">
  <DecorIcon className="size-4" position="top-left" />
  <DecorIcon className="size-4" position="top-right" />
  <DecorIcon className="size-4" position="bottom-left" />
  <DecorIcon className="size-4" position="bottom-right" />
  <FullWidthDivider className="-top-px" />
  {/* content */}
  <FullWidthDivider className="-bottom-px" />
</div>
```

- Always use `size-4` on DecorIcons unless overriding for a specific reason
- `FullWidthDivider` needs `-top-px` / `-bottom-px` to align flush with borders
- The parent must be `relative`

---

## Section Heading Block

Standard heading + subtext for any section:

```tsx
<div className="mx-auto max-w-3xl text-center py-8">
  <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
    Section Title Here
  </h2>
  <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
    Supporting description text goes here.
  </p>
</div>
```

---

## Grid Card Pattern (Features, Integrations, etc.)

For multi-card grid sections:

```tsx
{/* Outer border via gap-px trick */}
<div className="overflow-hidden border border-x-0">
  <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
    {items.map((item) => (
      <ItemCard item={item} key={item.title} />
    ))}
  </div>
</div>
```

Card component:

```tsx
function ItemCard({
  item,
  className,
  ...props
}: React.ComponentProps<"div"> & { item: ItemType }) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-4", className)}
      {...props}
    >
      {/* icon */}
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
        {item.icon}
      </div>
      <h3 className="mt-10 text-base md:text-md">{item.title}</h3>
      <p className="relative z-20 mt-2 text-muted-foreground text-sm">
        {item.description}
      </p>
    </div>
  );
}
```

---

## TypeScript Data Type Pattern

Define types at the top of the file, data arrays at the **bottom**:

```tsx
// Type near top, above component
type ItemType = {
  title: string;
  description: string;
  icon: React.ReactNode;
  optional?: string;
};

// ... component code ...

// Data array at bottom of file
const items: ItemType[] = [
  {
    title: "Example",
    description: "Description text here.",
    icon: <HugeiconsIcon icon={SomeIcon} strokeWidth={2} />,
  },
];
```

For component props that extend HTML elements, use intersection types:

```tsx
type CardProps = React.ComponentProps<"div"> & {
  item: ItemType;
};
```

---

## HugeiconsIcon Usage

Always pass `strokeWidth={2}`. Use `data-icon` for Button inline icons:

```tsx
// Standalone icon
<HugeiconsIcon icon={ZapIcon} strokeWidth={2} />

// Icon with explicit sizing
<HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} className="size-4" />

// Icon inside Button (start)
<HugeiconsIcon icon={Call02Icon} strokeWidth={2} data-icon="inline-start" />

// Icon inside Button (end)
<HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} data-icon="inline-end" />

// Decorative / muted icon
<HugeiconsIcon
  icon={QuoteDownIcon}
  strokeWidth={2}
  aria-hidden="true"
  className="mb-4 size-12 stroke-1 text-muted-foreground"
/>
```

---

## cn() Usage Patterns

**Conditional object syntax** (for state-driven styles):

```tsx
className={cn("base-classes", { "conditional-class": booleanValue })}
```

**Multi-line class sets** (for readability):

```tsx
className={cn(
  "flex items-center gap-2",
  "animate-in fade-in slide-in-from-bottom-10",
  className, // always last to allow override
)}
```

**Conditional value** (for prop-driven styles):

```tsx
className={cn(
  "base",
  isInvertable && "dark:invert",
  className,
)}
```

---

## Animation Pattern (Staggered Entrance)

Apply to hero/above-fold elements only. Use increasing delay per element:

```tsx
// Badge / eyebrow
className={cn(
  "...",
  "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out",
)}

// H1
className={cn(
  "...",
  "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out",
)}

// Subtitle
className={cn(
  "...",
  "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out",
)}

// CTA buttons
className="fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards pt-2 delay-300 duration-500 ease-out"
```

---

## Dark Mode Patterns

| Pattern | When to use |
|---|---|
| `dark:invert` | Logo/icon images that need color flip |
| `dark:brightness-0 dark:invert` | Wordmark images (logos) |
| `dark:bg-secondary/30` | Secondary backgrounds in dark mode |
| `dark:hover:bg-muted/50` | Hover states in dark mode |
| `hidden dark:block` | Show only in dark mode |
| `dark:hidden` | Hide in dark mode |
| `dark:bg-[radial-gradient(...)]` | Decorative backgrounds |

---

## Color Tokens (Tailwind Design Tokens)

Only use semantic tokens, never raw colors:

| Token | Usage |
|---|---|
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary/helper text |
| `bg-background` | Page/card background |
| `bg-card` | Card surface |
| `bg-secondary` | Subtle section bg |
| `bg-border` / `border` | Dividers, grid gaps |
| `text-foreground/75` | Muted icon color |
| `stroke-foreground/10` | Subtle grid/pattern strokes |
| `bg-background/95` | Frosted/blur background |

---

## Typography Scale

```
text-xs       — labels, captions
text-sm       — body text, descriptions
text-base     — default paragraph
text-lg       — subheadings
text-2xl      — section titles (mobile)
text-4xl      — section titles (md)
text-5xl      — section titles (lg)
text-3xl      — hero (mobile)
text-5xl      — hero (md)
text-6xl      — hero (lg)
```

Font weights: `font-light`, `font-normal`, `font-medium`, `font-semibold`

Always use `text-balance` on headings and `tracking-tight` / `tracking-wider` where applicable.

---

## Responsive Spacing

- Section outer margin: `mb-12 lg:mb-24`
- Card padding: `p-4` (mobile), `md:p-8` (desktop)
- Section padding: `px-4 py-12 md:px-4 md:py-24 lg:py-28`
- Inner gaps: `gap-2`, `gap-4`, `gap-6`

---

## Button Patterns

```tsx
// Primary CTA
<Button>
  Get Started <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} data-icon="inline-end" />
</Button>

// Secondary CTA
<Button variant="outline">Contact Sales</Button>

// Ghost nav link (with asChild)
<Button asChild size="sm" variant="ghost">
  <a href={href}>{label}</a>
</Button>

// Icon button
<Button size="icon-sm" variant="outline">
  <HugeiconsIcon icon={SomeIcon} strokeWidth={2} />
</Button>
```

---

## Group Hover Animations

For interactive elements with child icon motion:

```tsx
<a className="group ...">
  <HugeiconsIcon
    className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5"
    icon={ArrowRight02Icon}
    strokeWidth={2}
  />
</a>
```

---

## Pseudo-element Decorative Borders

For vertical side borders spanning the full page column (used in `<main>`):

```tsx
className={cn(
  "relative mx-auto max-w-4xl",
  "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
  "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
)}
```

---

## Full Section Example (Pricing)

```tsx
import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export function PricingSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="mx-auto max-w-3xl text-center py-8">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          Choose the plan that fits your workflow.
        </p>
      </div>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  className,
  ...props
}: React.ComponentProps<"div"> & { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 bg-background p-6",
        plan.highlighted && "bg-card",
        className,
      )}
      {...props}
    >
      <div>
        <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
        <p className="mt-1 text-3xl font-semibold text-foreground">{plan.price}</p>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {plan.features.map((f) => (
          <li className="flex items-center gap-2 text-sm" key={f}>
            <HugeiconsIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-foreground/75"
              icon={CheckmarkCircle02Icon}
              strokeWidth={2}
            />
            {f}
          </li>
        ))}
      </ul>
      <Button className="mt-auto w-full" variant={plan.highlighted ? "default" : "outline"}>
        {plan.cta}
      </Button>
    </div>
  );
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for getting started.",
    features: ["5 projects", "Basic analytics", "Email support"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$29/mo",
    description: "For growing teams.",
    features: ["Unlimited projects", "Advanced analytics", "Priority support"],
    cta: "Get started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations.",
    features: ["Custom limits", "SLA guarantee", "Dedicated support"],
    cta: "Contact sales",
  },
];
```

---

## Checklist Before Finishing

- [ ] Section uses `mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl`
- [ ] Data arrays defined at the **bottom** of the file
- [ ] All icons use `strokeWidth={2}`
- [ ] `cn()` imported if any conditional/merged classes are used
- [ ] No raw hex colors — only semantic tokens
- [ ] Dark mode handled where relevant (`dark:invert`, `dark:hidden`, etc.)
- [ ] Component accepts `className` and `...props` if it renders a single root HTML element
- [ ] `"use client"` only if using React state/effects/event handlers
