import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
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

// POST /api/moderator/events/:slug/poster
// Accepts multipart/form-data with a "file" field.
// The poster is re-encoded and stored in the database (never the
// filesystem) so uploads also work on read-only serverless hosting.
// Returns the public path serving the stored bytes.
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
    let optimized: Buffer;
    try {
      optimized = await sharp(buffer, { animated: true })
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toBuffer();
    } catch {
      return NextResponse.json(
        { error: "Could not process that image. Try a JPG or PNG export." },
        { status: 422 },
      );
    }

    const existing = await prisma.event.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    // Copy into a fresh ArrayBuffer (Buffer may pool shared memory).
    const posterBytes = new Uint8Array(optimized.length);
    posterBytes.set(optimized);

    await prisma.event.update({
      where: { slug },
      data: {
        posterImage: posterBytes,
        posterUrl: `/api/events/poster/${slug}`,
      },
    });

    return NextResponse.json({ path: `/api/events/poster/${slug}` });
  } catch (error) {
    console.error("Poster upload error:", error);
    return NextResponse.json(
      { error: "Failed to save poster." },
      { status: 500 }
    );
  }
}
