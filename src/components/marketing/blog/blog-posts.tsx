"use client"

import Link from "next/link";

import Image from "next/image";

import { blog } from "@/lib/source";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useQueryState } from "nuqs";

export function BlogPosts() {
  const [category] = useQueryState("category", { defaultValue: "all" });

  const posts = blog
    .getPages()
    .filter((post) => category === "all" || post.data.category === category)
    .sort((a, b) => {
      const A = a.data.date;
      const B = b.data.date;
      return new Date(B).getTime() - new Date(A).getTime();
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {posts.map((post) => {
        // Generate OG image URL for blog grid
        const ogImageUrl = `/api/og?title=${encodeURIComponent(post.data.name)}&category=${encodeURIComponent(post.data.category || 'Blog')}&date=${encodeURIComponent(post.data.date.toString())}`;
        
        return (
          <Link
            key={post.data.slug}
            href={`/blog/${post.data.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={ogImageUrl}
                alt={post.data.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            
            <div className="space-y-3">

              <h3 className="text-xl leading-tight">
                {post.data.name}
              </h3>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Author author={post.data.author} />
                <span className="text-xs">·</span>
                <Time date={post.data.date} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function Author({ author }: { author: { name: string; avatar: { src: string; alt: string } } }) {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <Avatar className="size-5">
        <AvatarImage
          src={author.avatar.src}
          alt={author.avatar.alt}
        />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-xs">{author.name}</span>
  </div>
  );
}

function Time({ date }: { date: Date | string | number }) {
  return (
    <time className="text-xs">
      {new Date(date).toLocaleDateString("en-US", {dateStyle: "medium",})}
    </time>
  );
}