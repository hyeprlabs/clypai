"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type React from "react";

type LegalTab = {
  title: string;
  href: string;
};

export function LegalTabs({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const pathname = usePathname();
  const router = useRouter();

  const current =
    legalTabs.find(
      (tab) => pathname === tab.href || pathname?.startsWith(tab.href),
    )?.href ?? legalTabs[0].href;

  return (
    <nav
      aria-label="Legal navigation"
      className={cn("mb-6 flex justify-start", className)}
      {...props}
    >
      <Tabs
        className="w-full items-start"
        onValueChange={(value) => router.push(value)}
        value={current}
      >
        <TabsList
          className="h-auto flex-wrap gap-1 rounded-full p-1"
          variant="default"
        >
          {legalTabs.map((tab) => (
            <TabsTrigger
              className="rounded-full px-3 py-1"
              key={tab.href}
              value={tab.href}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}

const legalTabs: LegalTab[] = [
  {
    title: "Imprint",
    href: "/legal/imprint",
  },
  {
    title: "Terms of Service",
    href: "/legal/terms-of-service",
  },
  {
    title: "Privacy Policy",
    href: "/legal/privacy-policy",
  },
];
