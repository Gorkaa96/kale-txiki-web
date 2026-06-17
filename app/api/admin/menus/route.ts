import { NextResponse } from "next/server";
import { kaleSupabase } from "../../../../lib/kale-supabase";

function codeFrom(request: Request) {
  return request.headers.get("x-admin-code") || "";
}

async function supabaseRpc(name: string, body: unknown) {
  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: {
      apikey: kaleSupabase.publishableKey,
      Authorization: `Bearer ${kaleSupabase.publishableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
}

export async function GET(request: Request) {
  const response = await supabaseRpc("list_menus_with_code", {
    input_code: codeFrom(request),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const response = await supabaseRpc("insert_menu_with_code", {
    input_code: codeFrom(request),
    input_menu_type: body.menu_type,
    input_title: body.title,
    input_first_courses: body.first_courses || null,
    input_second_courses: body.second_courses || null,
    input_desserts: body.desserts || null,
    input_notes: body.notes || null,
    input_price: body.price || null,
    input_status: body.status,
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
