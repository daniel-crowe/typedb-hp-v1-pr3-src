import { A1_VIEW, chips, companies, edges, hubs, people, polyline } from "@/lib/a1-hierarchy";

type BoxProps = {
  id: string;
  kind: "entity" | "relation";
  type: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

function NodeBox({ id, kind, type, name, x, y, w, h }: BoxProps) {
  return (
    <g className={`typed-node ${kind}`} id={id} transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="6" />
      <text className="typed-kind" x="12" y="18">
        {kind}
      </text>
      <text className="typed-name" x="12" y="36">
        {type}
      </text>
      <text className="typed-inst" x="12" y="50">
        {name}
      </text>
    </g>
  );
}

export function HeroA1Svg({ idPrefix = "a1" }: { idPrefix?: string }) {
  const titleId = `${idPrefix}-title`;
  const descId = `${idPrefix}-desc`;

  return (
    <svg
      className="hero-a1-svg"
      viewBox={`0 0 ${A1_VIEW.w} ${A1_VIEW.h}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>People play director. Companies play directed. Ownership carries stake.</title>
      <desc id={descId}>
        Alice Park and Bob Rivera play director on directorship relations. Acme Corp, Globex Inc, and
        Initech Ltd play directed. Ownership between companies carries stake-percentage 51 and 30.
      </desc>
      <g className="hero-a1-col" data-col="people">
        <text className="hero-a1-col-label" x="8" y="18">
          people
        </text>
      </g>
      <g className="hero-a1-col" data-col="hubs">
        <text className="hero-a1-col-label" x="248" y="14">
          relation hubs
        </text>
      </g>
      <g className="hero-a1-col" data-col="companies">
        <text className="hero-a1-col-label" x="536" y="12">
          companies
        </text>
      </g>
      {edges.map((edge) => (
        <g key={edge.id}>
          <path className="typed-edge hero-a1-edge" d={polyline(edge.points)} fill="none" />
          {edge.role && edge.roleAt ? (
            <text className="typed-role" x={edge.roleAt[0]} y={edge.roleAt[1]}>
              {edge.role}
            </text>
          ) : null}
        </g>
      ))}
      {people.map((node) => (
        <NodeBox key={node.id} {...node} id={`${idPrefix}-${node.id}`} />
      ))}
      {hubs.map((node) => (
        <NodeBox key={node.id} {...node} id={`${idPrefix}-${node.id}`} />
      ))}
      {companies.map((node) => (
        <NodeBox key={node.id} {...node} id={`${idPrefix}-${node.id}`} />
      ))}
      {chips.map((chip) => (
        <g className="hero-a1-chip" id={`${idPrefix}-${chip.id}`} key={chip.id} transform={`translate(${chip.x} ${chip.y})`}>
          <rect width="52" height="28" rx="4" />
          <text className="hero-a1-chip-kind" x="8" y="11">
            {chip.label}
          </text>
          <text className="hero-a1-chip-value" x="8" y="23">
            {chip.value}
          </text>
        </g>
      ))}
    </svg>
  );
}
