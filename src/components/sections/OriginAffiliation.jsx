"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "36+", label: "State Chapters" },
  { value: "50k", label: "Active Members" },
];

export default function OriginAffiliation() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(imageRef.current, { opacity: 0, scale: 1.1, x: -30 });
      gsap.set(badgeRef.current, { opacity: 0, scale: 0.8, x: 20 });
      gsap.set(itemsRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      tl.to(imageRef.current, { opacity: 1, scale: 1, x: 0, duration: 0.9 })
        .to(badgeRef.current, { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.5")
        .to(
          itemsRef.current,
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;
    
    gsap.to(imageRef.current, {
      rotateY: xPct * 10,
      rotateX: -yPct * 10,
      transformPerspective: 1000,
      x: xPct * 5,
      y: yPct * 5,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(badgeRef.current, {
      x: -xPct * 15,
      y: -yPct * 15,
      rotateY: xPct * 5,
      rotateX: -yPct * 5,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to([imageRef.current, badgeRef.current], {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-margin-mobile md:px-margin-desktop bg-surface-white border-y border-outline-variant/30 relative overflow-hidden"
    >
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Interactive Image Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative py-4 select-none cursor-pointer"
        >
          <div
            ref={imageRef}
            className="relative h-[450px] lg:h-[500px] w-full rounded-2xl border border-muted-green/10 overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <Image
              src="/images/about/farmers-modern-equipment.jpg"
              alt="Young Nigerian farmers operating modern agricultural equipment in a field"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Floating Badge */}
          <div 
            ref={badgeRef}
            className="absolute bottom-10 -right-2 md:-right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-outline-variant/40 rounded-xl px-5 py-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] max-w-[220px] z-20 pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="material-symbols-outlined text-primary text-[28px]">
                verified
              </span>
              <span className="font-label-lg text-label-md font-bold text-on-background">Impact Driven</span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Advancing communities through grassroots mobilization.
            </p>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2
            ref={(el) => (itemsRef.current[0] = el)}
            className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary"
          >
            Rooted in Renewed Hope
          </h2>
          <p
            ref={(el) => (itemsRef.current[1] = el)}
            className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
          >
            The Rural Youth Movement (RYM) stands as a vital grassroots pillar
            aligned with Nigeria&apos;s Renewed Hope Agenda. We recognize that
            true national progress must begin in our agricultural heartlands and
            rural communities.
          </p>
          <p
            ref={(el) => (itemsRef.current[2] = el)}
            className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
          >
            Our mission is to translate high-level policy into tangible,
            on-the-ground action, ensuring that the youth who form the backbone
            of our agrarian economy are equipped, empowered, and elevated to
            leadership roles.
          </p>
          
          <div
            ref={(el) => (itemsRef.current[3] = el)}
            className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30 mt-2"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="group cursor-default">
                <span className="block font-headline-md text-headline-lg text-primary mb-1 group-hover:scale-105 group-hover:text-primary-container transition-transform duration-300 transform origin-left">
                  {stat.value}
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
