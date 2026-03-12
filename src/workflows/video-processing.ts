import { FatalError } from "workflow";
import { createSupabaseAdmin } from "@/lib/supabase";
import type { TranscriptSegment } from "@/types/database";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VideoProcessingInput {
  projectId: string;
  youtubeUrl: string;
  clipCount: number;
  aspectRatio: "9:16" | "1:1" | "16:9";
  plan: "free" | "pro";
  brandKitId: string | null;
  language: string;
}

interface ClipSuggestion {
  startTime: number;
  endTime: number;
  title: string;
  score: number;
  reason: string;
}

// ─── Workflow ─────────────────────────────────────────────────────────────────

export async function processVideo(input: VideoProcessingInput): Promise<void> {
  "use workflow";

  const {
    projectId,
    youtubeUrl,
    clipCount,
    aspectRatio,
    plan,
    brandKitId,
    language,
  } = input;

  // Step 1: Download the YouTube video and store in Supabase
  const videoPath = await downloadAndStoreVideo(
    projectId,
    youtubeUrl,
    language
  );

  // Step 2: Transcribe the video using OpenAI Whisper
  const transcript = await transcribeVideo(projectId, videoPath, language);

  // Step 3: Analyze transcript to find best clip moments using AI
  const suggestions = await analyzeTranscript(
    projectId,
    transcript,
    clipCount
  );

  // Step 4: Create and store each clip
  for (const suggestion of suggestions) {
    await createClip(
      projectId,
      videoPath,
      suggestion,
      aspectRatio,
      plan,
      brandKitId
    );
  }

  // Step 5: Mark project as completed
  await finalizeProject(projectId);
}

// ─── Steps ────────────────────────────────────────────────────────────────────

async function downloadAndStoreVideo(
  projectId: string,
  youtubeUrl: string,
  _language: string
): Promise<string> {
  "use step";

  const supabase = createSupabaseAdmin();

  await supabase
    .from("projects")
    .update({ status: "downloading" })
    .eq("id", projectId);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "clypai-"));
  const videoFilePath = path.join(tmpDir, `${projectId}.mp4`);

  try {
    // Dynamic import to avoid Edge Runtime issues
    const ytdl = (await import("@distube/ytdl-core")).default;

    // Get video info for title/thumbnail
    const info = await ytdl.getInfo(youtubeUrl);
    const videoTitle = info.videoDetails.title;
    const thumbnailUrl =
      info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]
        ?.url ?? null;

    // Download best available video with audio
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highestvideo",
      filter: "audioandvideo",
    });

    await new Promise<void>((resolve, reject) => {
      const stream = ytdl.downloadFromInfo(info, { format });
      const writeStream = fs.createWriteStream(videoFilePath);
      stream.pipe(writeStream);
      writeStream.on("finish", resolve);
      stream.on("error", reject);
      writeStream.on("error", reject);
    });

    // Upload video to Supabase Storage
    const storagePath = `projects/${projectId}/source.mp4`;
    const videoBuffer = fs.readFileSync(videoFilePath);

    const { error: uploadError } = await supabase.storage
      .from("clypai-videos")
      .upload(storagePath, videoBuffer, {
        contentType: "video/mp4",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Failed to upload video: ${uploadError.message}`);
    }

    await supabase
      .from("projects")
      .update({
        title: videoTitle,
        thumbnail_url: thumbnailUrl,
        video_storage_path: storagePath,
        status: "transcribing",
      })
      .eq("id", projectId);

    return storagePath;
  } catch (error) {
    await supabase
      .from("projects")
      .update({
        status: "failed",
        error_message:
          error instanceof Error ? error.message : "Download failed",
      })
      .eq("id", projectId);
    throw new FatalError(
      `Video download failed: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    // Cleanup temp directory
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
}

async function transcribeVideo(
  projectId: string,
  storagePath: string,
  language: string
): Promise<TranscriptSegment[]> {
  "use step";

  const supabase = createSupabaseAdmin();

  await supabase
    .from("projects")
    .update({ status: "transcribing" })
    .eq("id", projectId);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "clypai-transcribe-"));
  const audioFilePath = path.join(tmpDir, `${projectId}-audio.mp3`);

  try {
    // Download video from Supabase Storage
    const { data: videoData, error: downloadError } = await supabase.storage
      .from("clypai-videos")
      .download(storagePath);

    if (downloadError || !videoData) {
      throw new Error(
        `Failed to download video for transcription: ${downloadError?.message}`
      );
    }

    const videoBuffer = Buffer.from(await videoData.arrayBuffer());
    const videoFilePath = path.join(tmpDir, "source.mp4");
    fs.writeFileSync(videoFilePath, videoBuffer);

    // Extract audio using FFmpeg
    const ffmpegInstaller = await import("@ffmpeg-installer/ffmpeg");
    const ffmpeg = (await import("fluent-ffmpeg")).default;
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    await new Promise<void>((resolve, reject) => {
      ffmpeg(videoFilePath)
        .output(audioFilePath)
        .audioCodec("libmp3lame")
        .audioBitrate("128k")
        .noVideo()
        .on("end", () => resolve())
        .on("error", (err: Error) => reject(err))
        .run();
    });

    // Transcribe with OpenAI Whisper
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const audioStream = fs.createReadStream(audioFilePath);
    const transcription = await openai.audio.transcriptions.create({
      file: audioStream,
      model: "whisper-1",
      language: language !== "auto" ? language : undefined,
      response_format: "verbose_json",
      timestamp_granularities: ["segment"],
    });

    const segments: TranscriptSegment[] = (
      transcription.segments ?? []
    ).map((seg) => ({
      start: seg.start,
      end: seg.end,
      text: seg.text.trim(),
    }));

    await supabase
      .from("projects")
      .update({
        transcript: segments,
        status: "analyzing",
      })
      .eq("id", projectId);

    return segments;
  } catch (error) {
    await supabase
      .from("projects")
      .update({
        status: "failed",
        error_message:
          error instanceof Error ? error.message : "Transcription failed",
      })
      .eq("id", projectId);
    throw new FatalError(
      `Transcription failed: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
}

async function analyzeTranscript(
  projectId: string,
  transcript: TranscriptSegment[],
  clipCount: number
): Promise<ClipSuggestion[]> {
  "use step";

  const supabase = createSupabaseAdmin();

  try {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const transcriptText = transcript
      .map((seg) => `[${seg.start.toFixed(1)}s - ${seg.end.toFixed(1)}s]: ${seg.text}`)
      .join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert short-form content creator specializing in viral social media clips. 
Analyze the provided video transcript and identify the ${clipCount} most engaging, viral-worthy segments.

For each clip, consider:
- High engagement potential (shocking revelations, emotional moments, actionable tips, humor)
- Self-contained narrative (makes sense without context)
- Optimal duration (30-90 seconds for short-form content)
- Strong hook in the first 3 seconds
- Clear value proposition or entertainment

Respond with a JSON array only, no other text.`,
        },
        {
          role: "user",
          content: `Transcript:\n${transcriptText}\n\nFind the top ${clipCount} viral clip moments. Return JSON array:
[
  {
    "startTime": <seconds as number>,
    "endTime": <seconds as number>,
    "title": "<catchy title under 60 chars>",
    "score": <virality score 1-10>,
    "reason": "<why this works as a short clip>"
  }
]`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content ?? "[]";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const suggestions: ClipSuggestion[] = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : [];

    // Validate and clamp suggestions
    const validated = suggestions
      .slice(0, clipCount)
      .map((s) => ({
        ...s,
        startTime: Math.max(0, Number(s.startTime)),
        endTime: Math.max(Number(s.startTime) + 5, Number(s.endTime)),
        score: Math.min(10, Math.max(1, Number(s.score))),
      }))
      .sort((a, b) => b.score - a.score);

    // Create clip records in DB
    for (const suggestion of validated) {
      await supabase.from("clips").insert({
        project_id: projectId,
        title: suggestion.title,
        start_time: suggestion.startTime,
        end_time: suggestion.endTime,
        score: suggestion.score,
        reason: suggestion.reason,
        status: "processing",
        has_watermark: false,
      });
    }

    await supabase
      .from("projects")
      .update({ status: "clipping" })
      .eq("id", projectId);

    return validated;
  } catch (error) {
    await supabase
      .from("projects")
      .update({
        status: "failed",
        error_message:
          error instanceof Error ? error.message : "Analysis failed",
      })
      .eq("id", projectId);
    throw new FatalError(
      `Transcript analysis failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

async function createClip(
  projectId: string,
  sourceStoragePath: string,
  suggestion: ClipSuggestion,
  aspectRatio: "9:16" | "1:1" | "16:9",
  plan: "free" | "pro",
  brandKitId: string | null
): Promise<void> {
  "use step";

  const supabase = createSupabaseAdmin();

  // Find the clip record
  const { data: clipRecord } = await supabase
    .from("clips")
    .select("id")
    .eq("project_id", projectId)
    .eq("start_time", suggestion.startTime)
    .eq("end_time", suggestion.endTime)
    .single();

  const clipId = clipRecord?.id;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "clypai-clip-"));

  try {
    // Download source video
    const { data: videoData, error: downloadError } = await supabase.storage
      .from("clypai-videos")
      .download(sourceStoragePath);

    if (downloadError || !videoData) {
      throw new Error(`Failed to download source video: ${downloadError?.message}`);
    }

    const videoBuffer = Buffer.from(await videoData.arrayBuffer());
    const sourceFilePath = path.join(tmpDir, "source.mp4");
    fs.writeFileSync(sourceFilePath, videoBuffer);

    // Determine output dimensions
    const dimensions = getAspectRatioDimensions(aspectRatio);

    // Generate captions with emojis
    const captions = await generateCaptionsWithEmojis(
      projectId,
      suggestion,
      plan
    );
    const srtPath = path.join(tmpDir, "captions.srt");
    fs.writeFileSync(srtPath, captions.srt);

    // Get brand kit if provided
    let captionStyle = {
      fontSize: 32,
      fontColor: "#ffffff",
      backgroundColor: "#000000",
      backgroundOpacity: 0.6,
      position: "bottom",
      bold: true,
    };

    if (brandKitId) {
      const { data: brandKit } = await supabase
        .from("brand_kits")
        .select("caption_style")
        .eq("id", brandKitId)
        .single();

      if (brandKit?.caption_style) {
        const style = brandKit.caption_style;
        captionStyle = {
          fontSize: style.fontSize ?? 32,
          fontColor: style.fontColor ?? "#ffffff",
          backgroundColor: style.backgroundColor ?? "#000000",
          backgroundOpacity: style.backgroundOpacity ?? 0.6,
          position: style.position ?? "bottom",
          bold: style.bold ?? true,
        };
      }
    }

    const outputFilePath = path.join(tmpDir, "clip.mp4");
    const duration = suggestion.endTime - suggestion.startTime;

    const ffmpegInstaller = await import("@ffmpeg-installer/ffmpeg");
    const ffmpeg = (await import("fluent-ffmpeg")).default;
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    // Convert CSS hex color to ASS color format (AABBGGRR)
    const hexToAss = (hex: string) => {
      const clean = hex.replace("#", "");
      const r = clean.slice(0, 2);
      const g = clean.slice(2, 4);
      const b = clean.slice(4, 6);
      return `&H00${b}${g}${r}`.toUpperCase();
    };
    const bgOpacityHex = Math.round((1 - (captionStyle.backgroundOpacity ?? 0.6)) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
    const bgColor = captionStyle.backgroundColor?.replace("#", "") ?? "000000";
    const assBackColor = `&H${bgOpacityHex}${bgColor.slice(4, 6)}${bgColor.slice(2, 4)}${bgColor.slice(0, 2)}`.toUpperCase();
    const assFontColor = hexToAss(captionStyle.fontColor ?? "#ffffff");

    // Map caption position to ASS alignment (1=bottom-left, 2=bottom-center, 8=top-center)
    const alignmentMap: Record<string, number> = { top: 8, middle: 5, bottom: 2 };
    const alignment = alignmentMap[captionStyle.position ?? "bottom"] ?? 2;

    const fontStyle = captionStyle.bold ? ":bold=1" : "";
    const subtitlesFilter = `subtitles=${srtPath}:force_style='Fontsize=${captionStyle.fontSize},PrimaryColour=${assFontColor},BackColour=${assBackColor},Alignment=${alignment}${fontStyle}'`;

    const scaleFilter = `scale=${dimensions.width}:${dimensions.height}:force_original_aspect_ratio=increase,crop=${dimensions.width}:${dimensions.height}`;

    const filters = [scaleFilter, subtitlesFilter];

    if (plan === "free") {
      // Add watermark for free tier
      filters.push(
        `drawtext=text='clypai.com':fontcolor=white@0.5:fontsize=24:x=w-tw-20:y=20:box=1:boxcolor=black@0.4:boxborderw=6`
      );
    }

    await new Promise<void>((resolve, reject) => {
      ffmpeg(sourceFilePath)
        .seekInput(suggestion.startTime)
        .duration(duration)
        .videoFilter(filters)
        .outputOptions([
          "-c:v libx264",
          "-preset fast",
          "-crf 23",
          "-c:a aac",
          "-b:a 128k",
          "-movflags +faststart",
        ])
        .output(outputFilePath)
        .on("end", () => resolve())
        .on("error", (err: Error) => reject(err))
        .run();
    });

    // Upload clip to Supabase Storage
    const clipStoragePath = `projects/${projectId}/clips/${clipId ?? suggestion.startTime}.mp4`;
    const clipBuffer = fs.readFileSync(outputFilePath);

    const { error: uploadError } = await supabase.storage
      .from("clypai-videos")
      .upload(clipStoragePath, clipBuffer, {
        contentType: "video/mp4",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Failed to upload clip: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("clypai-videos")
      .getPublicUrl(clipStoragePath);

    // Update clip record
    if (clipId) {
      await supabase
        .from("clips")
        .update({
          storage_path: clipStoragePath,
          public_url: urlData.publicUrl,
          captions_srt: captions.srt,
          has_watermark: plan === "free",
          status: "completed",
        })
        .eq("id", clipId);
    }
  } catch (error) {
    if (clipId) {
      await supabase
        .from("clips")
        .update({
          status: "failed",
          error_message:
            error instanceof Error ? error.message : "Clip creation failed",
        })
        .eq("id", clipId);
    }
    throw error;
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
}

async function generateCaptionsWithEmojis(
  projectId: string,
  suggestion: ClipSuggestion,
  _plan: string
): Promise<{ srt: string }> {
  "use step";

  const supabase = createSupabaseAdmin();

  // Get transcript from project
  const { data: project } = await supabase
    .from("projects")
    .select("transcript")
    .eq("id", projectId)
    .single();

  const transcript: TranscriptSegment[] = project?.transcript ?? [];

  // Filter segments within clip window, allowing a small buffer (2s) past the
  // end time to capture caption segments that slightly overlap the clip boundary.
  const CAPTION_BUFFER_SECONDS = 2;
  const clipSegments = transcript.filter(
    (seg) =>
      seg.start >= suggestion.startTime &&
      seg.end <= suggestion.endTime + CAPTION_BUFFER_SECONDS
  );

  if (clipSegments.length === 0) {
    return { srt: "" };
  }

  // Use AI to add fitting emojis to caption text
  try {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const segmentTexts = clipSegments.map((s) => s.text).join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a social media expert. Add 1-2 fitting emojis to each caption line to make them more engaging.
Keep captions SHORT (max 6 words per line for mobile readability).
Split long segments into shorter lines.
Return only the enhanced captions, one per line, preserving order.`,
        },
        {
          role: "user",
          content: segmentTexts,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const enhancedLines = (response.choices[0]?.message?.content ?? segmentTexts)
      .split("\n")
      .filter((l) => l.trim().length > 0);

    // Build SRT format with adjusted timestamps
    const srt = clipSegments
      .map((seg, i) => {
        const relativeStart = seg.start - suggestion.startTime;
        const relativeEnd = seg.end - suggestion.startTime;
        const text = enhancedLines[i] ?? seg.text;

        return `${i + 1}\n${formatSrtTime(relativeStart)} --> ${formatSrtTime(relativeEnd)}\n${text}\n`;
      })
      .join("\n");

    return { srt };
  } catch {
    // Fallback to plain captions without emojis
    const srt = clipSegments
      .map((seg, i) => {
        const relativeStart = seg.start - suggestion.startTime;
        const relativeEnd = seg.end - suggestion.startTime;
        return `${i + 1}\n${formatSrtTime(relativeStart)} --> ${formatSrtTime(relativeEnd)}\n${seg.text}\n`;
      })
      .join("\n");

    return { srt };
  }
}

async function finalizeProject(projectId: string): Promise<void> {
  "use step";

  const supabase = createSupabaseAdmin();

  const { count } = await supabase
    .from("clips")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId)
    .eq("status", "completed");

  await supabase
    .from("projects")
    .update({
      status: (count ?? 0) > 0 ? "completed" : "failed",
      error_message:
        (count ?? 0) === 0 ? "No clips were successfully created" : null,
    })
    .eq("id", projectId);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAspectRatioDimensions(
  aspectRatio: "9:16" | "1:1" | "16:9"
): { width: number; height: number } {
  switch (aspectRatio) {
    case "9:16":
      return { width: 1080, height: 1920 };
    case "1:1":
      return { width: 1080, height: 1080 };
    case "16:9":
      return { width: 1920, height: 1080 };
  }
}

function formatSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

function pad(n: number, length = 2): string {
  return String(n).padStart(length, "0");
}
