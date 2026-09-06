import { copy } from "@/lib/copy";

export function Community() {
  return (
    <section className="section section-proof" id="community">
      <div className="wrap">
        <p className="eyebrow">{copy.s7.eyebrow}</p>
        <h2 className="section-title">{copy.s7.h2}</h2>
        <p className="lede">{copy.s7.lede}</p>
        <div className="ways-grid">
          {copy.s7.ways.map((way) => (
            <article key={way.href} className="way-card">
              <p className="kind">{way.verb}</p>
              <h3>{way.label}</h3>
              <p>{way.body}</p>
              <a href={way.href} rel="noreferrer">
                {way.label}
              </a>
            </article>
          ))}
        </div>

        <div className="named-work">
          <p className="eyebrow">{copy.s7.proof.eyebrow}</p>
          <h3 className="pair-title">{copy.s7.proof.h2}</h3>
          <p className="lede">{copy.s7.proof.lede}</p>
          <div className="proof-grid">
            {copy.s7.proof.items.map((item) => (
              <article key={item.name} className="proof-card">
                <p className="kind">{item.kind}</p>
                <h3>{item.name}</h3>
                <p>{item.body}</p>
                <a href={item.href} rel="noreferrer">
                  {item.hrefLabel}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
