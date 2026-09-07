import { copy } from "@/lib/copy";

function markInsight(sentence: string, marks: readonly string[]) {
  const pattern = new RegExp(`(${marks.map((mark) => mark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = sentence.split(pattern);
  return parts.map((part, index) =>
    marks.includes(part) ? (
      <em key={`${part}-${index}`} className="insight-word">
        {part}
      </em>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export function Insight() {
  return (
    <section className="section insight" id="insight">
      <div className="wrap">
        <p className="insight-sentence">{markInsight(copy.s4.sentence, copy.s4.marks)}</p>
      </div>
    </section>
  );
}
