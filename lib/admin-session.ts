import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionCookieName,
  getAdminPath,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export const getAdminSession = async () => {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);
};

export const requireAdminSession = async () => {
  const session = await getAdminSession();

  if (!session) {
    redirect(`/api/admin-auth/google?next=${encodeURIComponent(getAdminPath())}`);
  }

  return session;
};
