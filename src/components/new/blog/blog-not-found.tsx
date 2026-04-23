import Link from "next/link";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowLeftCircle, Home } from "lucide-react";

export function BlogNotFound() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <div className="flex h-screen items-center">
        <div>
          <FullWidthDivider />
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-heading text-8xl">404</EmptyTitle>
              <EmptyDescription>
                This blog post could not be found. It may have been moved,
                unpublished, or the URL is incorrect.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/blog">
                    <ArrowLeftCircle />
                    All Posts
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/">
                    <Home />
                    Go Home
                  </Link>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
          <FullWidthDivider />
        </div>
      </div>
    </div>
  );
}
