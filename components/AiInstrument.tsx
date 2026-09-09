"use client";

import { QuietField } from "./pipeline/TypedGraphField";

const LIVE_FEEDS = ["Beneficial ownership", "Transactions", "Devices"] as const;
const IDLE_FEEDS = ["SIEM", "ROS", "LIMS", "ERP", "MISP"] as const;

const MATCH_QUERY = [
  "match",
  "  $acc isa account, has id \"ACC-7834\";",
  "  $own isa ownership,",
  "    links (owner: $p, asset: $acc);",
  "  $flag isa is-structuring;",
];

const WRITE_QUERY = [
  "insert",
  "  $t isa transaction,",
  "    links (source-account: $src);",
];

function DerivedGraph() {
  return (
    <svg
      className="passb-derived"
      viewBox="0 0 320 180"
      role="img"
      aria-label="Typed graph. Edge 2 is a derived ownership path."
    >
      <g className="passb-node" transform="translate(12 28)">
        <circle cx="18" cy="18" r="7" />
        <text x="34" y="14">
          person
        </text>
        <text x="34" y="30">
          John Smith
        </text>
      </g>
      <g className="passb-node" transform="translate(198 18)">
        <circle cx="18" cy="18" r="7" />
        <text x="34" y="14">
          account
        </text>
        <text x="34" y="30">
          ACC-7834
        </text>
      </g>
      <g className="passb-node" transform="translate(198 108)">
        <circle cx="18" cy="18" r="7" />
        <text x="34" y="14">
          device
        </text>
        <text x="34" y="30">
          DEV-19
        </text>
      </g>
      <path className="passb-edge-1" data-edge="1" d="M48 46 H198" fill="none" />
      <text className="passb-edge-1-label" x="108" y="40">
        owner
      </text>
      <path className="passb-edge-2" data-edge="2" data-derived="1" d="M228 56 V108" fill="none" />
      <text className="passb-derived-label" x="236" y="86">
        derived
      </text>
    </svg>
  );
}

function FeedPackets() {
  return (
    <svg className="passb-feed-lines" viewBox="0 0 36 160" preserveAspectRatio="none" aria-hidden="true">
      <path className="hero-feed-line" d="M2 24 H34" />
      <path className="hero-feed-line" d="M2 52 H34" />
      <path className="hero-feed-line" d="M2 80 H34" />
      <circle className="hero-feed-packet" cx="18" cy="24" r="1.4" />
      <circle className="hero-feed-packet" cx="22" cy="52" r="1.4" />
      <circle className="hero-feed-packet" cx="26" cy="80" r="1.4" />
      <circle className="hero-feed-dot" r="1.1" cx="0" cy="0">
        <animateMotion dur="3.2s" begin="0s" repeatCount="indefinite" path="M2 24 H34" />
      </circle>
      <circle className="hero-feed-dot" r="1.1" cx="0" cy="0">
        <animateMotion dur="3.2s" begin="0.4s" repeatCount="indefinite" path="M2 52 H34" />
      </circle>
      <circle className="hero-feed-dot" r="1.1" cx="0" cy="0">
        <animateMotion dur="3.2s" begin="0.8s" repeatCount="indefinite" path="M2 80 H34" />
      </circle>
    </svg>
  );
}

export function AiInstrument() {
  return (
    <figure className="passb-instrument" data-s2="pass-b-chat-v4.1" data-motion="pass-b-chat-v4.1">
      <div className="passb-top">
        <aside className="passb-feeds" aria-label="Feeds">
          <p className="passb-col-label">Feeds</p>
          {LIVE_FEEDS.map((feed) => (
            <span key={feed} className="passb-feed is-live">
              <i />
              {feed}
              <em>LIVE</em>
            </span>
          ))}
          {IDLE_FEEDS.map((feed) => (
            <span key={feed} className="passb-feed is-idle">
              {feed}
            </span>
          ))}
        </aside>
        <FeedPackets />
        <div className="passb-graph">
          <div className="passb-graph-bar">
            <span className="passb-enforced">Schema enforced</span>
            <span>TYPEDB</span>
          </div>
          <div className="passb-graph-stage">
            <QuietField seed="b" />
            <DerivedGraph />
          </div>
        </div>
        <div className="passb-chat" data-turns="4" aria-label="Four-turn chat">
          <p className="passb-turn" data-turn="1">
            Did under-threshold transfers across John Smith&apos;s accounts in the last 24 hours form a
            structuring pattern?
          </p>
          <p className="passb-turn is-ai" data-turn="2">
            <span>AI response</span>
            Yes. Eight transfers from 2026-01-18 to 2026-01-19 total $14,200, above the $10,000 SAR
            threshold, so is-structuring on ACC-7834 fires.
          </p>
          <p className="passb-turn is-next" data-turn="3">
            Which accounts share the owner?
          </p>
          <p className="passb-turn is-next" data-turn="4">
            Which device links them?
          </p>
          <label className="passb-ask">
            <span className="visually-hidden">Ask the graph</span>
            <input readOnly value="Ask me anything..." />
          </label>
        </div>
      </div>
      <div className="passb-terminal" data-pane="typeql">
        <div className="passb-term-bar">
          <span>TYPEQL</span>
          <span className="is-on">query.tql</span>
          <span>write.tql</span>
          <span>log</span>
          <em className="passb-enforced">schema enforced</em>
        </div>
        <div className="passb-term-split">
          <div className="passb-term-col" data-col="match">
            <p className="passb-col-label">MATCH · STRUCTURING CHECK</p>
            <pre>
              {MATCH_QUERY.map((line) => (
                <code key={line}>{line}</code>
              ))}
            </pre>
            <p className="passb-ok">$flag true · escalate · 8 × under $10,000 → $14,200</p>
          </div>
          <div className="passb-term-col" data-col="write">
            <p className="passb-col-label">WRITE · BLOCKED BY CONSTRAINTS</p>
            <pre>
              {WRITE_QUERY.map((line) => (
                <code key={line}>{line}</code>
              ))}
            </pre>
            <p className="passb-reject">
              Schema violation · role incomplete · transaction requires source-account +
              destination-account · write aborted
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
