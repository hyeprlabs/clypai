"use client"

import { useState } from "react";

import { PlusCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Label } from "@/components/ui/label";

import { useIsMobile } from "@/hooks/use-mobile";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "sonner";

import { useQueryState } from "nuqs";

interface Platform {
  id: string;
  name: string;
  slug: string;
  avatar: {
    src: string;
    alt: string;
  };
}

// Form schema
const schema = z.object({
  slug: z.string(),
});

export default function AddConnectionForm({ platforms, onSuccess }: { platforms: Platform[], onSuccess?: () => void }) {
  const [slug, setSlug] = useQueryState("platform", { 
    defaultValue: "tiktok",
    clearOnDefault: false 
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { slug },
  });

  const platform = platforms.find(p => p.slug === slug);

  async function onSubmit() {
    try {
      toast.success(`${platform?.name} connection added!`);
      onSuccess?.();
    } catch {
      toast.error("Failed to add connection");
    }
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="slug"
        control={form.control}
        render={({ field }) => (
        <RadioGroup className="gap-2" value={slug} onValueChange={(value) => {
          field.onChange(value);
          setSlug(value);
        }}>
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="relative flex w-full items-center gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
            >
              <RadioGroupItem
                className="order-1 after:absolute after:inset-0"
                id={platform.slug}
                value={platform.slug}
              />
              <div className="flex grow items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src={platform.avatar.src} alt={platform.avatar.alt} />
                  <AvatarFallback className="text-xs bg-background border border-dashed">
                    {platform.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Label htmlFor={platform.slug} className="text-muted-foreground font-mono text-sm">
                  {platform.name}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        )}
      />
      <Button className="w-full" type="submit">
        <PlusCircle />
        Add {platform?.name}
      </Button>
    </form>
  );
}

export function AddConnectionDialogDrawer({ children, platforms }: { children: React.ReactNode, platforms: Platform[] }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[375px] p-4 bg-linear-to-br from-background to-card">
          <DialogHeader>
            <DialogTitle>Add Connection</DialogTitle>
            <DialogDescription>
              Create a new connection to a social media platform.
            </DialogDescription>
          </DialogHeader>
          <AddConnectionForm platforms={platforms} />
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
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Connection</DrawerTitle>
          <DrawerDescription>
            Create a new connection to a social media platform.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <AddConnectionForm platforms={platforms} />
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