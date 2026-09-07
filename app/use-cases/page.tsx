import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.useCasesPage.title,
  description: copy.useCasesPage.lede,
  robots: { index: false, follow: false },
};

export default function UseCasesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section" id="use-cases">
          <div className="wrap">
            <h1 className="section-title">{copy.useCasesPage.h2}</h1>
            <p className="lede">{copy.useCasesPage.lede}</p>
            <div className="job-grid">
              {copy.industries.items.map((item) => (
                <article key={item.id} className="job-card">
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  <a href={item.href} rel="noreferrer">
                    {item.hrefLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
