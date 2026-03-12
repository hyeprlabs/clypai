import type { Metadata } from "next";
import Link from "next/link";
import { Folder, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectsList } from "@/components/dashboard/projects/projects-list";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Page() {
  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <Folder className="size-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Projects</h1>
            <p className="text-muted-foreground text-xs">
              Your generated short-form clips
            </p>
          </div>
        </div>
        <Button asChild size="sm">
          <Link href="/create">
            <Plus className="mr-2 size-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Projects List */}
      <ProjectsList />
    </main>
  );
}