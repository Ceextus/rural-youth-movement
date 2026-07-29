"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChapterAbout({ chapter }) {
  const sectionRef = useRef(null);
  const contentRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 24 });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hasContact =
    chapter.hq_address || chapter.contact_email || chapter.contact_phone;

  // If there's no about text and no contact info, don't render
  if (!chapter.about && !hasContact) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-[100px] bg-surface-container-low border-y border-outline-variant/20"
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* About text */}
          {chapter.about && (
            <div className="lg:col-span-2">
              <h2
                ref={(el) => (contentRef.current[0] = el)}
                className="font-headline-md text-headline-md text-primary mb-6"
              >
                About This Chapter
              </h2>
              <div
                ref={(el) => (contentRef.current[1] = el)}
                className="font-body-lg text-body-lg text-on-surface-variant space-y-4"
              >
                {chapter.about.split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          {/* Contact sidebar */}
          {hasContact && (
            <div
              ref={(el) => (contentRef.current[2] = el)}
              className={`${chapter.about ? "" : "lg:col-span-3"}`}
            >
              <div className="bg-surface-container rounded-xl border border-outline-variant/30 p-6 md:p-8 space-y-6">
                <h3 className="font-headline-sm text-headline-sm text-on-background flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[24px]">
                    contact_page
                  </span>
                  Contact Info
                </h3>

                {chapter.hq_address && (
                  <ContactRow icon="location_on" label="HQ Address">
                    {chapter.hq_address}
                  </ContactRow>
                )}
                {chapter.contact_email && (
                  <ContactRow icon="mail" label="Email">
                    <a
                      href={`mailto:${chapter.contact_email}`}
                      className="text-primary hover:underline break-all"
                    >
                      {chapter.contact_email}
                    </a>
                  </ContactRow>
                )}
                {chapter.contact_phone && (
                  <ContactRow icon="call" label="Phone">
                    <a
                      href={`tel:${chapter.contact_phone}`}
                      className="text-primary hover:underline"
                    >
                      {chapter.contact_phone}
                    </a>
                  </ContactRow>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="material-symbols-outlined text-[20px] text-on-surface-variant/60 mt-0.5">
        {icon}
      </span>
      <div>
        <p className="font-label-md text-label-md text-on-surface-variant/60 mb-0.5">
          {label}
        </p>
        <p className="font-body-md text-body-md text-on-background">
          {children}
        </p>
      </div>
    </div>
  );
}
