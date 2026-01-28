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
        destination: "https://x.com/clypai",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://instagram.com/clypai",
        permanent: true,
      },
      {
        source: "/tiktok",
        destination: "https://tiktok.com/@clypai",
        permanent: true,
      },
    ]
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withWorkflow(withBotId(withMDX(nextConfig)));