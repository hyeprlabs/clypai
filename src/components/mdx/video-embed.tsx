import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  src: string;
  title?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  className?: string;
}

export function VideoEmbed({ 
  src, 
  title = "Video", 
  aspectRatio = "16/9",
  className 
}: VideoEmbedProps) {
  // Detect platform and normalize URL
  let embedUrl = src;
  
  // YouTube
  if (src.includes("youtube.com") || src.includes("youtu.be")) {
    const videoId = src.includes("youtu.be") 
      ? src.split("/").pop()?.split("?")[0]
      : new URL(src).searchParams.get("v");
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Vimeo
  if (src.includes("vimeo.com")) {
    const videoId = src.split("/").pop()?.split("?")[0];
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <figure className={cn("my-8", className)}>
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-muted/30"
        style={{ aspectRatio }}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {title && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

interface TweetEmbedProps {
  tweetId: string;
  className?: string;
}

export function TweetEmbed({ tweetId, className }: TweetEmbedProps) {
  return (
    <div className={cn("my-8 flex justify-center", className)}>
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/x/status/${tweetId}`}>Loading tweet...</a>
      </blockquote>
    </div>
  );
}
