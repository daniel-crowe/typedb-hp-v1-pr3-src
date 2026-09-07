import { copy } from "@/lib/copy";

export function Metrics() {
  return (
    <section className="section section-proof" id="metrics">
      <div className="wrap">
        <h2 className="section-title">{copy.metrics.h2}</h2>
        <p className="lede">{copy.metrics.lede}</p>
        <div className="metric-grid">
          {copy.metrics.items.map((item) => (
            <a key={item.label} className="metric-card" href={item.href} rel="noreferrer">
              <p className="metric-value">{item.value}</p>
              <p>{item.label}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
