import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const secret = process.env.AUTH_SECRET ?? "";
  const checks: Record<string, string> = {
    AUTH_SECRET_LEN: String(secret.length),
    AUTH_SECRET_FIRST_CHAR: secret.charCodeAt(0).toString(),
    DATABASE_URL: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 25) + "..." : "MISSING",
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
