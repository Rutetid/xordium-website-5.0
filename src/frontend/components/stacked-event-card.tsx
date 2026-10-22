import Image from "next/image";
import Link from "next/link";
import type { FestEvent } from "@/lib/events";
import { getRegistrationHref } from "@/data/events";
import { accentFor } from "@/data/register-events";

// Directory dossier panel — richer than the homepage .cx-event feed rows:
// HUD status bar, poster + briefing split, highlights list, full meta ledger,
// and entry-aware CTAs (register link vs walk-in contact line).

function statusLabel(e: FestEvent): string {
  switch (e.entry) {
    case "contact":
      return "Contact entry";
    case "walk-in":
      return "Walk-in";
    default:
      return "Registration open";
  }
}

export default function StackedEventCard({
  event: e,
  index,
  total,
}: {
  event: FestEvent;
  index: number;
  total: number;
}) {
  const accent = accentFor(e.slug);

  return (
    <article
      className="cx-dos cx-corners"
      style={{ ["--accent" as string]: accent }}
    >
      {/* HUD bar */}
      <header className="cx-dos-bar">
        <span className="cx-dos-idx" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="cx-tag">{e.category}</span>
        <span className="cx-tag cx-tag--ghost">{e.tag}</span>
        <span className="cx-dos-status">{statusLabel(e)}</span>
      </header>

      <div className="cx-dos-grid">
        {/* Poster */}
        <div className="cx-dos-media">
          <Image
            src={e.image}
            alt={`${e.title} poster`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="pointer-events-none"
          />
          <span className="cx-dos-ghost" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Briefing */}
        <div className="cx-dos-main">
          <h3 className="cx-dos-title">{e.title}</h3>
          <p className="cx-dos-blurb">{e.description}</p>
          {e.longDescription ? (
            <p className="cx-dos-long">{e.longDescription}</p>
          ) : null}

          {e.highlights && e.highlights.length > 0 ? (
            <div className="cx-dos-hl">
              <p className="cx-dos-hl-head">// Key signals</p>
              <ul>
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <dl className="cx-dos-meta">
            {e.venue ? (
              <div>
                <dt>Venue</dt>
                <dd>{e.venue}</dd>
              </div>
            ) : null}
            {e.format ? (
              <div>
                <dt>Format</dt>
                <dd>{e.format}</dd>
              </div>
            ) : null}
            {e.schedule ? (
              <div>
                <dt>Window</dt>
                <dd>{e.schedule}</dd>
              </div>
            ) : null}
            {e.teamSize ? (
              <div>
                <dt>Team</dt>
                <dd>{e.teamSize}</dd>
              </div>
            ) : null}
          </dl>

          <p className="cx-dos-prize">Prize pool // {e.prizePool}</p>
          {e.prizeNote ? <p className="cx-event-note">{e.prizeNote}</p> : null}
        </div>
      </div>

      {/* Footer actions */}
      <footer className="cx-dos-foot">
        {e.entry === "contact" || e.entry === "walk-in" ? (
          <div className="cx-dos-entry">
            <span className="cx-dos-entry-tag">No registration required</span>
            {e.contact ? (
              <span className="cx-dos-entry-contact">{e.contact}</span>
            ) : (
              <span className="cx-dos-entry-contact">Walk in on-site</span>
            )}
          </div>
        ) : (
          <Link
            href={getRegistrationHref(e.slug)}
            className="cx-btn cx-btn--acid"
          >
            {e.cta || "Register"} →
          </Link>
        )}
        <Link href={`/events/${e.slug}`} className="cx-btn cx-btn--ghost">
          Full briefing →
        </Link>
        <span className="sr-only">{`Event ${index + 1} of ${total}`}</span>
      </footer>
    </article>
  );
}
