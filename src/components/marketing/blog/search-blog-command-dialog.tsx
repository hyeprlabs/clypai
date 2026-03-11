"use client"

import { SearchIcon } from "lucide-react";

import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

import { useDocsSearch } from "fumadocs-core/search/client";
import type { SortedResult } from "fumadocs-core/search";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function SearchBlogCommandDialog() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  const { search, setSearch, query } = useDocsSearch({ type: "fetch", api: "/api/search" });

  useHotkeys(
    ['ctrl+k', 'meta+k'],
    (e) => {
      e.preventDefault();
      setOpen((o) => !o);
    },
    [isMobile],
    { enabled: !isMobile }
  );

  const results: SortedResult[] = query.data && query.data !== "empty"
    ? query.data.filter((r) => r.type === "page")
    : [];

  function handleSelect(url: string) {
    router.push(url);
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="sm"
        variant="outline"
        className="text-muted-foreground hover:text-muted-foreground rounded-full"
      >
        <SearchIcon/>
        Search...
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput
          placeholder="Search posts..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>
            {query.isLoading ? "Searching…" : "No results found."}
          </CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Posts">
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.url}
                  onSelect={() => handleSelect(result.url)}
                >
                  <SearchIcon className="opacity-60" size={16} aria-hidden />
                  <span>{result.content}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}