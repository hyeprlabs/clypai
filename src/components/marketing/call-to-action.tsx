import { ArrowRightCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="px-4 sm:px-6">
      <div className="my-20 relative mx-auto flex flex-col w-full max-w-3xl justify-between gap-y-4 px-4 py-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
        <Plus
          className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6"
          strokeWidth={1}
        />
        <Plus
          className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6"
          strokeWidth={1}
        />
        <Plus
          className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6"
          strokeWidth={1}
        />
        <Plus
          className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6"
          strokeWidth={1}
        />

        <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l border-dashed" />
        <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r border-dashed" />

        <div className="-inset-x-6 pointer-events-none absolute top-0 w-py border-t border-dashed" />
        <div className="-inset-x-6 pointer-events-none absolute bottom-0 w-py border-b border-dashed" />

        <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed" />

        <h2 className="text-center text-xl md:text-4xl font-serif">
          Join our Waitlist
        </h2>

        <p className="text-balance text-center font-mono text-muted-foreground text-sm md:text-base">
          Begin your 6-day free trial today to fully explore and experience all
          the features and benefits we offer.
        </p>

        <div className="flex items-center justify-center gap-2">
          <Link href="/">
            <Button className="rounded-full cursor-pointer">
              Join Waitlist
              <ArrowRightCircle className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}