import Link from "next/link";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LegalDropdown({links,}: {links: { title: string; href: string }[]}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open legal menu"
          className="rounded-full shadow-none text-muted-foreground font-mono"
          size="sm"
          variant="ghost"
        >
          <span>Legal</span>
          <ChevronDown className="ml-2 size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {links.map((link) => (
          <DropdownMenuItem
            key={link.href}
            asChild
            className="font-mono text-muted-foreground focus:text-foreground"
          >
            <Link href={link.href}>{link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}