import { blog } from "@/lib/source";

import { notFound } from "next/navigation";

import { Metadata } from "next";

import { BackgroundGlow } from "@/components/marketing/background-glow";

import { Badge } from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

import { CallToAction } from "@/components/marketing/call-to-action";

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.data.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params

  const post = blog.getPage([slug]);

  if (!post) return notFound();

  return {
    title: post.data.name,
    description: post.data.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = blog.getPage([slug]);

  if (!post) notFound();

  const { body: MDX } = await post.data.load();

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

            <header className="flex flex-col items-center mb-12 text-center">
              <p className="text-muted-foreground text-sm leading-[1.6] font-mono mt-6 text-center">
                <time dateTime={new Date(post.data.date).toISOString()}>
                  {new Date(post.data.date).toLocaleDateString(undefined, {dateStyle: "long"})}
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
                  <AvatarImage src={post.data.author.avatar.src} alt={post.data.author.avatar.alt} />
                  <AvatarFallback>{post.data.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.data.author.name}</span>
              </div>

              {post.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {post.data.tags.map((tag) => (
                    <Badge variant="outline" className="rounded-full bg-linear-to-br from-background to-card" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:scroll-mt-20 prose-lg prose-p:leading-8 prose-li:leading-7 prose-headings:tracking-tight prose-a:font-semibold prose-blockquote:font-normal prose-blockquote:not-italic prose-code:font-mono prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border">
              <MDX />
            </article>
          </div>
        </div>
      </section>

      <CallToAction />

    </main>
  );
}