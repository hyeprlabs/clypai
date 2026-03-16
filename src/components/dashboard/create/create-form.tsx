"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Loader2,
  Youtube,
  Upload,
  Scissors,
  Palette,
  Globe,
  MonitorSmartphone,
  Square,
  Monitor,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileVideo,
  X,
  Link2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MAX_CLIP_COUNT, MIN_CLIP_COUNT } from "@/lib/constants";

// ── Types ─────────────────────────────────────────────────────────────────────

interface BrandKit {
  id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
}

type SourceType = "link" | "upload";

const ASPECT_RATIOS = [
  { value: "9:16" as const, label: "Vertical", sublabel: "TikTok, Reels, Shorts", icon: MonitorSmartphone },
  { value: "1:1" as const, label: "Square", sublabel: "Instagram Feed", icon: Square },
  { value: "16:9" as const, label: "Landscape", sublabel: "YouTube, Twitter", icon: Monitor },
];

const CLIP_COUNTS = Array.from(
  { length: MAX_CLIP_COUNT },
  (_, i) => i + MIN_CLIP_COUNT,
).filter((n) => [1, 2, 3, 5, 7, 10].includes(n));

const LANGUAGES = [
  { value: "auto", label: "Auto Detect" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
];

// ── Schema ────────────────────────────────────────────────────────────────────

const formSchema = z.object({
  sourceType: z.enum(["link", "upload"]),
  youtubeUrl: z.string().optional(),
  videoStoragePath: z.string().optional(),
  fileName: z.string().optional(),
  clipCount: z.number().int().min(MIN_CLIP_COUNT).max(MAX_CLIP_COUNT),
  aspectRatio: z.enum(["9:16", "1:1", "16:9"]),
  language: z.string(),
  brandKitId: z.string().nullable(),
  plan: z.enum(["free", "pro"]),
});

type FormValues = z.infer<typeof formSchema>;

// ── Component ─────────────────────────────────────────────────────────────────

export function CreateForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [brandKits, setBrandKits] = useState<BrandKit[]>([]);
  const [brandKitsLoaded, setBrandKitsLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      sourceType: "link",
      youtubeUrl: "",
      videoStoragePath: undefined,
      fileName: undefined,
      clipCount: 3,
      aspectRatio: "9:16",
      language: "en",
      brandKitId: null,
      plan: "free",
    },
  });

  const { watch, setValue } = form;
  const sourceType = watch("sourceType");
  const youtubeUrl = watch("youtubeUrl");
  const videoStoragePath = watch("videoStoragePath");
  const fileName = watch("fileName");
  const clipCount = watch("clipCount");
  const aspectRatio = watch("aspectRatio");
  const language = watch("language");
  const brandKitId = watch("brandKitId");
  const plan = watch("plan");

  // Validate step 1
  const isYoutubeValid =
    sourceType === "link" &&
    !!youtubeUrl &&
    (youtubeUrl.includes("youtube.com/watch") ||
      youtubeUrl.includes("youtu.be/") ||
      youtubeUrl.includes("youtube.com/shorts"));
  const isUploadValid = sourceType === "upload" && !!videoStoragePath;
  const canProceed = isYoutubeValid || isUploadValid;

  // Load brand kits when entering step 2
  const loadBrandKits = useCallback(async () => {
    if (brandKitsLoaded) return;
    try {
      const res = await fetch("/api/brand-kits");
      if (res.ok) {
        const data = await res.json();
        setBrandKits(data);
      }
    } catch {
      // Brand kits are optional
    } finally {
      setBrandKitsLoaded(true);
    }
  }, [brandKitsLoaded]);

  function goToStep2() {
    if (!canProceed) return;
    setStep(2);
    loadBrandKits();
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      setValue("videoStoragePath", data.storagePath);
      setValue("fileName", data.fileName);
      toast.success("Video uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("video/")) handleFileUpload(file);
  }

  async function onSubmit() {
    setSubmitting(true);
    try {
      const values = form.getValues();

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeUrl: values.sourceType === "link" ? values.youtubeUrl : null,
          videoStoragePath: values.sourceType === "upload" ? values.videoStoragePath : null,
          clipCount: values.clipCount,
          aspectRatio: values.aspectRatio,
          plan: values.plan,
          brandKitId: values.brandKitId,
          language: values.language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to start processing");

      toast.success("Processing started!", {
        description: "Your clips are being created. We'll notify you when they're ready.",
      });
      router.push("/projects");
    } catch (error) {
      toast.error("Failed to start processing", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
            step === 1
              ? "bg-primary text-primary-foreground"
              : "bg-primary/20 text-primary",
          )}
        >
          {step > 1 ? <CheckCircle2 className="size-4" /> : "1"}
        </div>
        <div className="h-px flex-1 bg-border" />
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
            step === 2
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          2
        </div>
      </div>

      {/* Step 1: Video Source */}
      {step === 1 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Choose your source</CardTitle>
              <CardDescription>Upload a video file or paste a YouTube link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Source Type Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setValue("sourceType", "link");
                    setValue("videoStoragePath", undefined);
                    setValue("fileName", undefined);
                  }}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all",
                    sourceType === "link"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input bg-background text-foreground hover:bg-muted",
                  )}
                >
                  <Link2 className="size-4" />
                  YouTube Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue("sourceType", "upload");
                    setValue("youtubeUrl", "");
                  }}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all",
                    sourceType === "upload"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input bg-background text-foreground hover:bg-muted",
                  )}
                >
                  <Upload className="size-4" />
                  Upload File
                </button>
              </div>

              {/* YouTube Link Input */}
              {sourceType === "link" && (
                <div className="space-y-2">
                  <Label htmlFor="youtube-url" className="flex items-center gap-2">
                    <Youtube className="size-3.5 text-red-500" />
                    YouTube URL
                  </Label>
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setValue("youtubeUrl", e.target.value)}
                    className={cn(
                      youtubeUrl && !isYoutubeValid && "border-destructive",
                    )}
                  />
                  {youtubeUrl && !isYoutubeValid && (
                    <p className="text-xs text-destructive">Enter a valid YouTube URL</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Supports youtube.com/watch, youtu.be, and youtube.com/shorts
                  </p>
                </div>
              )}

              {/* File Upload */}
              {sourceType === "upload" && (
                <div className="space-y-2">
                  {videoStoragePath ? (
                    <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
                      <FileVideo className="size-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{fileName}</p>
                        <p className="text-xs text-muted-foreground">Ready to process</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setValue("videoStoragePath", undefined);
                          setValue("fileName", undefined);
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-input p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="size-8 animate-spin text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="size-8 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">
                              Drop your video here or{" "}
                              <label className="cursor-pointer text-primary underline-offset-4 hover:underline">
                                browse
                                <input
                                  type="file"
                                  accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload(file);
                                  }}
                                />
                              </label>
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              MP4, MOV, WebM, AVI · Max 500 MB
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={goToStep2}
            disabled={!canProceed}
            className="w-full"
            size="lg"
          >
            Continue
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Options */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Clip Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Scissors className="size-4" />
                Clip Settings
              </CardTitle>
              <CardDescription>Configure clip generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Number of clips */}
              <div className="space-y-3">
                <Label>Number of Clips</Label>
                <div className="flex flex-wrap gap-2">
                  {CLIP_COUNTS.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setValue("clipCount", count)}
                      className={cn(
                        "flex h-9 w-12 items-center justify-center rounded-md border text-sm font-medium transition-all",
                        clipCount === count
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:bg-muted",
                      )}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  AI will find the {clipCount} most viral-worthy moment{clipCount !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-3">
                <Label>Aspect Ratio</Label>
                <div className="grid grid-cols-3 gap-3">
                  {ASPECT_RATIOS.map((ar) => {
                    const Icon = ar.icon;
                    return (
                      <button
                        key={ar.value}
                        type="button"
                        onClick={() => setValue("aspectRatio", ar.value)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-all",
                          aspectRatio === ar.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input bg-background text-foreground hover:bg-muted",
                        )}
                      >
                        <Icon className="size-5" />
                        <div>
                          <p className="text-xs font-medium">{ar.label}</p>
                          <p className="text-[10px] text-muted-foreground">{ar.sublabel}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label htmlFor="language" className="flex items-center gap-2">
                  <Globe className="size-3.5" />
                  Video Language
                </Label>
                <Select value={language} onValueChange={(v) => setValue("language", v)}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Brand Kit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Palette className="size-4" />
                Brand Kit
              </CardTitle>
              <CardDescription>Apply your brand colors and caption style</CardDescription>
            </CardHeader>
            <CardContent>
              {!brandKitsLoaded ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Loading brand kits...
                </div>
              ) : brandKits.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No brand kits found.{" "}
                  <a href="/brand-kits" className="text-primary underline-offset-4 hover:underline">
                    Create one
                  </a>{" "}
                  to apply custom styling.
                </p>
              ) : (
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => setValue("brandKitId", null)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                      brandKitId === null
                        ? "border-primary bg-primary/10"
                        : "border-input bg-background hover:bg-muted",
                    )}
                  >
                    <div className="size-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">No Brand Kit</p>
                      <p className="text-xs text-muted-foreground">Default white captions</p>
                    </div>
                    {brandKitId === null && <CheckCircle2 className="size-4 text-primary" />}
                  </button>

                  {brandKits.map((kit) => (
                    <button
                      key={kit.id}
                      type="button"
                      onClick={() => setValue("brandKitId", kit.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                        brandKitId === kit.id
                          ? "border-primary bg-primary/10"
                          : "border-input bg-background hover:bg-muted",
                      )}
                    >
                      <div
                        className="size-6 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${kit.primary_color}, ${kit.secondary_color})`,
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{kit.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {kit.primary_color} · {kit.secondary_color}
                        </p>
                      </div>
                      {brandKitId === kit.id && <CheckCircle2 className="size-4 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1" size="lg">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Button>
            <Button
              onClick={onSubmit}
              disabled={submitting}
              className="flex-1"
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Scissors className="mr-2 size-4" />
                  Generate {clipCount} Clip{clipCount !== 1 ? "s" : ""}
                </>
              )}
            </Button>
          </div>

          {plan === "free" && (
            <p className="text-center text-xs text-muted-foreground">
              Free clips include a subtle clypai.com watermark.{" "}
              <button
                type="button"
                onClick={() => setValue("plan", "pro")}
                className="text-primary underline-offset-4 hover:underline"
              >
                Upgrade to Pro
              </button>{" "}
              to remove it.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
