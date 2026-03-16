import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { ALLOWED_VIDEO_TYPES, MAX_UPLOAD_SIZE, ALLOWED_VIDEO_EXTENSIONS, MAX_UPLOAD_SIZE_LABEL } from "@/lib/constants";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_VIDEO_TYPES.includes(file.type as (typeof ALLOWED_VIDEO_TYPES)[number])) {
      return NextResponse.json(
        { error: `Invalid file type. Supported: ${ALLOWED_VIDEO_EXTENSIONS}` },
        { status: 400 },
      );
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json({ error: `File too large. Maximum ${MAX_UPLOAD_SIZE_LABEL}` }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const fileId = randomUUID();
    const extMap: Record<string, string> = {
      "video/mp4": "mp4",
      "video/quicktime": "mov",
      "video/webm": "webm",
      "video/x-msvideo": "avi",
    };
    const ext = extMap[file.type] ?? "mp4";
    const storagePath = `uploads/${fileId}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("clypai-videos")
      .upload(storagePath, buffer, { contentType: file.type, upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ storagePath, fileName: file.name });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
