import type { Metadata } from "next";

import { Activity } from "react";

import { Plus } from "lucide-react";

import { Item, ItemTitle } from "@/components/ui/item";

import { ConnectionsEmpty } from "@/components/dashboard/connections/connections-empty";
import { ConnectionItem } from "@/components/dashboard/connections/connection-item";
import { AddConnectionDialogDrawer } from "@/components/dashboard/connections/add-connection-dialog-drawer";

export const metadata: Metadata = {
  title: "Connections",
}

const platforms = [
  {
    id: "1",
    name: "TikTok",
    slug: "tiktok",
    avatar: {
      src: "/avatars/tiktok.jpg",
      alt: "TikTok Logo"
    }
  },
  {
    id: "2",
    name: "Instagram Business",
    slug: "instagram",
    avatar: {
      src: "/avatars/instagram.jpg",
      alt: "Instagram Logo"
    }
  },
  {
    id: "3",
    name: "YouTube",
    slug: "youtube",
    avatar: {
      src: "/avatars/youtube.jpg",
      alt: "YouTube Logo"
    }
  },
  {
    id: "4",
    name: "X/Twitter",
    slug: "x",
    avatar: {
      src: "/avatars/x.jpg",
      alt: "X/Twitter Logo"
    }
  },
]

const connections = [
  {
    id: "conn_1",
    username: "john_doe",
    avatar: {
      src: "/avatars/john.jpg",
      alt: "John Doe"
    },
    platform: "twitter",
    created_at: "2025-01-15T10:30:00Z",
    updated_at: "2025-02-03T14:20:00Z"
  },
  {
    id: "conn_2",
    username: "jane_smith",
    avatar: {
      src: "/avatars/jane.jpg",
      alt: "Jane Smith"
    },
    platform: "instagram",
    created_at: "2025-01-20T09:15:00Z",
    updated_at: "2025-02-02T11:45:00Z"
  },
  {
    id: "conn_3",
    username: "mike_johnson",
    avatar: {
      src: "/avatars/mike.jpg",
      alt: "Mike Johnson"
    },
    platform: "instagram",
    created_at: "2025-02-01T08:00:00Z",
    updated_at: "2025-02-04T16:30:00Z"
  }
]

const isEmpty = false

export default function Page() {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Connections</h1>
      <Activity mode={isEmpty ? "visible" : "hidden"}>
        <ConnectionsEmpty platforms={platforms} />
      </Activity>
      <Activity mode={isEmpty ? "hidden" : "visible"}>
        <div className="flex flex-col gap-4 max-w-2xl">
          {connections.map((connection) => (
            <ConnectionItem key={connection.id} connection={connection} />
          ))}
          <AddConnectionDialogDrawer platforms={platforms}>
            <Item variant="outline" size="sm" className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors" asChild>
              <div className="flex flex-row items-center justify-center w-full gap-2 text-muted-foreground">
                <Plus className="size-4" />
                <ItemTitle className="font-mono">Add Connection</ItemTitle>
              </div>
            </Item>
          </AddConnectionDialogDrawer>
        </div>
      </Activity>
    </main>
  );
}