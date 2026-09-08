import { copy } from "@/lib/copy";
import { HeroPipeline } from "./HeroPipeline";

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
      <HeroPipeline />
    </section>
  );
}
