import type { Metadata } from "next";
import { company_name, email, name } from "@/lib/constants";
import {
  LegalArticle,
  type LegalArticleItem,
} from "@/components/new/legal/legal-article";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Company ownership, contact details, and legal provider information for ClypAI.",
};

export default function Page() {
  return (
    <LegalArticle
      title="Imprint"
      description="Legal provider information for operating this website and platform."
      updatedAt="April 20, 2026"
      items={imprintItems}
    />
  );
}

const imprintItems: LegalArticleItem[] = [
  {
    title: "Provider Identification",
    description: `${company_name} is the service provider and operator of ${name}.`,
    points: [
      `${company_name}`,
      "Commercial contact: clypai@hyeprlabs.com",
      "Registered entity details and business address are provided in legally required communications.",
    ],
  },
  {
    title: "Responsible Contact",
    description:
      "For legal notices, compliance questions, and rights requests, use the official channel below.",
    points: [
      `Email: ${email}`,
      "Notices are processed in the order received.",
      "Typical first response is within two business days.",
    ],
  },
  {
    title: "Editorial and Platform Responsibility",
    description:
      "The provider is responsible for first-party website and platform content under applicable law.",
    points: [
      "Product and editorial content is maintained by the internal team.",
      "External references are reviewed when published.",
      "Potentially unlawful content can be reported for prompt review and action.",
    ],
  },
  {
    title: "Regulatory and Dispute Handling",
    description:
      "Where required, we cooperate with competent authorities and recognized dispute channels.",
    points: [
      "Consumer complaints can be submitted via the contact address above.",
      "Claims are assessed in good faith and updated through the contact thread.",
      "Additional contractual details are provided in the Terms of Service.",
    ],
  },
];
