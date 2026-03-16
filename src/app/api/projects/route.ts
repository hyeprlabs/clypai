import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { videoProcessingQueue } from "@/lib/queue";
import { MAX_CLIP_COUNT, MIN_CLIP_COUNT } from "@/lib/constants";
import type { AspectRatio, PlanTier } from "@/types/database";
import { z } from "zod";

const isValidYoutubeUrl = (url: string) =>
  url.includes("youtube.com/watch") ||
  url.includes("youtu.be/") ||
  url.includes("youtube.com/shorts");

const createProjectSchema = z
  .object({
    youtubeUrl: z.string().url().nullable().default(null),
    videoStoragePath: z.string().nullable().default(null),
    clipCount: z.number().int().min(MIN_CLIP_COUNT).max(MAX_CLIP_COUNT).default(3),
    aspectRatio: z.enum(["9:16", "1:1", "16:9"] as const).default("9:16"),
    plan: z.enum(["free", "pro"] as const).default("free"),
    brandKitId: z.string().uuid().nullable().default(null),
    language: z.string().min(2).max(5).default("en"),
  })
  .refine((d) => d.youtubeUrl || d.videoStoragePath, {
    message: "Either a YouTube URL or an uploaded video is required",
  })
  .refine((d) => !d.youtubeUrl || isValidYoutubeUrl(d.youtubeUrl), {
    message: "Must be a valid YouTube URL",
  });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { youtubeUrl, videoStoragePath, clipCount, aspectRatio, plan, brandKitId, language } =
      parsed.data;

    const supabase = createSupabaseAdmin();

    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        youtube_url: youtubeUrl,
        video_storage_path: videoStoragePath,
        clip_count: clipCount,
        aspect_ratio: aspectRatio as AspectRatio,
        plan: plan as PlanTier,
        brand_kit_id: brandKitId,
        language,
        status: "pending",
      })
      .select()
      .single();

    if (error || !project) {
      console.error("Failed to create project:", error);
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }

    const job = await videoProcessingQueue.add("process", {
      projectId: project.id,
      youtubeUrl,
      videoStoragePath,
      clipCount,
      aspectRatio,
      plan,
      brandKitId,
      language,
    });

    await supabase
      .from("projects")
      .update({ workflow_run_id: job.id })
      .eq("id", project.id);

    return NextResponse.json(
      { projectId: project.id, jobId: job.id, status: "pending", message: "Video processing started" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "12");
    const offset = (page - 1) * limit;

    const { data: projects, error, count } = await supabase
      .from("projects")
      .select("*, clips(id, status, public_url, title, score)", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch projects" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      projects: projects ?? [],
      total: count ?? 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
