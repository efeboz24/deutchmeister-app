import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ xp: z.number().int().positive() });

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const userId = session.user.id;
  const { xp } = parsed.data;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  try {
    const [todaySession, yesterdaySession, user] = await Promise.all([
      prisma.userWorkSession.findFirst({ where: { userId, date: { gte: todayStart } } }),
      prisma.userWorkSession.findFirst({ where: { userId, date: { gte: yesterdayStart, lt: todayStart } } }),
      prisma.user.findUnique({ where: { id: userId }, select: { streak: true } }),
    ]);

    if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

    let newStreak = user.streak;
    if (!todaySession) {
      // Extend streak if yesterday had a session OR this is the first ever session (streak=0)
      newStreak = (yesterdaySession || user.streak === 0) ? user.streak + 1 : 1;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { totalXP: { increment: xp }, streak: newStreak },
      select: { totalXP: true, streak: true },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
