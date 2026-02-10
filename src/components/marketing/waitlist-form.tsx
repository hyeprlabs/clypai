"use client"

import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Mail, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.email(),
});

export function WaitlistForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    const result = await authClient.waitlist.join({
      email: data.email,
    })

    if (result.error) {
      console.log(result.error)
      toast.error(result.error.message)
      return
    }
    
    console.log(result)
    toast.success(`${result.data.email} requested Waitlist!`)
    form.reset()
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <form id="waitlist" onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-auto">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="relative">
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Email"
                  autoComplete="off"
                  className="peer pe-9 min-w-[250px] rounded-full"
                />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Mail aria-hidden="true" size={16} />
                </div>
              </div>
              {fieldState.invalid && (
                <div className="absolute left-0 top-full mt-1">
                  <FieldError errors={[fieldState.error]} />
                </div>
              )}
            </Field>
          )}
        />
      </form>
      <Button
        type="submit"
        form="waitlist"
        className="w-full rounded-full group relative disabled:opacity-100 sm:w-auto"
        data-loading={form.formState.isSubmitting || undefined}
        disabled={form.formState.isSubmitting}
      >
        <span className="group-data-loading:text-transparent group-data-submit-success:text-transparent">
          Join Waitlist
        </span>
        {form.formState.isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircle
              aria-hidden="true"
              className="animate-spin"
              size={16}
            />
          </div>
        )}
      </Button>
    </div>
  );
}