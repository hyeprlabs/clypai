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
  blog: create.doc("blog", {"ai-video-editing-revolution.mdx": () => import("../content/blog/ai-video-editing-revolution.mdx?collection=blog"), "content-repurposing-framework.mdx": () => import("../content/blog/content-repurposing-framework.mdx?collection=blog"), "creator-burnout-sustainable-system.mdx": () => import("../content/blog/creator-burnout-sustainable-system.mdx?collection=blog"), "launch.mdx": () => import("../content/blog/launch.mdx?collection=blog"), "mastering-subtitles.mdx": () => import("../content/blog/mastering-subtitles.mdx?collection=blog"), "podcasters-guide-to-clips.mdx": () => import("../content/blog/podcasters-guide-to-clips.mdx?collection=blog"), "psychology-viral-video.mdx": () => import("../content/blog/psychology-viral-video.mdx?collection=blog"), "short-form-content-strategy.mdx": () => import("../content/blog/short-form-content-strategy.mdx?collection=blog"), "social-media-algorithms.mdx": () => import("../content/blog/social-media-algorithms.mdx?collection=blog"), "streamer-multiplatform-playbook.mdx": () => import("../content/blog/streamer-multiplatform-playbook.mdx?collection=blog"), "video-seo-mastery.mdx": () => import("../content/blog/video-seo-mastery.mdx?collection=blog"), }),
};
export default browserCollections;