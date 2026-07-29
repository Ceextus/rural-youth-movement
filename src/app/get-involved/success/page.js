"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ShareModal from "@/components/forms/ShareModal";
import MembershipCard from "@/components/cards/MembershipCard";

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
        <div data-reveal className="w-full mb-10">
          <MembershipCard member={member} />
        </div>

        {/* Actions */}
        <div data-reveal className="w-full space-y-4">
          <button
            type="button"
            onClick={() => {
              const url = `${window.location.origin}/verify/${member?.id}`;
              navigator.clipboard.writeText(url);
              alert("Verification link copied to clipboard!");
            }}
            className="w-full bg-surface-white border-2 border-primary text-primary font-display-lg text-label-lg py-4 px-6 rounded-lg hover:bg-primary/5 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">content_copy</span>
            <span>Copy Verification Link</span>
          </button>
          
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
