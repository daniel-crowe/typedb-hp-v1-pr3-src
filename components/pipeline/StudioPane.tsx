type StudioPaneProps =
  | {
      mode: "match";
      query: string[];
      rows: { role: string; value: string }[];
    }
  | {
      mode: "write-reject";
      query: string[];
      reject: string;
    };

export function StudioPane(props: StudioPaneProps) {
  return (
    <div className="studio-pane" data-studio={props.mode}>
      <div className="studio-pane-bar">
        <span className={props.mode === "match" ? "studio-pane-tab is-on" : "studio-pane-tab"}>Match</span>
        <span className={props.mode === "write-reject" ? "studio-pane-tab is-on" : "studio-pane-tab"}>Write</span>
        <span className="studio-pane-file">TypeQL</span>
      </div>
      <div className="studio-pane-code">
        <ol>
          {props.query.map((line) => (
            <li key={line}>
              {line.startsWith("match") || line.startsWith("insert") ? <span className="kw">{line}</span> : line}
            </li>
          ))}
        </ol>
      </div>
      {props.mode === "match" ? (
        <div className="hero-pipe-result">
          <p className="hero-pipe-result-label">Result</p>
          {props.rows.map((row) => (
            <p key={row.role}>
              <span className="role-tag">{row.role}</span> {row.value}
            </p>
          ))}
        </div>
      ) : (
        <p className="fail-line studio-pane-reject">{props.reject}</p>
      )}
    </div>
  );
}
