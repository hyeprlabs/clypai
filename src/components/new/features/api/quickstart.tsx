"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
} from "@/components/ui/code-block";

type Language = "typescript" | "python" | "curl";

const tabs: { id: Language; label: string }[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "curl", label: "cURL" },
];

const tk = (cls: string) =>
  function T({ children }: { children: React.ReactNode }) {
    return <span className={cls}>{children}</span>;
  };
const L = ({ children }: { children: React.ReactNode }) => (
  <div className="whitespace-pre">{children}</div>
);
const Kw = tk("text-violet-500 dark:text-violet-400");
const Str = tk("text-emerald-600 dark:text-emerald-400");
const Fn = tk("text-amber-500 dark:text-amber-400");
const Vr = tk("text-sky-600 dark:text-sky-400");
const Nm = tk("text-orange-500 dark:text-orange-400");
const Pk = tk("text-foreground/40");
const Sh = tk("text-cyan-500 dark:text-cyan-400");
const Jk = tk("text-sky-600 dark:text-sky-400");
const Jv = tk("text-emerald-600 dark:text-emerald-400");
const Jn = tk("text-orange-500 dark:text-orange-400");
const Jb = tk("text-violet-500 dark:text-violet-400");

export function ApiQuickstartSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [active, setActive] = useState<Language>("typescript");

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
          <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
            Quick start
          </h2>
        </div>

        <div className="border-t">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  active === tab.id
                    ? "bg-gradient-to-b from-foreground to-foreground/80 text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
            <div className="bg-background p-4 lg:p-6">
              <CodeWindow
                filename={
                  active === "typescript"
                    ? "clip.ts"
                    : active === "python"
                      ? "clip.py"
                      : "terminal"
                }
              >
                {active === "typescript" && <TypescriptSnippet />}
                {active === "python" && <PythonSnippet />}
                {active === "curl" && <CurlSnippet />}
              </CodeWindow>
            </div>
            <div className="bg-background p-4 lg:p-6">
              <CodeWindow filename="response.json">
                <JsonSnippet />
              </CodeWindow>
            </div>
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

function CodeWindow({
  filename,
  children,
}: {
  filename: string;
  children: React.ReactNode;
}) {
  const language =
    filename === "terminal" ? "sh" : (filename.split(".").pop() ?? "");
  return (
    <CodeBlock className="border-border bg-card text-foreground shadow-none">
      <CodeBlockHeader className="border-border bg-muted/40">
        <CodeBlockGroup>
          <CodeBlockIcon language={language} />
          <span>{filename}</span>
        </CodeBlockGroup>
      </CodeBlockHeader>
      <CodeBlockContent className="max-h-none overflow-x-auto bg-background p-4 text-xs leading-6 dark:bg-background">
        {children}
      </CodeBlockContent>
    </CodeBlock>
  );
}

function TypescriptSnippet() {
  return (
    <>
      <L>
        <Kw>import</Kw>
        {" { ClypAI } "}
        <Kw>from</Kw> <Str>{'"@clypai/sdk"'}</Str>
        <Pk>;</Pk>
      </L>
      <L>&nbsp;</L>
      <L>
        <Kw>const</Kw> <Vr>client</Vr>
        {" = "}
        <Kw>new</Kw> <Fn>ClypAI</Fn>
        <Pk>({"{"}</Pk>
      </L>
      <L>
        {"  "}
        <Vr>apiKey</Vr>
        <Pk>:</Pk> <Vr>process</Vr>
        <Pk>.</Pk>
        <Vr>env</Vr>
        <Pk>.</Pk>
        <Vr>CLYPAI_KEY</Vr>
      </L>
      <L>
        <Pk>{"}"}</Pk>
        <Pk>);</Pk>
      </L>
      <L>&nbsp;</L>
      <L>
        <Kw>const</Kw> <Vr>clip</Vr>
        {" = "}
        <Kw>await</Kw> <Vr>client</Vr>
        <Pk>.</Pk>
        <Vr>clips</Vr>
        <Pk>.</Pk>
        <Fn>create</Fn>
        <Pk>({"{"}</Pk>
      </L>
      <L>
        {"  "}
        <Vr>videoUrl</Vr>
        <Pk>:</Pk> <Str>{'"https://cdn.example.com/keynote.mp4"'}</Str>
        <Pk>,</Pk>
      </L>
      <L>
        {"  "}
        <Vr>duration</Vr>
        <Pk>:</Pk> <Nm>60</Nm>
        <Pk>,</Pk> <Vr>captions</Vr>
        <Pk>:</Pk> <Kw>true</Kw>
        <Pk>,</Pk> <Vr>format</Vr>
        <Pk>:</Pk> <Str>{'"9:16"'}</Str>
      </L>
      <L>
        <Pk>{"}"});</Pk>
      </L>
      <L>&nbsp;</L>
      <L>
        <Kw>const</Kw> <Vr>done</Vr>
        {" = "}
        <Kw>await</Kw> <Vr>clip</Vr>
        <Pk>.</Pk>
        <Fn>waitUntilDone</Fn>
        <Pk>();</Pk>
      </L>
      <L>
        <Vr>console</Vr>
        <Pk>.</Pk>
        <Fn>log</Fn>
        <Pk>(</Pk>
        <Vr>done</Vr>
        <Pk>.</Pk>
        <Vr>url</Vr>
        <Pk>);</Pk>
      </L>
    </>
  );
}

function PythonSnippet() {
  return (
    <>
      <L>
        <Kw>from</Kw> <Vr>clypai</Vr> <Kw>import</Kw> <Fn>ClypAI</Fn>
      </L>
      <L>&nbsp;</L>
      <L>
        <Vr>client</Vr>
        {" = "}
        <Fn>ClypAI</Fn>
        <Pk>(</Pk>
        <Vr>api_key</Vr>
        <Pk>=</Pk>
        <Str>{'"clypai_live_..."'}</Str>
        <Pk>)</Pk>
      </L>
      <L>&nbsp;</L>
      <L>
        <Vr>clip</Vr>
        {" = "}
        <Vr>client</Vr>
        <Pk>.</Pk>
        <Vr>clips</Vr>
        <Pk>.</Pk>
        <Fn>create</Fn>
        <Pk>(</Pk>
      </L>
      <L>
        {"    "}
        <Vr>video_url</Vr>
        <Pk>=</Pk>
        <Str>{'"https://cdn.example.com/keynote.mp4"'}</Str>
        <Pk>,</Pk>
      </L>
      <L>
        {"    "}
        <Vr>duration</Vr>
        <Pk>=</Pk>
        <Nm>60</Nm>
        <Pk>,</Pk> <Vr>captions</Vr>
        <Pk>=</Pk>
        <Kw>True</Kw>
        <Pk>,</Pk> <Vr>format</Vr>
        <Pk>=</Pk>
        <Str>{'"9:16"'}</Str>
      </L>
      <L>
        <Pk>)</Pk>
      </L>
      <L>&nbsp;</L>
      <L>
        <Vr>done</Vr>
        {" = "}
        <Vr>clip</Vr>
        <Pk>.</Pk>
        <Fn>wait_until_done</Fn>
        <Pk>()</Pk>
      </L>
      <L>
        <Fn>print</Fn>
        <Pk>(</Pk>
        <Vr>done</Vr>
        <Pk>.</Pk>
        <Vr>url</Vr>
        <Pk>)</Pk>
      </L>
    </>
  );
}

function CurlSnippet() {
  return (
    <>
      <L>
        <Sh>curl</Sh> <Pk>-X POST \</Pk>
      </L>
      <L>
        {"  "}
        <Str>https://api.clypai.com/v1/clips</Str> <Pk>\</Pk>
      </L>
      <L>
        {"  "}
        <Pk>-H</Pk> <Str>{'"Authorization: Bearer $CLYPAI_KEY"'}</Str>{" "}
        <Pk>\</Pk>
      </L>
      <L>
        {"  "}
        <Pk>-H</Pk> <Str>{'"Content-Type: application/json"'}</Str> <Pk>\</Pk>
      </L>
      <L>
        {"  "}
        <Pk>--data-raw</Pk>
        {" '"}
        <Pk>{"{"}</Pk>
      </L>
      <L>
        {"    "}
        <Str>{'"videoUrl"'}</Str>
        <Pk>:</Pk> <Str>{'"https://cdn.example.com/keynote.mp4"'}</Str>
        <Pk>,</Pk>
      </L>
      <L>
        {"    "}
        <Str>{'"duration"'}</Str>
        <Pk>:</Pk> <Nm>60</Nm>
        <Pk>,</Pk> <Str>{'"captions"'}</Str>
        <Pk>:</Pk> <Kw>true</Kw>
        <Pk>,</Pk> <Str>{'"format"'}</Str>
        <Pk>:</Pk> <Str>{'"9:16"'}</Str>
      </L>
      <L>
        {"  "}
        <Pk>{"}"}</Pk>
        {"'"}
      </L>
    </>
  );
}

function JsonSnippet() {
  return (
    <>
      <L>
        <Pk>{"{"}</Pk>
      </L>
      <L>
        {"  "}
        <Jk>{'"id"'}</Jk>
        <Pk>:</Pk> <Jv>{'"clip_abc123"'}</Jv>
        <Pk>,</Pk>
      </L>
      <L>
        {"  "}
        <Jk>{'"status"'}</Jk>
        <Pk>:</Pk> <Jv>{'"processing"'}</Jv>
        <Pk>,</Pk>
      </L>
      <L>
        {"  "}
        <Jk>{'"estimatedSeconds"'}</Jk>
        <Pk>:</Pk> <Jn>45</Jn>
        <Pk>,</Pk>
      </L>
      <L>
        {"  "}
        <Jk>{'"format"'}</Jk>
        <Pk>:</Pk> <Jv>{'"9:16"'}</Jv>
        <Pk>,</Pk>
      </L>
      <L>
        {"  "}
        <Jk>{'"captions"'}</Jk>
        <Pk>:</Pk> <Jb>true</Jb>
        <Pk>,</Pk>
      </L>
      <L>
        {"  "}
        <Jk>{'"createdAt"'}</Jk>
        <Pk>:</Pk> <Jv>{'"2026-04-14T10:30:00Z"'}</Jv>
      </L>
      <L>
        <Pk>{"}"}</Pk>
      </L>
    </>
  );
}
