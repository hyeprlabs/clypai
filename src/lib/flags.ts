import { flag } from "flags/next";
import { get } from "@vercel/edge-config";
 
export const whitelistFlag = flag<boolean>({
  key: "whitelist-flag",
  description: "enable/disable the whitelist mode.",
  defaultValue: false,
  options: [
    { value: true, label: "Enabled" },
    { value: false, label: "Disabled" }
  ],
  async decide() {
    return (await get("whitelist")) ?? false;
  },
});

export const maintenanceFlag = flag<boolean>({
  key: "maintenance-flag",
  description: "enable/disable the maintenance mode.",
  defaultValue: false,
  options: [
    { value: true, label: "Enabled" },
    { value: false, label: "Disabled" }
  ],
  async decide() {
    return (await get("maintenance")) ?? false;
  },
});

export const comingSoonFlag = flag<boolean>({
  key: "coming-soon-flag",
  description: "enable/disable the coming soon mode.",
  defaultValue: false,
  options: [
    { value: true, label: "Enabled" },
    { value: false, label: "Disabled" }
  ],
  async decide() {
    return (await get("coming-soon")) ?? false;
  },
});