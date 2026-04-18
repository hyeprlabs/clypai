import type { Metadata } from "next";
import { Title } from "@/components/new/title";
import { BlogsSection } from "@/components/new/blog/blogs-section";
import { NewsletterCTA } from "@/components/new/blog/newsletter-cta";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Discover the latest trends and insights in the world of design and technology.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="Blog"
        description="Discover the latest trends and insights in the world of design and technology."
      />
      <BlogsSection />
      <NewsletterCTA />
    </>
  );
}
