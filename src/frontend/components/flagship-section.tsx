"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRegistrationHref } from "@/data/events";
import { toFestEvent, type DbEventRow, type FestEvent } from "@/lib/events";
import { FALLBACK_EVENTS } from "@/data/site-config";
import { accentFor } from "@/data/register-events";
import MarkdownText from "@/components/markdown-text";

// Flagship spotlight: first featured event from the database (first
// curated fallback when the API is unreachable). Renders a skeleton
// while loading.
export default function FlagshipSection() {
  const [flagship, setFlagship] = useState<FestEvent | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DbEventRow[] | null) => {
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map(toFestEvent);
          const featured = list.filter((e) =>
            (data.find((d) => d.slug === e.slug)?.featured ?? false),
          );
          setFlagship(featured[0] ?? list[0] ?? null);
        } else {
          setFlagship(FALLBACK_EVENTS[0] ?? null);
        }
        setDone(true);
      })
      .catch(() => {
        setFlagship(FALLBACK_EVENTS[0] ?? null);
        setDone(true);
      });
  }, []);

  if (!done) {
    return <div className="cx-flag h-64 animate-pulse" aria-hidden="true" />;
  }

  if (!flagship) return null;

  return (
    <div
      className="cx-flag cx-corners cx-flag--flip"
      style={{ ["--accent" as string]: accentFor(flagship.slug) }}
    >
      <div className="cx-flag-bar">
        <p className="cx-flag-label">Flagship // {flagship.category}</p>
        <p className="cx-flag-time">{flagship.schedule}</p>
      </div>
      <div className="cx-flag-body">
        {/* Poster */}
        <div className="cx-flag-poster">
          <Image
            src={flagship.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 13rem"
            priority
          />
          {flagship.venue ? (
            <span className="cx-flag-venue">{flagship.venue}</span>
          ) : null}
        </div>

        {/* Details */}
        <div className="cx-flag-main">
          <div className="cx-event-tags">
            <span className="cx-tag">{flagship.tag}</span>
            <span className="cx-tag cx-tag--ghost">{flagship.format}</span>
          </div>
          <h2 className="cx-flag-title">{flagship.title}</h2>
          {flagship.description ? (
            <MarkdownText className="cx-flag-desc line-clamp-3">
              {flagship.description}
            </MarkdownText>
          ) : null}
          <p className="cx-event-prize">
            Prize pool // {flagship.prizePool}
          </p>
          <div className="cx-flag-actions">
            <Link
              href={getRegistrationHref(flagship.slug)}
              className="cx-btn cx-btn--acid"
            >
              {flagship.cta || "Register"} →
            </Link>
            <a href="#directory" className="cx-btn cx-btn--ghost">
              All events ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
