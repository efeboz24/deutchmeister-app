import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SentenceWritingTask } from "./SentenceWritingTask";

export default async function CumlelerPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const learnedVocab = await prisma.userVocabulary.findMany({
    where: {
      userId,
      repetitions: { gt: 0 },
    },
    include: {
      vocabulary: { select: { word: true, meaning: true } },
    },
    orderBy: { lastReviewedAt: "desc" },
    take: 12,
  });

  const words = learnedVocab.map((uv) => ({
    word: uv.vocabulary.word,
    meaning: uv.vocabulary.meaning,
  }));

  return (
    <div className="py-4">
      <SentenceWritingTask words={words} />
    </div>
  );
}
