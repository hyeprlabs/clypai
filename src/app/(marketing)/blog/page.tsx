import Link from "next/link";

import Image from "next/image";

import { getAllPosts } from "@/components/marketing/blog/mdx";

import { Bell } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { CategoryTabs } from "@/components/marketing/blog/category-tabs";

import { SearchBlogCommandDialog } from "@/components/marketing/blog/search-blog-command-dialog";

export default function BlogIndex() {
  const posts = getAllPosts().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 py-32">
      <header className="mb-3 flex items-center justify-between">
        <h1 className="effect-font-styling font-serif text-[4rem] md:text-[4.8rem] tracking-[-0.01em] leading-[100%] effect-font-gradient mb-2 pb-3 text-balance">Blog</h1>

        <div className="flex items-center gap-3">
          <SearchBlogCommandDialog />
          <Button variant="outline" className="rounded-full" size="sm">
            <Bell className="text-muted-foreground" />
            Subscribe
          </Button>
        </div>
      </header>

      <CategoryTabs />

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-max gap-6 items-stretch">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <Card className="p-0 bg-linear-to-br from-background to-muted/50 hover:from-muted/50 hover:to-background transition-colors">
              <CardHeader className="p-3">
                {post.image && (
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  )}
                <time className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  {post.date}
                </time>
                <CardTitle className="text-3xl font-serif font-normal">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}