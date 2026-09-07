type JobId = "code-graph" | "agentic" | "cti" | "decision";

export function JobGraphic({ id }: { id: JobId }) {
  switch (id) {
    case "code-graph":
      return (
        <svg className="job-graphic" viewBox="0 0 320 120" role="img" aria-label="A coverage relation binds a function to a test">
          <g className="typed-node entity" transform="translate(8 28)">
            <rect width="88" height="56" rx="5" />
            <text className="typed-kind" x="10" y="20">
              entity
            </text>
            <text className="typed-name" x="10" y="40">
              function
            </text>
          </g>
          <g className="typed-node relation" transform="translate(116 28)">
            <rect width="88" height="56" rx="5" />
            <text className="typed-kind" x="10" y="20">
              relation
            </text>
            <text className="typed-name" x="10" y="40">
              coverage
            </text>
          </g>
          <g className="typed-node entity" transform="translate(224 28)">
            <rect width="88" height="56" rx="5" />
            <text className="typed-kind" x="10" y="20">
              entity
            </text>
            <text className="typed-name" x="10" y="40">
              test
            </text>
          </g>
          <path className="typed-edge" d="M96 56 L116 56" />
          <path className="typed-edge" d="M204 56 L224 56" />
        </svg>
      );
    case "agentic":
      return (
        <div className="job-graphic-fail">
          <pre className="typeql-chip">
            <span className="kw">insert</span>
            {"\n  $e isa full-time-employee,\n    has weekly-hours 35;"}
          </pre>
          <p className="fail-line">weekly-hours is not owned by full-time-employee.</p>
        </div>
      );
    case "cti":
      return (
        <svg className="job-graphic" viewBox="0 0 320 140" role="img" aria-label="Attribution binds actor, campaign, and indicator as one n-party fact">
          <g className="typed-node entity" transform="translate(8 8)">
            <rect width="92" height="48" rx="5" />
            <text className="typed-kind" x="10" y="18">
              entity
            </text>
            <text className="typed-name" x="10" y="36">
              threat-actor
            </text>
          </g>
          <g className="typed-node entity" transform="translate(220 8)">
            <rect width="92" height="48" rx="5" />
            <text className="typed-kind" x="10" y="18">
              entity
            </text>
            <text className="typed-name" x="10" y="36">
              campaign
            </text>
          </g>
          <g className="typed-node relation" transform="translate(100 50)">
            <rect width="120" height="56" rx="5" />
            <text className="typed-kind" x="10" y="18">
              n-party
            </text>
            <text className="typed-name" x="10" y="36">
              attribution
            </text>
          </g>
          <g className="typed-node attribute" transform="translate(114 116)">
            <rect width="92" height="20" rx="4" />
            <text className="typed-name" x="10" y="15">
              indicator
            </text>
          </g>
          <path className="typed-edge" d="M54 56 L100 72" />
          <path className="typed-edge" d="M266 56 L220 72" />
          <path className="typed-edge" d="M160 106 L160 116" />
        </svg>
      );
    case "decision":
      return (
        <svg className="job-graphic" viewBox="0 0 320 120" role="img" aria-label="A decision relation plays site, constraint, and measurement">
          <g className="typed-node relation" transform="translate(100 8)">
            <rect width="120" height="48" rx="5" />
            <text className="typed-kind" x="10" y="18">
              relation
            </text>
            <text className="typed-name" x="10" y="36">
              decision
            </text>
          </g>
          <g className="typed-node entity" transform="translate(8 68)">
            <rect width="88" height="44" rx="5" />
            <text className="typed-kind" x="10" y="16">
              role
            </text>
            <text className="typed-name" x="10" y="32">
              site
            </text>
          </g>
          <g className="typed-node entity" transform="translate(116 68)">
            <rect width="88" height="44" rx="5" />
            <text className="typed-kind" x="10" y="16">
              role
            </text>
            <text className="typed-name" x="10" y="32">
              constraint
            </text>
          </g>
          <g className="typed-node attribute" transform="translate(224 68)">
            <rect width="88" height="44" rx="5" />
            <text className="typed-kind" x="10" y="16">
              role
            </text>
            <text className="typed-name" x="10" y="32">
              measure
            </text>
          </g>
          <path className="typed-edge" d="M52 68 L140 56" />
          <path className="typed-edge" d="M160 56 L160 68" />
          <path className="typed-edge" d="M268 68 L180 56" />
        </svg>
      );
    default: {
      const exhausted: never = id;
      return exhausted;
    }
  }
}
