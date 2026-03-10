import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Card, Cards } from "fumadocs-ui/components/card";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";

import { BlogCallout } from "@/components/blog/blog-callout";
import {
  MdxTable,
  MdxThead,
  MdxTbody,
  MdxTr,
  MdxTh,
  MdxTd,
} from "@/components/blog/mdx-table";

export function useMDXComponents(): MDXComponents {
  return {
    ...defaultMdxComponents,

    // fumadocs layout components
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    Card,
    Cards,
    InlineTOC,

    // shadcn-based callout — replaces fumadocs Callout
    Callout: BlogCallout,

    // shadcn-based table elements
    table: MdxTable,
    thead: MdxThead,
    tbody: MdxTbody,
    tr: MdxTr,
    th: MdxTh,
    td: MdxTd,
  };
}