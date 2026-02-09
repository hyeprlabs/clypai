// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
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
}>();
const browserCollections = {
  blog: create.doc("blog", {"ai-transforming-video-editing.mdx": () => import("../content/blog/ai-transforming-video-editing.mdx?collection=blog"), "building-content-library-strategy.mdx": () => import("../content/blog/building-content-library-strategy.mdx?collection=blog"), "content-repurposing-guide.mdx": () => import("../content/blog/content-repurposing-guide.mdx?collection=blog"), "future-content-creation-ai-workflows.mdx": () => import("../content/blog/future-content-creation-ai-workflows.mdx?collection=blog"), "launch.mdx": () => import("../content/blog/launch.mdx?collection=blog"), "long-form-to-short-form-guide.mdx": () => import("../content/blog/long-form-to-short-form-guide.mdx?collection=blog"), "maximizing-social-media-reach-short-form.mdx": () => import("../content/blog/maximizing-social-media-reach-short-form.mdx?collection=blog"), "subtitle-strategies-video-engagement.mdx": () => import("../content/blog/subtitle-strategies-video-engagement.mdx?collection=blog"), "twitch-streams-to-tiktok-content.mdx": () => import("../content/blog/twitch-streams-to-tiktok-content.mdx?collection=blog"), "ultimate-podcast-clip-creation-guide.mdx": () => import("../content/blog/ultimate-podcast-clip-creation-guide.mdx?collection=blog"), "video-content-automation-2026.mdx": () => import("../content/blog/video-content-automation-2026.mdx?collection=blog"), }),
};
export default browserCollections;