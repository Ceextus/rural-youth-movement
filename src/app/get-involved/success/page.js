"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ShareModal from "@/components/forms/ShareModal";

export default function GetInvolvedSuccessPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [member, setMember] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("rym_member");
      if (stored) setMember(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const membershipId = member?.id
    ? `RYM-${member.id.slice(0, 8).toUpperCase()}`
    : "PENDING-VERIFICATION";
  const region = member?.state || "National Registry";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = rootRef.current.querySelectorAll("[data-reveal]");
      gsap.set(items, { opacity: 0, y: 24 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-margin-mobile py-16 md:py-20 bg-surface min-h-[calc(100vh-5rem)] flex">
      <div
        ref={rootRef}
        className="flex-grow flex flex-col items-center justify-center max-w-md mx-auto w-full text-center"
      >
        {/* Success icon */}
        <div data-reveal className="mb-8">
          <div className="w-24 h-24 bg-primary-container/10 rounded-full flex items-center justify-center border-4 border-primary-container relative">
            <div className="absolute inset-0 bg-primary-container/20 rounded-full animate-ping opacity-75" />
            <span
              className="material-symbols-outlined text-[48px] text-primary relative z-10"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
        </div>

        {/* Typography */}
        <div data-reveal className="mb-8">
          <h1 className="font-headline-lg text-headline-lg-mobile text-on-surface mb-4">
            Welcome to the Movement!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            You are now an official member of the Rural Youth Movement.
            Together, we are building the future of rural Nigeria across all 36
            states.
          </p>
        </div>

        {/* Member card */}
        <div
          data-reveal
          className="w-full bg-surface-white border border-muted-green/10 rounded-lg p-6 mb-10 shadow-[0px_4px_12px_rgba(15,122,61,0.05)] relative overflow-hidden text-left"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-primary text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                badge
              </span>
              <span className="font-label-lg text-label-lg text-on-surface">
                Member Status
              </span>
            </div>
            <div className="bg-primary-container/10 px-3 py-1 rounded-full border border-primary-container/20">
              <span className="font-label-md text-label-md text-primary">
                Active
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant block mb-1">
                Membership ID
              </span>
              <span className="font-body-md text-body-md text-on-surface font-mono tracking-widest bg-surface-container px-2 py-1 rounded">
                {membershipId}
              </span>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 mt-4">
              <span className="font-label-md text-label-md text-on-surface-variant block mb-1">
                Region
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                {region}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div data-reveal className="w-full space-y-4">
          <Link
            href="/"
            className="w-full bg-primary text-surface-white font-display-lg text-label-lg py-4 px-6 rounded-lg hover:-translate-y-[2px] hover:shadow-[0px_8px_16px_rgba(15,122,61,0.2)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Go to Homepage</span>
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="w-full bg-transparent border-2 border-primary text-primary font-display-lg text-label-lg py-4 px-6 rounded-lg hover:bg-primary/5 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span>Share the Movement</span>
          </button>
        </div>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </section>
  );
}
