// @ts-nocheck
import { frontmatter as __fd_glob_10 } from "../content/blog/video-seo-mastery.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_9 } from "../content/blog/streamer-multiplatform-playbook.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_8 } from "../content/blog/social-media-algorithms.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_7 } from "../content/blog/short-form-content-strategy.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_6 } from "../content/blog/psychology-viral-video.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_5 } from "../content/blog/podcasters-guide-to-clips.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_4 } from "../content/blog/mastering-subtitles.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_3 } from "../content/blog/launch.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_2 } from "../content/blog/creator-burnout-sustainable-system.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_1 } from "../content/blog/content-repurposing-framework.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_0 } from "../content/blog/ai-video-editing-revolution.mdx?collection=blog&only=frontmatter"
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

export const blog = await create.docLazy("blog", "content/blog", {"ai-video-editing-revolution.mdx": __fd_glob_0, "content-repurposing-framework.mdx": __fd_glob_1, "creator-burnout-sustainable-system.mdx": __fd_glob_2, "launch.mdx": __fd_glob_3, "mastering-subtitles.mdx": __fd_glob_4, "podcasters-guide-to-clips.mdx": __fd_glob_5, "psychology-viral-video.mdx": __fd_glob_6, "short-form-content-strategy.mdx": __fd_glob_7, "social-media-algorithms.mdx": __fd_glob_8, "streamer-multiplatform-playbook.mdx": __fd_glob_9, "video-seo-mastery.mdx": __fd_glob_10, }, {"ai-video-editing-revolution.mdx": () => import("../content/blog/ai-video-editing-revolution.mdx?collection=blog"), "content-repurposing-framework.mdx": () => import("../content/blog/content-repurposing-framework.mdx?collection=blog"), "creator-burnout-sustainable-system.mdx": () => import("../content/blog/creator-burnout-sustainable-system.mdx?collection=blog"), "launch.mdx": () => import("../content/blog/launch.mdx?collection=blog"), "mastering-subtitles.mdx": () => import("../content/blog/mastering-subtitles.mdx?collection=blog"), "podcasters-guide-to-clips.mdx": () => import("../content/blog/podcasters-guide-to-clips.mdx?collection=blog"), "psychology-viral-video.mdx": () => import("../content/blog/psychology-viral-video.mdx?collection=blog"), "short-form-content-strategy.mdx": () => import("../content/blog/short-form-content-strategy.mdx?collection=blog"), "social-media-algorithms.mdx": () => import("../content/blog/social-media-algorithms.mdx?collection=blog"), "streamer-multiplatform-playbook.mdx": () => import("../content/blog/streamer-multiplatform-playbook.mdx?collection=blog"), "video-seo-mastery.mdx": () => import("../content/blog/video-seo-mastery.mdx?collection=blog"), });