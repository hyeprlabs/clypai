/** Maximum number of clips a user can request per project */
export const MAX_CLIP_COUNT = 10;

/** Minimum number of clips per project */
export const MIN_CLIP_COUNT = 1;

/** Maximum upload file size in bytes (500 MB) */
export const MAX_UPLOAD_SIZE = 500 * 1024 * 1024;

/** Allowed video MIME types for upload */
export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
] as const;

/** Human-readable upload file types */
export const ALLOWED_VIDEO_EXTENSIONS = "MP4, MOV, WebM, AVI";

/** Human-readable max upload size */
export const MAX_UPLOAD_SIZE_LABEL = "500 MB";
