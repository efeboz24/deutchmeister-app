import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

const VALID_LEVELS = ["A1", "A2", "B1", "B2", "C1"];

const LEVEL_COLORS: Record<string, string> = {
  A1: "text-emerald-400",
  A2: "text-blue-400",
  B1: "text-yellow-400",
  B2: "text-orange-400",
  C1: "text-red-400",
};

interface PageProps {
  params: Promise<{ level: string }>;
}

export default async function BrowseLevelPage({ params }: PageProps) {
  const { level } = await params;
  const levelName = level.toUpperCase();

  if (!VALID_LEVELS.includes(levelName)) notFound();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const levelRecord = await prisma.level.findUnique({
    where: { name: levelName },
    select: { id: true, name: true, displayName: true },
  });
  if (!levelRecord) notFound();

  const words = await prisma.vocabulary.findMany({
    where: { levelId: levelRecord.id },
    orderBy: { id: "asc" },
  });

  const colorClass = LEVEL_COLORS[levelName] ?? "text-gold";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/vocabulary"
          className="w-9 h-9 rounded-xl bg-navy-card border border-navy-border flex items-center justify-center hover:border-gold/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" />
        </Link>
        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">
            <span className={colorClass}>{levelName}</span> Kelime Listesi
          </h1>
          <p className="text-xs text-text-secondary">{words.length} kelime · {levelRecord.displayName}</p>
        </div>
      </div>

      {/* Word grid */}
      <div className="grid gap-3">
        {words.map((word, idx) => (
          <div
            key={word.id}
            className="bg-navy-card border border-navy-border rounded-xl p-4 hover:border-gold/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text-muted font-mono">{idx + 1}</span>
                  <h3 className="text-base font-bold text-text-primary">{word.word}</h3>
                  {word.partOfSpeech && (
                    <span className="text-xs text-text-muted bg-navy-light px-1.5 py-0.5 rounded">
                      {word.partOfSpeech}
                    </span>
                  )}
                </div>
                <p className={`text-sm font-medium ${colorClass} mb-1`}>{word.meaning}</p>
                {word.exampleSentence && (
                  <p className="text-xs text-text-secondary italic">„{word.exampleSentence}"</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {words.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          Bu seviyede henüz kelime bulunmuyor.
        </div>
      )}
    </div>
  );
}
