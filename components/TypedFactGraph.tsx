type TypedFactGraphProps = {
  caption?: string;
  compact?: boolean;
  id?: string;
};

export function TypedFactGraph({ caption, compact = false, id = "typed-graph" }: TypedFactGraphProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  return (
    <figure className={compact ? "typed-graph is-compact" : "typed-graph"}>
      <svg viewBox="0 0 640 260" role="img" aria-labelledby={`${titleId} ${descId}`}>
        <title id={titleId}>resource-ownership held as one fact</title>
        <desc id={descId}>
          Alice plays owner and typedb plays resource on the same resource-ownership relation.
        </desc>
        <defs>
          <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#958fa8" />
          </marker>
        </defs>
        <path
          className="typed-edge"
          d="M150 78 C230 78 250 128 318 148"
          fill="none"
          markerEnd={`url(#${id}-arrow)`}
        />
        <path
          className="typed-edge"
          d="M490 78 C410 78 390 128 322 148"
          fill="none"
          markerEnd={`url(#${id}-arrow)`}
        />
        <text className="typed-role" x="214" y="96">
          owner
        </text>
        <text className="typed-role" x="390" y="96">
          resource
        </text>
        <g className="typed-node entity" transform="translate(36 36)">
          <rect width="148" height="72" rx="6" />
          <text className="typed-kind" x="14" y="22">
            entity
          </text>
          <text className="typed-name" x="14" y="46">
            user
          </text>
          <text className="typed-inst" x="14" y="64">
            Alice
          </text>
        </g>
        <g className="typed-node entity" transform="translate(456 36)">
          <rect width="148" height="72" rx="6" />
          <text className="typed-kind" x="14" y="22">
            entity
          </text>
          <text className="typed-name" x="14" y="46">
            repository
          </text>
          <text className="typed-inst" x="14" y="64">
            typedb
          </text>
        </g>
        <g className="typed-node relation" transform="translate(214 148)">
          <rect width="212" height="72" rx="6" />
          <text className="typed-kind" x="14" y="22">
            relation
          </text>
          <text className="typed-name" x="14" y="46">
            resource-ownership
          </text>
          <text className="typed-inst" x="14" y="64">
            one fact, two roles
          </text>
        </g>
      </svg>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
