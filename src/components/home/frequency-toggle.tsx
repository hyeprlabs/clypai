"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Frequency = "monthly" | "yearly";

export function FrequencyToggle({
  value,
  onValueChange,
}: {
  value: Frequency;
  onValueChange: (value: Frequency) => void;
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(v as Frequency)}>
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">
          Yearly
          <span className="text-green-500">-20%</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
