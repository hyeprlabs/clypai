"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, MinusSignIcon } from "@hugeicons/core-free-icons";

const STEP = 250;
const MIN = 1000;
const MAX = 5000;
const PRICE_PER_500 = 8;

const TICK_STEP = STEP / 2;
const ticks = Array.from(
  { length: (MAX - MIN) / TICK_STEP + 1 },
  (_, i) => MIN + i * TICK_STEP,
);

function tickHeight(val: number): string {
  if (val % 1000 === 0) return "h-3";
  if (val % 500 === 0) return "h-2";
  if (val % 250 === 0) return "h-1.5";
  return "h-1";
}

function formatCredits(n: number) {
  if (n >= 1000) return `${n / 1000}k`;
  return String(n);
}

export function CreditsSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [credits, setCredits] = useState(MIN);
  const price = (credits / 500) * PRICE_PER_500;

  function decrease() {
    setCredits((c) => Math.max(MIN, c - STEP));
  }
  function increase() {
    setCredits((c) => Math.min(MAX, c + STEP));
  }

  return (
    <section
      className={cn(
        "mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-3xl text-center py-6 lg:py-12">
        <h2 className="font-heading text-balance text-2xl md:text-4xl lg:text-5xl">
          Top up your credits
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          Buy extra credits whenever you need them. No subscription required.
        </p>
      </div>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="p-4 lg:px-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Credits
              </p>
              <p className="text-3xl font-bold tabular-nums text-foreground">
                {credits.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Price
              </p>
              <p className="text-3xl font-bold tabular-nums text-foreground">
                {`€${price}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              aria-label="Decrease credits"
              className="hidden size-8 shrink-0 sm:inline-flex"
              disabled={credits === MIN}
              size="icon"
              variant="outline"
              onClick={decrease}
            >
              <HugeiconsIcon
                icon={MinusSignIcon}
                strokeWidth={2}
                className="size-4"
              />
            </Button>

            <Slider
              aria-label="Credit amount"
              className={cn(
                "grow",
                "**:data-[slot=slider-range]:bg-foreground",
                "**:data-[slot=slider-thumb]:shadow-none",
                "**:data-[slot=slider-thumb]:h-5",
                "**:data-[slot=slider-thumb]:w-2.5",
                "**:data-[slot=slider-thumb]:rounded-sm",
                "**:data-[slot=slider-thumb]:border-[3px]",
                "**:data-[slot=slider-thumb]:border-background",
                "**:data-[slot=slider-thumb]:bg-foreground",
                "**:data-[slot=slider-thumb]:ring-offset-0",
              )}
              max={MAX}
              min={MIN}
              step={STEP}
              value={[credits]}
              onValueChange={([v]) => setCredits(v)}
            />

            <Button
              aria-label="Increase credits"
              className="hidden size-8 shrink-0 sm:inline-flex"
              disabled={credits === MAX}
              size="icon"
              variant="outline"
              onClick={increase}
            >
              <HugeiconsIcon
                icon={Add01Icon}
                strokeWidth={2}
                className="size-4"
              />
            </Button>
          </div>

          <span
            aria-hidden="true"
            className="mt-2.5 px-1 sm:px-13 flex w-full items-center justify-between gap-1 text-xs font-medium text-muted-foreground"
          >
            {ticks.map((val) => (
              <span
                key={val}
                className="flex w-0 flex-col items-center justify-center gap-2"
              >
                <span
                  className={cn("w-px bg-muted-foreground/70", tickHeight(val))}
                />
                <span className={cn(val % 1000 !== 0 && "opacity-0")}>
                  {formatCredits(val)}
                </span>
              </span>
            ))}
          </span>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
