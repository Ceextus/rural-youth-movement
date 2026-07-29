"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children only when the current route is NOT under /admin.
 * Used in the root layout to hide Navbar, Footer, and SplashScreen
 * on admin dashboard pages (which have their own layout).
 */
export default function PublicOnly({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
