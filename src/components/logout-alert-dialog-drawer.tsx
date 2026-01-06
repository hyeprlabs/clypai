"use client"

import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { toast } from "sonner";

export function LogoutAlertDialogDrawer() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const userName = session?.user.name;

  const handleLogout = async () => {
    await authClient.signOut({
	    fetchOptions: {
		    onSuccess: () => {
			    router.push("/");
          toast.success("Logged out!");
          console.log("Logged out! User: ", userName);
		    },
        onError: (error) => {
          toast.error("Error logging out! Please try again.");
          console.error("Error logging out! Error: ", error);
        },
	    },
    });
  };

  if (!isMobile) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <DropdownMenuItem variant="destructive" onSelect={e => e.preventDefault()}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[375px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Want to Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Hey {userName}, sure you want to Log out? You&apos;ll need to enter your
              credentials again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <DropdownMenuItem variant="destructive" onSelect={e => e.preventDefault()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Want to Log out?</DrawerTitle>
          <DrawerDescription>
            Hey {userName}, sure you want to Log out? You&apos;ll need to enter your
            credentials again.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button variant="destructive" onClick={handleLogout}>Log out</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}