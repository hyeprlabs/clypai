"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  Youtube,
  Scissors,
  Palette,
  Sparkles,
  Crown,
  Zap,
  Globe,
  MonitorSmartphone,
  Square,
  Monitor,
  CheckCircle2,
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

interface BrandKit {
  id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
}

const ASPECT_RATIOS = [
  {
    value: "9:16",
    label: "Vertical",
    sublabel: "TikTok, Reels, Shorts",
    icon: MonitorSmartphone,
  },
  {
    value: "1:1",
    label: "Square",
    sublabel: "Instagram Feed",
    icon: Square,
  },
  {
    value: "16:9",
    label: "Landscape",
    sublabel: "YouTube, Twitter",
    icon: Monitor,
  },
];

const CLIP_COUNTS = Array.from(
  { length: MAX_CLIP_COUNT },
  (_, i) => i + MIN_CLIP_COUNT
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

export function CreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [brandKits, setBrandKits] = useState<BrandKit[]>([]);
  const [loadingBrandKits, setLoadingBrandKits] = useState(true);

  // Form state
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [clipCount, setClipCount] = useState(3);
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "1:1" | "16:9">(
    "9:16"
  );
  const [plan, setPlan] = useState<"free" | "pro">("free");
  const [brandKitId, setBrandKitId] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");

  // URL validation
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    fetchBrandKits();
  }, []);

  async function fetchBrandKits() {
    try {
      const res = await fetch("/api/brand-kits");
      if (res.ok) {
        const data = await res.json();
        setBrandKits(data);
        if (data.length > 0) {
          setBrandKitId(data[0].id);
        }
      }
    } catch {
      // Silently fail - brand kits are optional
    } finally {
      setLoadingBrandKits(false);
    }
  }

  function validateUrl(url: string) {
    if (!url) {
      setUrlError("");
      return;
    }
    const isValid =
      url.includes("youtube.com/watch") ||
      url.includes("youtu.be/") ||
      url.includes("youtube.com/shorts");
    setUrlError(isValid ? "" : "Please enter a valid YouTube URL");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!youtubeUrl || urlError) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeUrl,
          clipCount,
          aspectRatio,
          plan,
          brandKitId,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to start processing");
      }

      toast.success("🎬 Processing started!", {
        description:
          "Your clips are being created. We'll notify you when they're ready.",
      });

      router.push(`/projects`);
    } catch (error) {
      toast.error("Failed to start processing", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* YouTube URL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Youtube className="size-4 text-red-500" />
            Source Video
          </CardTitle>
          <CardDescription>
            Paste a YouTube URL to extract viral clips from
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input
              id="youtube-url"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value);
                validateUrl(e.target.value);
              }}
              className={cn(urlError && "border-destructive")}
              required
            />
            {urlError && (
              <p className="text-destructive text-sm">{urlError}</p>
            )}
            <p className="text-muted-foreground text-xs">
              Supports youtube.com/watch, youtu.be, and youtube.com/shorts
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Clip Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Scissors className="size-4" />
            Clip Settings
          </CardTitle>
          <CardDescription>
            Configure how many clips to generate and their format
          </CardDescription>
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
                  onClick={() => setClipCount(count)}
                  className={cn(
                    "flex h-9 w-12 items-center justify-center rounded-md border text-sm font-medium transition-all",
                    clipCount === count
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-input"
                  )}
                >
                  {count}
                </button>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">
              AI will find the {clipCount} most viral-worthy moment
              {clipCount !== 1 ? "s" : ""}
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
                    onClick={() =>
                      setAspectRatio(ar.value as "9:16" | "1:1" | "16:9")
                    }
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-all",
                      aspectRatio === ar.value
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-background hover:bg-muted border-input text-foreground"
                    )}
                  >
                    <Icon className="size-5" />
                    <div>
                      <p className="text-xs font-medium">{ar.label}</p>
                      <p className="text-muted-foreground text-[10px]">
                        {ar.sublabel}
                      </p>
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
            <Select value={language} onValueChange={setLanguage}>
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
          <CardDescription>
            Apply your brand colors and caption style to all clips
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingBrandKits ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading brand kits...
            </div>
          ) : brandKits.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No brand kits found.{" "}
              <a
                href="/brand-kits"
                className="text-primary underline-offset-4 hover:underline"
              >
                Create one
              </a>{" "}
              to apply custom styling.
            </div>
          ) : (
            <div className="grid gap-2">
              {/* None option */}
              <button
                type="button"
                onClick={() => setBrandKitId(null)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                  brandKitId === null
                    ? "bg-primary/10 border-primary"
                    : "bg-background hover:bg-muted border-input"
                )}
              >
                <div className="size-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">No Brand Kit</p>
                  <p className="text-muted-foreground text-xs">
                    Use default white captions
                  </p>
                </div>
                {brandKitId === null && (
                  <CheckCircle2 className="size-4 text-primary" />
                )}
              </button>

              {brandKits.map((kit) => (
                <button
                  key={kit.id}
                  type="button"
                  onClick={() => setBrandKitId(kit.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                    brandKitId === kit.id
                      ? "bg-primary/10 border-primary"
                      : "bg-background hover:bg-muted border-input"
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
                    <p className="text-muted-foreground text-xs">
                      {kit.primary_color} · {kit.secondary_color}
                    </p>
                  </div>
                  {brandKitId === kit.id && (
                    <CheckCircle2 className="size-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-4" />
            Plan
          </CardTitle>
          <CardDescription>
            Choose your processing tier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPlan("free")}
              className={cn(
                "flex flex-col gap-2 rounded-lg border p-4 text-left transition-all",
                plan === "free"
                  ? "bg-primary/10 border-primary"
                  : "bg-background hover:bg-muted border-input"
              )}
            >
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-yellow-500" />
                <span className="font-medium text-sm">Free</span>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• AI clip detection</li>
                <li>• Auto captions + emojis</li>
                <li className="text-orange-500 font-medium">• Watermark added</li>
              </ul>
            </button>

            <button
              type="button"
              onClick={() => setPlan("pro")}
              className={cn(
                "flex flex-col gap-2 rounded-lg border p-4 text-left transition-all",
                plan === "pro"
                  ? "bg-primary/10 border-primary"
                  : "bg-background hover:bg-muted border-input"
              )}
            >
              <div className="flex items-center gap-2">
                <Crown className="size-4 text-yellow-500" />
                <span className="font-medium text-sm">Pro</span>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• AI clip detection</li>
                <li>• Auto captions + emojis</li>
                <li className="text-green-500 font-medium">• No watermark</li>
              </ul>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading || !!urlError || !youtubeUrl}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Starting processing...
          </>
        ) : (
          <>
            <Scissors className="mr-2 size-4" />
            Generate {clipCount} Clip{clipCount !== 1 ? "s" : ""}
          </>
        )}
      </Button>

      {plan === "free" && (
        <p className="text-center text-xs text-muted-foreground">
          Free clips include a subtle clypai.com watermark.{" "}
          <button
            type="button"
            onClick={() => setPlan("pro")}
            className="text-primary underline-offset-4 hover:underline"
          >
            Upgrade to Pro
          </button>{" "}
          to remove it.
        </p>
      )}
    </form>
  );
}
