import * as z from "zod";
import { FatalError } from "workflow";

const schema = z.email();

export async function validateEmail(email: string) {
  "use step";

  const { success } = await schema.safeParseAsync(email);
  
  if (!success) {
    throw new FatalError("Invalid email address");
  }
}