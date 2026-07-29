"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["All", "Active", "Forming"];

export default function ChapterGrid({ chapters = [] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  const filtered = chapters.filter((ch) => {
    const matchesSearch = ch.state
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || ch.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 30 });

      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 md:py-[100px] bg-background">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-sm">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by state…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-outline-variant/40 bg-surface-container-low text-on-background font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-label-lg text-label-lg transition-all duration-200 border ${
                  filter === f
                    ? "bg-primary text-on-primary border-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((ch, i) => (
            <Link
              href={`/chapters/${ch.slug}`}
              key={ch.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group block rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-headline-sm text-headline-sm text-on-background group-hover:text-primary transition-colors">
                  {ch.state}
                </h3>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    ch.status === "active"
                      ? "bg-primary-fixed/20 text-primary"
                      : "bg-tertiary-fixed/20 text-tertiary"
                  }`}
                >
                  {ch.status}
                </span>
              </div>

              {/* Tagline */}
              {ch.tagline && (
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-5 line-clamp-2">
                  {ch.tagline}
                </p>
              )}

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-outline-variant/20">
                <StatItem icon="group" value={ch.stat_members} label="Members" />
                <StatItem icon="construction" value={ch.stat_projects} label="Projects" />
                <StatItem icon="location_city" value={ch.stat_communities} label="Communities" />
                <StatItem icon="map" value={ch.stat_lgas} label="LGAs" />
              </div>

              {/* Arrow */}
              <div className="mt-5 flex items-center gap-1 text-primary font-label-lg text-label-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Chapter
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4 block">
              search_off
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              No chapters found matching &quot;{search}&quot;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function StatItem({ icon, value, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px] text-primary/60">
        {icon}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="font-label-lg text-label-lg text-on-background font-bold">
          {value}
        </span>
        <span className="font-body-sm text-[12px] text-on-surface-variant">
          {label}
        </span>
      </div>
    </div>
  );
}
