import type { Metadata } from "next";
import { basehub } from "basehub";
import { notFound } from "next/navigation";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { PostTitle } from "@/components/new/blog/post-title";
import { NewsletterCTA } from "@/components/new/blog/newsletter-cta";
import { Post } from "@/components/new/blog/post";

const BLOG_POST_QUERY = {
  blog: {
    __args: {
      first: 1,
    },
    item: {
      _title: true,
      _sys: {
        createdAt: true,
      },
      author: {
        name: true,
        untitled: {
          url: true,
          alt: true,
        },
      },
      content: {
        json: {
          content: true,
        },
        readingTime: true,
      },
      description: true,
    },
  },
};

async function getPost(slug: string) {
  const { blog } = await basehub().query({
    blog: {
      __args: {
        first: 1,
        filter: {
          slug: {
            eq: slug,
          },
        },
      },
      item: BLOG_POST_QUERY.blog.item,
    },
  });

  return blog?.item ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return {
    title: post._title,
    description: post.description ?? undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="mx-auto mb-12 w-full max-w-4xl lg:mb-24">
        <div className="relative">
          <div className="px-4 py-8 md:py-12">
            <PostTitle
              heading={post._title}
              description={post.description}
              authorName={post.author?.name}
              authorImageUrl={post.author?.untitled?.url}
              authorImageAlt={post.author?.untitled?.alt}
            />
          </div>

          <FullWidthDivider contained />

          <Post
            createdAt={post._sys?.createdAt}
            content={post.content?.json?.content}
            readingTime={post.content?.readingTime}
          />

          <FullWidthDivider contained />
        </div>
      </section>
      <NewsletterCTA />
    </>
  );
}
