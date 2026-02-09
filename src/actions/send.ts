"use server"

import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY .env variable!");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistStatusChangeEmail(entry: {id: string, email: string, status: string}) {
  const { data, error } = await resend.emails.send({
    to: entry.email,
    template: {
      id: "waitlist-status-1",
      variables: {
        app_url: "https://clypai.com",
        email: entry.email,
        status: entry.status,
      },
    },
  });

  if (error) {
    console.error(`Failed to send waitlist status change email to ${entry.email}:`, error);
    throw new Error(`Email sending failed: ${error.message}`);
  }

  console.log(`Entry ${entry.id} status changed to ${entry.status}`);
  return { success: true, data };
}

export async function sendWaitlistJoinRequestEmail(request: {email: string, status: string, requestedAt: Date}) {
  const { data, error } = await resend.emails.send({
    to: request.email,
    template: {
      id: "waitlist-request",
      variables: {
        url: "/status?email=" + encodeURIComponent(request.email),
        status: request.status,
        requested_from: request.email,
        requested_at: request.requestedAt.toISOString(),
      },
    },
  });

  if (error) {
    console.error(`Failed to send waitlist join request email to ${request.email}:`, error);
    throw new Error(`Email sending failed: ${error.message}`);
  }

  console.log(`New request from ${request.email}`);
  return { success: true, data };
}