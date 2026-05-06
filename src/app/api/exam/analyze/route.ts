import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

const schema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      correctAnswer: z.string(),
      userAnswer: z.string(),
      sectionCategory: z.string(),
      sectionTeil: z.number(),
      options: z.array(z.string()),
      isCorrect: z.boolean(),
    })
  ),
  bySection: z.array(
    z.object({
      title: z.string(),
      category: z.string(),
      correct: z.number(),
      total: z.number(),
    })
  ),
  writingFeedbacks: z.record(z.string(), z.string()).optional(),
});

export interface AnalysisResult {
  questionExplanations: Record<string, string>;
  weakTopics: string[];
  importantVocabulary: Array<{ word: string; meaning: string }>;
  overallFeedback: string;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });

  const { questions, bySection, writingFeedbacks } = parsed.data;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-your-key-here") {
    return NextResponse.json({ analysis: buildFallback(questions) });
  }

  try {
    const client = new Anthropic({ apiKey });

    const sectionSummary = bySection
      .map((s) => `${s.title}: ${s.correct}/${s.total} (${s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0}%)`)
      .join(", ");

    const questionData = questions.map((q) => ({
      id: q.id,
      kategori: q.sectionCategory,
      teil: q.sectionTeil,
      soru: q.text,
      dogruCevap: q.correctAnswer,
      ogrenciCevap: q.userAnswer || "(boş)",
      dogru: q.isCorrect,
      ...(q.sectionCategory === "Schreiben" && writingFeedbacks?.[q.id]
        ? { yazmaGeribildirimi: writingFeedbacks[q.id] }
        : {}),
    }));

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: `Sen deneyimli bir Almanca öğretmenisin. Öğrencinin sınav sonucunu analiz et.

SADECE aşağıdaki JSON formatında döndür, başka hiçbir şey yazma:
{
  "questionExplanations": {
    "soru_id": "Bu soruyu kısa Türkçe açıkla: ne test ediyor ve doğru cevap neden doğru (1-2 cümle)"
  },
  "weakTopics": ["max 4 madde — öğrencinin zayıf olduğu gramer veya kelime konuları, Türkçe"],
  "importantVocabulary": [
    {"word": "Almanca kelime veya ifade", "meaning": "Türkçe anlam"}
  ],
  "overallFeedback": "2-3 cümle yapıcı ve motive edici Türkçe değerlendirme"
}

importantVocabulary: sınavda geçen ve öğrencinin öğrenmesi gereken önemli kelimeler, maksimum 8 kelime.
Her açıklama kısa ve öğretici olsun.`,
      messages: [
        {
          role: "user",
          content: `Bölüm özeti: ${sectionSummary}\n\nSorular:\n${JSON.stringify(questionData)}`,
        },
      ],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "{}";
    const analysis = JSON.parse(text.trim()) as AnalysisResult;

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("[exam/analyze] AI analysis failed:", err);
    return NextResponse.json({ analysis: buildFallback(questions) });
  }
}

function buildFallback(questions: z.infer<typeof schema>["questions"]): AnalysisResult {
  const explanations: Record<string, string> = {};
  for (const q of questions) {
    explanations[q.id] = `Doğru cevap: ${q.correctAnswer}`;
  }
  return {
    questionExplanations: explanations,
    weakTopics: [],
    importantVocabulary: [],
    overallFeedback: "Sınavı tamamladın. Yanlış cevapları inceleyerek tekrar çalışmaya devam et.",
  };
}
