import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";

// GET /api/events/poster/:slug - serve a DB-stored event poster (WebP).
// Posters live in the database (not the filesystem) so uploads also work
// on serverless hosting with a read-only filesystem.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const event = await prisma.event.findUnique({
      where: { slug },
      select: { posterImage: true, updatedAt: true },
    });

    if (!event?.posterImage) {
      return NextResponse.json({ error: "Poster not found." }, { status: 404 });
    }

    return new NextResponse(Buffer.from(event.posterImage), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        ETag: `"poster-${slug}-${event.updatedAt.getTime()}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load poster." }, { status: 500 });
  }
}
