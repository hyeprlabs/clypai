import { NextRequest, NextResponse } from "next/server";
import { contactQueue } from "@/lib/queue";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const job = await contactQueue.add("send", { name, email, message });

    return NextResponse.json({ success: true, jobId: job.id });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 },
    );
  }
}