import Link from "next/link";

import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4">
      <div className="text-center space-y-8 max-w-2xl animate-in fade-in duration-500">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-serif font-normal font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
            Not Found
          </h1>
          <p className="font-mono text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/blog">
            <Button size="lg" className="rounded-full">
              View All Posts
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="rounded-full">
              Go Home
              <ArrowRightCircle />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}