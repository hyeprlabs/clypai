"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";

export function CopyUrlButton() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
      resetTimer.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      className="h-auto gap-1 px-0 font-normal text-muted-foreground text-xs uppercase tracking-wider"
      onClick={handleCopy}
      size="sm"
      type="button"
      variant="link"
    >
      <Link2 className="size-3.5" />
      {copied ? "Copied" : "Copy URL"}
    </Button>
  );
}
