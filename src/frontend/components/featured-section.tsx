"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import StackedEventCard from "@/components/stacked-event-card";
import { events, type EventCategory, type FestEvent } from "@/lib/events";

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

// Homepage featured section. Shows ONLY the events checked as featured
// in the admin panel — nothing is hardcoded. Skeleton rows hold the layout
// while loading; if the API is unreachable the section stays empty.
export default function FeaturedSection() {
  const [featured, setFeatured] = useState<FestEvent[] | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DbEventFlag[] | null) => {
        if (!Array.isArray(data)) {
          setFeatured([]);
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
        setFeatured(merged);
      })
      .catch(() => {
        setFeatured([]);
      });
  }, []);

  const visible = featured ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading
        kicker="Transmission specifications // 01"
        title="Featured competitions"
        blurb="Engineered for extreme performance. Each track carries strict tournament guidelines, certified adjudicators, enterprise compute nodes, and direct cash disbursements."
      />
      <div className="flex flex-col gap-5">
        {featured === null
          ? [1, 2].map((i) => (
              <div
                key={i}
                className="glass-panel h-64 animate-pulse"
                aria-hidden="true"
              />
            ))
          : visible.map((e, i) => (
              <StackedEventCard key={e.slug} event={e} index={i} total={visible.length} />
            ))}
      </div>
    </section>
  );
}
