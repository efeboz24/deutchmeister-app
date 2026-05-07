import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { SkillProgressPanel } from "@/components/dashboard/SkillProgressPanel";
import { VocabularyProgress } from "@/components/dashboard/VocabularyProgress";
import { WeeklyActivityChart } from "@/components/dashboard/WeeklyActivityChart";
import { DailyRoutine } from "@/components/dashboard/DailyRoutine";
import { PracticeShortcuts } from "@/components/dashboard/PracticeShortcuts";
import { TodayWochenplan } from "@/components/dashboard/TodayWochenplan";
import type { SkillScore } from "@/types";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const userInfo = session.user as {
    name?: string | null;
    currentLevel?: string;
    streak?: number;
    totalXP?: number;
  };

  // Paralel veri çekimi
  const results = await Promise.allSettled([
    prisma.userProgress.findMany({ where: { userId } }),
    prisma.userWorkSession.findMany({
      where: {
        userId,
        date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      orderBy: { date: "asc" },
    }),
    prisma.userExamAttempt.findMany({
      where: { userId },
      include: { exam: { select: { name: true } } },
      orderBy: { attemptDate: "desc" },
      take: 3,
    }),
    prisma.userVocabulary.count({
      where: { userId, repetitions: { gt: 0 } },
    }),
    prisma.level.findFirst({
      where: { name: userInfo.currentLevel ?? "A1" },
      include: {
        units: {
          orderBy: { order: "asc" },
          take: 1,
        },
      },
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[Dashboard] Query failed:", result.reason);
    }
  }

  const skills = results[0].status === "fulfilled" ? results[0].value : [];
  const workSessions = results[1].status === "fulfilled" ? results[1].value : [];
  const examAttempts = results[2].status === "fulfilled" ? results[2].value : [];
  const vocabCount = results[3].status === "fulfilled" ? results[3].value : 0;
  const levelData = results[4].status === "fulfilled" ? results[4].value : null;

  const LEVEL_PREV_XP: Record<string, number> = { A1: 0, A2: 500, B1: 1000, B2: 2000, C1: 3500 };
  const currentLevel = userInfo.currentLevel ?? "A1";
  const goalXP = levelData?.goalXP ?? 1000;
  const prevXP = LEVEL_PREV_XP[currentLevel] ?? 0;
  const totalXP = userInfo.totalXP ?? 0;
  const levelProgress = Math.min(100, Math.round(((totalXP - prevXP) / (goalXP - prevXP)) * 100));

  const skillScores: SkillScore[] = ["horen", "lesen", "schreiben", "sprechen", "grammatik"].map(
    (skill) => ({
      skill: skill as SkillScore["skill"],
      score: skills.find((s) => s.skill === skill)?.score ?? 0,
    })
  );

  const examReadiness = skillScores.length > 0
    ? Math.round(skillScores.reduce((s, x) => s + x.score, 0) / skillScores.length)
    : 0;

  const continueUnit = levelData?.units[0]?.name ?? `${userInfo.currentLevel ?? "A1"} Ünitesi`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <WelcomeBanner
        userName={userInfo.name ?? "Öğrenci"}
        streak={userInfo.streak ?? 0}
        currentLevel={userInfo.currentLevel ?? "A1"}
        continueUnit={continueUnit}
      />

      <StatsGrid
        currentLevel={userInfo.currentLevel ?? "A1"}
        levelProgress={levelProgress}
        examReadiness={examReadiness}
        examCount={examAttempts.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol sütun */}
        <div className="lg:col-span-2 space-y-6">
          <DailyRoutine />
          <SkillProgressPanel skills={skillScores} />
          <WeeklyActivityChart
            sessions={workSessions.map((s) => ({
              date: s.date.toISOString(),
              minutesWorked: s.minutesWorked,
            }))}
          />
        </div>

        {/* Sağ sütun */}
        <div className="space-y-6">
          <TodayWochenplan />
          <VocabularyProgress
            learned={vocabCount}
            goal={levelData?.goalVocab ?? 500}
            level={userInfo.currentLevel ?? "A1"}
          />
          <PracticeShortcuts />
        </div>
      </div>

    </div>
  );
}
