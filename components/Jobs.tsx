import { copy } from "@/lib/copy";
import { ProcessGraph } from "./ProcessGraph";

type JobId = (typeof copy.s3.items)[number]["id"];

function JobVisual({ id }: { id: JobId }) {
  switch (id) {
    case "code-graph":
      return (
        <div className="job-visual">
          <ProcessGraph
            label="A function covers a test"
            nodes={[
              { kind: "entity", name: "function" },
              { kind: "relation", name: "coverage" },
              { kind: "entity", name: "test" },
            ]}
            edges={["covers", "covered"]}
          />
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
        <div className="job-visual">
          <ProcessGraph
            label="A threat actor is attributed to a campaign that uses an attack pattern"
            nodes={[
              { kind: "entity", name: "threat-actor" },
              { kind: "relation", name: "attribution" },
              { kind: "entity", name: "campaign" },
            ]}
            edges={["actor", "campaign"]}
          />
        </div>
      );
    case "decision":
      return (
        <div className="job-visual">
          <ProcessGraph
            label="A decision binds site, constraint, and measurement"
            nodes={[
              { kind: "entity", name: "site" },
              { kind: "relation", name: "decision" },
              { kind: "entity", name: "constraint" },
            ]}
            edges={["site", "limit"]}
          />
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
