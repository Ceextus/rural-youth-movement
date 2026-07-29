"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          document.body.style.overflow = "";
        },
      });

      // Initial state
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(textRef.current, { y: 20, opacity: 0 });
      gsap.set(taglineRef.current, { y: 20, opacity: 0 });

      // In animation
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.5)",
      })
      .to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        taglineRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      // Hold for a moment
      .to({}, { duration: 0.8 })
      // Out animation
      .to([logoRef.current, textRef.current, taglineRef.current], {
        y: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.in",
      })
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background texture-bg"
    >
      <div className="flex flex-col items-center justify-center">
        <div ref={logoRef} className="mb-4">
          <Image
            src="/logo.png"
            alt="RYM Logo"
            width={120}
            height={120}
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
        <h1
          ref={textRef}
          className="font-display-lg text-headline-lg md:text-display-lg font-extrabold tracking-tighter text-primary dark:text-primary-fixed mb-2 text-center"
        >
          RYM
        </h1>
        <p
          ref={taglineRef}
          className="font-body-md text-label-lg md:text-body-lg text-on-surface-variant font-medium tracking-wide text-center uppercase"
        >
          Rural Youth Movement
        </p>
      </div>
    </div>
  );
}
