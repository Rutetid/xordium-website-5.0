"use client";

import { useEffect, useState } from "react";

function getParts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    live: diff <= 0,
  };
}

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  live: boolean;
};

const cells: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

export default function Countdown({
  target,
  caption,
}: {
  target: Date;
  caption?: string;
}) {
  // Render identical placeholders on server and first client paint, then
  // start the live clock. Reading Date.now() during SSR would mismatch the
  // server HTML and force React to regenerate the whole tree on hydration.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(getParts(target));
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const shown: Parts = parts ?? {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    live: false,
  };

  return (
    <div>
      <div className="cx-led" role="timer" aria-label={caption ?? "Countdown"}>
        {cells.map((c) => (
          <div key={c.key} className="cx-led-cell">
            <span className="cx-led-num">
              {String(shown[c.key]).padStart(2, "0")}
            </span>
            <span className="cx-led-label">{c.label}</span>
          </div>
        ))}
      </div>
      <p className="cx-led-caption">
        {shown.live
          ? "Gateway closed // registration sealed"
          : (caption ?? "T-minus to arena lockdown")}
      </p>
    </div>
  );
}
