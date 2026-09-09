import { copy } from "@/lib/copy";

export function Analytics() {
  return (
    <section className="section" id="analytics" data-analytics="six-v1">
      <div className="wrap">
        <p className="eyebrow">{copy.analytics.kicker}</p>
        <h2 className="section-title">{copy.analytics.h2}</h2>
        <p className="lede">{copy.analytics.lede}</p>
        <ol className="analytics-grid">
          {copy.analytics.cards.map((card) => (
            <li key={card.id} className="analytics-card" data-card={card.id}>
              <span>{card.index}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <a href={card.href} rel="noreferrer">
                {card.hrefLabel}
                <span aria-hidden="true"> →</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
