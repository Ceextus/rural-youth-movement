"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav({ links = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <button
        type="button"
        aria-label="Toggle Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-primary p-2 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors relative z-50"
      >
        <div className="flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[32px] transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
            {open ? "close" : "menu"}
            </span>
        </div>
      </button>

      {/* Dropdown overlay */}
      <div
        className={`absolute top-full left-0 w-full bg-surface/95 dark:bg-inverse-surface/95 border-b border-outline-variant/30 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-top ${
          open ? 'opacity-100 max-h-[1000px] visible' : 'opacity-0 max-h-0 invisible'
        }`}
      >
        <div className="p-margin-mobile flex flex-col gap-6">
          {links.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display-lg text-headline-sm text-on-surface-variant hover:text-primary transition-colors py-4 ${
                i < links.length - 1 ? "border-b border-outline-variant/20" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 pb-6">
              <Link
              href="/get-involved"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full bg-primary text-on-primary font-display-lg text-label-lg px-6 py-4 rounded-full text-center shadow-[0px_8px_16px_rgba(15,122,61,0.2)] hover:shadow-[0px_12px_20px_rgba(15,122,61,0.3)] transition-all duration-300 active:scale-95"
              >
              Join RYM
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

