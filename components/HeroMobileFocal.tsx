import { QuietField } from "./pipeline/TypedGraphField";

export function HeroMobileFocal() {
  return (
    <div className="hero-mobile-focal" data-hero-mobile-art="focal-v1">
      <div className="hero-pipe-graph-bar">
        <span className="hero-pipe-status">Schema enforced</span>
        <span className="hero-pipe-brand">TypeDB</span>
      </div>
      <div className="hero-mobile-focal-stage">
        <QuietField seed="a" />
        <svg
          className="hero-mobile-focal-svg"
          viewBox="0 0 320 340"
          role="img"
          aria-labelledby="hero-mobile-focal-title hero-mobile-focal-desc"
        >
          <title id="hero-mobile-focal-title">Alice Park plays director. Acme Corp plays directed.</title>
          <desc id="hero-mobile-focal-desc">
            One typed path on small screens: person Alice Park, relation directorship, company Acme
            Corp, with ownership stake 51 percent. Bob, Globex, and Initech stay on the desktop graph.
          </desc>
          <line className="typed-edge" x1="160" y1="74" x2="160" y2="110" />
          <circle className="typed-edge-dot" cx="160" cy="92" r="2.4" />
          <text className="typed-role hero-mobile-role" x="176" y="96">
            plays director
          </text>
          <line className="typed-edge" x1="160" y1="178" x2="160" y2="214" />
          <circle className="typed-edge-dot" cx="160" cy="196" r="2.4" />
          <text className="typed-role hero-mobile-role" x="176" y="200">
            directed
          </text>
          <g className="typed-node entity" data-kind="person" transform="translate(70 16)">
            <rect width="180" height="56" rx="6" />
            <text className="typed-kind" x="12" y="18">
              entity person
            </text>
            <text className="typed-name" x="12" y="40">
              Alice Park
            </text>
          </g>
          <g className="typed-node relation is-focal" transform="translate(58 112)">
            <rect width="204" height="64" rx="6" />
            <text className="typed-kind" x="12" y="18">
              relation
            </text>
            <text className="typed-name" x="12" y="38">
              directorship
            </text>
            <text className="typed-inst" x="12" y="54">
              director → directed
            </text>
          </g>
          <g className="typed-node entity" data-kind="company" transform="translate(70 216)">
            <rect width="180" height="56" rx="6" />
            <text className="typed-kind" x="12" y="18">
              entity company
            </text>
            <text className="typed-name" x="12" y="40">
              Acme Corp
            </text>
          </g>
          <g className="hero-a1-chip" transform="translate(236 228)">
            <rect width="52" height="28" rx="4" />
            <text className="hero-a1-chip-kind" x="8" y="11">
              stake
            </text>
            <text className="hero-a1-chip-value" x="8" y="23">
              51%
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
