// source.config.ts
import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import * as z from "zod";
var blog = defineCollections({
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
        alt: z.string()
      })
    }),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    category: z.enum(["company", "product", "community"]).optional(),
    image: z.object({
      src: z.url().or(z.string().regex(/^\//, "Path must be absolute (start with /)")),
      alt: z.string()
    })
  })
});
var source_config_default = defineConfig({
  plugins: [lastModified()]
});
export {
  blog,
  source_config_default as default
};
