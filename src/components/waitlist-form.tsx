"use client"

import { useState } from "react";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { 
  AtSignIcon,
  LoaderCircleIcon,
  CheckIcon
} from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { joinWaitlist } from "@/app/actions/join-waitlist";

const schema = z.object({
  email: z.email("Please enter a valid email address."),
});

export function WaitlistForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: schema },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setIsSuccess(false);
      
      try {
        await joinWaitlist(value.email);
        toast.success("Thank you! We'll notify you when we launch.");
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
        form.reset();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    onSubmitInvalid: ({ formApi }) => {
      const firstError = Object.values(formApi.state.errors)
        .flat()
        .find(err => err && typeof err === 'object' && 'message' in err);
      
      if (firstError) toast.error(String(firstError.message));
    },
  })

  const isDisabled = isLoading || isSuccess;

  return (
    <div className="w-full max-w-md space-y-3 pt-2">
      <p className="text-sm font-light text-muted-foreground">Get notified when we launch</p>
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
        <form.Field name="email">
          {(field) => (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input 
                  className="peer h-11 bg-black ps-9 text-white placeholder:text-muted-foreground/50" 
                  placeholder="Enter your email" 
                  type="email"
                  id="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground/80">
                  <AtSignIcon size={16} />
                </div>
              </div>
              <Button 
                type="submit" 
                className="relative h-11 bg-white text-black hover:bg-gray-200"
                disabled={isDisabled}
              >
                <span className={isDisabled ? "text-transparent" : ""}>Notify Me</span>
                {isLoading && (
                  <LoaderCircleIcon className="absolute animate-spin" size={16} />
                )}
                {isSuccess && !isLoading && (
                  <CheckIcon className="absolute" size={16} />
                )}
              </Button>
            </div>
          )}
        </form.Field>
      </form>
    </div>
  );
}
