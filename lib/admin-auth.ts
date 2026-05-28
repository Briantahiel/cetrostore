export type AdminSession = {
  email: string;
  name?: string;
  picture?: string;
  exp: number;
};

export const adminSessionCookieName = "cetromotos_admin_session";
export const adminStateCookieName = "cetromotos_admin_oauth_state";

const encoder = new TextEncoder();

const toBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromBase64Url = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
};

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
};

// export const getBaseUrl = (requestUrl?: string) => {
//   const configuredBaseUrl = process.env.BASE_URL?.trim();
//   const vercelUrl = process.env.VERCEL_URL?.trim();

//   if (configuredBaseUrl) return configuredBaseUrl.replace(/\/+$/, "");
//   if (vercelUrl) return `https://${vercelUrl.replace(/\/+$/, "")}`;
//   if (requestUrl) return new URL(requestUrl).origin;

//   return "http://localhost:3000";
// };
export const getBaseUrl = (requestUrl?: string) => {
  const configuredBaseUrl = process.env.BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/+$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // fallback seguro en producción (NO usar VERCEL_URL para OAuth)
  return "https://cetrostore.vercel.app";
};

const getSessionSecret = () =>
  process.env.ADMIN_SESSION_SECRET ??
  (process.env.NODE_ENV === "development" ? "dev-cetromotos-admin-session" : "");

const getKey = async () =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

const sign = async (value: string) => {
  const signature = await crypto.subtle.sign("HMAC", await getKey(), encoder.encode(value));
  return toBase64Url(new Uint8Array(signature));
};

export const getAdminPath = () => {
  const configuredPath = process.env.ADMIN_PATH?.trim();

  if (!configuredPath) return "/panel-cetromotos";
  return configuredPath.startsWith("/") ? configuredPath : `/${configuredPath}`;
};

export const getAllowedAdminEmails = () =>
  (process.env.ADMIN_ALLOWED_EMAILS ?? process.env.ADMIN_ALLOWED_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const hasAdminAuthConfig = () =>
  Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      getAllowedAdminEmails().length > 0 &&
      getSessionSecret() &&
      (process.env.NODE_ENV !== "production" || getBaseUrl()),
  );

export const createRandomToken = () => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
};

export const createAdminSessionToken = async (
  session: Omit<AdminSession, "exp"> & { exp?: number },
) => {
  const payload: AdminSession = {
    ...session,
    email: session.email.toLowerCase(),
    exp: session.exp ?? Math.floor(Date.now() / 1000) + 60 * 60 * 8,
  };
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

export const verifyAdminSessionToken = async (token?: string | null) => {
  if (!token || !getSessionSecret()) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = await sign(encodedPayload);
  if (!timingSafeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(encodedPayload)),
    ) as AdminSession;
    const allowedEmails = getAllowedAdminEmails();
    const email = payload.email?.toLowerCase();

    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    if (!email || !allowedEmails.includes(email)) return null;

    return { ...payload, email };
  } catch {
    return null;
  }
};
