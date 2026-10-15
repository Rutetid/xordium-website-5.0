"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/countdown";
import { fetchSiteSettings } from "@/lib/admin-api";

// Homepage countdown driven by the admin-edited registration deadline.
export default function HomepageCountdown({
  caption,
}: {
  caption: string;
}) {
  const [target, setTarget] = useState<Date | null>(null);

  useEffect(() => {
    fetchSiteSettings()
      .then((settings) => {
        const raw = settings.registrationDeadline;
        if (typeof raw === "string") {
          const parsed = new Date(raw);
          if (!Number.isNaN(parsed.getTime())) setTarget(parsed);
        }
      })
      .catch(() => {
        // Countdown stays hidden when settings are unreachable.
      });
  }, []);

  if (!target) return null;
  return <Countdown target={target} caption={caption} />;
}
