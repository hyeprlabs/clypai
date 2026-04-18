import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { HugeiconsIcon } from "@hugeicons/react";
import { QuoteDownIcon } from "@hugeicons/core-free-icons";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "ClypAI turned a 3-hour podcast into 12 clips in under 10 minutes. We went from drowning in raw footage to posting every single day.",
    name: "Jordan M.",
    role: "Podcast Host",
    company: "The Deep Dive Pod",
  },
  {
    quote:
      "I used to spend half my week on editing. ClypAI cut that down to nothing. The auto-captions alone saved my team hours of work.",
    name: "Priya S.",
    role: "Content Strategist",
    company: "Elevate Media",
  },
  {
    quote:
      "We scaled our Twitch highlights to TikTok in one weekend. ClypAI found the moments I would have completely missed.",
    name: "Alex T.",
    role: "Streamer & Creator",
  },
];

export function TestimonialsSection() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl place-content-center dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <FullWidthDivider />
      <div className="grid md:grid-cols-[2fr_1px_1fr]">
        <div className="divide-y">
          {testimonials.slice(0, 2).map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
        <div className="h-px bg-border md:h-auto" />
        <div className="flex items-center">
          <TestimonialCard testimonial={testimonials[2] as Testimonial} />
        </div>
      </div>
      <FullWidthDivider />
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, role, company } = testimonial;

  return (
    <figure className="p-6 md:p-8">
      <HugeiconsIcon
        icon={QuoteDownIcon}
        strokeWidth={2}
        aria-hidden="true"
        className="mb-4 size-12 stroke-1 text-muted-foreground"
      />

      <blockquote className="mb-6 font-normal text-base text-foreground md:text-lg">
        &quot;{quote}&quot;
      </blockquote>

      <figcaption className="flex flex-col gap-0.5">
        <cite className="font-medium text-foreground text-lg not-italic">
          {name}
        </cite>
        <p className="text-muted-foreground text-sm">
          {role}
          {company && `, ${company}`}
        </p>
      </figcaption>
    </figure>
  );
}
