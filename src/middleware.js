import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAdminEmail } from "@/lib/adminAccess";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Always refresh the Supabase session so tokens stay valid.
  const { response, user } = await updateSession(request);

  // Gate every /admin route except the login page.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user || !isAdminEmail(user.email)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If a signed-in admin hits the login page, send them to the dashboard.
  if (pathname === "/admin/login" && user && isAdminEmail(user.email)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
