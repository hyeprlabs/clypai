import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info, Link } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  YoutubeIcon,
  TiktokIcon,
  InstagramIcon,
  TwitchIcon,
  VimeoIcon,
  LinkedinIcon,
} from "@hugeicons/core-free-icons";

const platforms = [
  { label: "YouTube", icon: YoutubeIcon },
  { label: "TikTok", icon: TiktokIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "Twitch", icon: TwitchIcon },
  { label: "Vimeo", icon: VimeoIcon },
  { label: "LinkedIn", icon: LinkedinIcon },
];

export function PlatformsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon-sm" variant="outline" className="rounded-lg">
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={4} className="w-44 p-2">
        <p className="mb-1.5 px-2 text-xs text-muted-foreground">
          Supported platforms
        </p>
        <ul>
          {platforms.map(({ label, icon }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5"
            >
              <HugeiconsIcon
                icon={icon}
                strokeWidth={2}
                className="size-3.5 shrink-0 text-muted-foreground"
              />
              <span className="text-sm">{label}</span>
            </li>
          ))}
          <li className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <Link className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="text-sm">Direct link</span>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
