"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Volume2,
  ChevronDown,
  CheckCircle,
  Lightbulb,
  Star,
  Layers,
} from "lucide-react";
import { PracticeSection } from "./PracticeSection";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

/* ── SpeakBtn ──────────────────────────────────────────────── */
function SpeakBtn({ text, small }: { text: string; small?: boolean }) {
  const [speaking, setSpeaking] = useState(false);
  function speak() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.85;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }
  return (
    <button
      onClick={speak}
      className={`flex items-center justify-center rounded-lg transition-all shrink-0
        ${small ? "w-6 h-6" : "w-8 h-8"}
        ${speaking ? "bg-gold/30 text-gold" : "bg-navy-border/60 text-text-muted hover:text-gold hover:bg-gold/15"}`}
    >
      <Volume2 className={small ? "w-3 h-3" : "w-4 h-4"} />
    </button>
  );
}

/* ── Declension table data ─────────────────────────────────── */
const CASES = ["Nominativ", "Akkusativ", "Dativ", "Genitiv"];
const GENDERS = ["Maskulin", "Feminin", "Neutrum", "Plural"];

const schwachEndings = [
  ["-e",  "-e",  "-e",  "-en"],
  ["-en", "-e",  "-e",  "-en"],
  ["-en", "-en", "-en", "-en"],
  ["-en", "-en", "-en", "-en"],
];

const gemischtEndings = [
  ["-er", "-e",  "-es", "-en"],
  ["-en", "-e",  "-es", "-en"],
  ["-en", "-en", "-en", "-en"],
  ["-en", "-en", "-en", "-en"],
];

const starkEndings = [
  ["-er", "-e",  "-es", "-e"],
  ["-en", "-e",  "-es", "-e"],
  ["-em", "-er", "-em", "-en"],
  ["-en", "-er", "-en", "-er"],
];

const schwachExamples = [
  ["der alte Mann", "die schöne Frau", "das kleine Kind", "die alten Männer"],
  ["den alten Mann", "die schöne Frau", "das kleine Kind", "die alten Männer"],
  ["dem alten Mann", "der schönen Frau", "dem kleinen Kind", "den alten Männern"],
  ["des alten Mannes", "der schönen Frau", "des kleinen Kindes", "der alten Männer"],
];

const gemischtExamples = [
  ["ein alter Mann", "eine schöne Frau", "ein kleines Kind", "keine alten Männer"],
  ["einen alten Mann", "eine schöne Frau", "ein kleines Kind", "keine alten Männer"],
  ["einem alten Mann", "einer schönen Frau", "einem kleinen Kind", "keinen alten Männern"],
  ["eines alten Mannes", "einer schönen Frau", "eines kleinen Kindes", "keiner alten Männer"],
];

const starkExamples = [
  ["kalter Kaffee", "frische Milch", "heißes Wasser", "alte Bücher"],
  ["kalten Kaffee", "frische Milch", "heißes Wasser", "alte Bücher"],
  ["kaltem Kaffee", "frischer Milch", "heißem Wasser", "alten Büchern"],
  ["kalten Kaffees", "frischer Milch", "heißen Wassers", "alter Bücher"],
];

/* ── DeclensionTable ───────────────────────────────────────── */
function DeclensionTable({
  endings,
  examples,
  accentColor,
  accentBg,
}: {
  endings: string[][];
  examples: string[][];
  accentColor: string;
  accentBg: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left px-3 py-2.5 text-text-muted font-semibold text-xs w-24" />
            {GENDERS.map((g) => (
              <th key={g} className="text-center px-3 py-2.5 text-text-secondary font-bold text-xs">
                {g}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CASES.map((c, ci) => (
            <tr key={c} className={ci % 2 === 0 ? "bg-navy/40" : "bg-transparent"}>
              <td className="px-3 py-2.5 text-text-muted font-semibold text-xs whitespace-nowrap">{c}</td>
              {endings[ci].map((end, gi) => (
                <td key={gi} className="px-3 py-2.5 text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className={`font-extrabold text-sm ${accentColor} px-2 py-0.5 rounded-lg ${accentBg}`}>
                      {end}
                    </span>
                    <span className="text-[10px] text-text-muted leading-tight">{examples[ci][gi]}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Example sentences ─────────────────────────────────────── */
const examples = [
  {
    de: "Der alte Mann liest gern.",
    tr: "Yaşlı adam okumayı seviyor.",
    note: "Schwach – Maskulin Nom.",
    type: "schwach",
  },
  {
    de: "Ich sehe die schöne Frau.",
    tr: "Güzel kadını görüyorum.",
    note: "Schwach – Feminin Akk.",
    type: "schwach",
  },
  {
    de: "Er hilft dem kleinen Kind.",
    tr: "Küçük çocuğa yardım ediyor.",
    note: "Schwach – Neutrum Dat.",
    type: "schwach",
  },
  {
    de: "Ein alter Mann kommt.",
    tr: "Yaşlı bir adam geliyor.",
    note: "Gemischt – Maskulin Nom.",
    type: "gemischt",
  },
  {
    de: "Ich habe einen braunen Hund.",
    tr: "Kahverengi bir köpeğim var.",
    note: "Gemischt – Maskulin Akk.",
    type: "gemischt",
  },
  {
    de: "Mein kleines Kind schläft.",
    tr: "Küçük çocuğum uyuyor.",
    note: "Gemischt – Neutrum Nom.",
    type: "gemischt",
  },
  {
    de: "Heißer Kaffee schmeckt gut.",
    tr: "Sıcak kahve lezzetli.",
    note: "Stark – Maskulin Nom.",
    type: "stark",
  },
  {
    de: "Er trinkt kalte Milch.",
    tr: "Soğuk süt içiyor.",
    note: "Stark – Feminin Akk.",
    type: "stark",
  },
  {
    de: "Frisches Brot riecht toll.",
    tr: "Taze ekmek harika kokuyor.",
    note: "Stark – Neutrum Nom.",
    type: "stark",
  },
];

const TYPE_META = {
  schwach:  { label: "Schwach",  color: "text-blue-400",   bg: "bg-blue-500/15",   border: "border-blue-500/30" },
  gemischt: { label: "Gemischt", color: "text-amber-400",  bg: "bg-amber-500/15",  border: "border-amber-500/30" },
  stark:    { label: "Stark",    color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/30" },
};

/* ── Sentence breakdown data ───────────────────────────────── */
interface SentencePart {
  word: string;
  role: string;
  detail: string;
  color: string;
}

interface BreakdownSentence {
  full: string;
  translation: string;
  type: "schwach" | "gemischt" | "stark";
  parts: SentencePart[];
}

const breakdownSentences: BreakdownSentence[] = [
  {
    full: "Der alte Mann liest gern Bücher.",
    translation: "Yaşlı adam kitap okumayı sever.",
    type: "schwach",
    parts: [
      { word: "Der", role: "Bestimmter Artikel", detail: "Maskulin · Nominativ", color: "text-blue-400" },
      { word: "alte", role: "Adjektiv (schwach)", detail: "Mask. Nom. → -e soneki", color: "text-gold" },
      { word: "Mann", role: "Nomen", detail: "Maskulin · Nominativ (Subjekt)", color: "text-text-primary" },
      { word: "liest", role: "Verb", detail: "lesen — 3. Kişi Tekil", color: "text-skill-grammatik" },
      { word: "gern", role: "Adverb", detail: "Meyil/sevgi belirtir", color: "text-text-muted" },
      { word: "Bücher.", role: "Nomen (Plural)", detail: "Akkusativ · Nesne", color: "text-text-primary" },
    ],
  },
  {
    full: "Ich sehe die schöne Frau im Park.",
    translation: "Güzel kadını parkta görüyorum.",
    type: "schwach",
    parts: [
      { word: "Ich", role: "Kişi Zamiri", detail: "1. Tekil Şahıs (Subjekt)", color: "text-text-primary" },
      { word: "sehe", role: "Verb", detail: "sehen — 1. Kişi Tekil", color: "text-skill-grammatik" },
      { word: "die", role: "Bestimmter Artikel", detail: "Feminin · Akkusativ", color: "text-blue-400" },
      { word: "schöne", role: "Adjektiv (schwach)", detail: "Fem. Akk. → -e soneki", color: "text-gold" },
      { word: "Frau", role: "Nomen", detail: "Feminin · Akkusativ (Nesne)", color: "text-text-primary" },
      { word: "im Park.", role: "Edatlı Tamlama", detail: "in + dem = im (Dativ)", color: "text-text-muted" },
    ],
  },
  {
    full: "Er gibt dem kleinen Kind ein Buch.",
    translation: "Küçük çocuğa bir kitap veriyor.",
    type: "schwach",
    parts: [
      { word: "Er", role: "Kişi Zamiri", detail: "3. Tekil Erkek", color: "text-text-primary" },
      { word: "gibt", role: "Verb", detail: "geben — Dativ fiili (wem?)", color: "text-skill-grammatik" },
      { word: "dem", role: "Bestimmter Artikel", detail: "Neutrum · Dativ", color: "text-blue-400" },
      { word: "kleinen", role: "Adjektiv (schwach)", detail: "Neu. Dat. → -en soneki", color: "text-gold" },
      { word: "Kind", role: "Nomen", detail: "Neutrum · Dativ (Dolaylı Nesne)", color: "text-text-primary" },
      { word: "ein Buch.", role: "Belirsiz Artikel + Nomen", detail: "Neutrum · Akkusativ (Nesne)", color: "text-text-muted" },
    ],
  },
  {
    full: "Ein junger Mann kauft eine neue Jacke.",
    translation: "Genç bir adam yeni bir ceket satın alıyor.",
    type: "gemischt",
    parts: [
      { word: "Ein", role: "Unbestimmter Artikel", detail: "Maskulin · Nominativ", color: "text-amber-400" },
      { word: "junger", role: "Adjektiv (gemischt)", detail: "Mask. Nom. → -er (artikel bilgiyi vermedi!)", color: "text-gold" },
      { word: "Mann", role: "Nomen", detail: "Maskulin · Nominativ (Subjekt)", color: "text-text-primary" },
      { word: "kauft", role: "Verb", detail: "kaufen — Akkusativ fiili (was?)", color: "text-skill-grammatik" },
      { word: "eine", role: "Unbestimmter Artikel", detail: "Feminin · Akkusativ", color: "text-amber-400" },
      { word: "neue", role: "Adjektiv (gemischt)", detail: "Fem. Akk. → -e (ein cinsiyeti gösterdi)", color: "text-gold" },
      { word: "Jacke.", role: "Nomen", detail: "Feminin · Akkusativ (Nesne)", color: "text-text-primary" },
    ],
  },
  {
    full: "Mein kleines Kind schläft tief.",
    translation: "Küçük çocuğum derin uyuyor.",
    type: "gemischt",
    parts: [
      { word: "Mein", role: "Possessivartikel", detail: "Neutrum · Nominativ (kein gibi çekimlenir)", color: "text-amber-400" },
      { word: "kleines", role: "Adjektiv (gemischt)", detail: "Neu. Nom. → -es (mein, das'ı işaretleyemedi!)", color: "text-gold" },
      { word: "Kind", role: "Nomen", detail: "Neutrum · Nominativ (Subjekt)", color: "text-text-primary" },
      { word: "schläft", role: "Verb", detail: "schlafen — 3. Kişi Tekil", color: "text-skill-grammatik" },
      { word: "tief.", role: "Adverb", detail: "Derinlik/yoğunluk belirtir", color: "text-text-muted" },
    ],
  },
  {
    full: "Heißer Kaffee und frische Milch sind gesund.",
    translation: "Sıcak kahve ve taze süt sağlıklıdır.",
    type: "stark",
    parts: [
      { word: "Heißer", role: "Adjektiv (stark)", detail: "Maskulin Nom. → -er (artikel yok, sıfat taşır!)", color: "text-purple-400" },
      { word: "Kaffee", role: "Nomen", detail: "Maskulin · Nominativ", color: "text-text-primary" },
      { word: "und", role: "Bağlaç", detail: "und = ve", color: "text-text-muted" },
      { word: "frische", role: "Adjektiv (stark)", detail: "Feminin Nom. → -e (artikel yok)", color: "text-purple-400" },
      { word: "Milch", role: "Nomen", detail: "Feminin · Nominativ", color: "text-text-primary" },
      { word: "sind gesund.", role: "Verb + Adjektiv", detail: "Prädikat — sein fiili + sıfat", color: "text-skill-grammatik" },
    ],
  },
  {
    full: "Sie kocht mit frischem Olivenöl.",
    translation: "Taze zeytinyağıyla pişiriyor.",
    type: "stark",
    parts: [
      { word: "Sie", role: "Kişi Zamiri", detail: "3. Tekil Kadın", color: "text-text-primary" },
      { word: "kocht", role: "Verb", detail: "kochen — Pişirmek", color: "text-skill-grammatik" },
      { word: "mit", role: "Präposition", detail: "mit → her zaman Dativ!", color: "text-purple-300" },
      { word: "frischem", role: "Adjektiv (stark)", detail: "Neutrum Dativ → -em (artikel yok)", color: "text-purple-400" },
      { word: "Olivenöl.", role: "Nomen", detail: "Neutrum · Dativ (mit sonrası)", color: "text-text-primary" },
    ],
  },
  {
    full: "Das Aroma frischen Kaffees ist unwiderstehlich.",
    translation: "Taze kahvenin aroması dayanılmazdır.",
    type: "stark",
    parts: [
      { word: "Das Aroma", role: "Nomen", detail: "Neutrum · Nominativ (Subjekt)", color: "text-text-primary" },
      { word: "frischen", role: "Adjektiv (stark)", detail: "Maskulin Genitiv → -en (artikel yok)", color: "text-purple-400" },
      { word: "Kaffees", role: "Nomen", detail: "Maskulin · Genitiv → +s eki!", color: "text-text-primary" },
      { word: "ist", role: "Verb", detail: "sein — Bağlaç fiil", color: "text-skill-grammatik" },
      { word: "unwiderstehlich.", role: "Adjektiv (Prädikat)", detail: "Yüklem sıfatı — çekilmez!", color: "text-text-muted" },
    ],
  },
];

const TYPE_META_BD = {
  schwach:  { label: "Schwach",  color: "text-blue-400",   bg: "bg-blue-500/15",   border: "border-blue-500/30" },
  gemischt: { label: "Gemischt", color: "text-amber-400",  bg: "bg-amber-500/15",  border: "border-amber-500/30" },
  stark:    { label: "Stark",    color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/30" },
};

/* ── Main page ─────────────────────────────────────────────── */
export default function AdjektivdeklinationPage() {
  const [filter, setFilter] = useState<"all" | "schwach" | "gemischt" | "stark">("all");
  const [tableTab, setTableTab] = useState<"schwach" | "gemischt" | "stark">("schwach");
  const [trickOpen, setTrickOpen] = useState(false);
  const [bdFilter, setBdFilter] = useState<"all" | "schwach" | "gemischt" | "stark">("all");
  const [expandedBd, setExpandedBd] = useState<number | null>(0);

  const filtered = filter === "all" ? examples : examples.filter((e) => e.type === filter);

  const tableConfig = {
    schwach: {
      endings: schwachEndings,
      examples: schwachExamples,
      accentColor: "text-blue-400",
      accentBg: "bg-blue-500/10",
      title: "Schwache Deklination",
      subtitle: "der / die / das — tam belirli artikel sonrası",
      color: "text-blue-400",
      bg: "bg-blue-500/15",
      border: "border-blue-500/30",
    },
    gemischt: {
      endings: gemischtEndings,
      examples: gemischtExamples,
      accentColor: "text-amber-400",
      accentBg: "bg-amber-500/10",
      title: "Gemischte Deklination",
      subtitle: "ein / eine / kein / mein... — belirsiz artikel sonrası",
      color: "text-amber-400",
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
    },
    stark: {
      endings: starkEndings,
      examples: starkExamples,
      accentColor: "text-purple-400",
      accentBg: "bg-purple-500/10",
      title: "Starke Deklination",
      subtitle: "Artikelsiz — sıfır artikel ile",
      color: "text-purple-400",
      bg: "bg-purple-500/15",
      border: "border-purple-500/30",
    },
  };

  const tc = tableConfig[tableTab];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">

      {/* ── HERO ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10"
      >
        <div className="absolute -top-16 -right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-skill-lesen/20 text-skill-lesen border border-skill-lesen/30">A2-B1</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30">Grammatik</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            Adjektivdeklination
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-2xl mb-5">
            Almancada sıfatlar, önlerindeki artikel türüne göre farklı sonekler alır.
            <strong className="text-blue-400"> Schwach</strong>,
            <strong className="text-amber-400"> Gemischt</strong> ve
            <strong className="text-purple-400"> Stark</strong> olmak üzere üç deklinasyon türü vardır.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "3 Tür Deklinasyon", icon: BookOpen },
              { label: "Tüm Durumlar (4)", icon: GraduationCap },
              { label: "Sesli Örnekler", icon: Volume2 },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-text-secondary bg-navy/60 border border-navy-border rounded-xl px-3 py-1.5">
                <Icon className="w-4 h-4 text-gold" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 3 TYPE OVERVIEW CARDS ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["schwach", "gemischt", "stark"] as const).map((type, i) => {
          const meta = TYPE_META[type];
          const tc2 = tableConfig[type];
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.45, ease: "easeOut" }}
              className={`${meta.bg} border ${meta.border} rounded-2xl p-5`}
            >
              <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.bg} ${meta.border} ${meta.color} inline-flex mb-3`}>
                {meta.label}
              </div>
              <h3 className="text-text-primary font-bold text-base mb-1">{tc2.title}</h3>
              <p className="text-text-muted text-xs mb-3 leading-relaxed">{tc2.subtitle}</p>
              <div className="space-y-1">
                {type === "schwach" && (
                  <>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Kural:</span> Çoğunlukla -e ya da -en</p>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Nom/Akk:</span> der/die/das → -e</p>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Diğer:</span> hepsi -en</p>
                  </>
                )}
                {type === "gemischt" && (
                  <>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Kural:</span> Belirsiz artikel sonrası</p>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Nom M/N:</span> -er / -es</p>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Diğer:</span> -en veya -e</p>
                  </>
                )}
                {type === "stark" && (
                  <>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Kural:</span> Artikel yokken sıfat çekimi yapar</p>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Dat M/N:</span> -em</p>
                    <p className="text-xs text-text-secondary"><span className={`font-bold ${meta.color}`}>Gen F:</span> -er</p>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── DECLENSION TABLES ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        {/* Tab bar */}
        <div className="flex border-b border-navy-border">
          {(["schwach", "gemischt", "stark"] as const).map((type) => {
            const meta = TYPE_META[type];
            return (
              <button
                key={type}
                onClick={() => setTableTab(type)}
                className={`flex-1 py-3 text-sm font-semibold transition-all ${
                  tableTab === type
                    ? `${meta.color} border-b-2 ${meta.border.replace("border", "border-b")} bg-navy/30`
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {TYPE_META[type].label}
              </button>
            );
          })}
        </div>

        <div className="p-5">
          <div className="mb-4">
            <h3 className={`font-bold text-base ${tc.color} mb-1`}>{tc.title}</h3>
            <p className="text-text-muted text-xs">{tc.subtitle}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tableTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DeclensionTable
                endings={tc.endings}
                examples={tc.examples}
                accentColor={tc.accentColor}
                accentBg={tc.accentBg}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── EXAMPLE SENTENCES ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-navy-border flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-text-primary font-bold text-base">Örnek Cümleler</h2>
          <div className="flex gap-2 flex-wrap">
            {([["all", "Tümü"], ["schwach", "Schwach"], ["gemischt", "Gemischt"], ["stark", "Stark"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                  filter === val
                    ? val === "all"
                      ? "bg-gold/20 text-gold border-gold/30"
                      : `${TYPE_META[val].bg} ${TYPE_META[val].color} ${TYPE_META[val].border}`
                    : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence initial={false}>
            {filtered.map((ex, i) => {
              const meta = TYPE_META[ex.type as keyof typeof TYPE_META];
              return (
                <motion.div
                  key={ex.de}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                  className="bg-navy/50 border border-navy-border rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <SpeakBtn text={ex.de} small />
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-semibold text-sm leading-snug">{ex.de}</p>
                      <p className="text-text-muted text-xs mt-0.5">{ex.tr}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} ${meta.border} border`}>
                      {meta.label}
                    </span>
                    <span className="text-[10px] text-text-muted">{ex.note}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── SENTENCE BREAKDOWN ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-navy-border flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-skill-grammatik/20 rounded-xl flex items-center justify-center">
              <Layers className="w-4 h-4 text-skill-grammatik" />
            </div>
            <div>
              <h2 className="text-text-primary font-bold text-base">Cümleyi Parçalara Ayır</h2>
              <p className="text-text-muted text-xs">Her kelimeyi rolü ve sonekiyle incele</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {([["all", "Tümü"], ["schwach", "Schwach"], ["gemischt", "Gemischt"], ["stark", "Stark"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setBdFilter(val); setExpandedBd(null); }}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                  bdFilter === val
                    ? val === "all"
                      ? "bg-gold/20 text-gold border-gold/30"
                      : `${TYPE_META_BD[val].bg} ${TYPE_META_BD[val].color} ${TYPE_META_BD[val].border}`
                    : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-3">
          {breakdownSentences
            .filter((s) => bdFilter === "all" || s.type === bdFilter)
            .map((sentence, i) => {
              const meta = TYPE_META_BD[sentence.type];
              const isOpen = expandedBd === i;
              return (
                <motion.div
                  key={sentence.full}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="border border-navy-border rounded-xl overflow-hidden"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setExpandedBd(isOpen ? null : i)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandedBd(isOpen ? null : i); }}
                    className="w-full flex items-start gap-3 p-4 text-left hover:bg-navy/30 transition-colors cursor-pointer"
                  >
                    <div className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${meta.bg} ${meta.color} ${meta.border} border`}>
                      {meta.label}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-semibold text-sm">{sentence.full}</p>
                      <p className="text-text-muted text-xs mt-0.5">{sentence.translation}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <SpeakBtn text={sentence.full} small />
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4 text-text-muted" />
                      </motion.span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="breakdown"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 border-t border-navy-border bg-navy/20">
                          <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-3">Kelime Analizi</p>
                          <div className="flex flex-wrap gap-2">
                            {sentence.parts.map((part, pi) => (
                              <motion.div
                                key={pi}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: pi * 0.06, duration: 0.2 }}
                                className="bg-navy border border-navy-border rounded-xl p-3 min-w-[110px] flex-1"
                              >
                                <p className={`font-extrabold text-base mb-1 ${part.color}`}>{part.word}</p>
                                <p className="text-text-secondary text-[11px] font-semibold leading-tight">{part.role}</p>
                                <p className="text-text-muted text-[10px] mt-0.5 leading-tight">{part.detail}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </div>
      </motion.div>

      {/* ── MEMORY TRICKS ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-br from-gold/10 to-navy-card border border-gold/25 rounded-2xl overflow-hidden"
      >
        <button
          onClick={() => setTrickOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold/20 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-4.5 h-4.5 text-gold" />
            </div>
            <div>
              <p className="text-gold font-bold text-base">Altın Kurallar & Hafıza İpuçları</p>
              <p className="text-text-muted text-xs">Asla unutmayacağın kısayollar</p>
            </div>
          </div>
          <motion.span animate={{ rotate: trickOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown className="w-5 h-5 text-gold" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {trickOpen && (
            <motion.div
              key="tricks"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Schwach: sadece 2 son",
                    body: "Sadece -e veya -en alır. Maskulin/Feminin/Neutrum Nominativ ve Feminin/Neutrum Akkusativ → -e. Geri kalan HEPSİ → -en.",
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                  },
                  {
                    title: "Gemischt: artikelin olmadığı bilgiyi sıfat verir",
                    body: "Ein bir cinsiyeti işaretlemez. Bu yüzden Maskulin Nom → -er, Neutrum Nom/Akk → -es. Feminin ve Plural schwach gibi davranır.",
                    color: "text-amber-400",
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/20",
                  },
                  {
                    title: "Stark: sıfat her şeyi taşır",
                    body: "Artikel yok → sıfat cinsiyet ve hal bilgisini tek başına gösterir. Dativ Maskulin/Neutrum → -em, Feminin → -er (zor ama çok sık!).",
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/20",
                  },
                  {
                    title: "Genel kural: Bilgi paylaşımı",
                    body: "Türü belirlemek için şunu sor: 'Halihazırda cinsiyet belli mi?' Belli ise schwach (-en). Kısmen belli ise gemischt. Hiç belli değilse stark.",
                    color: "text-gold",
                    bg: "bg-gold/10",
                    border: "border-gold/20",
                  },
                ].map(({ title, body, color, bg, border }) => (
                  <div key={title} className={`${bg} border ${border} rounded-xl p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className={`w-3.5 h-3.5 ${color}`} />
                      <p className={`text-sm font-bold ${color}`}>{title}</p>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed">{body}</p>
                  </div>
                ))}

                {/* Quick reference table */}
                <div className="md:col-span-2 bg-navy/60 border border-navy-border rounded-xl p-4">
                  <p className="text-text-primary font-bold text-sm mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Hızlı Karşılaştırma Tablosu
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-navy-border">
                          <th className="text-left py-1.5 px-2 text-text-muted">Durum</th>
                          <th className="text-center py-1.5 px-2 text-blue-400">Schwach (der)</th>
                          <th className="text-center py-1.5 px-2 text-amber-400">Gemischt (ein)</th>
                          <th className="text-center py-1.5 px-2 text-purple-400">Stark (∅)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Mask. Nom", "-e  (der alte)", "-er (ein alter)", "-er (alter)"],
                          ["Fem. Nom",  "-e  (die alte)", "-e  (eine alte)", "-e  (alte)"],
                          ["Neu. Nom",  "-e  (das alte)", "-es (ein altes)", "-es (altes)"],
                          ["Mask. Akk", "-en (den alten)", "-en (einen alten)", "-en (alten)"],
                          ["Mask. Dat", "-en (dem alten)", "-en (einem alten)", "-em (altem)"],
                          ["Fem. Dat",  "-en (der alten)", "-en (einer alten)", "-er (alter)"],
                        ].map(([row, s, g, st], ri) => (
                          <tr key={row} className={ri % 2 === 0 ? "bg-navy/30" : ""}>
                            <td className="py-1.5 px-2 text-text-muted font-medium">{row}</td>
                            <td className="py-1.5 px-2 text-center text-blue-300">{s}</td>
                            <td className="py-1.5 px-2 text-center text-amber-300">{g}</td>
                            <td className="py-1.5 px-2 text-center text-purple-300">{st}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── 60-QUESTION EXAM ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        <GrammarTracker topicId="adjektivdeklination" level="B1" />
        <PracticeSection />
      </motion.div>

    </div>
  );
}
