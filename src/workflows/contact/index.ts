import { sendContactEmail } from "@/workflows/contact/steps/send-contact-email";
import { checkBot } from "@/workflows/contact/steps/check-bot";

export async function Contact(name: string, email: string, message: string) {
  "use workflow"

  await checkBot();
  await sendContactEmail(name, email, message);
}