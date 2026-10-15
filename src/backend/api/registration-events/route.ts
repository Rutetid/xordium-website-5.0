import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import { safeServerError } from "@/backend/lib/api";

// GET /api/registration-events - public registration setup for every event.
// Drives the registration form dropdown and team-size rules.
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      select: {
        slug: true,
        title: true,
        registrationLabel: true,
        minTeamSize: true,
        maxTeamSize: true,
        allowTeamMembers: true,
        allowExternalTeam: true,
      },
      orderBy: { title: "asc" },
    });

    return NextResponse.json(
      events.map((e) => ({
        id: e.slug,
        name: e.registrationLabel || e.title,
        minTeamSize: e.minTeamSize,
        maxTeamSize: e.maxTeamSize,
        allowTeamMembers: e.allowTeamMembers,
        allowExternalTeam: e.allowExternalTeam,
      })),
    );
  } catch (error) {
    return safeServerError("Failed to fetch registration events:", error);
  }
}
