import { copy } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <nav aria-label="More live TypeDB links">
          {copy.footer.links.map((link) => (
            <a key={link.href} href={link.href} rel="noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
        <p>TypeDB homepage v1 · localhost only · links go to the live site</p>
      </div>
    </footer>
  );
}
