"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "../ui/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

/**
 * Live stat bar with animated counters powered by real DB data.
 * Falls back to CMS-configured static stats when no liveStats prop is provided.
 */
export default function StatBar({ content, liveStats }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Build stats array: if we have live data, use it; otherwise fall back to CMS content
  const stats = liveStats
    ? [
        {
          icon: "group",
          end: liveStats.totalMembers,
          suffix: "+",
          label: "Registered Members",
        },
        {
          icon: "verified",
          end: liveStats.approvedMembers,
          label: "Approved Members",
        },
        {
          icon: "map",
          end: liveStats.activeChapters,
          suffix: ` / ${liveStats.totalChapters}`,
          label: "States Active",
        },
      ]
    : null;

  // CMS fallback stats
  const cmsStats = content?.items?.length
    ? content.items
    : [
        { icon: "map", value: "36 States", label: "Nationwide Reach" },
        { icon: "groups", value: "1M+", label: "Active Members" },
        { icon: "home_work", value: "5k+", label: "Communities" },
      ];

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
      <div
        className={`grid grid-cols-1 ${
          stats ? "md:grid-cols-3" : `md:grid-cols-${cmsStats.length}`
        } gap-8 px-8 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/30`}
      >
        {stats
          ? stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => (cardsRef.current[i] = el)}
                className="flex flex-col items-center pt-4 md:pt-0"
              >
                <span
                  className="material-symbols-outlined text-primary text-[40px] mb-2"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {stat.icon}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-background">
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix || ""}
                    duration={2200}
                  />
                </h3>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))
          : cmsStats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => (cardsRef.current[i] = el)}
                className="flex flex-col items-center pt-4 md:pt-0"
              >
                <span
                  className="material-symbols-outlined text-primary text-[40px] mb-2"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {stat.icon}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-background">
                  {stat.value}
                </h3>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
      </div>
    </section>
  );
}
