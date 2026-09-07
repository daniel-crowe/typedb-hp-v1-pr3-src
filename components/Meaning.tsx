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
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [phase, setPhase] = useState<MeaningPhase>("ingest");

  useGSAP(
    () => {
      const section = root.current;
      if (!section) {
        return;
      }

      const band = section.querySelector<HTMLElement>(".lifecycle-band");
      const steps = section.querySelectorAll<HTMLElement>("[data-lifecycle-step]");
      const fill = section.querySelector<HTMLElement>(".lifecycle-fill");

      if (!band) {
        return;
      }

      let last = -1;
      const applyPhase = (index: number) => {
        if (index === last) {
          return;
        }
        last = index;
        const key = STEPS[index] ?? "ingest";
        setPhase((current) => (current === key ? current : key));
        steps.forEach((node, i) => {
          const on = i <= index;
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
        steps.forEach((node) => {
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
          onUpdate: (self) => {
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
    <section className="section section-proof" ref={root} id="meaning">
      <div className="wrap">
        <h2 className="section-title">{copy.s2.h2}</h2>

        <figure className="domain-graphic">
          <div className="domain-map">
            <div className="lifecycle-band" aria-label="Ingest, update, enforce">
              <span className="lifecycle-progress" aria-hidden="true">
                <span className="lifecycle-fill" />
              </span>
              {STEPS.map((key, index) => (
                <Fragment key={key}>
                  {index > 0 ? (
                    <span className="lifecycle-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className="lifecycle-step"
                    data-lifecycle-step={key}
                    aria-pressed={phase === key}
                    onClick={() => {
                      setPhase(key);
                      seekScrub(trigger.current, index, STEPS.length);
                    }}
                  >
                    <p className="lifecycle-label">{copy.s2.graphic[key].label}</p>
                    <p>{copy.s2.graphic[key].body}</p>
                  </button>
                </Fragment>
              ))}
            </div>
            <MeaningGraphic phase={phase} />
            <ScrubBack
              index={STEPS.indexOf(phase)}
              count={STEPS.length}
              onPrevious={() => {
                const current = STEPS.indexOf(phase);
                const previous = Math.max(0, current - 1);
                const key = STEPS[previous] ?? "ingest";
                setPhase(key);
                seekScrub(trigger.current, previous, STEPS.length);
              }}
            />
          </div>
        </figure>

        <div className="prop-grid">
          {copy.s2.props.map((prop) => (
            <article key={prop.title} className="prop-card">
              <h3>{prop.title}</h3>
              <p>{prop.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
