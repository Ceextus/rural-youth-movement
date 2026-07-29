"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINK_COLUMNS = [
  {
    heading: "Organization",
    links: [
      { label: "National Secretariat", href: "/about" },
      { label: "State Chapters", href: "/chapters" },
      { label: "Constitution", href: "/about" },
    ],
  },
  {
    heading: "Initiatives",
    links: [
      { label: "Policy Agenda", href: "/agenda" },
      { label: "Rural Development", href: "/agenda" },
      { label: "Civic Education", href: "/agenda" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

// Inline brand marks (Material Symbols has no reliable brand glyphs).
const SOCIAL_ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25H8.08l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.72.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.82-.32 1.72-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.72.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.82.28 1.72.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.72-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.82.32-1.72.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.72a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.33-.13-.82-.28-1.72-.32-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08zm6.95-9.22a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0z" />
    </svg>
  ),
  website: <span className="material-symbols-outlined text-[20px]">language</span>,
};

export default function Footer({
  logoUrl = "/logo.png",
  siteName = "RYM",
  tagline,
  columns,
  socials,
}) {
  const footerRef = useRef(null);
  const colsRef = useRef([]);

  const cols = columns?.length ? columns : LINK_COLUMNS;
  const socialEntries = Object.entries(socials || {}).filter(
    ([key, url]) => SOCIAL_ICONS[key] && url && url !== "#"
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(colsRef.current, { opacity: 0, y: 20 });
      gsap.to(colsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full py-16 bg-muted-green dark:bg-background overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand column */}
        <div ref={(el) => (colsRef.current[0] = el)} className="col-span-1 flex flex-col gap-4">
          <Link
            href="/"
            className="font-display-lg text-headline-md text-surface-white flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src={logoUrl}
              alt={siteName}
              width={40}
              height={40}
              className="h-10 w-10 object-contain rounded-lg"
            />
            RYM
          </Link>
          <p className="font-body-sm text-body-sm text-surface-variant/80">
            {tagline ||
              "For the People, By the Youth. Mobilising the grassroots for rural development."}
          </p>
          {socialEntries.length > 0 && (
            <div className="mt-4 flex gap-4">
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="text-surface-variant/80 hover:text-primary-fixed hover:-translate-y-1 transition-all duration-300"
                >
                  {SOCIAL_ICONS[key]}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Link columns */}
        {cols.map((column, i) => (
          <div
            key={column.heading}
            ref={(el) => (colsRef.current[i + 1] = el)}
            className="col-span-1 flex flex-col gap-3 font-body-sm text-body-sm"
          >
            <h4 className="text-surface-white font-bold mb-2">{column.heading}</h4>
            {(column.links || []).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1 text-surface-variant/80 hover:text-primary-fixed transition-colors duration-300 w-fit"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-primary-fixed transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div
        ref={(el) => (colsRef.current[cols.length + 1] = el)}
        className="mt-16 pt-8 border-t border-surface-variant/20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center md:text-left"
      >
        <p className="font-body-sm text-body-sm text-surface-variant/60">
          © {new Date().getFullYear()} {siteName}. All rights reserved. For the
          People, By the Youth.
        </p>
      </div>
    </footer>
  );
}
