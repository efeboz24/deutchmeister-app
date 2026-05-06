import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Clock, ChevronRight, BookOpen, CheckCircle2, RotateCcw } from "lucide-react";

export default async function ExamPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [exams, attempts] = await Promise.all([
    prisma.mockExam.findMany({
      include: { level: { select: { name: true } } },
      orderBy: [{ level: { order: "asc" } }],
    }),
    prisma.userExamAttempt.findMany({
      where: { userId: session.user.id },
      select: { examId: true, score: true, passed: true },
    }),
  ]);

  // Best score per exam
  const bestAttempt = new Map<string, { score: number; passed: boolean }>();
  for (const a of attempts) {
    const existing = bestAttempt.get(a.examId);
    if (!existing || a.score > existing.score) {
      bestAttempt.set(a.examId, { score: a.score, passed: a.passed });
    }
  }

  const levelOrder = ["A1", "A2", "B1", "B2", "C1"];

  const grouped = levelOrder.reduce<Record<string, typeof exams>>((acc, lvl) => {
    const lvlExams = exams.filter((e) => e.level.name === lvl);
    if (lvlExams.length > 0) acc[lvl] = lvlExams;
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Deneme Sınavları</h1>
        <p className="text-text-secondary">Gerçek telc sınav formatında tam simülasyonlar.</p>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-secondary">Henüz sınav eklenmemiş.</p>
        </Card>
      ) : (
        Object.entries(grouped).map(([levelName, levelExams]) => (
          <div key={levelName} className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-text-primary tracking-tight">{levelName}</h2>
              <div className="flex-1 h-px bg-navy-border" />
            </div>

            {levelExams.map((exam) => {
              const prev = bestAttempt.get(exam.id);
              return (
                <Card key={exam.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      prev?.passed
                        ? "bg-green-500/10 border border-green-500/25"
                        : prev
                        ? "bg-amber-500/10 border border-amber-500/25"
                        : "bg-gold/10 border border-gold/20"
                    }`}>
                      <BookOpen className={`w-4.5 h-4.5 ${prev?.passed ? "text-green-400" : prev ? "text-amber-400" : "text-gold"}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-text-primary">{exam.name}</p>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="text-xs text-gold font-medium">Lesen und Schreiben</span>
                        <span className="text-text-muted text-xs">·</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-text-muted" />
                          <span className="text-xs text-text-muted">{exam.duration} dakika</span>
                        </div>
                        {prev && (
                          <>
                            <span className="text-text-muted text-xs">·</span>
                            <div className={`flex items-center gap-1 text-xs font-medium ${prev.passed ? "text-green-400" : "text-amber-400"}`}>
                              {prev.passed ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : (
                                <RotateCcw className="w-3 h-3" />
                              )}
                              En iyi: {Math.round(prev.score)}%
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link href={`/exam/${exam.id}`} className="flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-text-muted hover:text-gold transition-colors" />
                  </Link>
                </Card>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
