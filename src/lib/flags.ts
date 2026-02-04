import { flag } from "flags/next";
 
export const comingSoonFlag = flag({
  key: 'coming-soon-flag',
  decide() {
    return true;
  },
});