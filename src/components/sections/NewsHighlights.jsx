"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewsCard from "../cards/NewsCard";

gsap.registerPlugin(ScrollTrigger);

const NEWS = [
  {
    image: "/images/news/kano-agritech.jpg",
    alt: "Young volunteers distributing agricultural tools in a sunlit field",
    tag: "Initiative",
    date: "Oct 12, 2024",
    title: "Agri-Tech Tools Distributed in Kano Chapter",
    excerpt:
      "Empowering local farmers with modern tools to boost yield and efficiency for the upcoming season.",
  },
  {
    image: "/images/news/leadership-summit.jpg",
    alt: "A youth speaker addressing an attentive audience at a town hall meeting",
    tag: "Event",
    date: "Oct 05, 2024",
    title: "National Youth Leadership Summit 2024",
    excerpt:
      "Over 500 delegates convened to discuss the Renewed Hope Agenda and local governance strategies.",
  },
  {
    image: "/images/news/enugu-hub.jpg",
    alt: "Newly installed solar panels powering a rural digital literacy hub",
    tag: "Progress",
    date: "Sep 28, 2024",
    title: "New Digital Hub Opens in Enugu",
    excerpt:
      "Providing high-speed internet and tech training to over 200 youths in the surrounding communities.",
  },
];

export default function NewsHighlights() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      <div
        ref={headerRef}
        className="flex justify-between items-end mb-12 border-b border-outline-variant/30 pb-4"
      >
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
          Movement Highlights
        </h2>
        <Link
          href="/news"
          className="hidden md:flex items-center gap-2 text-primary font-label-lg text-label-lg group transition-colors duration-300 hover:text-primary-container"
        >
          <span>View All Updates</span>
          <span className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-5 absolute">
              arrow_forward
            </span>
            <span className="material-symbols-outlined text-[20px] transition-transform duration-300 -translate-x-5 group-hover:translate-x-0 absolute">
              arrow_forward
            </span>
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
        {NEWS.map((item, i) => (
          <NewsCard
            key={item.title}
            ref={(el) => (cardsRef.current[i] = el)}
            {...item}
          />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg group transition-colors duration-300 hover:text-primary-container"
        >
          <span>View All Updates</span>
          <span className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-5 absolute">
              arrow_forward
            </span>
            <span className="material-symbols-outlined text-[20px] transition-transform duration-300 -translate-x-5 group-hover:translate-x-0 absolute">
              arrow_forward
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
