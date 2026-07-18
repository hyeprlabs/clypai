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
  try {
    const payload: any = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      depth: 1,
      select: {
        slug: true,
      },
      overrideAccess: false,
      pagination: false,
      sort: "-publishedAt",
    });

    const docs = Array.isArray(result?.docs) ? result.docs : [];
    return docs as Array<{ slug: string }>;
  } catch (err) {
    // Avoid failing static generation when the posts table is not available yet.
    // oxlint-disable-next-line no-console
    console.warn("Failed to load blog slugs for static params", err);
    return [];
  }
}

async function getPublishedBlogPostBySlug(slug: string) {
  try {
    const payload: any = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      depth: 1,
      limit: 1,
      select: {
        title: true,
        slug: true,
        description: true,
        authorName: true,
        authorImage: true,
        content: true,
        publishedAt: true,
        createdAt: true,
      },
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const docs = Array.isArray(result?.docs) ? result.docs : [];
    return (docs[0] as BlogPost | undefined) ?? null;
  } catch (err) {
    // Fail gracefully so missing tables or transient DB issues don't crash rendering.
    // oxlint-disable-next-line no-console
    console.warn(`Failed to load blog post for slug: ${slug}`, err);
    return null;
  }
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
