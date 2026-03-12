"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Crown,
  Zap,
  Scissors,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  pending: { label: "Queued", color: "bg-gray-500", icon: Clock },
  downloading: {
    label: "Downloading",
    color: "bg-blue-500",
    icon: Loader2,
  },
  transcribing: {
    label: "Transcribing",
    color: "bg-purple-500",
    icon: Loader2,
  },
  analyzing: { label: "Analyzing", color: "bg-yellow-500", icon: Loader2 },
  clipping: { label: "Clipping", color: "bg-orange-500", icon: Loader2 },
  captioning: { label: "Adding Captions", color: "bg-pink-500", icon: Loader2 },
  completed: {
    label: "Completed",
    color: "bg-green-500",
    icon: CheckCircle2,
  },
  failed: { label: "Failed", color: "bg-red-500", icon: XCircle },
};

interface ProjectCardProps {
  project: ProjectWithClips;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.pending;
  const StatusIcon = status.icon;
  const completedClips =
    project.clips?.filter((c) => c.status === "completed") ?? [];
  const isProcessing = !["completed", "failed"].includes(project.status);
  const timeAgo = formatDistanceToNow(new Date(project.created_at), {
    addSuffix: true,
  });

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md hover:border-primary/30"
    >
      {/* Thumbnail / Status Banner */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title ?? "Video thumbnail"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <Play className="size-10 text-muted-foreground/30" />
          </div>
        )}

        {/* Status badge */}
        <div className="absolute bottom-2 left-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-white",
              status.color
            )}
          >
            <StatusIcon
              className={cn("size-3", isProcessing && "animate-spin")}
            />
            {status.label}
          </span>
        </div>

        {/* Plan badge */}
        <div className="absolute top-2 right-2">
          {project.plan === "pro" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-medium text-white">
              <Crown className="size-3" />
              Pro
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
              <Zap className="size-3" />
              Free
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {project.title ?? "Processing video..."}
          </h3>
          <p className="text-muted-foreground text-xs mt-0.5">{timeAgo}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Scissors className="size-3" />
            {project.clip_count} clips
          </span>
          <span className="flex items-center gap-1">
            <span className="font-mono">{project.aspect_ratio}</span>
          </span>
          {completedClips.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {completedClips.length} ready
            </Badge>
          )}
        </div>

        {/* Clip previews */}
        {completedClips.length > 0 && (
          <div className="flex gap-1.5">
            {completedClips.slice(0, 3).map((clip) => (
              <div
                key={clip.id}
                className="flex-1 rounded-md bg-muted aspect-video overflow-hidden relative"
              >
                {clip.public_url && (
                  <video
                    className="h-full w-full object-cover"
                    preload="metadata"
                    muted
                  >
                    <source src={clip.public_url + "#t=0.1"} />
                  </video>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
