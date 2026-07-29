"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function ChapterHero({ chapter }) {
  const sectionRef = useRef(null);
  const textRef = useRef([]);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 28 });
      gsap.set(statsRef.current, { opacity: 0, y: 20, scale: 0.95 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      }).to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: "group", value: chapter.stat_members, label: "Members" },
    { icon: "construction", value: chapter.stat_projects, label: "Projects" },
    { icon: "location_city", value: chapter.stat_communities, label: "Communities" },
    { icon: "event", value: chapter.stat_events, label: "Events" },
    { icon: "map", value: chapter.stat_lgas, label: "LGAs Reached" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-[100px] md:py-[140px] bg-muted-green topo-pattern overflow-hidden"
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav
          ref={(el) => (textRef.current[0] = el)}
          className="flex items-center gap-2 font-label-lg text-label-lg text-white/50 mb-8"
        >
          <Link
            href="/chapters"
            className="hover:text-primary-fixed transition-colors"
          >
            State Chapters
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span className="text-white/80">{chapter.state}</span>
        </nav>

        {/* State name + status */}
        <div
          ref={(el) => (textRef.current[1] = el)}
          className="flex flex-wrap items-center gap-4 mb-4"
        >
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-lg text-white">
            {chapter.state}
          </h1>
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wider ${
              chapter.status === "active"
                ? "bg-primary-fixed/20 text-primary-fixed"
                : "bg-tertiary-fixed/20 text-tertiary-fixed"
            }`}
          >
            {chapter.status}
          </span>
        </div>

        {/* Tagline */}
        {chapter.tagline && (
          <p
            ref={(el) => (textRef.current[2] = el)}
            className="font-body-lg text-body-lg text-white/70 max-w-2xl mb-4"
          >
            {chapter.tagline}
          </p>
        )}

        {/* Established */}
        {chapter.established && (
          <p
            ref={(el) => (textRef.current[3] = el)}
            className="font-label-lg text-label-md text-white/40 mb-12"
          >
            Established {chapter.established}
          </p>
        )}

        {/* Stat pills */}
        <div className="flex flex-wrap gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => (statsRef.current[i] = el)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                {s.icon}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-sm text-headline-sm text-white font-bold text-[20px]">
                  {s.value}
                </span>
                <span className="font-label-md text-label-md text-white/50">
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
