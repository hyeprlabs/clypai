// @ts-nocheck
import { frontmatter as __fd_glob_2 } from "../content/legal/terms-of-service.mdx?collection=legal&only=frontmatter"
import { frontmatter as __fd_glob_1 } from "../content/legal/privacy-policy.mdx?collection=legal&only=frontmatter"
import { frontmatter as __fd_glob_0 } from "../content/blog/launch.mdx?collection=blog&only=frontmatter"
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

export const blog = await create.docLazy("blog", "content/blog", {"launch.mdx": __fd_glob_0, }, {"launch.mdx": () => import("../content/blog/launch.mdx?collection=blog"), });

export const legal = await create.docLazy("legal", "content/legal", {"privacy-policy.mdx": __fd_glob_1, "terms-of-service.mdx": __fd_glob_2, }, {"privacy-policy.mdx": () => import("../content/legal/privacy-policy.mdx?collection=legal"), "terms-of-service.mdx": () => import("../content/legal/terms-of-service.mdx?collection=legal"), });