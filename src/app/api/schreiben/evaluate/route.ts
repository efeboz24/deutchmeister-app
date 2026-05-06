import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

const schema = z.object({
  level: z.string(),
  aufgabeId: z.number(),
  context: z.string(),
  addressee: z.string(),
  bullets: z.array(z.string()),
  wordTarget: z.number(),
  userText: z.string().min(1).max(5000),
  xp: z.number().min(1).max(200),
});

export interface SchreibenEvalResult {
  score: number;
  criteriaScores: { inhalt: number; sprache: number; struktur: number };
  bulletCoverage: boolean[];
  corrections: { original: string; corrected: string; explanation: string }[];
  correctedVersion: string;
  summaryTr: string;
  earnedXP: number;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function fallbackResult(bulletCount: number, xp: number): SchreibenEvalResult {
  return {
    score: 50,
    criteriaScores: { inhalt: 50, sprache: 50, struktur: 50 },
    bulletCoverage: Array(bulletCount).fill(true) as boolean[],
    corrections: [],
    correctedVersion: "",
    summaryTr: "Değerlendirme şu an yapılamadı. Lütfen tekrar deneyin.",
    earnedXP: Math.round(xp * 0.5),
  };
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });

  const { level, context, addressee, bullets, wordTarget, userText, xp } = parsed.data;

  const levelLabel = level.toUpperCase();
  const isB1 = levelLabel === "B1";
  const isB2 = levelLabel === "B2";
  const isC1 = levelLabel === "C1";

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-your-key-here") {
    return NextResponse.json(fallbackResult(bullets.length, xp));
  }

  const wordCount = countWords(userText);

  let structureNote: string;
  let wordNote: string;
  let maxCorrections: number;
  let summaryLength: string;

  if (isC1) {
    structureNote = `Yapı (Struktur): Mantıklı giriş, gelişme (argümanlar ve karşı argümanlar) ve sonuç bölümü var mı? Paragraflar arası geçişler ve bağlantı unsurları kullanılmış mı? Metin bütünlüğü (Kohäsion/Kohärenz) sağlanmış mı?`;
    wordNote = `Metin en az 280 kelime içermeli; ~350 kelime ideal. Kısa metinler içerik ve yapı puanını önemli ölçüde düşürür.`;
    maxCorrections = 6;
    summaryLength = "4-5";
  } else if (isB2) {
    structureNote = `Yapı (Struktur): Betreff (konu satırı) var mı? Uygun halbformelle Anrede (z.B. "Sehr geehrte/r" veya "Guten Tag")? Einleitung, Hauptteil, Schluss ayrımı? Uygun Schlussformel (z.B. "Mit freundlichen Grüßen")? Dil halbformell mi (çok resmi ya da çok samimi değil)?`;
    wordNote = `Metin en az 150 kelime içermeli. Çok kısa metinler Inhalt ve Struktur puanını düşürür.`;
    maxCorrections = 6;
    summaryLength = "3-4";
  } else if (isB1) {
    structureNote = `Yapı (Struktur): Uygun selamlama (Anrede) ve kapanış (Schluss) var mı? E-posta akıcı bir şekilde yazılmış mı? Paragraflar düzenli mi? (Not: Betreff/Absenderadresse B1'de gerekli değil)`;
    wordNote = `Metin hedef kelime sayısına yakın olmalı (~80-120 kelime). Tüm 4 madde ele alınmış mı?`;
    maxCorrections = 4;
    summaryLength = "2-3";
  } else {
    structureNote = `Yapı (Struktur): Uygun açılış, kapanış ve akış`;
    wordNote = `Metin hedef kelime sayısına yakın olmalı.`;
    maxCorrections = 4;
    summaryLength = "2-3";
  }

  const languageNote = isC1
    ? "Dil (Sprache): Dilbilgisi doğruluğu, zengin ve çeşitli kelime dağarcığı, karmaşık cümle yapıları, C1 düzeyine uygun anlatım"
    : isB2
    ? "Dil (Sprache): Dilbilgisi, kelime çeşitliliği ve doğruluğu, karmaşık cümle yapıları"
    : "Dil (Sprache): Dilbilgisi ve kelime doğruluğu";

  const taskDescription = isC1
    ? "Öğrencinin yazdığı Erörterung/Stellungnahme metnini değerlendiriyorsun. Bu C1 düzeyinde bir argümantasyon yazısıdır."
    : `Öğrencinin yazdığı ${isB2 ? "halbformelle E-Mail" : isB1 ? "informelle/halbformelle E-Mail" : "kısa mektup/mesaj"}ı değerlendiriyorsun.`;

  const systemPrompt = `Sen bir TELC ${levelLabel} Almanca sınavı yazma bölümü değerlendiricisin.
${taskDescription} Üç kritere göre değerlendiriyorsun:
- İçerik (Inhalt): ${isC1 ? "Konu yeterince işlenmiş mi? Argümanlar ve karşı argümanlar sunulmuş mu? Kendi görüş açıklanmış mı?" : "Verilen maddelerin hepsi ele alınmış mı? Yeterince detaylı mı?"}
- ${languageNote}
- ${structureNote}

${wordNote}

Her kriter 0-100 puan alır. Genel puan = (inhalt*0.4 + sprache*0.4 + struktur*0.2).

SADECE geçerli JSON döndür, başka hiçbir şey yazma:
{
  "score": <0-100>,
  "criteriaScores": { "inhalt": <0-100>, "sprache": <0-100>, "struktur": <0-100> },
  "bulletCoverage": [<true/false per bullet>],
  "corrections": [{ "original": "...", "corrected": "...", "explanation": "..." }],
  "correctedVersion": "...",
  "summaryTr": "..."
}

corrections: sadece önemli hatalar (max ${maxCorrections}), explanation Türkçe olsun.
correctedVersion: tam düzeltilmiş metin (eğer metin zaten iyiyse aynen yaz).
summaryTr: ${summaryLength} cümle Türkçe genel yorum.`;

  const userPrompt = isC1
    ? `SEVİYE: ${levelLabel}
GÖREV: ${context}
DEĞERLENDIRME KRİTERLERİ:
${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}
HEDEF KELİME SAYISI: ~${wordTarget}

ÖĞRENCİNİN YAZISI (${wordCount} kelime):
${userText}`
    : `SEVİYE: ${levelLabel}
GÖREV BAĞLAMI: ${context}
ALICI: ${addressee}
ELE ALINMASI GEREKEN MADDELER:
${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}
HEDEF KELİME SAYISI: ~${wordTarget}

ÖĞRENCİNİN YAZISI (${wordCount} kelime):
${userText}`;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: isC1 ? 2500 : isB2 ? 2000 : 1200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const data = JSON.parse(jsonMatch[0]) as Omit<SchreibenEvalResult, "earnedXP">;
    const earnedXP = Math.round((data.score / 100) * xp);

    return NextResponse.json({ ...data, earnedXP } satisfies SchreibenEvalResult);
  } catch (err) {
    console.error("[schreiben/evaluate] error:", err);
    return NextResponse.json(fallbackResult(bullets.length, xp));
  }
}
