import { NextRequest, NextResponse } from "next/server";
import { start } from "workflow/api";
import { Contact } from "@/workflows/contact";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Start the workflow
    const run = await start(Contact, [name, email, message]);
    
    return NextResponse.json({ success: true, runId: run.runId });
  
} catch (error) {

    console.error("Contact error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}