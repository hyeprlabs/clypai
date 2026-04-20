import type { Metadata } from "next";
import { company_name, email, name } from "@/lib/constants";
import {
  LegalDocumentSection,
  type LegalDocumentItem,
} from "@/components/new/legal-document-section";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Company ownership, contact details, and legal provider information for ClypAI.",
};

export default function Page() {
  return (
    <LegalDocumentSection
      title="Imprint"
      description="Legal provider information for operating this website and platform."
      updatedAt="April 20, 2026"
      items={imprintItems}
      contactHref={`mailto:${email}`}
      contactLabel={`Contact ${name}`}
    />
  );
}

const imprintItems: LegalDocumentItem[] = [
  {
    title: "Service Provider",
    description: `${company_name} operates ${name} and is responsible for this service.`,
    points: [
      `${company_name}`,
      "Registered business details are available upon verified request.",
      "Primary business address is shared for legal and regulatory matters.",
    ],
  },
  {
    title: "Primary Contact",
    description:
      "For legal notices, complaints, or compliance inquiries, use the official contact channel below.",
    points: [
      `Email: ${email}`,
      "Requests are reviewed in the order they are received.",
      "Typical response time is within two business days.",
    ],
  },
  {
    title: "Content Responsibility",
    description:
      "The provider is responsible for first-party content on this site under applicable law.",
    points: [
      "Editorial and product content is maintained by the internal team.",
      "External links are reviewed at the time of publication.",
      "If unlawful content is identified, notify us for prompt review.",
    ],
  },
  {
    title: "Dispute Process",
    description:
      "Where required, we cooperate with recognized dispute channels and competent authorities.",
    points: [
      "Consumer complaints may be submitted using the contact address above.",
      "Each claim is assessed in good faith and with status updates.",
      "Further legal terms are defined in the Terms of Service.",
    ],
  },
];
