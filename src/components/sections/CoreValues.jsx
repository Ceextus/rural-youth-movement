"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    icon: "handshake",
    title: "Integrity",
    text: "Transparent, accountable leadership at every level — from the national secretariat to each local chapter.",
  },
  {
    icon: "diversity_3",
    title: "Community First",
    text: "Every initiative begins with the people it serves, driven by local voices and grassroots needs.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    text: "Bringing modern tools, digital skills, and climate-smart techniques to rural communities.",
  },
  {
    icon: "trending_up",
    title: "Empowerment",
    text: "Equipping young leaders with the resources and networks to elevate themselves and their communities.",
  },
];

export default function CoreValues() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 28 });
      gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.95 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.7 }).to(
        cardsRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface topo-pattern relative overflow-hidden"
    >
      <div className="max-w-container-max mx-auto">
        <div ref={headerRef} className="max-w-2xl mb-12 md:mb-16">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/20">
            What Drives Us
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-6 mb-4">
            Our Core Values
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            The principles that guide every chapter, every project, and every
            young leader in the movement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative bg-surface-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />
              <div className="bg-primary/10 p-4 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span
                  className="material-symbols-outlined text-primary text-[32px] group-hover:scale-110 transition-transform duration-300"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {value.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors duration-300">
                {value.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
