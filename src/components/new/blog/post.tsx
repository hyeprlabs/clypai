import { DecorIcon } from "@/components/ui/decor-icon";
import { CopyUrlButton } from "@/components/new/blog/copy-url-button";
import { BookOpenText } from "lucide-react";

type PostProps = {
  createdAt?: string | null;
  contentHtml?: string | null;
};

const EMPTY_POST_CONTENT = "This post does not have published content yet.";

const CONTENT_CLASS_NAME =
  "space-y-5 text-base leading-relaxed tracking-wide text-foreground/85 md:text-lg [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_blockquote]:border-primary/40 [&_blockquote]:border-l-2 [&_blockquote]:bg-accent/40 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:italic [&_code]:rounded-sm [&_code]:bg-accent/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h1]:font-heading [&_h1]:text-3xl [&_h1]:tracking-tight [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:font-medium [&_h3]:text-xl [&_img]:rounded-lg [&_img]:border [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-relaxed [&_p]:text-foreground/85 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-accent/30 [&_pre]:p-4 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6";

function formatDate(date?: string | null) {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function PostMeta({
  readingTime,
  createdAt,
}: {
  readingTime?: number | null;
  createdAt?: string | null;
}) {
  const formattedDate = formatDate(createdAt);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
          <BookOpenText className="size-3.5" />
          {readingTime ?? 0} min read
        </span>
        <CopyUrlButton />
      </div>

      {formattedDate ? (
        <span className="text-muted-foreground text-xs uppercase tracking-wider">
          {formattedDate}
        </span>
      ) : null}
    </div>
  );
}

function estimateReadingTime(contentHtml?: string | null) {
  if (!contentHtml) {
    return null;
  }

  const words = contentHtml
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

export function Post({ createdAt, contentHtml }: PostProps) {
  const fallbackReadingTime = estimateReadingTime(contentHtml);
  const resolvedContentHtml = contentHtml ?? "";

  return (
    <div className="relative p-4">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <PostMeta createdAt={createdAt} readingTime={fallbackReadingTime} />

      <div className={CONTENT_CLASS_NAME}>
        {resolvedContentHtml ? (
          <div dangerouslySetInnerHTML={{ __html: resolvedContentHtml }} />
        ) : (
          <p>{EMPTY_POST_CONTENT}</p>
        )}
      </div>
    </div>
  );
}
