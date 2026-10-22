export type RegisterEvent = {
  slug: string;
  index: string;
  title: string;
  jp: string;
  tag: string;
  blurb: string;
  accent: string;
  /** Full-width flagship treatment (bigger title + ghost numeral). */
  wide?: boolean;
  /** Decorative outline numeral shown behind a wide card. */
  ghost?: string;
  /**
   * Paste the registration link for this event here (Google Form, Unstop, …).
   * Leave it empty ("") and the button renders as PENDING — it will shake
   * and raise a toast instead of navigating.
   *
   * ORDER MATTERS: the array order below is the display order, ranked by
   * priority (01 = flagship first).
   */
  formUrl: string;
};

export const registerEvents: RegisterEvent[] = [
  {
    slug: "hackathon-12h",
    index: "01",
    title: "12 HOUR HACKATHON",
    jp: "ハッカソン",
    tag: "Endurance protocol",
    blurb:
      "Twelve hours, one team, one artifact that survives the night. Ship before the clock hits zero.",
    accent: "#ff2b1f",
    wide: true,
    ghost: "12H",
    formUrl: "",
  },
  {
    slug: "cp-contest",
    index: "02",
    title: "CODE RED",
    jp: "競技プログラミング",
    tag: "Competitive programming",
    blurb:
      "Timed problem set, climbing scoreboard, zero mercy. Bring your templates and your nerve.",
    accent: "#ffb300",
    formUrl:
      "https://unstop.com/hackathons/code-red-competitive-programming-contest-xordium-50-birla-institute-of-technology-bit-mesra-patna-campus-1768869",
  },
  {
    slug: "treasure-hunt",
    index: "03",
    title: "CHASE THE GRID",
    jp: "宝探し",
    tag: "Treasure Hunt",
    blurb:
      "Decode the clues, crack the campus, take what is yours. The map lies, the riddles do not.",
    accent: "#c6ff00",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSePCUpH0kEPYmekwF0Oi7jlmlJQOJbaDiKeBwevY5HPANd8mg/viewform",
  },
  {
    slug: "ad-making",
    index: "04",
    title: "AD VERSE",
    jp: "広告制作",
    tag: "Ad making · persuasion",
    blurb:
      "Cut, score and sell the impossible. The loudest idea in the room wins the room.",
    accent: "#ff2e88",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSezkNffGZodO1R1pCaczxqVecfgBAwXOCiyH4s1YhUs4SFk5A/viewform?usp=send_form",
  },
  {
    slug: "technocrat",
    index: "05",
    title: "CYBER PSYCHOSIS",
    jp: "技術者",
    tag: "Technocrat of the year",
    blurb:
      "One crown for the sharpest builder on campus. Portfolio on the table, no hiding behind a team.",
    accent: "#8b5cff",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfiB9ZQr_QVMMdgKHpLoLbGF2nofv5Z27SRPM5rGD0A9gd20w/viewform?usp=header",
  },
  {
    slug: "pixel-pulse",
    index: "06",
    title: "PIXEL PULSE",
    jp: "ピクセルパルス",
    tag: "Gen AI poster making",
    blurb:
      "Prompt the machine, then design the poster that owns the wall. Gen AI sparks, you finish the frame.",
    accent: "#00f0ff",
    wide: true,
    ghost: "AI",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdE_1xSSkY32p38eSN8LTtyJuacvd69XpYggMC-bxq2hyaX2w/viewform",
  },
];

/**
 * Accents for events that appear in the directory but not on /register
 * (e.g. walk-in workshops with no registration form).
 */
const EXTRA_EVENT_ACCENTS: Record<string, string> = {
  "the-foundry": "#ff6a00",
};

/** Per-event accent colour (falls back to acid). */
export function accentFor(slug: string): string {
  return (
    registerEvents.find((e) => e.slug === slug)?.accent ??
    EXTRA_EVENT_ACCENTS[slug] ??
    "#c6ff00"
  );
}

export function openChannelCount(): number {
  return registerEvents.filter((event) => event.formUrl.length > 0).length;
}

export function registrationSourceLabel(formUrl: string): string {
  if (!formUrl) return "Link pending";
  try {
    const host = new URL(formUrl).hostname.replace(/^www\./, "");
    if (host.includes("unstop")) return "Unstop ↗";
    if (host.includes("docs.google") || host.includes("forms.gle")) {
      return "Google form ↗";
    }
    return `${host} ↗`;
  } catch {
    return "Open ↗";
  }
}
