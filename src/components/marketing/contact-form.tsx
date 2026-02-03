"use client"

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Form schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacy: z.boolean().refine((val) => val === true, {message: "You must agree to the Privacy Policy"}),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      privacy: false,
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Message sent successfully");
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        console.error(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      aria-label="Contact form"
    >
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Joe Smith"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <span className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="joe@example.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <span className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Hi, this is my message"
          className="field-sizing-content max-h-36 min-h-0 resize-none"
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <span className="text-sm text-destructive">
            {form.formState.errors.message.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 py-2">
        <div className="flex items-center gap-2">
          <Controller
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <Checkbox
                id="privacy"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <span className="text-sm font-normal">
            I agree to the{" "}
            <Link href="/legal/privacy-policy" className="text-primary underline">
              Privacy Policy
            </Link>
          </span>
        </div>
        {form.formState.errors.privacy && (
          <span className="text-sm text-destructive">
            {form.formState.errors.privacy.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="w-full rounded-full group relative disabled:opacity-100"
        data-loading={form.formState.isSubmitting || undefined}
        disabled={form.formState.isSubmitting}
      >
        <span className="group-data-loading:text-transparent">Send message</span>
        {form.formState.isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircleIcon
              aria-hidden="true"
              className="animate-spin"
              size={16}
            />
          </div>
        )}
      </Button>
    </form>
  );
}