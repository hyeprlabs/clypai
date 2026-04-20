import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClypAIWordmark } from "@/components/brand/logos";
import { company_name } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  InstagramIcon,
  TiktokIcon,
} from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer className="relative">
      <div
        className={cn(
          "mx-auto max-w-4xl",
          "dark:bg-[radial-gradient(35%_80%_at_15%_0%,--theme(--color-foreground/.1),transparent)]",
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-3">
            <Link className="w-max" href="/new">
              <ClypAIWordmark className="h-5 w-auto" />
            </Link>
            <p className="max-w-sm text-balance text-muted-foreground text-sm">
              #1 AI video clipping &amp; editing tool.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button
                  asChild
                  key={`social-${item.link}-${index}`}
                  size="icon-sm"
                  variant="outline"
                >
                  <a href={item.link} target="_blank">
                    {item.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Resources</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <Link
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Company</span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <Link
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Legal</span>
            <div className="mt-2 flex flex-col gap-2">
              {legal.map(({ href, title }) => (
                <Link
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 py-4">
          <p className="text-center font-light text-muted-foreground text-xs font-mono">
            &copy; {new Date().getFullYear()} {company_name}, All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

const resources = [
  {
    title: "Features",
    href: "/new/features",
  },
  {
    title: "Pricing",
    href: "/new/pricing",
  },
  {
    title: "Blog",
    href: "/new/blog",
  },
  {
    title: "Changelog",
    href: "/new/changelog",
  },
];

const company = [
  {
    title: "About Us",
    href: "/new/about",
  },
  {
    title: "Manifesto",
    href: "/new/why",
  },
  {
    title: "Contact",
    href: "/new/contact",
  },
];

const legal = [
  {
    title: "Imprint",
    href: "/new/legal/imprint",
  },
  {
    title: "Privacy Policy",
    href: "/new/legal/privacy-policy",
  },
  {
    title: "Terms of Service",
    href: "/new/legal/terms-of-service",
  },
];

const socialLinks = [
  {
    icon: <HugeiconsIcon icon={NewTwitterIcon} strokeWidth={2} />,
    link: "/x",
  },
  {
    icon: <HugeiconsIcon icon={InstagramIcon} strokeWidth={2} />,
    link: "/instagram",
  },
  {
    icon: <HugeiconsIcon icon={TiktokIcon} strokeWidth={2} />,
    link: "/tiktok",
  },
];
