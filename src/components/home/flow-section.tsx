"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRightLeft,
  ArrowUp,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  CloudDownload,
  HardDriveDownload,
  History,
  Link2,
  ListChecks,
  Mail,
  Mic2,
  MonitorDown,
  Plug,
  Plus,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BounceSidebar } from "@/components/ui/bounce-sidebar";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { DecorIcon } from "@/components/home/decor-icon";
import { FullWidthDivider } from "@/components/home/full-width-divider";

type Highlight = { icon: LucideIcon; label: string };

const features = [
  {
    id: "workflow-agents",
    label: "Workflow agents",
    highlights: [
      { icon: ArrowRightLeft, label: "Automated handoff routing" },
      { icon: ListChecks, label: "Account playbooks" },
      { icon: Zap, label: "Follow-up task agents" },
    ],
  },
  {
    id: "alerts",
    label: "Alerts",
    highlights: [
      { icon: Bell, label: "Renewal reminders" },
      { icon: Clock, label: "Stalled deal signals" },
      { icon: Activity, label: "Quiet account alerts" },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    highlights: [
      { icon: History, label: "Full activity history" },
      { icon: Users, label: "Team-visible notes" },
      { icon: Mail, label: "Cross-channel threads" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    highlights: [
      { icon: Plug, label: "Gmail and Outlook sync" },
      { icon: Calendar, label: "Calendar availability" },
      { icon: Link2, label: "Billing and Stripe data" },
    ],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  highlights: readonly Highlight[];
}[];

type FeatureId = (typeof features)[number]["id"];

export function FlowSection() {
  const [activeId, setActiveId] = useState<FeatureId>(features[0].id);

  const scrollToFeature = (id: FeatureId) => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    setActiveId(id);
  };

  // Highlight the sidebar item for the feature closest to the viewport center
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [mostVisible] = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (mostVisible) setActiveId(mostVisible.target.id as FeatureId);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55, 0.75] },
    );

    for (const { id } of features) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative mb-24 lg:mb-48">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />
      <FullWidthDivider className="-top-px" />
      <FullWidthDivider className="-bottom-px" />

      <div className="p-4">
        <Reveal>
          <RevealItem>
            <h2 className="max-w-4xl text-4xl font-medium tracking-tight text-balance text-muted-foreground">
              <span className="text-foreground">
                Built for the full workflow.
              </span>{" "}
              <br /> One connected revenue product.
            </h2>
          </RevealItem>
        </Reveal>

        <div className="mt-16 grid gap-6 md:mt-32 lg:grid-cols-[auto_1fr]">
          <div className="sticky top-24 h-fit w-56 max-lg:hidden">
            <BounceSidebar
              dotColor="var(--foreground)"
              items={features.map(({ label }) => ({ label }))}
              value={features.findIndex(({ id }) => id === activeId)}
              onChange={(index) => scrollToFeature(features[index].id)}
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-32">
            <FeatureRow
              id="workflow-agents"
              lead="Seamless handoffs."
              illustration={<PaymentsIllustration />}
            >
              Email, chat, and support history stay on the account so nobody
              works from memory.
            </FeatureRow>

            <FeatureRow
              id="alerts"
              lead="Proactive alerts."
              illustration={<AIInputIllustration />}
            >
              Surface renewals, quiet accounts, and stalled deals before they
              slip past quarter end.
            </FeatureRow>

            <FeatureRow
              id="timeline"
              lead="Shared timeline."
              illustration={<DynamicIslandIllustration />}
            >
              Sales, success, and support work from one account view so{" "}
              <span className="rounded bg-emerald-500/10 px-1.5 text-emerald-500">
                every handoff keeps context
              </span>
              .
            </FeatureRow>

            <FeatureRow
              id="integrations"
              lead="Connected stack."
              illustration={<DownloadIllustration />}
              illustrationClassName="bg-zinc-100"
            >
              Sync email, calendar, and billing tools so customer data stays
              current across your workflow.
            </FeatureRow>
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureRowProps = {
  id: FeatureId;
  lead: string;
  illustration: React.ReactNode;
  illustrationClassName?: string;
  children: React.ReactNode;
};

/** Copy and illustration reveal as a staggered pair once the row scrolls into view. */
function FeatureRow({
  id,
  lead,
  illustration,
  illustrationClassName = "bg-foreground/2",
  children,
}: FeatureRowProps) {
  const feature = features.find((feature) => feature.id === id)!;

  return (
    <Reveal
      id={id}
      className="grid scroll-mt-32 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:gap-12"
    >
      <RevealItem className="flex flex-col justify-between pb-4 md:col-span-2">
        <div className="md:pr-6 lg:pr-0">
          <h3 className="mb-6 pt-1 text-sm font-medium text-muted-foreground">
            {feature.label}
          </h3>
          <p className="text-lg font-medium text-balance text-muted-foreground">
            <span className="text-foreground">{lead}</span> {children}
          </p>
        </div>
        <FeatureList items={feature.highlights} />
      </RevealItem>

      <RevealItem
        className={cn(
          "relative flex aspect-square rounded-3xl border border-border/50 p-3 md:col-span-3",
          illustrationClassName,
        )}
      >
        {illustration}
      </RevealItem>
    </Reveal>
  );
}

function FeatureList({ items }: { items: readonly Highlight[] }) {
  return (
    <ul className="mt-8 divide-y text-muted-foreground">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-3 py-3">
          <Icon className="size-4" />
          {label}
        </li>
      ))}
    </ul>
  );
}

function PaymentsIllustration() {
  return (
    <div
      aria-hidden
      className="relative m-auto aspect-76/59 max-w-sm rounded-2xl bg-linear-to-b from-zinc-300 to-transparent p-px dark:from-zinc-700"
    >
      <Image
        src="/payments.png"
        alt=""
        width={1207}
        height={929}
        className="hidden rounded-[15px] dark:block"
      />
    </div>
  );
}

function AIInputIllustration() {
  return (
    <div
      aria-hidden
      className="absolute inset-8 z-1 m-auto h-fit max-w-sm scale-95"
    >
      <div className="h-fit rounded-3xl bg-card p-3 shadow-xl ring shadow-black/15 ring-foreground/15">
        <div className="p-2 pb-3 text-sm text-muted-foreground">
          Ask Tailark what you need...
        </div>

        <div className="flex justify-between gap-3">
          <div className="flex items-center gap-1">
            <div className="flex size-7 cursor-pointer rounded-full transition-colors *:m-auto *:size-4 hover:bg-muted">
              <Plus />
            </div>
            <div className="flex size-7 cursor-pointer rounded-full transition-colors *:m-auto *:size-4 hover:bg-muted">
              <Mic2 />
            </div>
          </div>

          <div className="flex size-7 cursor-pointer rounded-full bg-foreground text-background transition-[filter] *:m-auto *:size-4 hover:brightness-110">
            <ArrowUp />
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicIslandIllustration() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-8 bottom-0 z-1 mx-auto h-2/3 w-10/12 max-w-96 origin-bottom scale-95 rounded-t-[4rem] border border-border/50 mask-b-from-background px-4 pt-4"
    >
      <div className="h-full overflow-hidden rounded-t-[3rem] bg-foreground/2 p-3 shadow-lg ring shadow-black/15 ring-foreground/10">
        <div className="relative rounded-[2.25rem] bg-card p-2 shadow-xl ring shadow-black/6.5 ring-foreground/10">
          <div className="flex gap-2">
            <div className="relative size-18 overflow-hidden rounded-[1.75rem] shadow-md before:absolute before:inset-0 before:rounded-[1.75rem] before:border before:border-black/20">
              <Image
                src="https://images.unsplash.com/photo-1782366951390-d6798e902db7?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                width={136}
                height={136}
              />
            </div>

            <div className="py-1 pr-4">
              <div className="text-sm font-medium">Théo Balick</div>
              <div className="mt-1.5 flex items-center gap-3">
                <div>
                  <div className="text-xs text-foreground/50">Expenses</div>
                  <div className="mt-0.5 text-sm font-semibold">$32.65k</div>
                </div>
                <div className="h-7 w-px bg-border" />
                <div>
                  <div className="text-xs text-foreground/50">Income</div>
                  <div className="mt-0.5 text-sm font-semibold">$2.65k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadIllustration() {
  return (
    <div aria-hidden className="absolute inset-0 z-1 m-auto size-fit scale-95">
      <Button
        asChild
        size="sm"
        variant="secondary"
        className="ml-1 bg-background/25 inset-ring inset-ring-foreground/25 backdrop-blur"
      >
        <div>
          <HardDriveDownload className="opacity-75" />
          <span className="border-r pr-2">Download</span>
          <ChevronDown className="opacity-50" />
        </div>
      </Button>

      <div className="mt-3 min-w-52 rounded-2xl bg-white p-1 shadow-xl ring shadow-black/6.5 ring-black/6.5 *:cursor-pointer">
        <div className="peer flex gap-2 rounded-xl px-3 py-1.5 transition-colors hover:bg-black/5">
          <MonitorDown className="size-4 translate-y-0.5 text-black" />
          <div className="space-y-0.5">
            <div className="text-xs font-medium text-black">Computer</div>
            <div className="text-xs text-black/50">16.1MB left</div>
          </div>
        </div>

        <div className="flex gap-2 rounded-xl px-3 py-1.5 transition-colors not-peer-hover:bg-black/5">
          <CloudDownload className="size-4 translate-y-0.5 text-black" />
          <div className="space-y-0.5">
            <div className="text-xs font-medium text-black">Cloud</div>
            <div className="text-xs text-black/50">Unlimited</div>
          </div>
        </div>
      </div>
    </div>
  );
}
