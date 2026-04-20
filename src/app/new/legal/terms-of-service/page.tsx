import type { Metadata } from "next";
import { email, name } from "@/lib/constants";
import {
  LegalDocumentSection,
  type LegalDocumentItem,
} from "@/components/new/legal-document-section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing account usage, subscriptions, acceptable use, and liability for ClypAI.",
};

export default function Page() {
  return (
    <LegalDocumentSection
      title="Terms of Service"
      description="These terms govern use of the ClypAI website, applications, and services."
      updatedAt="April 20, 2026"
      items={termsItems}
      contactHref={`mailto:${email}`}
      contactLabel={`Contact ${name}`}
    />
  );
}

const termsItems: LegalDocumentItem[] = [
  {
    title: "Agreement to Terms",
    description:
      "By accessing or using ClypAI, you agree to these terms and the policies referenced here.",
    points: [
      "You must be at least 18 or the age of majority in your jurisdiction.",
      "You are responsible for activity performed with your account credentials.",
      "If you do not agree to these terms, do not use the service.",
    ],
  },
  {
    title: "Subscriptions and Billing",
    description:
      "Paid subscriptions renew automatically unless canceled before the next billing cycle.",
    points: [
      "Current plan details and limits are listed on the pricing page.",
      "Failed payments may result in reduced access or service suspension.",
      "Credits and usage limits follow the plan selected at purchase time.",
    ],
  },
  {
    title: "Acceptable Use",
    description:
      "You may not use ClypAI for unlawful, infringing, abusive, or deceptive activities.",
    points: [
      "Upload only content you are authorized to use.",
      "Do not attempt to disrupt, probe, or bypass platform security.",
      "Do not generate or distribute prohibited or harmful material.",
    ],
  },
  {
    title: "Intellectual Property",
    description:
      "You keep rights to your content, while ClypAI retains rights to its software and branding.",
    points: [
      "You grant a limited license to process content for service delivery.",
      "ClypAI does not claim ownership of your uploaded media.",
      "Feedback may be used to improve the service without compensation.",
    ],
  },
  {
    title: "Liability Limits",
    description:
      "To the extent permitted by law, ClypAI is not liable for indirect or consequential damages.",
    points: [
      "The platform is provided on an as-available basis.",
      "You are responsible for keeping backups of source files.",
      "Where enforceable, liability is limited to fees paid in the prior 12 months.",
    ],
  },
];
