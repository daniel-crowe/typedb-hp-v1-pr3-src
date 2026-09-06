import { copy } from "@/lib/copy";

export function Insight() {
  return (
    <section className="section insight" id="insight">
      <div className="wrap">
        <p className="eyebrow">{copy.s4.eyebrow}</p>
        <p className="insight-sentence">{copy.s4.sentence}</p>
      </div>
    </section>
  );
}
