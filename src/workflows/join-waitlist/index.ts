import { validateEmail } from "./steps/validate-email";
import { join } from "./steps/join";
import { sendWaitlistEmail } from "./steps/send-waitlist-email";
import { checkBot } from "./steps/check-bot";

export async function waitlistJoin(email: string) {
  "use workflow";

  await checkBot();

  await validateEmail(email);

  await join(email);

  await sendWaitlistEmail(email);
  
  return { 
    email: email, 
    status: "whitelisted",
  };
}