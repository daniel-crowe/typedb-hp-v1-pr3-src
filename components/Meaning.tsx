import { copy } from "@/lib/copy";

export function Meaning() {
  return (
    <section className="section section-proof" id="meaning">
      <div className="wrap">
        <p className="eyebrow">{copy.s2.eyebrow}</p>
        <h2 className="section-title">{copy.s2.h2}</h2>
        <p className="lede">{copy.s2.lede}</p>

        <figure className="domain-graphic">
          <figcaption>
            <strong>{copy.s2.graphic.title}</strong>
            <span>{copy.s2.graphic.lede}</span>
          </figcaption>
          <div className="domain-map">
            <div className="lifecycle-band" aria-label="Ingest, update, enforce">
              <article>
                <p className="lifecycle-label">{copy.s2.graphic.ingest.label}</p>
                <p>{copy.s2.graphic.ingest.body}</p>
              </article>
              <span className="lifecycle-arrow" aria-hidden="true">
                →
              </span>
              <article>
                <p className="lifecycle-label">{copy.s2.graphic.update.label}</p>
                <p>{copy.s2.graphic.update.body}</p>
              </article>
              <span className="lifecycle-arrow" aria-hidden="true">
                →
              </span>
              <article>
                <p className="lifecycle-label">{copy.s2.graphic.enforce.label}</p>
                <p>{copy.s2.graphic.enforce.body}</p>
              </article>
            </div>
            <div className="domain-core">
              <div className="node-card entity">
                <div className="node-head">
                  <span className="node-kind">entity</span>
                  <span className="node-name">user</span>
                </div>
              </div>
              <div className="node-card relation">
                <div className="node-head">
                  <span className="node-kind">relation</span>
                  <span className="node-name">resource-ownership</span>
                </div>
                <div className="role-row">
                  <span className="role-tag">owner</span>
                  <span className="role-tag">resource</span>
                </div>
              </div>
              <div className="node-card entity">
                <div className="node-head">
                  <span className="node-kind">entity</span>
                  <span className="node-name">repository</span>
                </div>
              </div>
            </div>
          </div>
        </figure>

        <div className="prop-grid">
          {copy.s2.props.map((prop) => (
            <article key={prop.title} className="prop-card">
              <div className="metric-slot" aria-hidden="true" />
              <h3>{prop.title}</h3>
              <p>{prop.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
