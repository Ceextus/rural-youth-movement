"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "../forms/ContactForm";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  "Lagos",
  "Kano",
  "Enugu",
  "Kaduna",
  "Oyo",
  "Rivers",
  "Benue",
  "Sokoto",
];

export default function ContactSection({
  email = "hello@rymovement.org",
  phone,
  address = "Plot 100, Grassroots Avenue\nCentral Business District\nAbuja, FCT, Nigeria",
}) {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef(null);
  const colsRef = useRef([]);
  const accordionContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(colsRef.current, { opacity: 0, y: 32 });
      gsap.to(colsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth accordion animation
  useEffect(() => {
    if (!accordionContentRef.current) return;
    
    if (open) {
      gsap.fromTo(
        accordionContentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(accordionContentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [open]);

  return (
    <section
      ref={sectionRef}
      className="px-margin-mobile md:px-margin-desktop pt-12 md:pt-16 pb-16 md:pb-24 bg-surface-container-low border-t border-outline-variant/30 relative overflow-hidden"
    >
      {/* Subtle texture background */}
      <div className="absolute inset-0 texture-bg opacity-30 pointer-events-none" />

      <div className="max-w-container-max mx-auto relative z-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Contact Us
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8 md:mb-10">
          Reach out for press, partnerships, or to connect with a chapter near
          you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop items-start">
          {/* Info column */}
          <div
            ref={(el) => (colsRef.current[0] = el)}
            className="flex flex-col gap-6"
          >
            {/* Info Card 1 */}
            <div className="bg-surface p-6 border border-muted-green/20 rounded-xl group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute left-0 top-0 w-[4px] h-full bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">mail</span>
                </div>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface mb-1 group-hover:text-primary transition-colors duration-300">
                    General Inquiries
                  </h4>
                  <a
                    href={`mailto:${email}`}
                    className="font-body-md text-body-md text-primary mb-2 block hover:underline"
                  >
                    {email}
                  </a>
                  {phone && (
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                      {phone}
                    </p>
                  )}
                  <p className="font-body-sm text-body-sm text-on-surface-variant opacity-90 group-hover:opacity-100 transition-opacity">
                    For press, partnerships, and general questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="bg-surface p-6 border border-muted-green/20 rounded-xl group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute left-0 top-0 w-[4px] h-full bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">
                    location_on
                  </span>
                </div>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface mb-1 group-hover:text-primary transition-colors duration-300">
                    National Headquarters
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant opacity-90 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            {/* State chapters accordion */}
            <div className="bg-surface border border-muted-green/20 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 relative">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-surface-container-lowest transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">map</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">
                    Find a State Chapter
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary transition-transform duration-300 ${open ? "rotate-180 bg-primary/10" : ""}`}>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </button>
              
              <div 
                ref={accordionContentRef} 
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="p-6 pt-0 border-t border-outline-variant/20 bg-surface">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4">
                    {CHAPTERS.map((state) => (
                      <Link
                        key={state}
                        href={`/chapters/${state.toLowerCase()}`}
                        className="font-body-sm text-body-sm text-primary hover:text-primary-container transition-colors flex items-center gap-1 group/link"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary/30 group-hover/link:bg-primary transition-colors" />
                        {state}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/chapters"
                    className="group/btn inline-flex items-center gap-2 mt-6 text-center font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span>View all chapters</span>
                    <span className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/btn:translate-x-4 absolute">
                        arrow_forward
                      </span>
                      <span className="material-symbols-outlined text-[16px] transition-transform duration-300 -translate-x-4 group-hover/btn:translate-x-0 absolute">
                        arrow_forward
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div ref={(el) => (colsRef.current[1] = el)} className="bg-surface-white p-8 rounded-2xl border border-muted-green/10 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
