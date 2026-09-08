export type FeedKind = "hero" | "s2" | "meaning";

type Feed = { d: string; mid: { x: number; y: number } };

const IN_TOP: Feed = { d: "M14.5 28 H20 V48 H27.5", mid: { x: 20, y: 38 } };
const IN_MID: Feed = { d: "M14.5 50 H27.5", mid: { x: 21, y: 50 } };
const IN_BOT: Feed = { d: "M14.5 72 H20 V52 H27.5", mid: { x: 20, y: 62 } };
const OUT_TOP: Feed = { d: "M71.5 42 H76 V34 H81.5", mid: { x: 76, y: 38 } };
const OUT_MID: Feed = { d: "M71.5 50 H81.5", mid: { x: 76.5, y: 50 } };
const OUT_BOT: Feed = { d: "M71.5 58 H76 V66 H81.5", mid: { x: 76, y: 62 } };

function feedsFor(kind: FeedKind): Feed[] {
  switch (kind) {
    case "hero":
      return [IN_TOP, IN_BOT, OUT_TOP, OUT_BOT];
    case "s2":
      return [IN_TOP, IN_MID, IN_BOT, OUT_TOP, OUT_MID, OUT_BOT];
    case "meaning":
      return [IN_TOP, IN_MID, IN_BOT, OUT_TOP, OUT_BOT];
    default: {
      const exhausted: never = kind;
      return exhausted;
    }
  }
}

export function PipelineFeeds({ kind }: { kind: FeedKind }) {
  const paths = feedsFor(kind);

  return (
    <svg className="hero-pipe-feeds" data-feeds={kind} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((feed) => (
        <path key={feed.d} className="hero-feed-line" d={feed.d} />
      ))}
      {paths.map((feed) => (
        <circle key={`pkt-${feed.d}`} className="hero-feed-packet" cx={feed.mid.x} cy={feed.mid.y} r="0.85" />
      ))}
      {paths.map((feed, index) => (
        <circle key={`dot-${feed.d}`} className="hero-feed-dot" r="0.55" cx="0" cy="0">
          <animateMotion
            dur="3.2s"
            begin={`${index * 0.4}s`}
            repeatCount="indefinite"
            path={feed.d}
          />
        </circle>
      ))}
    </svg>
  );
}
