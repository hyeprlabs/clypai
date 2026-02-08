import type { Metadata } from "next";

import { Activity } from "react";

import { BrandKitsEmpty } from "@/components/dashboard/brand-kits/brand-kits-empty";

export const metadata: Metadata = {
  title: "Brand Kits",
}

const isEmpty = false

export default function Page() {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Brand Kits</h1>
      <Activity mode={isEmpty ? "visible" : "hidden"}>
        <BrandKitsEmpty />
      </Activity>
      <Activity mode={isEmpty ? "hidden" : "visible"}>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </Activity>
    </main>
  );
}