"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import statesData from "@/data/states.json";

gsap.registerPlugin(ScrollTrigger);

/** Map a count to a fill color (green intensity). */
function getHeatColor(count, max) {
  if (!count || count === 0) return "var(--color-surface-container-low)";
  const intensity = Math.min(count / Math.max(max, 1), 1);
  // From light green to deep primary
  if (intensity < 0.2) return "#c8f7d5";
  if (intensity < 0.4) return "#7bda92";
  if (intensity < 0.6) return "#4caf6a";
  if (intensity < 0.8) return "#0f7a3d";
  return "#005f2c";
}

export default function InteractiveNigeriaMap({ chapters, memberCounts, content }) {
  const router = useRouter();
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const textRef = useRef([]);
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [labelPositions, setLabelPositions] = useState({});

  const c = {
    headingLine1: "National Footprint,",
    headingLine2: "Local Impact",
    body: "The Rural Youth Movement is active across all 36 states of Nigeria. Our decentralized chapter model ensures that initiatives are tailored to the specific agricultural and economic realities of each region.",
    ...(content || {}),
  };

  // Build a lookup: state name → chapter data
  const chapterMap = {};
  (chapters || []).forEach((ch) => {
    chapterMap[ch.state?.toLowerCase()] = ch;
  });

  const maxMembers = Math.max(1, ...Object.values(memberCounts || {}));

  function handleMouseMove(e, stateName) {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 12,
    });
    setHovered(stateName);
  }

  function handleClick(stateId) {
    router.push(`/chapters/${stateId}`);
  }

  function getMemberCount(stateName) {
    // Try exact match, then title-case variations
    return memberCounts?.[stateName] || memberCounts?.[stateName?.toLowerCase()] || 0;
  }

  // Calculate center of each state path for labels after mount
  useEffect(() => {
    const positions = {};
    statesData.forEach((state) => {
      const el = document.getElementById(`path-${state.id}`);
      if (el) {
        const bbox = el.getBBox();
        positions[state.id] = {
          x: bbox.x + bbox.width / 2,
          y: bbox.y + bbox.height / 2,
        };
      }
    });
    setLabelPositions(positions);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 28 });
      gsap.set(mapRef.current, { opacity: 0, scale: 0.94 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      tl.to(textRef.current, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
      }).to(mapRef.current, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[120px] bg-surface-container-low border-y border-outline-variant/20"
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop items-center">
          {/* Text side */}
          <div>
            <h2
              ref={(el) => (textRef.current[0] = el)}
              className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6"
            >
              {c.headingLine1}
              <br />
              <span className="text-on-background">{c.headingLine2}</span>
            </h2>
            <p
              ref={(el) => (textRef.current[1] = el)}
              className="font-body-lg text-body-lg text-on-surface-variant mb-8"
            >
              {c.body}
            </p>

            {/* Legend */}
            <div
              ref={(el) => (textRef.current[2] = el)}
              className="space-y-3"
            >
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">
                Membership Density
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-4 rounded-full overflow-hidden flex-1 max-w-[200px]">
                  {["#c8f7d5", "#7bda92", "#4caf6a", "#0f7a3d", "#005f2c"].map((color) => (
                    <div key={color} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <span className="font-body-sm text-[11px] text-on-surface-variant/70 ml-2">
                  Low → High
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="font-label-md text-[12px] text-on-background">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-outline-variant/50 rounded-full border border-outline" />
                  <span className="font-label-md text-[12px] text-on-background">Forming</span>
                </div>
              </div>
              <p
                ref={(el) => (textRef.current[3] = el)}
                className="font-body-sm text-[12px] text-on-surface-variant/60 mt-4 italic"
              >
                Click any state to view chapter details →
              </p>
            </div>
          </div>

          {/* Interactive Map */}
          <div
            ref={mapRef}
            className="relative rounded-2xl bg-surface-white border border-outline-variant/30 shadow-lg p-4 lg:p-6 overflow-hidden"
          >
            <svg
              viewBox="0 0 1000 812"
              className="w-full h-auto"
              style={{ maxHeight: "500px" }}
            >
              {statesData.map((state) => {
                const chapter = chapterMap[state.name.toLowerCase()];
                const count = getMemberCount(state.name);
                const isActive = chapter?.status === "active";
                const fillColor = count > 0
                  ? getHeatColor(count, maxMembers)
                  : isActive
                    ? "#97f7ac"
                    : "var(--color-surface-container)";

                const pos = labelPositions[state.id];

                return (
                  <g key={state.id}>
                    <path
                      id={`path-${state.id}`}
                      d={state.d}
                      fill={hovered === state.name ? "var(--color-primary-container)" : fillColor}
                      stroke={hovered === state.name ? "var(--color-primary)" : "var(--color-outline-variant)"}
                      strokeWidth={hovered === state.name ? 2.5 : 1}
                      className="cursor-pointer transition-all duration-200"
                      onMouseMove={(e) => handleMouseMove(e, state.name)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => handleClick(state.id)}
                      style={{ filter: hovered === state.name ? "drop-shadow(0 2px 8px rgba(15,122,61,0.3))" : "none" }}
                    />
                    {pos && (
                      <text
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none select-none"
                        fill={hovered === state.name ? "var(--color-primary)" : "var(--color-on-background)"}
                        fontSize={18}
                        fontWeight={600}
                        opacity={0.65}
                      >
                        {state.name.length > 8 ? state.name.slice(0, 6) + "…" : state.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {hovered && (
              <div
                className="absolute z-50 px-3 py-2 rounded-xl bg-on-background text-surface-white shadow-xl pointer-events-none transition-all duration-100"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y}px`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <p className="font-label-md text-[13px] font-semibold">{hovered}</p>
                <p className="font-body-sm text-[11px] text-white/70">
                  {getMemberCount(hovered)} member{getMemberCount(hovered) !== 1 ? "s" : ""}
                  {chapterMap[hovered.toLowerCase()]?.status === "active" && (
                    <span className="text-primary-fixed ml-1">● Active</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
