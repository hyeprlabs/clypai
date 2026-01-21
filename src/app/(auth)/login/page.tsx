import type { Metadata } from "next";

import Link from "next/link";

import { CircleArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your ClypAI Account.",
}

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  )
}