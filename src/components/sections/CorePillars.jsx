"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CorePillars() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 28 });
      gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.96 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.7 }).to(
        cardsRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="py-[80px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-24"
    >
      <div ref={headerRef} className="mb-12">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Core Pillars
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Strategic initiatives designed to create sustainable impact across
          rural communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-mobile md:gap-gutter-desktop">
        {/* Education (wide) */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="lg:col-span-2 bg-surface-container-lowest border-t-4 border-primary border-x border-b border-x-outline-variant/30 border-b-outline-variant/30 rounded-xl p-8 hover:shadow-[0px_8px_24px_rgba(15,122,61,0.08)] transition-shadow group"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">
                school
              </span>
            </div>
            <span className="bg-primary/10 text-primary font-label-md text-label-md px-3 py-1 rounded-full">
              Priority 01
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors">
            Education &amp; Literacy
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Equipping the next generation with essential skills. We focus on
            foundational literacy, digital skills training, and establishing
            community learning centers to bridge the educational divide in rural
            areas.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <span className="block font-headline-md text-headline-md text-primary mb-1">
                50+
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Learning Hubs
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg">
              <span className="block font-headline-md text-headline-md text-primary mb-1">
                10k
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Students Reached
              </span>
            </div>
          </div>
        </div>

        {/* Agriculture */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 hover:shadow-[0px_8px_24px_rgba(15,122,61,0.08)] transition-shadow group flex flex-col"
        >
          <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">
              agriculture
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors">
            Sustainable Farming
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
            Modernizing rural agriculture through access to better seeds,
            sustainable farming techniques, and direct-to-market cooperatives.
          </p>
          <Link
            href="#"
            className="inline-flex items-center text-primary font-label-lg text-label-lg group/link"
          >
            Read the Agri-Plan
            <span className="material-symbols-outlined ml-2 group-hover/link:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Youth Employment */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 hover:shadow-[0px_8px_24px_rgba(15,122,61,0.08)] transition-shadow group"
        >
          <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">
              work
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors">
            Youth Employment
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Stimulating local economies by fostering rural entrepreneurship and
            creating pathways to vocational training tailored to regional needs.
          </p>
        </div>

        {/* Civic Engagement (wide, dark) */}
        <div
          ref={(el) => (cardsRef.current[3] = el)}
          className="lg:col-span-2 bg-muted-green text-surface-white rounded-xl p-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-fixed to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-12 h-12 bg-surface-white/10 rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary-fixed text-3xl">
                  how_to_vote
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-surface-white mb-3">
                Civic Engagement
              </h3>
              <p className="font-body-md text-body-md text-surface-variant/80 mb-6">
                Empowering youth to take an active role in local governance. We
                facilitate town halls, leadership workshops, and voter
                registration drives to ensure rural voices are heard.
              </p>
              <Link
                href="/get-involved"
                className="inline-block border-2 border-primary-fixed text-primary-fixed font-display-lg text-label-lg px-6 py-2 rounded-lg hover:bg-primary-fixed hover:text-muted-green transition-colors"
              >
                Join the Civic Network
              </Link>
            </div>
            <div className="flex-1 w-full relative h-48 md:h-64 rounded-lg overflow-hidden border border-surface-white/10">
              <Image
                src="/images/agenda/civic-townhall.jpg"
                alt="Young adults engaged in a lively town hall discussion"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
