import { copy } from "@/lib/copy";

export function Neo4jStrip() {
  return (
    <section className="section section-proof" id="neo4j" data-neo4j="strip-v1">
      <div className="wrap neo4j-strip">
        <p className="neo4j-question">{copy.neo4j.question}</p>
        <p className="lede">{copy.neo4j.body}</p>
        <a href={copy.neo4j.href} rel="noreferrer">
          {copy.neo4j.hrefLabel}
          <span aria-hidden="true"> →</span>
        </a>
      </div>
    </section>
  );
}
