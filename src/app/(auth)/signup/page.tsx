import type { Metadata } from "next";

import Link from "next/link";

import { CircleArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an ClypAI Account.",
}

export default function Page() {
  return (
    <div
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
      style={{
        backgroundImage: "url(/background-auth.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-6 left-6">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link href="/">
            <CircleArrowLeft className="mr-2" />
            <span>Home</span>
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}