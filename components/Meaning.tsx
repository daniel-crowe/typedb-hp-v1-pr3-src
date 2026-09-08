"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { MeaningGraphic, type MeaningPhase } from "./MeaningGraphic";

const STEPS = ["ingest", "update", "enforce"] as const;
const TICK_MS = 3000;

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Meaning() {
  const root = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<MeaningPhase>("ingest");
  const hold = useRef(false);

  useEffect(() => {
    const section = root.current;
    if (!section) {
      return;
    }

    if (reducedMotionOn()) {
      section.querySelector(".lifecycle-band")?.classList.add("is-poster");
      return;
    }

    let timer: number | null = null;
    const start = () => {
      if (timer !== null || hold.current) {
        return;
      }
      timer = window.setInterval(() => {
        setPhase((current) => {
          const index = STEPS.indexOf(current);
          return STEPS[(index + 1) % STEPS.length] ?? "ingest";
        });
      }, TICK_MS);
    };
    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.32 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <section className="section section-proof" ref={root} id="meaning">
      <div className="wrap">
        <h2 className="section-title">{copy.s2.h2}</h2>

        <figure className="domain-graphic">
          <div className="domain-map">
            <div className="lifecycle-band" aria-label="Ingest, update, enforce">
              {STEPS.map((key, index) => (
                <Fragment key={key}>
                  {index > 0 ? (
                    <span className="lifecycle-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className={phase === key ? "lifecycle-step is-on" : "lifecycle-step"}
                    data-lifecycle-step={key}
                    aria-pressed={phase === key}
                    onClick={() => {
                      hold.current = true;
                      setPhase(key);
                    }}
                  >
                    <p className="lifecycle-label">{copy.s2.graphic[key].label}</p>
                    <p>{copy.s2.graphic[key].body}</p>
                  </button>
                </Fragment>
              ))}
            </div>
            <MeaningGraphic phase={phase} />
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
