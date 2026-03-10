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
    legal: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>();
const browserCollections = {
  blog: create.doc("blog", {"ai-video-editing-revolution.mdx": () => import("../content/blog/ai-video-editing-revolution.mdx?collection=blog"), "anatomy-of-a-viral-clip.mdx": () => import("../content/blog/anatomy-of-a-viral-clip.mdx?collection=blog"), "behind-the-build-moment-detection-model.mdx": () => import("../content/blog/behind-the-build-moment-detection-model.mdx?collection=blog"), "building-a-content-machine-infrastructure.mdx": () => import("../content/blog/building-a-content-machine-infrastructure.mdx?collection=blog"), "captions-are-not-optional-accessible-video.mdx": () => import("../content/blog/captions-are-not-optional-accessible-video.mdx?collection=blog"), "changelog-march-2026.mdx": () => import("../content/blog/changelog-march-2026.mdx?collection=blog"), "creator-economy-2026-state-of-the-market.mdx": () => import("../content/blog/creator-economy-2026-state-of-the-market.mdx?collection=blog"), "getting-started-with-clypai.mdx": () => import("../content/blog/getting-started-with-clypai.mdx?collection=blog"), "introducing-clypai-the-pulse-of-content.mdx": () => import("../content/blog/introducing-clypai-the-pulse-of-content.mdx?collection=blog"), "podcasters-need-short-form-video-strategy.mdx": () => import("../content/blog/podcasters-need-short-form-video-strategy.mdx?collection=blog"), "psychology-of-the-perfect-hook.mdx": () => import("../content/blog/psychology-of-the-perfect-hook.mdx?collection=blog"), "stream-to-feed-content-repurposing-playbook.mdx": () => import("../content/blog/stream-to-feed-content-repurposing-playbook.mdx?collection=blog"), "vertical-video-9x16-format-mastery.mdx": () => import("../content/blog/vertical-video-9x16-format-mastery.mdx?collection=blog"), }),
  legal: create.doc("legal", {"imprint.mdx": () => import("../content/legal/imprint.mdx?collection=legal"), "privacy-policy.mdx": () => import("../content/legal/privacy-policy.mdx?collection=legal"), "terms-of-service.mdx": () => import("../content/legal/terms-of-service.mdx?collection=legal"), }),
};
export default browserCollections;