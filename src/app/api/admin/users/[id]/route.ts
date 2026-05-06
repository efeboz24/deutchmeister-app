import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ role: z.enum(["admin", "student"]) });

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userRole = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user?.id || userRole !== "admin") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json({ error: "Kendi rolünüzü değiştiremezsiniz" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id }, select: { id: true } });
  if (!target) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

  const updated = await prisma.user.update({
    where: { id },
    data: { role: parsed.data.role },
    select: { role: true },
  });

  return NextResponse.json({ ok: true, role: updated.role });
}
