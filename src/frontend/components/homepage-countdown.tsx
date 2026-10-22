"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/countdown";
import { fetchSiteSettings } from "@/lib/admin-api";
import { FALLBACK_DEADLINE } from "@/data/site-config";

// Homepage countdown driven by the admin-edited registration deadline.
// Falls back to the configured date when settings are unreachable so the
// hero clock never disappears.
export default function HomepageCountdown({
  caption,
}: {
  caption: string;
}) {
  const [target, setTarget] = useState<Date | null>(null);

  useEffect(() => {
    const fallback = new Date(FALLBACK_DEADLINE);
    fetchSiteSettings()
      .then((settings) => {
        const raw = settings.registrationDeadline;
        if (typeof raw === "string") {
          const parsed = new Date(raw);
          if (!Number.isNaN(parsed.getTime())) {
            setTarget(parsed);
            return;
          }
        }
        setTarget(fallback);
      })
      .catch(() => {
        setTarget(fallback);
      });
  }, []);

  if (!target) return null;
  return <Countdown target={target} caption={caption} />;
}
