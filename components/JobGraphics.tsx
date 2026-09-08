type JobId = "code-graph" | "agentic" | "cti" | "decision";

function Glow({ x, y, title, sub }: { x: number; y: number; title: string; sub: string }) {
  return (
    <g className="job-glow" transform={`translate(${x} ${y})`}>
      <rect width="92" height="52" rx="6" />
      <circle cx="12" cy="16" r="3" />
      <text className="job-glow-title" x="22" y="20">
        {title}
      </text>
      <text className="job-glow-sub" x="10" y="40">
        {sub}
      </text>
    </g>
  );
}

export function JobGraphic({ id }: { id: JobId }) {
  switch (id) {
    case "code-graph":
      return (
        <svg
          className="job-graphic"
          viewBox="0 0 320 148"
          role="img"
          data-job-art="software-context-drift"
          aria-label="Scattered function, test, and PR notes become a typed code graph. Schema holds."
        >
          <text className="job-art-kicker" x="8" y="16">
            before
          </text>
          <g className="job-pill" transform="translate(8 26)">
            <rect width="70" height="22" rx="11" />
            <text x="10" y="15">
              fn a()
            </text>
          </g>
          <g className="job-pill" transform="translate(84 26)">
            <rect width="58" height="22" rx="11" />
            <text x="10" y="15">
              test?
            </text>
          </g>
          <g className="job-pill" transform="translate(148 26)">
            <rect width="70" height="22" rx="11" />
            <text x="10" y="15">
              PR note
            </text>
          </g>
          <text className="job-art-kicker" x="8" y="68">
            with TypeDB
          </text>
          <g className="typed-node relation" transform="translate(8 78)">
            <rect width="78" height="52" rx="5" />
            <text className="typed-kind" x="8" y="18">
              entity
            </text>
            <text className="typed-name" x="8" y="36">
              function
            </text>
          </g>
          <g className="typed-node relation" transform="translate(108 78)">
            <rect width="70" height="52" rx="5" />
            <text className="typed-kind" x="8" y="18">
              relation
            </text>
            <text className="typed-name" x="8" y="36">
              calls
            </text>
          </g>
          <g className="typed-node entity" transform="translate(200 78)">
            <rect width="58" height="52" rx="5" />
            <text className="typed-kind" x="8" y="18">
              entity
            </text>
            <text className="typed-name" x="8" y="36">
              test
            </text>
          </g>
          <path className="typed-edge" d="M86 104 H108" />
          <path className="typed-edge" d="M178 104 H200" />
          <Glow x={220} y={8} title="schema holds" sub="code graph" />
        </svg>
      );
    case "agentic":
      return (
        <svg
          className="job-graphic"
          viewBox="0 0 320 148"
          role="img"
          data-job-art="agentic-shared-domain"
          aria-label="An agent, a prompt, and a tool sit outside a typed domain of entity, relation, and roles."
        >
          <g className="job-pill is-round" transform="translate(8 18)">
            <circle cx="18" cy="18" r="18" />
            <text x="8" y="22">
              agent
            </text>
          </g>
          <g className="job-pill" transform="translate(56 8)">
            <rect width="58" height="22" rx="11" />
            <text x="10" y="15">
              prompt
            </text>
          </g>
          <g className="job-pill" transform="translate(56 36)">
            <rect width="48" height="22" rx="11" />
            <text x="10" y="15">
              tool
            </text>
          </g>
          <path className="typed-edge is-dot" d="M44 28 H56" />
          <path className="typed-edge is-dot" d="M44 40 H56" />
          <g className="typed-node relation" transform="translate(8 72)">
            <rect width="200" height="64" rx="6" />
            <text className="typed-kind" x="10" y="16">
              TypeDB
            </text>
            <text className="typed-name" x="10" y="36">
              entity · relation · roles
            </text>
            <text className="typed-inst" x="10" y="52">
              shared domain
            </text>
          </g>
          <Glow x={220} y={80} title="typed read" sub="one model" />
        </svg>
      );
    case "cti":
      return (
        <svg
          className="job-graphic"
          viewBox="0 0 320 148"
          role="img"
          data-job-art="threats-connected-model"
          aria-label="Threat actor, campaign, and indicator meet in one attribution relation."
        >
          <g className="typed-node entity" transform="translate(8 18)">
            <rect width="88" height="48" rx="5" />
            <text className="typed-kind" x="8" y="18">
              entity
            </text>
            <text className="typed-name" x="8" y="36">
              actor
            </text>
          </g>
          <g className="typed-node relation" transform="translate(112 18)">
            <rect width="96" height="48" rx="5" />
            <text className="typed-kind" x="8" y="18">
              n-party
            </text>
            <text className="typed-name" x="8" y="36">
              attribution
            </text>
          </g>
          <g className="typed-node entity" transform="translate(8 82)">
            <rect width="88" height="48" rx="5" />
            <text className="typed-kind" x="8" y="18">
              entity
            </text>
            <text className="typed-name" x="8" y="36">
              campaign
            </text>
          </g>
          <g className="typed-node attribute" transform="translate(112 82)">
            <rect width="96" height="48" rx="5" />
            <text className="typed-kind" x="8" y="18">
              attribute
            </text>
            <text className="typed-name" x="8" y="36">
              indicator
            </text>
          </g>
          <path className="typed-edge" d="M96 42 H112" />
          <path className="typed-edge" d="M52 66 V82" />
          <path className="typed-edge" d="M160 66 V82" />
          <Glow x={220} y={48} title="schema holds" sub="typed CTI" />
        </svg>
      );
    case "decision":
      return (
        <svg
          className="job-graphic"
          viewBox="0 0 320 148"
          role="img"
          data-job-art="decision-typed-model"
          aria-label="A decision relation plays site, constraint, and measurement."
        >
          <g className="typed-node relation" transform="translate(100 8)">
            <rect width="120" height="48" rx="5" />
            <text className="typed-kind" x="10" y="18">
              relation
            </text>
            <text className="typed-name" x="10" y="36">
              decision
            </text>
          </g>
          <g className="typed-node entity" transform="translate(8 78)">
            <rect width="88" height="52" rx="5" />
            <text className="typed-kind" x="8" y="18">
              role
            </text>
            <text className="typed-name" x="8" y="36">
              site
            </text>
          </g>
          <g className="typed-node entity" transform="translate(116 78)">
            <rect width="88" height="52" rx="5" />
            <text className="typed-kind" x="8" y="18">
              role
            </text>
            <text className="typed-name" x="8" y="36">
              constraint
            </text>
          </g>
          <g className="typed-node attribute" transform="translate(8 8)">
            <rect width="80" height="40" rx="5" />
            <text className="typed-kind" x="8" y="16">
              role
            </text>
            <text className="typed-name" x="8" y="32">
              measure
            </text>
          </g>
          <path className="typed-edge" d="M88 28 H100" />
          <path className="typed-edge" d="M52 78 V56" />
          <path className="typed-edge" d="M160 56 V78" />
          <Glow x={220} y={78} title="typed model" sub="as it changes" />
        </svg>
      );
    default: {
      const exhausted: never = id;
      return exhausted;
    }
  }
}
