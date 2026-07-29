"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULTS = {
  visionText:
    "To cultivate a resilient, technologically adept generation of rural leaders who will drive Nigeria's sustainable agricultural transformation.",
  missionText:
    "To mobilize, educate, and resource rural youth, transforming communities through modern farming practices, civic engagement, and cooperative economics.",
};

export default function VisionMission({ content }) {
  const c = { ...DEFAULTS, ...(content || {}) };
  const BLOCKS = [
    { label: "Our Vision", icon: "visibility", text: c.visionText },
    { label: "Our Mission", icon: "flag", text: c.missionText },
  ];
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.95 });
      
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 75%" 
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface topo-pattern relative overflow-hidden"
    >
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {BLOCKS.map((block, i) => (
            <div
              key={block.label}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative bg-surface-white border border-outline-variant/30 rounded-2xl p-8 md:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Animated accent border */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />
              
              {/* Large background decorative icon */}
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
                <span
                  className="material-symbols-outlined text-[160px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {block.icon}
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="material-symbols-outlined text-primary text-[32px] group-hover:scale-110 transition-transform duration-300">
                      {block.icon}
                    </span>
                  </div>
                  <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-widest font-bold">
                    {block.label}
                  </h3>
                </div>
                
                <p className="font-headline-md text-headline-sm md:text-headline-md text-on-surface leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {block.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
