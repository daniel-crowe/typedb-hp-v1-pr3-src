"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type ReactNode } from "react";
import { copy } from "@/lib/copy";
import { phaseFromProgress, seekScrub } from "@/lib/scrub-seek";
import { ScrubBack } from "./ScrubBack";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Suite({ typeql }: { typeql: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const applyRef = useRef<(index: number) => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) {
        return;
      }

      const stages = section.querySelectorAll<HTMLElement>("[data-suite-stage]");
      let last = -1;
      const apply = (index: number) => {
        if (index === last) {
          return;
        }
        last = index;
        setActiveIndex((current) => (current === index ? current : index));
        stages.forEach((node, i) => {
          const on = i <= index;
          node.classList.toggle("is-on", on);
          gsap.to(node, {
            autoAlpha: on ? 1 : 0.3,
            y: on ? 0 : 16,
            duration: 0.2,
            overwrite: "auto",
          });
        });
      };
      applyRef.current = apply;

      if (reducedMotionOn()) {
        section.classList.add("is-poster");
        stages.forEach((node) => {
          node.classList.add("is-on");
        });
        return;
      }

      gsap.set(stages, { autoAlpha: 0.3, y: 16 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector(".suite-board"),
          start: "top 76%",
          end: "bottom 36%",
          scrub: 0.65,
          onUpdate: (self) => {
            apply(phaseFromProgress(self.progress, stages.length));
          },
        },
      });
      timeline.to({}, { duration: 1 });
      trigger.current = timeline.scrollTrigger ?? null;
    },
    { scope: root },
  );

  return (
    <section className="section section-proof" ref={root} id="suite">
      <div className="wrap">
        <p className="eyebrow">{copy.s5.eyebrow}</p>
        <h2 className="section-title">{copy.s5.h2}</h2>
        <p className="lede">{copy.s5.lede}</p>
        <div className="suite-board">
          {copy.s5.stages.map((stage, index) => (
            <article
              key={stage.id}
              className="suite-stage"
              data-suite-stage={stage.id}
              tabIndex={0}
              role="button"
              aria-label={`${stage.label}: ${stage.title}`}
              onClick={() => {
                if (trigger.current) {
                  seekScrub(trigger.current, index, copy.s5.stages.length);
                  return;
                }
                applyRef.current(index);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (trigger.current) {
                    seekScrub(trigger.current, index, copy.s5.stages.length);
                    return;
                  }
                  applyRef.current(index);
                }
              }}
            >
              <p className="stack-stage-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {stage.label}
              </p>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <a
                href={stage.href}
                rel="noreferrer"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                {stage.hrefLabel}
              </a>
              {stage.id === "typeql" ? <div className="suite-typeql">{typeql}</div> : null}
            </article>
          ))}
        </div>
        <ScrubBack
          index={activeIndex}
          count={copy.s5.stages.length}
          onPrevious={() => {
            const previous = Math.max(0, activeIndex - 1);
            if (trigger.current) {
              seekScrub(trigger.current, previous, copy.s5.stages.length);
              return;
            }
            applyRef.current(previous);
          }}
        />
      </div>
    </section>
  );
}
