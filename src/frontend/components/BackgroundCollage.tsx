"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { collageImages } from "@/data/collage-images";

type CollageTile = {
  key: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  delay: number;
  loaded: boolean;
  zIndex: number;
};

type TileStyle = CSSProperties & {
  "--tile-left": string;
  "--tile-top": string;
  "--tile-width": string;
  "--tile-height": string;
  "--tile-rotation": string;
  "--tile-delay": string;
  "--tile-z-index": string;
};

function shuffle<T>(items: readonly T[]) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function makeSelection() {
  const count = Math.min(
    collageImages.length,
    12 + Math.floor(Math.random() * 9),
  );

  return shuffle(collageImages).slice(0, count);
}

function makeTiles(images: string[], width: number, height: number) {
  const safeWidth = Math.max(Math.round(width) || 0, 320);
  const safeHeight = Math.max(Math.round(height) || 0, 480);
  const safeImages = images.length > 0 ? images : [];
  if (safeImages.length === 0) return [];

  // Enough tiles to cover the whole page; repeats are fine (sources cycles).
  // Kept modest (<=64) so decoded WebP memory stays reasonable.
  const tileCount = Math.max(
    28,
    Math.min(64, Math.floor((safeWidth * safeHeight) / 70000)),
  );

  const sources: string[] = [];
  while (sources.length < tileCount) {
    sources.push(...shuffle(safeImages));
  }
  sources.length = tileCount;

  // Stratified grid so every row of the page gets tiles (fixes top-strip
  // clustering where `index % cols` kept all tiles in row 0 on tall pages).
  const cols = Math.max(
    1,
    Math.ceil(Math.sqrt((tileCount * safeWidth) / safeHeight)),
  );
  const rows = Math.max(1, Math.ceil(tileCount / cols));

  let delay = 0;
  return sources.slice(0, tileCount).map((src, index) => {
    if (index > 0) delay = Math.min(delay + 25 + Math.random() * 40, 1500);

    let tileWidth: number;
    let tileHeight: number;
    const roll = Math.random();
    if (roll < 0.15) {
      tileWidth = 300 + Math.random() * 150;
      tileHeight = tileWidth * (1.1 + Math.random() * 0.5);
    } else if (roll < 0.45) {
      tileWidth = 180 + Math.random() * 120;
      tileHeight = tileWidth * (0.9 + Math.random() * 0.7);
    } else {
      tileWidth = 100 + Math.random() * 100;
      tileHeight = tileWidth * (0.7 + Math.random() * 0.8);
    }
    tileWidth = Math.min(tileWidth, safeWidth - 20);
    tileHeight = Math.min(tileHeight, safeHeight - 20);

    // One tile per grid cell with jitter, clamped inside the shell.
    const col = index % cols;
    const row = Math.floor(index / cols);
    const cellWidth = safeWidth / cols;
    const cellHeight = safeHeight / rows;
    const baseLeft = col * cellWidth + cellWidth / 2 - tileWidth / 2;
    const baseTop = row * cellHeight + cellHeight / 2 - tileHeight / 2;
    const jitterX = (Math.random() - 0.5) * cellWidth * 0.6;
    const jitterY = (Math.random() - 0.5) * cellHeight * 0.6;
    const left = Math.max(
      10,
      Math.min(safeWidth - tileWidth - 10, baseLeft + jitterX),
    );
    const top = Math.max(
      10,
      Math.min(safeHeight - tileHeight - 10, baseTop + jitterY),
    );

    const rotation = (Math.random() - 0.5) * 14; // -7 to +7 degrees
    const zIndex = 10 + Math.floor(Math.random() * 100);

    if (index > 0) delay = Math.min(delay + 20 + Math.random() * 35, 1800);

    return {
      key: `${Math.random().toString(36).slice(2)}-${index}-${src}`,
      src,
      left: Math.round(left),
      top: Math.round(top),
      width: Math.round(tileWidth),
      height: Math.round(tileHeight),
      rotation: Math.round(rotation * 10) / 10,
      delay: Math.round(delay),
      loaded: false,
      zIndex,
    };
  });
}

export default function BackgroundCollage({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const shellRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<string[]>([]);
  const hasRenderedRouteRef = useRef(false);
  const [tiles, setTiles] = useState<CollageTile[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const lastSizeRef = { width: 0, height: 0 };

    const updateLayout = () => {
      if (imagesRef.current.length === 0) return;
      const bounds = shell.getBoundingClientRect();
      const width = Math.round(bounds.width || window.innerWidth);
      const height = Math.round(Math.max(bounds.height, window.innerHeight));
      // Ignore small size wobbles (fonts/images loading) so the collage
      // doesn't reshuffle repeatedly while the page settles.
      if (
        Math.abs(width - lastSizeRef.width) < 80 &&
        Math.abs(height - lastSizeRef.height) < 120
      ) {
        return;
      }
      lastSizeRef.width = width;
      lastSizeRef.height = height;
      setTiles(makeTiles(imagesRef.current, width, height));
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(shell);
    updateLayout();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const waitBeforeReplacing = hasRenderedRouteRef.current ? 750 : 0;
    hasRenderedRouteRef.current = true;

    const timeout = window.setTimeout(() => {
      imagesRef.current = makeSelection();
      const shell = shellRef.current;
      const bounds = shell?.getBoundingClientRect();
      const width = Math.round(bounds?.width || window.innerWidth);
      const height = Math.round(
        Math.max(bounds?.height ?? 0, window.innerHeight),
      );

      setTiles(makeTiles(imagesRef.current, width, height));
      window.requestAnimationFrame(() => setIsVisible(true));
    }, waitBeforeReplacing);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  async function revealLoadedImage(
    event: SyntheticEvent<HTMLImageElement>,
    tileKey: string,
  ) {
    const image = event.currentTarget;

    try {
      await image.decode();
    } catch {
      if (!image.complete || image.naturalWidth === 0) return;
    }

    if (image.naturalWidth === 0 || image.naturalHeight === 0) return;
    setTiles((current) =>
      current.map((tile) =>
        tile.key === tileKey ? { ...tile, loaded: true } : tile,
      ),
    );
  }

  return (
    <div ref={shellRef} className="collage-shell">
      <div
        className={`background-collage${isVisible ? " is-visible" : ""}`}
        aria-hidden="true"
      >
        {tiles.map((tile) => (
          <div
            className={`collage-tile${tile.loaded ? " is-loaded" : ""}`}
            key={tile.key}
            style={
              {
                "--tile-left": `${tile.left}px`,
                "--tile-top": `${tile.top}px`,
                "--tile-width": `${tile.width}px`,
                "--tile-height": `${tile.height}px`,
                "--tile-rotation": `${tile.rotation}deg`,
                "--tile-delay": `${tile.delay}ms`,
                "--tile-z-index": `${tile.zIndex}`,
              } as TileStyle
            }
          >
            <img
              src={tile.src}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              onLoad={(event) => void revealLoadedImage(event, tile.key)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
      <div className="collage-content">{children}</div>
    </div>
  );
}
