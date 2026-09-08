import { HeroA1Svg } from "./HeroA1Svg";
import { HeroMobileFocal } from "./HeroMobileFocal";
import { PipelineFeeds } from "./pipeline/PipelineFeeds";
import { StudioPane } from "./pipeline/StudioPane";
import { QuietField } from "./pipeline/TypedGraphField";

export function HeroPipeline() {
  return (
    <figure className="hero-pipeline is-slim" data-hero="pipeline" data-pipe="v2" data-hero-slim="1" data-motion="hero-motion-v1">
      <div className="hero-pipe-flow">
        <PipelineFeeds kind="hero" />

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
          <div className="s2-hub-stage">
            <QuietField seed="a" />
            <HeroA1Svg idPrefix="hero-a1" />
          </div>
        </div>

        <div className="hero-pipe-col is-ai" data-col="ai">
          <StudioPane
            mode="match"
            chrome="studio"
            query={["match $d isa directorship,", "      links (director: $p, _);"]}
            rows={[{ role: "director", value: "Alice Park" }]}
            foot="typed path held"
          />
        </div>
      </div>
      <HeroMobileFocal />
      <figcaption>Docs, prompts, and application code become one typed model. Agents query that model.</figcaption>
    </figure>
  );
}
