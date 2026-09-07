import Link from "next/link";
import { copy } from "@/lib/copy";

export function Industries() {
  return (
    <section className="section" id="industries">
      <div className="wrap">
        <h2 className="section-title">{copy.industries.h2}</h2>
        <p className="lede">{copy.industries.lede}</p>
        <div className="job-grid">
          {copy.industries.items.map((item) => (
            <article key={item.id} className="job-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a href={item.href} rel="noreferrer">
                {item.hrefLabel}
              </a>
            </article>
          ))}
        </div>
        <p className="industries-more">
          <Link href={copy.industries.more.href}>{copy.industries.more.label}</Link>
        </p>
        <div className="named-work">
          <h3 className="pair-title">{copy.industries.proof.h2}</h3>
          <p className="lede">{copy.industries.proof.lede}</p>
          <div className="proof-grid">
            {copy.industries.proof.items.map((item) => (
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
