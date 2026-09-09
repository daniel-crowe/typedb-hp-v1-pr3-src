import { copy } from "@/lib/copy";
import { AiInstrument } from "./AiInstrument";

export function AiSystems() {
  return (
    <section className="section section-proof" id="ai-systems">
      <div className="wrap">
        <h2 className="section-title">{copy.ai.h2}</h2>
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
      </div>
    </section>
  );
}
