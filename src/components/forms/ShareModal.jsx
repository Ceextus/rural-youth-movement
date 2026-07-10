"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SHARE_TEXT =
  "I just joined the Rural Youth Movement (RYM) — building the future of rural Nigeria across all 36 states. Join me!";

export default function ShareModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/get-involved`
      : "https://rymovement.org/get-involved";

  useEffect(() => {
    if (open && cardRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }
      );
    }
  }, [open]);

  if (!open) return null;

  const links = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${shareUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(shareUrl)}`,
  };

  const openShare = (url) =>
    window.open(url, "_blank", "noopener,noreferrer");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-margin-mobile bg-inverse-surface/60 backdrop-blur-sm"
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-white w-full max-w-md rounded-lg shadow-xl overflow-hidden relative"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Share the Movement
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Spread the word and invite other youth in your community to join the
            mission for rural prosperity.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => openShare(links.whatsapp)}
              className="flex items-center justify-center gap-2 bg-primary text-surface-white py-3 px-4 rounded hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span className="font-label-lg text-label-lg">WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => openShare(links.facebook)}
              className="flex items-center justify-center gap-2 bg-surface-container text-on-surface py-3 px-4 rounded hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                public
              </span>
              <span className="font-label-lg text-label-lg">Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => openShare(links.twitter)}
              className="flex items-center justify-center gap-2 bg-surface-container text-on-surface py-3 px-4 rounded hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
              <span className="font-label-lg text-label-lg">X / Twitter</span>
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="flex items-center justify-center gap-2 bg-surface-container text-on-surface py-3 px-4 rounded hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {copied ? "check" : "link"}
              </span>
              <span className="font-label-lg text-label-lg">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-on-surface-variant font-label-lg text-label-lg hover:underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
