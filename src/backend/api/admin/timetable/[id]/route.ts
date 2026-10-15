import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import {
  ApiInputError,
  inputErrorResponse,
  optionalText,
  readJsonObject,
  requireAdmin,
  safeServerError,
} from "@/backend/lib/api";

function optionalSortOrder(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(num) || num < 0 || num > 100000) {
    throw new ApiInputError("Sort order must be an integer between 0 and 100000.");
  }
  return num;
}

async function findEntry(id: string) {
  const entry = await prisma.timetableEntry.findUnique({ where: { id } });
  if (!entry) {
    throw new ApiInputError("Timetable entry not found.", 404);
  }
  return entry;
}

// PUT /api/admin/timetable/:id - update any detail of an entry (admin+)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(request, true, "content:write");
  if (denied) return denied;

  try {
    const { id } = await params;
    await findEntry(id);
    const body = await readJsonObject(request, 16_384);

    const day = optionalText(body.day, "Day", 120);
    const time = optionalText(body.time, "Time", 60);
    const title = optionalText(body.title, "Title", 160);
    const detail = optionalText(body.detail, "Detail", 600);
    const venue = optionalText(body.venue, "Venue", 120);
    const mode = optionalText(body.mode, "Mode", 60);
    const sortOrder = optionalSortOrder(body.sortOrder);

    const updated = await prisma.timetableEntry.update({
      where: { id },
      data: {
        ...(day !== null && { day }),
        ...(time !== null && { time }),
        ...(title !== null && { title }),
        ...(detail !== null && { detail }),
        ...(venue !== null && { venue }),
        ...(mode !== null && { mode }),
        ...(sortOrder !== null && { sortOrder }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    const inputResponse = inputErrorResponse(error);
    if (inputResponse) return inputResponse;
    return safeServerError("Failed to update timetable entry:", error);
  }
}

// DELETE /api/admin/timetable/:id - remove an entry (admin+)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(request, true, "content:write");
  if (denied) return denied;

  try {
    const { id } = await params;
    await findEntry(id);
    await prisma.timetableEntry.delete({ where: { id } });

    return NextResponse.json({ message: "Timetable entry deleted." });
  } catch (error) {
    const inputResponse = inputErrorResponse(error);
    if (inputResponse) return inputResponse;
    return safeServerError("Failed to delete timetable entry:", error);
  }
}
