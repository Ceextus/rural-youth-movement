"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTENT_DEFAULTS = {
  heading: "Core Pillars",
  subtext:
    "Strategic initiatives designed to create sustainable impact across rural communities.",
};

// Shown only when the admin agenda_pillars table is empty.
const FALLBACK_PILLARS = [
  { icon: "school", title: "Education & Literacy", description: "Foundational literacy, digital skills training, and community learning centers to bridge the educational divide in rural areas." },
  { icon: "agriculture", title: "Sustainable Farming", description: "Better seeds, sustainable farming techniques, and direct-to-market cooperatives modernising rural agriculture." },
  { icon: "work", title: "Youth Employment", description: "Rural entrepreneurship and vocational pathways tailored to the economic realities of each region." },
  { icon: "how_to_vote", title: "Civic Engagement", description: "Town halls, leadership workshops, and voter drives that give rural youth an active role in local governance." },
];

export default function CorePillars({ content, pillars }) {
  const c = { ...CONTENT_DEFAULTS, ...(content || {}) };
  const items = pillars?.length ? pillars : FALLBACK_PILLARS;

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 28 });
      gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.96 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.7 }).to(
        cardsRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="py-[80px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-24"
    >
      <div ref={headerRef} className="mb-12 max-w-2xl">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          {c.heading}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {c.subtext}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-mobile md:gap-gutter-desktop">
        {items.map((pillar, i) => (
          <div
            key={pillar.id || pillar.title || i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 hover:shadow-[0px_8px_24px_rgba(15,122,61,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-10" />
            <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {pillar.icon || "flag"}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors">
              {pillar.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
