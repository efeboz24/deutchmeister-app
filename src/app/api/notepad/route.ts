import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const record = await prisma.userNotepad.findUnique({
      where: { userId: session.user.id },
      select: { tabs: true },
    });
    return NextResponse.json({ tabs: record?.tabs ?? "[]" });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

const putSchema = z.object({ tabs: z.string() });

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = putSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  try {
    await prisma.userNotepad.upsert({
      where: { userId: session.user.id },
      update: { tabs: parsed.data.tabs },
      create: { userId: session.user.id, tabs: parsed.data.tabs },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
