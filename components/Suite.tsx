"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";
import { copy } from "@/lib/copy";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Suite({ typeql }: { typeql: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) {
        return;
      }

      const stages = section.querySelectorAll<HTMLElement>("[data-suite-stage]");
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
        },
      });

      stages.forEach((node, index) => {
        timeline.to(
          node,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.36,
            ease: "power2.out",
            onStart: () => {
              node.classList.add("is-on");
            },
          },
          index * 0.35,
        );
      });
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
            <article key={stage.id} className="suite-stage" data-suite-stage={stage.id}>
              <p className="stack-stage-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {stage.label}
              </p>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <a href={stage.href} rel="noreferrer">
                {stage.hrefLabel}
              </a>
              {stage.id === "typeql" ? <div className="suite-typeql">{typeql}</div> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
