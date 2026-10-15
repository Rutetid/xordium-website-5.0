import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const CAROUSEL_DIR_CANDIDATES = [
  // Repo root is the working directory (`next dev src/frontend`):
  // this is the `public/` folder Next.js actually serves.
  join(process.cwd(), "src", "frontend", "public", "carousel"),
  // Fallback when Next.js is started from inside `src/frontend`.
  join(process.cwd(), "public", "carousel"),
];
const IMAGE_EXTENSIONS = new Set([
  ".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp",
]);

export async function GET() {
  try {
    let files: string[] = [];
    for (const dir of CAROUSEL_DIR_CANDIDATES) {
      files = await readdir(dir).catch(() => [] as string[]);
      if (files.length > 0) break;
    }

    const images = files
      .filter((file) => {
        const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
        return IMAGE_EXTENSIONS.has(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => ({
        id: file,
        altText: `Carousel image - ${file}`,
      }));

    // Shuffle so the order is different on every page load.
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    return NextResponse.json(images);
  } catch (error) {
    console.error("Failed to fetch carousel images:", error);
    return NextResponse.json(
      { error: "Failed to load carousel images" },
      { status: 500 }
    );
  }
}