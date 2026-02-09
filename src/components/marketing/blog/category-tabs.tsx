"use client"

import { useQueryState } from "nuqs";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function CategoryTabs() {
  const [category, setCategory] = useQueryState("category", { defaultValue: "all" });

  return (
    <Tabs value={category ?? "all"} onValueChange={(value) => setCategory(value)}>
      <TabsList className="bg-transparent">
        <TabsTrigger className="rounded-full" value="all">All</TabsTrigger>
        <TabsTrigger className="rounded-full" value="company">Company</TabsTrigger>
        <TabsTrigger className="rounded-full" value="product">Product</TabsTrigger>
        <TabsTrigger className="rounded-full" value="community">Community</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}