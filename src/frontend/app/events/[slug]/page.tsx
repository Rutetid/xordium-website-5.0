import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegistrationHref } from "@/data/events";
import { prisma } from "@/backend/lib/prisma";
import { toFestEvent, type FestEvent } from "@/lib/events";
import { FALLBACK_EVENTS } from "@/data/site-config";
import { accentFor } from "@/data/register-events";
import MarkdownText from "@/components/markdown-text";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const row = await prisma.event
    .findUnique({ where: { slug } })
    .catch(() => null);

  let event: FestEvent | null = null;
  if (row) {
    event = toFestEvent({
      slug: row.slug,
      tag: row.tag,
      title: row.title,
      category: row.category,
      description: row.description,
      image: row.image,
      prizePool: row.prizePool,
      venue: row.venue,
      format: row.format,
      schedule: row.schedule,
      teamSize: row.teamSize,
      cta: row.cta,
      featured: row.featured,
      posterUrl: row.posterUrl,
    });
  } else {
    // Curated fallback keeps directory links alive when the DB is down.
    event = FALLBACK_EVENTS.find((e) => e.slug === slug) ?? null;
  }
  if (!event) notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/events" className="cx-dir-back">
        ← Back to directory
      </Link>
      <div
        className="cx-flag cx-corners cx-flag--detail mt-2"
        style={{ ["--accent" as string]: accentFor(event.slug) }}
      >
        <div className="cx-flag-bar">
          <p className="cx-flag-label">
            {event.category}
            {event.schedule ? ` // ${event.schedule}` : ""}
          </p>
          <p className="cx-flag-time">Protocol file</p>
        </div>
        <div className="cx-flag-body">
          <div className="cx-flag-poster">
            <Image
              src={event.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 17rem"
              priority
            />
            {event.venue ? (
              <span className="cx-flag-venue">{event.venue}</span>
            ) : null}
          </div>
          <div className="cx-flag-main">
            <div className="cx-event-tags">
              <span className="cx-tag">{event.tag}</span>
              <span className="cx-tag cx-tag--ghost">{event.format}</span>
            </div>
            <h1 className="cx-flag-title">{event.title}</h1>
            {event.description ? (
              <MarkdownText className="cx-flag-desc">
                {event.description}
              </MarkdownText>
            ) : null}
            <dl className="cx-event-meta">
              {(
                [
                  ["Prize pool", event.prizePool],
                  ["Venue", event.venue],
                  ["Format", event.format],
                  ["Window", event.schedule],
                  ...(event.teamSize !== undefined
                    ? [["Team", event.teamSize] as [string, string]]
                    : []),
                ] as [string, string][]
              )
                .filter(([, v]) => Boolean(v))
                .map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
            </dl>
            <div className="cx-flag-actions">
              <Link
                href={getRegistrationHref(event.slug)}
                className="cx-btn cx-btn--acid"
              >
                {event.cta || "Register"} →
              </Link>
              <Link href="/events" className="cx-btn cx-btn--ghost">
                All events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
