"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { PipelineFeeds } from "./pipeline/PipelineFeeds";
import { StudioPane } from "./pipeline/StudioPane";
import { EMPLOYMENT_CLUSTER, TypedGraphField } from "./pipeline/TypedGraphField";
import { MeaningGraphic, type MeaningPhase } from "./MeaningGraphic";

const STEPS = ["ingest", "update", "enforce"] as const;
const TICK_MS = 3000;

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function MeaningPhasePane({ phase }: { phase: MeaningPhase }) {
  switch (phase) {
    case "ingest":
      return (
        <div className="meaning-phase-pane" data-phase="ingest">
          <p className="hero-pipe-result-label">Instances</p>
          <p>
            <span className="role-tag">person</span> Sam
          </p>
          <p>
            <span className="role-tag">company</span> Acme
          </p>
          <p>
            <span className="role-tag">project</span> billing
          </p>
        </div>
      );
    case "update":
      return (
        <div className="meaning-phase-pane" data-phase="update">
          <p className="hero-pipe-result-label">Subtype write</p>
          <p>
            <span className="role-tag">type</span> person
          </p>
          <p>
            <span className="role-tag">subtype</span> employee
          </p>
          <p className="meaning-phase-note">Sam still matches as person.</p>
        </div>
      );
    case "enforce":
      return (
        <StudioPane
          mode="write-reject"
          query={["insert", "  $e isa employment;"]}
          reject="Type person cannot play employment:employer"
        />
      );
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
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
        if (hold.current) {
          if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
          }
          return;
        }
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

        <figure className="domain-graphic meaning-pipeline" data-pipe="v2" data-meaning-phase={phase}>
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

          <div className="hero-pipe-flow">
            <PipelineFeeds />
            <div className="hero-pipe-col" data-col="sources">
              <p className="hero-pipe-label">Type system</p>
              <MeaningGraphic phase={phase} compact />
            </div>
            <div className="hero-pipe-col is-graph" data-col="graph">
              <div className="hero-pipe-graph-bar">
                <span className="hero-pipe-brand">TypeDB</span>
              </div>
              <TypedGraphField cluster={EMPLOYMENT_CLUSTER} seed="b" />
            </div>
            <div className="hero-pipe-col is-ai" data-col="ai">
              <MeaningPhasePane phase={phase} />
            </div>
          </div>
          <figcaption className="meaning-closer">{copy.s2.graphic.lede}</figcaption>
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
