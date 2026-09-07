"use client";

import { Fragment, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy } from "@/lib/copy";
import { phaseFromProgress, seekScrub } from "@/lib/scrub-seek";
import { MeaningGraphic, type MeaningPhase } from "./MeaningGraphic";
import { ScrubBack } from "./ScrubBack";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = ["ingest", "update", "enforce"] as const;

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Meaning() {
  const root = useRef\u003cHTMLElement\u003e(null);
  const trigger = useRef\u003cScrollTrigger | null\u003e(null);
  const [phase, setPhase] = useState\u003cMeaningPhase\u003e("ingest");

  useGSAP(
    () =\u003e {
      const section = root.current;
      if (!section) {
        return;
      }

      const band = section.querySelector\u003cHTMLElement\u003e(".lifecycle-band");
      const steps = section.querySelectorAll\u003cHTMLElement\u003e("[data-lifecycle-step]");
      const fill = section.querySelector\u003cHTMLElement\u003e(".lifecycle-fill");

      if (!band) {
        return;
      }

      let last = -1;
      const applyPhase = (index: number) =\u003e {
        if (index === last) {
          return;
        }
        last = index;
        const key = STEPS[index] ?? "ingest";
        setPhase((current) =\u003e (current === key ? current : key));
        steps.forEach((node, i) =\u003e {
          const on = i \u003c= index;
          node.classList.toggle("is-on", on);
          gsap.to(node, { autoAlpha: on ? 1 : 0.4, duration: 0.2, overwrite: "auto" });
        });
        if (fill) {
          gsap.to(fill, {
            scaleX: (index + 1) / STEPS.length,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      };

      if (reducedMotionOn()) {
        band.classList.add("is-poster");
        if (fill) {
          fill.style.transform = "scaleX(1)";
        }
        steps.forEach((node) =\u003e {
          node.classList.add("is-on");
        });
        return;
      }

      gsap.set(steps, { autoAlpha: 0.4 });
      if (fill) {
        gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: band,
          start: "top 78%",
          end: "bottom 32%",
          scrub: 0.7,
          onUpdate: (self) =\u003e {
            applyPhase(phaseFromProgress(self.progress, STEPS.length));
          },
        },
      });
      timeline.to({}, { duration: 1 });
      trigger.current = timeline.scrollTrigger ?? null;
    },
    { scope: root },
  );

  return (
    \u003csection className="section section-proof" ref={root} id="meaning"\u003e
      \u003cdiv className="wrap"\u003e
        \u003ch2 className="section-title"\u003e{copy.s2.h2}\u003c/h2\u003e

        \u003cfigure className="domain-graphic"\u003e
          \u003cdiv className="domain-map"\u003e
            \u003cdiv className="lifecycle-band" aria-label="Ingest, update, enforce"\u003e
              \u003cspan className="lifecycle-progress" aria-hidden="true"\u003e
                \u003cspan className="lifecycle-fill" /\u003e
              \u003c/span\u003e
              {STEPS.map((key, index) =\u003e (
                \u003cFragment key={key}\u003e
                  {index \u003e 0 ? (
                    \u003cspan className="lifecycle-arrow" aria-hidden="true"\u003e
                      →
                    \u003c/span\u003e
                  ) : null}
                  \u003cbutton
                    type="button"
                    className="lifecycle-step"
                    data-lifecycle-step={key}
                    aria-pressed={phase === key}
                    onClick={() =\u003e {
                      setPhase(key);
                      seekScrub(trigger.current, index, STEPS.length);
                    }}
                  \u003e
                    \u003cp className="lifecycle-label"\u003e{copy.s2.graphic[key].label}\u003c/p\u003e
                    \u003cp\u003e{copy.s2.graphic[key].body}\u003c/p\u003e
                  \u003c/button\u003e
                \u003c/Fragment\u003e
              ))}
            \u003c/div\u003e
            \u003cMeaningGraphic phase={phase} /\u003e
            \u003cScrubBack
              index={STEPS.indexOf(phase)}
              count={STEPS.length}
              onPrevious={() =\u003e {
                const current = STEPS.indexOf(phase);
                const previous = Math.max(0, current - 1);
                const key = STEPS[previous] ?? "ingest";
                setPhase(key);
                seekScrub(trigger.current, previous, STEPS.length);
              }}
            /\u003e
          \u003c/div\u003e
        \u003c/figure\u003e

        \u003cdiv className="prop-grid"\u003e
          {copy.s2.props.map((prop) =\u003e (
            \u003carticle key={prop.title} className="prop-card"\u003e
              \u003ch3\u003e{prop.title}\u003c/h3\u003e
              \u003cp\u003e{prop.body}\u003c/p\u003e
            \u003c/article\u003e
          ))}
        \u003c/div\u003e
      \u003c/div\u003e
    \u003c/section\u003e
  );
}
