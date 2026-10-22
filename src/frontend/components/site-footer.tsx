import Link from "next/link";

const navigate = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "Intel", sr: "About" },
  { href: "/support", label: "Comms", sr: "Support" },
];

export default function SiteFooter() {
  return (
    <footer className="cx-footer">
      <span className="cx-tape cx-tape--micro" aria-hidden="true" />
      <div className="cx-footer-inner mx-auto max-w-6xl px-4 pb-8 sm:grid sm:grid-cols-3 sm:gap-8">
        <div>
          <Link href="/" className="cx-brand">
            <span className="cx-glitch" data-text="XORDIUM">
              XORDIUM
            </span>
            <span className="cx-brand-badge">5.0</span>
          </Link>
          <p className="mt-3 max-w-xs font-mono text-[11px] leading-relaxed text-white/70">
            Where cybernetic intellect confronts elite esports execution. A week
            of inter-collegiate competition at Birla Institute of Technology.
          </p>
          <span className="cx-footer-live" aria-hidden="true">
            <span className="cx-status-dot" />
            UPLINK // LIVE
          </span>
        </div>

        <div className="mt-7 sm:mt-0">
          <p className="cx-footer-label">Navigate</p>
          <nav aria-label="Footer" className="mt-1 flex flex-col items-start">
            {navigate.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-label={l.sr}
                className="cx-nav-link"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-7 sm:mt-0">
          <p className="cx-footer-label">Comms</p>
          <div className="mt-2 space-y-1.5 font-mono text-[11px] text-white/75">
            <a
              href="mailto:ignite@bitmesra.ac.in"
              className="inline-flex min-h-[44px] items-center transition-colors hover:text-acid sm:min-h-[24px]"
            >
              ignite@bitmesra.ac.in
            </a>
            <p>
              Birla Institute of Technology
              <br />
              Patna, Bihar 800014
            </p>
            <a
              href="https://www.instagram.com/ignite_bitp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors hover:text-acid sm:min-h-[24px]"
            >
              [@] Instagram ↗
            </a>
          </div>
        </div>
      </div>

      <div className="cx-footer-status">
        <span className="cx-status-dot" aria-hidden="true" />
        <span>
          <strong>Xordium 5.0</strong> // Year 2026 // All systems nominal
        </span>
      </div>
      <span className="cx-scanlines" aria-hidden="true" />
    </footer>
  );
}
