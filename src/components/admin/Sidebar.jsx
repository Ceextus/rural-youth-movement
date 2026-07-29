"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/actions/adminAuth";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: "dashboard" },
  { label: "Members", href: "/admin/members", icon: "group" },
  { label: "Contacts", href: "/admin/contacts", icon: "mail" },
  { label: "Chapters", href: "/admin/chapters", icon: "location_on" },
  { label: "National Execs", href: "/admin/national-executives", icon: "military_tech" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "format_quote" },
  { label: "Page Content", href: "/admin/content", icon: "edit_note" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The login page shares the admin layout but must not show the nav chrome.
  if (pathname === "/admin/login") return null;

  function isActive(href) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  }

  const navContent = (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <Image
          src="/logo.png"
          alt="RYM Logo"
          width={36}
          height={36}
          className="object-contain"
        />
        <div>
          <h2 className="font-headline-sm text-[16px] leading-[20px] text-white font-semibold tracking-tight">
            RYM Admin
          </h2>
          <p className="text-[11px] text-white/40 font-body-sm">Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 group ${
                active
                  ? "bg-primary/20 text-primary-fixed"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors duration-200 ${
                  active ? "text-primary-fixed" : "text-white/40 group-hover:text-white/70"
                }`}
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[14px] font-medium text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <span className="material-symbols-outlined text-[20px] text-white/30 group-hover:text-red-400 transition-colors duration-200">
            logout
          </span>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] min-h-screen bg-muted-green border-r border-white/5 flex-shrink-0 sticky top-0 h-screen">
        {navContent}
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-muted-green border-b border-white/10">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="RYM Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-headline-sm text-[14px] text-white font-semibold">
            RYM Admin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined text-[24px] text-white/70">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-[280px] bg-muted-green z-50 flex flex-col shadow-2xl animate-slide-in">
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}
