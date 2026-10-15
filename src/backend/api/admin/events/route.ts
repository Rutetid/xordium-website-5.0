import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import {
  ApiInputError,
  inputErrorResponse,
  optionalText,
  readJsonObject,
  requiredText,
  requireAdmin,
  safeServerError,
} from "@/backend/lib/api";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// GET /api/admin/events - list all events (owner only) with featured first, sorted by date
export async function GET(request: Request) {
  const denied = await requireAdmin(request, true, "users:manage");
  if (denied) return denied;

  try {
    const events = await prisma.event.findMany({
      orderBy: [
        { featured: "desc" }, // featured first
        { createdAt: "asc" }, // then by creation date (oldest first)
      ],
    });

    return NextResponse.json(events);
  } catch (error) {
    return safeServerError("Failed to fetch events:", error);
  }
}

// POST /api/admin/events - create an event (moderator+)
export async function POST(request: Request) {
  const denied = await requireAdmin(request, true, "content:write");
  if (denied) return denied;

  try {
    const body = await readJsonObject(request, 16_384);

    const title = requiredText(body.title, "Title", 160);
    const rawSlug =
      typeof body.slug === "string" && body.slug.trim()
        ? body.slug.trim()
        : slugify(title);
    const slug = slugify(rawSlug);
    if (!slug) {
      throw new ApiInputError("Slug must contain letters or numbers.");
    }

    let featured = false;
    if (body.featured !== undefined) {
      if (typeof body.featured !== "boolean") {
        throw new ApiInputError("Featured must be a boolean.");
      }
      featured = body.featured;
    }

    const created = await prisma.event.create({
      data: {
        slug,
        tag: requiredText(body.tag, "Tag", 40),
        title,
        category: requiredText(body.category, "Category", 40),
        description: requiredText(body.description, "Description", 8_000),
        image: optionalText(body.image, "Image", 2048) ?? "/assets/competitive-programming.jpg",
        prizePool: requiredText(body.prizePool, "Prize pool", 60),
        venue: requiredText(body.venue, "Venue", 120),
        format: requiredText(body.format, "Format", 120),
        schedule: requiredText(body.schedule, "Schedule", 120),
        teamSize: optionalText(body.teamSize, "Team size", 120),
        cta: requiredText(body.cta, "CTA", 60),
        featured,
        posterUrl: optionalText(body.posterUrl, "Poster URL", 2048),
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const inputResponse = inputErrorResponse(error);
    if (inputResponse) return inputResponse;
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "An event with this slug already exists." },
        { status: 409 },
      );
    }
    return safeServerError("Failed to create event:", error);
  }
}

// DELETE /api/admin/events - delete event (owner only)
export async function DELETE(request: Request) {  const denied = await requireAdmin(request, true, "users:manage");
  if (denied) return denied;

  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: "Event slug is required." }, { status: 400 });
    }

    const existing = await prisma.event.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    await prisma.event.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Event deleted successfully." });
  } catch (error) {
    return safeServerError("Failed to delete event:", error);
  }
}