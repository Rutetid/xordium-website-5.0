import Image from "next/image";
import Link from "next/link";
import type { FestEvent } from "@/lib/events";
import { getRegistrationHref } from "@/data/events";
import { accentFor } from "@/data/register-events";

// Homepage-only signal-feed row. (stacked-event-card.tsx stays untouched
// for the /events page until that component gets its own review pass.)
export default function HomepageEventRow({
  event,
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
      style={{ ["--accent" as string]: accentFor(event.slug) }}
    >
      <div className="cx-event-media">
        <Image
          src={event.image}
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
          <span className="cx-tag">{event.tag}</span>
          <span className="cx-tag cx-tag--ghost">{event.category}</span>
        </div>
        <h3 className="cx-event-title">{event.title}</h3>
        <p className="cx-event-desc">{event.description}</p>
        <dl className="cx-event-meta">
          <div>
            <dt>Venue</dt>
            <dd>{event.venue}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{event.format}</dd>
          </div>
          <div>
            <dt>Window</dt>
            <dd>{event.schedule}</dd>
          </div>
          {event.teamSize ? (
            <div>
              <dt>Team</dt>
              <dd>{event.teamSize}</dd>
            </div>
          ) : null}
        </dl>
        <p className="cx-event-prize">
          Prize pool // {event.prizePool}
        </p>
        <div className="cx-event-cta">
          <Link
            href={getRegistrationHref(event.slug)}
            className="cx-btn cx-btn--acid"
          >
            Uplink to register →
          </Link>
          <span className="sr-only">
            {`Event ${index + 1} of ${total}`}
          </span>
        </div>
      </div>
    </article>
  );
}
