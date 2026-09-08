const FEEDS_IN = [
  { d: "M16.5 29 H22 V48 H29.5", mid: { x: 22, y: 38 } },
  { d: "M16.5 50 H29.5", mid: { x: 23, y: 50 } },
  { d: "M16.5 71 H22 V52 H29.5", mid: { x: 22, y: 62 } },
];

const FEEDS_OUT = [
  { d: "M69 43 H73 V35 H77.5", mid: { x: 73, y: 39 } },
  { d: "M69 57 H73 V65 H77.5", mid: { x: 73, y: 61 } },
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
