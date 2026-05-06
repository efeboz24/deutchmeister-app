import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Flame, Trophy, BookOpen, Star, Clock, BarChart2 } from "lucide-react";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";

const SKILL_LABELS: Record<string, string> = {
  horen: "Hören (Dinleme)",
  lesen: "Lesen (Okuma)",
  schreiben: "Schreiben (Yazma)",
  sprechen: "Sprechen (Konuşma)",
  grammatik: "Grammatik",
};

const SKILL_COLORS: Record<string, string> = {
  horen: "bg-skill-horen",
  lesen: "bg-skill-lesen",
  schreiben: "bg-skill-schreiben",
  sprechen: "bg-skill-sprechen",
  grammatik: "bg-skill-grammatik",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [user, skills, examAttempts, vocabCount, workSessions] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, currentLevel: true, streak: true, totalXP: true, createdAt: true },
    }),
    prisma.userProgress.findMany({ where: { userId } }),
    prisma.userExamAttempt.findMany({
      where: { userId },
      include: { exam: { select: { name: true } } },
      orderBy: { attemptDate: "desc" },
      take: 5,
    }),
    prisma.userVocabulary.count({ where: { userId, learned: true } }),
    prisma.userWorkSession.findMany({
      where: { userId, date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    }),
  ]).catch(() => {
    throw new Error("Profil verileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
  });

  if (!user) redirect("/login");

  const totalMinutes = workSessions.reduce((s, w) => s + w.minutesWorked, 0);
  const avgSkill =
    skills.length > 0
      ? Math.round(skills.reduce((s, x) => s + x.score, 0) / skills.length)
      : 0;
  const passedExams = examAttempts.filter((e) => e.passed).length;
  const memberDays = Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Başlık kartı */}
      <Card className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center shrink-0">
          <span className="text-gold text-2xl font-bold">
            {user.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-text-primary">{user.name}</h1>
          <p className="text-text-muted text-sm">{user.email}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant="level">{user.currentLevel}</Badge>
            <span className="text-text-muted text-xs">{memberDays} gündür üye</span>
          </div>
        </div>
        <ProfileEditForm />
      </Card>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Trophy, label: "Toplam XP", value: user.totalXP.toLocaleString(), color: "text-gold" },
          { icon: Flame, label: "Seri", value: `${user.streak} gün`, color: "text-orange-400" },
          { icon: BookOpen, label: "Öğrenilen Kelime", value: vocabCount, color: "text-blue-400" },
          { icon: Clock, label: "Çalışma (30 gün)", value: `${totalMinutes} dk`, color: "text-teal-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="flex flex-col items-center text-center gap-1.5 py-4">
            <Icon className={`w-6 h-6 ${color}`} />
            <p className="text-text-primary font-bold text-lg leading-none">{value}</p>
            <p className="text-text-muted text-xs">{label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Beceri Puanları */}
        <Card>
          <CardHeader>
            <CardTitle>Beceri Puanları</CardTitle>
            <span className="text-text-muted text-sm">Ort. {avgSkill}%</span>
          </CardHeader>
          <div className="space-y-3">
            {["horen", "lesen", "schreiben", "sprechen", "grammatik"].map((skill) => {
              const score = skills.find((s) => s.skill === skill)?.score ?? 0;
              return (
                <div key={skill}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-text-secondary">{SKILL_LABELS[skill]}</span>
                    <span className="text-text-primary font-semibold">{Math.round(score)}%</span>
                  </div>
                  <div className="h-2 bg-navy-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${SKILL_COLORS[skill]}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Son Sınavlar */}
        <Card>
          <CardHeader>
            <CardTitle>Son Sınavlar</CardTitle>
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-text-muted">{passedExams} geçti</span>
            </div>
          </CardHeader>
          {examAttempts.length === 0 ? (
            <p className="text-text-muted text-sm text-center py-6">Henüz sınav girilmedi.</p>
          ) : (
            <div className="space-y-2">
              {examAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-navy border border-navy-border"
                >
                  <div>
                    <p className="text-text-primary text-sm font-medium">{attempt.exam.name}</p>
                    <p className="text-text-muted text-xs">
                      {new Date(attempt.attemptDate).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary font-bold text-sm">
                      {Math.round(attempt.score)}%
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        attempt.passed
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {attempt.passed ? "Geçti" : "Kaldı"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Aktivite Özeti */}
      <Card>
        <CardHeader>
          <CardTitle>Son 30 Gün Aktivite</CardTitle>
          <BarChart2 className="w-4 h-4 text-text-muted" />
        </CardHeader>
        <div className="flex items-end gap-1 h-16">
          {Array.from({ length: 30 }, (_, i) => {
            const day = new Date();
            day.setDate(day.getDate() - (29 - i));
            day.setHours(0, 0, 0, 0);
            const next = new Date(day);
            next.setDate(next.getDate() + 1);
            const minutes = workSessions
              .filter((s) => s.date >= day && s.date < next)
              .reduce((sum, s) => sum + s.minutesWorked, 0);
            const maxMinutes = 120;
            const height = Math.max(2, Math.min(100, (minutes / maxMinutes) * 100));
            return (
              <div
                key={i}
                title={`${day.toLocaleDateString("tr-TR")}: ${minutes} dk`}
                className="flex-1 rounded-sm bg-gold/70 transition-all"
                style={{ height: `${height}%`, opacity: minutes === 0 ? 0.15 : 1 }}
              />
            );
          })}
        </div>
        <p className="text-text-muted text-xs mt-2 text-right">Son 30 gün · {totalMinutes} toplam dakika</p>
      </Card>
    </div>
  );
}
