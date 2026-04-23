import type { Metadata } from "next";
import { name } from "@/lib/constants";
import { Title } from "@/components/new/title";
import { ContactSection } from "@/components/new/contact/contact-section";
import { TestimonialsSection } from "@/components/new/testimonials-section";
import { CallToAction } from "@/components/new/cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the ClypAI support team for product questions, feedback, or partnership inquiries.",
};

export default function Page() {
  return (
    <>
      <Title
        heading="Contact"
        description={`Contact the support team at ${name}.`}
      />
      <ContactSection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
