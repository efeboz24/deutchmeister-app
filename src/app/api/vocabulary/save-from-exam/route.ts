import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  word: z.string().min(1).max(200),
  meaning: z.string().min(1).max(500),
  levelName: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const { word, meaning, levelName } = parsed.data;
  const userId = session.user.id;

  const level = await prisma.level.findUnique({ where: { name: levelName } });
  if (!level) return NextResponse.json({ error: "Seviye bulunamadı" }, { status: 404 });

  // Find existing vocab for this word at this level, or create it
  let vocab = await prisma.vocabulary.findFirst({
    where: { word: { equals: word }, levelId: level.id },
  });

  if (!vocab) {
    vocab = await prisma.vocabulary.create({
      data: { word, meaning, levelId: level.id, exampleSentence: "", partOfSpeech: "" },
    });
  }

  // Enroll in UserVocabulary if not already there
  const existing = await prisma.userVocabulary.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId: vocab.id } },
  });

  if (!existing) {
    await prisma.userVocabulary.create({
      data: {
        userId,
        vocabularyId: vocab.id,
        confidenceLevel: 2.5,
        interval: 1,
        repetitions: 0,
        nextReviewDate: new Date(),
      },
    });
  }

  return NextResponse.json({ ok: true, alreadyExists: !!existing });
}
