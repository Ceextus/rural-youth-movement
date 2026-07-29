"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_DEFAULTS = {
  badge: "Grassroots Movement",
  headingLine1: "RYM: 36 States.",
  headingLine2: "One Mission.",
  subtext:
    "Mobilising the grassroots for rural development and civic participation under Nigeria's Renewed Hope Agenda.",
  primaryLabel: "Join the Movement",
  primaryHref: "/get-involved",
  secondaryLabel: "Learn More",
  secondaryHref: "/about",
  backgroundImage: "/images/hero/hero-community.jpg",
};

export default function Hero({ content }) {
  const c = { ...HERO_DEFAULTS, ...(content || {}) };
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(
        [badgeRef.current, headingRef.current, paragraphRef.current, ctaRef.current],
        { opacity: 0, y: 40 }
      );
      gsap.set(imageRef.current, { scale: 1.15 });
      gsap.set(overlayRef.current, { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(overlayRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" })
        .to(
          imageRef.current,
          { scale: 1, duration: 2, ease: "power2.out" },
          "-=1.2"
        )
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=1.2")
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=1.0")
        .to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
      // Content fade out on scroll
      gsap.to(contentRef.current, {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] md:min-h-[100vh] flex items-center bg-black overflow-hidden"
    >
      {/* Background image setup */}
      <div className="absolute inset-0 z-0">
        <Image
          ref={imageRef}
          src={c.backgroundImage}
          alt="Nigerian rural youth standing together in their community"
          fill
          priority
          sizes="100vw" 
          className="object-cover object-center"
        />
        {/* Improved Overlay for better visibility */}
        {/* Dark overlay that transitions from dark left to lighter right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        {/* A bottom gradient to blend smoothly into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
        {/* Initial loading overlay to hide the image until it animates */}
        <div ref={overlayRef} className="absolute inset-0 bg-background z-10 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-[120px]">
        <div ref={contentRef} className="max-w-3xl pt-16 md:pt-24">
          <div ref={badgeRef} className="inline-flex items-center mb-8">
            <div className="w-1 h-8 bg-primary mr-4 rounded-full" />
            <span className="text-white font-medium text-lg">{c.badge}</span>
          </div>

          <h1
            ref={headingRef}
            className="font-display-lg text-[2.75rem] leading-[1.1] md:text-[4rem] lg:text-[5rem] text-white font-extrabold mb-6 tracking-tight drop-shadow-lg"
          >
            {c.headingLine1}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400 drop-shadow-sm">
              {c.headingLine2}
            </span>
          </h1>

          <p
            ref={paragraphRef}
            className="font-body-lg text-lg md:text-xl text-gray-200 mb-10 max-w-2xl border-l-4 border-primary pl-6 leading-relaxed drop-shadow-md"
          >
            {c.subtext}
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5">
            <Link
              href={c.primaryHref}
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-primary text-white font-label-lg text-label-lg px-8 py-4 shadow-[0px_8px_24px_rgba(15,122,61,0.3)] transition-all duration-300 hover:shadow-[0px_12px_32px_rgba(15,122,61,0.4)] hover:-translate-y-1"
            >
              <span className="relative z-10 font-bold tracking-wide">{c.primaryLabel}</span>
              <span className="material-symbols-outlined text-[24px] relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/20 transition-transform duration-300 ease-out group-hover:scale-150"></div>
            </Link>
            <Link
              href={c.secondaryHref}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 text-white font-label-lg text-label-lg px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 flex justify-center items-center font-bold tracking-wide shadow-[0px_8px_24px_rgba(0,0,0,0.1)]"
            >
              {c.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
