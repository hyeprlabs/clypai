"use client";
import { cn } from "@/lib/utils";
import { name } from "@/lib/constants";

import React from "react";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, SearchSlashIcon } from "lucide-react";

export function FaqsSection() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "getting-started", label: "Getting Started" },
    { id: "features", label: "Features" },
    { id: "billing", label: "Billing" },
    { id: "support", label: "Support" },
  ];

  const filtered = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mb-12 lg:mb-24 mx-auto w-full max-w-3xl md:border-x">
      <FullWidthDivider contained />

      <div className="px-4 py-16 lg:px-6">
        <h1 className="font-heading mb-4 text-3xl md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Find answers to common questions about {name}. Can't find what you're
          looking for? Our support team is here to help.
        </p>

        <InputGroup className="max-w-sm">
          <InputGroupInput
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs..."
            value={searchTerm}
          />
          <InputGroupAddon>
            <SearchIcon data-icon="inline-start" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <FullWidthDivider contained />

      <div className="flex flex-wrap gap-1 border-b px-4 md:gap-3">
        {categories.map((cat) => (
          <button
            className="flex flex-col"
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            type="button"
          >
            <span
              className={cn(
                "p-1 text-muted-foreground text-sm hover:text-primary md:p-2 md:text-base",
                activeCategory === cat.id && "text-primary",
              )}
            >
              {cat.label}
            </span>
            {activeCategory === cat.id && (
              <span className="h-0.5 w-full rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      <Accordion
        className="space-y-2 border-0! px-4 py-12 lg:px-6"
        collapsible
        type="single"
      >
        {filtered.map((faq) => (
          <AccordionItem
            className="rounded-lg border px-4 shadow-xs"
            key={faq.id}
            value={faq.id.toString()}
          >
            <AccordionTrigger className="hover:no-underline">
              {faq.title}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 text-muted-foreground">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filtered.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>No FAQs found matching your search.</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              <SearchSlashIcon data-icon="inline-start" />
              Clear search
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <FullWidthDivider contained />
    </div>
  );
}

const faqs = [
  {
    id: 1,
    category: "getting-started",
    title: "How do I create my first project?",
    content:
      "Upload your long-form video to ClypAI, give your project a name, and our AI will automatically detect the best clips. You'll have a set of short-form clips ready to review within minutes.",
  },
  {
    id: 2,
    category: "getting-started",
    title: "What video formats does ClypAI support?",
    content:
      "ClypAI works with any modern web browser — no software installation required. Simply log in and upload your video file directly from your device or a supported cloud source.",
  },
  {
    id: 3,
    category: "features",
    title: "What is auto-clipping and how does it work?",
    content:
      "Auto-clipping uses advanced AI models to analyse your video for hooks, high-energy moments, and punchlines. It then extracts those moments as standalone short-form clips ready for social media.",
  },
  {
    id: 4,
    category: "features",
    title: "Does ClypAI add captions automatically?",
    content:
      "Yes. ClypAI generates accurate, timed captions for every clip automatically. No manual typing or syncing — the captions are styled and platform-ready out of the box.",
  },
  {
    id: 5,
    category: "features",
    title: "Which social platforms can I publish to?",
    content:
      "ClypAI supports publishing to Instagram, TikTok, YouTube Shorts, and X/Twitter. LinkedIn and Snapchat are coming soon.",
  },
  {
    id: 6,
    category: "billing",
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit cards. Additional credits can be purchased at any time from inside your account dashboard.",
  },
  {
    id: 7,
    category: "billing",
    title: "Can I change my plan anytime?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly.",
  },
  {
    id: 8,
    category: "billing",
    title: "What is the free plan?",
    content:
      "The free plan includes 50 credits per month, 3 projects, 10 exports per month, and 720p export quality. It is free forever with no credit card required.",
  },
  {
    id: 9,
    category: "support",
    title: "How do I get help if something goes wrong?",
    content:
      "You can reach us by email at clypai@hyeprlabs.com. Pro plan users receive priority support with faster response times.",
  },
  {
    id: 10,
    category: "support",
    title: "Is there onboarding for new users?",
    content:
      "We provide in-app guidance, documentation, and video walkthroughs. Pro plan users have access to personalised onboarding sessions with our team.",
  },
];
