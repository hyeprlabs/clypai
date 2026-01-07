"use client"

import * as React from "react";
import { Suspense } from "react";

import {
  Home,
  Folder,
  BarChart4,
  Bot,
  Palette,
  Network,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "@/components/nav-main";
import { OrganizationSwitcher, OrganizationSwitcherSkeleton } from "@/components/organization-switcher";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import { NavUser, NavUserSkeleton } from "@/components/nav-user";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/overview",
      icon: Home,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder,
    },
    {
      title: "Metrics",
      url: "/metrics",
      icon: BarChart4,
    },
    {
      title: "Workers",
      url: "/workers",
      icon: Bot,
    },
    {
      title: "Brand Kits",
      url: "/brand-kits",
      icon: Palette,
    },
    {
      title: "Connections",
      url: "/connections",
      icon: Network,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Suspense fallback={<OrganizationSwitcherSkeleton />}>
          <OrganizationSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
        <Suspense fallback={<NavUserSkeleton />}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}