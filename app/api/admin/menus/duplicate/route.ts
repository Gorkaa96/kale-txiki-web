import { NextRequest, NextResponse } from "next/server";
import { kaleSupabase } from "../../../../../lib/kale-supabase";

type DuplicatedMenu = { id?: string } | DuplicatedMenu[];

function duplicatedId(data: DuplicatedMenu) {
  if (Array.isArray(data)) return data[0]?.id || "";
  return data?.id || "";
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const code = String(form.get("code") || request.cookies.get("kale_admin_code")?.value || "");
  const id = String(form.get("id") || "");

  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/duplicate_menu_with_code`, {
    method: "POST",
    headers: {
      apikey: kaleSupabase.publishableKey,
      Authorization: `Bearer ${kaleSupabase.publishableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input_code: code, input_id: id }),
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url), { status: 303 });
  }

  const duplicated = await response.json();
  const newId = duplicatedId(duplicated);
  const target = newId ? `/admin?edit=${newId}&ok=1` : "/admin?ok=1";

  return NextResponse.redirect(new URL(target, request.url), { status: 303 });
}
