import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LegalContact() {
  return (
    <section className="mb-12 lg:mb-24 relative mx-auto w-full max-w-4xl">
      <div className="mx-auto max-w-3xl px-2 py-6 md:px-0 md:py-8">
        <h3 className="text-lg font-medium tracking-tight md:text-xl">
          Contact and Notices
        </h3>
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed md:text-base">
          For support, legal notices, data rights requests, or other inquiries,
          use our dedicated contact page.
        </p>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/new/contact">Open Contact Section</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
