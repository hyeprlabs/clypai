import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

export function ManifestoSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="p-6">
          <article
            aria-labelledby="manifesto-heading"
            className="mx-auto max-w-4xl text-muted-foreground"
          >
            <h2 className="sr-only" id="manifesto-heading">
              ClypAI Manifesto
            </h2>
            <p className="text-balance text-base leading-relaxed tracking-wide sm:text-lg">
              We&apos;ve all felt it. You look at a finished podcast or a
              marathon stream, knowing there are gold nuggets buried inside, but
              the thought of digging them out feels like a mountain you
              aren&apos;t ready to climb. You want to share your best moments,
              but instead, you&apos;re staring at a timeline, bogged down by the
              friction of manual editing. This is where the spark of creativity
              usually goes to die: in the tedious middle ground between
              recording and posting.
            </p>

            <p className="mt-6 text-balance text-base leading-relaxed tracking-wide sm:mt-8 sm:text-lg">
              While we crave the reach of short-form video, the process of
              getting there is broken. Scrubbing through hours of footage just
              to find one punchline or insight drains the energy you should be
              using to create. You get lost in the mechanics, syncing subtitles,
              repositioning frames, hunting for the right emoji, until the joy
              of sharing your message is replaced by the fatigue of the
              &quot;grind.&quot;
            </p>

            <p className="mt-6 text-balance text-base leading-relaxed tracking-wide sm:mt-8 sm:text-lg">
              But what if you could extract the viral potential of your content
              without the manual labor? Identify the hooks, without re-watching
              the whole session? Apply perfect subtitles, without typing a
              single word? Or reframe your best angles for vertical screens,
              without wrestling with complex software?
            </p>

            <div className="my-8 sm:my-12">
              <p
                className="font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-7xl"
                style={{ lineHeight: "1.1" }}
              >
                <span className="block ml-0">Say</span>
                <span className="block ml-8 sm:ml-10 md:ml-16 lg:ml-20">
                  hello to
                </span>
                <span className="block ml-2 my-1 text-4xl italic text-red-600 [text-shadow:0_0_30px_rgba(239,68,68,0.5),0_0_60px_rgba(239,68,68,0.3)] sm:ml-4 sm:text-5xl md:ml-10 md:text-6xl lg:ml-16 lg:text-8xl xl:text-9xl">
                  ClypAI,
                </span>
                <span className="block ml-10 sm:ml-16 md:ml-32 lg:ml-40">
                  your shortcut
                </span>
                <span className="block ml-6 sm:ml-8 md:ml-16 lg:ml-20">
                  to the feed.
                </span>
              </p>
            </div>

            <p className="mt-6 text-balance text-base leading-relaxed tracking-wide sm:mt-8 sm:text-lg">
              It allows you to transform long-form depth into short-form impact
              instantly. A new way of thinking about your content library, where
              your archives aren&apos;t just storage - they are a limitless
              source of engagement.
            </p>

            <p className="mt-6 text-balance text-base leading-relaxed tracking-wide sm:mt-8 sm:text-lg">
              Once you stop seeing editing as a chore, the scale of your brand
              changes. From turning a single Twitch stream into a week&apos;s
              worth of TikToks, to finding the exact moment a podcast guest
              dropped a truth bomb. By leveraging the world&apos;s best AI
              models, ClypAI does the heavy lifting of context-switching and
              curation for you. It&apos;s a fresh way of working that shifts the
              focus from the &quot;how&quot; to the &quot;what.&quot; Once you
              see your content through this lens, you can never go back.
              It&apos;s not even about making more clips... It&apos;s about
              making your voice heard.
            </p>

            <p className="mt-6 text-balance text-base leading-relaxed tracking-wide sm:mt-8 sm:text-lg">
              ClypAI is inspired by the efficiency of the modern creator, where
              speed is the ultimate competitive advantage. It&apos;s a vision of
              content creation where the tools serve the storyteller, not the
              other way around.
            </p>

            <p className="mt-6 text-balance text-base leading-relaxed tracking-wide sm:mt-8 sm:text-lg">
              The choice is yours: get buried in the timeline or start trending.
            </p>
          </article>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
