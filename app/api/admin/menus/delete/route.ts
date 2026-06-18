import { NextRequest, NextResponse } from "next/server";
import { kaleSupabase } from "../../../../../lib/kale-supabase";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const code = String(form.get("code") || request.cookies.get("kale_admin_code")?.value || "");
  const id = String(form.get("id") || "");

  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/delete_menu_with_code`, {
    method: "POST",
    headers: {
      apikey: kaleSupabase.publishableKey,
      Authorization: `Bearer ${kaleSupabase.publishableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input_code: code, input_id: id }),
  });

  const target = response.ok ? "/admin?ok=1" : "/admin?error=1";
  return NextResponse.redirect(new URL(target, request.url), { status: 303 });
}
