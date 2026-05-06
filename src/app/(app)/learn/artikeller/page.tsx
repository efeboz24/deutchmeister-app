"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  ChevronDown,
  CheckCircle,
  Lightbulb,
  Star,
  Layers,
  Target,
  Trophy,
  Zap,
  Link2,
} from "lucide-react";
import PracticeSection, { SpeakBtn } from "./PracticeSection";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

// ── Color system ──────────────────────────────────────────────────────────────
const G = {
  maskulin: {
    label: "DER",
    header: "Maskulin",
    text: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/40",
    ring: "ring-blue-500/30",
    dot: "bg-blue-400",
    bar: "bg-blue-500",
  },
  feminin: {
    label: "DIE",
    header: "Feminin",
    text: "text-pink-400",
    bg: "bg-pink-500/15",
    border: "border-pink-500/40",
    ring: "ring-pink-500/30",
    dot: "bg-pink-400",
    bar: "bg-pink-500",
  },
  neutrum: {
    label: "DAS",
    header: "Neutrum",
    text: "text-violet-400",
    bg: "bg-violet-500/15",
    border: "border-violet-500/40",
    ring: "ring-violet-500/30",
    dot: "bg-violet-400",
    bar: "bg-violet-500",
  },
  plural: {
    label: "DIE",
    header: "Plural",
    text: "text-green-400",
    bg: "bg-green-500/15",
    border: "border-green-500/40",
    ring: "ring-green-500/30",
    dot: "bg-green-400",
    bar: "bg-green-500",
  },
} as const;

type Gender = keyof typeof G;

// ── Bestimmte Artikel table ───────────────────────────────────────────────────
const bestimmte = [
  { kasus: "Nominativ", tip: "Wer/Was? · Kim/Ne?", maskulin: "der", feminin: "die", neutrum: "das", plural: "die", changed: [] as Gender[] },
  { kasus: "Akkusativ", tip: "Wen/Was? · Kimi/Neyi?", maskulin: "den", feminin: "die", neutrum: "das", plural: "die", changed: ["maskulin"] as Gender[] },
  { kasus: "Dativ", tip: "Wem? · Kime?", maskulin: "dem", feminin: "der", neutrum: "dem", plural: "den", changed: ["maskulin", "feminin", "neutrum", "plural"] as Gender[] },
  { kasus: "Genitiv", tip: "Wessen? · Kimin?", maskulin: "des", feminin: "der", neutrum: "des", plural: "der", changed: ["maskulin", "feminin", "neutrum", "plural"] as Gender[] },
];

// ── Unbestimmte Artikel table ─────────────────────────────────────────────────
const unbestimmte = [
  { kasus: "Nominativ", tip: "Wer/Was?", maskulin: "ein", feminin: "eine", neutrum: "ein", plural: "—", changed: [] as Gender[] },
  { kasus: "Akkusativ", tip: "Wen/Was?", maskulin: "einen", feminin: "eine", neutrum: "ein", plural: "—", changed: ["maskulin"] as Gender[] },
  { kasus: "Dativ", tip: "Wem?", maskulin: "einem", feminin: "einer", neutrum: "einem", plural: "—", changed: ["maskulin", "feminin", "neutrum"] as Gender[] },
  { kasus: "Genitiv", tip: "Wessen?", maskulin: "eines", feminin: "einer", neutrum: "eines", plural: "—", changed: ["maskulin", "feminin", "neutrum"] as Gender[] },
];

// ── Suffix rules ──────────────────────────────────────────────────────────────
const suffixRules: { gender: Gender; certainty: string; suffixes: { s: string; ex: string; note?: string }[] }[] = [
  {
    gender: "maskulin",
    certainty: "~90%",
    suffixes: [
      { s: "-er", ex: "der Lehrer, der Fahrer", note: "Eylem yapanlar" },
      { s: "-el", ex: "der Schlüssel, der Mantel" },
      { s: "-en", ex: "der Wagen, der Hafen", note: "İstisna var" },
      { s: "-ling", ex: "der Frühling, der Lehrling", note: "%100" },
      { s: "-ismus", ex: "der Tourismus, der Realismus", note: "%100" },
      { s: "-ist", ex: "der Tourist, der Journalist", note: "%100" },
      { s: "-or", ex: "der Motor, der Professor" },
    ],
  },
  {
    gender: "feminin",
    certainty: "%100",
    suffixes: [
      { s: "-ung", ex: "die Zeitung, die Meinung", note: "KESINLIKLE!" },
      { s: "-heit", ex: "die Freiheit, die Gesundheit", note: "KESINLIKLE!" },
      { s: "-keit", ex: "die Möglichkeit, die Freundlichkeit", note: "KESINLIKLE!" },
      { s: "-schaft", ex: "die Freundschaft, die Gesellschaft", note: "KESINLIKLE!" },
      { s: "-tion", ex: "die Station, die Nation", note: "KESINLIKLE!" },
      { s: "-tät", ex: "die Qualität, die Universität", note: "KESINLIKLE!" },
      { s: "-ie", ex: "die Energie, die Demokratie", note: "KESINLIKLE!" },
      { s: "-ik", ex: "die Musik, die Physik", note: "KESINLIKLE!" },
      { s: "-in", ex: "die Lehrerin, die Ärztin", note: "Dişi meslekler" },
    ],
  },
  {
    gender: "neutrum",
    certainty: "%100",
    suffixes: [
      { s: "-chen", ex: "das Mädchen, das Häuschen", note: "KESINLIKLE!" },
      { s: "-lein", ex: "das Fräulein, das Büchlein", note: "KESINLIKLE!" },
      { s: "-ment", ex: "das Dokument, das Instrument" },
      { s: "-um", ex: "das Museum, das Zentrum", note: "Latince/Yunanca" },
      { s: "-tum", ex: "das Wachstum, das Eigentum", note: "%100" },
      { s: "-tel", ex: "das Viertel, das Drittel", note: "Kesirler" },
      { s: "Ge-...", ex: "das Gebäude, das Gebirge", note: "Toplu isimler" },
    ],
  },
];

// ── Category rules ────────────────────────────────────────────────────────────
const categoryRules: { gender: Gender; cats: { icon: string; name: string; ex: string }[] }[] = [
  {
    gender: "maskulin",
    cats: [
      { icon: "📅", name: "Haftanın günleri", ex: "der Montag, der Dienstag..." },
      { icon: "🗓️", name: "Aylar", ex: "der Januar, der Februar..." },
      { icon: "🌸", name: "Mevsimler", ex: "der Frühling, der Sommer, der Herbst, der Winter" },
      { icon: "🌧️", name: "Hava olayları", ex: "der Regen, der Schnee, der Wind" },
      { icon: "🍷", name: "Alkol (Bier hariç!)", ex: "der Wein, der Whisky, der Rum" },
      { icon: "🚗", name: "Araba markaları", ex: "der BMW, der Mercedes, der Audi" },
    ],
  },
  {
    gender: "feminin",
    cats: [
      { icon: "🔢", name: "Rakamlar (isim olarak)", ex: "die Eins, die Zwei, die Drei" },
      { icon: "🌳", name: "Ağaçlar", ex: "die Eiche, die Birke, die Kiefer" },
      { icon: "🌹", name: "Çiçekler", ex: "die Rose, die Tulpe, die Orchidee" },
      { icon: "🌊", name: "Alman nehirleri", ex: "die Elbe, die Donau (der Rhein!)" },
      { icon: "🚢", name: "Gemiler", ex: "die Titanic, die Hamburg" },
      { icon: "🏍️", name: "Motosikletler", ex: "die Kawasaki, die Harley" },
    ],
  },
  {
    gender: "neutrum",
    cats: [
      { icon: "⚗️", name: "Metaller", ex: "das Gold, das Silber, das Eisen (der Stahl!)" },
      { icon: "🎨", name: "Renkler (isim)", ex: "das Rot, das Blau, das Grün" },
      { icon: "🗣️", name: "Diller", ex: "das Deutsch, das Englisch, das Türkisch" },
      { icon: "🏃", name: "Mastar isimler", ex: "das Laufen, das Essen, das Schlafen" },
      { icon: "🏙️", name: "Şehirler (formal)", ex: "das historische Berlin, das schöne Wien" },
      { icon: "📏", name: "Ölçü birimleri", ex: "das Meter, das Kilogramm, das Liter" },
    ],
  },
];

// ── Exam tricks ───────────────────────────────────────────────────────────────
const examTricks = [
  {
    title: "Sonekleri Ezberle",
    icon: "🎯",
    colorKey: "gold" as const,
    short: "-ung/-heit/-keit/-schaft → ALWAYS die | -chen/-lein → ALWAYS das",
    detail: "Bu sonekler hiç istisna kabul etmez. Sınavda garanti puandır! Bir kelimede bu sonekleri görünce direkt artikeli yazabilirsin.",
    examples: [
      "die Zeitung (-ung)", "die Freiheit (-heit)", "die Qualität (-tät)",
      "das Mädchen (-chen)", "das Museum (-um)",
    ],
  },
  {
    title: "Komposita Kuralı",
    icon: "🔗",
    colorKey: "blue" as const,
    short: "Birleşik kelimelerde SON kelime artikeli belirler",
    detail: "Almancada birleşik kelimeler çok yaygın. Son parçanın cinsiyeti tüm kelimenin cinsiyetini belirler.",
    examples: [
      "der Tisch → der Schreib|tisch",
      "die Uhr → die Wand|uhr",
      "das Buch → das Lehr|buch",
      "die Straße → die Bundes|straße",
    ],
  },
  {
    title: "Akkusativ Kolaylığı",
    icon: "⚡",
    colorKey: "amber" as const,
    short: "Sadece maskulin değişir: der→den, ein→einen",
    detail: "Akkusativ'de yalnızca maskulin artikeli değişir. Feminin (die→die) ve neutrum (das→das) nominativ ile aynı kalır. Bu büyük kolaylık!",
    examples: [
      "Ich sehe den Mann. (maskulin → değişti)",
      "Ich sehe die Frau. (feminin → değişmedi)",
      "Ich sehe das Kind. (neutrum → değişmedi)",
    ],
  },
  {
    title: "Dativ Edatları",
    icon: "🔊",
    colorKey: "green" as const,
    short: "mit, nach, bei, seit, von, zu, aus, gegenüber → HEP Dativ!",
    detail: "Bu 8 edatı ezberle. Cümlede bu edatları gördüğünde otomatik olarak Dativ formunu kullan.",
    examples: [
      "mit dem Freund", "nach der Schule",
      "bei einem Arzt", "von der Uni",
      "zu dem → zum Bahnhof",
    ],
  },
  {
    title: "%54 Feminin!",
    icon: "📊",
    colorKey: "pink" as const,
    short: "Bilmiyorsan 'die' dene — istatistiksel en iyi şans",
    detail: "Almancada isimlerin yaklaşık %54'ü feminin, %30'u maskulin, %16'sı neutrum. Emin değilsen 'die' demek istatistiksel avantaj sağlar!",
    examples: [],
  },
  {
    title: "Mädchen Paradoksu",
    icon: "😮",
    colorKey: "violet" as const,
    short: "-chen ve -lein sonekleri ALWAYS das — kişi de olsa!",
    detail: "das Mädchen (kız), das Fräulein (bayan) — canlı varlık bile olsa küçültme ekleri kelimeyi neutrum yapar. Bu sınavda çok sorulan bir tuzak!",
    examples: [
      "das Mädchen (kız → das!)",
      "das Fräulein (bayan → das!)",
      "das Häuschen (küçük ev → das)",
    ],
  },
];

const trickColors = {
  gold: { bg: "bg-gold/15", border: "border-gold/40", text: "text-gold", chip: "bg-gold/20 text-gold" },
  blue: { bg: "bg-blue-500/15", border: "border-blue-500/40", text: "text-blue-400", chip: "bg-blue-500/20 text-blue-400" },
  amber: { bg: "bg-amber-500/15", border: "border-amber-500/40", text: "text-amber-400", chip: "bg-amber-500/20 text-amber-400" },
  green: { bg: "bg-green-500/15", border: "border-green-500/40", text: "text-green-400", chip: "bg-green-500/20 text-green-400" },
  pink: { bg: "bg-pink-500/15", border: "border-pink-500/40", text: "text-pink-400", chip: "bg-pink-500/20 text-pink-400" },
  violet: { bg: "bg-violet-500/15", border: "border-violet-500/40", text: "text-violet-400", chip: "bg-violet-500/20 text-violet-400" },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ArtikellerPage() {
  const [activeGender, setActiveGender] = useState<Gender | null>(null);
  const [tableMode, setTableMode] = useState<"bestimmt" | "unbestimmt">("bestimmt");
  const [showCategories, setShowCategories] = useState(false);
  const [expandedTrick, setExpandedTrick] = useState<number | null>(null);

  const tableData = tableMode === "bestimmt" ? bestimmte : unbestimmte;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-8"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 50%, #0D1B2A 100%)" }}
      >
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-pink-500/5 blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A1 – B2
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
              <Star className="w-3 h-3" /> Sınav Konusu
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-border/50 text-text-muted text-xs font-bold">
              <Trophy className="w-3 h-3" /> 60 Alıştırma
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-text-primary mb-3 leading-tight">
            Artikeller: Sınavı Kazandıran<br />
            <span className="text-blue-400">der</span>
            <span className="text-text-muted mx-2">·</span>
            <span className="text-pink-400">die</span>
            <span className="text-text-muted mx-2">·</span>
            <span className="text-violet-400">das</span>
          </h1>
          <p className="text-text-secondary text-sm max-w-2xl leading-relaxed">
            Almancada her ismin bir artikeli var. Hangi ismin hangi artikeli aldığını, dört haldeki değişimlerini, sonek kurallarını ve sınav taktiklerini burada öğren.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: <Layers className="w-4 h-4" />, text: "4 Hal (Kasus)" },
              { icon: <Target className="w-4 h-4" />, text: "Sonek Kuralları" },
              { icon: <Link2 className="w-4 h-4" />, text: "Kategori Kuralları" },
              { icon: <BookOpen className="w-4 h-4" />, text: "60 Alıştırma" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-text-muted text-xs">
                <span className="text-gold">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Gender overview cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {(["maskulin", "feminin", "neutrum"] as Gender[]).map((g, i) => {
          const c = G[g];
          const isActive = activeGender === g;
          const demos = {
            maskulin: { word: "der Mann", audio: "der Mann" },
            feminin: { word: "die Frau", audio: "die Frau" },
            neutrum: { word: "das Kind", audio: "das Kind" },
            plural: { word: "die Bücher", audio: "die Bücher" },
          };
          const pcts = { maskulin: 30, feminin: 54, neutrum: 16, plural: 0 };
          return (
            <motion.div
              key={g}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
              role="button"
              tabIndex={0}
              onClick={() => setActiveGender(isActive ? null : g)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveGender(isActive ? null : g); }}
              className={`relative overflow-hidden rounded-xl border p-5 cursor-pointer transition-all duration-300 ${
                isActive
                  ? `${c.bg} ${c.border} shadow-lg ring-2 ${c.ring}`
                  : "bg-navy-card border-navy-border hover:border-navy-border/80 hover:bg-navy-card/80"
              }`}
            >
              {/* Background bar showing percentage */}
              <div
                className={`absolute bottom-0 left-0 h-1 ${c.bar} transition-all duration-500`}
                style={{ width: `${pcts[g]}%` }}
              />

              <div className={`text-5xl font-black mb-3 ${c.text} leading-none`}>{c.label}</div>
              <div className="text-text-primary font-bold text-sm">{c.header}</div>
              <div className="text-text-muted text-xs mt-1 mb-3">
                {g === "maskulin" && "Erkek cinsiyet"}
                {g === "feminin" && "Dişi cinsiyet"}
                {g === "neutrum" && "Tarafsız cinsiyet"}
              </div>
              <div className="flex items-center justify-between">
                <SpeakBtn text={demos[g].audio} className="w-6 h-6" />
                <div className="text-right">
                  <span className={`text-xs font-black ${c.text}`}>~{pcts[g]}%</span>
                  <div className="text-text-muted text-[10px]">Almancada</div>
                </div>
              </div>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full ${c.dot}`}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Article Tables ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        {/* Toggle */}
        <div className="flex border-b border-navy-border">
          {(["bestimmt", "unbestimmt"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTableMode(t)}
              className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
                tableMode === t
                  ? "text-gold border-gold bg-gold/5"
                  : "text-text-muted border-transparent hover:text-text-secondary"
              }`}
            >
              {t === "bestimmt" ? "Bestimmte Artikel (der / die / das)" : "Unbestimmte Artikel (ein / eine)"}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left p-4 text-text-muted font-semibold text-xs w-28">Kasus</th>
                {(["maskulin", "feminin", "neutrum", "plural"] as Gender[]).map((g) => (
                  <th key={g} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className={`text-xl font-black ${G[g].text}`}>{G[g].label}</span>
                      <span className="text-text-muted text-[10px] font-normal">{G[g].header}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {tableData.map((row, i) => (
                  <motion.tr
                    key={`${tableMode}-${row.kasus}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="border-b border-navy-border/40 last:border-0 hover:bg-navy/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-text-primary text-xs">{row.kasus}</div>
                      <div className="text-text-muted text-[10px] mt-0.5 leading-tight">{row.tip}</div>
                    </td>
                    {(["maskulin", "feminin", "neutrum", "plural"] as Gender[]).map((g) => {
                      const val = row[g];
                      const changed = row.changed.includes(g);
                      const highlighted = activeGender === g;
                      return (
                        <td key={g} className="p-4 text-center">
                          <motion.span
                            animate={{ scale: highlighted ? 1.15 : 1 }}
                            transition={{ duration: 0.2 }}
                            className={`inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-lg font-black text-base transition-all duration-200 ${
                              val === "—"
                                ? "text-text-muted text-sm font-normal"
                                : changed
                                ? `${G[g].bg} ${G[g].text} border ${G[g].border}`
                                : highlighted
                                ? `${G[g].bg} ${G[g].text}`
                                : "text-text-primary"
                            }`}
                          >
                            {val}
                          </motion.span>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Tip bar */}
        <div className="p-4 bg-amber-500/8 border-t border-amber-500/20">
          <div className="flex gap-2 text-amber-400 text-xs">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Akkusativ sırrı:</strong> Sadece maskulin değişir (der → den · ein → einen). Feminin ve neutrum Nominativ ile aynı kalır — yarısı bedava!
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Suffix Rules ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Sonek Kuralları</h2>
            <p className="text-text-muted text-xs">Kelimenin sonuna bak → artikeli bil</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {suffixRules.map((group) => {
            const c = G[group.gender];
            return (
              <div key={group.gender} className={`rounded-xl border ${c.border} overflow-hidden`}>
                {/* Header */}
                <div className={`${c.bg} px-4 py-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-black ${c.text}`}>{c.label}</span>
                    <span className="text-text-secondary text-sm font-semibold">{c.header}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-navy/40 ${c.text}`}>
                    {group.certainty}
                  </span>
                </div>
                {/* Suffix list */}
                <div className="p-3 space-y-1.5 bg-navy-card">
                  {group.suffixes.map((s) => (
                    <div key={s.s} className="flex items-start gap-2.5 p-2 rounded-lg bg-navy/50 hover:bg-navy/70 transition-colors">
                      <code className={`text-sm font-black ${c.text} shrink-0 min-w-[4rem]`}>{s.s}</code>
                      <div className="min-w-0">
                        <div className="text-text-secondary text-[11px] leading-snug">{s.ex}</div>
                        {s.note && (
                          <div className={`text-[10px] font-bold ${c.text} mt-0.5`}>{s.note}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Category Rules (collapsible) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => setShowCategories(!showCategories)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowCategories(!showCategories); }}
          className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-navy/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-skill-grammatik/15 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-skill-grammatik" />
            </div>
            <div>
              <div className="text-text-primary font-bold text-sm">Kategori Kuralları</div>
              <div className="text-text-muted text-xs mt-0.5">Kelime kategorisi artikeli ele veriyor — tıkla</div>
            </div>
          </div>
          <motion.div animate={{ rotate: showCategories ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {showCategories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-navy-border pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {categoryRules.map((group) => {
                    const c = G[group.gender];
                    return (
                      <div key={group.gender}>
                        <div className={`flex items-center gap-2 mb-3 text-sm font-bold ${c.text}`}>
                          <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                          {c.label} — {c.header}
                        </div>
                        <div className="space-y-1.5">
                          {group.cats.map((cat) => (
                            <motion.div
                              key={cat.name}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-navy/60 hover:bg-navy/80 transition-colors"
                            >
                              <span className="text-base leading-none mt-0.5 shrink-0">{cat.icon}</span>
                              <div>
                                <div className="text-text-primary text-xs font-semibold">{cat.name}</div>
                                <div className="text-text-muted text-[10px] mt-0.5 leading-snug">{cat.ex}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Exam Tricks ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Sınav Taktikleri</h2>
            <p className="text-text-muted text-xs">Bu 6 ipucu sınavda anında puan kazandırır</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {examTricks.map((trick, i) => {
            const tc = trickColors[trick.colorKey];
            const isOpen = expandedTrick === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`rounded-xl border ${tc.border} overflow-hidden`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedTrick(isOpen ? null : i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandedTrick(isOpen ? null : i); }}
                  className="w-full flex items-start gap-3 p-4 cursor-pointer hover:bg-navy/20 transition-colors"
                >
                  <span className="text-xl leading-none shrink-0 mt-0.5">{trick.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm ${tc.text}`}>{trick.title}</div>
                    <div className="text-text-secondary text-xs mt-0.5 leading-snug">{trick.short}</div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-1">
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-4 pb-4 pt-1 space-y-3 border-t ${tc.border} ${tc.bg}`}>
                        <p className="text-text-secondary text-xs leading-relaxed">{trick.detail}</p>
                        {trick.examples.length > 0 && (
                          <div className="space-y-1">
                            {trick.examples.map((ex, j) => (
                              <div key={j} className={`text-xs px-3 py-1.5 rounded-lg bg-navy/60 ${tc.text} font-mono`}>
                                {ex}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Quick Reference ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-navy-card border border-navy-border rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-gold" />
          <h3 className="font-bold text-text-primary text-sm">Hızlı Başvuru — Sınavda Garantili</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: "ALWAYS die",
              items: ["-ung", "-heit", "-keit", "-schaft", "-tion", "-tät", "-ie", "-ik", "-enz", "-in"],
              color: "pink" as const,
            },
            {
              title: "ALWAYS das",
              items: ["-chen", "-lein", "-ment", "-um", "-tum", "Ge-...", "Mastarlar"],
              color: "violet" as const,
            },
            {
              title: "Çoğunlukla der",
              items: ["Günler", "Aylar", "Mevsimler", "Hava", "Alkol*", "Araba markaları"],
              color: "blue" as const,
            },
          ].map((col) => {
            const tc = trickColors[col.color];
            return (
              <div key={col.title} className={`rounded-xl border ${tc.border} p-3`}>
                <div className={`font-black text-sm ${tc.text} mb-2`}>{col.title}</div>
                <div className="flex flex-wrap gap-1.5">
                  {col.items.map((item) => (
                    <span key={item} className={`px-2 py-0.5 rounded-full ${tc.chip} text-[10px] font-semibold`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Akkusativ cheat sheet */}
        <div className="mt-4 p-3 rounded-xl bg-navy/60 border border-navy-border">
          <div className="text-text-muted text-[10px] font-bold uppercase tracking-wider mb-2">Akkusativ Değişim Tablosu</div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {(["maskulin", "feminin", "neutrum", "plural"] as Gender[]).map((g) => {
              const c = G[g];
              const nom = tableMode === "bestimmt"
                ? bestimmte[0][g]
                : unbestimmte[0][g];
              const akk = tableMode === "bestimmt"
                ? bestimmte[1][g]
                : unbestimmte[1][g];
              const changed = nom !== akk && akk !== "—";
              return (
                <div key={g} className={`p-2 rounded-lg ${changed ? c.bg : "bg-navy/40"}`}>
                  <div className={`font-bold text-[10px] ${c.text} mb-1`}>{c.header}</div>
                  <div className="text-text-muted text-[10px]">{nom}</div>
                  <div className="text-text-muted text-[10px]">↓</div>
                  <div className={`font-black ${changed ? c.text : "text-text-muted"}`}>
                    {akk}
                    {changed && " ✓"}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-text-muted text-[10px] mt-2 text-center">
            * Sadece maskulin değişiyor · Tabloyu değiştirmek için üstteki sekmeleri kullan
          </div>
        </div>
      </motion.div>

      {/* ── Practice ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <GrammarTracker topicId="artikel-der-die-das" level="A1" />
        <PracticeSection />
      </motion.div>
    </div>
  );
}
