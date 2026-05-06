import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowLeft, Flame, Trophy } from "lucide-react";
import { RoleToggleButton } from "@/components/admin/RoleToggleButton";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      currentLevel: true,
      totalXP: true,
      streak: true,
      role: true,
      createdAt: true,
      progress: { select: { skill: true, score: true } },
      _count: {
        select: {
          examAttempts: true,
          vocabulary: true,
          workSessions: true,
        },
      },
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-navy-border text-text-muted hover:text-gold hover:border-gold/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Tüm Kullanıcılar</h1>
          <p className="text-text-muted text-sm">{users.length} kayıtlı kullanıcı</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-text-muted text-xs uppercase tracking-wider border-b border-navy-border">
                <th className="text-left pb-3 font-medium">Kullanıcı</th>
                <th className="text-left pb-3 font-medium">Seviye</th>
                <th className="text-right pb-3 font-medium">XP</th>
                <th className="text-right pb-3 font-medium">Seri</th>
                <th className="text-right pb-3 font-medium">Beceri Ort.</th>
                <th className="text-right pb-3 font-medium">Sınavlar</th>
                <th className="text-right pb-3 font-medium">Kelimeler</th>
                <th className="text-right pb-3 font-medium">Rol</th>
                <th className="text-right pb-3 font-medium">Kayıt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-border">
              {users.map((u) => {
                const avgSkill =
                  u.progress.length > 0
                    ? Math.round(u.progress.reduce((s, p) => s + p.score, 0) / u.progress.length)
                    : 0;
                return (
                  <tr key={u.id} className="hover:bg-navy/40 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                          <span className="text-gold text-[10px] font-bold">
                            {u.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-text-primary font-medium">{u.name}</p>
                          <p className="text-text-muted text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/25">
                        {u.currentLevel}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Trophy className="w-3 h-3 text-gold" />
                        <span className="text-text-primary font-semibold">{u.totalXP.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-400 font-semibold">{u.streak}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-navy-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold rounded-full"
                            style={{ width: `${avgSkill}%` }}
                          />
                        </div>
                        <span className="text-text-secondary text-xs w-8 text-right">{avgSkill}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-text-secondary">{u._count.examAttempts}</td>
                    <td className="py-3 text-right text-text-secondary">{u._count.vocabulary}</td>
                    <td className="py-3 text-right">
                      <RoleToggleButton userId={u.id} currentRole={u.role} />
                    </td>
                    <td className="py-3 text-right text-text-muted text-xs">
                      {new Date(u.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
