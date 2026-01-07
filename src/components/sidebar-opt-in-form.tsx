"use client"

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { toast } from "sonner";

import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SidebarInput } from "@/components/ui/sidebar"

const schema = z.object({
  email: z.email("Please enter a valid email address."),
})

export function SidebarOptInForm() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      console.log("Opt-in request submitted! Email:", value)
      toast.success("Thank you for opting in! We'll be in touch soon.")
    },
    onSubmitInvalid: ({ formApi }) => {
      const errors = formApi.state.errors;
      if (errors) {
        const errorMessages: string[] = [];
        for (const fieldErrors of Object.values(errors)) {
          if (Array.isArray(fieldErrors)) {
            for (const error of fieldErrors) {
              if (error && typeof error === 'object' && 'message' in error) {
                errorMessages.push(String(error.message));
              }
            }
          }
        }
        if (errorMessages.length > 0) {
          toast.error(errorMessages[0]);
        }
      }
    },
  })

  return (
    <Card className="gap-2 py-4 shadow-none py-3">
      <CardHeader className="px-3">
        <CardTitle className="text-sm">Become a Beta Tester</CardTitle>
        <CardDescription>
          Opt-in to request early access to new features and help us improve ClypAI.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3">
        <form
          id="sidebar-opt-in-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <form.Field
            name="email"
          >
            {field => {
              const isInvalid = !field.state.meta.isValid;
              return (
                <div className="grid gap-2.5">
                  <div className="relative">
                    <SidebarInput
                      className="peer pe-9"
                      placeholder="Email"
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="email"
                    />
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <Mail aria-hidden="true" size={16} />
                    </div>
                  </div>
                  <Button
                    className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground w-full shadow-none"
                    size="sm"
                    type="submit"
                    form="sidebar-optin-form"
                  >
                    Request
                  </Button>
                </div>
              );
            }}
          </form.Field>
        </form>
      </CardContent>
    </Card>
  )
}