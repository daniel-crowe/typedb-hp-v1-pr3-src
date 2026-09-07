"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export type MeaningPhase = "ingest" | "update" | "enforce";

const TITLES: Record\u003cMeaningPhase, string\u003e = {
  ingest: "Ingest: writes arrive as typed instances",
  update: "Update: production is the model",
  enforce: "Enforce: a query error, not a suggestion",
};

export function MeaningGraphic({ phase }: { phase: MeaningPhase }) {
  const root = useRef\u003cSVGSVGElement\u003e(null);

  useGSAP(
    () =\u003e {
      const svg = root.current;
      if (!svg) {
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduce ? 0 : 0.32;

      const pane = svg.querySelector\u003cSVGElement\u003e("[data-phase-pane]");
      if (pane \u0026\u0026 !reduce) {
        gsap.fromTo(pane, { autoAlpha: 0.35, y: 8 }, { autoAlpha: 1, y: 0, duration, ease: "power2.out" });
      }

      const subtype = svg.querySelector\u003cSVGPathElement\u003e('[data-draw="subtype"]');
      if (subtype \u0026\u0026 phase === "update") {
        const length = subtype.getTotalLength();
        gsap.fromTo(
          subtype,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: reduce ? 0 : 0.4, ease: "power2.out" },
        );
      }

      const fail = svg.querySelector\u003cSVGElement\u003e('[data-pop="fail"]');
      if (fail \u0026\u0026 phase === "enforce") {
        gsap.fromTo(
          fail,
          { transformOrigin: "50% 50%", scale: 0.94 },
          { scale: 1, duration: reduce ? 0 : 0.28, ease: "power2.out" },
        );
      }
    },
    { dependencies: [phase], scope: root },
  );

  return (
    \u003csvg
      ref={root}
      className="meaning-graphic"
      viewBox="0 0 720 340"
      role="img"
      data-meaning-phase={phase}
      aria-labelledby="meaning-graphic-title"
    \u003e
      \u003ctitle id="meaning-graphic-title"\u003e{TITLES[phase]}\u003c/title\u003e

      \u003ctext className="meaning-col-label" x="16" y="18"\u003e
        type system
      \u003c/text\u003e
      \u003cg className="typed-node entity" transform="translate(16 28)"\u003e
        \u003crect width="150" height="64" rx="6" /\u003e
        \u003ctext className="typed-kind" x="12" y="20"\u003e
          entity
        \u003c/text\u003e
        \u003ctext className="typed-name" x="12" y="40"\u003e
          person
        \u003c/text\u003e
      \u003c/g\u003e
      \u003cg className="typed-node relation" transform="translate(16 110)"\u003e
        \u003crect width="150" height="64" rx="6" /\u003e
        \u003ctext className="typed-kind" x="12" y="20"\u003e
          relation
        \u003c/text\u003e
        \u003ctext className="typed-name" x="12" y="40"\u003e
          employment
        \u003c/text\u003e
      \u003c/g\u003e
      \u003cg className="typed-node entity" transform="translate(16 192)"\u003e
        \u003crect width="150" height="64" rx="6" /\u003e
        \u003ctext className="typed-kind" x="12" y="20"\u003e
          entity
        \u003c/text\u003e
        \u003ctext className="typed-name" x="12" y="40"\u003e
          company
        \u003c/text\u003e
      \u003c/g\u003e

      \u003cpath className="typed-edge" d="M166 60 L200 60 L200 148 L218 148" fill="none" /\u003e
      \u003cpath className="typed-edge" d="M166 142 L218 142" fill="none" /\u003e
      \u003cpath className="typed-edge" d="M166 224 L200 224 L200 168 L218 168" fill="none" /\u003e

      \u003cg className="typed-node relation" transform="translate(218 118)"\u003e
        \u003crect width="168" height="88" rx="6" /\u003e
        \u003ctext className="typed-kind" x="12" y="20"\u003e
          n-party fact
        \u003c/text\u003e
        \u003ctext className="typed-name" x="12" y="40"\u003e
          employment
        \u003c/text\u003e
        \u003ctext className="typed-role" x="12" y="62"\u003e
          employee · employer
        \u003c/text\u003e
        \u003ctext className="typed-inst" x="12" y="78"\u003e
          on: project
        \u003c/text\u003e
      \u003c/g\u003e

      \u003crect className="meaning-phase-frame" x="408" y="20" width="296" height="292" rx="8" /\u003e
      \u003cg data-phase-pane=""\u003e
        \u003cg data-show="ingest"\u003e
          \u003ctext className="meaning-col-label" x="424" y="42"\u003e
            instances
          \u003c/text\u003e
          \u003cg className="typed-node entity" transform="translate(424 54)"\u003e
            \u003crect width="264" height="56" rx="6" /\u003e
            \u003ctext className="typed-kind" x="12" y="20"\u003e
              person
            \u003c/text\u003e
            \u003ctext className="typed-name" x="12" y="40"\u003e
              Alice
            \u003c/text\u003e
          \u003c/g\u003e
          \u003cg className="typed-node entity" transform="translate(424 122)"\u003e
            \u003crect width="264" height="56" rx="6" /\u003e
            \u003ctext className="typed-kind" x="12" y="20"\u003e
              company
            \u003c/text\u003e
            \u003ctext className="typed-name" x="12" y="40"\u003e
              TypeDB
            \u003c/text\u003e
          \u003c/g\u003e
          \u003cg className="typed-node attribute" transform="translate(424 190)"\u003e
            \u003crect width="264" height="56" rx="6" /\u003e
            \u003ctext className="typed-kind" x="12" y="20"\u003e
              project
            \u003c/text\u003e
            \u003ctext className="typed-name" x="12" y="40"\u003e
              homepage
            \u003c/text\u003e
          \u003c/g\u003e
          \u003ctext className="meaning-note" x="424" y="274"\u003e
            Writes arrive as typed instances.
          \u003c/text\u003e
        \u003c/g\u003e

        \u003cg data-show="update"\u003e
          \u003ctext className="meaning-col-label" x="424" y="42"\u003e
            subtype write
          \u003c/text\u003e
          \u003cg className="typed-node entity" transform="translate(424 54)"\u003e
            \u003crect width="264" height="56" rx="6" /\u003e
            \u003ctext className="typed-kind" x="12" y="20"\u003e
              type
            \u003c/text\u003e
            \u003ctext className="typed-name" x="12" y="40"\u003e
              person
            \u003c/text\u003e
          \u003c/g\u003e
          \u003cpath
            className="meaning-subtype-edge"
            data-draw="subtype"
            d="M556 110 L556 132"
            fill="none"
          /\u003e
          \u003cg className="typed-node entity meaning-subtype" transform="translate(424 134)"\u003e
            \u003crect width="264" height="56" rx="6" /\u003e
            \u003ctext className="typed-kind" x="12" y="20"\u003e
              subtype
            \u003c/text\u003e
            \u003ctext className="typed-name" x="12" y="40"\u003e
              employee
            \u003c/text\u003e
          \u003c/g\u003e
          \u003cg className="typed-node entity" transform="translate(424 204)"\u003e
            \u003crect width="264" height="56" rx="6" /\u003e
            \u003ctext className="typed-kind" x="12" y="20"\u003e
              match $p isa person
            \u003c/text\u003e
            \u003ctext className="typed-name" x="12" y="40"\u003e
              Alice still matches
            \u003c/text\u003e
          \u003c/g\u003e
          \u003ctext className="meaning-note" x="424" y="286"\u003e
            Production is the model.
          \u003c/text\u003e
        \u003c/g\u003e

        \u003cg data-show="enforce"\u003e
          \u003ctext className="meaning-col-label" x="424" y="42"\u003e
            query error
          \u003c/text\u003e
          \u003cg className="typed-node meaning-fail" data-pop="fail" transform="translate(424 70)"\u003e
            \u003crect width="264" height="120" rx="6" /\u003e
            \u003ctext className="typed-kind" x="12" y="24"\u003e
              role rejected
            \u003c/text\u003e
            \u003ctext className="typed-name" x="12" y="50"\u003e
              person as employer
            \u003c/text\u003e
            \u003ctext className="typed-inst" x="12" y="74"\u003e
              TypeDB enforces.
            \u003c/text\u003e
            \u003ctext className="typed-inst" x="12" y="94"\u003e
              It does not suggest.
            \u003c/text\u003e
          \u003c/g\u003e
          \u003ctext className="meaning-fail-line" x="424" y="226"\u003e
            Type person cannot play
          \u003c/text\u003e
          \u003ctext className="meaning-fail-line" x="424" y="246"\u003e
            employment:employer
          \u003c/text\u003e
          \u003ctext className="meaning-note" x="424" y="286"\u003e
            Agents introspect the schema.
          \u003c/text\u003e
        \u003c/g\u003e
      \u003c/g\u003e
    \u003c/svg\u003e
  );
}
