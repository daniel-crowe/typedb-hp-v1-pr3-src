"use client";

import { useEffect, useId, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { ProcessGraph } from "./ProcessGraph";
import { TypedFactGraph } from "./TypedFactGraph";

type TabId = "have-graph" | "no-graph";
type StageKey = "retrieve" | "ground" | "reason" | "persist";

const STAGE_KEYS: StageKey[] = ["retrieve", "ground", "reason", "persist"];

function StageCopy({ tab, stage }: { tab: TabId; stage: StageKey }) {
  const pack = tab === "have-graph" ? copy.s1.haveGraph : copy.s1.noGraph;
  const item = pack[stage];
  return (
    <>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </>
  );
}

function RetrieveVisual() {
  return <p className="stack-question">Who owns the typedb repository?</p>;
}

function GroundVisual({ tab }: { tab: TabId }) {
  if (tab === "have-graph") {
    return (
      <ProcessGraph
        label="A property graph answers with a binary edge walk"
        nodes={[
          { kind: "step", name: "Alice" },
          { kind: "step", name: "typedb" },
        ]}
        edges={["OWNS"]}
      />
    );
  }
  return (
    <ul className="note-list">
      <li>Alice can use typedb</li>
      <li>owner is in the prompt</li>
      <li>users.json holds the email</li>
    </ul>
  );
}

function ReasonVisual({ tab }: { tab: TabId }) {
  if (tab === "have-graph") {
    return (
      <ProcessGraph
        label="An untyped walk can still look well-formed"
        nodes={[
          { kind: "step", name: "Alice" },
          { kind: "step", name: "org" },
          { kind: "step", name: "typedb" },
        ]}
        edges={["MEMBER", "OWNS"]}
      />
    );
  }
  return (
    <pre className="typeql-chip">
      <span className="kw">prompt</span>
      {"\nowner is whoever the last note named"}
    </pre>
  );
}

function PersistVisual() {
  return (
    <>
      <TypedFactGraph id="stack-persist" compact />
      <p className="fail-line">A write that does not play owner or resource fails here.</p>
    </>
  );
}

function StageVisual({ tab, stage }: { tab: TabId; stage: StageKey }) {
  switch (stage) {
    case "retrieve":
      return <RetrieveVisual />;
    case "ground":
      return <GroundVisual tab={tab} />;
    case "reason":
      return <ReasonVisual tab={tab} />;
    case "persist":
      return <PersistVisual />;
    default: {
      const exhausted: never = stage;
      return exhausted;
    }
  }
}

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
        <div
          className={inView ? "stack-board is-lit" : "stack-board"}
          role="tabpanel"
          id={tab === "have-graph" ? "panel-have-graph" : "panel-no-graph"}
          aria-labelledby={tab === "have-graph" ? "tab-have-graph" : "tab-no-graph"}
          data-tab={tab}
        >
          {STAGE_KEYS.map((key) => (
            <article
              key={`${tab}-${key}`}
              className="stack-stage is-on"
              data-stack-stage={key}
            >
              <p className="stack-stage-index">
                <span>{copy.s1.stages[key].index}</span>
                {copy.s1.stages[key].label}
              </p>
              <div className="stack-stage-copy">
                <StageCopy tab={tab} stage={key} />
              </div>
              <div className="stack-stage-visual">
                <StageVisual tab={tab} stage={key} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
