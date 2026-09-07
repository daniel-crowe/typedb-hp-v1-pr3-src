import { copy } from "@/lib/copy";

export function CloseCta() {
  return (
    <section className="section section-proof" id="close">
      <div className="wrap">
        <h2 className="section-title">{copy.close.h2}</h2>
        <p className="lede">{copy.close.lede}</p>
        <div className="hero-actions close-actions">
          {copy.s6.steps.map((step) => (
            <a key={step.href} className="btn btn-ghost" href={step.href} rel="noreferrer">
              {step.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
