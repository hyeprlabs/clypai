import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createSupabaseAdmin();

    const { data: brandKits, error } = await supabase
      .from("brand_kits")
      .select("id, name, primary_color, secondary_color, logo_url")
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch brand kits" },
        { status: 500 }
      );
    }

    return NextResponse.json(brandKits ?? []);
  } catch (error) {
    console.error("Error fetching brand kits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
