import { copy } from "@/lib/copy";
import { TypedFactGraph } from "./TypedFactGraph";

export function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-copy">
        <h1>{copy.hero.h1}</h1>
        <p className="hero-sub">{copy.hero.sub}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={copy.hero.primary.href} rel="noreferrer">
            {copy.hero.primary.label}
          </a>
          <a className="btn btn-ghost" href={copy.hero.secondary.href} rel="noreferrer">
            {copy.hero.secondary.label}
          </a>
        </div>
      </div>
      <TypedFactGraph
        id="hero-possess"
        caption="The ownership fact is held in TypeDB. Alice plays owner. typedb plays resource."
      />
    </section>
  );
}
