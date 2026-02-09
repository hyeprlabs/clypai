"use client"

import { useQueryState } from "nuqs";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function FrequencyToggle() {
  const [frequency, setFrequency] = useQueryState("frequency")

  return (
    <Tabs value={frequency || "monthly"} onValueChange={setFrequency} className="items-center">
      <TabsList className="bg-linear-to-br from-background to-card border">
        <TabsTrigger value="monthly">
          Monthly
        </TabsTrigger>
        <TabsTrigger value="yearly">
          Yearly
          <span className="text-green-500 text-xs">
            20% off
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}