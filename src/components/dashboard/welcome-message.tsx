"use client"

import { authClient } from "@/lib/auth-client";

export function WelcomeMessage() {
  const { data: session } = authClient.useSession();

  const date = new Date();

  const hours = date.getHours();
  let greeting;

  switch (true) {
    case hours >= 5 && hours < 12:
      greeting = "Good morning";
      break;
    case hours >= 12 && hours < 18:
      greeting = "Good afternoon";
      break;
    case hours >= 18 && hours < 22:
      greeting = "Good evening";
      break;
    case hours >= 22 || hours < 5:
      greeting = "Good night";
      break;
    default:
      greeting = "Welcome";
      break;
  }

  if (!session) return null

  return (
    <h1 className="text-xl text-muted-foreground">
      {greeting}, <span className="text-primary">{session.user.name}</span>
    </h1>
  )
}
