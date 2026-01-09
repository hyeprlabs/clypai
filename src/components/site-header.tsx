"use client"

import { usePathname } from "next/navigation";

import React from "react";

import { Home, Crown } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const segments = usePathname().split("/").filter(Boolean)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/overview">
                <Home aria-hidden="true" size={16} />
                <span className="sr-only">Overview</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {segments.map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === segments.length - 1 ? (
                    <BreadcrumbPage className="capitalize">
                      {segment}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={`/${segments.slice(0, index + 1).join("/")}`}
                      className="capitalize"
                    >
                      {segment}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < segments.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex ml-auto gap-2 px-4">
        <Button size="sm" variant="outline">
          <Crown className="text-blue-500" />
          Upgrade to Pro
        </Button>
      </div>
    </header>
  )
}