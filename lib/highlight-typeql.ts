import { createHighlighter, type Highlighter } from "shiki";

const typeqlLanguage = {
  name: "typeql",
  scopeName: "source.typeql",
  displayName: "TypeQL",
  patterns: [
    { match: "#.*$", name: "comment.line.number-sign.typeql" },
    { match: '"[^"]*"', name: "string.quoted.double.typeql" },
    { match: "\\$[A-Za-z][\\w-]*", name: "variable.other.typeql" },
    {
      match: "\\b(define|undefine|match|insert|delete|fetch|get|reduce)\\b",
      name: "keyword.control.typeql",
    },
    {
      match: "\\b(isa|sub|owns|plays|relates|has|fun|return|check)\\b",
      name: "keyword.operator.typeql",
    },
    {
      match: "\\b(entity|relation|attribute|value)\\b",
      name: "storage.type.typeql",
    },
    { match: "\\b(owner|resource)\\b", name: "entity.other.attribute-name.typeql" },
  ],
  repository: {},
};

const typeqlTheme = {
  name: "typedb-dark",
  type: "dark" as const,
  colors: {
    "editor.background": "#0c0b14",
    "editor.foreground": "#c8c4d8",
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#6f6a80" } },
    { scope: "string", settings: { foreground: "#f6c94c" } },
    { scope: "variable", settings: { foreground: "#78a0ff" } },
    { scope: "keyword.control", settings: { foreground: "#7ee8df" } },
    { scope: "keyword.operator", settings: { foreground: "#02dac9" } },
    { scope: "storage.type", settings: { foreground: "#ff87dc" } },
    { scope: "entity.other.attribute-name", settings: { foreground: "#f6c94c" } },
  ],
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      langs: [typeqlLanguage],
      themes: [typeqlTheme],
    });
  }
  return highlighterPromise;
}

export async function highlightTypeql(code: string): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: "typeql",
    theme: "typedb-dark",
  });
}
