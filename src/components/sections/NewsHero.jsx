"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function NewsHero() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const patternRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.set(itemsRef.current, { opacity: 0, y: 32 });
      gsap.to(itemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Subtle background pattern pan
      if (patternRef.current) {
        gsap.to(patternRef.current, {
          backgroundPosition: "100px 100px",
          duration: 15,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 md:pt-16 pb-10 md:pb-14 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden"
    >
      {/* Background pattern layer */}
      <div 
        ref={patternRef}
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, var(--color-primary) 10px, var(--color-primary) 11px)",
          backgroundSize: "20px 20px"
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-end">
        <div className="md:col-span-10 lg:col-span-8 flex flex-col gap-6">
          <span
            ref={(el) => (itemsRef.current[0] = el)}
            className="bg-primary/10 text-primary font-label-md text-label-md px-4 py-1.5 rounded-full w-fit uppercase tracking-widest border border-primary/20 shadow-[0_0_15px_rgba(15,122,61,0.15)] relative overflow-hidden group"
          >
            <span className="relative z-10">Press &amp; Updates</span>
            <div className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
          </span>
          
          <h1
            ref={(el) => (itemsRef.current[1] = el)}
            className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary-container"
          >
            News &amp; Updates
          </h1>
          <p
            ref={(el) => (itemsRef.current[2] = el)}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed"
          >
            Stay informed on the latest movements, policies, and community
            action happening across the nation. We are building the future from
            the ground up.
          </p>
        </div>
      </div>
    </section>
  );
}
