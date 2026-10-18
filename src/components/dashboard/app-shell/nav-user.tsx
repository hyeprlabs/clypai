"use client";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FallbackAvatar from "@/components/ui/fallback-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  UserIcon,
  BellIcon,
  CommandIcon,
  LifeBuoyIcon,
  GraduationCapIcon,
  CreditCardIcon,
} from "lucide-react";

import { UpgradeDialogDrawer } from "@/components/upgrade-dialog-drawer";
import { LogoutAlertDialogDrawer } from "@/components/logout-alert-dialog-drawer";
import { ThemeDropdown } from "@/components/dashboard/app-shell/theme-dropdown";

export function NavUser() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const name = user.displayUsername || user.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage src={user.image || undefined} alt={name} />
          <AvatarFallback>
            <FallbackAvatar name={name} size={32} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="pointer-events-none flex items-center gap-2">
            <Avatar className="isolate size-8">
              <AvatarImage src={user.image || undefined} alt={name} />
              <AvatarFallback>
                <FallbackAvatar name={name} size={32} />
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium text-foreground">{name}</span> <br />
              <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground text-xs">
                {user.email}
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserIcon />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/notifications">
              <BellIcon />
              Notifications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CommandIcon />
            Keyboard shortcuts
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LifeBuoyIcon />
            Help center
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GraduationCapIcon />
            Agent training
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ThemeDropdown />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UpgradeDialogDrawer>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <CreditCardIcon />
              Subscription
            </DropdownMenuItem>
          </UpgradeDialogDrawer>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutAlertDialogDrawer />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
