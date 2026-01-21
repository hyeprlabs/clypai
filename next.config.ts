import { withWorkflow } from "workflow/next";
import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default withWorkflow(withBotId(nextConfig));