import { copy } from "@/lib/copy";

type ProductId = (typeof copy.s5.products)[number]["id"];

function ProductMark({ id }: { id: ProductId }) {
  switch (id) {
    case "database":
      return (
        <svg className="suite-mark" viewBox="0 0 32 32" aria-hidden="true">
          <ellipse cx="16" cy="8" rx="9" ry="3.6" />
          <path d="M7 8v11.5c0 2 4 3.6 9 3.6s9-1.6 9-3.6V8" />
          <path d="M7 13.2c0 2 4 3.6 9 3.6s9-1.6 9-3.6" />
        </svg>
      );
    case "cloud":
      return (
        <svg className="suite-mark" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9.5 21.5h13.2a5.2 5.2 0 0 0 .6-10.4 6.4 6.4 0 0 0-12.2 2.2 4.4 4.4 0 0 0-1.6 8.2z" />
        </svg>
      );
    case "studio":
      return (
        <svg className="suite-mark" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="5" y="7" width="22" height="16" rx="3" />
          <path d="M5 11.5h22" />
          <path d="M12.5 20.2 15 22.4l5.2-6.2" />
        </svg>
      );
    case "typeql":
      return (
        <svg className="suite-mark" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M13 9.5 8.5 16 13 22.5" />
          <path d="M19 9.5 23.5 16 19 22.5" />
        </svg>
      );
    default: {
      const exhausted: never = id;
      return exhausted;
    }
  }
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
                <span aria-hidden="true"> →</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
