import { NextResponse } from "next/server";
import { adminSessionCookieName, getAdminPath } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete(adminSessionCookieName);
  return response;
}

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL(getAdminPath(), request.url));
  response.cookies.delete(adminSessionCookieName);
  return response;
}
