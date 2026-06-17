import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const code = String(form.get("code") || "");
  const response = NextResponse.redirect(new URL("/admin", request.url), { status: 303 });

  response.cookies.set("kale_admin_code", code, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
