"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReachMap() {
  const sectionRef = useRef(null);
  const textRef = useRef([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 28 });
      gsap.set(mapRef.current, { opacity: 0, scale: 0.94 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
      }).to(mapRef.current, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[120px] bg-surface-container-low border-y border-outline-variant/20"
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop items-center">
          <div>
            <h2
              ref={(el) => (textRef.current[0] = el)}
              className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6"
            >
              National Footprint,
              <br />
              <span className="text-on-background">Local Impact</span>
            </h2>
            <p
              ref={(el) => (textRef.current[1] = el)}
              className="font-body-lg text-body-lg text-on-surface-variant mb-8"
            >
              The Rural Youth Movement is active across all 36 states of
              Nigeria. Our decentralized chapter model ensures that initiatives
              are tailored to the specific agricultural and economic realities
              of each region, while remaining united under a single agenda for
              rural prosperity.
            </p>
            <div
              ref={(el) => (textRef.current[2] = el)}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-4 h-4 bg-primary rounded-full" />
              <span className="font-label-lg text-label-lg text-on-background">
                Active Chapters
              </span>
            </div>
            <div
              ref={(el) => (textRef.current[3] = el)}
              className="flex items-center gap-4"
            >
              <div className="w-4 h-4 bg-outline-variant/50 rounded-full border border-outline" />
              <span className="font-label-lg text-label-lg text-on-background">
                In Development
              </span>
            </div>
          </div>

          <div
            ref={mapRef}
            className="relative h-[400px] w-full rounded-xl bg-surface-white border border-outline-variant/30 shadow-sm flex items-center justify-center p-8"
          >
            <Image
              src="/images/agenda/nigeria-map.jpg"
              alt="Map of Nigeria highlighting active RYM state chapters"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
