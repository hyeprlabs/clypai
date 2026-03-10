"use client"

import * as React from "react";
import { SearchIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import DefaultSearchDialog from "fumadocs-ui/components/dialog/search-default";

export function SearchBlogCommandDialog() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  useHotkeys(
    ["ctrl+k", "meta+k"],
    (e) => {
      e.preventDefault();
      setOpen((o) => !o);
    },
    [isMobile],
    { enabled: !isMobile }
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="sm"
        variant="outline"
        className="text-muted-foreground hover:text-muted-foreground rounded-full"
      >
        <SearchIcon />
        Search posts…
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <DefaultSearchDialog
        open={open}
        onOpenChange={setOpen}
        api="/api/search"
      />
    </>
  );
}