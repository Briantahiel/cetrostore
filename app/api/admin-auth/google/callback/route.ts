import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  adminStateCookieName,
  createAdminSessionToken,
  getBaseUrl,
  getAdminPath,
  getAllowedAdminEmails,
  hasAdminAuthConfig,
} from "@/lib/admin-auth";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
};

type GoogleUserInfo = {
  email?: string;
  name?: string;
  picture?: string;
};

const getSafeNextPath = (value?: string) => {
  if (!value?.startsWith("/") || value.startsWith("//")) return getAdminPath();
  return value;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const baseUrl = getBaseUrl(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const stateCookie = url.searchParams.get("error")
    ? null
    : request.headers
        .get("cookie")
        ?.split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith(`${adminStateCookieName}=`))
        ?.split("=")[1];
  const [expectedState, encodedNextPath] = decodeURIComponent(stateCookie ?? "").split("|");
  const nextPath = getSafeNextPath(encodedNextPath);

  if (!hasAdminAuthConfig()) {
    return new Response("La autenticacion de admin no esta configurada.", {
      status: 500,
    });
  }

  if (!code || !state || state !== expectedState) {
    return new Response("No se pudo validar el inicio de sesion.", {
      status: 400,
    });
  }

  const redirectUri = new URL("/api/admin-auth/google/callback", baseUrl);
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri.toString(),
    }),
  });
  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

  if (!tokenResponse.ok || !tokenData.access_token) {
    return new Response(tokenData.error ?? "Google no devolvio un token valido.", {
      status: 401,
    });
  }

  const userResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userInfo = (await userResponse.json()) as GoogleUserInfo;
  const email = userInfo.email?.toLowerCase();

  if (!userResponse.ok || !email || !getAllowedAdminEmails().includes(email)) {
    return new Response("Este correo de Google no tiene acceso al admin.", {
      status: 403,
    });
  }

  const sessionToken = await createAdminSessionToken({
    email,
    name: userInfo.name,
    picture: userInfo.picture,
  });
  const response = NextResponse.redirect(new URL(nextPath, baseUrl));

  response.cookies.delete(adminStateCookieName);
  response.cookies.set(adminSessionCookieName, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return response;
}
