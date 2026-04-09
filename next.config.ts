import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";
import { withBotId } from "botid/next/config";

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
    ];
  },
};

export default withWorkflow(withBotId(nextConfig));
