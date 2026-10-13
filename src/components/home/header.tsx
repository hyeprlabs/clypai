"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClypAIWordmark } from "@/components/brand/logos";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/home/mobile-nav";

export const navLinks = [
  {
    label: "Features",
    href: "#",
  },
  {
    label: "Pricing",
    href: "#",
  },
  {
    label: "About",
    href: "#",
  },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b",
        "md:rounded-full md:border",
        "md:transition-[top,max-width,background-color,border-color,box-shadow,backdrop-filter] md:duration-300 md:ease-out-strong",
        "md:motion-reduce:transition-[background-color,border-color,box-shadow,backdrop-filter] md:motion-reduce:duration-150 md:motion-reduce:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12",
          "md:transition-[padding] md:duration-300 md:ease-out-strong md:motion-reduce:duration-150 md:motion-reduce:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <Link
          className="flex h-8 items-center rounded-full px-3 hover:bg-muted dark:hover:bg-muted/50"
          href="/"
        >
          <ClypAIWordmark className="h-4 w-auto" />
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <div>
            {navLinks.map((link) => (
              <Button asChild key={link.label} size="sm" variant="ghost">
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
          <Button size="sm" variant="outline">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
