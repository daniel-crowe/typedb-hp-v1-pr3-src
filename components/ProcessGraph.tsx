type ProcessNode = {
  kind: "entity" | "relation" | "step";
  name: string;
};

type ProcessGraphProps = {
  label: string;
  nodes: ProcessNode[];
  edges: string[];
};

export function ProcessGraph({ label, nodes, edges }: ProcessGraphProps) {
  const width = Math.max(320, nodes.length * 150);

  return (
    <svg className="process-graph" viewBox={`0 0 ${width} 92`} role="img" aria-label={label}>
      {edges.map((edge, index) => {
        const x = 16 + index * 150;
        return (
          <g key={`${edge}-${index}`}>
            <line className="typed-edge" x1={x + 108} y1="46" x2={x + 142} y2="46" />
            <text className="typed-role" x={x + 125} y="36" textAnchor="middle">
              {edge}
            </text>
          </g>
        );
      })}
      {nodes.map((node, index) => {
        const x = 16 + index * 150;
        return (
          <g key={`${node.kind}-${node.name}`} className={`typed-node ${node.kind}`} transform={`translate(${x} 16)`}>
            <rect width="108" height="60" rx="5" />
            <text className="typed-kind" x="10" y="20">
              {node.kind}
            </text>
            <text className="typed-name" x="10" y="42">
              {node.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
