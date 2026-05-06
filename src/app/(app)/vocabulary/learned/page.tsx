import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

const LEVEL_COLORS: Record<string, string> = {
  A1: "text-emerald-400",
  A2: "text-blue-400",
  B1: "text-yellow-400",
  B2: "text-orange-400",
  C1: "text-red-400",
};

export default async function LearnedWordsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const userExists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!userExists) redirect("/login");

  const learnedRecords = await prisma.userVocabulary.findMany({
    where: { userId, learned: true },
    include: {
      vocabulary: {
        include: { level: { select: { name: true } } },
      },
    },
    orderBy: { lastReviewedAt: "desc" },
  });

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
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Star className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Öğrenilen Kelimeler</h1>
          <p className="text-xs text-text-secondary">{learnedRecords.length} kelime öğrenildi</p>
        </div>
      </div>

      {learnedRecords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
            <Star className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Henüz öğrenilen kelime yok</h2>
          <p className="text-text-secondary text-sm">Kelime kartlarında "Biliyorum" butonuna bastıkça buraya eklenecek.</p>
          <Link
            href="/vocabulary"
            className="mt-6 px-4 py-2 rounded-xl bg-gold text-navy font-semibold text-sm hover:bg-gold/90 transition-colors"
          >
            Kelime Kartlarına Git
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {learnedRecords.map((record, idx) => {
            const word = record.vocabulary;
            const levelName = word.level.name;
            const colorClass = LEVEL_COLORS[levelName] ?? "text-gold";

            return (
              <div
                key={record.id}
                className="bg-navy-card border border-navy-border rounded-xl p-4 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-text-muted font-mono">{idx + 1}</span>
                      <h3 className="text-base font-bold text-text-primary">{word.word}</h3>
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded bg-navy-light ${colorClass}`}>
                        {levelName}
                      </span>
                      {word.partOfSpeech && (
                        <span className="text-xs text-text-muted bg-navy-light px-1.5 py-0.5 rounded">
                          {word.partOfSpeech}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-emerald-400 mb-1">{word.meaning}</p>
                    {word.exampleSentence && (
                      <p className="text-xs text-text-secondary italic">„{word.exampleSentence}"</p>
                    )}
                  </div>
                  <Star className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
