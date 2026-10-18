"use client";

import { authClient } from "@/lib/auth-client";

import { ChevronDown, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FallbackAvatar from "@/components/ui/fallback-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";

import { CreateOrganizationDialogDrawer } from "@/components/dashboard/create-organization-dialog-drawer";

export function OrganizationSwitcherSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Skeleton className="h-8 w-full rounded-lg" />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function OrganizationSwitcher() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const { data: activeOrganization, isPending: isActiveOrganizationPending } =
    authClient.useActiveOrganization();
  const { data: organizations = [] } = authClient.useListOrganizations();

  if (isSessionPending || isActiveOrganizationPending) {
    return <OrganizationSwitcherSkeleton />;
  }
  if (!session?.user) {
    return null;
  }
  if (!activeOrganization) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="sm"
              className="group/org-trigger data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar size="sm" className="size-5">
                <AvatarImage
                  src={activeOrganization.logo || undefined}
                  alt={activeOrganization.name}
                />
                <AvatarFallback>
                  <FallbackAvatar name={activeOrganization.name} size={20} />
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 truncate font-medium">
                {activeOrganization.name}
              </span>
              <ChevronDown className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 ease-out-strong motion-reduce:transition-none group-data-[state=open]/org-trigger:rotate-180" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={activeOrganization.id}
              onValueChange={(organizationId) =>
                authClient.organization.setActive({ organizationId })
              }
            >
              {(organizations ?? []).map((organization) => (
                <DropdownMenuRadioItem
                  key={organization.id}
                  value={organization.id}
                  className="gap-2 py-1.5 pl-1.5"
                >
                  <Avatar size="sm" className="size-5">
                    <AvatarImage
                      src={organization.logo || undefined}
                      alt={organization.name}
                    />
                    <AvatarFallback>
                      <FallbackAvatar name={organization.name} size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {organization.name}
                  </span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <CreateOrganizationDialogDrawer>
              <DropdownMenuItem
                className="gap-2 py-1.5 pl-1.5"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex size-5 shrink-0 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-3.5" />
                </div>
                <span className="text-muted-foreground font-medium text-sm">
                  Create Organization
                </span>
              </DropdownMenuItem>
            </CreateOrganizationDialogDrawer>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
