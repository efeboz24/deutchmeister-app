import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type GrammarProgressMap = Record<string, string[]>;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const record = await prisma.userGrammarProgress.findUnique({
      where: { userId: session.user.id },
    });
    const progress: GrammarProgressMap = record ? JSON.parse(record.progress) : {};
    return NextResponse.json({ progress });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

const putSchema = z.object({
  level: z.string().min(1),
  topicId: z.string().min(1),
  completed: z.boolean(),
});

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const parsed = putSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });

  const { level, topicId, completed } = parsed.data;
  const userId = session.user.id;

  try {
    const existing = await prisma.userGrammarProgress.findUnique({ where: { userId } });
    const progress: GrammarProgressMap = existing ? JSON.parse(existing.progress) : {};

    const levelKey = level.toLowerCase();
    const current = new Set(progress[levelKey] ?? []);

    if (completed) {
      current.add(topicId);
    } else {
      current.delete(topicId);
    }

    progress[levelKey] = Array.from(current);

    await prisma.userGrammarProgress.upsert({
      where: { userId },
      update: { progress: JSON.stringify(progress) },
      create: { userId, progress: JSON.stringify(progress) },
    });

    return NextResponse.json({ progress });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
