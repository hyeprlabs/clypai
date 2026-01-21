import { getPost, getAllPosts } from "@/components/marketing/blog/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }
    
  return (
    <article className="max-w-2xl mx-auto py-16 px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <time className="text-gray-500 mt-2 block">{post.date}</time>
      </header>
      <div className="prose prose-neutral max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}