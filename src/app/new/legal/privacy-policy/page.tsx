import type { Metadata } from "next";
import { email, name } from "@/lib/constants";
import {
  LegalArticle,
  type LegalArticleItem,
} from "@/components/new/legal/legal-article";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ClypAI collects, uses, stores, and protects personal data across the website and product.",
};

export default function Page() {
  return (
    <LegalArticle
      title="Privacy Policy"
      description="This policy explains what data we collect and how we use and protect it."
      updatedAt="April 20, 2026"
      items={privacyItems}
      contactHref={`mailto:${email}`}
      contactLabel={`Contact ${name}`}
    />
  );
}

const privacyItems: LegalArticleItem[] = [
  {
    title: "Data We Collect",
    description:
      "We collect account information, usage signals, and service metadata needed to run ClypAI.",
    points: [
      "Account data such as name, email, and login identifiers.",
      "Usage analytics including interactions, device, and browser details.",
      "Billing and subscription status from payment providers.",
    ],
  },
  {
    title: "Purposes of Processing",
    description:
      "Personal data is used to provide product features, secure accounts, process billing, and support users.",
    points: [
      "Enable clip generation, project management, and account operations.",
      "Monitor for abuse, fraud, and reliability incidents.",
      "Send transactional and service-related communications.",
    ],
  },
  {
    title: "Data Sharing and Processors",
    description:
      "We share personal data only with providers needed to operate ClypAI under contractual safeguards.",
    points: [
      "Infrastructure and hosting service providers.",
      "Authentication, payments, and communications vendors.",
      "Authorities when required by law.",
    ],
  },
  {
    title: "Retention and Security Controls",
    description:
      "Data is retained only for operational, legal, and dispute-resolution needs, then deleted or de-identified.",
    points: [
      "Technical and organizational controls protect user data.",
      "Access is restricted to authorized team members.",
      "Deletion requests are honored subject to legal obligations.",
    ],
  },
  {
    title: "International Transfers and Rights",
    description:
      "Depending on your location, you may have rights to access, correct, export, or delete personal data.",
    points: [
      "If data is transferred across borders, we apply contractual and technical safeguards.",
      `Requests can be sent to ${email}.`,
      "Identity verification may be required before request fulfillment.",
      "You may also file complaints with your local data authority.",
    ],
  },
  {
    title: "Children and Policy Updates",
    description:
      "The service is not directed to children under 13, and policy updates will be posted with a revised date.",
    points: [
      "If we learn that child data was submitted unlawfully, we will delete it.",
      "Material policy changes are communicated through product or website notices.",
      `Questions about this policy can be sent to ${email}.`,
    ],
  },
];
