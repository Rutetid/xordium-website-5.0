import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import {
  inputErrorResponse,
  ApiInputError,
  optionalText,
  optionalUrl,
  readJsonObject,
  requireAdmin,
  safeServerError,
} from "@/backend/lib/api";

function optionalTeamSize(value: unknown, field: string): number | null {
  if (value === undefined || value === null || value === "") return null;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(num) || num < 1 || num > 100) {
    throw new ApiInputError(`${field} must be an integer between 1 and 100.`);
  }
  return num;
}

function optionalFlag(value: unknown, field: string): boolean | null {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "boolean") {
    throw new ApiInputError(`${field} must be a boolean.`);
  }
  return value;
}

// PUT /api/moderator/events/:slug - update description/poster (moderator+)
export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await requireAdmin(request, true, "content:write");
  if (denied) return denied;

  try {
    const { slug } = await params;
    const body = await readJsonObject(request, 16_384);

    const description = optionalText(body.description, "Description", 8_000);
    const posterUrl = optionalUrl(body.posterUrl, "Poster URL");
    const minTeamSize = optionalTeamSize(body.minTeamSize, "Min team size");
    const maxTeamSize = optionalTeamSize(body.maxTeamSize, "Max team size");
    const allowTeamMembers = optionalFlag(body.allowTeamMembers, "Allow team members");
    const allowExternalTeam = optionalFlag(body.allowExternalTeam, "Allow external team");
    const registrationLabel = optionalText(body.registrationLabel, "Registration label", 160);

    let featured: boolean | null = null;
    if (body.featured !== undefined) {
      if (typeof body.featured !== "boolean") {
        throw new ApiInputError("Featured must be a boolean.");
      }
      featured = body.featured;
    }

    const existing = await prisma.event.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const updated = await prisma.event.update({
      where: { slug },
      data: {
        ...(description !== null && { description }),
        ...(posterUrl !== null && { posterUrl }),
        ...(featured !== null && { featured }),
        ...(minTeamSize !== null && { minTeamSize }),
        ...(maxTeamSize !== null && { maxTeamSize }),
        ...(allowTeamMembers !== null && { allowTeamMembers }),
        ...(allowExternalTeam !== null && { allowExternalTeam }),
        ...(registrationLabel !== null && { registrationLabel }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    const inputResponse = inputErrorResponse(error);
    if (inputResponse) return inputResponse;
    return safeServerError("Failed to update event:", error);
  }
}
