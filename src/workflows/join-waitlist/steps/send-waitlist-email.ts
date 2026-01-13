import { FatalError, RetryableError, getStepMetadata } from "workflow";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(email: string) {
  "use step";
  
  const { stepId } = getStepMetadata();

  const { error } = await resend.emails.send(
    {
      to: email,
      template: { id: "waitlist-confirmation" },
    },
    {
      headers: {
        "Idempotency-Key": stepId,
      },
    }
  );

  if (error) {
    if (error.statusCode === 429) {
      throw new RetryableError(error.message, { 
        retryAfter: "2m", // 2 minutes
      }); 
    }
  
    throw new FatalError(error.message);
  }
}

sendWaitlistEmail.maxRetries = 5;