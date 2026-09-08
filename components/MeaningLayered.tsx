import type { MeaningPhase } from "./MeaningGraphic";

function LayerTypeql({ phase }: { phase: MeaningPhase }) {
  switch (phase) {
    case "ingest":
      return (
        <>
          <p className="meaning-layer-kicker">TypeQL</p>
          <pre className="meaning-layer-code">
            <span className="kw">insert</span>
            {"\n  $p isa person;\n  $c isa company;"}
          </pre>
        </>
      );
    case "update":
      return (
        <>
          <p className="meaning-layer-kicker">TypeQL</p>
          <pre className="meaning-layer-code">
            <span className="kw">insert</span>
            {"\n  $e sub person;\n  $e isa employee;"}
          </pre>
        </>
      );
    case "enforce":
      return (
        <>
          <p className="meaning-layer-kicker">TypeQL</p>
          <pre className="meaning-layer-code">
            <span className="kw">insert</span>
            {'\n  $o isa ownership;\n  $p isa person;\n  $o links (owner: $p);'}
          </pre>
          <p className="meaning-layer-fail">person cannot play ownership:owner</p>
        </>
      );
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

function LayerRoles({ phase }: { phase: MeaningPhase }) {
  switch (phase) {
    case "ingest":
      return (
        <ul>
          <li>person</li>
          <li>company</li>
          <li>clearance:grantee</li>
        </ul>
      );
    case "update":
      return (
        <ul>
          <li>person</li>
          <li>employee</li>
          <li>clearance:grantee</li>
        </ul>
      );
    case "enforce":
      return (
        <ul>
          <li>company → ownership:owner</li>
          <li>person → clearance:grantee</li>
          <li className="is-fail">person → ownership:owner</li>
        </ul>
      );
    default: {
      const exhausted: never = phase;
      return exhausted;
    }
  }
}

export function MeaningLayered({ phase }: { phase: MeaningPhase }) {
  return (
    <figure className="meaning-layered" data-meaning-art="layered-v2" data-meaning-phase={phase}>
      <div className="meaning-layer-stack">
        <article className="meaning-layer is-table">
          <p className="meaning-layer-kicker">instances</p>
          <table>
            <thead>
              <tr>
                <th>type</th>
                <th>write</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>person</td>
                <td>Dana</td>
              </tr>
              <tr>
                <td>company</td>
                <td>Helix AG</td>
              </tr>
              <tr>
                <td>relation</td>
                <td>clearance</td>
              </tr>
              {phase === "update" ? (
                <tr>
                  <td>subtype</td>
                  <td>employee</td>
                </tr>
              ) : null}
              {phase === "enforce" ? (
                <tr className="is-fail">
                  <td>ownership</td>
                  <td>owner: Dana</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </article>
        <article className="meaning-layer is-typeql">
          <LayerTypeql phase={phase} />
        </article>
        <article className="meaning-layer is-roles">
          <p className="meaning-layer-kicker">roles</p>
          <LayerRoles phase={phase} />
        </article>
      </div>
    </figure>
  );
}
