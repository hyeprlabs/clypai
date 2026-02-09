"use client"

import { authClient } from "@/lib/auth-client";

import * as React from "react";

import { PlusCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { toast } from "sonner";

import slug from "slug";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

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
  name: z.string().min(3, "Name must be at least 3 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(/^[a-zA-Z0-9-]+$/, "Only letters, numbers and hyphens are allowed."),
});

function CreateOrganizationForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", slug: "" },
  });

  const [slugEdited, setSlugEdited] = React.useState(false);

  const watchedName = useWatch({ control: form.control, name: "name" });
  const watchedSlug = useWatch({ control: form.control, name: "slug" });

  React.useEffect(() => {
    if (!slugEdited) {
      form.setValue("slug", slug(form.getValues("name"), { lower: true, trim: true }));
    }
  }, [slugEdited, form, watchedName]);

  React.useEffect(() => {
    if (watchedSlug === "") {
      setSlugEdited(false);
    }
  }, [watchedSlug]);

  async function onSubmit(data: z.infer<typeof schema>) {
    const { data: session } = authClient.useSession();
    await authClient.organization.create({
      name: data.name,
      slug: data.slug,
      userId: session?.user.id,
      keepCurrentActiveOrganization: false
    });
    toast.success("Organization created!", { description: data.name });
    console.log("Organization created!", data.name);
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="flex flex-col gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel className="text-muted-foreground font-normal">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="Acme Corp."
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel className="text-muted-foreground font-normal">Slug</FieldLabel>
              <Input
                {...field}
                id="slug"
                type="text"
                placeholder="acme"
                aria-invalid={fieldState.invalid}
                onChange={e => {
                  field.onChange(e);
                  if (e.target.value === "") {
                    setSlugEdited(false);
                  } else {
                    setSlugEdited(true);
                  }
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit">
        <PlusCircle />
        Create Organization
      </Button>
    </form>
  );
}

export function CreateOrganizationDialogDrawer({ children }: { children: React.ReactNode }) {
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
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Set up a new organization for your workspace.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm />
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
          <DrawerTitle>Create Organization</DrawerTitle>
          <DrawerDescription>
            Set up a new organization for your workspace.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <CreateOrganizationForm />
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