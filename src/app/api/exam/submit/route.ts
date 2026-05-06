import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  examId: z.string(),
  score: z.number().min(0).max(100),
  passed: z.boolean(),
  correctCount: z.number().int().min(0),
  totalCount: z.number().int().min(0),
}).refine((d) => d.correctCount <= d.totalCount, {
  message: "correctCount cannot exceed totalCount",
  path: ["correctCount"],
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const { examId, score, passed, correctCount, totalCount } = parsed.data;

  try {
    const exam = await prisma.mockExam.findUnique({ where: { id: examId }, select: { id: true } });
    if (!exam) return NextResponse.json({ error: "Sınav bulunamadı" }, { status: 404 });

    const feedback = JSON.stringify({ correctCount, totalCount });

    await prisma.userExamAttempt.create({
      data: { userId: session.user.id, examId, score, passed, feedback },
    });

    const xp = passed ? 100 : 30;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { totalXP: { increment: xp } },
    });

    return NextResponse.json({ ok: true, xp });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
