"use client"

import { useRouter, usePathname } from "next/navigation";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function SettingsTabs() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
      <TabsList>
        <TabsTrigger value="/settings">General</TabsTrigger>
        <TabsTrigger value="/settings/organization">Organization</TabsTrigger>
        <TabsTrigger value="/settings/notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}