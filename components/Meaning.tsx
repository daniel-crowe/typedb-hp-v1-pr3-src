"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { copy } from "@/lib/copy";
import { TypedFactGraph } from "./TypedFactGraph";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = ["ingest", "update", "enforce"] as const;

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Meaning() {
  const root = useRef<HTMLElement>(null);

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

      if (reducedMotionOn()) {
        band.classList.add("is-poster");
        steps.forEach((node) => {
          node.classList.add("is-on");
        });
        if (fill) {
          fill.style.transform = "scaleX(1)";
        }
        return;
      }

      gsap.set(steps, { autoAlpha: 0.28, y: 14 });
      if (fill) {
        gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: band,
          start: "top 78%",
          end: "bottom 32%",
          scrub: 0.7,
        },
      });

      STEPS.forEach((key, index) => {
        const node = section.querySelector<HTMLElement>(`[data-lifecycle-step="${key}"]`);
        if (!node) {
          return;
        }
        const at = index * 0.4;
        timeline.to(
          node,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
            onStart: () => {
              node.classList.add("is-on");
            },
          },
          at,
        );
        if (fill) {
          timeline.to(fill, { scaleX: (index + 1) / STEPS.length, duration: 0.38, ease: "none" }, at);
        }
      });
    },
    { scope: root },
  );

  return (
    <section className="section section-proof" ref={root} id="meaning">
      <div className="wrap">
        <p className="eyebrow">{copy.s2.eyebrow}</p>
        <h2 className="section-title">{copy.s2.h2}</h2>
        <p className="lede">{copy.s2.lede}</p>

        <figure className="domain-graphic">
          <figcaption>
            <strong>{copy.s2.graphic.title}</strong>
            <span>{copy.s2.graphic.lede}</span>
          </figcaption>
          <div className="domain-map">
            <div className="lifecycle-band" aria-label="Ingest, update, enforce">
              <span className="lifecycle-progress" aria-hidden="true">
                <span className="lifecycle-fill" />
              </span>
              <article data-lifecycle-step="ingest">
                <p className="lifecycle-label">{copy.s2.graphic.ingest.label}</p>
                <p>{copy.s2.graphic.ingest.body}</p>
              </article>
              <span className="lifecycle-arrow" aria-hidden="true">
                →
              </span>
              <article data-lifecycle-step="update">
                <p className="lifecycle-label">{copy.s2.graphic.update.label}</p>
                <p>{copy.s2.graphic.update.body}</p>
              </article>
              <span className="lifecycle-arrow" aria-hidden="true">
                →
              </span>
              <article data-lifecycle-step="enforce">
                <p className="lifecycle-label">{copy.s2.graphic.enforce.label}</p>
                <p>{copy.s2.graphic.enforce.body}</p>
              </article>
            </div>
            <TypedFactGraph
              id="meaning-map"
              caption="The same fact stays on the map while writes arrive, change, and fail closed."
            />
          </div>
        </figure>

        <div className="prop-grid">
          {copy.s2.props.map((prop) => (
            <article key={prop.title} className="prop-card">
              <div className="metric-slot" aria-hidden="true" />
              <h3>{prop.title}</h3>
              <p>{prop.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
