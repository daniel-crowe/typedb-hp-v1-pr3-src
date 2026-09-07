"use client";

import Link from "next/link";
import { useState } from "react";
import { copy } from "@/lib/copy";
import { Logo } from "./Logo";

function isInternal(href: string): boolean {
  return href.startsWith("/");
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href="/" aria-label="TypeDB homepage">
          <Logo />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav className={`site-nav${open ? " open" : ""}`} aria-label="Live TypeDB destinations">
          {copy.header.links.map((link) =>
            isInternal(link.href) ? (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} rel="noreferrer">
                {link.label}
              </a>
            ),
          )}
          <a className="btn btn-primary" href={copy.header.primary.href} rel="noreferrer">
            {copy.header.primary.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
