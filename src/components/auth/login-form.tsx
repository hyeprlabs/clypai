"use client"

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { 
  Eye, 
  EyeOff,
  Github, 
  LoaderCircle 
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import Link from "next/link";

import { ClypAIWordmark } from "../brand/logos";

const schema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be at most 64 characters."),
  rememberMe: z.boolean().optional().default(true),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isGitHubLoading, setIsGitHubLoading] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  })

  // Login with GitHub
  async function handleGitHub() {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/overview?provider=github",
        errorCallbackURL: "/login",
      },
      {
        onRequest: () => {
          setIsGitHubLoading(true);
          console.log("Logging in with GitHub...");
        },
        onSuccess: () => {
          setIsGitHubLoading(false);
          toast.success("Logged in with GitHub!")
          console.log("Logged in with GitHub!");
        },
        onError: (error) => {
          setIsGitHubLoading(false);
          toast.error(error.error.message);
          console.error("Error logging in with GitHub! Error: ", error);
        },
      }
    )
  }

  // Sign in
  async function handleSignIn(data: z.infer<typeof schema>) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: "/overview"
      },
      {
        onRequest: () => {
          console.log("Logging in user: ", data.email);
        },
        onSuccess: () => {
          toast.success("Logged in!")
          console.log("Logged in! User: ", data.email);
        },
        onError: (error) => {
          toast.error(error.error.message);
          console.error("Error logging in! Error: ", error);
        },
      }
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link href="/">
              <ClypAIWordmark height={24} />
              <span className="sr-only">ClypAI</span>
            </Link>
            <h1 className="text-xl font-bold">Log in to your Account</h1>
            <FieldDescription className="font-mono">
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </FieldDescription>
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="alan.turing@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Your password"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                    className="pe-9"
                  />
                  <button
                    aria-controls="password"
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isPasswordVisible}
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={togglePasswordVisibility}
                    type="button"
                  >
                    {isPasswordVisible ? (
                      <EyeOff aria-hidden="true" size={16} />
                    ) : (
                      <Eye aria-hidden="true" size={16} />
                    )}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <Field>
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label
                      className="font-normal text-muted-foreground"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link className="text-sm underline-offset-4 hover:underline" href="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
              </Field>
            )}
          />
          <Field>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <LoaderCircle
                  aria-hidden="true"
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                />
              )}
              Log In
            </Button>
          </Field>
          <FieldSeparator>OR</FieldSeparator>
          <Field>
            <Button variant="outline" className="w-full" onClick={handleGitHub} disabled={isGitHubLoading}>
              {isGitHubLoading ? (
                <LoaderCircle aria-hidden="true" className="-ms-1 me-2 animate-spin" size={16} />
              ) : (
                <Github />
              )}
              Continue with GitHub
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center font-mono">
        By logging in, you agree to our <Link href="/legal/terms-of-service">Terms of Service</Link>{" "}
        and <Link href="/legal/privacy-policy">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}