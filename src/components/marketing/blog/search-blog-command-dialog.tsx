"use client"

import { SearchIcon } from "lucide-react";

import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

import { useDocsSearch } from "fumadocs-core/search/client";
import { blog } from "@/lib/source";

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

  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    api: "/api/search",
    allowEmpty: true,
  });

  // Stable list of all posts for the default (empty-query) state.
  // blog.getPages() reads static/build-time content; no dynamic updates expected.
  const allPosts = React.useMemo(
    () =>
      blog.getPages().map((page) => ({
        id: page.data.slug,
        url: `/blog/${page.data.slug}`,
        title: page.data.name,
        author: page.data.author.name,
      })),
    []
  );

  useHotkeys(
    ['ctrl+k', 'meta+k'],
    (e) => {
      e.preventDefault();
      setOpen((o) => !o);
    },
    [isMobile],
    { enabled: !isMobile }
  );

  // When user is typing, show fumadocs search results (page-level hits only).
  // Author metadata is not returned by the fumadocs search index, so we fall
  // back to looking up the page from blog.getPage() by URL.
  const isSearching = search.trim().length > 0;
  const searchResults = React.useMemo(() => {
    if (!isSearching || !query.data || query.data === "empty") return null;
    return query.data
      .filter((r) => r.type === "page")
      .map((r) => {
        const slug = r.url.replace(/^\/blog\//, "");
        const page = blog.getPage([slug]);
        return {
          id: r.id,
          url: r.url,
          title: typeof r.content === "string" ? r.content : r.url,
          author: page?.data.author.name ?? "",
        };
      });
  }, [isSearching, query.data]);

  const displayItems = searchResults ?? allPosts;
  const isEmpty = displayItems.length === 0;

  function handleSelect(url: string) {
    router.push(url);
    setOpen(false);
    setSearch("");
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="sm"
        variant="outline"
        className="text-muted-foreground hover:text-muted-foreground rounded-full"
      >
        <SearchIcon />
        Search...
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setSearch("");
        }}
        open={open}
        title="Search blog posts"
        description="Search through all posts by title or author."
      >
        <CommandInput
          placeholder="Search posts..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {isEmpty && (
            <CommandEmpty>
              {query.isLoading ? "Searching…" : "No results found."}
            </CommandEmpty>
          )}
          {!isEmpty && (
            <CommandGroup heading="Posts">
              {displayItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.url}
                  onSelect={() => handleSelect(item.url)}
                  className="flex items-center gap-2"
                >
                  <SearchIcon className="shrink-0 opacity-40" size={14} aria-hidden />
                  <span className="flex-1 truncate">{item.title}</span>
                  {item.author && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      by {item.author}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}