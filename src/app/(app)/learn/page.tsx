import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function LearnPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const userInfo = session.user as { currentLevel?: string };
  const currentLevel = userInfo.currentLevel ?? "A1";

  const levels = await prisma.level.findMany({
    orderBy: { order: "asc" },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            select: { id: true },
          },
        },
      },
    },
  });

  const levelOrder = ["A1", "A2", "B1", "B2", "C1"];
  const currentLevelIndex = levelOrder.indexOf(currentLevel);
  // All levels are open — no lock restriction

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Öğrenme Yolu</h1>
        <p className="text-text-secondary">Seviyeni seç ve ünitelerle ilerle.</p>
      </div>

      {/* Seviye kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level) => {
          const levelIdx = levelOrder.indexOf(level.name);
          const isActive = level.name === currentLevel;
          const isUnlocked = true; // all levels accessible
          const isCompleted = levelIdx < currentLevelIndex;

          return (
            <div
              key={level.id}
              className={cn(
                "relative rounded-xl border p-5 transition-all duration-200",
                isActive
                  ? "bg-gold/10 border-gold/50"
                  : isUnlocked
                  ? "bg-navy-card border-navy-border hover:border-gold/30"
                  : "bg-navy-card/50 border-navy-border/50 opacity-60"
              )}
            >
              {isActive && (
                <Badge variant="level" className="absolute top-3 right-3">
                  Aktif
                </Badge>
              )}
              {isCompleted && (
                <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-green-400" />
              )}


              <div className="flex items-start gap-3 mb-3">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold",
                    isActive ? "bg-gold text-navy" : isUnlocked ? "bg-navy border border-navy-border text-text-primary" : "bg-navy/50 text-text-muted"
                  )}
                >
                  {level.name}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{level.displayName}</h3>
                  <p className="text-xs text-text-muted">{level.units.length} ünite</p>
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-4 line-clamp-2">{level.description}</p>

              <Link
                href={`/learn/${level.id}`}
                className={cn(
                  "flex items-center justify-between text-sm font-medium transition-colors",
                  isActive ? "text-gold hover:text-gold-hover" : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span>{isActive ? "Devam Et" : "Gözat"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Aktif seviyenin üniteleri */}
      {levels.find((l) => l.name === currentLevel) && (
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            {currentLevel} Yol Haritası
          </h2>
          <div className="space-y-3">
            {levels
              .find((l) => l.name === currentLevel)!
              .units.map((unit, idx) => (
                <Link
                  key={unit.id}
                  href={`/learn/${levels.find((l) => l.name === currentLevel)!.id}/${unit.id}`}
                  className="block"
                >
                  <Card hover className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                          idx === 0 ? "bg-gold text-navy" : "bg-navy border border-navy-border text-text-primary"
                        )}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">{unit.name}</p>
                        <p className="text-xs text-text-muted">{unit.lessons.length} bölüm</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-gold transition-colors" />
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
