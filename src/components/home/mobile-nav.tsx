import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/home/portal";
import { navLinks } from "@/components/home/header";
import { XIcon, MenuIcon } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div className="size-full origin-top animate-in fade-in p-4 duration-200 ease-out-strong motion-safe:zoom-in-97">
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button
                  asChild
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <Button asChild className="w-full" variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
