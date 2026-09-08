export function HeroPipeline() {
  return (
    <figure className="hero-pipeline" data-hero="pipeline">
      <div className="hero-pipe-col" data-col="sources">
        <p className="hero-pipe-label">Sources</p>
        <ul className="hero-pipe-sources">
          <li>Docs</li>
          <li>Prompts</li>
          <li>Application code</li>
        </ul>
      </div>
      <span className="hero-pipe-arrow" aria-hidden="true">
        →
      </span>
      <div className="hero-pipe-col is-graph" data-col="graph">
        <p className="hero-pipe-label">TypeDB</p>
        <svg className="hero-pipe-graph" viewBox="0 0 280 168" role="img" aria-label="Alice plays owner on resource-ownership. typedb plays resource.">
          <g className="typed-node entity" transform="translate(8 56)">
            <rect width="72" height="52" rx="5" />
            <text className="typed-kind" x="8" y="18">
              person
            </text>
            <text className="typed-name" x="8" y="36">
              Alice
            </text>
          </g>
          <g className="typed-node relation" transform="translate(96 48)">
            <rect width="88" height="68" rx="5" />
            <text className="typed-kind" x="8" y="16">
              relation
            </text>
            <text className="typed-name" x="8" y="34">
              ownership
            </text>
            <text className="typed-role" x="8" y="52">
              owner · resource
            </text>
          </g>
          <g className="typed-node entity" transform="translate(200 56)">
            <rect width="72" height="52" rx="5" />
            <text className="typed-kind" x="8" y="18">
              repository
            </text>
            <text className="typed-name" x="8" y="36">
              typedb
            </text>
          </g>
          <path className="typed-edge" d="M80 82 L96 82" />
          <path className="typed-edge" d="M184 82 L200 82" />
        </svg>
      </div>
      <span className="hero-pipe-arrow" aria-hidden="true">
        →
      </span>
      <div className="hero-pipe-col" data-col="ai">
        <p className="hero-pipe-label">Agents</p>
        <pre className="typeql-chip hero-pipe-ask">
          <span className="kw">match</span>
          {"\n  $o isa resource-ownership;"}
        </pre>
      </div>
      <figcaption>
        Docs, prompts, and application code become one typed model. Agents query that model.
      </figcaption>
    </figure>
  );
}
