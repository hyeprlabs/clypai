import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Callout, Note, Warning, Tip, Important, VideoEmbed, TweetEmbed } from "@/components/mdx";

// Custom components for enhanced MDX rendering
const components: MDXComponents = {
  // Custom components for MDX content
  Callout,
  Note,
  Warning,
  Tip,
  Important,
  VideoEmbed,
  TweetEmbed,
  
  // Enhanced images with captions
  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    return (
      <figure className="my-8 overflow-hidden rounded-xl border border-border bg-muted/30">
        <div className="relative aspect-video w-full">
          <Image
            src={src}
            alt={alt || ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            {...props}
          />
        </div>
        {alt && (
          <figcaption className="px-4 py-3 text-sm text-muted-foreground text-center border-t border-border/50">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },

  // Enhanced blockquotes with better styling
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-8 border-l-4 border-primary/40 bg-primary/5 pl-6 pr-4 py-4 italic text-lg not-italic"
      {...props}
    >
      <div className="flex items-start gap-3">
        <svg
          className="w-8 h-8 text-primary/40 flex-shrink-0 mt-1"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <div className="flex-1 font-serif text-foreground/90">{children}</div>
      </div>
    </blockquote>
  ),

  // Enhanced code blocks
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    return (
      <code
        className={cn(
          isInline
            ? "px-1.5 py-0.5 rounded-md bg-muted/60 text-primary font-mono text-sm border border-border/30"
            : "block p-4 rounded-lg bg-muted/30 border border-border text-sm overflow-x-auto font-mono",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  },

  // Enhanced pre blocks
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/30 p-4"
      {...props}
    >
      {children}
    </pre>
  ),

  // Enhanced headings with better hierarchy
  h1: ({ children, ...props }) => (
    <h1
      className="scroll-mt-20 font-serif text-4xl md:text-5xl font-bold mb-6 mt-12 first:mt-0 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2
      className="scroll-mt-20 font-serif text-3xl md:text-4xl font-bold mb-4 mt-10 first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      className="scroll-mt-20 font-serif text-2xl md:text-3xl font-semibold mb-3 mt-8 first:mt-0"
      {...props}
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }) => (
    <h4
      className="scroll-mt-20 font-serif text-xl md:text-2xl font-semibold mb-2 mt-6 first:mt-0"
      {...props}
    >
      {children}
    </h4>
  ),

  // Enhanced links
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/40 hover:decoration-primary/60 transition-colors font-medium"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  // Enhanced lists
  ul: ({ children, ...props }) => (
    <ul
      className="my-6 ml-6 list-disc space-y-2 [&>li]:pl-2 marker:text-primary/60"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol
      className="my-6 ml-6 list-decimal space-y-2 [&>li]:pl-2 marker:text-primary/60 marker:font-semibold"
      {...props}
    >
      {children}
    </ol>
  ),

  // Enhanced tables
  table: ({ children, ...props }) => (
    <div className="my-8 w-full overflow-x-auto">
      <table
        className="w-full border-collapse rounded-lg overflow-hidden border border-border"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th
      className="border border-border bg-muted/50 px-4 py-3 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      className="border border-border px-4 py-3"
      {...props}
    >
      {children}
    </td>
  ),

  // Enhanced paragraphs
  p: ({ children, ...props }) => (
    <p className="my-4 leading-7 text-foreground/90" {...props}>
      {children}
    </p>
  ),

  // Enhanced horizontal rule
  hr: ({ ...props }) => (
    <hr
      className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      {...props}
    />
  ),

  // Strong emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-foreground" {...props}>
      {children}
    </strong>
  ),

  // Emphasis
  em: ({ children, ...props }) => (
    <em className="italic text-foreground/90" {...props}>
      {children}
    </em>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}