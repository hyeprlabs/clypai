import { authClient } from "@/lib/auth-client";
import { FatalError } from "workflow";

export async function join(email: string) {
  "use step";
  
  const { error } = await authClient.waitlist.join({
    email: email,
  })

  if (error) {
    throw new FatalError(error.message ?? "Fatal Error"); 
  }
}