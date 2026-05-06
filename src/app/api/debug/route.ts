import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const checks: Record<string, string> = {
    AUTH_SECRET: process.env.AUTH_SECRET ? "set" : "MISSING",
    DATABASE_URL: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) + "..." : "MISSING",
    NODE_ENV: process.env.NODE_ENV ?? "unknown",
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.db = "connected";
  } catch (e) {
    checks.db = "ERROR: " + (e instanceof Error ? e.message.substring(0, 100) : String(e));
  }

  return NextResponse.json(checks);
}
