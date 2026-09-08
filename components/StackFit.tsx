"use client";

import { useId, useState } from "react";
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
  const [tab, setTab] = useState<TabId>("have-graph");
  const tabListId = useId();

  return (
    <section className="section" id="in-practice">
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
        <ol className="stack-rail is-lit" aria-label="Retrieve, Ground, Reason, Persist">
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
          className="stack-board is-lit"
          role="tabpanel"
          id={tab === "have-graph" ? "panel-have-graph" : "panel-no-graph"}
          aria-labelledby={tab === "have-graph" ? "tab-have-graph" : "tab-no-graph"}
          data-tab={tab}
        >
          <figure className="s2-pipeline" data-pipe="v2" data-s2="pipeline-v2" data-motion="s2-v1">
            <div className="hero-pipe-flow">
              <PipelineFeeds kind="s2" />
              <div className="hero-pipe-col" data-col="sources">
                <p className="hero-pipe-label">Sources & workloads</p>
                <ul className="hero-pipe-sources is-grid">
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
                  <HeroA1Svg idPrefix="s2-a1" />
                </div>
              </div>
              <div className="hero-pipe-col is-ai" data-col="ai">
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
                    '  $a isa person, has name "Alice";',
                    "  $o isa ownership, has stake 51%;",
                  ]}
                  violation="Schema violation"
                  reject="person cannot play ownership:owner"
                  constraints={[
                    "company plays ownership:owner;",
                    "person plays directorship:director;",
                  ]}
                  note={
                    tab === "have-graph"
                      ? copy.s1.haveGraph.persist.body
                      : copy.s1.noGraph.persist.body
                  }
                  meta={["role mismatch", "tx aborted", "0 commits"]}
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
