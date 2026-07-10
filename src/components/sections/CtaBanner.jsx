"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef(null);
  const contentRef = useRef([]);
  const patternRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Subtle background pattern pan
      gsap.to(patternRef.current, {
        backgroundPosition: "100px 100px",
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-primary text-surface-white py-[80px] relative overflow-hidden"
    >
      {/* Abstract topo pattern panning slowly */}
      <div
        ref={patternRef}
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)",
          backgroundSize: "20px 20px"
        }}
      />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary-container to-transparent opacity-60 z-0 pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left">
          <h2
            ref={(el) => (contentRef.current[0] = el)}
            className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4"
          >
            Ready to shape the future of your community?
          </h2>
          <p
            ref={(el) => (contentRef.current[1] = el)}
            className="font-body-lg text-body-lg text-primary-fixed/90"
          >
            Join thousands of young leaders driving real change across all 36
            states.
          </p>
        </div>
        <div
          ref={(el) => (contentRef.current[2] = el)}
          className="shrink-0"
        >
          <Link
            href="/get-involved"
            className="group/btn relative overflow-hidden inline-flex items-center gap-3 bg-surface-white text-primary font-display-lg text-label-lg px-8 py-4 rounded hover:-translate-y-1 shadow-[0px_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0px_12px_24px_rgba(0,0,0,0.2)] transition-all duration-300"
          >
            <span className="relative z-10">Become a Member Today</span>
            
            {/* Sliding arrow */}
            <span className="relative overflow-hidden w-5 h-5 flex items-center justify-center z-10">
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover/btn:translate-x-6 absolute">
                arrow_forward
              </span>
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 -translate-x-6 group-hover/btn:translate-x-0 absolute">
                arrow_forward
              </span>
            </span>

            {/* Sweep overlay */}
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
