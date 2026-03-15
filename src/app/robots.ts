import type { MetadataRoute } from "next";

// Robots
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: "https://clypai.com/sitemap.xml",
  };
}
