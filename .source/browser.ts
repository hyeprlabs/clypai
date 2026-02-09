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
  blog: create.doc("blog", {"launch.mdx": () => import("../content/blog/launch.mdx?collection=blog"), }),
  legal: create.doc("legal", {"privacy-policy.mdx": () => import("../content/legal/privacy-policy.mdx?collection=legal"), "terms-of-service.mdx": () => import("../content/legal/terms-of-service.mdx?collection=legal"), }),
};
export default browserCollections;