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

      <g className="typed-node relation" transform="translate(218 118)">
        <rect width="168" height="88" rx="6" />
        <text className="typed-kind" x="12" y="20">
          n-party fact
        </text>
        <text className="typed-name" x="12" y="40">
          employment
        </text>
        <text className="typed-role" x="12" y="62">
          employee · employer
        </text>
        <text className="typed-inst" x="12" y="78">
          on: project
        </text>
      </g>

      <rect className="meaning-phase-frame" x="408" y="20" width="296" height="292" rx="8" />
      <g data-phase-pane="">
        <g data-show="ingest">
          <text className="meaning-col-label" x="424" y="42">
            instances
          </text>
          <g className="typed-node entity" transform="translate(424 54)">
            <rect width="264" height="56" rx="6" />
            <text className="typed-kind" x="12" y="20">
              person
            </text>
            <text className="typed-name" x="12" y="40">
              Alice
            </text>
          </g>
          <g className="typed-node entity" transform="translate(424 122)">
            <rect width="264" height="56" rx="6" />
            <text className="typed-kind" x="12" y="20">
              company
            </text>
            <text className="typed-name" x="12" y="40">
              TypeDB
            </text>
          </g>
          <g className="typed-node attribute" transform="translate(424 190)">
            <rect width="264" height="56" rx="6" />
            <text className="typed-kind" x="12" y="20">
              project
            </text>
            <text className="typed-name" x="12" y="40">
              homepage
            </text>
          </g>
          <text className="meaning-note" x="424" y="274">
            Writes arrive as typed instances.
          </text>
        </g>

        <g data-show="update">
          <text className="meaning-col-label" x="424" y="42">
            subtype write
          </text>
          <g className="typed-node entity" transform="translate(424 54)">
            <rect width="264" height="56" rx="6" />
            <text className="typed-kind" x="12" y="20">
              type
            </text>
            <text className="typed-name" x="12" y="40">
              person
            </text>
          </g>
          <path
            className="meaning-subtype-edge"
            data-draw="subtype"
            d="M556 110 L556 132"
            fill="none"
          />
          <g className="typed-node entity meaning-subtype" transform="translate(424 134)">
            <rect width="264" height="56" rx="6" />
            <text className="typed-kind" x="12" y="20">
              subtype
            </text>
            <text className="typed-name" x="12" y="40">
              employee
            </text>
          </g>
          <g className="typed-node entity" transform="translate(424 204)">
            <rect width="264" height="56" rx="6" />
            <text className="typed-kind" x="12" y="20">
              match $p isa person
            </text>
            <text className="typed-name" x="12" y="40">
              Alice still matches
            </text>
          </g>
          <text className="meaning-note" x="424" y="286">
            Production is the model.
          </text>
        </g>

        <g data-show="enforce">
          <text className="meaning-col-label" x="424" y="42">
            query error
          </text>
          <g className="typed-node meaning-fail" data-pop="fail" transform="translate(424 70)">
            <rect width="264" height="120" rx="6" />
            <text className="typed-kind" x="12" y="24">
              role rejected
            </text>
            <text className="typed-name" x="12" y="50">
              person as employer
            </text>
            <text className="typed-inst" x="12" y="74">
              TypeDB enforces.
            </text>
            <text className="typed-inst" x="12" y="94">
              It does not suggest.
            </text>
          </g>
          <text className="meaning-fail-line" x="424" y="226">
            Type person cannot play
          </text>
          <text className="meaning-fail-line" x="424" y="246">
            employment:employer
          </text>
          <text className="meaning-note" x="424" y="286">
            Agents introspect the schema.
          </text>
        </g>
      </g>
        </>
      )}
    </svg>
  );
}
