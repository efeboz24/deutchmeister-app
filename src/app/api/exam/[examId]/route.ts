import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { examId } = await params;

  const exam = await prisma.mockExam.findUnique({
    where: { id: examId },
    include: { level: { select: { name: true } } },
  });

  if (!exam) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  let content: { sections?: unknown[]; passingScore?: number } = {};
  try { content = JSON.parse(exam.content); } catch { /* empty */ }

  return NextResponse.json({
    data: {
      name: exam.name,
      duration: exam.duration,
      levelName: exam.level.name,
      sections: content.sections ?? [],
      passingScore: content.passingScore ?? 60,
    },
  });
}
