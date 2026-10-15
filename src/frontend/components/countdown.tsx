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
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
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
      <div className="glass-panel grid grid-cols-4 gap-px overflow-hidden">
        {cells.map((c) => (
          <div key={c.key} className="bg-black/40 px-2 py-4 text-center sm:py-5">
            <div className="font-display text-3xl font-black tabular-nums text-white sm:text-4xl">
              {String(shown[c.key]).padStart(2, "0")}
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.25em] text-white uppercase">
              {c.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[10px] tracking-[0.2em] text-white uppercase">
        {shown.live
          ? "Registration gateway: closed"
          : (caption ?? "System launch synchronization clock")}
      </p>
    </div>
  );
}
