import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const weekKey = req.nextUrl.searchParams.get("weekKey");
  if (!weekKey) return NextResponse.json({ error: "weekKey gerekli" }, { status: 400 });

  try {
    const record = await prisma.userWochenplan.findUnique({
      where: { userId_weekKey: { userId: session.user.id, weekKey } },
      select: { data: true },
    });
    return NextResponse.json({ data: record?.data ?? "{}" });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

const putSchema = z.object({
  weekKey: z.string(),
  data: z.string(),
});

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = putSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const { weekKey, data } = parsed.data;

  try {
    await prisma.userWochenplan.upsert({
      where: { userId_weekKey: { userId: session.user.id, weekKey } },
      update: { data },
      create: { userId: session.user.id, weekKey, data },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
