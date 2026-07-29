"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const DEFAULTS = {
  headingLine1: "A Blueprint for",
  headingLine2: "Rural Prosperity",
  subtext:
    "Our comprehensive agenda to revitalize rural communities through education, sustainable agriculture, youth empowerment, and active civic participation. We are building the future from the grassroots up.",
  buttonLabel: "Explore the Pillars",
  buttonHref: "#pillars",
  image: "/images/agenda/rural-prosperity.jpg",
};

export default function AgendaHero({ content }) {
  const c = { ...DEFAULTS, ...(content || {}) };
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(itemsRef.current, { opacity: 0, y: 32 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.08, x: 32 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(itemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
      }).to(
        imageRef.current,
        { opacity: 1, scale: 1, x: 0, duration: 1 },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 md:pt-20 pb-16 md:pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden"
    >
      <div className="absolute inset-0 pattern-dots -z-10" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        <div className="lg:col-span-8 z-10">
          <h1
            ref={(el) => (itemsRef.current[0] = el)}
            className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6"
          >
            {c.headingLine1}
            <br />
            <span className="text-on-background">{c.headingLine2}</span>
          </h1>
          <p
            ref={(el) => (itemsRef.current[1] = el)}
            className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl"
          >
            {c.subtext}
          </p>
          <div
            ref={(el) => (itemsRef.current[2] = el)}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={c.buttonHref}
              className="bg-primary text-on-primary font-display-lg text-label-lg px-8 py-4 rounded-lg hover:-translate-y-0.5 transition-transform shadow-[0px_4px_12px_rgba(15,122,61,0.12)]"
            >
              {c.buttonLabel}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-4 relative h-64 lg:h-full mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-secondary-container/20 rounded-xl transform rotate-3" />
          <div
            ref={imageRef}
            className="relative z-10 h-full w-full rounded-xl overflow-hidden border border-outline-variant/30"
          >
            <Image
              src={c.image}
              alt={`${c.headingLine1} ${c.headingLine2}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
