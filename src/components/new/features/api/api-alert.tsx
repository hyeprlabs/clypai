import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { TriangleAlert } from "lucide-react";

export function ApiAlert() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="bg-background px-6 py-5 lg:px-8">
          <div className="flex flex-row gap-2 items-center rounded-md border border-amber-500/50 p-3 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/50">
            <TriangleAlert aria-hidden="true" className="size-5 shrink-0" />
            <p className="text-sm">
              The API is not yet available — all content on this page is
              placeholder.
            </p>
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
