"use client";

import { useEffect, useId, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { HeroA1Svg } from "./HeroA1Svg";
import { PipelineFeeds } from "./pipeline/PipelineFeeds";
import { StudioPane } from "./pipeline/StudioPane";
import { QuietField } from "./pipeline/TypedGraphField";

type TabId = "have-graph" | "no-graph";
type StageKey = "retrieve" | "ground" | "reason" | "persist";

const STAGE_KEYS: StageKey[] = ["retrieve", "ground", "reason", "persist"];

const SOURCES: Record<TabId, string[]> = {
  "have-graph": ["Stored edges", "Application code", "Role conventions"],
  "no-graph": ["Docs", "Prompts", "Application code"],
};

export function StackFit() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<TabId>("have-graph");
  const [inView, setInView] = useState(false);
  const tabListId = useId();

  useEffect(() => {
    const section = root.current;
    if (!section) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" ref={root} id="in-practice">
      <div className="wrap">
        <h2 className="section-title">{copy.s1.h2}</h2>
        <div
          className="tablist"
          role="tablist"
          aria-label="Stack context"
          id={tabListId}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              setTab((current) => (current === "have-graph" ? "no-graph" : "have-graph"));
            }
          }}
        >
          <button
            type="button"
            role="tab"
            id="tab-have-graph"
            aria-selected={tab === "have-graph"}
            aria-controls="panel-have-graph"
            tabIndex={tab === "have-graph" ? 0 : -1}
            onClick={() => setTab("have-graph")}
          >
            {copy.s1.tabs.haveGraph.label}
          </button>
          <button
            type="button"
            role="tab"
            id="tab-no-graph"
            aria-selected={tab === "no-graph"}
            aria-controls="panel-no-graph"
            tabIndex={tab === "no-graph" ? 0 : -1}
            onClick={() => setTab("no-graph")}
          >
            {copy.s1.tabs.noGraph.label}
          </button>
        </div>
        <p className="stack-job" data-tab={tab}>
          {tab === "have-graph" ? copy.s1.tabs.haveGraph.job : copy.s1.tabs.noGraph.job}
        </p>
        <ol className={inView ? "stack-rail is-lit" : "stack-rail"} aria-label="Retrieve, Ground, Reason, Persist">
          {STAGE_KEYS.map((key) => {
            const stage = copy.s1.stages[key];
            const detail = tab === "have-graph" ? copy.s1.haveGraph[key] : copy.s1.noGraph[key];
            return (
              <li key={key} className="stack-rail-step is-on" data-stack-stage={key}>
                <span>{stage.index}</span>
                <div className="stack-rail-copy">
                  <strong>{stage.label}</strong>
                  <p className="stack-rail-title">{detail.title}</p>
                  <p className="stack-rail-body">{detail.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div
          className={inView ? "stack-board is-lit" : "stack-board"}
          role="tabpanel"
          id={tab === "have-graph" ? "panel-have-graph" : "panel-no-graph"}
          aria-labelledby={tab === "have-graph" ? "tab-have-graph" : "tab-no-graph"}
          data-tab={tab}
        >
          <figure className="s2-pipeline" data-pipe="v1" data-s2="pipeline-v1">
            <div className="hero-pipe-flow">
              <PipelineFeeds />
              <div className="hero-pipe-col" data-col="sources">
                <p className="hero-pipe-label">Sources & workloads</p>
                <ul className="hero-pipe-sources">
                  {SOURCES[tab].map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              </div>
              <div className="hero-pipe-col is-graph" data-col="graph">
                <div className="hero-pipe-graph-bar">
                  <span className="hero-pipe-status">Schema enforced</span>
                  <span className="hero-pipe-brand">TypeDB</span>
                </div>
                <div className="s2-hub-stage">
                  <QuietField seed="a" />
                  <HeroA1Svg />
                </div>
              </div>
              <div className="hero-pipe-col is-ai" data-col="ai">
                <StudioPane
                  mode="write-reject"
                  chrome="studio"
                  query={["insert", "  $p isa person;", "  $o (owner: $p) isa ownership;"]}
                  violation="Schema violation"
                  reject="person cannot play ownership:owner"
                  note={
                    tab === "have-graph"
                      ? copy.s1.haveGraph.persist.body
                      : copy.s1.noGraph.persist.body
                  }
                  foot="meaning held · no invalid structure"
                />
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
