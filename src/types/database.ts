export type ProjectStatus =
  | "pending"
  | "downloading"
  | "transcribing"
  | "analyzing"
  | "clipping"
  | "captioning"
  | "completed"
  | "failed";

export type PlanTier = "free" | "pro";

export type AspectRatio = "9:16" | "1:1" | "16:9";

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  youtube_url: string;
  title: string | null;
  thumbnail_url: string | null;
  video_storage_path: string | null;
  clip_count: number;
  aspect_ratio: AspectRatio;
  plan: PlanTier;
  brand_kit_id: string | null;
  language: string;
  status: ProjectStatus;
  error_message: string | null;
  workflow_run_id: string | null;
  transcript: TranscriptSegment[] | null;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface Clip {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  storage_path: string | null;
  public_url: string | null;
  start_time: number;
  end_time: number;
  score: number;
  reason: string | null;
  captions_srt: string | null;
  has_watermark: boolean;
  status: "processing" | "completed" | "failed";
  error_message: string | null;
}

export interface BrandKit {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  logo_url: string | null;
  watermark_url: string | null;
  caption_style: CaptionStyle;
}

export interface CaptionStyle {
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  position: "top" | "middle" | "bottom";
  bold: boolean;
}
