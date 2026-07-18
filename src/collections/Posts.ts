import type { CollectionConfig } from "payload";
import { slugField } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    description: "Blog posts with versioning and draft support",
    defaultColumns: ["title", "publishedAt", "_status"],
  },
  access: {
    read: ({ req }) => {
      // Authenticated users see all posts; public sees only published
      if (req.user) {
        return true;
      }
      return {
        _status: {
          equals: "published",
        },
      };
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (!data) return data;

        const nextStatus = data._status ?? originalDoc?._status;
        if (
          nextStatus === "published" &&
          !data.publishedAt &&
          !originalDoc?.publishedAt
        ) {
          data.publishedAt = new Date().toISOString();
        }

        return data;
      },
    ],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        placeholder: "Enter post title",
      },
    },
    slugField({ useAsSlug: "title" }),
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        placeholder: "Brief summary for SEO and previews",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "authorName",
      type: "text",
      required: true,
      defaultValue: "ClypAI Team",
      admin: {
        width: "50%",
      },
    },
    {
      name: "authorImage",
      type: "upload",
      relationTo: "media",
      admin: {
        width: "50%",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Auto-set when status changes to published",
      },
    },
  ],
  timestamps: true,
};
