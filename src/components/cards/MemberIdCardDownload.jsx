"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import MembershipCard from "./MembershipCard";

export default function MemberIdCardDownload({ member, baseUrl }) {
  const cardRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload() {
    if (!cardRef.current) return;
    setBusy(true);
    setError("");
    try {
      // Wait for fonts + images so they appear in the capture.
      if (document.fonts?.ready) await document.fonts.ready;
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
        // Skip scanning stylesheets for @font-face — the cross-origin Google
        // Fonts (Material Symbols) sheet throws a SecurityError otherwise.
        skipFonts: true,
      });
      const link = document.createElement("a");
      link.download = `RYM-ID-Card-${member?.member_code || member?.id || "member"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("ID card download failed:", e);
      setError("Could not generate the image. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div ref={cardRef}>
        <MembershipCard member={member} baseUrl={baseUrl} />
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-display-lg text-label-lg px-6 py-3 rounded-full shadow-[0px_4px_16px_rgba(15,122,61,0.25)] hover:shadow-[0px_8px_24px_rgba(15,122,61,0.35)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:translate-y-0"
      >
        <span className="material-symbols-outlined text-[20px]">
          {busy ? "progress_activity" : "download"}
        </span>
        {busy ? "Preparing…" : "Download ID Card"}
      </button>

      {error && (
        <p className="font-body-sm text-body-sm text-error">{error}</p>
      )}
    </div>
  );
}
