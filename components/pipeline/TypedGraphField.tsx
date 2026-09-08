type FieldNode = {
  x: number;
  y: number;
  r: number;
};

type FieldEdge = [number, number];

type ClusterNode = {
  x: number;
  y: number;
  kind: "entity" | "relation";
  typeName: string;
  label: string;
  anchor?: "start" | "middle" | "end";
};

type ClusterLink = {
  d: string;
  role: string;
  roleX: number;
  roleY: number;
};

export type TypedCluster = {
  nodes: ClusterNode[];
  links: ClusterLink[];
  label: string;
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildField(seed: number): { nodes: FieldNode[]; edges: FieldEdge[] } {
  const rand = mulberry32(seed);
  const nodes: FieldNode[] = [];

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 11; col += 1) {
      if (rand() < 0.08) {
        continue;
      }
      nodes.push({
        x: 18 + col * 48 + (rand() - 0.5) * 20,
        y: 16 + row * 36 + (rand() - 0.5) * 14,
        r: 1.2 + rand() * 1.1,
      });
    }
  }

  for (let i = 0; i < 22; i += 1) {
    nodes.push({
      x: 16 + rand() * 528,
      y: 12 + rand() * 296,
      r: 1.05 + rand() * 0.9,
    });
  }

  const edges: FieldEdge[] = [];
  const seen = new Set<string>();

  nodes.forEach((node, index) => {
    const nearest = nodes
      .map((other, otherIndex) => ({
        otherIndex,
        dist: (other.x - node.x) ** 2 + (other.y - node.y) ** 2,
      }))
      .filter((item) => item.otherIndex !== index)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2);

    nearest.forEach((item) => {
      if (item.dist > 72 ** 2) {
        return;
      }
      const a = Math.min(index, item.otherIndex);
      const b = Math.max(index, item.otherIndex);
      const key = `${a}-${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([a, b]);
      }
    });
  });

  return { nodes, edges };
}

export const OWNERSHIP_CLUSTER: TypedCluster = {
  label: "Alice plays owner and typedb plays resource on the same resource-ownership fact.",
  nodes: [
    { x: 392, y: 138, kind: "entity", typeName: "person", label: "Alice", anchor: "middle" },
    { x: 458, y: 188, kind: "relation", typeName: "relation", label: "ownership", anchor: "start" },
    { x: 418, y: 248, kind: "entity", typeName: "repository", label: "typedb", anchor: "middle" },
  ],
  links: [
    { d: "M392 138 C430 138 448 168 456 188", role: "owner", roleX: 418, roleY: 152 },
    { d: "M418 248 C438 230 450 210 456 192", role: "resource", roleX: 448, roleY: 230 },
  ],
};

export const EMPLOYMENT_CLUSTER: TypedCluster = {
  label: "Sam plays employee and Acme plays employer on the same employment fact.",
  nodes: [
    { x: 388, y: 132, kind: "entity", typeName: "person", label: "Sam", anchor: "middle" },
    { x: 462, y: 186, kind: "relation", typeName: "relation", label: "employment", anchor: "start" },
    { x: 404, y: 252, kind: "entity", typeName: "company", label: "Acme", anchor: "middle" },
  ],
  links: [
    { d: "M388 132 C428 136 448 166 460 184", role: "employee", roleX: 414, roleY: 148 },
    { d: "M404 252 C430 234 450 212 460 190", role: "employer", roleX: 444, roleY: 232 },
  ],
};

const FIELD_A = buildField(20260908);
const FIELD_B = buildField(8092026);

export function QuietField({ seed = "a" }: { seed?: "a" | "b" }) {
  const field = seed === "b" ? FIELD_B : FIELD_A;

  return (
    <svg className="hero-pipe-field s2-quiet-field" viewBox="0 0 560 320" aria-hidden="true">
      <g className="hero-pipe-field-bg">
        {field.edges.map(([from, to]) => {
          const start = field.nodes[from];
          const end = field.nodes[to];
          if (!start || !end) {
            return null;
          }
          return <line key={`${from}-${to}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
        })}
        {field.nodes.map((node, index) => (
          <circle key={`n-${index}`} cx={node.x} cy={node.y} r={node.r} />
        ))}
      </g>
    </svg>
  );
}

export function TypedGraphField({
  cluster,
  seed = "a",
  density = "field",
}: {
  cluster: TypedCluster;
  seed?: "a" | "b";
  density?: "field" | "focal";
}) {
  const field = seed === "b" ? FIELD_B : FIELD_A;
  const glowId = seed === "b" ? "cluster-glow-b" : "cluster-glow-a";
  const viewBox = density === "focal" ? "328 78 232 228" : "0 0 560 320";
  const shownField =
    density === "focal"
      ? {
          nodes: field.nodes.filter((node) => node.x >= 328 && node.x <= 560 && node.y >= 78 && node.y <= 306),
          edges: field.edges.filter(([from, to]) => {
            const start = field.nodes[from];
            const end = field.nodes[to];
            return Boolean(
              start &&
                end &&
                start.x >= 328 &&
                start.x <= 560 &&
                start.y >= 78 &&
                start.y <= 306 &&
                end.x >= 328 &&
                end.x <= 560 &&
                end.y >= 78 &&
                end.y <= 306,
            );
          }),
        }
      : field;

  return (
    <svg
      className={density === "focal" ? "hero-pipe-field is-focal" : "hero-pipe-field"}
      viewBox={viewBox}
      role="img"
      data-density={density}
      aria-label={cluster.label}
    >
      <defs>
        <filter id={glowId} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="7.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.004  0 0 0 0 0.91  0 0 0 0 0.44  0 0 0 0.7 0"
            result="tint"
          />
          <feMerge>
            <feMergeNode in="tint" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-pipe-field-bg" aria-hidden="true">
        {shownField.edges.map(([from, to]) => {
          const start = field.nodes[from];
          const end = field.nodes[to];
          if (!start || !end) {
            return null;
          }
          return <line key={`${from}-${to}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
        })}
        {shownField.nodes.map((node, index) => (
          <circle key={`n-${index}`} cx={node.x} cy={node.y} r={node.r} />
        ))}
      </g>

      <g className="hero-pipe-cluster" filter={`url(#${glowId})`}>
        {cluster.links.map((link) => (
          <path key={link.d} d={link.d} />
        ))}
        {cluster.nodes.map((node) => (
          <circle key={node.label} className={node.kind === "relation" ? "is-relation" : "is-entity"} cx={node.x} cy={node.y} r={node.kind === "relation" ? 8.5 : 7.2} />
        ))}
      </g>

      {cluster.nodes.map((node) => {
        const labelX = node.anchor === "start" ? node.x + 16 : node.x;
        const kindY = node.anchor === "middle" && node.y > 200 ? node.y + 42 : node.y - 30;
        const nameY = node.anchor === "middle" && node.y > 200 ? node.y + 26 : node.y - 16;
        return (
          <g key={`lab-${node.label}`}>
            <text className="hero-pipe-node-kind" x={labelX} y={kindY} textAnchor={node.anchor ?? "middle"}>
              {node.typeName}
            </text>
            <text className="hero-pipe-node-label" x={labelX} y={nameY} textAnchor={node.anchor ?? "middle"}>
              {node.label}
            </text>
          </g>
        );
      })}
      {cluster.links.map((link) => (
        <text key={link.role} className="hero-pipe-role" x={link.roleX} y={link.roleY}>
          {link.role}
        </text>
      ))}
    </svg>
  );
}
