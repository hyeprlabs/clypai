"use client"

import { authClient } from "@/lib/auth-client";

import * as React from "react";

import { Crown, CircleCheck } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { FieldError, FieldGroup, FieldSet, FieldLegend } from "@/components/ui/field";

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

import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const products = [
  {
    label: "Free",
    slug: "free",
    price: "$0 per month",
    features: [
      "Create unlimited projects.",
      "Add unlimited users and free viewers.",
      "Basic permissions.",
      "Community support."
    ]
  },
  {
    label: "Pro",
    slug: "pro",
    price: "$10 per month",
    features: [
      "Remove watermarks.",
      "Upload unlimited files.",
      "7-day money back guarantee.",
      "Advanced permissions."
    ]
  }
];

// Form schema
const schema = z.object({
  product: z.string().min(1, "You must select a plan."),
});

function UpgradeForm() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { product: products[0].slug },
    mode: "onChange"
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const organizationId = activeOrganization?.id;
    await authClient.checkout({
      slug: data.product,
      referenceId: organizationId
    });
    console.log("Change product clicked", data.product);
  }

  const watchedProduct = useWatch({ control: form.control, name: "product" }) || products[0].slug;
  const selectedProduct = products.find(p => p.slug === watchedProduct) ?? products[0];

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="flex flex-col gap-4">
        <Controller
          name="product"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldLegend className="font-normal">Plans</FieldLegend>
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
                className="gap-2"
              >
                {products.map((product) => (
                  <div
                    key={product.slug}
                    className="relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent"
                  >
                    <RadioGroupItem
                      aria-describedby={`${product.slug}`}
                      className="order-1 after:absolute after:inset-0"
                      id={`${product.slug}`}
                      value={product.slug}
                    />
                    <div className="grid grow gap-1">
                      <Label htmlFor={`${product.slug}`}>{product.label}</Label>
                      <p className="text-muted-foreground text-xs" id={`${product.slug}`}>
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />
        <div className="space-y-2">
          <p>
            <strong className="font-medium text-sm">Features:</strong>
          </p>
          <ul className="space-y-1 text-muted-foreground text-sm">
            {selectedProduct.features.map((feature) => (
              <li className="flex gap-2" key={feature}>
                <CircleCheck aria-hidden="true" className="mt-0.5 shrink-0 text-blue-500" size={16} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </FieldGroup>
      <Button className="w-full" type="submit">
        <Crown />
        Change plan
      </Button>
    </form>
  );
}

export function UpgradeDialogDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile();
  
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const organizationName = activeOrganization?.name || "your organization";

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[375px] p-4 bg-linear-to-br from-background to-card">
          <DialogHeader>
            <DialogTitle>Change your plan</DialogTitle>
            <DialogDescription>
              Pick one of the following plans for <span className="font-semibold">{organizationName}</span>.
            </DialogDescription>
          </DialogHeader>
          <UpgradeForm />
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
          <DrawerTitle>Change your plan</DrawerTitle>
          <DrawerDescription>
            Pick one of the following plans for <span className="font-semibold">{organizationName}</span>.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <UpgradeForm />
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