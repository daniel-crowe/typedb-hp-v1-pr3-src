"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useId, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { phaseFromProgress, seekScrub } from "@/lib/scrub-seek";
import { ProcessGraph } from "./ProcessGraph";
import { TypedFactGraph } from "./TypedFactGraph";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type TabId = "have-graph" | "no-graph";
type StageKey = "ask" | "look" | "store" | "write";

const STAGE_KEYS: StageKey[] = ["ask", "look", "store", "write"];

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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

function AskVisual() {
  return (
    <div className="stack-askers">
      <span>People</span>
      <span>Apps</span>
      <span>AI</span>
    </div>
  );
}

function LookVisual({ tab }: { tab: TabId }) {
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

function StoreVisual() {
  return <TypedFactGraph id="stack-store" compact />;
}

function WriteVisual() {
  return (
    <pre className="typeql-chip">
      <span className="kw">insert</span>
      {"\n  $x isa "}
      <span className="rel">resource-ownership</span>
      {";\n"}
      <span className="fail-line">A write that does not play owner or resource fails here.</span>
    </pre>
  );
}

function StageVisual({ tab, stage }: { tab: TabId; stage: StageKey }) {
  switch (stage) {
    case "ask":
      return <AskVisual />;
    case "look":
      return <LookVisual tab={tab} />;
    case "store":
      return <StoreVisual />;
    case "write":
      return <WriteVisual />;
    default: {
      const exhausted: never = stage;
      return exhausted;
    }
  }
}

export function StackFit() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const applyRef = useRef<(index: number) => void>(() => {});
  const [tab, setTab] = useState<TabId>("have-graph");
  const tabListId = useId();

  useGSAP(
    () => {
      const section = root.current;
      if (!section) {
        return;
      }

      const stages = section.querySelectorAll<HTMLElement>("[data-stack-stage]");
      const spine = section.querySelector<HTMLElement>(".stack-spine-fill");

      let last = -1;
      const apply = (index: number) => {
        if (index === last) {
          return;
        }
        last = index;
        stages.forEach((node, i) => {
          const on = i <= index;
          node.classList.toggle("is-on", on);
          gsap.to(node, {
            autoAlpha: on ? 1 : 0.28,
            y: on ? 0 : 18,
            duration: 0.2,
            overwrite: "auto",
          });
        });
        if (spine) {
          gsap.to(spine, {
            scaleY: (index + 1) / STAGE_KEYS.length,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      };
      applyRef.current = apply;

      if (reducedMotionOn()) {
        section.classList.add("is-poster");
        stages.forEach((node) => {
          node.classList.add("is-on");
        });
        if (spine) {
          spine.style.transform = "scaleY(1)";
        }
        return;
      }

      gsap.set(stages, { autoAlpha: 0.28, y: 18 });
      if (spine) {
        gsap.set(spine, { scaleY: 0, transformOrigin: "top center" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector(".stack-board"),
          start: "top 78%",
          end: "bottom 32%",
          scrub: 0.7,
          onUpdate: (self) => {
            apply(phaseFromProgress(self.progress, STAGE_KEYS.length));
          },
        },
      });
      timeline.to({}, { duration: 1 });
      trigger.current = timeline.scrollTrigger ?? null;
    },
    { scope: root, dependencies: [tab] },
  );

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

        <div
          className="stack-board"
          role="tabpanel"
          id={tab === "have-graph" ? "panel-have-graph" : "panel-no-graph"}
          aria-labelledby={tab === "have-graph" ? "tab-have-graph" : "tab-no-graph"}
          data-tab={tab}
        >
          <div className="stack-spine" aria-hidden="true">
            <span className="stack-spine-fill" />
          </div>
          {STAGE_KEYS.map((key, index) => (
            <article
              key={`${tab}-${key}`}
              className="stack-stage"
              data-stack-stage={key}
              tabIndex={0}
              role="button"
              aria-label={`${copy.s1.stages[key].label}: ${
                tab === "have-graph" ? copy.s1.haveGraph[key].title : copy.s1.noGraph[key].title
              }`}
              onClick={() => {
                if (trigger.current) {
                  seekScrub(trigger.current, index, STAGE_KEYS.length);
                  return;
                }
                applyRef.current(index);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (trigger.current) {
                    seekScrub(trigger.current, index, STAGE_KEYS.length);
                    return;
                  }
                  applyRef.current(index);
                }
              }}
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
