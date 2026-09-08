import type { MeaningPhase } from "./MeaningGraphic";

type TableRow = {
  hub: string;
  role: string;
  player: string;
  attr: string;
  status: string;
  fail?: boolean;
};

function WindowBar({ title }: { title: string }) {
  return (
    <div className="meaning-window-bar">
      <span className="studio-pane-lights" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="meaning-window-title">{title}</span>
    </div>
  );
}

function tableRows(phase: MeaningPhase): TableRow[] {
  switch (phase) {
    case "ingest":
      return [
        { hub: "person", role: "-", player: "Dana", attr: "-", status: "write" },
        { hub: "company", role: "-", player: "Helix AG", attr: "-", status: "write" },
        { hub: "clearance", role: "grantee", player: "Dana", attr: "-", status: "write" },
      ];
    case "update":
      return [
        { hub: "person", role: "-", player: "Dana", attr: "-", status: "held" },
        { hub: "employee", role: "-", player: "Dana", attr: "-", status: "subtype" },
        { hub: "company", role: "-", player: "Helix AG", attr: "-", status: "held" },
      ];
    case "enforce":
      return [
        { hub: "ownership", role: "owner", player: "Dana", attr: "-", status: "reject", fail: true },
        { hub: "ownership", role: "owned", player: "Helix AG", attr: "-", status: "held" },
        { hub: "clearance", role: "grantee", player: "Dana", attr: "-", status: "held" },
      ];
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

function StudioBody({ phase }: { phase: MeaningPhase }) {
  switch (phase) {
    case "ingest":
      return (
        <pre className="meaning-layer-code">
          <span className="kw">insert</span>
          {"\n  $p isa person;\n  $c isa company;"}
        </pre>
      );
    case "update":
      return (
        <pre className="meaning-layer-code">
          <span className="kw">insert</span>
          {"\n  $e sub person;\n  $e isa employee;"}
        </pre>
      );
    case "enforce":
      return (
        <>
          <pre className="meaning-layer-code">
            <span className="kw">insert</span>
            {'\n  $o isa ownership;\n  $p isa person;\n  $o links (owner: $p);'}
          </pre>
          <p className="meaning-layer-fail">reject: person cannot play ownership:owner</p>
        </>
      );
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

function studioTitle(phase: MeaningPhase): string {
  switch (phase) {
    case "ingest":
      return "Studio · ingest.tql";
    case "update":
      return "Studio · update.tql";
    case "enforce":
      return "Studio · write.tql";
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

function InspectBody({ phase }: { phase: MeaningPhase }) {
  switch (phase) {
    case "ingest":
      return (
        <>
          <p className="meaning-inspect-kicker">Relation</p>
          <ul>
            <li>
              <i className="meaning-inspect-dot" />
              clearance <span>hub</span>
            </li>
            <li>
              <i className="meaning-inspect-dot" />
              grantee <span>role</span>
            </li>
          </ul>
          <p className="meaning-inspect-kicker">Players</p>
          <ul>
            <li>
              <i className="meaning-inspect-dot" />
              Dana <span>person</span>
            </li>
            <li>
              <i className="meaning-inspect-dot" />
              Helix AG <span>company</span>
            </li>
          </ul>
        </>
      );
    case "update":
      return (
        <>
          <p className="meaning-inspect-kicker">Types</p>
          <ul>
            <li>
              <i className="meaning-inspect-dot" />
              person <span>entity</span>
            </li>
            <li>
              <i className="meaning-inspect-dot" />
              employee <span>subtype</span>
            </li>
          </ul>
          <p className="meaning-inspect-kicker">Players</p>
          <ul>
            <li>
              <i className="meaning-inspect-dot" />
              Dana <span>employee</span>
            </li>
            <li>
              <i className="meaning-inspect-dot" />
              Helix AG <span>company</span>
            </li>
          </ul>
        </>
      );
    case "enforce":
      return (
        <>
          <p className="meaning-inspect-kicker">Relation</p>
          <ul>
            <li>
              <i className="meaning-inspect-dot" />
              ownership <span>hub</span>
            </li>
            <li>
              <i className="meaning-inspect-dot" />
              owner <span>role</span>
            </li>
            <li>
              <i className="meaning-inspect-dot" />
              owned <span>role</span>
            </li>
          </ul>
          <p className="meaning-inspect-kicker">Players</p>
          <ul>
            <li className="is-fail">
              <i className="meaning-inspect-dot is-fail" />
              Dana <span>person</span>
            </li>
            <li>
              <i className="meaning-inspect-dot" />
              Helix AG <span>company</span>
            </li>
          </ul>
          <p className="meaning-inspect-kicker">Enforce</p>
          <ul>
            <li>
              <i className="meaning-inspect-dot" />
              company plays ownership:owner
            </li>
            <li className="is-fail">
              <i className="meaning-inspect-dot is-fail" />
              person cannot play owner
            </li>
          </ul>
        </>
      );
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

export function MeaningLayered({ phase }: { phase: MeaningPhase }) {
  const rows = tableRows(phase);

  return (
    <figure className="meaning-layered" data-meaning-art="layered-v1" data-meaning-phase={phase}>
      <div className="meaning-layer-stack">
        <article className="meaning-layer is-table">
          <WindowBar title="schema · typed hubs" />
          <div className="meaning-window-body">
            <p className="meaning-layer-kicker">Relation instances / role players</p>
            <table>
              <thead>
                <tr>
                  <th>hub</th>
                  <th>role</th>
                  <th>player</th>
                  <th>attr</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.hub}-${row.role}-${row.player}`} className={row.fail ? "is-fail" : "is-ok"}>
                    <td>{row.hub}</td>
                    <td>{row.role}</td>
                    <td>{row.player}</td>
                    <td>{row.attr}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="meaning-layer is-typeql">
          <WindowBar title={studioTitle(phase)} />
          <div className="meaning-window-body">
            <StudioBody phase={phase} />
          </div>
        </article>
        <article className="meaning-layer is-roles">
          <WindowBar title="roles · players" />
          <div className="meaning-window-body">
            <InspectBody phase={phase} />
          </div>
        </article>
      </div>
    </figure>
  );
}
