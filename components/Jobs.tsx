import { copy } from "@/lib/copy";
import { JobGraphic } from "./JobGraphics";

export function Jobs() {
  return (
    <section className="section" id="jobs">
      <div className="wrap">
        <h2 className="section-title">{copy.s3.h2}</h2>
        <p className="lede">{copy.s3.lede}</p>
        <div className="job-grid">
          {copy.s3.items.map((item) => (
            <article key={item.id} className="job-card" data-job={item.id}>
              <p className="kind">{item.industry}</p>
              <h3>{item.title}</h3>
              <div className="job-visual">
                <JobGraphic id={item.id} />
              </div>
              <p>{item.job}</p>
              <p>{item.with}</p>
              <a href={item.href} rel="noreferrer">
                {item.hrefLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
