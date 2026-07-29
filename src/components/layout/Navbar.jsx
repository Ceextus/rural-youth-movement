"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import MobileNav from "./MobileNav";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Agenda", href: "/agenda" },
  { label: "Chapters", href: "/chapters" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ logoUrl = "/logo.png", siteName = "RYM", navLinks }) {
  const links = navLinks?.length ? navLinks : NAV_LINKS;
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const buttonRef = useRef(null);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set(logoRef.current, { opacity: 0, x: -20 });
      gsap.set(linksRef.current, { opacity: 0, y: -10 });
      gsap.set(buttonRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(mobileNavRef.current, { opacity: 0 });

      // Animations
      tl.to(logoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .to(
        mobileNavRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header 
      ref={navRef}
      className="bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-lg sticky top-0 w-full z-50 border-b border-outline-variant/30 dark:border-outline/20 transition-colors duration-300"
    >
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link
          href="/"
          ref={logoRef}
          className="flex items-center gap-3 font-display-lg text-headline-sm font-extrabold tracking-tighter text-primary dark:text-primary-fixed hover:opacity-80 transition-opacity"
        >
          <Image
            src={logoUrl}
            alt={siteName}
            width={40}
            height={40}
            className="h-10 w-10 object-contain drop-shadow-sm"
            priority
          />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary-fixed dark:to-primary-fixed/80">
            RYM
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-display-lg text-label-lg">
          {links.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              ref={(el) => (linksRef.current[i] = el)}
              className="relative text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300 group py-2"
            >
              {link.label}
              {/* Animated underline effect */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary dark:bg-primary-fixed transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </nav>

        {/* Trailing Action (Desktop) */}
        <div ref={buttonRef} className="hidden md:block">
            <Link
              href="/get-involved"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary text-on-primary font-display-lg text-label-lg px-8 py-3 shadow-[0px_4px_16px_rgba(15,122,61,0.25)] transition-all duration-300 hover:shadow-[0px_8px_24px_rgba(15,122,61,0.35)] hover:-translate-y-1"
            >
              <span className="relative z-10 font-semibold tracking-wide">Join RYM</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/20 transition-transform duration-300 ease-out group-hover:scale-150"></div>
            </Link>
        </div>

        {/* Mobile menu (toggle + drawer) */}
        <div ref={mobileNavRef} className="md:hidden">
          <MobileNav links={links} />
        </div>
      </div>
    </header>
  );
}
