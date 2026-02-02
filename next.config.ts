import { withWorkflow } from "workflow/next";
import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: "/x",
        destination: "https://go.hyeprlabs.com/clypai-x",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://go.hyeprlabs.com/clypai-instagram",
        permanent: true,
      },
      {
        source: "/tiktok",
        destination: "https://go.hyeprlabs.com/clypai-tiktok",
        permanent: true,
      },
    ]
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withWorkflow(withBotId(withMDX(nextConfig)));