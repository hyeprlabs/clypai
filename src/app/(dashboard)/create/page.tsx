import type { Metadata } from "next";
import { Scissors, Sparkles } from "lucide-react";
import { CreateForm } from "@/components/dashboard/create/create-form";

export const metadata: Metadata = {
  title: "Create",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <Scissors className="size-4 text-primary" />
          </div>
          <h1 className="text-xl font-semibold">Create Clips</h1>
        </div>
        <p className="text-muted-foreground text-sm flex items-center gap-1.5">
          <Sparkles className="size-3.5" />
          AI analyzes your video and finds the most viral-worthy moments
        </p>
      </div>

      {/* Form */}
      <CreateForm />
    </main>
  );
}