import Link from "next/link";
import { AuthorInfo } from "@/components/new/blog/author-info";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";

type PostTitleProps = {
  heading: string;
  description?: string | null;
  authorName?: string | null;
  authorImageUrl?: string | null;
  authorImageAlt?: string | null;
};

export function PostTitle({
  heading,
  description,
  authorName,
  authorImageUrl,
  authorImageAlt,
}: PostTitleProps) {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="relative flex flex-col items-start justify-center gap-2 py-5 text-left sm:items-center sm:gap-2.5 sm:py-7 sm:text-center md:gap-3 md:py-10 lg:py-12">
        <Button asChild size="sm" variant="outline">
          <Link href="/new/blog">
            <ArrowLeftCircle />
            All Posts
          </Link>
        </Button>

        <h1
          className={cn(
            "w-full font-heading text-balance text-left text-2xl leading-[1.15] tracking-tight sm:text-center sm:text-3xl sm:leading-[1.12] md:text-4xl md:leading-[1.1] lg:text-5xl",
            "text-shadow-[0_0px_50px_theme(--color-foreground/.2)]",
          )}
        >
          {heading}
        </h1>

        {description ? (
          <p className="w-full max-w-none text-left text-foreground/80 text-xs leading-5 tracking-normal sm:mx-auto sm:max-w-[34ch] sm:text-center sm:text-sm sm:leading-6 sm:tracking-wide md:max-w-[40ch] md:text-base lg:max-w-[46ch] lg:text-lg">
            {description}
          </p>
        ) : null}

        <div
          className={cn(
            "flex w-full justify-start sm:w-auto sm:justify-center",
            description ? "pt-1 sm:pt-1.5 md:pt-2" : "pt-0.5 sm:pt-1",
          )}
        >
          <AuthorInfo
            name={authorName}
            src={authorImageUrl}
            alt={authorImageAlt}
          />
        </div>
      </div>
    </section>
  );
}
