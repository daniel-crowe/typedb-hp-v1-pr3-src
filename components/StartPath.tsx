import { copy } from "@/lib/copy";

export function StartPath() {
  return (
    <section className="section" id="start">
      <div className="wrap">
        <p className="eyebrow">{copy.s6.eyebrow}</p>
        <h2 className="section-title">{copy.s6.h2}</h2>
        <p className="lede">{copy.s6.lede}</p>
        <ol className="start-steps">
          {copy.s6.steps.map((step) => (
            <li key={step.href}>
              <span className="start-n">{step.n}</span>
              <div>
                <a href={step.href} rel="noreferrer">
                  {step.label}
                </a>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
