import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";
import { withBotId } from "botid/next/config";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
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
      {
        source: "/status",
        destination: "https://clypai.openstatus.dev/",
        permanent: true,
      },
    ]
  },
  async rewrites() {
  	return [
    	{
        source: "/api/c15t/:path*",
        destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
      },
    ]
  },
};

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});

export default withWorkflow(withBotId(withMDX(nextConfig)));