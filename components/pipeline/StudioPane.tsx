type StudioChrome = "plain" | "studio";

type StudioFile = {
  label: string;
  on?: boolean;
};

type WriteRejectProps = {
  mode: "write-reject";
  query: string[];
  reject: string;
  chrome?: StudioChrome;
  violation?: string;
  note?: string;
  foot?: string;
  files?: StudioFile[];
  constraints?: string[];
  meta?: string[];
};

type MatchProps = {
  mode: "match";
  query: string[];
  rows?: { role: string; value: string }[];
  chrome?: StudioChrome;
  foot?: string;
  files?: StudioFile[];
};

type StudioPaneProps = MatchProps | WriteRejectProps;

function TypeqlLine({ line }: { line: string }) {
  if (line.startsWith("match") || line.startsWith("insert") || line.startsWith("links")) {
    return <span className="kw">{line}</span>;
  }
  return line;
}

function StudioLights() {
  return (
    <span className="studio-pane-lights" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function StudioFiles({ files }: { files: StudioFile[] }) {
  return (
    <div className="studio-pane-files">
      {files.map((file) => (
        <span key={file.label} className={file.on ? "is-on" : undefined}>
          {file.label}
        </span>
      ))}
    </div>
  );
}

function WriteRejectPane({
  query,
  reject,
  chrome = "plain",
  violation = "Schema violation",
  note,
  foot,
  files,
  constraints,
  meta,
}: Omit<WriteRejectProps, "mode">) {
  switch (chrome) {
    case "studio":
      return (
        <div className="studio-pane is-studio" data-studio="write-reject">
          <div className="studio-pane-bar">
            <StudioLights />
            <span className="studio-pane-file">TypeDB Studio · Write</span>
          </div>
          {files ? <StudioFiles files={files} /> : null}
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
            {constraints ? (
              <ul className="studio-pane-constraints">
                {constraints.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>
          {meta ? (
            <p className="studio-pane-meta">
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          ) : null}
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
        files={props.files}
        constraints={props.constraints}
        meta={props.meta}
      />
    );
  }

  const chrome = props.chrome ?? "plain";
  switch (chrome) {
    case "studio":
      return (
        <div className="studio-pane is-studio" data-studio="match">
          <div className="studio-pane-bar">
            <StudioLights />
            <span className="studio-pane-file">TypeQL · Match</span>
          </div>
          {props.files ? <StudioFiles files={props.files} /> : null}
          <p className="studio-pane-kicker">TypeQL match</p>
          <div className="studio-pane-code">
            <ol>
              {props.query.map((line) => (
                <li key={line}>
                  <TypeqlLine line={line} />
                </li>
              ))}
            </ol>
          </div>
          {props.rows ? (
            <div className="hero-pipe-result">
              <p className="hero-pipe-result-label">Result</p>
              {props.rows.map((row) => (
                <p key={row.role}>
                  <span className="role-tag">{row.role}</span> {row.value}
                </p>
              ))}
            </div>
          ) : null}
          {props.foot ? <p className="studio-pane-foot">{props.foot}</p> : null}
        </div>
      );
    case "plain":
      return (
        <div className="studio-pane" data-studio="match">
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
          {props.rows ? (
            <div className="hero-pipe-result">
              <p className="hero-pipe-result-label">Result</p>
              {props.rows.map((row) => (
                <p key={row.role}>
                  <span className="role-tag">{row.role}</span> {row.value}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      );
    default: {
      const exhausted: never = chrome;
      return exhausted;
    }
  }
}
