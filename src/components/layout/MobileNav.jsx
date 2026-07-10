"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function MobileNav({ links = [] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const buttonRef = useRef(null);
  const tlRef = useRef(null);
  const iconRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup timeline but keep it paused initially
      tlRef.current = gsap.timeline({ paused: true });
      
      // Initial states for menu items
      gsap.set(menuRef.current, { 
        height: 0, 
        opacity: 0,
        display: "none" 
      });
      gsap.set(linksRef.current, { x: -20, opacity: 0 });
      gsap.set(buttonRef.current, { y: 20, opacity: 0 });

      // Build animation
      tlRef.current
        .to(menuRef.current, {
          display: "flex",
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power3.inOut"
        })
        .to(
          linksRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          },
          "-=0.2"
        )
        .to(
          buttonRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (open) {
        tlRef.current.play();
        gsap.to(iconRef.current, { rotation: 90, duration: 0.3, ease: "power2.inOut" });
      } else {
        tlRef.current.reverse();
        gsap.to(iconRef.current, { rotation: 0, duration: 0.3, ease: "power2.inOut" });
      }
    }
  }, [open]);

  return (
    <div ref={containerRef}>
      {/* Toggle */}
      <button
        type="button"
        aria-label="Toggle Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-primary p-2 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
      >
        <div ref={iconRef} className="flex items-center justify-center">
            <span
            className="material-symbols-outlined text-[32px] transition-transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
            >
            {open ? "close" : "menu"}
            </span>
        </div>
      </button>

      {/* Dropdown overlay */}
      <div
        ref={menuRef}
        className="absolute top-[80px] left-0 w-full bg-surface/95 dark:bg-inverse-surface/95 border-b border-outline-variant/30 backdrop-blur-xl p-margin-mobile gap-6 shadow-2xl flex-col overflow-hidden"
      >
        {links.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            ref={(el) => (linksRef.current[i] = el)}
            onClick={() => setOpen(false)}
            className={`font-display-lg text-headline-sm text-on-surface-variant hover:text-primary transition-colors py-4 ${
              i < links.length - 1 ? "border-b border-outline-variant/20" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}

        <div ref={buttonRef} className="mt-4 pb-6">
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
  );
}
