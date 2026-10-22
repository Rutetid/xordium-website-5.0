"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import HomepageEventRow from "@/components/homepage-event-row";
import { events, type EventCategory, type FestEvent } from "@/lib/events";
import { FALLBACK_EVENTS } from "@/data/site-config";

type DbEventFlag = {
  slug: string;
  tag: string;
  title: string;
  category: string;
  description: string;
  image: string;
  prizePool: string;
  venue: string;
  format: string;
  schedule: string;
  teamSize?: string | null;
  cta: string;
  featured: boolean;
  posterUrl?: string | null;
};

// Homepage featured section. Admin-featured events from the DB win;
// if the API is unreachable or nothing is featured, the curated
// fallback catalogue keeps the signal feed full.
export default function FeaturedSection() {
  const [featured, setFeatured] = useState<FestEvent[] | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DbEventFlag[] | null) => {
        if (!Array.isArray(data)) {
          setFeatured(FALLBACK_EVENTS);
          return;
        }
        const bySlug = new Map(data.map((d) => [d.slug, d]));
        const catalogue = new Map(events.map((e) => [e.slug, e]));
        const merged: FestEvent[] = [];
        for (const db of data) {
          if (!db.featured) continue;
          const base = catalogue.get(db.slug);
          merged.push(
            base
              ? {
                  ...base,
                  featured: true,
                  image: db.posterUrl || base.image,
                }
              : {
                  slug: db.slug,
                  tag: db.tag,
                  title: db.title,
                  category: db.category as EventCategory,
                  description: db.description,
                  image: db.posterUrl || db.image,
                  prizePool: db.prizePool,
                  venue: db.venue,
                  format: db.format,
                  schedule: db.schedule,
                  teamSize: db.teamSize ?? undefined,
                  cta: db.cta,
                  featured: true,
                },
          );
        }
        setFeatured(merged.length > 0 ? merged : FALLBACK_EVENTS);
      })
      .catch(() => {
        setFeatured(FALLBACK_EVENTS);
      });
  }, []);

  const visible = featured ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading
        kicker="Signal feed // 01"
        title="Featured arenas"
        blurb="Strict tournament guidelines, certified adjudicators, enterprise compute nodes, and direct cash disbursements. Pick your theater — the uplink is open."
      />
      <div className="flex flex-col gap-5">
        {featured === null
          ? [1, 2].map((i) => (
              <div
                key={i}
                className="cx-event h-64 animate-pulse"
                aria-hidden="true"
              />
            ))
          : visible.map((e, i) => (
              <HomepageEventRow
                key={e.slug}
                event={e}
                index={i}
                total={visible.length}
              />
            ))}
      </div>
    </section>
  );
}
