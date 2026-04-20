import type { Metadata } from "next";
import { email, name } from "@/lib/constants";
import {
  LegalDocumentSection,
  type LegalDocumentItem,
} from "@/components/new/legal-document-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ClypAI collects, uses, stores, and protects personal data across the website and product.",
};

export default function Page() {
  return (
    <LegalDocumentSection
      title="Privacy Policy"
      description="This policy explains what data we collect and how we use and protect it."
      updatedAt="April 20, 2026"
      items={privacyItems}
      contactHref={`mailto:${email}`}
      contactLabel={`Contact ${name}`}
    />
  );
}

const privacyItems: LegalDocumentItem[] = [
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
    title: "How We Use Data",
    description:
      "Personal data is used to provide product features, secure accounts, process billing, and support users.",
    points: [
      "Enable clip generation, project management, and account operations.",
      "Monitor for abuse, fraud, and reliability incidents.",
      "Send transactional and service-related communications.",
    ],
  },
  {
    title: "Data Sharing",
    description:
      "We share personal data only with providers needed to operate ClypAI under contractual safeguards.",
    points: [
      "Infrastructure and hosting service providers.",
      "Authentication, payments, and communications vendors.",
      "Authorities when required by law.",
    ],
  },
  {
    title: "Retention and Security",
    description:
      "Data is retained only for operational, legal, and dispute-resolution needs, then deleted or de-identified.",
    points: [
      "Technical and organizational controls protect user data.",
      "Access is restricted to authorized team members.",
      "Deletion requests are honored subject to legal obligations.",
    ],
  },
  {
    title: "Your Privacy Rights",
    description:
      "Depending on your location, you may have rights to access, correct, export, or delete personal data.",
    points: [
      `Requests can be sent to ${email}.`,
      "Identity verification may be required before request fulfillment.",
      "You may also file complaints with your local data authority.",
    ],
  },
];
