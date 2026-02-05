"use client"

import {
  MoreVerticalIcon,
  RefreshCwIcon,
  Share2Icon,
  TrashIcon,
} from "lucide-react";

import { Kbd } from "@/components/ui/kbd";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

interface Connection {
  id: string;
  username: string;
  avatar: {
    src: string;
    alt: string;
  };
  platform: string;
  created_at: string;
  updated_at: string;
}

export function ConnectionItemDropdown({ connection }: { connection: Connection }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RefreshCwIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>Reconnect</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2Icon aria-hidden="true" className="opacity-60" size={16} />
            <span>Share</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon aria-hidden="true" size={16} />
          <span>Delete</span>
          <DropdownMenuShortcut>
            <Kbd>D</Kbd>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}