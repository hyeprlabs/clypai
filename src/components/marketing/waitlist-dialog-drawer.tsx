"use client"

import * as React from "react";

import { MailIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";


// Form schema
const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

function WaitlistForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    toast.success("Subscribed!", { description: "You are on the list." });
    console.log("Subscribed!", data.email);
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="*:not-first:mt-2">
        <div className="relative">
          <Input
            className="peer ps-9"
            id="email"
            type="email"
            placeholder="hi@yourcompany.com"
            {...form.register("email")}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <MailIcon aria-hidden="true" size={16} />
          </div>
        </div>
      </div>
      <Button className="w-full" type="submit">
        Subscribe
      </Button>
      <p className="text-center text-muted-foreground text-xs">
          By subscribing you agree to our{" "}
          <a className="underline hover:no-underline" href="#">
            Privacy Policy
          </a>
          .
      </p>
    </form>
  );
}

export function WaitlistDialogDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[375px] p-4 bg-linear-to-br from-background to-card">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Never miss an update
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Subscribe to receive news and special offers.
            </DialogDescription>
          </DialogHeader>
          <WaitlistForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Never miss an update</DrawerTitle>
          <DrawerDescription className="text-center">
            Subscribe to receive news and special offers.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <WaitlistForm />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}