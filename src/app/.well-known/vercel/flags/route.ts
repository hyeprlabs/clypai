import { getProviderData, createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "@/lib/flags";
 
export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});