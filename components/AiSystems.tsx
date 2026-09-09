import { copy } from "@/lib/copy";
import { AiInstrument } from "./AiInstrument";

export function AiSystems() {
  return (
    <section className="section section-proof" id="ai-systems">
      <div className="wrap">
        <AiInstrument />
        <ol className="ai-pillars">
          {copy.ai.pillars.map((pillar) => (
            <li key={pillar.index}>
              <span>{pillar.index}</span>
              <div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="ai-audit-title">{copy.ai.auditH3}</h3>
        <p className="lede">{copy.ai.auditBody}</p>
        <p className="lede">{copy.ai.auditBody2}</p>
        <dl className="audit-metrics">
          {copy.ai.metrics.map((item) => (
            <div key={item.value}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
