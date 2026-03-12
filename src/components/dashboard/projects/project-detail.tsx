"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Crown,
  Zap,
  Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipCard } from "@/components/dashboard/projects/clip-card";
import { cn } from "@/lib/utils";
import type { Project, Clip } from "@/types/database";

interface ProjectWithClips extends Project {
  clips?: Clip[];
}

const STATUS_STEPS = [
  { key: "downloading", label: "Downloading" },
  { key: "transcribing", label: "Transcribing" },
  { key: "analyzing", label: "Analyzing" },
  { key: "clipping", label: "Clipping" },
  { key: "captioning", label: "Adding Captions" },
  { key: "completed", label: "Completed" },
] as const;

function ProgressBar({ status }: { status: string }) {
  const currentIdx = STATUS_STEPS.findIndex((s) => s.key === status);
  const isFailed = status === "failed";

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {STATUS_STEPS.map((step, idx) => (
          <div
            key={step.key}
            className={cn(
              "h-1 flex-1 rounded-full transition-all",
              isFailed
                ? "bg-red-500/30"
                : idx < currentIdx
                  ? "bg-primary"
                  : idx === currentIdx
                    ? "bg-primary/60 animate-pulse"
                    : "bg-muted"
            )}
          />
        ))}
      </div>
      {!isFailed && (
        <p className="text-xs text-muted-foreground">
          {STATUS_STEPS[currentIdx]?.label ?? "Processing"}...
        </p>
      )}
    </div>
  );
}

export function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<ProjectWithClips | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (!res.ok) throw new Error("Project not found");
      const data = await res.json();
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();

    // Auto-refresh while processing
    const interval = setInterval(() => {
      if (project && !["completed", "failed"].includes(project.status)) {
        fetchProject();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchProject, project]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <XCircle className="size-8 text-destructive" />
        <p className="text-sm text-muted-foreground">
          {error ?? "Project not found"}
        </p>
        <Button variant="outline" asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 size-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  const completedClips =
    project.clips?.filter((c) => c.status === "completed") ?? [];
  const isProcessing = !["completed", "failed"].includes(project.status);

  return (
    <main className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/projects">
          <ArrowLeft className="mr-2 size-4" />
          Projects
        </Link>
      </Button>

      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {project.thumbnail_url && (
            <img
              src={project.thumbnail_url}
              alt={project.title ?? "Video"}
              className="h-16 w-28 rounded-lg object-cover shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-semibold line-clamp-2">
                {project.title ?? "Processing..."}
              </h1>
              <Badge variant={project.plan === "pro" ? "default" : "secondary"}>
                {project.plan === "pro" ? (
                  <>
                    <Crown className="mr-1 size-3" />
                    Pro
                  </>
                ) : (
                  <>
                    <Zap className="mr-1 size-3" />
                    Free
                  </>
                )}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
              <a
                href={project.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ExternalLink className="size-3" />
                Source video
              </a>
              <span className="flex items-center gap-1">
                <Scissors className="size-3" />
                {project.clip_count} clips · {project.aspect_ratio}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        {isProcessing ? (
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Loader2 className="size-4 animate-spin text-primary" />
              <span className="text-sm font-medium">Processing your video</span>
            </div>
            <ProgressBar status={project.status} />
          </div>
        ) : project.status === "failed" ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="size-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                Processing failed
              </span>
            </div>
            {project.error_message && (
              <p className="text-xs text-muted-foreground">
                {project.error_message}
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              asChild
              className="mt-3"
            >
              <Link href="/create">Try again with a new project</Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                {completedClips.length} clip{completedClips.length !== 1 ? "s" : ""} ready
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Clips Grid */}
      {(project.clips?.length ?? 0) > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Scissors className="size-4" />
            Generated Clips
            {isProcessing && (
              <span className="text-xs font-normal text-muted-foreground">
                (updating live)
              </span>
            )}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {project.clips?.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        </div>
      )}

      {isProcessing && (project.clips?.length ?? 0) === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
          <Clock className="size-8 opacity-30" />
          <p className="text-sm">Clips will appear here as they&apos;re generated</p>
        </div>
      )}
    </main>
  );
}
