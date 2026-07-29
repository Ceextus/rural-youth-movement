"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["All Updates", "National", "State", "Community"];

const FALLBACK_SIDEBAR = [
  {
    category: "State Chapters",
    title: "Midwest Coalition Secures Regional Grant for Sustainable Practices",
    date: "OCT 22, 2024",
  },
  {
    category: "Community",
    title: "Local Leaders Host Townhall on Rural Connectivity Issues",
    date: "OCT 18, 2024",
  },
];

export default function NewsFeed({ posts }) {
  const [active, setActive] = useState("All Updates");
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  // Map DB sidebar posts or use fallback
  const SIDEBAR = posts?.length > 1
    ? posts.slice(1, 3).map((p) => ({
        category: p.tag || "General",
        title: p.title,
        slug: p.slug,
        date: new Date(p.published_at || p.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" }).toUpperCase(),
      }))
    : FALLBACK_SIDEBAR;

  const featuredPost = posts?.[0] || null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(itemsRef.current, { opacity: 0, y: 40 });
      gsap.to(itemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[80px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-12">
        {FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={
                isActive
                  ? "bg-primary/10 text-primary font-label-lg text-label-lg px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(15,122,61,0.15)] scale-105"
                  : "border border-outline-variant text-on-surface-variant font-label-lg text-label-lg px-5 py-2.5 rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              }
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop">
        {/* Featured Article */}
        <article
          ref={(el) => (itemsRef.current[0] = el)}
          className="md:col-span-8 bg-surface-white border border-muted-green/20 rounded-xl overflow-hidden group cursor-pointer relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Animated top border */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />

          <Link href={featuredPost ? `/news/${featuredPost.slug}` : "/news"}>
            <div className="aspect-video w-full bg-surface-dim relative overflow-hidden">
              <Image
                src={featuredPost?.cover_image || "/images/news/featured-innovation-fund.jpg"}
                alt={featuredPost?.title || "Featured news article"}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply pointer-events-none" />
              <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-surface-white px-3 py-1.5 rounded-lg font-label-md text-label-md shadow-md">
                {featuredPost?.tag || "National"}
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col relative z-10">
              <div className="text-on-surface-variant font-label-md text-label-md mb-2">
                {featuredPost
                  ? new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString("en-NG", { month: "long", day: "numeric", year: "numeric" }).toUpperCase()
                  : "OCTOBER 24, 2024"}
              </div>
              <h2 className="font-headline-sm md:text-[28px] md:leading-[36px] text-on-background mb-4 group-hover:text-primary transition-colors duration-300">
                {featuredPost?.title || "National Secretariat Announces New Agricultural Innovation Fund for Young Farmers"}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {featuredPost?.excerpt || "The newly established fund aims to provide essential seed capital and modern equipment to grassroots agricultural initiatives led by members under 35..."}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-primary font-label-md text-label-md group/btn">
                Read Full Announcement
                <span className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/btn:translate-x-5 absolute">
                    arrow_forward
                  </span>
                  <span className="material-symbols-outlined text-[16px] transition-transform duration-300 -translate-x-5 group-hover/btn:translate-x-0 absolute">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* Sidebar Articles */}
        <div className="md:col-span-4 flex flex-col gap-gutter-desktop">
          {SIDEBAR.map((article, i) => (
            <article
              key={article.title}
              ref={(el) => (itemsRef.current[i + 1] = el)}
              className="bg-surface-white border border-muted-green/20 rounded-xl p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Animated left border for sidebar items */}
              <div className="absolute top-0 left-0 w-[4px] h-full bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20" />

              <Link href={article.slug ? `/news/${article.slug}` : "/news"} className="flex flex-col h-full relative z-10">
                <div className="text-primary font-label-md text-label-md mb-3 group-hover:bg-primary/10 w-fit px-2 py-0.5 rounded transition-colors duration-300">
                  {article.category}
                </div>
                <h3 className="font-headline-sm text-[20px] leading-[28px] text-on-background mb-3 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-outline-variant/20 flex justify-between items-end">
                  <p className="font-body-sm text-body-sm text-on-surface-variant opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {article.date}
                  </p>
                  
                  {/* Sliding Arrow Micro-interaction */}
                  <div className="relative w-5 h-5 overflow-hidden text-primary">
                    <span className="material-symbols-outlined text-[20px] absolute transition-all duration-300 group-hover:translate-x-5 group-hover:-translate-y-5">
                      arrow_outward
                    </span>
                    <span className="material-symbols-outlined text-[20px] absolute -translate-x-5 translate-y-5 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
                      arrow_outward
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
