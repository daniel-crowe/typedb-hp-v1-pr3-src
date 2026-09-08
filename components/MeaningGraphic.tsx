"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export type MeaningPhase = "ingest" | "update" | "enforce";

const TITLES: Record<MeaningPhase, string> = {
  ingest: "Ingest: writes arrive as typed instances",
  update: "Update: production is the model",
  enforce: "Enforce: a query error, not a suggestion",
};

export function MeaningGraphic({ phase, compact = false }: { phase: MeaningPhase; compact?: boolean }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current;
      if (!svg) {
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduce ? 0 : 0.32;

      const pane = compact ? null : svg.querySelector<SVGElement>("[data-phase-pane]");
      if (pane && !reduce) {
        gsap.fromTo(pane, { autoAlpha: 0.35, y: 8 }, { autoAlpha: 1, y: 0, duration, ease: "power2.out" });
      }

      const subtype = svg.querySelector<SVGPathElement>('[data-draw="subtype"]');
      if (subtype && phase === "update") {
        const length = subtype.getTotalLength();
        gsap.fromTo(
          subtype,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: reduce ? 0 : 0.4, ease: "power2.out" },
        );
      }

      const fail = svg.querySelector<SVGElement>('[data-pop="fail"]');
      if (fail && phase === "enforce") {
        gsap.fromTo(
          fail,
          { transformOrigin: "50% 50%", scale: 0.94 },
          { scale: 1, duration: reduce ? 0 : 0.28, ease: "power2.out" },
        );
      }
    },
    { dependencies: [phase, compact], scope: root },
  );

  return (
    <svg
      ref={root}
      className={compact ? "meaning-graphic is-compact" : "meaning-graphic"}
      viewBox={compact ? "0 0 180 300" : "0 0 720 340"}
      role="img"
      data-meaning-phase={phase}
      aria-labelledby="meaning-graphic-title"
    >
      <title id="meaning-graphic-title">{TITLES[phase]}</title>

      <text className="meaning-col-label" x="16" y="18">
        type system
      </text>
      <g className="typed-node entity" transform="translate(16 28)">
        <rect width="150" height="64" rx="6" />
        <text className="typed-kind" x="12" y="20">
          entity
        </text>
        <text className="typed-name" x="12" y="40">
          person
        </text>
      </g>
      <g className="typed-node relation" transform="translate(16 110)">
        <rect width="150" height="64" rx="6" />
        <text className="typed-kind" x="12" y="20">
          relation
        </text>
        <text className="typed-name" x="12" y="40">
          employment
        </text>
      </g>
      <g className="typed-node entity" transform="translate(16 192)">
        <rect width="150" height="64" rx="6" />
        <text className="typed-kind" x="12" y="20">
          entity
        </text>
        <text className="typed-name" x="12" y="40">
          company
        </text>
      </g>

      {compact ? null : (
        <>
          <path className="typed-edge" d="M166 60 L200 60 L200 148 L218 148" fill="none" />
          <path className="typed-edge" d="M166 142 L218 142" fill="none" />
          <path className="typed-edge" d="M166 224 L200 224 L200 168 L218 168" fill="none" />
        </>
      )}
    </svg>
  );
}
