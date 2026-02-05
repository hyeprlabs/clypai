"use client"

import { authClient } from "@/lib/auth-client";

import Link from "next/link";

import {
  CircleUser,
  Crown,
  Home,
  Folder,
  Palette,
  Network,
  BarChart4,
  Settings,
  Bot,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UpgradeDialogDrawer } from "@/components/upgrade-dialog-drawer";
import { LogoutAlertDialogDrawer } from "@/components/logout-alert-dialog-drawer";

export function UserDropdown() {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user.image || undefined}
            alt={user.displayUsername || user.name}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate font-medium text-foreground text-sm">
            {user.displayUsername || user.name}
          </span>
          <span className="truncate font-normal text-muted-foreground text-xs">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UpgradeDialogDrawer>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Crown className="text-blue-500" />
              Upgrade to Pro
            </DropdownMenuItem>
          </UpgradeDialogDrawer>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Dashboard
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="/overview">
            <DropdownMenuItem>
              <Home />
              Overview
            </DropdownMenuItem>
          </Link>
          <Link href="/projects">
            <DropdownMenuItem>
              <Folder />
              Projects
            </DropdownMenuItem>
          </Link>
          <Link href="/metrics">
            <DropdownMenuItem>
              <BarChart4 />
              Metrics
            </DropdownMenuItem>
          </Link>
          <Link href="/workers">
            <DropdownMenuItem>
              <Bot />
              Workers
            </DropdownMenuItem>
          </Link>
          <Link href="/brand-kits">
            <DropdownMenuItem>
              <Palette />
              Brand Kits
            </DropdownMenuItem>
          </Link>
          <Link href="/connections">
            <DropdownMenuItem>
              <Network />
              Connections
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <CircleUser />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutAlertDialogDrawer />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
