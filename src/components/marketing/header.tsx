"use client"

import { authClient } from "@/lib/auth-client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { Menu, X, ArrowRightCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { NavigationMenu } from "@/components/marketing/navigation-menu";

import { Button } from "@/components/ui/button";

import { ClypAIWordmark } from "@/components/brand/logos";

import { UserDropdown } from "@/components/marketing/user-dropdown";

const items = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/changelog",
    label: "Changelog",
  },
  {
    href: "/why",
    label: "Manifesto",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
];

const HeaderActions = ({ isScrolled }: { isScrolled: boolean }) => {
  const { data: session } = authClient.useSession();

  if (session?.user) {
    return (
      <div className="relative hidden items-center gap-3 lg:flex">
        <Link href="/overview">
          <Button size="sm" className="rounded-full">
            Dashboard
            <ArrowRightCircle className="ml-2" />
          </Button>
        </Link>
        <UserDropdown />
      </div>
    );
  }

  return (
    <div className="relative hidden items-center gap-3 lg:flex">
      <div
        className={cn(
          "flex items-center gap-3 transition-all duration-300 ease-in-out",
          isScrolled
            ? "pointer-events-none translate-x-1 opacity-0"
            : "translate-x-0 opacity-100"
        )}
      >
        <Link href="/login">
          <Button variant="outline" size="sm" className="rounded-full">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="rounded-full">
            Sign Up
            <ArrowRightCircle className="ml-2" />
          </Button>
        </Link>
      </div>
      <div
        className={cn(
          "absolute right-0 transition-all duration-300 ease-in-out",
          isScrolled
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-1 opacity-0"
        )}
      >
        <Link href="/signup">
          <Button size="sm" className="rounded-full">
            Get Started
            <ArrowRightCircle className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav data-state={menu ? "active" : "inactive"} className="w-full">
        <div
          className={cn(
            "mx-auto px-4 py-2 transition-all duration-300 ease-in-out sm:px-6 sm:py-2.5",
            "border-b bg-background/95 backdrop-blur-lg",
            isScrolled
              ? "lg:mt-2 lg:max-w-6xl lg:rounded-2xl lg:border lg:border-b-0 lg:py-2 lg:px-8"
              : "lg:mt-2 lg:max-w-7xl lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none lg:px-8 lg:py-3",
          )}
        >
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              aria-label="ClypAI"
              className="flex items-center space-x-2"
            >
              <ClypAIWordmark height={24} />
            </Link>

            {/* Desktop Navigation */}
            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <NavigationMenu items={items} />
            </div>

            <HeaderActions isScrolled={isScrolled} />

            <button
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "Close Menu" : "Open Menu"}
              aria-expanded={menu}
              className="relative p-2 lg:hidden"
            >
              <Menu
                className={cn(
                  "size-6 transition-all duration-200",
                  menu && "rotate-180 scale-0 opacity-0",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 transition-all duration-200",
                  menu && "rotate-0 scale-100 opacity-100",
                )}
              />
            </button>
          </div>

          <div
            className={cn(
              "mt-4 grid overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
              menu
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="space-y-6 pb-6">
                <ul className="space-y-4">
                  {items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={() => setMenu(false)}
                        className="block text-base text-muted-foreground transition-colors duration-150 hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      disabled
                      size="sm"
                      className="w-full rounded-full sm:w-auto"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      disabled
                      size="sm"
                      className="w-full rounded-full sm:w-auto"
                    >
                      Sign Up
                      <ArrowRightCircle className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};