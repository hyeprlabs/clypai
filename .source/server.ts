// @ts-nocheck
import { frontmatter as __fd_glob_10 } from "../content/blog/video-content-automation-2026.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_9 } from "../content/blog/ultimate-podcast-clip-creation-guide.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_8 } from "../content/blog/twitch-streams-to-tiktok-content.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_7 } from "../content/blog/subtitle-strategies-video-engagement.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_6 } from "../content/blog/maximizing-social-media-reach-short-form.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_5 } from "../content/blog/long-form-to-short-form-guide.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_4 } from "../content/blog/launch.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_3 } from "../content/blog/future-content-creation-ai-workflows.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_2 } from "../content/blog/content-repurposing-guide.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_1 } from "../content/blog/building-content-library-strategy.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_0 } from "../content/blog/ai-transforming-video-editing.mdx?collection=blog&only=frontmatter"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
} & {
  DocData: {
    blog: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>({"doc":{"passthroughs":["extractedReferences","lastModified"]}});

export const blog = await create.docLazy("blog", "content/blog", {"ai-transforming-video-editing.mdx": __fd_glob_0, "building-content-library-strategy.mdx": __fd_glob_1, "content-repurposing-guide.mdx": __fd_glob_2, "future-content-creation-ai-workflows.mdx": __fd_glob_3, "launch.mdx": __fd_glob_4, "long-form-to-short-form-guide.mdx": __fd_glob_5, "maximizing-social-media-reach-short-form.mdx": __fd_glob_6, "subtitle-strategies-video-engagement.mdx": __fd_glob_7, "twitch-streams-to-tiktok-content.mdx": __fd_glob_8, "ultimate-podcast-clip-creation-guide.mdx": __fd_glob_9, "video-content-automation-2026.mdx": __fd_glob_10, }, {"ai-transforming-video-editing.mdx": () => import("../content/blog/ai-transforming-video-editing.mdx?collection=blog"), "building-content-library-strategy.mdx": () => import("../content/blog/building-content-library-strategy.mdx?collection=blog"), "content-repurposing-guide.mdx": () => import("../content/blog/content-repurposing-guide.mdx?collection=blog"), "future-content-creation-ai-workflows.mdx": () => import("../content/blog/future-content-creation-ai-workflows.mdx?collection=blog"), "launch.mdx": () => import("../content/blog/launch.mdx?collection=blog"), "long-form-to-short-form-guide.mdx": () => import("../content/blog/long-form-to-short-form-guide.mdx?collection=blog"), "maximizing-social-media-reach-short-form.mdx": () => import("../content/blog/maximizing-social-media-reach-short-form.mdx?collection=blog"), "subtitle-strategies-video-engagement.mdx": () => import("../content/blog/subtitle-strategies-video-engagement.mdx?collection=blog"), "twitch-streams-to-tiktok-content.mdx": () => import("../content/blog/twitch-streams-to-tiktok-content.mdx?collection=blog"), "ultimate-podcast-clip-creation-guide.mdx": () => import("../content/blog/ultimate-podcast-clip-creation-guide.mdx?collection=blog"), "video-content-automation-2026.mdx": () => import("../content/blog/video-content-automation-2026.mdx?collection=blog"), });