import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

const schema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      questionText: z.string(),
      sectionInstructions: z.string(),
      teil: z.number(),
      userAnswer: z.string(),
      expectedAnswer: z.string(),
    })
  ),
});

export interface WritingEvalResult {
  correct: boolean;
  score: number;
  feedback: string;
}

function fallbackEval(answers: z.infer<typeof schema>["answers"]): Record<string, WritingEvalResult> {
  const result: Record<string, WritingEvalResult> = {};
  for (const a of answers) {
    const isMatch =
      a.userAnswer.trim().toLowerCase() === a.expectedAnswer.trim().toLowerCase();
    result[a.questionId] = {
      correct: isMatch,
      score: isMatch ? 100 : 0,
      feedback: isMatch
        ? "Doğru cevap!"
        : `Beklenen cevap: "${a.expectedAnswer}"`,
    };
  }
  return result;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const { answers } = parsed.data;
  if (answers.length === 0) return NextResponse.json({ evaluations: {} });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-your-key-here") {
    return NextResponse.json({ evaluations: fallbackEval(answers) });
  }

  try {
    const client = new Anthropic({ apiKey });

    const questionsJson = JSON.stringify(
      answers.map((a) => ({
        questionId: a.questionId,
        teil: a.teil,
        sectionInstructions: a.sectionInstructions,
        questionText: a.questionText,
        userAnswer: a.userAnswer,
        expectedAnswer: a.expectedAnswer,
      }))
    );

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: `Sen bir Almanca dil sınavı değerlendiricisin. Öğrencilerin yazma cevaplarını değerlendiriyorsun.
Sana JSON formatında sorular ve cevaplar verilecek. Her biri için değerlendirme yapman gerekiyor.

Kurallar:
- Teil 1 (form doldurma): Beklenen cevapla büyük/küçük harf ve boşluk farkı gözetmeden karşılaştır. Doğruysa score:100, yanlışsa score:0.
- Teil 2 ve üzeri (metin/mesaj yazma): İçerik, Almanca dilbilgisi ve görev gereksinimleri açısından değerlendir. Kısmi doğruluk için oranlı puan ver (0-100). correct = (score >= 60).
- Geri bildirim kısa ve Türkçe olsun (1-2 cümle).

SADECE JSON döndür, başka hiçbir şey yazma:
[{"questionId":"...","correct":true,"score":100,"feedback":"..."}]`,
      messages: [
        {
          role: "user",
          content: questionsJson,
        },
      ],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "[]";
    const parsed2 = JSON.parse(text) as { questionId: string; correct: boolean; score: number; feedback: string }[];

    const evaluations: Record<string, WritingEvalResult> = {};
    for (const item of parsed2) {
      evaluations[item.questionId] = {
        correct: item.correct,
        score: item.score,
        feedback: item.feedback,
      };
    }

    // Ensure every answer has an evaluation (fallback for any missing)
    for (const a of answers) {
      if (!evaluations[a.questionId]) {
        const fb = fallbackEval([a]);
        evaluations[a.questionId] = fb[a.questionId];
      }
    }

    return NextResponse.json({ evaluations });
  } catch (err) {
    console.error("[exam/evaluate-writing] AI evaluation failed:", err);
    return NextResponse.json({ evaluations: fallbackEval(answers) });
  }
}
