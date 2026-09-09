"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { StudioPane } from "./pipeline/StudioPane";

const LIVE_FEEDS = ["Beneficial ownership", "Transactions", "Devices"] as const;
const IDLE_FEEDS = ["SIEM", "ROS", "LIMS", "ERP", "MISP"] as const;
const TURNS = ["ingress", "stored-edge", "typeql", "reject"] as const;
const CYCLE_MS = 1300;

type Turn = (typeof TURNS)[number];

function subscribeSearch(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
  };
}

function readFreeze(): boolean {
  return new URLSearchParams(window.location.search).get("freeze") === "1";
}

function serverFalse(): boolean {
  return false;
}

function subscribeReduce(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => {
    media.removeEventListener("change", onStoreChange);
  };
}

function readReduce(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function StoredEdge() {
  return (
    <svg className="passb-edge" viewBox="0 0 520 168" role="img" aria-label="Stored ownership edge derived from Beneficial ownership, Transactions, and Devices.">
      <text className="hero-a1-col-label" x="8" y="16">
        stored edge
      </text>
      <g className="typed-node entity" transform="translate(8 36)">
        <rect width="128" height="56" rx="6" />
        <text className="typed-kind" x="10" y="20">
          entity company
        </text>
        <text className="typed-name" x="10" y="40">
          Helix AG
        </text>
      </g>
      <g className="typed-node relation" data-focal="1" transform="translate(176 32)">
        <rect width="168" height="64" rx="6" />
        <text className="typed-kind" x="10" y="20">
          relation ownership
        </text>
        <text className="typed-role" x="10" y="40">
          owner → asset
        </text>
      </g>
      <g className="typed-node entity" transform="translate(384 36)">
        <rect width="128" height="56" rx="6" />
        <text className="typed-kind" x="10" y="20">
          entity asset
        </text>
        <text className="typed-name" x="10" y="40">
          Ledger 441
        </text>
      </g>
      <path className="typed-edge" d="M136 64 H176" fill="none" />
      <path className="typed-edge" d="M344 64 H384" fill="none" />
      <text className="passb-edge-note" x="8" y="148">
        derived from stored edges
      </text>
    </svg>
  );
}

function TurnStage({ turn }: { turn: Turn }) {
  switch (turn) {
    case "ingress":
      return (
        <div className="passb-stage" data-turn="ingress">
          <p className="passb-kicker">01 ingress</p>
          <p className="passb-stage-title">Live feeds hit the type system</p>
          <p>Beneficial ownership, Transactions, and Devices arrive as typed facts. Idle sources stay dark.</p>
        </div>
      );
    case "stored-edge":
      return (
        <div className="passb-stage" data-turn="stored-edge">
          <p className="passb-kicker">02 stored edge</p>
          <StoredEdge />
        </div>
      );
    case "typeql":
      return (
        <div className="passb-stage" data-turn="typeql">
          <p className="passb-kicker">03 TypeQL essay</p>
          <StudioPane
            mode="match"
            chrome="studio"
            query={[
              "match",
              "  $c isa company, has name $n;",
              "  $o isa ownership,",
              "    links (owner: $c, asset: $a);",
              "  $a isa asset;",
            ]}
            rows={[{ role: "owner", value: "Helix AG" }]}
            foot="entity · relation · role"
          />
        </div>
      );
    case "reject":
      return (
        <div className="passb-stage" data-turn="reject">
          <p className="passb-kicker">04 write reject</p>
          <StudioPane
            mode="write-reject"
            chrome="studio"
            files={[
              { label: "write.tql", on: true },
              { label: "schema.tql" },
            ]}
            query={[
              "insert",
              "  $p isa person;",
              "  $o isa ownership,",
              "    links (owner: $p, asset: $a);",
            ]}
            violation="Schema violation"
            reject="person cannot play ownership:owner"
            constraints={["company plays ownership:owner;", "person plays clearance:grantee;"]}
            foot="meaning held · invalid structure blocked"
          />
        </div>
      );
    default: {
      const exhausted: never = turn;
      return exhausted;
    }
  }
}

export function AiInstrument() {
  const root = useRef<HTMLElement>(null);
  const freeze = useSyncExternalStore(subscribeSearch, readFreeze, serverFalse);
  const reduce = useSyncExternalStore(subscribeReduce, readReduce, serverFalse);
  const hold = freeze || reduce;
  const [turn, setTurn] = useState<Turn>("stored-edge");

  useEffect(() => {
    const node = root.current;
    if (!node || hold) {
      setTurn("stored-edge");
      return;
    }

    let timer: number | null = null;
    const start = () => {
      if (timer !== null) {
        return;
      }
      timer = window.setInterval(() => {
        setTurn((current) => {
          const index = TURNS.indexOf(current);
          return TURNS[(index + 1) % TURNS.length] ?? "ingress";
        });
      }, CYCLE_MS / TURNS.length);
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
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [hold]);

  return (
    <figure
      ref={root}
      className="passb-instrument"
      data-s2="pass-b-chat-v4.1"
      data-motion="pass-b-chat-v4.1"
      data-turn={turn}
    >
      <div className="passb-feeds" aria-label="Feeds">
        {LIVE_FEEDS.map((feed) => (
          <span key={feed} className="passb-feed is-live">
            <i />
            {feed}
          </span>
        ))}
        {IDLE_FEEDS.map((feed) => (
          <span key={feed} className="passb-feed is-idle">
            {feed}
          </span>
        ))}
      </div>
      <svg className="passb-feeds-lines" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
        <path className="hero-feed-line" d="M8 2 H50" />
        <path className="hero-feed-line" d="M28 6 H50" />
        <path className="hero-feed-line" d="M48 10 H50" />
        <circle className="hero-feed-packet" cx="29" cy="2" r="1.1" />
        <circle className="hero-feed-packet" cx="39" cy="6" r="1.1" />
        <circle className="hero-feed-packet" cx="49" cy="10" r="1.1" />
        <circle className="hero-feed-dot" r="0.8" cx="0" cy="0">
          <animateMotion dur="3.2s" begin="0s" repeatCount="indefinite" path="M8 2 H50" />
        </circle>
        <circle className="hero-feed-dot" r="0.8" cx="0" cy="0">
          <animateMotion dur="3.2s" begin="0.4s" repeatCount="indefinite" path="M28 6 H50" />
        </circle>
        <circle className="hero-feed-dot" r="0.8" cx="0" cy="0">
          <animateMotion dur="3.2s" begin="0.8s" repeatCount="indefinite" path="M48 10 H50" />
        </circle>
      </svg>
      <ol className="passb-turns" aria-label="Four-turn stamp">
        {TURNS.map((key) => (
          <li key={key} className={turn === key ? "is-on" : undefined} data-turn={key}>
            {key === "ingress" ? "01" : key === "stored-edge" ? "02" : key === "typeql" ? "03" : "04"}
          </li>
        ))}
      </ol>
      <TurnStage turn={turn} />
      <figcaption>Eight feeds. Four turns. Stored edges, TypeQL nouns, then a write that the schema rejects.</figcaption>
    </figure>
  );
}
