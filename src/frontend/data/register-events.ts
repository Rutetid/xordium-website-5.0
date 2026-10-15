export type RegisterEvent = {
  slug: string;
  index: string;
  title: string;
  jp: string;
  tag: string;
  blurb: string;
  accent: string;
  /**
   * Paste the registration link for this event here (Google Form, Unstop, …).
   * Leave it empty ("") and the button renders as PENDING — it will shake
   * and raise a toast instead of navigating.
   */
  formUrl: string;
};

export const registerEvents: RegisterEvent[] = [
  {
    slug: "gen-ai",
    index: "01",
    title: "GEN AI",
    jp: "生成知能",
    tag: "Synthetic intelligence",
    blurb:
      "Prompt it, pipeline it, ship it. Build something that thinks out loud in front of a live arena.",
    accent: "#00f0ff",
    formUrl: "",
  },
  {
    slug: "technocrat",
    index: "02",
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
    slug: "cp-contest",
    index: "03",
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
    slug: "poster-making",
    index: "05",
    title: "POSTER MAKING",
    jp: "ポスター制作",
    tag: "Visual warfare",
    blurb:
      "Ink, pixels and attitude. Design the poster that stops the scroll and owns the wall.",
    accent: "#4d7cff",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdE_1xSSkY32p38eSN8LTtyJuacvd69XpYggMC-bxq2hyaX2w/viewform",
  },
  {
    slug: "treasure-hunt",
    index: "06",
    title: "TREASURE HUNT",
    jp: "宝探し",
    tag: "Urban extraction",
    blurb:
      "Decode the clues, crack the campus, take what is yours. The map lies — the riddles do not.",
    accent: "#c6ff00",
    formUrl: "",
  },
  {
    slug: "hackathon-12h",
    index: "07",
    title: "12 HOUR HACKATHON",
    jp: "ハッカソン",
    tag: "Endurance protocol",
    blurb:
      "Twelve hours, one team, one artifact that survives the night. Ship before the clock hits zero.",
    accent: "#ff2b1f",
    formUrl: "",
  },
];

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
