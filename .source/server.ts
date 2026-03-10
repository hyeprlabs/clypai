// @ts-nocheck
import { frontmatter as __fd_glob_15 } from "../content/legal/terms-of-service.mdx?collection=legal&only=frontmatter"
import { frontmatter as __fd_glob_14 } from "../content/legal/privacy-policy.mdx?collection=legal&only=frontmatter"
import { frontmatter as __fd_glob_13 } from "../content/legal/imprint.mdx?collection=legal&only=frontmatter"
import { frontmatter as __fd_glob_12 } from "../content/blog/vertical-video-9x16-format-mastery.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_11 } from "../content/blog/stream-to-feed-content-repurposing-playbook.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_10 } from "../content/blog/psychology-of-the-perfect-hook.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_9 } from "../content/blog/podcasters-need-short-form-video-strategy.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_8 } from "../content/blog/introducing-clypai-the-pulse-of-content.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_7 } from "../content/blog/getting-started-with-clypai.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_6 } from "../content/blog/creator-economy-2026-state-of-the-market.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_5 } from "../content/blog/changelog-march-2026.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_4 } from "../content/blog/captions-are-not-optional-accessible-video.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_3 } from "../content/blog/building-a-content-machine-infrastructure.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_2 } from "../content/blog/behind-the-build-moment-detection-model.mdx?collection=blog&only=frontmatter"
import { frontmatter as __fd_glob_1 } from "../content/blog/anatomy-of-a-viral-clip.mdx?collection=blog&only=frontmatter"
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
    legal: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>({"doc":{"passthroughs":["extractedReferences","lastModified"]}});

export const blog = await create.docLazy("blog", "content/blog", {"ai-video-editing-revolution.mdx": __fd_glob_0, "anatomy-of-a-viral-clip.mdx": __fd_glob_1, "behind-the-build-moment-detection-model.mdx": __fd_glob_2, "building-a-content-machine-infrastructure.mdx": __fd_glob_3, "captions-are-not-optional-accessible-video.mdx": __fd_glob_4, "changelog-march-2026.mdx": __fd_glob_5, "creator-economy-2026-state-of-the-market.mdx": __fd_glob_6, "getting-started-with-clypai.mdx": __fd_glob_7, "introducing-clypai-the-pulse-of-content.mdx": __fd_glob_8, "podcasters-need-short-form-video-strategy.mdx": __fd_glob_9, "psychology-of-the-perfect-hook.mdx": __fd_glob_10, "stream-to-feed-content-repurposing-playbook.mdx": __fd_glob_11, "vertical-video-9x16-format-mastery.mdx": __fd_glob_12, }, {"ai-video-editing-revolution.mdx": () => import("../content/blog/ai-video-editing-revolution.mdx?collection=blog"), "anatomy-of-a-viral-clip.mdx": () => import("../content/blog/anatomy-of-a-viral-clip.mdx?collection=blog"), "behind-the-build-moment-detection-model.mdx": () => import("../content/blog/behind-the-build-moment-detection-model.mdx?collection=blog"), "building-a-content-machine-infrastructure.mdx": () => import("../content/blog/building-a-content-machine-infrastructure.mdx?collection=blog"), "captions-are-not-optional-accessible-video.mdx": () => import("../content/blog/captions-are-not-optional-accessible-video.mdx?collection=blog"), "changelog-march-2026.mdx": () => import("../content/blog/changelog-march-2026.mdx?collection=blog"), "creator-economy-2026-state-of-the-market.mdx": () => import("../content/blog/creator-economy-2026-state-of-the-market.mdx?collection=blog"), "getting-started-with-clypai.mdx": () => import("../content/blog/getting-started-with-clypai.mdx?collection=blog"), "introducing-clypai-the-pulse-of-content.mdx": () => import("../content/blog/introducing-clypai-the-pulse-of-content.mdx?collection=blog"), "podcasters-need-short-form-video-strategy.mdx": () => import("../content/blog/podcasters-need-short-form-video-strategy.mdx?collection=blog"), "psychology-of-the-perfect-hook.mdx": () => import("../content/blog/psychology-of-the-perfect-hook.mdx?collection=blog"), "stream-to-feed-content-repurposing-playbook.mdx": () => import("../content/blog/stream-to-feed-content-repurposing-playbook.mdx?collection=blog"), "vertical-video-9x16-format-mastery.mdx": () => import("../content/blog/vertical-video-9x16-format-mastery.mdx?collection=blog"), });

export const legal = await create.docLazy("legal", "content/legal", {"imprint.mdx": __fd_glob_13, "privacy-policy.mdx": __fd_glob_14, "terms-of-service.mdx": __fd_glob_15, }, {"imprint.mdx": () => import("../content/legal/imprint.mdx?collection=legal"), "privacy-policy.mdx": () => import("../content/legal/privacy-policy.mdx?collection=legal"), "terms-of-service.mdx": () => import("../content/legal/terms-of-service.mdx?collection=legal"), });