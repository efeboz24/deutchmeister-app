import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, BookOpen, MessageSquare, Layers, ArrowLeft, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GrammarTab } from "./GrammarTab";
import { A1_GRAMMAR_TOPICS } from "@/lib/grammar-a1";
import { A2_GRAMMAR_TOPICS } from "@/lib/grammar-a2";
import { B1_GRAMMAR_TOPICS } from "@/lib/grammar-b1";
import { B2_GRAMMAR_TOPICS } from "@/lib/grammar-b2";
import { C1_GRAMMAR_TOPICS } from "@/lib/grammar-c1";

interface PageProps {
  params: Promise<{ levelId: string }>;
  searchParams: Promise<{ tab?: string }>;
}

const LEVEL_COLORS: Record<string, string> = {
  A1: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  A2: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  B1: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
  B2: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
  C1: "from-gold/20 to-gold/5 border-gold/30",
};

const LEVEL_BADGE_COLORS: Record<string, string> = {
  A1: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  A2: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  B1: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  B2: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  C1: "bg-gold/10 text-gold border border-gold/20",
};

const GRAMMAR_TOPICS_MAP: Record<string, typeof B1_GRAMMAR_TOPICS> = {
  A1: A1_GRAMMAR_TOPICS,
  A2: A2_GRAMMAR_TOPICS,
  B1: B1_GRAMMAR_TOPICS,
  B2: B2_GRAMMAR_TOPICS,
  C1: C1_GRAMMAR_TOPICS,
};

export default async function LevelPage({ params, searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { levelId } = await params;
  const { tab } = await searchParams;
  const activeTab = tab === "grammar" ? "grammar" : "units";

  const level = await prisma.level.findUnique({
    where: { id: levelId },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!level) notFound();

  const totalLessons = level.units.reduce((sum, u) => sum + u.lessons.length, 0);
  const colorClass = LEVEL_COLORS[level.name] ?? LEVEL_COLORS.A1;
  const badgeClass = LEVEL_BADGE_COLORS[level.name] ?? LEVEL_BADGE_COLORS.A1;
  const grammarTopics = GRAMMAR_TOPICS_MAP[level.name] ?? null;

  const CONTENT_TYPE_ICONS: Record<string, { icon: typeof BookOpen; label: string }> = {
    read: { icon: BookOpen, label: "Okuma" },
    listen: { icon: MessageSquare, label: "Dinleme" },
    quiz: { icon: Layers, label: "Test" },
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link href="/learn" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Öğrenme Yolu
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text-secondary">{level.name}</span>
      </div>

      {/* Level header */}
      <div className={cn("rounded-2xl border bg-gradient-to-br p-6", colorClass)}>
        <div className="flex items-start gap-4">
          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black", badgeClass)}>
            {level.name}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-primary mb-1">{level.displayName}</h1>
            <p className="text-text-secondary text-sm">{level.description}</p>
          </div>
        </div>
        <div className="flex gap-6 mt-5 pt-5 border-t border-white/10">
          <div className="text-center">
            <p className="text-xl font-bold text-text-primary">{level.units.length}</p>
            <p className="text-xs text-text-muted">Ünite</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-text-primary">{totalLessons}</p>
            <p className="text-xs text-text-muted">Bölüm</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-text-primary">{level.goalVocab}</p>
            <p className="text-xs text-text-muted">Hedef Kelime</p>
          </div>
          {grammarTopics && (
            <div className="text-center">
              <p className="text-xl font-bold text-text-primary">{grammarTopics.length}</p>
              <p className="text-xs text-text-muted">Gramer Konusu</p>
            </div>
          )}
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-navy-card border border-navy-border rounded-xl">
        <Link
          href={`/learn/${levelId}`}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200",
            activeTab === "units"
              ? "bg-gold text-navy shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-navy-light"
          )}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Ünite Listesi
        </Link>
        {grammarTopics && (
          <Link
            href={`/learn/${levelId}?tab=grammar`}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200",
              activeTab === "grammar"
                ? "bg-gold text-navy shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-navy-light"
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Gramer
          </Link>
        )}
      </div>

      {/* ── Units tab ── */}
      {activeTab === "units" && (
        <div className="space-y-3">
          {level.units.map((unit, idx) => {
            const lessonTypes = unit.lessons.reduce<Record<string, number>>((acc, l) => {
              acc[l.contentType] = (acc[l.contentType] ?? 0) + 1;
              return acc;
            }, {});

            return (
              <Link
                key={unit.id}
                href={`/learn/${levelId}/${unit.id}`}
                className="block group"
              >
                <div className="bg-navy-card border border-navy-border rounded-xl p-4 flex items-center gap-4 hover:border-gold/40 transition-all duration-200">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                    idx === 0 ? "bg-gold text-navy" : "bg-navy border border-navy-border text-text-primary"
                  )}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary text-sm truncate">{unit.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {Object.entries(lessonTypes).map(([type, count]) => {
                        const info = CONTENT_TYPE_ICONS[type];
                        if (!info) return null;
                        return (
                          <span key={type} className="text-xs text-text-muted flex items-center gap-0.5">
                            <info.icon className="w-3 h-3" />
                            {count} {info.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ── Grammar tab ── */}
      {activeTab === "grammar" && grammarTopics && (
        <GrammarTab topics={grammarTopics} levelId={levelId} levelName={level.name} />
      )}

      {activeTab === "grammar" && !grammarTopics && (
        <div className="bg-navy-card border border-navy-border rounded-xl p-8 text-center">
          <BookOpen className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary text-sm">Bu seviye için gramer içeriği yakında eklenecek.</p>
        </div>
      )}
    </div>
  );
}
