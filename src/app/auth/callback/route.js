import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// OAuth callback: Supabase redirects here with a `code` after Google sign-in.
// We exchange it for a session (cookies), then send the user on to `next`.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/admin";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=oauth`);
}
