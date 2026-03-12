"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Folder, Plus, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/dashboard/projects/project-card";
import type { Project } from "@/types/database";

interface Clip {
  id: string;
  status: string;
  public_url: string | null;
  title: string;
  score: number;
}

interface ProjectWithClips extends Project {
  clips?: Clip[];
}

interface ProjectsResponse {
  projects: ProjectWithClips[];
  total: number;
  page: number;
  limit: number;
}

export function ProjectsList() {
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/projects?limit=20");
      if (!res.ok) throw new Error("Failed to load projects");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();

    // Auto-refresh every 10s if there are processing projects
    const interval = setInterval(() => {
      const hasProcessing = data?.projects.some(
        (p) => !["completed", "failed"].includes(p.status)
      );
      if (hasProcessing) {
        fetchProjects();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchProjects, data?.projects]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchProjects}>
          <RefreshCw className="mr-2 size-4" />
          Try again
        </Button>
      </div>
    );
  }

  const projects = data?.projects ?? [];

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
          <Folder className="size-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-semibold">No projects yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first project to start generating clips
          </p>
        </div>
        <Button asChild>
          <Link href="/create">
            <Plus className="mr-2 size-4" />
            Create your first project
          </Link>
        </Button>
      </div>
    );
  }

  const processingCount = projects.filter(
    (p) => !["completed", "failed"].includes(p.status)
  ).length;

  return (
    <div className="space-y-4">
      {processingCount > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-sm text-yellow-700 dark:text-yellow-400">
          <Loader2 className="size-4 animate-spin" />
          {processingCount} project{processingCount !== 1 ? "s" : ""}{" "}
          processing — refreshing automatically
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {(data?.total ?? 0) > projects.length && (
        <div className="flex justify-center pt-4">
          <Button variant="outline">Load more</Button>
        </div>
      )}
    </div>
  );
}
