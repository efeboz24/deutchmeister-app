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
  const [skills, workSessions, examAttempts, vocabCount, levelData] = await Promise.all([
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
  ]).catch(() => {
    throw new Error("Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
  });

  const goalXP = levelData?.goalXP ?? 1000;
  const levelProgress = Math.min(100, Math.round(((userInfo.totalXP ?? 0) / goalXP) * 100));

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
