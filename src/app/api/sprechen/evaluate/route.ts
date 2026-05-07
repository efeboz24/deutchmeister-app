import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

const schema = z.object({
  level: z.string(),
  aufgabeId: z.string(),
  type: z.string(),
  prompt: z.string(),
  transcript: z.string().min(1).max(3000),
  xp: z.number().min(1).max(200),
});

export interface SprechenEvalResult {
  score: number;
  criteriaScores: { inhalt: number; grammatik: number; wortschatz: number; aufgabe: number };
  corrections: { original: string; corrected: string; explanation: string }[];
  summaryTr: string;
  earnedXP: number;
}

function fallbackResult(xp: number): SprechenEvalResult {
  return {
    score: 50,
    criteriaScores: { inhalt: 50, grammatik: 50, wortschatz: 50, aufgabe: 50 },
    corrections: [],
    summaryTr: "Değerlendirme şu an yapılamadı. Lütfen tekrar deneyin.",
    earnedXP: Math.round(xp * 0.5),
  };
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });

  const { level, type, prompt: taskPrompt, transcript, xp } = parsed.data;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-your-key-here") {
    return NextResponse.json(fallbackResult(xp));
  }

  const levelLabel = level.toUpperCase();
  const isAdvanced = ["B2", "C1"].includes(levelLabel);
  const maxCorrections = isAdvanced ? 5 : 3;

  const systemPrompt = `Sen bir TELC ${levelLabel} Almanca sınavı konuşma bölümü değerlendiricisin.
Öğrencinin konuştuğu metnin transkripsiyonunu değerlendiriyorsun (Web Speech API ile kaydedilmiş).
Görev tipi: ${type}

Dört kritere göre değerlendir (0-100 puan):
- Aufgabenerfüllung (aufgabe): Görev eksiksiz yerine getirilmiş mi? Tüm istenen noktalar ele alındı mı?
- Inhalt: İçerik zengin ve ilgili mi? Yeterli detay var mı?
- Grammatik: Dilbilgisi hataları var mı? Cümle yapıları doğru mu?
- Wortschatz: Kelime çeşitliliği ve uygunluğu. ${levelLabel} seviyesine uygun kelimeler kullanılmış mı?

Genel puan = (aufgabe*0.35 + inhalt*0.25 + grammatik*0.25 + wortschatz*0.15)

SADECE geçerli JSON döndür, başka hiçbir şey yazma:
{
  "score": <0-100>,
  "criteriaScores": { "inhalt": <0-100>, "grammatik": <0-100>, "wortschatz": <0-100>, "aufgabe": <0-100> },
  "corrections": [{ "original": "...", "corrected": "...", "explanation": "..." }],
  "summaryTr": "..."
}

corrections: sadece önemli hatalar (max ${maxCorrections}), explanation Türkçe.
summaryTr: 2-3 cümle Türkçe genel yorum, güçlü ve geliştirilmesi gereken yönleri belirt.`;

  const userPrompt = `SEVİYE: ${levelLabel}
GÖREV:
${taskPrompt}

ÖĞRENCİNİN KONUŞMASI (transkripsiyon, ${transcript.split(/\s+/).length} kelime):
${transcript}`;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON");

    const data = JSON.parse(jsonMatch[0]) as Omit<SprechenEvalResult, "earnedXP">;
    const earnedXP = Math.round((data.score / 100) * xp);

    return NextResponse.json({ ...data, earnedXP } satisfies SprechenEvalResult);
  } catch (err) {
    console.error("[sprechen/evaluate]", err);
    return NextResponse.json(fallbackResult(xp));
  }
}
