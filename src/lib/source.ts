import { blog as blogPosts } from "fumadocs-mdx:collections/server";
import { legal as legalPosts } from "fumadocs-mdx:collections/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { loader } from "fumadocs-core/source";

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});

export const legal = loader({
  baseUrl: "/legal",
  source: toFumadocsSource(legalPosts, []),
});