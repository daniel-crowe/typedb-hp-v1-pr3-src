"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { copy } from "@/lib/copy";
import { MeaningCast } from "./MeaningCast";
import { MeaningLayered } from "./MeaningLayered";
import { PipelineFeeds } from "./pipeline/PipelineFeeds";
import { StudioPane } from "./pipeline/StudioPane";
import { QuietField } from "./pipeline/TypedGraphField";
import type { MeaningPhase } from "./MeaningGraphic";

const STEPS = ["ingest", "update", "enforce"] as const;
const TICK_MS = 3000;

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function MeaningIngress({ phase }: { phase: MeaningPhase }) {
  switch (phase) {
    case "ingest":
      return (
        <ul className="hero-pipe-sources">
          <li>person</li>
          <li>company</li>
          <li>clearance</li>
        </ul>
      );
    case "update":
      return (
        <ul className="hero-pipe-sources">
          <li>person</li>
          <li>employee</li>
          <li>company</li>
        </ul>
      );
    case "enforce":
      return (
        <ul className="hero-pipe-sources">
          <li className="is-fail">person → owner</li>
          <li>clearance</li>
          <li>resource</li>
        </ul>
      );
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

function MeaningPhasePane({ phase }: { phase: MeaningPhase }) {
  switch (phase) {
    case "ingest":
      return (
        <div className="meaning-phase-pane" data-phase="ingest">
          <p className="hero-pipe-result-label">Instances</p>
          <p>
            <span className="role-tag">person</span> Dana
          </p>
          <p>
            <span className="role-tag">company</span> Helix AG
          </p>
          <p>
            <span className="role-tag">relation</span> clearance
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
          <p className="meaning-phase-note">Dana still matches as person.</p>
        </div>
      );
    case "enforce":
      return (
        <StudioPane
          mode="write-reject"
          chrome="studio"
          files={[
            { label: "write.tql", on: true },
            { label: "schema.tql" },
            { label: "log" },
          ]}
          query={[
            "insert",
            "  $o isa ownership;",
            '  $p isa person, has name "Dana";',
            "  $o links (owner: $p);",
          ]}
          violation="Schema violation"
          reject="person cannot play ownership:owner"
          constraints={["company plays ownership:owner;", "person plays clearance:grantee;"]}
          foot="meaning held · invalid structure blocked"
        />
      );
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

function subscribeSearch(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
  };
}

function readSearchPhase(): MeaningPhase {
  const value = new URLSearchParams(window.location.search).get("phase");
  switch (value) {
    case "ingest":
    case "update":
    case "enforce":
      return value;
    default:
      return "enforce";
  }
}

function serverSearchPhase(): MeaningPhase {
  return "enforce";
}

function readSearchFreeze(): boolean {
  return new URLSearchParams(window.location.search).get("freeze") === "1";
}

function serverSearchFreeze(): boolean {
  return false;
}

export function Meaning() {
  const root = useRef<HTMLElement>(null);
  const searchPhase = useSyncExternalStore(subscribeSearch, readSearchPhase, serverSearchPhase);
  const freeze = useSyncExternalStore(subscribeSearch, readSearchFreeze, serverSearchFreeze);
  const [heldPhase, setHeldPhase] = useState<MeaningPhase | null>(null);
  const hold = useRef(false);
  const phase = heldPhase ?? searchPhase;

  useEffect(() => {
    const section = root.current;
    if (!section) {
      return;
    }

    if (reducedMotionOn() || freeze) {
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
        setHeldPhase((current) => {
          const index = STEPS.indexOf(current ?? searchPhase);
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
  }, [freeze, searchPhase]);

  return (
    <section className="section section-proof" ref={root} id="meaning">
      <div className="wrap">
        <h2 className="section-title">{copy.s2.h2}</h2>

        <div className="lifecycle-band meaning-layer-rail" aria-label="Ingest, update, enforce">
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
                    setHeldPhase(key);
                  }}
                >
                  <p className="lifecycle-label">{copy.s2.graphic[key].label}</p>
                  <p>{copy.s2.graphic[key].body}</p>
                </button>
              </Fragment>
            ))}
        </div>

        <MeaningLayered phase={phase} />

        <figure className="domain-graphic meaning-pipeline" data-pipe="v2" data-meaning-phase={phase} data-motion="meaning-v1">
          <div className="hero-pipe-flow">
            <PipelineFeeds kind="meaning" />
            <div className="hero-pipe-col" data-col="sources">
              <p className="hero-pipe-label">{phase === "enforce" ? "Attempted write" : "Type system"}</p>
              <MeaningIngress phase={phase} />
            </div>
            <div className={phase === "enforce" ? "hero-pipe-col is-graph is-reject" : "hero-pipe-col is-graph"} data-col="graph">
              <div className="hero-pipe-graph-bar">
                <span className={phase === "enforce" ? "hero-pipe-status is-reject" : "hero-pipe-status"}>
                  {phase === "enforce" ? "Write rejected" : "Schema enforced"}
                </span>
                <span className="hero-pipe-brand">TypeDB</span>
              </div>
              <div className="s2-hub-stage">
                <QuietField seed="b" />
                <MeaningCast phase={phase} />
              </div>
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
