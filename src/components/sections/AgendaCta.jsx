"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AgendaCta() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(itemsRef.current, { opacity: 0, y: 30 });
      gsap.to(itemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-dots -z-10 opacity-50" />
      <h2
        ref={(el) => (itemsRef.current[0] = el)}
        className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-background mb-6"
      >
        Ready to <span className="text-primary">Act?</span>
      </h2>
      <p
        ref={(el) => (itemsRef.current[1] = el)}
        className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto"
      >
        The agenda is set, but the real work happens in the community. Join
        thousands of young leaders transforming rural Nigeria today.
      </p>
      <div ref={(el) => (itemsRef.current[2] = el)}>
        <Link
          href="/get-involved"
          className="inline-block bg-primary text-on-primary font-display-lg text-label-lg px-10 py-5 rounded-lg hover:-translate-y-1 transition-transform shadow-[0px_8px_24px_rgba(15,122,61,0.2)] text-lg"
        >
          Be the Change in Your Community
        </Link>
      </div>
    </section>
  );
}
