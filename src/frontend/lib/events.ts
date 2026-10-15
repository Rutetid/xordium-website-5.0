export type EventCategory =
  | "Technical"
  | "eSports"
  | "Esports"
  | "Robotics"
  | "Cybersecurity"
  | "Algorithms"
  | "AI / ML"
  | "Open"
  | "Fun";

export interface FestEvent {
  slug: string;
  tag: string;
  title: string;
  category: EventCategory;
  description: string;
  image: string;
  prizePool: string;
  prizeNote?: string;
  venue: string;
  format: string;
  schedule: string;
  teamSize?: string;
  cta: string;
  featured?: boolean;
}
// Registration deadline and prize pool now live in site settings (admin).

export const events: FestEvent[] = [];

export function getEvent(slug: string): FestEvent | undefined {
  return events.find((e) => e.slug === slug);
}

// Shape of rows returned by GET /api/events.
export interface DbEventRow {
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
}

// Convert a database row into the catalogue shape used by event cards.
export function toFestEvent(row: DbEventRow): FestEvent {
  return {
    slug: row.slug,
    tag: row.tag,
    title: row.title,
    category: row.category as EventCategory,
    description: row.description,
    image: row.posterUrl || row.image,
    prizePool: row.prizePool,
    venue: row.venue,
    format: row.format,
    schedule: row.schedule,
    teamSize: row.teamSize ?? undefined,
    cta: row.cta,
  };
}

export function getCategories(): EventCategory[] {
  return [...new Set(events.map((e) => e.category))];
}
