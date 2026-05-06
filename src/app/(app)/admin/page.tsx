import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { Users, TrendingUp, BookOpen, Activity, ArrowRight } from "lucide-react";

export default async function AdminPage() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const [
    totalUsers,
    newThisWeek,
    activeToday,
    totalVocabLearned,
    totalExamAttempts,
    recentUsers,
    avgXPResult,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.userWorkSession.groupBy({ by: ["userId"], where: { date: { gte: todayStart } } }).then((r) => r.length),
    prisma.userVocabulary.count({ where: { learned: true } }),
    prisma.userExamAttempt.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, name: true, email: true, currentLevel: true, totalXP: true, streak: true, createdAt: true },
    }),
    prisma.user.aggregate({ _avg: { totalXP: true } }),
  ]);

  const avgXP = Math.round(avgXPResult._avg.totalXP ?? 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Admin Paneli</h1>
        <p className="text-text-muted text-sm mt-1">Platform genel bakış</p>
      </div>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Toplam Kullanıcı", value: totalUsers, sub: `+${newThisWeek} bu hafta`, color: "text-blue-400" },
          { icon: Activity, label: "Bugün Aktif", value: activeToday, sub: "çalışma seansı", color: "text-emerald-400" },
          { icon: TrendingUp, label: "Ortalama XP", value: avgXP.toLocaleString(), sub: "kullanıcı başına", color: "text-gold" },
          { icon: BookOpen, label: "Öğrenilen Kelime", value: totalVocabLearned.toLocaleString(), sub: `${totalExamAttempts} sınav denemesi`, color: "text-purple-400" },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <Card key={label}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{label}</p>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            <p className="text-text-muted text-xs mt-1">{sub}</p>
          </Card>
        ))}
      </div>

      {/* Son Kayıt Olan Kullanıcılar */}
      <Card>
        <CardHeader>
          <CardTitle>Son Kayıt Olan Kullanıcılar</CardTitle>
          <Link
            href="/admin/users"
            className="flex items-center gap-1 text-gold text-sm hover:underline"
          >
            Tümünü Gör <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-text-muted text-xs uppercase tracking-wider border-b border-navy-border">
                <th className="text-left pb-3 font-medium">Kullanıcı</th>
                <th className="text-left pb-3 font-medium">Seviye</th>
                <th className="text-right pb-3 font-medium">XP</th>
                <th className="text-right pb-3 font-medium">Seri</th>
                <th className="text-right pb-3 font-medium">Kayıt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-border">
              {recentUsers.map((u) => (
                <tr key={u.id} className="hover:bg-navy/40 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                        <span className="text-gold text-[10px] font-bold">
                          {u.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <Link href={`/admin/users?id=${u.id}`} className="text-text-primary font-medium hover:text-gold transition-colors">
                          {u.name}
                        </Link>
                        <p className="text-text-muted text-xs">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/25">
                      {u.currentLevel}
                    </span>
                  </td>
                  <td className="py-3 text-right text-text-primary font-semibold">{u.totalXP.toLocaleString()}</td>
                  <td className="py-3 text-right text-orange-400 font-semibold">{u.streak}🔥</td>
                  <td className="py-3 text-right text-text-muted text-xs">
                    {new Date(u.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
