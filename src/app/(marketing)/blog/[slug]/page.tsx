import { blog, getPageImage } from "@/lib/source";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BackgroundGlow } from "@/components/marketing/background-glow";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CallToAction } from "@/components/marketing/call-to-action";
import { useMDXComponents } from "@/mdx-components";
import { TocDropdown } from "@/components/blog/toc-dropdown";

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.data.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.getPage([slug]);

  if (!post) return notFound();

  return {
    title: post.data.name,
    description: post.data.description,
    openGraph: {
      title: post.data.name,
      description: post.data.description,
      type: "article",
      publishedTime: new Date(post.data.date).toISOString(),
      images: [
        {
          url: getPageImage(post).url,
          width: 1200,
          height: 630,
          alt: post.data.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.name,
      description: post.data.description,
      images: [getPageImage(post).url],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blog.getPage([slug]);

  if (!post) notFound();

  const { body: MDX, toc } = await post.data.load();
  const components = useMDXComponents();

  return (
    <main className="overflow-hidden">
      <BackgroundGlow />

      <section>
        <div className="relative pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-16 md:pb-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
          />

          <div className="container max-w-3xl mx-auto px-4 sm:px-6">
            <header className="flex flex-col items-center mb-10 text-center">
              <p className="text-muted-foreground text-sm leading-[1.6] font-mono mt-6 text-center">
                <time dateTime={new Date(post.data.date).toISOString()}>
                  {new Date(post.data.date).toLocaleDateString(undefined, {
                    dateStyle: "long",
                  })}
                </time>
              </p>

              <h1 className="mx-auto mt-6 sm:mt-8 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-md:font-semibold font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 py-1">
                {post.data.name}
              </h1>

              <p className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-sm sm:text-base text-muted-foreground font-mono px-4 sm:px-0">
                {post.data.description}
              </p>

              <div className="flex items-center gap-2 my-4">
                <Avatar className="size-6">
                  <AvatarImage
                    src={post.data.author.avatar.src}
                    alt={post.data.author.avatar.alt}
                  />
                  <AvatarFallback>{post.data.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {post.data.author.name}
                </span>
              </div>

              {post.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {post.data.tags.map((tag) => (
                    <Badge
                      variant="outline"
                      className="rounded-full bg-linear-to-br from-background to-card"
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {toc.length > 0 && (
              <div className="mb-10 flex items-center gap-3">
                <TocDropdown items={toc} />
              </div>
            )}

            <article
              className={[
                "blog-prose",
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-headings:font-serif prose-headings:scroll-mt-24 prose-headings:tracking-tight",
                "prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h4:mt-6",
                "prose-p:leading-relaxed",
                "prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-foreground/30 prose-a:transition-colors prose-a:font-medium",
                "prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
                "prose-pre:not-prose prose-pre:rounded-xl prose-pre:my-6",
                "prose-blockquote:border-l-2 prose-blockquote:border-foreground/20 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-6",
                "prose-ul:my-4 prose-ul:pl-5 prose-ol:my-4 prose-ol:pl-5 prose-li:my-1.5",
                "prose-hr:border-border prose-hr:my-8",
                "prose-img:rounded-xl prose-img:border prose-img:border-border",
                "prose-figure:my-8 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground",
                "[&_table]:not-prose",
              ].join(" ")}
            >
              <MDX components={components} />
            </article>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
