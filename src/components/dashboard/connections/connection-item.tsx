import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { ConnectionItemDropdown } from "@/components/dashboard/connections/connection-item-dropdown";

interface Connection {
  id: string;
  username: string;
  avatar: {
    src: string;
    alt: string;
  };
  platform: string;
  created_at: string;
  updated_at: string;
}

export function ConnectionItem({ connection }: { connection: Connection }) {
  const date = new Date(connection.created_at).toLocaleDateString("en-US", {dateStyle: "medium",});

  return (
    <Item variant="outline" size="sm" className="bg-linear-to-br from-background to-card">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src={connection.avatar.src} alt={connection.avatar.alt} />
          <AvatarFallback className="bg-background border border-dashed">{connection.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{connection.username}</ItemTitle>
        <ItemDescription className="capitalize">{connection.platform} · {date}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ConnectionItemDropdown connection={connection} />
      </ItemActions>
    </Item>
  );
}