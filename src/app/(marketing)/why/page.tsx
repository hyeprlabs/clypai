"use client"

import { motion } from "motion/react";

import { CallToAction } from "@/components/marketing/call-to-action";
import { BackgroundGlow } from "@/components/marketing/background-glow";

export default function Page() {
  return (
    <main className="overflow-hidden">
      
      <BackgroundGlow />

      <section>
        <div className="relative pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-16 md:pb-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto mt-6 sm:mt-8 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-md:font-semibold font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 py-1"
              >
                The Pulse of Content
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                We&apos;ve all felt it. You look at a finished podcast or a marathon stream, knowing there are gold nuggets buried inside, but the thought of digging them out feels like a mountain you aren&apos;t ready to climb. You want to share your best moments, but instead, you&apos;re staring at a timeline, bogged down by the friction of manual editing. This is where the spark of creativity usually goes to die: in the tedious middle ground between recording and posting.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                While we crave the reach of short-form video, the process of getting there is broken. Scrubbing through hours of footage just to find one punchline or insight drains the energy you should be using to create. You get lost in the mechanics—syncing subtitles, repositioning frames, hunting for the right emoji—until the joy of sharing your message is replaced by the fatigue of the &quot;grind.&quot;
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                But what if you could extract the viral potential of your content without the manual labor? Identify the hooks, without re-watching the whole session? Apply perfect subtitles, without typing a single word? Or reframe your best angles for vertical screens, without wrestling with complex software?
              </motion.p>

              <div className="my-8 sm:my-12 px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif leading-tight text-left max-w-3xl mx-auto"
                  style={{ lineHeight: '1.1' }}
                >
                  <span className="block ml-0 sm:ml-2 md:ml-4">Say</span>
                  <span className="block ml-8 sm:ml-12 md:ml-20 lg:ml-28">hello to</span>
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl italic ml-4 sm:ml-6 md:ml-12 lg:ml-16 my-1 text-red-600 [text-shadow:0_0_30px_rgba(239,68,68,0.5),0_0_60px_rgba(239,68,68,0.3)]">
                    ClypAI,
                  </span>
                  <span className="block ml-10 sm:ml-16 md:ml-32 lg:ml-40">your shortcut</span>
                  <span className="block ml-6 sm:ml-8 md:ml-16 lg:ml-20">to the feed.</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                It allows you to transform long-form depth into short-form impact instantly. A new way of thinking about your content library, where your archives aren&apos;t just storage—they are a limitless source of engagement.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                Once you stop seeing editing as a chore, the scale of your brand changes. From turning a single Twitch stream into a week&apos;s worth of TikToks, to finding the exact moment a podcast guest dropped a truth bomb. By leveraging the world&apos;s best AI models, ClypAI does the heavy lifting of context-switching and curation for you. It&apos;s a fresh way of working that shifts the focus from the &quot;how&quot; to the &quot;what.&quot; Once you see your content through this lens, you can never go back. It&apos;s not even about making more clips... It&apos;s about making your voice heard.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                ClypAI is inspired by the efficiency of the modern creator—where speed is the ultimate competitive advantage. It&apos;s a vision of content creation where the tools serve the storyteller, not the other way around.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="mx-auto mt-8 sm:mt-12 max-w-xl text-balance text-lg sm:text-xl font-semibold text-foreground font-mono text-red-600 px-4 sm:px-0"
              >
                The choice is yours: get buried in the timeline or start trending.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                Visit <a href="https://clyp.ai" className="text-foreground underline decoration-foreground/30 hover:decoration-foreground transition-colors">clyp.ai</a> to turn your long-form into a legacy.
              </motion.p>

            </div>
          </div>
        </div>
      </section>

      <CallToAction />
      
    </main>
  );
}
