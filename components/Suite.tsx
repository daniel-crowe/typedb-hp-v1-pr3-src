import { copy } from "@/lib/copy";

function ProductMark({ id }: { id: string }) {
  return (
    <svg className="suite-mark" viewBox="0 0 32 32" aria-hidden="true">
      {id === "database" ? <rect x="6" y="6" width="20" height="20" rx="4" /> : null}
      {id === "cloud" ? <path d="M8 20h16a6 6 0 0 0-1-12 7 7 0 0 0-13 3 5 5 0 0 0-2 9z" /> : null}
      {id === "studio" ? (
        <>
          <rect x="5" y="8" width="22" height="16" rx="3" />
          <path d="M5 12h22" />
        </>
      ) : null}
      {id === "typeql" ? <text x="6" y="21">QL</text> : null}
    </svg>
  );
}

export function Suite() {
  return (
    <section className="section section-proof" id="suite" data-suite="row-v2">
      <div className="wrap">
        <h2 className="section-title">{copy.s5.h2}</h2>
        <p className="lede">{copy.s5.lede}</p>
        <div className="suite-board is-products">
          {copy.s5.products.map((product) => (
            <article key={product.id} className="suite-stage" data-product={product.id}>
              <ProductMark id={product.id} />
              <p className="suite-name">{product.label}</p>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
              <a href={product.href} rel="noreferrer">
                {product.hrefLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
