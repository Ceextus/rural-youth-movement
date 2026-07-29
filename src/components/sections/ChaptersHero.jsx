"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChaptersHero({ totalChapters = 0, totalMembers = 0 }) {
  const sectionRef = useRef(null);
  const textRef = useRef([]);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 28 });
      gsap.set(statsRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
      }).to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: totalChapters, label: "State Chapters" },
    { value: totalMembers.toLocaleString(), label: "Registered Members" },
    { value: "774", label: "Target LGAs" },
  ];

  // return (
  //   <section
  //     ref={sectionRef}
  //     className="relative pt-[100px] pb-12 md:pt-[120px] md:pb-16 bg-muted-green overflow-hidden"
  //   >
  //     {/* Dynamic Animated Background */}
  //     <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
  //       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 via-transparent to-transparent" />
  //       <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
  //       <div className="absolute top-[40%] right-[-20%] w-[70%] h-[70%] bg-[#C1F2B0]/20 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
  //     </div>
  //     <div className="absolute inset-0 topo-pattern opacity-20 z-0 pointer-events-none" />

  //     <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
  //         {/* Left Column: Text & Stats */}
  //         <div className="max-w-2xl">
  //           <p
  //             ref={(el) => (textRef.current[0] = el)}
  //             className="font-label-lg text-label-lg text-primary-fixed tracking-widest uppercase mb-4"
  //           >
  //             Our Presence
  //           </p>
  //           <h1
  //             ref={(el) => (textRef.current[1] = el)}
  //             className="font-headline-lg text-[40px] md:text-[52px] text-white font-bold leading-tight mb-5"
  //           >
  //             State Chapters
  //           </h1>
  //           <p
  //             ref={(el) => (textRef.current[2] = el)}
  //             className="font-body-lg text-[16px] md:text-[18px] text-white/80 mb-10 leading-relaxed"
  //           >
  //             RYM operates through a decentralised chapter model — each state
  //             chapter is led by local executives who understand the unique
  //             challenges and opportunities of their communities.
  //           </p>

  //           <div className="flex flex-wrap gap-8 md:gap-14">
  //             {stats.map((s, i) => (
  //               <div
  //                 key={s.label}
  //                 ref={(el) => (statsRef.current[i] = el)}
  //                 className="flex flex-col"
  //               >
  //                 <span className="font-headline-lg text-[32px] md:text-[36px] text-primary-fixed font-bold leading-none mb-1">
  //                   {s.value}
  //                 </span>
  //                 <span className="font-label-lg text-[12px] md:text-[13px] text-white/60 uppercase tracking-wider">
  //                   {s.label}
  //                 </span>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Right Column: Visual Element */}
  //         <div className="hidden lg:flex justify-end relative h-full min-h-[350px]">
  //           <div className="relative w-full max-w-[450px] h-full flex items-center justify-center">
  //             {/* Soft glow blobs */}
  //             <div className="absolute top-[5%] right-[5%] w-[250px] h-[250px] bg-primary-fixed/20 rounded-full blur-[80px]" />
  //             <div className="absolute bottom-[5%] left-[5%] w-[200px] h-[200px] bg-[#C1F2B0]/10 rounded-full blur-[60px]" />
              
  //             {/* Map Outline */}
  //             <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none drop-shadow-2xl">
  //                <img src="/ng.svg" alt="Nigeria Map Outline" className="w-[90%] h-auto drop-shadow-2xl brightness-0 invert opacity-60" />
  //             </div>

  //             {/* Floating Glassmorphism Cards */}
  //             <div className="absolute top-[15%] right-[-5%] bg-surface-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-5 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
  //               <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center mb-2 md:mb-3">
  //                 <span className="material-symbols-outlined text-primary-fixed text-[20px] md:text-[24px]">groups</span>
  //               </div>
  //               <p className="font-headline-sm text-white text-[16px] md:text-[18px] font-bold leading-tight">Grassroots Power</p>
  //               <p className="font-body-sm text-white/70 text-[12px] md:text-[13px] mt-1">Connecting every ward.</p>
  //             </div>

  //             <div className="absolute bottom-[15%] left-[0%] bg-surface-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-5 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
  //               <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center mb-2 md:mb-3">
  //                 <span className="material-symbols-outlined text-primary-fixed text-[20px] md:text-[24px]">trending_up</span>
  //               </div>
  //               <p className="font-headline-sm text-white text-[16px] md:text-[18px] font-bold leading-tight">National Impact</p>
  //               <p className="font-body-sm text-white/70 text-[12px] md:text-[13px] mt-1">Building a new Nigeria.</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}
