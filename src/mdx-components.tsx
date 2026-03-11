import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function useMDXComponents(): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    Callout,
    InlineTOC,
    Card,
    Cards,
    Alert,
    AlertTitle,
    AlertDescription,
  } as MDXComponents;
}