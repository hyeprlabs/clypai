import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Vercel } from "@/components/ui/svgs/vercel";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Linear } from "@/components/ui/svgs/linear";
import { Slack } from "@/components/ui/svgs/slack";
import { Firebase } from "@/components/ui/svgs/firebase";
import { ClerkIconDark as Clerk } from "@/components/ui/svgs/clerk";
import { ClypAIWordmark } from "@/components/brand/logos";

export function Platforms() {
  return (
    <section className="@container bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <PlatformsIllustration />
        <div className="mx-auto mt-12 max-w-md text-balance text-center">
          <h2 className="font-serif text-4xl">
            Connect Your Social-Media Platforms
          </h2>
          <p className="text-muted-foreground mb-6 mt-4 text-balance font-mono text-sm">
            Seamlessly integrate with the social-media platforms you already use. Set up in
            minutes, not days.
          </p>
          <Link href="/features#platforms">
            <Button variant="outline" className="rounded-full bg-linear-to-br from-background to-card font-mono cursor-pointer">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

const PlatformsIllustration = () => {
  return (
    <div
      aria-hidden
      className="**:fill-foreground mx-auto flex h-44 max-w-lg flex-col justify-between"
    >
      <div className="@lg:px-6 relative flex h-10 items-center justify-between gap-12">
        <div className="bg-muted absolute inset-0 my-auto h-px"></div>

        <div className="bg-card shadow-black/6.5 ring-muted relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
          <Vercel className="size-3.5" />
        </div>
        <div className="bg-card shadow-black/6.5 ring-muted relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
          <Slack className="size-3.5" />
        </div>
      </div>
      <div className="@lg:px-24 relative flex h-10 items-center justify-between px-12">
        <div className="bg-muted absolute inset-0 my-auto h-px"></div>
        <div className="bg-linear-to-r mask-l-from-15% mask-l-to-40% mask-r-from-75% mask-r-to-75% from-primary absolute inset-0 my-auto h-px w-1/2 via-amber-500 to-pink-400"></div>
        <div className="bg-linear-to-r mask-r-from-15% mask-r-to-40% mask-l-from-75% mask-l-to-75% absolute inset-0 my-auto ml-auto h-px w-1/2 from-indigo-500 via-emerald-500 to-blue-400"></div>

        <div className="bg-card shadow-black/6.5 ring-muted relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
          <Clerk className="size-3.5" />
        </div>
        <div className="border-foreground/15 rounded-full border border-dashed p-2">
          <div className="bg-card shadow-black/6.5 ring-muted relative flex h-8 items-center rounded-full px-3 shadow-sm ring w-[100px]">
            <ClypAIWordmark className="h-4" />
          </div>
        </div>
        <div className="bg-card shadow-black/6.5 ring-muted relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
          <Linear className="size-3.5" />
        </div>
      </div>
      <div className="@lg:px-6 relative flex h-10 items-center justify-between gap-12">
        <div className="bg-muted absolute inset-0 my-auto h-px"></div>

        <div className="bg-card shadow-black/6.5 ring-muted relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
          <Supabase className="size-3.5" />
        </div>
        <div className="bg-card shadow-black/6.5 ring-muted relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
          <Firebase className="size-3.5" />
        </div>
      </div>
    </div>
  );
}