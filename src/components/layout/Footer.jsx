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
      { label: "State Chapters", href: "/about" },
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

export default function Footer() {
  const footerRef = useRef(null);
  const colsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(colsRef.current, { opacity: 0, y: 20 });

      gsap.to(colsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
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
              src="/images/brand/rym-logo.png"
              alt="RYM Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain brightness-0 invert"
            />
            RYM
          </Link>
          <p className="font-body-sm text-body-sm text-surface-variant/80">
            For the People, By the Youth. Mobilising the grassroots for rural
            development.
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              aria-label="Website"
              className="text-surface-variant/80 hover:text-primary-fixed hover:-translate-y-1 transition-all duration-300"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              href="#"
              aria-label="Email"
              className="text-surface-variant/80 hover:text-primary-fixed hover:-translate-y-1 transition-all duration-300"
            >
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>

        {/* Link columns */}
        {LINK_COLUMNS.map((column, i) => (
          <div
            key={column.heading}
            ref={(el) => (colsRef.current[i + 1] = el)}
            className="col-span-1 flex flex-col gap-3 font-body-sm text-body-sm"
          >
            <h4 className="text-surface-white font-bold mb-2">
              {column.heading}
            </h4>
            {column.links.map((link) => (
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
        ref={(el) => (colsRef.current[4] = el)} 
        className="mt-16 pt-8 border-t border-surface-variant/20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center md:text-left"
      >
        <p className="font-body-sm text-body-sm text-surface-variant/60">
          © {new Date().getFullYear()} Rural Youth Movement (RYM). All rights reserved. For the People,
          By the Youth.
        </p>
      </div>
    </footer>
  );
}
