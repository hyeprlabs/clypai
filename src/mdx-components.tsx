import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Card, Cards } from "fumadocs-ui/components/card";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { Callout } from "fumadocs-ui/components/callout";

export function useMDXComponents(): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    Card,
    Cards,
    InlineTOC,
    Callout,
  };
}