import { NextRequest, NextResponse } from "next/server";
import { kaleSupabase } from "../../../../../lib/kale-supabase";

function cleanDate(value: FormDataEntryValue | null) {
  const text = String(value || "");
  return text ? text : null;
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const code = request.cookies.get("kale_admin_code")?.value || String(form.get("code") || "");
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
      input_menu_date: cleanDate(form.get("menu_date")),
      input_period_label: String(form.get("period_label") || ""),
    }),
  });

  const target = response.ok ? "/admin?ok=1" : "/admin?error=1";
  return NextResponse.redirect(new URL(target, request.url), { status: 303 });
}
