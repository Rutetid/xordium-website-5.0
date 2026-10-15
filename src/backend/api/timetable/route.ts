import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import { safeServerError } from "@/backend/lib/api";

// GET /api/timetable - public festival timetable, ordered for display
export async function GET() {
  try {
    const entries = await prisma.timetableEntry.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json(entries);
  } catch (error) {
    return safeServerError("Failed to fetch timetable:", error);
  }
}
