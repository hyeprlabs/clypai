"use server"

import { start } from "workflow/api";
import { waitlistJoin } from "@/workflows/join-waitlist";

export async function joinWaitlist(email: string) {
  const run = await start(waitlistJoin, [email]);
  return { success: true, runId: run.runId };
}
