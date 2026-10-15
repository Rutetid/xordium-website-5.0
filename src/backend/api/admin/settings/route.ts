import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import {
  inputErrorResponse,
  optionalText,
  readJsonObject,
  requireAdmin,
  safeServerError,
} from "@/backend/lib/api";

// GET /api/admin/settings - read all site settings (admin+)
export async function GET(request: Request) {
  const denied = await requireAdmin(request, true, "content:read");
  if (denied) return denied;

  try {
    const rows = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json(rows);
  } catch (error) {
    return safeServerError("Failed to fetch site settings:", error);
  }
}

// PUT /api/admin/settings - upsert site settings (admin+)
export async function PUT(request: Request) {
  const denied = await requireAdmin(request, true, "content:write");
  if (denied) return denied;

  try {
    const body = await readJsonObject(request, 16_384);

    const registrationDeadline = optionalText(
      body.registrationDeadline,
      "Registration deadline",
      60,
    );
    const totalPrizePool = optionalText(
      body.totalPrizePool,
      "Total prize pool",
      60,
    );

    const updates: Record<string, string> = {};
    if (registrationDeadline !== null) {
      const parsed = new Date(registrationDeadline);
      if (Number.isNaN(parsed.getTime())) {
        return NextResponse.json(
          { error: "Registration deadline must be a valid date." },
          { status: 400 },
        );
      }
      updates.registrationDeadline = registrationDeadline;
    }
    if (totalPrizePool !== null) updates.totalPrizePool = totalPrizePool;

    for (const [key, value] of Object.entries(updates)) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }

    const rows = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json(rows);
  } catch (error) {
    const inputResponse = inputErrorResponse(error);
    if (inputResponse) return inputResponse;
    return safeServerError("Failed to update site settings:", error);
  }
}
