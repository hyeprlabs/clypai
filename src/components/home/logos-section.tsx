import { LogoCloud } from "@/components/home/logo-cloud"; // @efferd/logo-cloud-2
import { DecorIcon } from "@/components/home/decor-icon";
import { FullWidthDivider } from "@/components/home/full-width-divider";
import { Reveal, RevealItem } from "@/components/ui/reveal";

export function LogosSection() {
  return (
    <section className="mb-12">
      <Reveal>
        <RevealItem>
          <h2 className="font-heading py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
            Trusted by <span className="text-foreground">experts</span>
          </h2>
        </RevealItem>
        <div className="relative *:border-0">
          <DecorIcon className="size-4" position="top-left" />
          <DecorIcon className="size-4" position="top-right" />
          <DecorIcon className="size-4" position="bottom-left" />
          <DecorIcon className="size-4" position="bottom-right" />

          <FullWidthDivider className="-top-px" />
          <LogoCloud />
          <FullWidthDivider className="-bottom-px" />
        </div>
      </Reveal>
    </section>
  );
}
