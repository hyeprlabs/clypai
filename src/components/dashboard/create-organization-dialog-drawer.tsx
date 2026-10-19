"use client";

import { authClient } from "@/lib/auth-client";

import * as React from "react";

import { LoaderCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { toast } from "sonner";

import slug from "slug";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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

function CreateOrganizationForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", slug: "" },
  });

  const [slugEdited, setSlugEdited] = React.useState(false);

  const watchedName = useWatch({ control: form.control, name: "name" });
  const watchedSlug = useWatch({ control: form.control, name: "slug" });

  React.useEffect(() => {
    if (!slugEdited) {
      form.setValue(
        "slug",
        slug(form.getValues("name"), { lower: true, trim: true }),
      );
    }
  }, [slugEdited, form, watchedName]);

  React.useEffect(() => {
    if (watchedSlug === "") {
      setSlugEdited(false);
    }
  }, [watchedSlug]);

  async function onSubmit(data: z.infer<typeof schema>) {
    const { error } = await authClient.organization.create({
      name: data.name,
      slug: data.slug,
      keepCurrentActiveOrganization: false,
    });

    if (error) {
      if (error.code === "ORGANIZATION_SLUG_ALREADY_TAKEN") {
        form.setError("slug", {
          message: "This slug is already taken.",
        });
        return;
      }
      toast.error("Couldn't create organization", {
        description: error.message,
      });
      return;
    }

    toast.success("Organization created!", { description: data.name });
    form.reset();
    onSuccess();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="name" className="text-muted-foreground">
                Name
              </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="Acme Corp."
                autoFocus
                className="rounded-md"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? "name-error" : undefined}
              />
              {fieldState.invalid && (
                <FieldError id="name-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="slug" className="text-muted-foreground">
                Slug
              </FieldLabel>
              <Input
                {...field}
                id="slug"
                type="text"
                placeholder="acme"
                className="rounded-md"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? "slug-error" : undefined}
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value === "") {
                    setSlugEdited(false);
                  } else {
                    setSlugEdited(true);
                  }
                }}
              />
              {fieldState.invalid && (
                <FieldError id="slug-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-6 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={form.formState.isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          )}
          Create
        </Button>
      </div>
    </form>
  );
}

export function CreateOrganizationDialogDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[375px] p-4 bg-linear-to-br from-background to-card">
          <DialogHeader>
            <DialogTitle className="font-sans text-lg font-semibold tracking-tight">
              Create Organization
            </DialogTitle>
            <DialogDescription>
              Set up a new organization for your workspace.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-sans text-lg font-semibold tracking-tight">
            Create Organization
          </DrawerTitle>
          <DrawerDescription>
            Set up a new organization for your workspace.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <CreateOrganizationForm
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
