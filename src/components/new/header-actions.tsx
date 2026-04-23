"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDropdown } from "@/components/new/user-dropdown";

function Menu() {
  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm">
        <Link href="/overview">
          Dashboard
          <ArrowRight />
        </Link>
      </Button>
      <UserDropdown />
    </div>
  );
}

export function HeaderActions() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    );
  }

  if (session?.user) {
    return <Menu />;
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/signup">Get Started</Link>
      </Button>
    </div>
  );
}
