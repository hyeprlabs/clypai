"use client"

import Link from "next/link";

import { useIsMobile } from "@/hooks/use-mobile";

import {
  NavigationMenu as NM,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function NavigationMenu({ items }: { items: { href: string; label: string }[] }) {
  const isMobile = useIsMobile()

  return (
    <NM viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        {items.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild className="rounded-full font-normal py-1 border border-transparent hover:border-border hover:bg-card transition-colors duration-150 ease-out bg-transparent">
              <Link href={item.href}>
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NM>
  );
}