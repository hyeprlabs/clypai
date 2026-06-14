import type { Metadata } from "next";
import {
  LegalArticle,
  type LegalArticleItem,
} from "@/components/new/legal/legal-article";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing account usage, subscriptions, acceptable use, and liability for ClypAI.",
};

export default function Page() {
  return (
    <LegalArticle
      title="Terms of Service"
      description="These terms govern use of the ClypAI website, applications, and services."
      updatedAt="April 20, 2026"
      items={termsItems}
    />
  );
}

const termsItems: LegalArticleItem[] = [
  {
    title: "Agreement to Terms",
    description:
      "By accessing or using ClypAI, you agree to these Terms of Service and incorporated policies.",
    points: [
      "You must be at least 18 or the age of majority in your jurisdiction.",
      "You are responsible for activity performed with your account credentials.",
      "If you do not agree to these terms, do not use the service.",
    ],
  },
  {
    title: "Accounts, Plans, and Billing",
    description:
      "Paid subscriptions renew automatically unless canceled before the next billing date.",
    points: [
      "Current plan details and limits are listed on the pricing page.",
      "Failed payments may result in reduced access or service suspension.",
      "Credits, overages, and usage limits follow the plan selected at purchase time.",
    ],
  },
  {
    title: "Acceptable Use and Restrictions",
    description:
      "You may not use ClypAI for unlawful, infringing, abusive, or deceptive activities.",
    points: [
      "Upload only content you are authorized to use.",
      "Do not attempt to disrupt, probe, or bypass platform security.",
      "Do not generate or distribute prohibited or harmful material.",
    ],
  },
  {
    title: "Intellectual Property and Licenses",
    description:
      "You keep rights to your content, while ClypAI retains rights to its software and branding.",
    points: [
      "You grant a limited license to process content for service delivery.",
      "ClypAI does not claim ownership of your uploaded media.",
      "Feedback may be used to improve the service without compensation.",
    ],
  },
  {
    title: "Disclaimers and Liability Limits",
    description:
      "To the extent permitted by law, ClypAI is not liable for indirect or consequential damages.",
    points: [
      "The platform is provided on an as-available basis.",
      "You are responsible for keeping backups of source files.",
      "Where enforceable, liability is limited to fees paid in the prior 12 months.",
    ],
  },
  {
    title: "Termination and Governing Terms",
    description:
      "We may suspend or terminate accounts for material violations, legal requirements, or security risk.",
    points: [
      "You may stop using the service at any time.",
      "Termination does not remove obligations accrued before termination.",
      "Governing law and venue are applied as required by enforceable local law.",
    ],
  },
];
