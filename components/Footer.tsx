import Link from "next/link";
import { copy } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          {copy.footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="footer-col-title">{column.title}</p>
              {column.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.href + link.label} href={link.href}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href + link.label} href={link.href} rel="noreferrer">
                    {link.label}
                  </a>
                ),
              )}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
