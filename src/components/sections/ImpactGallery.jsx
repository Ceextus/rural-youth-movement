"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  {
    src: "/images/hero/hero-community.jpg",
    caption: "United across 36 states",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/news/leadership-summit.jpg",
    caption: "Youth Leadership Summit 2024",
    span: "sm:col-span-2",
  },
  {
    src: "/images/news/kano-agritech.jpg",
    caption: "Agri-tech tools in Kano",
    span: "",
  },
  {
    src: "/images/news/enugu-hub.jpg",
    caption: "Digital hub, Enugu",
    span: "",
  },
  {
    src: "/images/about/farmers-modern-equipment.jpg",
    caption: "Modern agriculture in action",
    span: "sm:col-span-2",
  },
  {
    src: "/images/about/community-gathering.jpg",
    caption: "Grassroots dialogue",
    span: "sm:col-span-2",
  },
];

export default function ImpactGallery() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 28 });
      gsap.set(itemsRef.current, { opacity: 0, y: 40, scale: 0.96 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.7 }).to(
        itemsRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-white border-y border-outline-variant/30 relative overflow-hidden"
    >
      <div className="max-w-container-max mx-auto">
        <div ref={headerRef} className="max-w-2xl mb-12 md:mb-16">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/20">
            On The Ground
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-6 mb-4">
            Our Impact in Pictures
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Real moments from chapters, summits, and communities across the
            nation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 auto-rows-[220px] gap-4">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => (itemsRef.current[i] = el)}
              className={`group relative rounded-2xl overflow-hidden border border-outline-variant/30 ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-label-lg text-label-lg text-white drop-shadow-md">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
