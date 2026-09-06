import { copy } from "@/lib/copy";

type JobId = (typeof copy.s3.items)[number]["id"];

function JobVisual({ id }: { id: JobId }) {
  switch (id) {
    case "code-graph":
      return (
        <div className="job-visual code-graph">
          <span className="walk-node">function</span>
          <span className="walk-edge">covers</span>
          <span className="walk-node">test</span>
        </div>
      );
    case "agentic":
      return (
        <div className="job-visual">
          <pre className="typeql-chip">
            <span className="kw">insert</span>
            {"\n  $e isa full-time-employee,\n    has weekly-hours 35;"}
          </pre>
          <p className="fail-line">weekly-hours is not owned by full-time-employee.</p>
        </div>
      );
    case "cti":
      return (
        <div className="job-visual cti-graph">
          <span className="walk-node">threat-actor</span>
          <span className="walk-edge">attributed-to</span>
          <span className="walk-node">campaign</span>
          <span className="walk-edge">uses</span>
          <span className="walk-node">attack-pattern</span>
        </div>
      );
    case "decision":
      return (
        <div className="job-visual">
          <div className="role-row">
            <span className="role-tag">site</span>
            <span className="role-tag">constraint</span>
            <span className="role-tag">measurement</span>
          </div>
        </div>
      );
    default: {
      const exhausted: never = id;
      return exhausted;
    }
  }
}

export function Jobs() {
  return (
    <section className="section" id="jobs">
      <div className="wrap">
        <p className="eyebrow">{copy.s3.eyebrow}</p>
        <h2 className="section-title">{copy.s3.h2}</h2>
        <p className="lede">{copy.s3.lede}</p>
        <div className="job-grid">
          {copy.s3.items.map((item) => (
            <article key={item.id} className="job-card" data-job={item.id}>
              <p className="kind">{item.industry}</p>
              <h3>{item.title}</h3>
              <JobVisual id={item.id} />
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
