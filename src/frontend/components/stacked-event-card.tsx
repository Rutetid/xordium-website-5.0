import Image from "next/image";
import Link from "next/link";
import type { FestEvent } from "@/lib/events";
import { getRegistrationHref } from "@/data/events";
import { accentFor } from "@/data/register-events";

// Directory signal-feed row — same .cx-event kit language as the homepage
// feed, with a prize footnote and per-event accent from the register page.
export default function StackedEventCard({
  event: e,
  index,
  total,
}: {
  event: FestEvent;
  index: number;
  total: number;
}) {
  const flip = index % 2 === 1;

  return (
    <article
      className={`cx-event cx-corners${flip ? " cx-event--flip" : ""}`}
      style={{ ["--accent" as string]: accentFor(e.slug) }}
    >
      <div className="cx-event-media">
        <Image
          src={e.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="pointer-events-none"
        />
        <span className="cx-event-idx" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="cx-event-body">
        <div className="cx-event-tags">
          <span className="cx-tag">{e.tag}</span>
          <span className="cx-tag cx-tag--ghost">{e.category}</span>
        </div>
        <h3 className="cx-event-title">{e.title}</h3>
        {e.description ? <p className="cx-event-desc">{e.description}</p> : null}
        <dl className="cx-event-meta">
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
        <p className="cx-event-prize">Prize pool // {e.prizePool}</p>
        {e.prizeNote ? <p className="cx-event-note">{e.prizeNote}</p> : null}
        <div className="cx-event-cta">
          <Link
            href={getRegistrationHref(e.slug)}
            className="cx-btn cx-btn--acid"
          >
            {e.cta || "Register"} →
          </Link>
          <span className="sr-only">
            {`Event ${index + 1} of ${total}`}
          </span>
        </div>
      </div>
    </article>
  );
}
