import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { AtIcon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

export function NewsletterCTA() {
  return (
    <div className="mb-12 lg:mb-24 relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 lg:border-x px-2 py-8 md:px-4">
      <FullWidthDivider className="-top-px" />

      <div className="space-y-1">
        <h2 className="text-center font-semibold text-2xl tracking-tight md:text-4xl">
          Subscripe to our newsletter
        </h2>
        <p className="text-balance text-center text-muted-foreground text-sm md:text-base">
          Get the latest updates and insights delivered right to your inbox.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
        <InputGroup>
          <InputGroupInput placeholder="Enter your email" />
          <InputGroupAddon>
            <HugeiconsIcon
              icon={AtIcon}
              strokeWidth={2}
              data-icon="inline-start"
            />
          </InputGroupAddon>
        </InputGroup>

        <Button className="w-full sm:w-auto">
          Subscribe{" "}
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            strokeWidth={2}
            data-icon="inline-end"
          />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <p className="text-muted-foreground text-sm">
          Written by{" "}
          <span className="font-medium text-foreground">creators</span>
        </p>
        <div className="flex -space-x-[0.45rem] *:rounded-full *:ring-2 *:ring-background">
          <img
            alt="Avatar 01"
            height={24}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=72"
            width={24}
          />
          <img
            alt="Avatar 02"
            height={24}
            src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?q=80&w=72"
            width={24}
          />
          <img
            alt="Avatar 03"
            height={24}
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=72"
            width={24}
          />
          <img
            alt="Avatar 04"
            height={24}
            src="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=72"
            width={24}
          />
        </div>
      </div>

      <FullWidthDivider className="-bottom-px" />
    </div>
  );
}
