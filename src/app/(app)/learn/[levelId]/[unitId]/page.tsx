import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight, ArrowLeft, BookOpen, Headphones, ClipboardList,
  MessageSquare, Lightbulb, GraduationCap, Target, TableProperties
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRICULUM } from "@/lib/curriculum";
import { SpeakBtn } from "@/components/ui/SpeakBtn";

interface PageProps {
  params: Promise<{ levelId: string; unitId: string }>;
}

const CONTENT_TYPE_CONFIG = {
  read: {
    icon: BookOpen,
    label: "Okuma",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    desc: "Metin okuma ve anlama",
  },
  listen: {
    icon: Headphones,
    label: "Dinleme",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    desc: "Dinleme ve anlama",
  },
  quiz: {
    icon: ClipboardList,
    label: "Test",
    color: "text-gold",
    bg: "bg-gold/10 border-gold/20",
    desc: "Alıştırma ve quiz",
  },
};

export default async function UnitPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { levelId, unitId } = await params;

  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    include: {
      level: true,
      lessons: { orderBy: { order: "asc" } },
    },
  });

  if (!unit || unit.levelId !== levelId) notFound();

  const curriculum = CURRICULUM[unit.name];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted flex-wrap">
        <Link href="/learn" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Öğrenme Yolu
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/learn/${levelId}`} className="hover:text-text-primary transition-colors">
          {unit.level.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text-secondary truncate max-w-[200px]">{unit.name}</span>
      </div>

      {/* Unit header */}
      <div className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">{unit.level.name} · Ünite {unit.order}</p>
            <h1 className="text-xl font-bold text-text-primary">{unit.name}</h1>
            {curriculum && (
              <p className="text-sm text-text-secondary mt-1">{curriculum.focus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum content */}
      {curriculum ? (
        <div className="space-y-6">
          {/* Kommunikation + Grammatik overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kommunikation */}
            <div className="bg-navy-card border border-navy-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-text-primary text-sm">İletişim Hedefleri</h3>
              </div>
              <ul className="space-y-2">
                {curriculum.kommunikation.map((k, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            {/* Grammar topics overview */}
            <div className="bg-navy-card border border-navy-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="font-semibold text-text-primary text-sm">Dilbilgisi Konuları</h3>
              </div>
              <ul className="space-y-2">
                {curriculum.grammatik.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-violet-400 mt-0.5 flex-shrink-0">◆</span>
                    {g.topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grammar cards */}
          <div>
            <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold" />
              Dilbilgisi Açıklamaları
            </h2>
            <div className="space-y-4">
              {curriculum.grammatik.map((g, i) => (
                <div key={i} className="bg-navy-card border border-navy-border rounded-xl overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-3 bg-navy border-b border-navy-border flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-text-primary text-sm">{g.topic}</h3>
                  </div>
                  {/* Body */}
                  <div className="p-5 space-y-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{g.explanation}</p>
                    {/* Examples */}
                    <div className="space-y-2">
                      <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Örnekler</p>
                      <div className="grid gap-2">
                        {g.examples.map((ex, j) => (
                          <div key={j} className="flex items-start gap-3 bg-navy rounded-lg px-3 py-2.5 group">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-text-primary">{ex.de}</p>
                                <SpeakBtn text={ex.de} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <p className="text-xs text-text-muted mt-0.5">{ex.tr}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Grammar table */}
                    {g.table && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <TableProperties className="w-3.5 h-3.5 text-gold/70" />
                          <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Tablo</p>
                        </div>
                        <div className="overflow-x-auto rounded-lg border border-navy-border">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr>
                                {g.table.headers.map((h, hi) => (
                                  <th key={hi} className="px-3 py-2.5 bg-gold/15 text-gold text-left text-xs font-bold uppercase tracking-wide border-b border-gold/20">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {g.table.rows.map((row, ri) => (
                                <tr key={ri} className={ri % 2 === 0 ? "bg-navy" : "bg-navy-card"}>
                                  {row.map((cell, ci) => (
                                    <td key={ci} className={`px-3 py-2 border-b border-navy-border text-sm ${
                                      ci === 0 ? "text-gold font-semibold" :
                                      cell.includes("✓") ? "text-emerald-400 font-medium" :
                                      cell.includes("✗") ? "text-text-muted" :
                                      "text-text-primary"
                                    }`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {curriculum.tipps.length > 0 && (
            <div className="bg-navy-card border border-gold/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-text-primary text-sm">Önemli İpuçları</h3>
              </div>
              <ul className="space-y-2">
                {curriculum.tipps.map((tip, i) => (
                  <li key={i} className="text-sm text-text-secondary leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-navy-card border border-navy-border rounded-xl p-8 text-center">
          <BookOpen className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary text-sm">Bu ünite için içerik yakında eklenecek.</p>
        </div>
      )}

      {/* Lessons */}
      <div>
        <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-gold" />
          Bölümler ({unit.lessons.length})
        </h2>
        <div className="space-y-2">
          {unit.lessons.map((lesson, idx) => {
            const config = CONTENT_TYPE_CONFIG[lesson.contentType as keyof typeof CONTENT_TYPE_CONFIG]
              ?? CONTENT_TYPE_CONFIG.read;
            const Icon = config.icon;
            const hasContent = !!(CURRICULUM as Record<string, unknown>)[lesson.name] || true;
            // Check if lesson content exists
            const lessonPath = `/learn/${levelId}/${unitId}/${lesson.id}`;

            return (
              <Link
                key={lesson.id}
                href={lessonPath}
                className="block group"
              >
                <div className="bg-navy-card border border-navy-border rounded-xl p-4 flex items-center gap-4 hover:border-gold/40 transition-all duration-200">
                  <div className={cn("w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0", config.bg)}>
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary text-sm">{lesson.name}</p>
                    <p className="text-xs text-text-muted">{config.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
