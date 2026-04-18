"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSerializer, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";
import { PlatformsPopover } from "@/components/new/platforms-popover";
import { ArrowRight } from "lucide-react";

const serialize = createSerializer({ v: parseAsString });

export function HeroCta() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!url.trim()) return;
    router.push(serialize("/signup", { v: url.trim() }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-300 duration-500 ease-out flex w-full items-center gap-2 border-t bg-background px-4 py-3"
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste a video URL…"
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40"
      />
      <PlatformsPopover />
      <Button
        type="submit"
        size="icon-sm"
        variant="outline"
        disabled={!url.trim()}
        className="rounded-lg"
      >
        <ArrowRight />
      </Button>
    </form>
  );
}
