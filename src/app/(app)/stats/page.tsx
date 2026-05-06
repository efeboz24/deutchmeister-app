import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BarChart3, BookOpen, Brain, Clock, Flame, Star,
  Trophy, CheckCircle, ArrowRight, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const GRAMMAR_TOPIC_COUNT = 13;

const LEVEL_COLORS: Record<string, { bar: string; badge: string; text: string }> = {
  A1: { bar: "bg-emerald-500",  badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400", text: "text-emerald-400" },
  A2: { bar: "bg-blue-500",     badge: "bg-blue-500/15 border-blue-500/30 text-blue-400",          text: "text-blue-400"    },
  B1: { bar: "bg-violet-500",   badge: "bg-violet-500/15 border-violet-500/30 text-violet-400",    text: "text-violet-400"  },
  B2: { bar: "bg-orange-500",   badge: "bg-orange-500/15 border-orange-500/30 text-orange-400",    text: "text-orange-400"  },
  C1: { bar: "bg-gold",         badge: "bg-gold/15 border-gold/30 text-gold",                      text: "text-gold"        },
};

const SKILL_META: Record<string, { label: string; color: string; bar: string }> = {
  horen:      { label: "Dinleme",  color: "text-blue-400",   bar: "bg-blue-500"    },
  lesen:      { label: "Okuma",    color: "text-emerald-400", bar: "bg-emerald-500" },
  schreiben:  { label: "Yazma",    color: "text-amber-400",  bar: "bg-amber-500"   },
  sprechen:   { label: "Konuşma", color: "text-violet-400",  bar: "bg-violet-500"  },
  grammatik:  { label: "Gramer",  color: "text-teal-400",    bar: "bg-teal-500"    },
};

function StatCard({
  label, value, sub, icon: Icon, color = "text-gold",
}: { label: string; value: string | number; sub?: string; icon: React.ElementType; color?: string }) {
  return (
    <div className="bg-navy-card border border-navy-border rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-text-muted font-medium uppercase tracking-wide">{label}</p>
          <p className={cn("text-2xl font-bold mt-1", color)}>{value}</p>
          {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
        </div>
        <div className={cn("w-9 h-9 rounded-lg bg-navy flex items-center justify-center border border-navy-border", color)}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>
    </div>
  );
}

export default async function StatsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const userInfo = session.user as {
    name?: string | null;
    currentLevel?: string;
    streak?: number;
    totalXP?: number;
  };

  const [skills, workSessions, examAttempts, vocabStats, grammarRec, levelData] =
    await Promise.all([
      prisma.userProgress.findMany({ where: { userId } }),
      prisma.userWorkSession.findMany({ where: { userId } }),
      prisma.userExamAttempt.findMany({
        where: { userId },
        include: { exam: { select: { name: true, levelId: true } } },
        orderBy: { attemptDate: "desc" },
        take: 5,
      }),
      prisma.userVocabulary.groupBy({
        by: ["learned"],
        where: { userId },
        _count: true,
      }),
      prisma.userGrammarProgress.findUnique({ where: { userId } }),
      prisma.level.findMany({ orderBy: { order: "asc" } }),
    ]).catch(() => {
      throw new Error("İstatistikler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
    });

  const totalMinutes = workSessions.reduce((s, w) => s + w.minutesWorked, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMinutesRem = totalMinutes % 60;

  const learnedVocab = vocabStats.find((v) => v.learned)?._count ?? 0;
  const currentLevelData = levelData.find((l) => l.name === (userInfo.currentLevel ?? "A1"));
  const goalVocab = currentLevelData?.goalVocab ?? 500;

  const grammarProgress: Record<string, string[]> = grammarRec
    ? JSON.parse(grammarRec.progress)
    : {};

  const grammarData = LEVELS.map((lvl) => ({
    level: lvl,
    completed: grammarProgress[lvl.toLowerCase()]?.length ?? 0,
    total: GRAMMAR_TOPIC_COUNT,
  }));

  const totalGrammarCompleted = grammarData.reduce((s, d) => s + d.completed, 0);
  const totalGrammarPossible = GRAMMAR_TOPIC_COUNT * LEVELS.length;

  const skillList = ["horen", "lesen", "schreiben", "sprechen", "grammatik"].map((skill) => ({
    skill,
    score: Math.round(skills.find((s) => s.skill === skill)?.score ?? 0),
  }));

  const avgSkill = skillList.length > 0
    ? Math.round(skillList.reduce((s, x) => s + x.score, 0) / skillList.length)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-gold" />
          İlerleme Raporu
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Tüm öğrenme istatistiklerin tek yerde
        </p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Mevcut Seviye"
          value={userInfo.currentLevel ?? "A1"}
          sub="TELC"
          icon={GraduationCap}
          color="text-gold"
        />
        <StatCard
          label="Toplam XP"
          value={(userInfo.totalXP ?? 0).toLocaleString("tr-TR")}
          sub={`Hedef: ${(currentLevelData?.goalXP ?? 1000).toLocaleString("tr-TR")}`}
          icon={Star}
          color="text-gold"
        />
        <StatCard
          label="Çalışma Serisi"
          value={`${userInfo.streak ?? 0} gün`}
          sub="Üst üste"
          icon={Flame}
          color="text-orange-400"
        />
        <StatCard
          label="Toplam Süre"
          value={totalHours > 0 ? `${totalHours}s ${totalMinutesRem}dk` : `${totalMinutes}dk`}
          sub={`${workSessions.length} oturum`}
          icon={Clock}
          color="text-blue-400"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Grammar progress */}
        <div className="bg-navy-card border border-navy-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold" />
              <h2 className="font-semibold text-text-primary text-sm">Gramer İlerlemesi</h2>
            </div>
            <span className="text-xs text-text-muted">
              {totalGrammarCompleted}/{totalGrammarPossible} konu
            </span>
          </div>

          <div className="space-y-3">
            {grammarData.map(({ level, completed, total }) => {
              const pct = Math.round((completed / total) * 100);
              const col = LEVEL_COLORS[level];
              return (
                <div key={level}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full border",
                        col.badge
                      )}>
                        {level}
                      </span>
                      {completed === total && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-xs text-text-muted">{completed}/{total}</span>
                  </div>
                  <div className="h-2 bg-navy rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", col.bar)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/learn"
            className="flex items-center justify-center gap-1.5 text-xs text-text-muted hover:text-gold transition-colors py-1"
          >
            Gramer konularına git
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Skill scores */}
        <div className="bg-navy-card border border-navy-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-gold" />
              <h2 className="font-semibold text-text-primary text-sm">Beceri Skorları</h2>
            </div>
            <span className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              avgSkill >= 70 ? "bg-emerald-500/15 text-emerald-400" :
              avgSkill >= 40 ? "bg-gold/15 text-gold" :
              "bg-navy text-text-muted"
            )}>
              Ort: {avgSkill}%
            </span>
          </div>

          <div className="space-y-3">
            {skillList.map(({ skill, score }) => {
              const meta = SKILL_META[skill];
              return (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn("text-xs font-medium", meta.color)}>{meta.label}</span>
                    <span className="text-xs text-text-muted">{score}%</span>
                  </div>
                  <div className="h-2 bg-navy rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", meta.bar)}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/practice"
            className="flex items-center justify-center gap-1.5 text-xs text-text-muted hover:text-gold transition-colors py-1"
          >
            Pratik yapmaya git
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Vocabulary */}
        <div className="bg-navy-card border border-navy-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h2 className="font-semibold text-text-primary text-sm">Kelime Durumu</h2>
            </div>
            <span className="text-xs text-emerald-400 font-bold">
              {learnedVocab}/{goalVocab}
            </span>
          </div>

          <div>
            <div className="h-3 bg-navy rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((learnedVocab / goalVocab) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-muted">
              <span>{Math.round((learnedVocab / goalVocab) * 100)}% tamamlandı</span>
              <span>{goalVocab - learnedVocab} kelime kaldı</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {vocabStats.map((v) => (
              <div key={String(v.learned)} className="bg-navy rounded-lg px-3 py-2 border border-navy-border">
                <p className="text-lg font-bold text-text-primary">{v._count}</p>
                <p className="text-xs text-text-muted">{v.learned ? "Öğrenildi" : "Çalışılıyor"}</p>
              </div>
            ))}
          </div>

          <Link
            href="/vocabulary"
            className="flex items-center justify-center gap-1.5 text-xs text-text-muted hover:text-gold transition-colors py-1"
          >
            Kelime kartlarına git
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Recent exams */}
        <div className="bg-navy-card border border-navy-border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold" />
            <h2 className="font-semibold text-text-primary text-sm">Son Sınavlar</h2>
          </div>

          {examAttempts.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-text-muted">Henüz sınav yapılmamış</p>
              <Link href="/exam" className="text-xs text-gold hover:underline mt-1 inline-block">
                Sınava gir →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {examAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center gap-3 px-3 py-2.5 bg-navy rounded-lg border border-navy-border"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                    attempt.passed
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  )}>
                    {Math.round(attempt.score)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{attempt.exam.name}</p>
                    <p className="text-xs text-text-muted">
                      {new Date(attempt.attemptDate).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0",
                    attempt.passed
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  )}>
                    {attempt.passed ? "Geçti" : "Kaldı"}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/exam"
            className="flex items-center justify-center gap-1.5 text-xs text-text-muted hover:text-gold transition-colors py-1"
          >
            Tüm sınavlar
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
