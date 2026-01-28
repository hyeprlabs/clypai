"use client"

import { useEffect, useState } from "react";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const themes = [
  { value: "system", Icon: Monitor },
  { value: "light", Icon: Sun },
  { value: "dark", Icon: MoonStar },
];

const style =
  "inline-flex items-center justify-center size-7 rounded-full text-muted-foreground hover:text-foreground transition-all focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none [&_svg]:size-3.5";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-7 w-21 rounded-full border bg-muted/30" />;
  }

  return (
    <div className="flex h-7 w-21 items-center rounded-full border bg-muted/30">
      {themes.map(({ value, Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            style,
            theme === value && "border text-foreground",
          )}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};