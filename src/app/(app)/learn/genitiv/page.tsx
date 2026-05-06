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
  Link2,
} from "lucide-react";
import { PracticeSection, SpeakBtn } from "./PracticeSection";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

/* ── Local SpeakBtn wrapper ────────────────────────────────── */
function Speak({ text, small }: { text: string; small?: boolean }) {
  return (
    <SpeakBtn
      text={text}
      className={small ? "w-6 h-6" : ""}
    />
  );
}

/* ── Article Table ─────────────────────────────────────────── */
const articleTable = [
  { kasus: "Nominativ", mask: "der", fem: "die", neu: "das", plural: "die" },
  { kasus: "Akkusativ", mask: "den", fem: "die", neu: "das", plural: "die" },
  { kasus: "Dativ",     mask: "dem", fem: "der", neu: "dem", plural: "den" },
  { kasus: "Genitiv",   mask: "des (+s)", fem: "der", neu: "des (+s)", plural: "der", highlight: true },
];

/* ── Genitiv prepositions ──────────────────────────────────── */
const genitivePreps = [
  { prep: "wegen",      meaning: "... yüzünden / nedeniyle",    example: "Wegen des Regens bleiben wir zu Hause.", tr: "Yağmur yüzünden evde kalıyoruz." },
  { prep: "trotz",      meaning: "... rağmen",                  example: "Trotz des Lärms schläft er.", tr: "Gürültüye rağmen uyuyor." },
  { prep: "während",    meaning: "... süresince / esnasında",   example: "Während des Unterrichts ist es still.", tr: "Ders sırasında sessizlik var." },
  { prep: "statt / anstatt", meaning: "... yerine",            example: "Statt des Kaffees trinke ich Tee.", tr: "Kahve yerine çay içiyorum." },
  { prep: "innerhalb",  meaning: "... içinde / dahilinde",      example: "Innerhalb der Stadt gibt es Parks.", tr: "Şehir içinde parklar var." },
  { prep: "außerhalb",  meaning: "... dışında",                 example: "Außerhalb des Hauses ist es kalt.", tr: "Evin dışında soğuk." },
  { prep: "aufgrund",   meaning: "... nedeniyle / dolayısıyla", example: "Aufgrund der Kälte bleibt er drinnen.", tr: "Soğuk nedeniyle içeride kalıyor." },
  { prep: "mithilfe",   meaning: "... yardımıyla",              example: "Mithilfe des Lehrers hat er gelernt.", tr: "Öğretmenin yardımıyla öğrendi." },
  { prep: "dank",       meaning: "... sayesinde",               example: "Dank der Hilfe hat sie bestanden.", tr: "Yardım sayesinde geçti." },
  { prep: "laut",       meaning: "... göre / uyarınca",         example: "Laut des Berichts regnet es morgen.", tr: "Rapora göre yarın yağmur yağacak." },
];

/* ── Example sentences ─────────────────────────────────────── */
const examples = [
  { de: "Das ist das Buch des Mannes.", tr: "Bu adamın kitabıdır.", type: "besitz", note: "Mask. Gen. → des (+s)" },
  { de: "Die Tasche der Frau ist rot.", tr: "Kadının çantası kırmızı.", type: "besitz", note: "Fem. Gen. → der" },
  { de: "Das Zimmer des Kindes ist klein.", tr: "Çocuğun odası küçük.", type: "besitz", note: "Neu. Gen. → des (+es)" },
  { de: "Die Farbe der Blumen ist schön.", tr: "Çiçeklerin rengi güzel.", type: "besitz", note: "Plural Gen. → der" },
  { de: "Wegen des Regens bleiben wir zu Hause.", tr: "Yağmur yüzünden evde kalıyoruz.", type: "praeposition", note: "wegen → Genitiv" },
  { de: "Trotz der Kälte geht er spazieren.", tr: "Soğuğa rağmen yürüyüşe çıkıyor.", type: "praeposition", note: "trotz → Genitiv" },
  { de: "Während des Unterrichts ist es still.", tr: "Ders sırasında sessizlik var.", type: "praeposition", note: "während → Genitiv" },
  { de: "Statt des Kaffees trinke ich Tee.", tr: "Kahve yerine çay içiyorum.", type: "praeposition", note: "statt → Genitiv" },
  { de: "Das Buch meines Vaters ist alt.", tr: "Babamın kitabı eski.", type: "besitz", note: "Possessiv + Gen." },
  { de: "Aufgrund der Müdigkeit schläft er.", tr: "Yorgunluk nedeniyle uyuyor.", type: "praeposition", note: "aufgrund → Genitiv" },
];

/* ── Breakdown sentences ───────────────────────────────────── */
interface SentencePart {
  word: string;
  role: string;
  detail: string;
  color: string;
}

interface BreakdownSentence {
  full: string;
  translation: string;
  type: "besitz" | "praeposition";
  parts: SentencePart[];
}

const breakdownSentences: BreakdownSentence[] = [
  {
    full: "Das ist das Buch des Mannes.",
    translation: "Bu adamın kitabıdır.",
    type: "besitz",
    parts: [
      { word: "Das", role: "Demonstrativpronomen", detail: "Neutrum · Nominativ (Bu...)", color: "text-text-primary" },
      { word: "ist", role: "Verb", detail: "sein — bağlaç fiil", color: "text-skill-grammatik" },
      { word: "das Buch", role: "Nomen (Nominativ)", detail: "Neutrum · Yüklem", color: "text-text-primary" },
      { word: "des", role: "Genitiv-Artikel", detail: "Maskulin Genitiv → des", color: "text-green-400" },
      { word: "Mannes.", role: "Nomen (Genitiv)", detail: "Maskulin → +es eki alır", color: "text-green-300" },
    ],
  },
  {
    full: "Die Farbe der Blumen ist schön.",
    translation: "Çiçeklerin rengi güzel.",
    type: "besitz",
    parts: [
      { word: "Die Farbe", role: "Nomen (Subjekt)", detail: "Feminin · Nominativ", color: "text-text-primary" },
      { word: "der", role: "Genitiv-Artikel", detail: "Plural Genitiv → der (değişmez!)", color: "text-green-400" },
      { word: "Blumen", role: "Nomen (Plural)", detail: "Genitiv — sahip olunan şey", color: "text-green-300" },
      { word: "ist", role: "Verb", detail: "sein — bağlaç fiil", color: "text-skill-grammatik" },
      { word: "schön.", role: "Adjektiv (Prädikat)", detail: "Yüklem sıfatı — çekilmez", color: "text-text-muted" },
    ],
  },
  {
    full: "Das Zimmer des Kindes ist sauber.",
    translation: "Çocuğun odası temiz.",
    type: "besitz",
    parts: [
      { word: "Das Zimmer", role: "Nomen (Subjekt)", detail: "Neutrum · Nominativ", color: "text-text-primary" },
      { word: "des", role: "Genitiv-Artikel", detail: "Neutrum Genitiv → des", color: "text-green-400" },
      { word: "Kindes", role: "Nomen (Genitiv)", detail: "Neutrum → +es eki alır (Kind + es)", color: "text-green-300" },
      { word: "ist", role: "Verb", detail: "sein — bağlaç fiil", color: "text-skill-grammatik" },
      { word: "sauber.", role: "Adjektiv (Prädikat)", detail: "Temiz", color: "text-text-muted" },
    ],
  },
  {
    full: "Wegen des starken Regens bleiben wir zu Hause.",
    translation: "Şiddetli yağmur yüzünden evde kalıyoruz.",
    type: "praeposition",
    parts: [
      { word: "Wegen", role: "Genitiv-Präposition", detail: "wegen → her zaman Genitiv alır!", color: "text-amber-400" },
      { word: "des", role: "Genitiv-Artikel", detail: "Maskulin Genitiv → des", color: "text-green-400" },
      { word: "starken", role: "Adjektiv (schwach)", detail: "Mask. Gen. nach des → -en soneki", color: "text-gold" },
      { word: "Regens", role: "Nomen (Genitiv)", detail: "Maskulin → +s eki (Regen + s)", color: "text-green-300" },
      { word: "bleiben", role: "Verb", detail: "bleiben — kalmak", color: "text-skill-grammatik" },
      { word: "wir", role: "Kişi Zamiri", detail: "1. Çoğul Şahıs (Subjekt)", color: "text-text-primary" },
      { word: "zu Hause.", role: "Edatlı Tamlama", detail: "zu Hause = evde (kalıp ifade)", color: "text-text-muted" },
    ],
  },
  {
    full: "Trotz des Lärms schläft das Baby.",
    translation: "Gürültüye rağmen bebek uyuyor.",
    type: "praeposition",
    parts: [
      { word: "Trotz", role: "Genitiv-Präposition", detail: "trotz → her zaman Genitiv alır!", color: "text-amber-400" },
      { word: "des", role: "Genitiv-Artikel", detail: "Maskulin Genitiv → des", color: "text-green-400" },
      { word: "Lärms", role: "Nomen (Genitiv)", detail: "Maskulin → +s eki (Lärm + s)", color: "text-green-300" },
      { word: "schläft", role: "Verb", detail: "schlafen — 3. Kişi Tekil", color: "text-skill-grammatik" },
      { word: "das Baby.", role: "Nomen (Subjekt)", detail: "Neutrum · Nominativ", color: "text-text-primary" },
    ],
  },
  {
    full: "Aufgrund der starken Kälte bleibt er drinnen.",
    translation: "Şiddetli soğuk nedeniyle içeride kalıyor.",
    type: "praeposition",
    parts: [
      { word: "Aufgrund", role: "Genitiv-Präposition", detail: "aufgrund → Genitiv gerektirir", color: "text-amber-400" },
      { word: "der", role: "Genitiv-Artikel", detail: "Feminin Genitiv → der", color: "text-green-400" },
      { word: "starken", role: "Adjektiv (schwach)", detail: "Fem. Gen. nach der → -en soneki", color: "text-gold" },
      { word: "Kälte", role: "Nomen (Genitiv)", detail: "Feminin → +e eki yok (değişmez)", color: "text-green-300" },
      { word: "bleibt", role: "Verb", detail: "bleiben — 3. Kişi Tekil", color: "text-skill-grammatik" },
      { word: "er", role: "Kişi Zamiri", detail: "3. Tekil Erkek (Subjekt)", color: "text-text-primary" },
      { word: "drinnen.", role: "Adverb", detail: "İçeride (konum belirteci)", color: "text-text-muted" },
    ],
  },
];

const TYPE_META = {
  besitz:      { label: "Sahiplik",   color: "text-green-400",  bg: "bg-green-500/15",  border: "border-green-500/30" },
  praeposition: { label: "Präposition", color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/30" },
};

/* ── Main page ─────────────────────────────────────────────── */
export default function GenitivPage() {
  const [exFilter, setExFilter] = useState<"all" | "besitz" | "praeposition">("all");
  const [prepOpen, setPrepOpen] = useState(false);
  const [trickOpen, setTrickOpen] = useState(false);
  const [bdFilter, setBdFilter] = useState<"all" | "besitz" | "praeposition">("all");
  const [expandedBd, setExpandedBd] = useState<number | null>(0);

  const filteredEx = exFilter === "all" ? examples : examples.filter((e) => e.type === exFilter);
  const filteredBd = bdFilter === "all" ? breakdownSentences : breakdownSentences.filter((s) => s.type === bdFilter);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">

      {/* ── HERO ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10"
      >
        <div className="absolute -top-16 -right-20 w-72 h-72 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30">B1</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-skill-lesen/20 text-skill-lesen border border-skill-lesen/30">Grammatik</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            Genitiv
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-2xl mb-5">
            Genitiv, <strong className="text-green-400">sahiplik</strong> ve{" "}
            <strong className="text-amber-400">belirli edatlar</strong> ile kullanılan 4. Almanca hâlidir.
            "Kimin?" sorusunu yanıtlar. Maskulin ve Neutrum isimler{" "}
            <strong className="text-gold">-s</strong> veya{" "}
            <strong className="text-gold">-es</strong> eki alır.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Sahiplik İfadesi", icon: Link2 },
              { label: "10 Genitiv Edatı", icon: BookOpen },
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

      {/* ── KEY CONCEPT CARDS ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: "Sahiplik (Possesiv)",
            icon: Link2,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            items: [
              "Das Buch des Mannes → Adamın kitabı",
              "Die Tasche der Frau → Kadının çantası",
              "Das Zimmer des Kindes → Çocuğun odası",
              "Maskulin/Neutrum → des (+s/+es)",
              "Feminin/Plural → der (değişmez)",
            ],
          },
          {
            title: "Genitiv Edatları",
            icon: BookOpen,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            items: [
              "wegen → yüzünden / nedeniyle",
              "trotz → rağmen",
              "während → sırasında / esnasında",
              "statt / anstatt → yerine",
              "aufgrund → dolayısıyla",
            ],
          },
        ].map(({ title, icon: Icon, color, bg, border, items }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
            className={`${bg} border ${border} rounded-2xl p-5`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className={`w-5 h-5 ${color}`} />
              <h3 className={`font-bold text-base ${color}`}>{title}</h3>
            </div>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                  <CheckCircle className={`w-3.5 h-3.5 ${color} shrink-0 mt-0.5`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* ── ARTICLE TABLE ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-navy-border">
          <h2 className="text-text-primary font-bold text-base">Bestimmter Artikel — 4 Hal</h2>
          <p className="text-text-muted text-xs mt-0.5">Genitiv satırı vurgulanmıştır</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left px-3 py-2.5 text-text-muted font-semibold text-xs w-24" />
                {["Maskulin", "Feminin", "Neutrum", "Plural"].map((g) => (
                  <th key={g} className="text-center px-3 py-2.5 text-text-secondary font-bold text-xs">{g}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articleTable.map((row, i) => (
                <tr key={row.kasus} className={`${row.highlight ? "bg-green-500/10" : i % 2 === 0 ? "bg-navy/40" : ""}`}>
                  <td className={`px-3 py-2.5 font-bold text-xs ${row.highlight ? "text-green-400" : "text-text-muted"}`}>
                    {row.kasus}
                  </td>
                  {[row.mask, row.fem, row.neu, row.plural].map((val, gi) => (
                    <td key={gi} className="px-3 py-2.5 text-center">
                      <span className={`font-extrabold text-sm ${row.highlight ? "text-green-400 bg-green-500/15 px-2 py-0.5 rounded-lg" : "text-text-primary"}`}>
                        {val}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Noun ending info */}
        <div className="mx-4 mb-4 p-4 bg-navy/50 border border-gold/20 rounded-xl">
          <p className="text-gold font-bold text-xs mb-2">⚠️ İsim Ekleri (önemli!)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { rule: "Maskulin + Neutrum → +s", ex: "der Mann → des Mannes, das Kind → des Kindes" },
              { rule: "Tek heceli M/N → +es", ex: "das Buch → des Buches, der Hund → des Hundes" },
              { rule: "Feminin → değişmez", ex: "die Frau → der Frau, die Mutter → der Mutter" },
              { rule: "Plural → değişmez", ex: "die Bücher → der Bücher, die Kinder → der Kinder" },
            ].map(({ rule, ex }) => (
              <div key={rule} className="text-xs">
                <span className="text-gold font-semibold">{rule}:</span>
                <span className="text-text-muted ml-1">{ex}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── GENITIV PREPOSITIONS ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        <button
          onClick={() => setPrepOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-navy/20 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-text-primary font-bold text-base">Genitiv Edatları (10 adet)</p>
              <p className="text-text-muted text-xs">Sınavda çok çıkan edatlar</p>
            </div>
          </div>
          <motion.span animate={{ rotate: prepOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {prepOpen && (
            <motion.div
              key="preps"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {genitivePreps.map(({ prep, meaning, example, tr }, i) => (
                  <motion.div
                    key={prep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="bg-navy border border-navy-border rounded-xl p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-amber-400 text-sm">{prep}</span>
                      <span className="text-[10px] text-text-muted bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        {meaning}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Speak text={example} small />
                      <div>
                        <p className="text-text-primary text-xs font-medium">{example}</p>
                        <p className="text-text-muted text-[10px] mt-0.5">{tr}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── EXAMPLE SENTENCES ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-navy-border flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-text-primary font-bold text-base">Örnek Cümleler</h2>
          <div className="flex gap-2 flex-wrap">
            {([["all", "Tümü"], ["besitz", "Sahiplik"], ["praeposition", "Präposition"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setExFilter(val)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                  exFilter === val
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
            {filteredEx.map((ex, i) => {
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
                    <Speak text={ex.de} small />
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
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-navy-border flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-skill-grammatik/20 rounded-xl flex items-center justify-center">
              <Layers className="w-4 h-4 text-skill-grammatik" />
            </div>
            <div>
              <h2 className="text-text-primary font-bold text-base">Cümleyi Parçalara Ayır</h2>
              <p className="text-text-muted text-xs">Her kelimeyi rolü ve Genitiv yapısıyla incele</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {([["all", "Tümü"], ["besitz", "Sahiplik"], ["praeposition", "Präposition"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setBdFilter(val); setExpandedBd(null); }}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                  bdFilter === val
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

        <div className="p-4 space-y-3">
          {filteredBd.map((sentence, i) => {
            const meta = TYPE_META[sentence.type];
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
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpandedBd(isOpen ? null : i); }}
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
                    <Speak text={sentence.full} small />
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
              <p className="text-text-muted text-xs">Genitiv'i asla karıştırmayacaksın</p>
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
                    title: "des/der tek sorusu: Kimin?",
                    body: "Genitiv 'wessen?' (kimin?) sorusunu yanıtlar. des Mannes = adamın, der Frau = kadının. Bu soruyu sorarak Genitiv'i tanıyabilirsin.",
                    color: "text-green-400",
                    bg: "bg-green-500/10",
                    border: "border-green-500/20",
                  },
                  {
                    title: "Maskulin/Neutrum → +s veya +es",
                    body: "der Mann → des Mannes (çok heceli: +s). das Buch → des Buches (tek heceli: +es). Kural: -s, -sch, -z, -tz, -x ile bitenler +es alır.",
                    color: "text-gold",
                    bg: "bg-gold/10",
                    border: "border-gold/20",
                  },
                  {
                    title: "Feminin/Plural → değişmez",
                    body: "Feminin isimler ve çoğul isimler Genitiv'de değişmez! Sadece artikel 'der' olur: die Frau → der Frau, die Bücher → der Bücher.",
                    color: "text-amber-400",
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/20",
                  },
                  {
                    title: "wegen, trotz, während, statt → Genitiv!",
                    body: "Bu 4 edat en çok sınavda çıkar. Hepsinden sonra Genitiv kullan. Konuşma dilinde 'wegen + Dativ' de duyabilirsin ama yazılı Almancada Genitiv kullan.",
                    color: "text-skill-grammatik",
                    bg: "bg-skill-grammatik/10",
                    border: "border-skill-grammatik/20",
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
                    Hızlı Özet: Genitiv Artikel
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-navy-border">
                          <th className="text-left py-1.5 px-2 text-text-muted">Cinsiyet</th>
                          <th className="text-center py-1.5 px-2 text-text-muted">Nominativ</th>
                          <th className="text-center py-1.5 px-2 text-green-400">Genitiv</th>
                          <th className="text-left py-1.5 px-2 text-text-muted">İsim Eki</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Maskulin", "der Mann", "des Mannes", "+s / +es"],
                          ["Feminin",  "die Frau",  "der Frau",   "değişmez"],
                          ["Neutrum",  "das Kind",  "des Kindes", "+s / +es"],
                          ["Plural",   "die Bücher", "der Bücher", "değişmez"],
                        ].map(([cins, nom, gen, ek], ri) => (
                          <tr key={cins} className={ri % 2 === 0 ? "bg-navy/30" : ""}>
                            <td className="py-1.5 px-2 text-text-muted font-medium">{cins}</td>
                            <td className="py-1.5 px-2 text-center text-text-secondary">{nom}</td>
                            <td className="py-1.5 px-2 text-center text-green-400 font-bold">{gen}</td>
                            <td className="py-1.5 px-2 text-gold font-semibold">{ek}</td>
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

      {/* ── PRACTICE SECTION ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        <GrammarTracker topicId="genitiv" level="B1" />
        <PracticeSection />
      </motion.div>

    </div>
  );
}
