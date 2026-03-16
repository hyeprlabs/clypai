import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactJobData {
  name: string;
  email: string;
  message: string;
}

export async function processContactJob(data: ContactJobData): Promise<void> {
  const { error } = await resend.emails.send({
    to: "clypai@hyeprlabs.com",
    template: {
      id: "contact",
      variables: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
}
