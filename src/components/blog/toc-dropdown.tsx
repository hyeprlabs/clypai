"use client";

import React from "react";
import { TOCItemType } from "fumadocs-core/toc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ListIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocDropdownProps {
  items: TOCItemType[];
}

export function TocDropdown({ items }: TocDropdownProps) {
  if (items.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full font-mono text-xs"
        >
          <ListIcon className="size-3.5" />
          Table of Contents
          <ChevronDownIcon className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-72 max-h-80 overflow-y-auto"
      >
        {items.map((item, index) => (
          <React.Fragment key={item.url}>
            {index > 0 && item.depth <= 2 && <DropdownMenuSeparator />}
            <DropdownMenuItem asChild>
              <a
                href={item.url}
                className={cn(
                  "flex w-full cursor-pointer items-start gap-2 py-2",
                  item.depth === 2 && "font-medium",
                  item.depth === 3 && "pl-5 text-sm text-muted-foreground",
                  item.depth >= 4 && "pl-8 text-xs text-muted-foreground"
                )}
              >
                {item.depth >= 3 && (
                  <span className="mt-0.5 shrink-0 text-muted-foreground/50">
                    {"└"}
                  </span>
                )}
                {item.title}
              </a>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
