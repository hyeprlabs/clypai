"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { 
  Menu,
  X,
  ArrowRightCircle
} from "lucide-react";

import { cn } from "@/lib/utils";

import { NavigationMenu } from "@/components/marketing/navigation-menu";

import { Button } from "@/components/ui/button";

import { ClypAIWordmark } from "@/components/brand/logos";

const items = [
  { 
    href: "/about", 
    label: "About" 
  },
  { 
    href: "/blog",
    label: "Blog",
  },
  { 
    href: "/changelog", 
    label: "Changelog" 
  },
  { 
    href: "/why", 
    label: "Manifesto" 
  },
];

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
    <header>
      <nav
        data-state={menu && "active"}
        className="fixed z-20 w-full"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl transition-all duration-300",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <ClypAIWordmark height={24} />
              </Link>

              <button
                onClick={() => setMenu(!menu)}
                aria-label={menu == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <NavigationMenu items={items} />
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn("rounded-full", isScrolled && "lg:hidden")}
                >
                  <Link href="/login">
                    <span>Login</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn("rounded-full", isScrolled && "lg:hidden")}
                >
                  <Link href="/signup">
                    <span>Sign Up</span>
                    <ArrowRightCircle className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn("rounded-full", isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  <Link href="/signup">
                    <span>Get started</span>
                    <ArrowRightCircle className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}