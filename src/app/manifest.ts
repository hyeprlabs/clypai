import type { MetadataRoute } from "next";

// Manifest
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ClypAI",
    short_name: "ClypAI",
    description: "#1 AI video clipping & editing tool.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
