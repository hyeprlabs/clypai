"use client"

import { Suspense } from "react";

import { motion } from "motion/react";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CategoryTabs } from "@/components/marketing/blog/category-tabs";

import { SearchBlogCommandDialog } from "@/components/marketing/blog/search-blog-command-dialog";

import { BackgroundGlow } from "@/components/marketing/background-glow";

import { BlogPosts } from "@/components/marketing/blog/blog-posts";

export default function Page() {
  return (
    <main className="overflow-hidden">

      <BackgroundGlow />

      <section>
        <div className="relative pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-16 md:pb-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <header className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              
              <motion.h1 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-6 sm:mt-8 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-md:font-semibold font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 py-1"
              >
                Blog
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <SearchBlogCommandDialog />
                <Button variant="outline" className="rounded-full" size="sm">
                  <Bell className="text-muted-foreground mr-2" />
                  Subscribe
                </Button>
              </motion.div>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="mb-10"
            >
              <Suspense>
                <CategoryTabs />
              </Suspense>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <Suspense>
                <BlogPosts />
              </Suspense>
            </motion.div>
            
          </div>
        </div>
      </section>
    </main>
  );
}