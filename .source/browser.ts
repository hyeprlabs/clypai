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
  blog: create.doc("blog", {"introducing-clypai-the-pulse-of-content.mdx": () => import("../content/blog/introducing-clypai-the-pulse-of-content.mdx?collection=blog"), }),
  legal: create.doc("legal", {"imprint.mdx": () => import("../content/legal/imprint.mdx?collection=legal"), "privacy-policy.mdx": () => import("../content/legal/privacy-policy.mdx?collection=legal"), "terms-of-service.mdx": () => import("../content/legal/terms-of-service.mdx?collection=legal"), }),
};
export default browserCollections;