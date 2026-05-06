import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  level: z.enum(["A1", "A2", "B1", "B2", "C1"]).default("A1"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz bilgiler." }, { status: 400 });
    }

    const { name, email, password, level } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Bu e-posta zaten kayıtlı." }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        currentLevel: level,
      },
    });

    // Başlangıç beceri puanları oluştur
    await prisma.userProgress.createMany({
      data: ["horen", "lesen", "schreiben", "sprechen", "grammatik"].map((skill) => ({
        userId: user.id,
        skill,
        score: 0,
      })),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
