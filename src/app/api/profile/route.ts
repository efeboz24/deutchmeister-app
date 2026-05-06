import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(50).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6).max(72).optional(),
});

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const { name, currentPassword, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });
  if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

  const updateData: { name?: string; password?: string } = {};

  if (name) updateData.name = name;

  if (newPassword) {
    if (!currentPassword) return NextResponse.json({ error: "Mevcut şifre gerekli" }, { status: 400 });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return NextResponse.json({ error: "Mevcut şifre yanlış" }, { status: 400 });
    updateData.password = await bcrypt.hash(newPassword, 12);
  }

  if (Object.keys(updateData).length === 0) return NextResponse.json({ error: "Güncellenecek alan yok" }, { status: 400 });

  try {
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: { name: true },
    });
    return NextResponse.json({ ok: true, name: updated.name });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
