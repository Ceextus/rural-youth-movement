"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function AgendaHero() {
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
      className="relative pt-[120px] pb-[80px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden"
    >
      <div className="absolute inset-0 pattern-dots -z-10" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        <div className="lg:col-span-8 z-10">
          <h1
            ref={(el) => (itemsRef.current[0] = el)}
            className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6"
          >
            A Blueprint for
            <br />
            <span className="text-on-background">Rural Prosperity</span>
          </h1>
          <p
            ref={(el) => (itemsRef.current[1] = el)}
            className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl"
          >
            Our comprehensive agenda to revitalize rural communities through
            education, sustainable agriculture, youth empowerment, and active
            civic participation. We are building the future from the grassroots
            up.
          </p>
          <div
            ref={(el) => (itemsRef.current[2] = el)}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#pillars"
              className="bg-primary text-on-primary font-display-lg text-label-lg px-8 py-4 rounded-lg hover:-translate-y-0.5 transition-transform shadow-[0px_4px_12px_rgba(15,122,61,0.12)]"
            >
              Explore the Pillars
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
              src="/images/agenda/rural-prosperity.jpg"
              alt="Illustration of rolling hills and wind turbines representing rural prosperity"
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
