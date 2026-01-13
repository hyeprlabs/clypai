import { withWorkflow } from "workflow/next";
import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withWorkflow(withBotId(nextConfig));