import { PipelineFeeds } from "./pipeline/PipelineFeeds";
import { StudioPane } from "./pipeline/StudioPane";
import { OWNERSHIP_CLUSTER, TypedGraphField } from "./pipeline/TypedGraphField";

export function HeroPipeline() {
  return (
    <figure className="hero-pipeline is-slim" data-hero="pipeline" data-pipe="v2" data-hero-slim="1">
      <div className="hero-pipe-flow">
        <PipelineFeeds />

        <div className="hero-pipe-col" data-col="sources">
          <p className="hero-pipe-label">Sources</p>
          <ul className="hero-pipe-sources">
            <li>Docs</li>
            <li>Prompts</li>
            <li>Application code</li>
          </ul>
        </div>

        <div className="hero-pipe-col is-graph" data-col="graph">
          <div className="hero-pipe-graph-bar">
            <span className="hero-pipe-status">Schema enforced</span>
            <span className="hero-pipe-brand">TypeDB</span>
          </div>
          <TypedGraphField cluster={OWNERSHIP_CLUSTER} seed="a" density="focal" />
        </div>

        <div className="hero-pipe-col is-ai" data-col="ai">
          <StudioPane
            mode="match"
            query={["match", "  $o isa resource-ownership;"]}
            rows={[
              { role: "owner", value: "Alice" },
              { role: "resource", value: "typedb" },
            ]}
          />
        </div>
      </div>
      <figcaption>Docs, prompts, and application code become one typed model. Agents query that model.</figcaption>
    </figure>
  );
}
