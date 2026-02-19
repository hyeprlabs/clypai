import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

import { ClypAIWordmark } from "@/components/brand/logos";

import { ThemeToggle } from "@/components/marketing/theme-toggle";

import { StatusWidget } from "@/components/marketing/status-widget";

import { AnimatedContainer } from "@/components/marketing/animated-container";

import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";

type Link = {
  title: string;
  href: string;
  icon?: ReactNode;
};

type Section = {
  label: string;
  links: Link[];
};

const links: Section[] = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "/features" },
      { title: "Pricing", href: "/pricing" },
      { title: "Comparison", href: "/comparison" },
      { title: "The Problem", href: "/problem" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About us", href: "/about" },
      { title: "Manifesto", href: "/why" },
      { title: "Contact", href: "/contact" },
      { title: "Blog", href: "/blog" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
  {
    label: "Legal",
    links: [
      { title: "Imprint", href: "/legal/imprint" },
      { title: "Terms of Service", href: "/legal/terms-of-service" },
      { title: "Privacy Policy", href: "/legal/privacy-policy" },
    ],
  },
  {
    label: "Socials",
    links: [
      {
        title: "X/Twitter",
        href: "/x",
        icon: <IconBrandX />,
      },
      {
        title: "Instagram",
        href: "/instagram",
        icon: <IconBrandInstagram />,
      },
      {
        title: "TikTok",
        href: "/tiktok",
        icon: <IconBrandTiktok />,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className={cn(
        "relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center rounded-t-4xl border-t px-6 md:rounded-t-6xl md:px-8 mt-24",
        "dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.1),transparent)]",
      )}
    >
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />

      <div className="grid w-full gap-8 py-6 md:py-8 lg:grid-cols-3 lg:gap-8">
        <AnimatedContainer className="space-y-4">
          <ClypAIWordmark className="h-4 w-auto" />
          <p className="mt-8 text-muted-foreground text-sm md:mt-0">
            #1 AI video clipping & editing tool.
          </p>
          <ThemeToggle />
          <StatusWidget slug="clypai" />
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-2 lg:mt-0">
          {links.map((section, index) => (
            <AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs">{section.label}</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        className="inline-flex items-center duration-250 hover:text-foreground [&_svg]:me-1 [&_svg]:size-4"
                        href={link.href}
                        key={`${section.label}-${link.title}`}
                      >
                        {link.icon}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
      <div className="h-px w-full bg-linear-to-r via-border" />
      <div className="flex w-full items-center justify-center py-4">
        <p className="text-muted-foreground text-xs font-mono">
          &copy; {new Date().getFullYear()} ClypAI, All rights reserved
        </p>
      </div>
    </footer>
  );
}

