const FEEDS_IN = [
  { d: "M14.5 28 H20 V48 H27.5", mid: { x: 20, y: 38 } },
  { d: "M14.5 50 H27.5", mid: { x: 21, y: 50 } },
  { d: "M14.5 72 H20 V52 H27.5", mid: { x: 20, y: 62 } },
];

const FEEDS_OUT = [
  { d: "M71.5 42 H76 V34 H81.5", mid: { x: 76, y: 38 } },
  { d: "M71.5 58 H76 V66 H81.5", mid: { x: 76, y: 62 } },
];

export function PipelineFeeds() {
  const paths = [...FEEDS_IN, ...FEEDS_OUT];

  return (
    <svg className="hero-pipe-feeds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((feed) => (
        <path key={feed.d} className="hero-feed-line" d={feed.d} />
      ))}
      {paths.map((feed) => (
        <circle key={`pkt-${feed.d}`} className="hero-feed-packet" cx={feed.mid.x} cy={feed.mid.y} r="0.85" />
      ))}
      {paths.map((feed) => (
        <circle key={`dot-${feed.d}`} className="hero-feed-dot" r="0.55" cx="0" cy="0">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={feed.d} />
        </circle>
      ))}
    </svg>
  );
}
