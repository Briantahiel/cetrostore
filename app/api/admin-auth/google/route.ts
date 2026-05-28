import { NextResponse } from "next/server";
import {
  adminStateCookieName,
  createRandomToken,
  getBaseUrl,
  getAdminPath,
  hasAdminAuthConfig,
} from "@/lib/admin-auth";

const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

const getSafeNextPath = (value: string | null) => {
  if (!value?.startsWith("/")) return getAdminPath();
  if (value.startsWith("//")) return getAdminPath();
  return value;
};

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request.url);
  const url = new URL(request.url);

  if (!hasAdminAuthConfig()) {
    return new Response(
      "Falta configurar GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ADMIN_ALLOWED_EMAIL, ADMIN_SESSION_SECRET o BASE_URL en el entorno.",
      { status: 500 },
    );
  }

  const nextPath = getSafeNextPath(url.searchParams.get("next"));
  const state = createRandomToken();
  const redirectUri = new URL("/api/admin-auth/google/callback", baseUrl);
  const authUrl = new URL(googleAuthUrl);

  authUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID ?? "");
  authUrl.searchParams.set("redirect_uri", redirectUri.toString());
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(authUrl);
  response.cookies.set(adminStateCookieName, `${state}|${nextPath}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
