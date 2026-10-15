import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import { safeServerError } from "@/backend/lib/api";

// GET /api/site-settings - public site-wide settings (deadline, prize pool).
export async function GET() {
  try {
    const rows = await prisma.siteSetting.findMany();
    const settings: Record<string, string> = {};
    for (const row of rows) settings[row.key] = row.value;

    return NextResponse.json(settings);
  } catch (error) {
    return safeServerError("Failed to fetch site settings:", error);
  }
}
