"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSection({ testimonials }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!testimonials?.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.95 });

      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials]);

  if (!testimonials?.length) return null;

  return (
    <section
      ref={sectionRef}
      className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">
          Voices From the Movement
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Hear from the young leaders and community members driving change across Nigeria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Animated top border */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />

            {/* Quote icon */}
            <div className="mb-4">
              <span
                className="material-symbols-outlined text-primary/20 text-[40px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
            </div>

            {/* Quote text */}
            <p className="font-body-md text-body-md text-on-background italic flex-1 mb-6">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/15">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {t.photo_url ? (
                  <img
                    src={t.photo_url}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-primary font-semibold text-[14px]">
                    {t.name?.[0]}
                  </span>
                )}
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-background">
                  {t.name}
                </p>
                {t.role && (
                  <p className="font-body-sm text-[12px] text-on-surface-variant">
                    {t.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
