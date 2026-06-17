import { NextResponse } from "next/server";
import { kaleSupabase } from "../../../../../lib/kale-supabase";

export async function POST(request: Request) {
  const form = await request.formData();
  const code = String(form.get("code") || "");
  const status = String(form.get("status") || "draft");

  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/insert_menu_with_code`, {
    method: "POST",
    headers: {
      apikey: kaleSupabase.publishableKey,
      Authorization: `Bearer ${kaleSupabase.publishableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input_code: code,
      input_menu_type: String(form.get("menu_type") || "daily"),
      input_title: String(form.get("title") || "Menú"),
      input_first_courses: String(form.get("first_courses") || ""),
      input_second_courses: String(form.get("second_courses") || ""),
      input_desserts: String(form.get("desserts") || ""),
      input_notes: String(form.get("notes") || ""),
      input_price: String(form.get("price") || ""),
      input_status: status,
    }),
  });

  const target = response.ok ? "/admin?ok=1" : "/admin?error=1";
  return NextResponse.redirect(new URL(target, request.url), { status: 303 });
}
