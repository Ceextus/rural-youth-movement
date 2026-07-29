"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";
  const oauthError = searchParams.get("error") === "oauth";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: oauthErr } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          redirect
        )}`,
      },
    });
    if (oauthErr) {
      setError("Could not start Google sign-in. Please try again.");
      setLoading(false);
    }
    // On success the browser is redirected to Google, so no further action here.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted-green topo-pattern px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="RYM Logo"
            width={64}
            height={64}
            className="object-contain mb-4"
            priority
          />
          <h1 className="font-headline-md text-headline-md text-white text-center">
            Admin Dashboard
          </h1>
          <p className="font-body-sm text-body-sm text-white/50 mt-1">
            Rural Youth Movement
          </p>
        </div>

        {/* Login card */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-2xl p-8">
          <h2 className="font-headline-sm text-headline-sm text-on-background mb-6">
            Sign in
          </h2>

          {oauthError && (
            <div className="flex items-center gap-2 text-error font-body-sm text-body-sm bg-error-container/20 rounded-lg px-4 py-3 mb-5">
              <span className="material-symbols-outlined text-[18px]">error</span>
              This Google account isn&apos;t authorized for admin access.
            </div>
          )}

          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-surface-white border border-outline-variant/40 text-on-background font-label-lg text-label-lg px-6 py-3 rounded-full hover:bg-surface-container-low transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.583-5.036-3.71H.957v2.332A8.997 8.997 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <span className="flex-1 h-px bg-outline-variant/30" />
            <span className="font-body-sm text-[12px] text-on-surface-variant/60 uppercase tracking-wider">
              or
            </span>
            <span className="flex-1 h-px bg-outline-variant/30" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-label-lg text-label-lg text-on-surface-variant mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-md text-body-md placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-label-lg text-label-lg text-on-surface-variant mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-md text-body-md placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-error font-body-sm text-body-sm bg-error-container/20 rounded-lg px-4 py-3">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3.5 rounded-full shadow-[0px_4px_16px_rgba(15,122,61,0.25)] hover:shadow-[0px_8px_24px_rgba(15,122,61,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  Signing in…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    lock_open
                  </span>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
