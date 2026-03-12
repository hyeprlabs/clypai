"use client";

import { useRef, useState } from "react";
import { Play, Pause, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Clip } from "@/types/database";

interface ClipCardProps {
  clip: Clip;
}

export function ClipCard({ clip }: ClipCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  }

  const duration = clip.end_time - clip.start_time;
  const formattedDuration = `${Math.floor(duration)}s`;

  return (
    <div className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md hover:border-primary/30">
      {/* Video Preview */}
      <div className="relative bg-muted overflow-hidden" style={{ aspectRatio: "9/16", maxHeight: "320px" }}>
        {clip.public_url ? (
          <>
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={clip.public_url}
              loop
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                {playing ? (
                  <Pause className="size-5" />
                ) : (
                  <Play className="size-5 ml-0.5" />
                )}
              </div>
            </button>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Play className="size-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Processing...</p>
            </div>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2">
          <span className="rounded-full bg-black/70 px-2 py-0.5 text-xs text-white font-medium">
            {formattedDuration}
          </span>
        </div>

        {/* Score */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-0.5 text-xs font-medium text-white">
            <Star className="size-2.5 fill-white" />
            {clip.score.toFixed(1)}
          </span>
        </div>

        {/* Watermark badge */}
        {clip.has_watermark && (
          <div className="absolute top-2 right-2">
            <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white/70">
              watermark
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <h4 className="text-sm font-medium line-clamp-2">{clip.title}</h4>

        {clip.reason && (
          <p className="text-muted-foreground text-xs line-clamp-2">
            {clip.reason}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <Badge
            variant={clip.status === "completed" ? "default" : "secondary"}
            className="text-xs"
          >
            {clip.status}
          </Badge>

          {clip.public_url && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              asChild
            >
              <a href={clip.public_url} download target="_blank" rel="noreferrer">
                <Download className="size-3 mr-1" />
                Download
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
