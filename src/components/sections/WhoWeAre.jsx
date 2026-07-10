"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: "payments",
    title: "Economic Empowerment",
    description: "Activating local economies, entrepreneurship, and job creation."
  },
  {
    icon: "gavel",
    title: "Civic Engagement",
    description: "Powering local leadership and youth governance pathways."
  },
  {
    icon: "agriculture",
    title: "Sustainable Agriculture",
    description: "Training modern farmers with climate-smart technologies."
  }
];

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const bgPlateRef = useRef(null);
  const textItemsRef = useRef([]);
  const pillarsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(bgPlateRef.current, { opacity: 0, scale: 0.8, rotate: -12 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.15, x: -32 });
      gsap.set(badgeRef.current, { opacity: 0, scale: 0.7, x: 40 });
      gsap.set(textItemsRef.current, { opacity: 0, y: 28 });
      gsap.set(pillarsRef.current, { opacity: 0, y: 32, scale: 0.95 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.to(bgPlateRef.current, { opacity: 1, scale: 1, rotate: -3, duration: 0.9 })
        .to(imageRef.current, { opacity: 1, scale: 1, x: 0, duration: 0.9 }, "-=0.7")
        .to(badgeRef.current, { opacity: 1, scale: 1, x: 0, duration: 0.7, ease: "back.out(1.5)" }, "-=0.5")
        .to(textItemsRef.current, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.6")
        .to(pillarsRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates to range [-0.5, 0.5]
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;
    
    // 3D Tilt on the image frame
    gsap.to(imageRef.current, {
      rotateY: xPct * 12,
      rotateX: -yPct * 12,
      transformPerspective: 800,
      x: xPct * 8,
      y: yPct * 8,
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Move badge in opposite direction for parallax depth
    gsap.to(badgeRef.current, {
      x: -xPct * 24,
      y: -yPct * 24,
      rotateY: xPct * 4,
      rotateX: -yPct * 4,
      transformPerspective: 800,
      duration: 0.5,
      ease: "power2.out"
    });

    // Move background plate slightly in same direction
    gsap.to(bgPlateRef.current, {
      x: xPct * 12,
      y: yPct * 12,
      rotation: -3 + xPct * 4,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to([imageRef.current, badgeRef.current], {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out"
    });
    
    gsap.to(bgPlateRef.current, {
      x: 0,
      y: 0,
      rotation: -3,
      duration: 0.6,
      ease: "power3.out"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto texture-bg overflow-visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop items-center">
        {/* Interactive Framed image */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="order-2 lg:order-1 relative py-6 select-none"
        >
          {/* Background rotated plate */}
          <div 
            ref={bgPlateRef}
            className="absolute -inset-2 bg-primary-container/10 rounded-2xl transform -rotate-3 z-0 pointer-events-none" 
          />
          
          {/* Image frame */}
          <div 
            ref={imageRef} 
            className="relative z-10 w-full h-[500px] rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <Image
              src="/images/about/community-gathering.jpg"
              alt="RYM youth leaders in conversation at a rural community gathering"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Glassmorphic Badge */}
          <div 
            ref={badgeRef}
            className="absolute bottom-12 -right-4 md:-right-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-outline-variant/40 rounded-xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] max-w-[240px] z-20 pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-primary text-[24px] p-1.5 bg-primary/10 rounded-lg">
                volunteer_activism
              </span>
              <span className="font-label-lg text-label-sm font-bold text-on-background">100% Grassroots</span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Driven entirely by local youth leaders across all 36 states of Nigeria.
            </p>
          </div>
        </div>

        {/* Copy Column */}
        <div className="order-1 lg:order-2 space-y-6">
          <h2
            ref={(el) => (textItemsRef.current[0] = el)}
            className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background"
          >
            Empowering the <span className="text-primary">Grassroots</span>
          </h2>
          <p
            ref={(el) => (textItemsRef.current[1] = el)}
            className="font-body-lg text-body-lg text-on-surface-variant"
          >
            The Rural Youth Movement is not just an organization; it is a
            catalyst for change. We believe that true national development
            begins at the local level. By equipping young leaders with the
            tools, knowledge, and network they need, we are transforming rural
            communities across Nigeria.
          </p>

          {/* Key Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-outline-variant/30">
            {PILLARS.map((pillar, i) => (
              <div 
                key={pillar.title}
                ref={(el) => (pillarsRef.current[i] = el)}
                className="group relative p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:bg-surface-white hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Top accent highlight bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                
                <span className="material-symbols-outlined text-primary text-[24px] mb-2 block group-hover:scale-110 group-hover:text-primary-container transition-all duration-300">
                  {pillar.icon}
                </span>
                <h4 className="font-label-lg text-label-sm font-bold text-on-background mb-1">
                  {pillar.title}
                </h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Action Link with Sliding Arrow */}
          <div
            ref={(el) => (textItemsRef.current[2] = el)}
            className="pt-6 border-t border-outline-variant/30"
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:text-primary-container transition-colors duration-300"
            >
              <span>Read Our Full Mission Statement</span>
              <span className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-5 absolute">
                  arrow_forward
                </span>
                <span className="material-symbols-outlined text-[20px] transition-transform duration-300 -translate-x-5 group-hover:translate-x-0 absolute text-primary-container">
                  arrow_forward
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
