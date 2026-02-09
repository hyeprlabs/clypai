import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Simplified MDX components - most styling now handled by rehype plugins
const components: MDXComponents = {
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

  // Enhanced blockquotes 
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-8 border-l-4 border-primary/40 bg-primary/5 pl-6 pr-4 py-4"
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
        <div className="flex-1 font-serif text-foreground/90 italic text-lg">{children}</div>
      </div>
    </blockquote>
  ),

  // Links with external handling
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

  // Enhanced horizontal rule
  hr: ({ ...props }) => (
    <hr
      className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}