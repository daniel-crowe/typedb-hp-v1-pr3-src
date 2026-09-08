type StudioChrome = "plain" | "studio";

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
      chrome?: StudioChrome;
      violation?: string;
      note?: string;
      foot?: string;
    };

function TypeqlLine({ line }: { line: string }) {
  if (line.startsWith("match") || line.startsWith("insert")) {
    return <span className="kw">{line}</span>;
  }
  return line;
}

function WriteRejectPane({
  query,
  reject,
  chrome = "plain",
  violation = "Schema violation",
  note,
  foot,
}: {
  query: string[];
  reject: string;
  chrome?: StudioChrome;
  violation?: string;
  note?: string;
  foot?: string;
}) {
  switch (chrome) {
    case "studio":
      return (
        <div className="studio-pane is-studio" data-studio="write-reject">
          <div className="studio-pane-bar">
            <span className="studio-pane-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="studio-pane-file">TypeDB Studio · Write</span>
          </div>
          <p className="studio-pane-kicker">TypeQL insert</p>
          <div className="studio-pane-code">
            <ol>
              {query.map((line) => (
                <li key={line}>
                  <TypeqlLine line={line} />
                </li>
              ))}
            </ol>
          </div>
          <p className="studio-pane-kicker is-reject">Write rejected</p>
          <div className="studio-pane-reject">
            <p className="studio-pane-violation">{violation}</p>
            <p className="fail-line">{reject}</p>
            {note ? <p className="studio-pane-note">{note}</p> : null}
          </div>
          {foot ? <p className="studio-pane-foot">{foot}</p> : null}
        </div>
      );
    case "plain":
      return (
        <div className="studio-pane" data-studio="write-reject">
          <div className="studio-pane-bar">
            <span className="studio-pane-tab">Match</span>
            <span className="studio-pane-tab is-on">Write</span>
            <span className="studio-pane-file">TypeQL</span>
          </div>
          <div className="studio-pane-code">
            <ol>
              {query.map((line) => (
                <li key={line}>
                  <TypeqlLine line={line} />
                </li>
              ))}
            </ol>
          </div>
          <p className="fail-line studio-pane-reject">{reject}</p>
        </div>
      );
    default: {
      const exhausted: never = chrome;
      return exhausted;
    }
  }
}

export function StudioPane(props: StudioPaneProps) {
  if (props.mode === "write-reject") {
    return (
      <WriteRejectPane
        query={props.query}
        reject={props.reject}
        chrome={props.chrome}
        violation={props.violation}
        note={props.note}
        foot={props.foot}
      />
    );
  }

  return (
    <div className="studio-pane" data-studio={props.mode}>
      <div className="studio-pane-bar">
        <span className="studio-pane-tab is-on">Match</span>
        <span className="studio-pane-tab">Write</span>
        <span className="studio-pane-file">TypeQL</span>
      </div>
      <div className="studio-pane-code">
        <ol>
          {props.query.map((line) => (
            <li key={line}>
              <TypeqlLine line={line} />
            </li>
          ))}
        </ol>
      </div>
      <div className="hero-pipe-result">
        <p className="hero-pipe-result-label">Result</p>
        {props.rows.map((row) => (
          <p key={row.role}>
            <span className="role-tag">{row.role}</span> {row.value}
          </p>
        ))}
      </div>
    </div>
  );
}
