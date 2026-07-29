"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChapterExecutives({ executives = [] }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 20 });
      gsap.set(cardsRef.current, { opacity: 0, y: 30, scale: 0.95 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }).to(
        cardsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (executives.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20 md:py-[100px] bg-background">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h2
          ref={headingRef}
          className="font-headline-md text-headline-md text-primary mb-10 text-center"
        >
          Meet the Leadership
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {executives.map((exec, i) => (
            <div
              key={exec.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex flex-col justify-end bg-surface-container-lowest rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[4/5] shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgb(15,122,61,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-outline-variant/20 hover:border-primary/40"
            >
              {/* Background Photo */}
              <div className="absolute inset-0 w-full h-full">
                {exec.photo_url ? (
                  <Image
                    src={exec.photo_url}
                    alt={exec.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-in-out">
                    <span className="font-headline-lg text-[40px] text-white/50 font-bold">
                      {getInitials(exec.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 p-4 md:p-5 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-primary/90 backdrop-blur-md text-surface-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded inline-block mb-2 shadow-sm border border-primary-container/20">
                  {exec.role}
                </div>
                <h3 className="font-headline-sm text-[16px] md:text-[18px] text-white font-semibold mb-1 leading-tight">
                  {exec.name}
                </h3>
                {exec.bio && (
                  <p className="font-body-sm text-[12px] md:text-[13px] text-white/80 line-clamp-2 md:line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {exec.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Extract initials from a full name (e.g. "John Doe" → "JD") */
function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
