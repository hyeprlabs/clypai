import type React from "react";
import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

type HttpMethod = "GET" | "POST";

type Endpoint = {
  method: HttpMethod;
  path: string;
  description: string;
};

const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  POST: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

function EndpointCard({
  endpoint,
  className,
  ...props
}: React.ComponentProps<"div"> & { endpoint: Endpoint }) {
  return (
    <div
      className={cn(
        "group bg-background p-4 transition-colors hover:bg-muted/20 lg:p-5",
        className,
      )}
      {...props}
    >
      <div className="mb-2 flex items-center gap-2.5 font-mono text-xs">
        <span
          className={cn(
            "shrink-0 rounded px-1.5 py-0.5 font-bold uppercase tracking-wider",
            methodStyles[endpoint.method],
          )}
        >
          {endpoint.method}
        </span>
        <code className="truncate text-foreground/60 transition-colors group-hover:text-foreground">
          {endpoint.path}
        </code>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {endpoint.description}
      </p>
    </div>
  );
}

export function ApiEndpointsSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl",
        className,
      )}
      {...props}
    >
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" />

        <div className="mx-auto max-w-3xl py-6 text-center">
          <h2 className="font-heading text-balance text-2xl md:text-4xl lg:text-5xl">
            Endpoints
          </h2>
        </div>

        <div className="overflow-hidden border-x-0 border-t">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
            {endpoints.map((ep) => (
              <EndpointCard endpoint={ep} key={`${ep.method}${ep.path}`} />
            ))}
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

const endpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/v1/clips",
    description: "Create a clip job from a video URL.",
  },
  {
    method: "GET",
    path: "/v1/clips/{id}",
    description: "Poll status and fetch the output URL.",
  },
  {
    method: "GET",
    path: "/v1/clips",
    description: "List all clips with optional filters.",
  },
  {
    method: "POST",
    path: "/v1/clips/{id}/export",
    description: "Export a finished clip with custom settings.",
  },
  {
    method: "GET",
    path: "/v1/credits",
    description: "Check credit balance and usage history.",
  },
  {
    method: "POST",
    path: "/v1/webhooks",
    description: "Register a URL for real-time status events.",
  },
];
