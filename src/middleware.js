import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAdminEmail } from "@/lib/adminAccess";

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // OAuth safety net: if a provider sent the auth `code` back to any route
  // other than the callback (e.g. Supabase falling back to the Site URL "/"),
  // forward it to /auth/callback so the session actually gets exchanged.
  if (searchParams.has("code") && pathname !== "/auth/callback") {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    return NextResponse.redirect(url);
  }

  // Only /admin needs a session check — keep public pages fast.
  if (pathname.startsWith("/admin")) {
    const { response, user } = await updateSession(request);

    if (pathname !== "/admin/login") {
      if (!user || !isAdminEmail(user.email)) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } else if (user && isAdminEmail(user.email)) {
      // Signed-in admin hitting the login page → dashboard.
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  // "/" catches the OAuth code fallback; "/admin/*" is gated.
  matcher: ["/", "/admin/:path*"],
};
