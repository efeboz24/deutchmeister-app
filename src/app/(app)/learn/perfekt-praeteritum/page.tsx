"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BookOpen, Lightbulb, ArrowRight, CheckCircle2, Star,
  ChevronDown, MessageSquare, Zap, Clock, PenLine, Layers,
} from "lucide-react";
import { SpeakBtn } from "../akkusativ-dativ/PracticeSection";
import { PerfektPracticeSection } from "./PracticeSection";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

function fu(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

/* ── data ──────────────────────────────────────────────────── */
const habenVerbs = [
  { inf: "kaufen",    pp: "gekauft",    ex: "Ich habe das Buch gekauft.",    tr: "Kitabı satın aldım." },
  { inf: "essen",     pp: "gegessen",   ex: "Er hat Pizza gegessen.",        tr: "Pizza yedi." },
  { inf: "trinken",   pp: "getrunken",  ex: "Sie hat Wasser getrunken.",     tr: "Su içti." },
  { inf: "schreiben", pp: "geschrieben",ex: "Wir haben Briefe geschrieben.", tr: "Mektup yazdık." },
  { inf: "lesen",     pp: "gelesen",    ex: "Ich habe das Buch gelesen.",    tr: "Kitabı okudum." },
  { inf: "hören",     pp: "gehört",     ex: "Er hat Musik gehört.",          tr: "Müzik dinledi." },
  { inf: "machen",    pp: "gemacht",    ex: "Sie hat Hausaufgaben gemacht.", tr: "Ödev yaptı." },
  { inf: "sehen",     pp: "gesehen",    ex: "Wir haben den Film gesehen.",   tr: "Filmi gördük." },
];

const seinVerbs = [
  { inf: "gehen",       pp: "gegangen",    ex: "Ich bin nach Hause gegangen.",     tr: "Eve gittim." },
  { inf: "fahren",      pp: "gefahren",    ex: "Er ist nach Berlin gefahren.",     tr: "Berlin'e gitti." },
  { inf: "kommen",      pp: "gekommen",    ex: "Sie ist spät gekommen.",           tr: "Geç geldi." },
  { inf: "laufen",      pp: "gelaufen",    ex: "Wir sind im Park gelaufen.",       tr: "Parkta koştuk." },
  { inf: "fliegen",     pp: "geflogen",    ex: "Er ist nach Paris geflogen.",      tr: "Paris'e uçtu." },
  { inf: "aufstehen",   pp: "aufgestanden",ex: "Sie ist früh aufgestanden.",       tr: "Erken kalktı." },
  { inf: "einschlafen", pp: "eingeschlafen",ex:"Das Kind ist eingeschlafen.",      tr: "Çocuk uyudu." },
  { inf: "sein",        pp: "gewesen",     ex: "Er ist krank gewesen.",            tr: "Hasta oldu." },
];

const praeteritumForms = [
  { verb: "sein",  sg1: "war",    sg2: "warst",    sg3: "war",    pl1: "waren",   pl2: "wart",    pl3: "waren",   color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/25" },
  { verb: "haben", sg1: "hatte",  sg2: "hattest",  sg3: "hatte",  pl1: "hatten",  pl2: "hattet",  pl3: "hatten",  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
];

const exampleComparisons = [
  {
    perfekt: "Ich habe das Buch gelesen.",
    praeteritum: "Ich las das Buch.",
    tr: "Kitabı okudum.",
    type: "haben",
    note: "Konuşma dilinde → Perfekt tercih edilir",
  },
  {
    perfekt: "Er ist nach Berlin gefahren.",
    praeteritum: "Er fuhr nach Berlin.",
    tr: "Berlin'e gitti.",
    type: "sein",
    note: "Yazı dilinde → Präteritum daha yaygın",
  },
  {
    perfekt: "Wir haben Kaffee getrunken.",
    praeteritum: "Wir tranken Kaffee.",
    tr: "Kahve içtik.",
    type: "haben",
    note: "Günlük konuşmada → Perfekt",
  },
  {
    perfekt: "Sie ist aufgestanden.",
    praeteritum: "Sie stand auf.",
    tr: "Kalktı.",
    type: "sein",
    note: "Hikaye anlatımında → Präteritum",
  },
];

/* ── sub-components ─────────────────────────────────────────── */
function SectionTitle({ icon: Icon, title, subtitle, color = "text-gold" }: {
  icon: React.ElementType; title: string; subtitle?: string; color?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 bg-gold/15 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        {subtitle && <p className="text-text-secondary text-sm mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function VerbAccordion({ title, verbs, color, bg, border, helpIcon }: {
  title: string; verbs: typeof habenVerbs; color: string; bg: string; border: string; helpIcon: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`border ${border} rounded-2xl overflow-hidden`}>
      <button onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-5 py-4 ${bg} hover:opacity-90 transition-opacity`}>
        <span className={`font-bold text-sm ${color} flex items-center gap-2`}>
          <span className="text-base">{helpIcon}</span>{title}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className={`w-4 h-4 ${color}`} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="bg-navy-card">
              <div className="grid grid-cols-4 px-4 py-2 text-xs text-text-muted font-semibold uppercase tracking-wider border-b border-navy-border">
                <span>Infinitiv</span><span>Partizip II</span><span className="col-span-2">Örnek Cümle</span>
              </div>
              {verbs.map((v, i) => (
                <motion.div key={v.inf} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-4 px-4 py-3 border-b border-navy-border last:border-0 hover:bg-navy/30 transition-colors items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold text-sm ${color}`}>{v.inf}</span>
                    <SpeakBtn text={v.inf} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-primary font-semibold text-sm">{v.pp}</span>
                    <SpeakBtn text={v.pp} />
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5">
                    <span className="text-text-secondary text-xs leading-relaxed">{v.ex}</span>
                    <SpeakBtn text={v.ex} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuizCard() {
  const questions = [
    { q: "Ich ___ gestern ins Kino gegangen. (gehen → 'sein')", audio: "Ich bin gestern ins Kino gegangen.", answer: "bin", options: ["habe", "bin", "war", "hatte"] },
    { q: "Er ___ das Buch gelesen. (lesen → 'haben')", audio: "Er hat das Buch gelesen.", answer: "hat", options: ["ist", "hat", "war", "hatte"] },
    { q: "Sie ___ früh aufgestanden. (aufstehen → 'sein')", audio: "Sie ist früh aufgestanden.", answer: "ist", options: ["hat", "ist", "hatte", "war"] },
    { q: "Wir ___ keine Zeit. (Präteritum – haben)", audio: "Wir hatten keine Zeit.", answer: "hatten", options: ["haben", "hatten", "sind", "waren"] },
  ];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[current];
  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) setDone(true);
      else { setCurrent((c) => c + 1); setSelected(null); }
    }, 900);
  }
  function restart() { setCurrent(0); setSelected(null); setScore(0); setDone(false); }
  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl p-6">
      <SectionTitle icon={Zap} title="Hızlı Test" subtitle="Doğru formu seç!" color="text-amber-400" />
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-5xl mb-4">{score >= 3 ? "🎉" : "💪"}</div>
            <p className="text-2xl font-bold text-text-primary mb-2">{score}/{questions.length} doğru</p>
            <button onClick={restart} className="mt-4 px-6 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors">
              Tekrar Dene
            </button>
          </motion.div>
        ) : (
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted">{current + 1}/{questions.length}</span>
              <span className="text-xs text-gold font-semibold">{score} puan</span>
            </div>
            <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
              <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(current / questions.length) * 100}%` }} />
            </div>
            <div className="flex items-center gap-2 mb-5">
              <p className="text-text-primary font-semibold text-sm leading-relaxed flex-1">{q.q}</p>
              <SpeakBtn text={q.audio} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt) => {
                const isCorrect = opt === q.answer, isSel = opt === selected;
                let style = "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
                if (selected) {
                  if (isCorrect) style = "bg-green-500/20 border-green-500/50 text-green-400";
                  else if (isSel) style = "bg-red-500/20 border-red-500/50 text-red-400";
                  else style = "bg-navy border-navy-border text-text-muted opacity-50";
                }
                return (
                  <motion.button key={opt} onClick={() => choose(opt)}
                    whileHover={!selected ? { scale: 1.03 } : {}}
                    className={`py-3 px-4 border rounded-xl font-bold text-base transition-all duration-200 ${style}`}>
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── breakdown data ─────────────────────────────────────────── */
interface SentencePart { word: string; role: string; detail: string; color: string; }
interface BdSentence { full: string; translation: string; type: "perfekt" | "praeteritum"; parts: SentencePart[]; }

const breakdownSentences: BdSentence[] = [
  {
    full: "Ich habe das Buch gelesen.",
    translation: "Kitabı okudum.",
    type: "perfekt",
    parts: [
      { word: "Ich",    role: "Özne (Subjekt)",    detail: "1. tekil şahıs zamiri",                color: "text-purple-400" },
      { word: "habe",   role: "Yardımcı Fiil",     detail: "haben → Präsens, 1. tekil",           color: "text-blue-400" },
      { word: "das",    role: "Akkusativ Artikel",  detail: "das (Nötr, Akkusativ)",               color: "text-gold" },
      { word: "Buch",   role: "Nesne",              detail: "nötr isim",                           color: "text-text-secondary" },
      { word: "gelesen",role: "Partizip II",        detail: "lesen → gelesen (düzensiz fiil)",     color: "text-purple-300" },
    ],
  },
  {
    full: "Er ist nach Berlin gefahren.",
    translation: "Berlin'e gitti.",
    type: "perfekt",
    parts: [
      { word: "Er",       role: "Özne (Subjekt)",  detail: "3. tekil erkek zamiri",              color: "text-purple-400" },
      { word: "ist",      role: "Yardımcı Fiil",   detail: "sein → Präsens, 3. tekil",           color: "text-emerald-400" },
      { word: "nach",     role: "Edat (Dativ)",    detail: "nach + Dativ (yön bildiriyor)",       color: "text-amber-400" },
      { word: "Berlin",   role: "Yer Adı",         detail: "Dativ nesne (nach ile)",              color: "text-text-secondary" },
      { word: "gefahren", role: "Partizip II",     detail: "fahren → gefahren (hareket fiili → sein!)", color: "text-emerald-300" },
    ],
  },
  {
    full: "Wir hatten keine Zeit.",
    translation: "Zamanımız yoktu.",
    type: "praeteritum",
    parts: [
      { word: "Wir",    role: "Özne (Subjekt)",    detail: "1. çoğul şahıs zamiri",              color: "text-purple-400" },
      { word: "hatten", role: "Yüklem (Präteritum)", detail: "haben → hatten (Präteritum, çoğul)", color: "text-orange-400" },
      { word: "keine",  role: "Olumsuz Artikel",   detail: "kein → keine (Akkusativ, Fem.)",     color: "text-red-400" },
      { word: "Zeit",   role: "Nesne",             detail: "dişi isim, Akkusativ",               color: "text-text-secondary" },
    ],
  },
  {
    full: "Sie ist früh aufgestanden.",
    translation: "Erken kalktı.",
    type: "perfekt",
    parts: [
      { word: "Sie",          role: "Özne (Subjekt)", detail: "3. tekil dişi zamiri",              color: "text-purple-400" },
      { word: "ist",          role: "Yardımcı Fiil",  detail: "sein → hal değişimi fiili!",        color: "text-emerald-400" },
      { word: "früh",         role: "Zarf (Adverb)",  detail: "zaman zarfı: erken",               color: "text-sky-400" },
      { word: "aufgestanden", role: "Partizip II",    detail: "aufstehen → aufgestanden (ayrılabilir fiil, ge- ortaya girer)", color: "text-emerald-300" },
    ],
  },
  {
    full: "Das Kind war krank.",
    translation: "Çocuk hastaydı.",
    type: "praeteritum",
    parts: [
      { word: "Das Kind", role: "Özne (Subjekt)",    detail: "nötr isim, Nominativ",              color: "text-purple-400" },
      { word: "war",      role: "Yüklem (Präteritum)", detail: "sein → war (Präteritum, 3. tekil — günlük dilde Perfekt yerine!)", color: "text-orange-400" },
      { word: "krank",    role: "Yüklem Sıfatı",    detail: "Prädikativum: özneyi tanımlar",     color: "text-red-400" },
    ],
  },
  {
    full: "Wir haben gestern Kaffee getrunken.",
    translation: "Dün kahve içtik.",
    type: "perfekt",
    parts: [
      { word: "Wir",       role: "Özne (Subjekt)",  detail: "1. çoğul şahıs zamiri",             color: "text-purple-400" },
      { word: "haben",     role: "Yardımcı Fiil",   detail: "haben → Präsens, 1. çoğul",         color: "text-blue-400" },
      { word: "gestern",   role: "Zarf (Adverb)",   detail: "zaman zarfı: dün",                  color: "text-sky-400" },
      { word: "Kaffee",    role: "Nesne",           detail: "erkek isim, Akkusativ (artikelsiz kullanım)", color: "text-text-secondary" },
      { word: "getrunken", role: "Partizip II",     detail: "trinken → getrunken (düzensiz fiil)", color: "text-blue-300" },
    ],
  },
];

/* ── main page ──────────────────────────────────────────────── */
export default function PerfektPraeteritumPage() {
  const [compTab, setCompTab] = useState<"perfekt" | "praeteritum">("perfekt");
  const [bdFilter, setBdFilter] = useState<"all" | "perfekt" | "praeteritum">("all");
  const [expandedBd, setExpandedBd] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <motion.div {...fu(0)}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-bold tracking-wide uppercase">A2 – B1</span>
            <span className="px-3 py-1 bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30 rounded-full text-xs font-bold tracking-wide uppercase">Grammatik</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight mb-3">
            Perfekt <span className="text-gold">&</span> Präteritum
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Almanca'da geçmiş zaman iki farklı şekilde kullanılır. Perfekt günlük konuşmada,
            Präteritum ise yazı dilinde ve "sein/haben" gibi temel fiillerde tercih edilir. 📖
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[{ label: "haben ile Perfekt", icon: CheckCircle2 }, { label: "sein ile Perfekt", icon: ArrowRight }, { label: "60 pratik soru", icon: Zap }]
              .map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 bg-navy/60 border border-navy-border rounded-lg text-sm text-text-secondary">
                  <Icon className="w-3.5 h-3.5 text-gold" />{label}
                </div>
              ))}
          </div>
        </div>
      </motion.div>

      {/* ── TEMEL FARK ───────────────────────────────────────── */}
      <motion.div {...fu(0.05)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-navy-card border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="w-12 h-12 bg-purple-500/15 rounded-2xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-purple-400 mb-2">Perfekt</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              <strong className="text-text-primary">Günlük konuşmada</strong> kullanılan geçmiş zaman.
              "haben" veya "sein" + Partizip II ile oluşur.
            </p>
            <div className="bg-navy rounded-xl p-3 border border-navy-border space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-bold text-xs w-16 shrink-0">Yapısı:</span>
                <span className="text-text-secondary text-xs">haben/sein + Partizip II</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-bold text-xs w-16 shrink-0">Kullanım:</span>
                <span className="text-text-secondary text-xs">Konuşma dili, günlük hayat</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-xs text-text-muted italic flex-1">Ich <span className="text-purple-400 not-italic font-semibold">habe</span> Kaffee <span className="text-purple-400 not-italic font-semibold">getrunken</span>.</p>
              <SpeakBtn text="Ich habe Kaffee getrunken." />
            </div>
          </div>

          <div className="bg-navy-card border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="w-12 h-12 bg-orange-500/15 rounded-2xl flex items-center justify-center mb-4">
              <PenLine className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-orange-400 mb-2">Präteritum</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              <strong className="text-text-primary">Yazı dilinde</strong> kullanılan geçmiş zaman.
              Hikayeler, gazete haberleri ve raporlarda tercih edilir.
            </p>
            <div className="bg-navy rounded-xl p-3 border border-navy-border space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold text-xs w-16 shrink-0">Yapısı:</span>
                <span className="text-text-secondary text-xs">Fiil kökü + özel ekler</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold text-xs w-16 shrink-0">Kullanım:</span>
                <span className="text-text-secondary text-xs">sein/haben + yazı dili</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-xs text-text-muted italic flex-1">Ich <span className="text-orange-400 not-italic font-semibold">trank</span> Kaffee.</p>
              <SpeakBtn text="Ich trank Kaffee." />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── PERFEKTBİLDUNG ───────────────────────────────────── */}
      <motion.div {...fu(0.1)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={BookOpen} title="Perfekt Nasıl Yapılır?"
          subtitle="Hangi fiil 'haben', hangileri 'sein' ile kullanılır?" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-navy/40 border border-navy-border rounded-xl p-4">
            <p className="text-blue-400 font-bold text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs">✓</span>
              "haben" ile → Geçişli fiiller
            </p>
            <p className="text-text-secondary text-xs leading-relaxed">
              Doğrudan nesne alan (Akkusativ) fiiller genellikle <strong className="text-text-primary">"haben"</strong> ile kullanılır.
            </p>
            <p className="text-xs text-text-muted mt-2 italic">essen, kaufen, trinken, lesen, schreiben…</p>
          </div>
          <div className="bg-navy/40 border border-navy-border rounded-xl p-4">
            <p className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-xs">→</span>
              "sein" ile → Hareket + hal değişimi
            </p>
            <p className="text-text-secondary text-xs leading-relaxed">
              Yer değişimi ve hal değişimi bildiren fiiller <strong className="text-text-primary">"sein"</strong> ile kullanılır.
            </p>
            <p className="text-xs text-text-muted mt-2 italic">gehen, fahren, kommen, aufstehen, einschlafen…</p>
          </div>
        </div>

        <div className="space-y-3">
          <VerbAccordion title="'haben' ile Perfekt Yapan Fiiller"
            verbs={habenVerbs} color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/25" helpIcon="🔵" />
          <VerbAccordion title="'sein' ile Perfekt Yapan Fiiller"
            verbs={seinVerbs} color="text-emerald-400" bg="bg-emerald-500/10" border="border-emerald-500/25" helpIcon="🟢" />
        </div>
      </motion.div>

      {/* ── PRÄTERITUMTABLİSİ ────────────────────────────────── */}
      <motion.div {...fu(0.15)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Clock} title="Präteritum — sein & haben"
          subtitle="Bu iki fiili Präteritum'da bilmek çok önemli!" color="text-orange-400" />

        <div className="space-y-4">
          {praeteritumForms.map((v) => (
            <div key={v.verb} className={`border ${v.border} rounded-xl overflow-hidden`}>
              <div className={`${v.bg} px-4 py-2.5 flex items-center gap-2`}>
                <span className={`font-bold ${v.color}`}>{v.verb} → Präteritum</span>
                <SpeakBtn text={v.verb} />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy/50">
                      {["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"].map((p) => (
                        <th key={p} className="px-3 py-2 text-text-muted text-xs font-semibold text-center">{p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-navy-border">
                      {[v.sg1, v.sg2, v.sg3, v.pl1, v.pl2, v.pl3].map((form, i) => (
                        <td key={i} className="px-3 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className={`font-bold ${v.color}`}>{form}</span>
                            <SpeakBtn text={form} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
          <p className="text-orange-400 font-semibold text-sm mb-1">⚠️ Kural İstisnası</p>
          <p className="text-text-secondary text-xs leading-relaxed">
            Günlük dilde <strong className="text-text-primary">sein</strong> ("war/waren") ve <strong className="text-text-primary">haben</strong> ("hatte/hatten") için
            Perfekt yerine Präteritum kullanılır. Bu çok daha doğal ve yaygındır.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-red-400 line-through opacity-60">Ich bin müde gewesen.</span>
            <ArrowRight className="w-3 h-3 text-text-muted" />
            <span className="text-xs text-green-400">Ich war müde. ✓</span>
            <SpeakBtn text="Ich war müde." />
          </div>
        </div>
      </motion.div>

      {/* ── KARŞILAŞTIRMA ────────────────────────────────────── */}
      <motion.div {...fu(0.2)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={MessageSquare} title="Perfekt vs Präteritum"
          subtitle="Aynı anlam, farklı kullanım — örneklerle karşılaştır!" />

        <div className="flex gap-2 mb-5">
          {(["perfekt", "praeteritum"] as const).map((t) => (
            <button key={t} onClick={() => setCompTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                compTab === t
                  ? t === "perfekt" ? "bg-purple-500/20 text-purple-400 border-purple-500/40" : "bg-orange-500/20 text-orange-400 border-orange-500/40"
                  : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {t === "perfekt" ? "Perfekt" : "Präteritum"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {exampleComparisons.map((c, i) => (
              <motion.div key={c.tr + compTab} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-xl border ${compTab === "perfekt" ? "bg-purple-500/5 border-purple-500/20" : "bg-orange-500/5 border-orange-500/20"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-text-primary text-sm">
                        {compTab === "perfekt" ? c.perfekt : c.praeteritum}
                      </p>
                      <SpeakBtn text={compTab === "perfekt" ? c.perfekt : c.praeteritum} />
                    </div>
                    <p className="text-text-secondary text-xs mt-0.5">{c.tr}</p>
                    <p className={`text-xs mt-2 font-medium ${compTab === "perfekt" ? "text-purple-400" : "text-orange-400"}`}>{c.note}</p>
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-bold
                    ${c.type === "haben" ? "bg-blue-500/15 text-blue-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                    {c.type === "haben" ? "haben" : "sein"}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── PARTİZİP II KURALLARI ─────────────────────────────── */}
      <motion.div {...fu(0.25)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Star} title="Partizip II Nasıl Yapılır?"
          subtitle="Düzenli ve düzensiz fiiller için formül" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-navy/40 border border-sky-500/25 rounded-xl p-4">
            <p className="text-sky-400 font-bold text-sm mb-3">✅ Düzenli Fiiller (regelmäßig)</p>
            <div className="bg-navy rounded-lg p-3 border border-navy-border mb-3 text-center">
              <span className="text-gold font-bold text-base">ge + Stamm + t</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { inf: "machen",  pp: "gemacht" },
                { inf: "kaufen",  pp: "gekauft" },
                { inf: "hören",   pp: "gehört" },
                { inf: "lernen",  pp: "gelernt" },
              ].map((v) => (
                <div key={v.inf} className="flex items-center justify-between py-1 border-b border-navy-border last:border-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-muted">{v.inf}</span>
                    <SpeakBtn text={v.inf} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sky-400 font-semibold">→ {v.pp}</span>
                    <SpeakBtn text={v.pp} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy/40 border border-amber-500/25 rounded-xl p-4">
            <p className="text-amber-400 font-bold text-sm mb-3">⚡ Düzensiz Fiiller (unregelmäßig)</p>
            <div className="bg-navy rounded-lg p-3 border border-navy-border mb-3 text-center">
              <span className="text-gold font-bold text-base">ge + (değişen) Stamm + en</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { inf: "schreiben", pp: "geschrieben" },
                { inf: "trinken",   pp: "getrunken" },
                { inf: "fahren",    pp: "gefahren" },
                { inf: "sehen",     pp: "gesehen" },
              ].map((v) => (
                <div key={v.inf} className="flex items-center justify-between py-1 border-b border-navy-border last:border-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-muted">{v.inf}</span>
                    <SpeakBtn text={v.inf} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-semibold">→ {v.pp}</span>
                    <SpeakBtn text={v.pp} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── TRICK KARTI ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border border-gold/30 rounded-2xl p-6">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="text-gold font-bold text-lg mb-3">Altın Kurallar</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
                <span className="text-purple-400 font-bold text-xl leading-none">1</span>
                <p className="text-text-secondary text-sm">
                  Günlük konuşmada <strong className="text-purple-400">Perfekt</strong> kullan.
                  <span className="text-text-muted text-xs block mt-0.5">Almanya'da insanlar konuşurken Präteritum kullanmaz!</span>
                </p>
              </div>
              <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
                <span className="text-orange-400 font-bold text-xl leading-none">2</span>
                <p className="text-text-secondary text-sm">
                  <strong className="text-orange-400">sein, haben</strong> ve modal fiiller için Präteritum daha doğal.
                  <span className="text-text-muted text-xs block mt-0.5">war, hatte, konnte, musste, wollte…</span>
                </p>
              </div>
              <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <span className="text-emerald-400 font-bold text-xl leading-none">3</span>
                <p className="text-text-secondary text-sm">
                  Hareket ve hal değişimi → <strong className="text-emerald-400">sein</strong> ile Perfekt.
                  <span className="text-text-muted text-xs block mt-0.5">gehen, fahren, kommen, aufstehen, einschlafen…</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── CÜMLEYİ PARÇALARA AYIR ───────────────────────────── */}
      <motion.div {...fu(0.32)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Layers} title="Cümleyi Parçalara Ayır"
          subtitle="Her kelimenin cümledeki rolünü analiz et — Perfekt mi, Präteritum mu?" />
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "perfekt", "praeteritum"] as const).map((f) => (
            <button key={f} onClick={() => { setBdFilter(f); setExpandedBd(null); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                bdFilter === f
                  ? f === "perfekt" ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
                    : f === "praeteritum" ? "bg-orange-500/20 text-orange-400 border-orange-500/40"
                    : "bg-gold/20 text-gold border-gold/40"
                  : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {f === "all" ? "Tümü" : f === "perfekt" ? "Perfekt" : "Präteritum"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {breakdownSentences
            .filter((s) => bdFilter === "all" || s.type === bdFilter)
            .map((s, idx) => {
              const isOpen = expandedBd === idx;
              return (
                <div key={s.full} className={`border rounded-xl overflow-hidden transition-colors ${
                  s.type === "perfekt" ? "border-purple-500/25" : "border-orange-500/25"}`}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setExpandedBd(isOpen ? null : idx)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandedBd(isOpen ? null : idx); }}
                    className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:opacity-90 transition-colors cursor-pointer ${
                      s.type === "perfekt" ? "bg-purple-500/8" : "bg-orange-500/8"}`}>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        s.type === "perfekt" ? "bg-purple-500/20 text-purple-400" : "bg-orange-500/20 text-orange-400"}`}>
                        {s.type === "perfekt" ? "PFT" : "PRT"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary text-sm">{s.full}</p>
                        <p className="text-text-muted text-xs">{s.translation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <SpeakBtn text={s.full} />
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                        <ChevronDown className="w-4 h-4 text-text-muted" />
                      </motion.span>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                        className="overflow-hidden">
                        <div className="px-5 pb-5 pt-3 bg-navy-card">
                          <p className="text-xs text-text-muted mb-3 font-medium uppercase tracking-wider">Kelime Analizi</p>
                          <div className="flex flex-wrap gap-3">
                            {s.parts.map((p, pi) => (
                              <motion.div key={pi}
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: pi * 0.06 }}
                                className="flex flex-col items-center gap-1.5 bg-navy border border-navy-border rounded-xl px-4 py-3 min-w-[90px]">
                                <span className={`font-bold text-base ${p.color}`}>{p.word}</span>
                                <span className="text-[10px] font-semibold text-text-secondary text-center leading-tight">{p.role}</span>
                                <span className="text-[9px] text-text-muted text-center leading-tight">{p.detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
        </div>
      </motion.div>

      {/* ── HIZLI TEST ───────────────────────────────────────── */}
      <motion.div {...fu(0.35)}>
        <QuizCard />
      </motion.div>

      {/* ── PRATİK BÖLÜMÜ ────────────────────────────────────── */}
      <motion.div {...fu(0.4)}>
        <GrammarTracker topicId="a2-perfekt" level="A2" />
        <PerfektPracticeSection />
      </motion.div>

    </div>
  );
}
