import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ xp: z.number().int().positive() });

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"] as const;

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
    const [todaySession, yesterdaySession, user, levels] = await Promise.all([
      prisma.userWorkSession.findFirst({ where: { userId, date: { gte: todayStart } } }),
      prisma.userWorkSession.findFirst({ where: { userId, date: { gte: yesterdayStart, lt: todayStart } } }),
      prisma.user.findUnique({ where: { id: userId }, select: { streak: true, totalXP: true, currentLevel: true } }),
      prisma.level.findMany({ orderBy: { order: "asc" }, select: { name: true, goalXP: true, order: true } }),
    ]);

    if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

    let newStreak = user.streak;
    if (!todaySession) {
      newStreak = (yesterdaySession || user.streak === 0) ? user.streak + 1 : 1;
    }

    const newTotalXP = user.totalXP + xp;

    // Level-up check
    const currentLevelIdx = LEVEL_ORDER.indexOf(user.currentLevel as typeof LEVEL_ORDER[number]);
    const currentLevelData = levels.find((l) => l.name === user.currentLevel);
    let newLevel = user.currentLevel;
    let leveledUp = false;

    if (currentLevelData && currentLevelIdx < LEVEL_ORDER.length - 1) {
      if (newTotalXP >= currentLevelData.goalXP) {
        newLevel = LEVEL_ORDER[currentLevelIdx + 1];
        leveledUp = true;
      }
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { totalXP: { increment: xp }, streak: newStreak, currentLevel: newLevel },
      select: { totalXP: true, streak: true, currentLevel: true },
    });

    // Next level info for progress indicator
    const updatedLevelIdx = LEVEL_ORDER.indexOf(updated.currentLevel as typeof LEVEL_ORDER[number]);
    const updatedLevelData = levels.find((l) => l.name === updated.currentLevel);
    const prevLevelGoalXP = updatedLevelIdx > 0
      ? (levels.find((l) => l.name === LEVEL_ORDER[updatedLevelIdx - 1])?.goalXP ?? 0)
      : 0;
    const isMaxLevel = updatedLevelIdx === LEVEL_ORDER.length - 1
      && updated.totalXP >= (updatedLevelData?.goalXP ?? Infinity);

    return NextResponse.json({
      ...updated,
      leveledUp,
      newLevel: leveledUp ? newLevel : null,
      currentLevelGoalXP: updatedLevelData?.goalXP ?? null,
      prevLevelGoalXP,
      isMaxLevel,
    });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
