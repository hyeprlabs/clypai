export async function notification(request: { email: string, status: string, requestedAt: Date }) {

  if (!process.env.DISCORD_WEBHOOK_URL) {
    throw new Error("Missing DISCORD_WEBHOOK_URL .env variable!");
  }

  const payload = {
    embeds: [
      {
        author: {
          name: "ClypAI",
          icon_url: "https://clypai.com/apple-icon.png",
          url: "https://clypai.com",
        },
        title: "New Waitlist Join Request",
        description: `${request.email} requested to join the ClypAI whitelist.`,
        color: "#ffffff",
        fields: [
          {
            name: "Email",
            value: request.email,
            inline: true,
          },
          {
            name: "Status",
            value: request.status,
            inline: true,
          },
        ],
        footer: {
          text: "Review and approve or decline this request",
        },
        timestamp: request.requestedAt.toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Discord Webhook failed:", await response.text());
      throw new Error(`Discord webhook returned ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending Discord notification:", error);
    throw error;
  }
}