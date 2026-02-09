import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import * as z from "zod";

export const blog = defineCollections({
  type: "doc",
  dir: "./content/blog",
  async: true,
  schema: z.object({
    name: z.string(),
    description: z.string(),
    slug: z.string(),
    author: z.object({
      name: z.string().default("ClypAI"),
      avatar: z.object({
        src: z.url().or(z.string().regex(/^\//, "Path must be absolute (start with /)")),
        alt: z.string(),
      }),
    }),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    category: z.enum(["company", "product", "community"]).optional(),
    image: z.object({
      src: z.url().or(z.string().regex(/^\//, "Path must be absolute (start with /)")),
      alt: z.string(),
    }),
  }),
});


export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, {
        theme: 'github-dark',
        keepBackground: false,
      }],
    ],
  },
});