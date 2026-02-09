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
  blog: create.doc("blog", {"launch.mdx": () => import("../content/blog/launch.mdx?collection=blog"), }),
};
export default browserCollections;