import { NextResponse } from "next/server";
import { writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import { requireAdmin } from "@/backend/lib/api";
import sharp from "sharp";

// Allow up to 11 MB multipart body (10 MB image + overhead).
// (App Router route handlers stream the body; no bodyParser toggle needed.)
export const maxDuration = 30; // seconds

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// The `public/` folder Next.js actually serves (`process.cwd()` is the repo
// root when started via `next dev src/frontend`; the fallback covers being
// started from inside `src/frontend`).
async function resolvePublicDir(folder: string): Promise<string> {
  const primary = join(process.cwd(), "src", "frontend", "public", folder);
  try {
    await access(primary);
    return primary;
  } catch {
    try {
      const fallback = join(process.cwd(), "public", folder);
      await access(fallback);
      return fallback;
    } catch {
      return primary;
    }
  }
}

// POST /api/moderator/events/:slug/poster
// Accepts multipart/form-data with a "file" field.
// The file must already be converted to WebP on the client before upload
// (enforced by accepting only image/* and returning a deterministic path).
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const denied = await requireAdmin(request, true, "content:write");
  if (denied) return denied;

  try {
    const { slug } = await params;

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload JPEG, PNG, or WebP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum 10 MB." },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Re-encode server-side as a safety net: cap dimensions and compress so
    // posters stay fast even if the client sent a large file.
    const optimized = await sharp(buffer, { animated: true })
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toBuffer();

    // Save as <slug>.webp inside the public/ dir Next.js actually serves.
    const filename = `${slug}.webp`;
    const assetsDir = await resolvePublicDir("assets");

    await mkdir(assetsDir, { recursive: true });
    await writeFile(join(assetsDir, filename), optimized);

    const publicPath = `/assets/${filename}`;
    return NextResponse.json({ path: publicPath });
  } catch (error) {
    console.error("Poster upload error:", error);
    return NextResponse.json(
      { error: "Failed to save poster." },
      { status: 500 }
    );
  }
}
