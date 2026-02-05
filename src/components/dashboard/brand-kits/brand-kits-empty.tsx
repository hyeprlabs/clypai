import { ArrowUpRightIcon, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function BrandKitsEmpty() {
  return (
    <Empty className="mt-48">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Palette />
        </EmptyMedia>
        <EmptyTitle>No Brand Kits Yet</EmptyTitle>
        <EmptyDescription className="font-mono">
          You haven&apos;t created any brand kits yet. Get started by creating
          your first brand kit.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button>Create Brand Kit</Button>
        <Button variant="outline">Import Brand Kit</Button>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}