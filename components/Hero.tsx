import { copy } from "@/lib/copy";

export function Hero() {
  return (
    <section className="hero wrap is-pack" id="top" data-hero-mobile="v1">
      <div className="hero-copy">
        <p className="eyebrow">{copy.hero.kicker}</p>
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
    </section>
  );
}
