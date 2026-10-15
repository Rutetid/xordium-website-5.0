"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "01<>/\\[]{}=+*^?#▓▒░█▞▚▟";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** ms to wait before the decode starts (used for staggered reveals) */
  delay?: number;
  /** total decode duration in ms */
  duration?: number;
};

export default function ScrambleText({
  text,
  className,
  delay = 0,
  duration,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [runKey, setRunKey] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(text);
      return;
    }

    const total = duration ?? Math.min(950, 280 + text.length * 48);
    const wait = runKey === 0 ? delay : 0;
    const start = performance.now() + wait;

    const noise = () => {
      let out = "";
      for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        out +=
          char === " " ? char : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      return out;
    };

    setDisplay(noise());

    const tick = (now: number) => {
      if (now < start) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (now - start) / total);
      const revealed = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        if (i < revealed || char === " ") {
          out += char;
        } else {
          out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
      }
      setDisplay(out);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration, runKey]);

  return (
    <span
      className={className}
      onMouseEnter={() => setRunKey((key) => key + 1)}
      style={{ display: "inline-block" }}
    >
      {display}
    </span>
  );
}
