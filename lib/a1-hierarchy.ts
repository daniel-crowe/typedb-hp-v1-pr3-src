/**
 * Hero A1 compact hierarchy — instances from TypeDB docs
 * https://typedb.com/docs/use-cases/graph/
 * people → directorship hubs → companies; ownership edges carry stake-percentage.
 */

export const A1_VIEW = { w: 740, h: 340 } as const;

export type A1Node = {
  id: string;
  kind: "entity" | "relation";
  type: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type A1Chip = {
  id: string;
  label: string;
  value: string;
  x: number;
  y: number;
};

export type A1Edge = {
  id: string;
  points: [number, number][];
  role?: string;
  roleAt?: [number, number];
};

export const people: A1Node[] = [
  { id: "alice", kind: "entity", type: "person", name: "Alice Park", x: 8, y: 40, w: 148, h: 58 },
  { id: "bob", kind: "entity", type: "person", name: "Bob Rivera", x: 8, y: 228, w: 148, h: 58 },
];

export const hubs: A1Node[] = [
  { id: "d1", kind: "relation", type: "directorship", name: "Alice · Acme", x: 248, y: 20, w: 156, h: 50 },
  { id: "d2", kind: "relation", type: "directorship", name: "Alice · Globex", x: 248, y: 110, w: 156, h: 50 },
  { id: "d3", kind: "relation", type: "directorship", name: "Bob · Initech", x: 248, y: 228, w: 156, h: 50 },
];

export const companies: A1Node[] = [
  { id: "acme", kind: "entity", type: "company", name: "Acme Corp", x: 536, y: 16, w: 148, h: 58 },
  { id: "globex", kind: "entity", type: "company", name: "Globex Inc", x: 536, y: 106, w: 148, h: 58 },
  { id: "initech", kind: "entity", type: "company", name: "Initech Ltd", x: 536, y: 224, w: 148, h: 58 },
];

export const nodes: A1Node[] = [...people, ...hubs, ...companies];

export const edges: A1Edge[] = [
  {
    id: "alice-d1",
    points: [
      [156, 69],
      [202, 69],
      [202, 45],
      [248, 45],
    ],
    role: "director",
    roleAt: [178, 64],
  },
  {
    id: "alice-d2",
    points: [
      [156, 69],
      [202, 69],
      [202, 135],
      [248, 135],
    ],
    role: "director",
    roleAt: [178, 128],
  },
  {
    id: "bob-d3",
    points: [
      [156, 257],
      [248, 257],
    ],
    role: "director",
    roleAt: [186, 252],
  },
  {
    id: "d1-acme",
    points: [
      [404, 45],
      [536, 45],
    ],
    role: "directed",
    roleAt: [448, 40],
  },
  {
    id: "d2-globex",
    points: [
      [404, 135],
      [536, 135],
    ],
    role: "directed",
    roleAt: [448, 130],
  },
  {
    id: "d3-initech",
    points: [
      [404, 253],
      [536, 253],
    ],
    role: "directed",
    roleAt: [448, 248],
  },
  {
    id: "own-51",
    points: [
      [610, 74],
      [610, 106],
    ],
  },
  {
    id: "own-30",
    points: [
      [684, 45],
      [716, 45],
      [716, 253],
      [684, 253],
    ],
  },
];

export const chips: A1Chip[] = [
  { id: "stake-51", label: "stake", value: "51%", x: 582, y: 78 },
  { id: "stake-30", label: "stake", value: "30%", x: 688, y: 140 },
];

export function polyline(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}
