import { ArrowUpRightIcon, Network, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { AddConnectionDialogDrawer } from "@/components/dashboard/connections/add-connection-dialog-drawer";

interface Platform {
  id: string;
  name: string;
  slug: string;
  avatar: {
    src: string;
    alt: string;
  };
}

export function ConnectionsEmpty({ platforms }: { platforms: Platform[] }) {
  return (
    <Empty className="mt-48">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Network />
        </EmptyMedia>
        <EmptyTitle>No Connections Yet</EmptyTitle>
        <EmptyDescription className="font-mono">
          You haven&apos;t created any connections yet. Get started by creating
          your first connection.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <AddConnectionDialogDrawer platforms={platforms}>
          <Button>
            <PlusCircle />
            Add Connection
          </Button>
        </AddConnectionDialogDrawer>
        <Button variant="outline">Import Connection</Button>
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