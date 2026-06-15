import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { PostTitle } from "@/components/new/blog/post-title";
import { NewsletterCTA } from "@/components/new/blog/newsletter-cta";
import { Post } from "@/components/new/blog/post";
import config from "@payload-config";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { getPayload } from "payload";

type BlogPost = {
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  title: string;
  slug: string;
  description: string;
  authorName?: string | null;
  authorImage?: {
    url?: string | null;
    alt?: string | null;
  } | null;
  content?: {
    root?: unknown;
  } | null;
};

function formatBlogContent(content?: BlogPost["content"]) {
  if (!content || typeof content !== "object") {
    return "";
  }

  return convertLexicalToHTML({
    data: content as Parameters<typeof convertLexicalToHTML>[0]["data"],
  });
}

async function getPublishedBlogPosts() {
  const payload: any = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    overrideAccess: false,
    pagination: false,
    sort: "-publishedAt",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return result.docs as BlogPost[];
}

async function getPublishedBlogPostBySlug(slug: string) {
  const payload: any = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      _status: {
        equals: "published",
      },
      slug: {
        equals: slug,
      },
    },
  });

  return (result.docs[0] as BlogPost | undefined) ?? null;
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) notFound();

  return {
    title: post.title,
    description: post.description ?? undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="mx-auto mb-12 w-full max-w-4xl lg:mb-24">
        <div className="relative">
          <div className="px-4 py-8 md:py-12">
            <PostTitle
              heading={post.title}
              description={post.description}
              authorName={post.authorName}
              authorImageUrl={post.authorImage?.url}
              authorImageAlt={post.authorImage?.alt}
            />
          </div>

          <FullWidthDivider contained />

          <Post
            createdAt={post.publishedAt ?? post.createdAt}
            contentHtml={formatBlogContent(post.content)}
          />

          <FullWidthDivider contained />
        </div>
      </section>
      <NewsletterCTA />
    </>
  );
}
