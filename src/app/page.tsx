"use client"

import { ClypAIWordmark } from "@/components/brand/logos";
import { AtSignIcon, LoaderCircleIcon, CheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";

const schema = z.object({
  email: z.email("Please enter a valid email address."),
})

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setIsSuccess(false);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Email submitted:", value.email)
      toast.success("Thank you! We'll notify you when we launch.")
      
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      
      form.reset();
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
    <div 
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
      style={{
        backgroundImage: 'url(/background-auth.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative w-full max-w-3xl border border-zinc-800 bg-linear-to-br from-background to-card p-10 md:p-12">
        {/* Corner decorators */}
        <span className="absolute -left-px -top-px block size-3 border-l-2 border-t-2 border-white"></span>
        <span className="absolute -right-px -top-px block size-3 border-r-2 border-t-2 border-white"></span>
        <span className="absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 border-white"></span>
        <span className="absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 border-white"></span>

        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <ClypAIWordmark height={48} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif">
              Coming Soon
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              A revolutionary AI-powered platform designed to transform how teams collaborate, automate workflows, and unlock unprecedented productivity.
            </p>
          </div>

          <div className="w-full max-w-md space-y-3 pt-2">
            <p className="text-sm font-light text-muted-foreground">Get notified when we launch</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <form.Field name="email">
                {field => (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input 
                        className="peer h-11 bg-black ps-9 text-white placeholder:text-muted-foreground/50" 
                        placeholder="Enter your email" 
                        type="email"
                        name={field.name}
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <AtSignIcon aria-hidden="true" size={16} />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="group relative h-11 bg-white text-black hover:bg-gray-200 disabled:opacity-100"
                      data-loading={isLoading || undefined}
                      disabled={isLoading || isSuccess}
                    >
                      <span className={isLoading || isSuccess ? "text-transparent" : ""}>
                        Notify Me
                      </span>
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <LoaderCircleIcon
                            aria-hidden="true"
                            className="animate-spin"
                            size={16}
                          />
                        </div>
                      )}
                      {isSuccess && !isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckIcon
                            aria-hidden="true"
                            size={16}
                          />
                        </div>
                      )}
                    </Button>
                  </div>
                )}
              </form.Field>
            </form>
          </div>

          <div className="space-y-1.5 border-t border-zinc-800 pt-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">LAUNCHING</p>
            <p className="text-2xl font-light tracking-wider text-white">2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
