import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FlashcardSession } from "@/components/vocabulary/FlashcardSession";
import { LevelTabs } from "@/components/vocabulary/LevelTabs";
import { LevelBrowser } from "@/components/vocabulary/LevelBrowser";
import { Layers } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ level?: string }>;
}

async function VocabularyContent({ levelFilter }: { levelFilter: string | undefined }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const userExists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!userExists) {
    await signOut({ redirectTo: "/login" });
    return null;
  }

  const levelName = levelFilter ?? null;

  // Auto-enroll: max 10 new cards per visit
  const alreadyEnrolled = await prisma.userVocabulary.findMany({
    where: { userId },
    select: { vocabularyId: true },
  });
  const enrolledIds = new Set(alreadyEnrolled.map((r) => r.vocabularyId));

  const newVocabs = await prisma.vocabulary.findMany({
    where: {
      id: { notIn: enrolledIds.size > 0 ? [...enrolledIds] : [] },
      ...(levelName ? { level: { name: levelName } } : {}),
    },
    take: 10,
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
  });

  if (newVocabs.length > 0) {
    await prisma.userVocabulary.createMany({
      data: newVocabs.map((v) => ({
        userId,
        vocabularyId: v.id,
        confidenceLevel: 2.5,
        interval: 1,
        repetitions: 0,
        nextReviewDate: new Date(),
      })),
    });
  }

  // Fetch exactly 10 due cards
  const dueCards = await prisma.userVocabulary.findMany({
    where: {
      userId,
      nextReviewDate: { lte: new Date() },
      ...(levelName ? { vocabulary: { level: { name: levelName } } } : {}),
    },
    include: {
      vocabulary: {
        include: { level: { select: { name: true } } },
      },
    },
    orderBy: { nextReviewDate: "asc" },
    take: 10,
  });

  // Stats
  const [learnedCount, totalInLevel, totalInDB] = await Promise.all([
    prisma.userVocabulary.count({ where: { userId, learned: true } }),
    prisma.vocabulary.count({
      where: levelName ? { level: { name: levelName } } : {},
    }),
    prisma.vocabulary.count(),
  ]);

  // Level stats for browser panel
  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const levelCounts = await Promise.all(
    levels.map(async (lvl) => ({
      name: lvl,
      count: await prisma.vocabulary.count({ where: { level: { name: lvl } } }),
    }))
  );

  const serialized = dueCards.map((c) => ({
    id: c.id,
    vocabulary: {
      word: c.vocabulary.word,
      meaning: c.vocabulary.meaning,
      exampleSentence: c.vocabulary.exampleSentence,
      partOfSpeech: c.vocabulary.partOfSpeech,
      level: { name: c.vocabulary.level.name },
    },
  }));

  // Shuffle when "Tümü" is selected so cards come from different levels
  if (!levelName) {
    for (let i = serialized.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [serialized[i], serialized[j]] = [serialized[j], serialized[i]];
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Flashcard session with stats */}
      <div className="flex-1 min-w-0">
        <FlashcardSession
          key={levelName ?? "all"}
          initialCards={serialized}
          levelFilter={levelName ?? "all"}
          initialLearnedCount={learnedCount}
          totalInLevel={totalInLevel}
          totalInDB={totalInDB}
          dueCount={Math.min(dueCards.length, 10)}
        />
      </div>

      {/* Right: Level browser */}
      <div className="lg:w-56 shrink-0">
        <LevelBrowser levelCounts={levelCounts} />
      </div>
    </div>
  );
}

export default async function VocabularyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const levelFilter = params.level;
  const activeTab = levelFilter ?? "Tümü";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
          <Layers className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Kelime Kartları</h1>
          <p className="text-xs text-text-secondary">SM-2 algoritmasıyla akıllı tekrar</p>
        </div>
      </div>

      {/* Level filter tabs */}
      <Suspense fallback={null}>
        <LevelTabs active={activeTab} />
      </Suspense>

      {/* Content */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <VocabularyContent levelFilter={levelFilter} />
      </Suspense>
    </div>
  );
}
