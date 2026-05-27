import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  adminSessionCookieName,
  getAdminPath,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

const isAdminSubpath = (pathname: string, adminPath: string) =>
  pathname === adminPath || pathname.startsWith(`${adminPath}/`);

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const adminPath = getAdminPath();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse(null, { status: 404 });
  }

  if (!isAdminSubpath(pathname, adminPath)) {
    return NextResponse.next();
  }

  const session = await verifyAdminSessionToken(
    request.cookies.get(adminSessionCookieName)?.value,
  );

  if (!session) {
    const loginUrl = new URL("/api/admin-auth/google", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const rewrittenUrl = request.nextUrl.clone();
  rewrittenUrl.pathname = pathname.replace(adminPath, "/admin");

  return NextResponse.rewrite(rewrittenUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
