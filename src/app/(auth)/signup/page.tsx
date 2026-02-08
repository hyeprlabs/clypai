import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an ClypAI Account.",
}

export default function Page() {
  return <SignupForm />;
}