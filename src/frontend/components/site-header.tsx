"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "Intel", sr: "About" },
  { href: "/support", label: "Comms", sr: "Support" },
  { href: "/admin", label: "Admin", desktopOnly: true },
];

export default function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="cx-header fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 lg:px-4 lg:pt-4">
      <div className="cx-nav mx-auto max-w-6xl">
        <span className="cx-tape cx-tape--micro" aria-hidden="true" />
        <div className="cx-nav-inner flex flex-wrap items-center justify-between gap-x-2 gap-y-1 px-2.5 py-1.5 lg:flex-nowrap lg:gap-x-3 lg:px-4 lg:py-2">
          <div className="order-1 flex shrink-0 items-center gap-2 sm:gap-3">
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

          <Link
            href="/register"
            className="cx-btn cx-btn--acid order-2 shrink-0 lg:order-3"
          >
            Register <span aria-hidden="true">↗</span>
          </Link>

          <nav
            aria-label="Primary"
            className="no-scrollbar order-3 flex w-full min-w-0 items-center justify-start gap-0.5 overflow-x-auto sm:justify-center lg:order-2 lg:w-auto lg:flex-1 lg:gap-0.5 lg:overflow-x-visible"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                aria-label={l.sr}
                className={`cx-nav-link shrink-0${l.desktopOnly ? " cx-nav-link--desk" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <span className="cx-scanlines" aria-hidden="true" />
      </div>
    </header>
  );
}
