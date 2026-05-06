import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const putSchema = z.object({
  data: z.string(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const record = await prisma.userMistakes.findUnique({
      where: { userId: session.user.id },
      select: { data: true },
    });
    return NextResponse.json({ data: record?.data ?? "[]" });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = putSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  try {
    await prisma.userMistakes.upsert({
      where: { userId: session.user.id },
      update: { data: parsed.data.data },
      create: { userId: session.user.id, data: parsed.data.data },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
