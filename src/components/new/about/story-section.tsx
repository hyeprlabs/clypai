import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

export function StorySection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <article
          aria-labelledby="about-story-heading"
          className="mx-auto max-w-4xl p-6 md:p-12"
        >
          <h2
            id="about-story-heading"
            className="font-heading text-balance text-2xl md:text-4xl lg:text-5xl"
          >
            Our Mission: Accessible Video Creation For All
          </h2>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            We are a team of creators, engineers, and storytellers passionate
            about the future of video content. We believe that creating
            compelling short-form video should be accessible to everyone, not
            just those with professional editing skills and hours to spare. Our
            mission is to empower creators by automating the tedious parts of
            video editing, so they can focus on what they do best: telling great
            stories.
          </p>
          <p className="mt-6 text-balance text-muted-foreground text-base leading-8 md:text-lg md:leading-9">
            ClypAI was born from the idea that technology should simplify
            creativity, not complicate it. We are building smart tools that
            understand content, find the most engaging moments, and prepare them
            for any social platform with a single click. The goal is simple:
            less time wrestling with timelines, more time publishing work you
            are proud of.
          </p>
        </article>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
