"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import StackedEventCard from "@/components/stacked-event-card";
import { events, type FestEvent } from "@/lib/events";

type DbEventFlag = {
  slug: string;
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
        setFeatured(
          events
            .map((e) => {
              const db = bySlug.get(e.slug);
              if (!db) return { ...e, featured: false };
              return {
                ...e,
                featured: Boolean(db.featured),
                image: db.posterUrl || e.image,
              };
            })
            .filter((e) => e.featured),
        );
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
