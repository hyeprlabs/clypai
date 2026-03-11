"use client"

import { SearchIcon } from "lucide-react";

import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

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

const allPosts = blog.getPages().map((page) => ({
  id: page.data.slug,
  url: `/blog/${page.data.slug}`,
  title: page.data.name,
  description: page.data.description ?? "",
  author: page.data.author.name,
  category: page.data.category ?? "",
  tags: page.data.tags ?? [],
}));

function matchesQuery(post: (typeof allPosts)[number], query: string): boolean {
  const q = query.toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.description.toLowerCase().includes(q) ||
    post.author.toLowerCase().includes(q) ||
    post.category.toLowerCase().includes(q) ||
    post.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function SearchBlogCommandDialog() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();
  const router = useRouter();

  useHotkeys(
    ["ctrl+k", "meta+k"],
    (e) => {
      e.preventDefault();
      setOpen((o) => !o);
    },
    [isMobile],
    { enabled: !isMobile }
  );

  const displayItems = React.useMemo(
    () =>
      search.trim()
        ? allPosts.filter((p) => matchesQuery(p, search.trim()))
        : allPosts,
    [search]
  );

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
        description="Search by title, description, author, category, or tags."
      >
        <CommandInput
          placeholder="Search posts..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {displayItems.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {displayItems.length > 0 && (
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
