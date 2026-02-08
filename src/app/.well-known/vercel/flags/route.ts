import { getProviderData, createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "/workspaces/clypai/src/lib/flags.ts";
 
export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});