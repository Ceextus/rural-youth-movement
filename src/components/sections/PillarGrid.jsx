"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PillarGrid() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headerRef.current, { opacity: 0, y: 30 });
      gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.95 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8 }).to(
        cardsRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15 },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-white border-y border-outline-variant/30 overflow-hidden"
    >
      <div ref={headerRef} className="mb-12 text-center md:text-left">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">
          Our Core Agenda
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0">
          Focused initiatives driving tangible impact across key sectors in
          rural communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-mobile md:gap-gutter-desktop auto-rows-[280px]">
        {/* Card 1: Education (wide) */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="bg-surface rounded-xl border border-outline-variant/30 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group col-span-1 md:col-span-2 lg:col-span-2 row-span-1 relative overflow-hidden"
        >
          {/* Animated top border */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
              <span
                className="material-symbols-outlined text-primary text-[32px] group-hover:scale-110 transition-transform duration-300"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>
            
            {/* Sliding Arrow Micro-interaction */}
            <div className="relative w-6 h-6 overflow-hidden">
              <span className="material-symbols-outlined text-outline-variant absolute transition-all duration-300 group-hover:translate-x-6 group-hover:-translate-y-6">
                arrow_outward
              </span>
              <span className="material-symbols-outlined text-primary absolute -translate-x-6 translate-y-6 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
                arrow_outward
              </span>
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2 group-hover:text-primary transition-colors duration-300">
              Education &amp; Skills
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant opacity-90 group-hover:opacity-100 transition-opacity">
              Bridging the knowledge gap with modern vocational training and
              digital literacy programs tailored for rural youth.
            </p>
          </div>
        </div>

        {/* Card 2: Agriculture */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="bg-surface rounded-xl border border-outline-variant/30 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Animated top border */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />

          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
            <span
              className="material-symbols-outlined text-[140px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              agriculture
            </span>
          </div>
          <div className="flex items-start justify-between relative z-10">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
              <span
                className="material-symbols-outlined text-primary text-[32px] group-hover:scale-110 transition-transform duration-300"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                agriculture
              </span>
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2 group-hover:text-primary transition-colors duration-300">
              Modern Agriculture
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity">
              Advancing sustainable farming techniques and agribusiness.
            </p>
          </div>
        </div>

        {/* Card 3: Youth Employment */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="bg-surface rounded-xl border border-outline-variant/30 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Animated top border */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />

          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <span
              className="material-symbols-outlined text-[140px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              work
            </span>
          </div>
          <div className="flex items-start justify-between relative z-10">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
              <span
                className="material-symbols-outlined text-primary text-[32px] group-hover:scale-110 transition-transform duration-300"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                work
              </span>
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2 group-hover:text-primary transition-colors duration-300">
              Youth Employment
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity">
              Creating local job opportunities and supporting micro-enterprises.
            </p>
          </div>
        </div>

        {/* Card 4: Civic Engagement (full-width feature) */}
        <div
          ref={(el) => (cardsRef.current[3] = el)}
          className="bg-surface rounded-xl border border-outline-variant/30 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group col-span-1 md:col-span-2 lg:col-span-4 row-span-1 texture-bg relative overflow-hidden"
        >
          {/* Animated top border */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-20" />

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between h-full relative z-10">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300 inline-block">
                  <span
                    className="material-symbols-outlined text-primary text-[32px] group-hover:scale-110 transition-transform duration-300"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    how_to_vote
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-background group-hover:text-primary transition-colors duration-300">
                  Civic Engagement &amp; Leadership
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-90 group-hover:opacity-100 transition-opacity">
                Fostering a culture of active political participation and
                transparent local governance. We empower young people to take
                charge of their community&apos;s future through leadership
                development and civic education.
              </p>
            </div>
            
            <Link
              href="/agenda"
              className="group/btn inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary font-label-md text-label-md px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              <span>View Action Plan</span>
              <span className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/btn:translate-x-5 absolute">
                  arrow_forward
                </span>
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 -translate-x-5 group-hover/btn:translate-x-0 absolute">
                  arrow_forward
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
