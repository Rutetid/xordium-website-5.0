"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "Intel", sr: "About" },
  { href: "/support", label: "Comms", sr: "Support" },
  { href: "/admin", label: "Admin", sr: "Admin", desktopOnly: true },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // close the drawer whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes the drawer
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="cx-header fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 lg:px-4 lg:pt-4">
      <div className="cx-nav mx-auto max-w-6xl">
        <span className="cx-tape cx-tape--micro" aria-hidden="true" />
        <div className="cx-nav-inner">
          <div className="cx-nav-brand">
            <Link href="/" className="cx-brand">
              <span className="cx-glitch" data-text="XORDIUM">
                XORDIUM
              </span>
              <span className="cx-brand-badge">5.0</span>
            </Link>
            <span className="cx-status" aria-hidden="true">
              <span className="cx-status-dot" />
              LIVE
            </span>
          </div>

          <nav aria-label="Primary" className="cx-nav-links">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                aria-label={l.sr}
                className={`cx-nav-link${l.desktopOnly ? " cx-nav-link--desk" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="cx-nav-actions">
            <Link href="/register" className="cx-btn cx-btn--acid">
              Register <span aria-hidden="true">↗</span>
            </Link>

            <button
              type="button"
              className="cx-burger"
              aria-expanded={menuOpen}
              aria-controls="cx-drawer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {menuOpen ? (
        <>
          <div
            className="cx-drawer-backdrop"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="cx-drawer"
            aria-label="Menu"
            className="cx-drawer mx-auto max-w-6xl"
          >
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`cx-drawer-link${l.desktopOnly ? " cx-nav-link--desk" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="cx-drawer-idx" aria-hidden="true">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span>{l.label}</span>
                {l.sr ? <span className="cx-drawer-sub">{l.sr}</span> : null}
              </Link>
            ))}
          </nav>
        </>
      ) : null}
    </header>
  );
}
