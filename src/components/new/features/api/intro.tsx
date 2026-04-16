import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
} from "@/components/ui/code-block";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, Key01Icon } from "@hugeicons/core-free-icons";

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
const Cm = tk("italic text-muted-foreground/60");
const Pk = tk("text-foreground/40");

export function ApiIntroSection({
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

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          <div className="flex flex-col justify-between bg-background p-6 lg:p-8">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Developer API
              </p>
              <p className="mb-6 text-lg font-medium leading-snug">
                Automate your video workflow with one API.
              </p>
              <div className="grid grid-cols-3 gap-x-4 border-t pt-5">
                <Stat value="99.9%" label="Uptime SLA" />
                <Stat value="<500ms" label="P99 latency" />
                <Stat value="REST" label="Standard HTTP" />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>
                Read the docs{" "}
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  strokeWidth={2}
                  data-icon="inline-end"
                />
              </Button>
              <Button variant="outline">
                <HugeiconsIcon
                  icon={Key01Icon}
                  strokeWidth={2}
                  data-icon="inline-start"
                />
                Get API key
              </Button>
            </div>
          </div>

          <div className="flex items-center bg-background p-4 lg:p-6">
            <CodeBlock className="w-full border-border bg-card text-foreground shadow-none">
              <CodeBlockHeader className="border-border bg-muted/40">
                <CodeBlockGroup>
                  <CodeBlockIcon language="ts" />
                  <span>clip.ts</span>
                </CodeBlockGroup>
              </CodeBlockHeader>
              <CodeBlockContent className="max-h-none overflow-x-auto bg-background p-4 text-xs leading-6 dark:bg-background">
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
                  {"({ apiKey: "}
                  <Vr>process.env.CLYPAI_KEY</Vr>
                  {" });"}
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
                  <Pk>:</Pk>{" "}
                  <Str>{'"https://cdn.example.com/keynote.mp4"'}</Str>
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
                  <Cm>
                    {
                      '// → clip.id: "clip_abc123"  |  clip.status: "processing"'
                    }
                  </Cm>
                </L>
              </CodeBlockContent>
            </CodeBlock>
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-bold tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
