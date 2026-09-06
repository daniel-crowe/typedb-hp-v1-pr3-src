import { highlightTypeql } from "@/lib/highlight-typeql";

export async function TypeqlBlock({ code }: { code: string }) {
  const html = await highlightTypeql(code);
  return <div className="typeql-block" dangerouslySetInnerHTML={{ __html: html }} />;
}
