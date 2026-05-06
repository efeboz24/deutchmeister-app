import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  skill: z.enum(["horen", "lesen", "schreiben", "sprechen", "grammatik"]),
  score: z.number().min(0).max(100),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const userId = session.user.id;
  const { skill, score } = parsed.data;

  try {
    await prisma.userProgress.upsert({
      where: { userId_skill: { userId, skill } },
      update: { score },
      create: { userId, skill, score },
    });
    return NextResponse.json({ ok: true, skill, score });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
