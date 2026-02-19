import { blog as blogPosts } from "fumadocs-mdx:collections/server";
import { legal as legalPosts } from "fumadocs-mdx:collections/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { loader } from "fumadocs-core/source";
import { type InferPageType } from "fumadocs-core/source";

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});

export function getPageImage(page: InferPageType<typeof blog>) {
  const segments = [...page.slugs, "image.png"];
  return {
    segments,
    url: `/og/blog/${segments.join('/')}`,
  };
}

export const legal = loader({
  baseUrl: "/legal",
  source: toFumadocsSource(legalPosts, []),
});

export function getLegalPageImage(page: InferPageType<typeof legal>) {
  const segments = [...page.slugs, "image.png"];
  return {
    segments,
    url: `/og/legal/${segments.join('/')}`,
  };
}