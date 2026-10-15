import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import {
  inputErrorResponse,
  readJsonObject,
  requiredText,
  requireAdmin,
  safeServerError,
} from "@/backend/lib/api";
import { ApiInputError } from "@/backend/lib/api";

function optionalSortOrder(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(num) || num < 0 || num > 100000) {
    throw new ApiInputError("Sort order must be an integer between 0 and 100000.");
  }
  return num;
}

// POST /api/admin/timetable - create a timetable entry (admin+)
export async function POST(request: Request) {
  const denied = await requireAdmin(request, true, "content:write");
  if (denied) return denied;

  try {
    const body = await readJsonObject(request, 16_384);

    const created = await prisma.timetableEntry.create({
      data: {
        day: requiredText(body.day, "Day", 120),
        time: requiredText(body.time, "Time", 60),
        title: requiredText(body.title, "Title", 160),
        detail: requiredText(body.detail, "Detail", 600),
        venue: requiredText(body.venue, "Venue", 120),
        mode: requiredText(body.mode, "Mode", 60),
        sortOrder: optionalSortOrder(body.sortOrder) ?? 0,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const inputResponse = inputErrorResponse(error);
    if (inputResponse) return inputResponse;
    return safeServerError("Failed to create timetable entry:", error);
  }
}
