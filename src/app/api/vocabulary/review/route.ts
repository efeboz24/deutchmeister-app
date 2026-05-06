import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateNextReview } from "@/lib/srs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// GET /api/vocabulary/review?level=A1&limit=20
// Returns due cards for the session, auto-enrolls new cards if needed
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);
  const levelFilter = searchParams.get("level"); // e.g. "A1", "A2", or null = all
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);

  // Find vocabularies the user doesn't have a UserVocabulary record for yet,
  // filtered by level, and auto-enroll up to `limit` of them.
  const levelWhere = levelFilter
    ? { level: { name: levelFilter } }
    : {};

  try {
    const alreadyEnrolledIds = await prisma.userVocabulary.findMany({
      where: { userId },
      select: { vocabularyId: true },
    });
    const enrolledSet = new Set(alreadyEnrolledIds.map((r) => r.vocabularyId));

    const newVocabs = await prisma.vocabulary.findMany({
      where: {
        ...levelWhere,
        id: { notIn: enrolledSet.size > 0 ? [...enrolledSet] : [] },
      },
      take: limit,
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

    // Now fetch due cards (nextReviewDate <= now)
    const dueCards = await prisma.userVocabulary.findMany({
      where: {
        userId,
        nextReviewDate: { lte: new Date() },
        ...(levelFilter
          ? { vocabulary: { level: { name: levelFilter } } }
          : {}),
      },
      include: {
        vocabulary: {
          include: { level: { select: { name: true } } },
        },
      },
      orderBy: { nextReviewDate: "asc" },
      take: limit,
    });

    return NextResponse.json({ cards: dueCards });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

const reviewSchema = z.object({
  userVocabularyId: z.string().min(1),
  quality: z.union([
    z.literal(0), z.literal(1), z.literal(2),
    z.literal(3), z.literal(4), z.literal(5),
  ]),
});

// POST /api/vocabulary/review
// Body: { userVocabularyId: string, quality: 0|1|2|3|4|5 }
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const parsed = reviewSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });

  const { userVocabularyId, quality } = parsed.data;

  try {
    const uv = await prisma.userVocabulary.findFirst({
      where: { id: userVocabularyId, userId },
    });

    if (!uv) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { newInterval, newConfidenceLevel, nextReviewDate, newRepetitions } =
      calculateNextReview(quality, uv.confidenceLevel, uv.interval, uv.repetitions);

    const updated = await prisma.userVocabulary.update({
      where: { id: userVocabularyId },
      data: {
        interval: newInterval,
        confidenceLevel: newConfidenceLevel,
        nextReviewDate,
        repetitions: newRepetitions,
        lastReviewedAt: new Date(),
        ...(quality >= 4 ? { learned: true } : {}),
      },
    });

    return NextResponse.json({ updated });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
