"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatCard from "../cards/StatCard";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: "map", value: "36 States", label: "Nationwide Reach" },
  { icon: "groups", value: "1M+", label: "Active Members" },
  { icon: "home_work", value: "5k+", label: "Communities" },
];

export default function StatBar() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { opacity: 0, y: 60 });
      gsap.set(cardsRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      tl.to(sectionRef.current, { opacity: 1, y: 0, duration: 0.7 }).to(
        cardsRef.current,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
        "-=0.35"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-surface-white border-y border-outline-variant/30 py-12 relative z-30 -mt-16 mx-auto max-w-5xl rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.08)] texture-bg"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
        {STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            ref={(el) => (cardsRef.current[i] = el)}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
