import type { MeaningPhase } from "./MeaningGraphic";

export function MeaningCast({ phase }: { phase: MeaningPhase }) {
  const rejected = phase === "enforce";

  return (
    <svg
      className={rejected ? "meaning-cast is-reject" : "meaning-cast"}
      viewBox="0 0 560 280"
      role="img"
      data-meaning-phase={phase}
      aria-label="Dana is a person. Helix AG is a company. Ownership owner is a company role. Clearance grantee is a person role."
    >
      <text className="hero-a1-col-label" x="16" y="22">
        person
      </text>
      <text className="hero-a1-col-label" x="400" y="22">
        company
      </text>

      <g className="typed-node entity" transform="translate(16 40)">
        <rect width="150" height="64" rx="6" />
        <text className="typed-kind" x="12" y="20">
          entity person
        </text>
        <text className="typed-name" x="12" y="42">
          Dana
        </text>
      </g>

      <g className="typed-node entity" transform="translate(394 40)">
        <rect width="150" height="64" rx="6" />
        <text className="typed-kind" x="12" y="20">
          entity company
        </text>
        <text className="typed-name" x="12" y="42">
          Helix AG
        </text>
      </g>

      <g className={rejected ? "typed-node relation is-fail" : "typed-node relation"} data-focal="1" transform="translate(196 48)">
        <rect width="168" height="72" rx="6" />
        <text className="typed-kind" x="12" y="20">
          relation ownership
        </text>
        <text className="typed-role" x="12" y="42">
          owner → asset
        </text>
        <text className="typed-inst" x="12" y="60">
          company plays owner
        </text>
      </g>

      <g className="typed-node relation" transform="translate(196 168)">
        <rect width="168" height="64" rx="6" />
        <text className="typed-kind" x="12" y="20">
          relation clearance
        </text>
        <text className="typed-role" x="12" y="42">
          grantee
        </text>
      </g>

      <path
        className={rejected ? "typed-edge is-fail" : "typed-edge"}
        d="M166 72 H196"
        fill="none"
      />
      {rejected ? (
        <g className="meaning-cast-x">
          <circle cx="178" cy="72" r="8" />
          <text x="178" y="76">
            ×
          </text>
          <text className="meaning-cast-ask" x="178" y="98">
            plays owner?
          </text>
        </g>
      ) : null}

      <path className="typed-edge" d="M364 84 H394" fill="none" />
      <path className="typed-edge is-ok" d="M166 200 H196" fill="none" />
    </svg>
  );
}
