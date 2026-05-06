"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  Star,
  ChevronDown,
  MessageSquare,
  Volume2,
  Layers,
} from "lucide-react";
import { PracticeSection, SpeakBtn } from "./PracticeSection";
import { PrepPractice } from "./PrepPractice";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

function fu(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

/* ── data ──────────────────────────────────────────────────── */
const artikelTable = [
  { genus: "der (erkek)",  nom: "der", akk: "den", dat: "dem", color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/30" },
  { genus: "die (dişi)",  nom: "die", akk: "die", dat: "der", color: "text-pink-400",    bg: "bg-pink-500/10",    border: "border-pink-500/30" },
  { genus: "das (nötr)",  nom: "das", akk: "das", dat: "dem", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { genus: "die (çoğul)", nom: "die", akk: "die", dat: "den", color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30" },
];

const exampleSentences = [
  { de: "Ich sehe den Mann.",          tr: "Adamı görüyorum.",                  type: "akkusativ", note: '"den Mann" → Akkusativ (wen görüyorum?)', icon: "👁️" },
  { de: "Er gibt dem Kind ein Buch.",  tr: "Çocuğa bir kitap veriyor.",         type: "dativ",     note: '"dem Kind" → Dativ (wem veriyor?)',         icon: "📚" },
  { de: "Sie kauft die Tasche.",       tr: "Çantayı satın alıyor.",             type: "akkusativ", note: '"die Tasche" → Akkusativ (was alıyor?)',    icon: "🛍️" },
  { de: "Wir helfen der Frau.",        tr: "Kadına yardım ediyoruz.",           type: "dativ",     note: '"der Frau" → Dativ (wem yardım ediyoruz?)', icon: "🤝" },
  { de: "Er liebt das Auto.",          tr: "Arabayı seviyor.",                  type: "akkusativ", note: '"das Auto" → Akkusativ (was seviyor?)',     icon: "🚗" },
  { de: "Ich danke meinem Lehrer.",    tr: "Öğretmenime teşekkür ediyorum.",    type: "dativ",     note: '"meinem Lehrer" → Dativ (wem teşekkür?)',   icon: "🙏" },
];

const akkVerbs = ["sehen (görmek)", "kaufen (satın almak)", "lieben (sevmek)", "brauchen (ihtiyaç duymak)", "haben (sahip olmak)", "machen (yapmak)", "kennen (tanımak)", "hören (duymak)", "lesen (okumak)", "trinken (içmek)"];
const datVerbs = ["helfen (yardım etmek)", "danken (teşekkür etmek)", "gehören (ait olmak)", "gefallen (hoşlanmak)", "glauben (inanmak)", "folgen (takip etmek)", "antworten (cevaplamak)", "begegnen (karşılaşmak)", "vertrauen (güvenmek)", "zuhören (dinlemek)"];

const akkPreps = [
  { prep: "durch",  meaning: "aracılığıyla / içinden",  example: "durch den Park" },
  { prep: "für",    meaning: "için",                    example: "für dich" },
  { prep: "gegen",  meaning: "karşı",                   example: "gegen den Wind" },
  { prep: "ohne",   meaning: "olmadan",                 example: "ohne ihn" },
  { prep: "um",     meaning: "etrafında / saat",        example: "um das Haus" },
];
const datPreps = [
  { prep: "aus",        meaning: "dan/den çıkmak",         example: "aus dem Haus" },
  { prep: "bei",        meaning: "yanında / -da",           example: "bei mir" },
  { prep: "mit",        meaning: "ile birlikte",            example: "mit dem Bus" },
  { prep: "nach",       meaning: "sonra / -e doğru",       example: "nach Hause" },
  { prep: "seit",       meaning: "beri (-den beri)",       example: "seit einem Jahr" },
  { prep: "von",        meaning: "dan/den / tarafından",   example: "von ihr" },
  { prep: "zu",         meaning: "-e doğru / için",        example: "zu dir" },
  { prep: "gegenüber",  meaning: "karşısında",             example: "dem Park gegenüber" },
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

function QuizCard() {
  const questions = [
    { q: "Ich sehe ___ Mann. (der)", audio: "Ich sehe den Mann.", answer: "den", options: ["der", "den", "dem", "des"] },
    { q: "Er hilft ___ Frau. (die)", audio: "Er hilft der Frau.", answer: "der", options: ["die", "den", "der", "des"] },
    { q: "Wir kaufen ___ Auto. (das)", audio: "Wir kaufen das Auto.", answer: "das", options: ["das", "dem", "des", "den"] },
    { q: "Sie dankt ___ Lehrer. (der)", audio: "Sie dankt dem Lehrer.", answer: "dem", options: ["der", "den", "dem", "die"] },
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
      <SectionTitle icon={Zap} title="Hızlı Test" subtitle="Doğru artikel formunu seç!" color="text-amber-400" />
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-5xl mb-4">{score >= 3 ? "🎉" : "💪"}</div>
            <p className="text-2xl font-bold text-text-primary mb-2">{score}/{questions.length} doğru</p>
            <p className="text-text-secondary mb-6">
              {score === 4 ? "Mükemmel!" : score >= 2 ? "İyi gidiyorsun!" : "Tekrar çalış!"}
            </p>
            <button onClick={restart} className="px-6 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors">
              Tekrar Dene
            </button>
          </motion.div>
        ) : (
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted">{current + 1}/{questions.length}</span>
              <span className="text-xs text-gold font-semibold">{score} puan</span>
            </div>
            <div className="w-full bg-navy-border rounded-full h-1.5 mb-6">
              <div className="bg-gold h-1.5 rounded-full transition-all duration-300" style={{ width: `${(current / questions.length) * 100}%` }} />
            </div>
            <div className="flex items-center gap-2 mb-5">
              <p className="text-text-primary font-semibold text-lg flex-1">{q.q}</p>
              <SpeakBtn text={q.audio} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt) => {
                const isCorrect = opt === q.answer;
                const isSelected = opt === selected;
                let style = "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
                if (selected) {
                  if (isCorrect) style = "bg-green-500/20 border-green-500/50 text-green-400";
                  else if (isSelected) style = "bg-red-500/20 border-red-500/50 text-red-400";
                  else style = "bg-navy border-navy-border text-text-muted opacity-50";
                }
                return (
                  <motion.button key={opt} onClick={() => choose(opt)}
                    whileHover={!selected ? { scale: 1.03 } : {}} whileTap={!selected ? { scale: 0.97 } : {}}
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

function PrepAccordion({ title, preps, color, bg, border, children }: {
  title: string; preps: typeof akkPreps; color: string; bg: string; border: string; children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`border ${border} rounded-2xl overflow-hidden`}>
      <button onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-5 py-4 ${bg} hover:opacity-90 transition-opacity`}>
        <span className={`font-bold text-base ${color}`}>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className={`w-4 h-4 ${color}`} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="p-5 space-y-3 bg-navy-card">
              {preps.map((p, i) => (
                <motion.div key={p.prep} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-start justify-between gap-4 py-2 border-b border-navy-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-sm ${color} w-20 shrink-0`}>{p.prep}</span>
                    <span className="text-text-secondary text-sm">{p.meaning}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-text-muted text-xs italic">{p.example}</span>
                    <SpeakBtn text={p.example} />
                  </div>
                </motion.div>
              ))}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── breakdown data ─────────────────────────────────────────── */
interface SentencePart { word: string; role: string; detail: string; color: string; }
interface BdSentence { full: string; translation: string; type: "akkusativ" | "dativ"; parts: SentencePart[]; }

const breakdownSentences: BdSentence[] = [
  {
    full: "Ich sehe den Mann.",
    translation: "Adamı görüyorum.",
    type: "akkusativ",
    parts: [
      { word: "Ich",  role: "Özne (Subjekt)",      detail: "1. tekil şahıs zamiri",       color: "text-purple-400" },
      { word: "sehe", role: "Yüklem (Verb)",        detail: "sehen → Präsens, 1. tekil",  color: "text-gold" },
      { word: "den",  role: "Akkusativ Artikel",    detail: "der → den (Akkusativ, Mask.)", color: "text-blue-400" },
      { word: "Mann", role: "Nesne (Akkusativobjekt)", detail: "erkek isim, Mask.",       color: "text-blue-300" },
    ],
  },
  {
    full: "Er gibt dem Kind ein Buch.",
    translation: "Çocuğa bir kitap veriyor.",
    type: "dativ",
    parts: [
      { word: "Er",   role: "Özne (Subjekt)",       detail: "3. tekil erkek zamiri",       color: "text-purple-400" },
      { word: "gibt", role: "Yüklem (Verb)",         detail: "geben → Präsens, 3. tekil",  color: "text-gold" },
      { word: "dem",  role: "Dativ Artikel",         detail: "das → dem (Dativ, Nötr)",    color: "text-emerald-400" },
      { word: "Kind", role: "Dolaylı Nesne (Dativobjekt)", detail: "nötr isim",            color: "text-emerald-300" },
      { word: "ein",  role: "Akkusativ Artikel",     detail: "ein (Akkusativ, Nötr)",       color: "text-blue-400" },
      { word: "Buch", role: "Nesne (Akkusativobjekt)", detail: "nötr isim",                color: "text-blue-300" },
    ],
  },
  {
    full: "Wir helfen der Frau.",
    translation: "Kadına yardım ediyoruz.",
    type: "dativ",
    parts: [
      { word: "Wir",   role: "Özne (Subjekt)",      detail: "1. çoğul şahıs zamiri",      color: "text-purple-400" },
      { word: "helfen",role: "Yüklem (Verb)",        detail: "helfen → Dativ fiili!",      color: "text-gold" },
      { word: "der",   role: "Dativ Artikel",        detail: "die → der (Dativ, Fem.)",    color: "text-emerald-400" },
      { word: "Frau",  role: "Dolaylı Nesne (Dativobjekt)", detail: "dişi isim",           color: "text-emerald-300" },
    ],
  },
  {
    full: "Sie kauft die Tasche für ihre Freundin.",
    translation: "Arkadaşı için çantayı satın alıyor.",
    type: "akkusativ",
    parts: [
      { word: "Sie",     role: "Özne (Subjekt)",     detail: "3. tekil dişi zamiri",        color: "text-purple-400" },
      { word: "kauft",   role: "Yüklem (Verb)",       detail: "kaufen → Präsens, 3. tekil", color: "text-gold" },
      { word: "die",     role: "Akkusativ Artikel",   detail: "die (Akkusativ, Fem.) — değişmez", color: "text-blue-400" },
      { word: "Tasche",  role: "Nesne (Akkusativobjekt)", detail: "dişi isim",              color: "text-blue-300" },
      { word: "für",     role: "Edat (Präposition)",  detail: "für → her zaman Akkusativ",  color: "text-amber-400" },
      { word: "ihre Freundin", role: "Akkusativ nesne (için)", detail: "dişi isim, 3. şahıs iyelik", color: "text-blue-300" },
    ],
  },
  {
    full: "Ich danke meinem Lehrer.",
    translation: "Öğretmenime teşekkür ediyorum.",
    type: "dativ",
    parts: [
      { word: "Ich",    role: "Özne (Subjekt)",      detail: "1. tekil şahıs zamiri",       color: "text-purple-400" },
      { word: "danke",  role: "Yüklem (Verb)",        detail: "danken → Dativ fiili!",       color: "text-gold" },
      { word: "meinem", role: "Dativ İyelik Zamiri",  detail: "mein → meinem (Dativ, Mask.)", color: "text-emerald-400" },
      { word: "Lehrer", role: "Dolaylı Nesne (Dativobjekt)", detail: "erkek isim",           color: "text-emerald-300" },
    ],
  },
  {
    full: "Das Kind schreibt dem Vater einen Brief.",
    translation: "Çocuk babaya bir mektup yazıyor.",
    type: "dativ",
    parts: [
      { word: "Das Kind",   role: "Özne (Subjekt)",      detail: "nötr isim, Nominativ",       color: "text-purple-400" },
      { word: "schreibt",   role: "Yüklem (Verb)",        detail: "schreiben → 3. tekil",       color: "text-gold" },
      { word: "dem",        role: "Dativ Artikel",        detail: "der → dem (Dativ, Mask.)",   color: "text-emerald-400" },
      { word: "Vater",      role: "Dolaylı Nesne (Dativobjekt)", detail: "erkek isim",          color: "text-emerald-300" },
      { word: "einen",      role: "Akkusativ Artikel",    detail: "ein → einen (Akkusativ, Mask.)", color: "text-blue-400" },
      { word: "Brief",      role: "Nesne (Akkusativobjekt)", detail: "erkek isim",              color: "text-blue-300" },
    ],
  },
];

/* ── main page ──────────────────────────────────────────────── */
export default function AkkusativDativPage() {
  const [activeTab, setActiveTab] = useState<"akkusativ" | "dativ" | "all">("all");
  const [bdFilter, setBdFilter] = useState<"all" | "akkusativ" | "dativ">("all");
  const [expandedBd, setExpandedBd] = useState<number | null>(null);

  const filtered = activeTab === "all"
    ? exampleSentences
    : exampleSentences.filter((s) => s.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <motion.div {...fu(0)}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-bold tracking-wide uppercase">A1 – A2</span>
            <span className="px-3 py-1 bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30 rounded-full text-xs font-bold tracking-wide uppercase">Grammatik</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight mb-3">
            Akkusativ <span className="text-gold">&</span> Dativ
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Almanca'da nesneleri doğru kullanmanın sırrı burada! Bu iki hal (Kasus), cümledeki kelimelerin
            nasıl değişeceğini belirler. Adım adım, örneklerle öğrenelim. 🚀
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "5 bölüm", icon: BookOpen },
              { label: "6 örnek cümle", icon: MessageSquare },
              { label: "60 pratik soru", icon: Zap },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 bg-navy/60 border border-navy-border rounded-lg text-sm text-text-secondary">
                <Icon className="w-3.5 h-3.5 text-gold" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── TEMEL KURAL ──────────────────────────────────────── */}
      <motion.div {...fu(0.05)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-navy-card border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="w-12 h-12 bg-blue-500/15 rounded-2xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-blue-400 mb-2">Akkusativ (4. Hal)</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Eylemin <strong className="text-text-primary">doğrudan etkilediği nesneyi</strong> gösterir.
              Türkçe'de "-i, -ı, -u, -ü" ekine karşılık gelir.
            </p>
            <div className="bg-navy rounded-xl p-3 border border-navy-border">
              <p className="text-xs text-text-muted mb-1 font-medium uppercase tracking-wider">Soru sor:</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="text-blue-400 font-bold text-sm">Wen?</span>
                  <span className="text-text-muted text-xs">(Kimi?)</span>
                  <SpeakBtn text="Wen?" />
                </div>
                <span className="text-navy-border">·</span>
                <div className="flex items-center gap-1">
                  <span className="text-blue-400 font-bold text-sm">Was?</span>
                  <span className="text-text-muted text-xs">(Neyi?)</span>
                  <SpeakBtn text="Was?" />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-xs text-text-muted italic flex-1">
                Örnek: Ich liebe <span className="text-blue-400 not-italic font-semibold">dich</span>. → seni seviyorum
              </p>
              <SpeakBtn text="Ich liebe dich." />
            </div>
          </div>

          <div className="bg-navy-card border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="w-12 h-12 bg-emerald-500/15 rounded-2xl flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-emerald-400 mb-2">Dativ (3. Hal)</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Eylemin <strong className="text-text-primary">dolaylı olarak etkilediği kişiyi</strong> gösterir.
              Türkçe'de "-e, -a" ekine karşılık gelir.
            </p>
            <div className="bg-navy rounded-xl p-3 border border-navy-border">
              <p className="text-xs text-text-muted mb-1 font-medium uppercase tracking-wider">Soru sor:</p>
              <div className="flex items-center gap-1">
                <span className="text-emerald-400 font-bold text-sm">Wem?</span>
                <span className="text-text-muted text-xs">(Kime?)</span>
                <SpeakBtn text="Wem?" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-xs text-text-muted italic flex-1">
                Örnek: Ich gebe <span className="text-emerald-400 not-italic font-semibold">dir</span> das Buch.
              </p>
              <SpeakBtn text="Ich gebe dir das Buch." />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── ARTİKEL TABLOSU ──────────────────────────────────── */}
      <motion.div {...fu(0.1)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={BookOpen} title="Artikel Değişim Tablosu" subtitle="Cins ve hale göre artikel nasıl değişir?" />
        <div className="overflow-x-auto rounded-xl border border-navy-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy">
                <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Cins</th>
                <th className="px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">
                  <span className="text-text-secondary">Nominativ</span><br />
                  <span className="text-[10px] normal-case font-normal opacity-60">Özne (kim/ne)</span>
                </th>
                <th className="px-4 py-3 text-blue-400 font-semibold text-xs uppercase tracking-wider">
                  Akkusativ<br />
                  <span className="text-[10px] normal-case font-normal opacity-70">Nesne (kimi/neyi)</span>
                </th>
                <th className="px-4 py-3 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                  Dativ<br />
                  <span className="text-[10px] normal-case font-normal opacity-70">Dolaylı nesne (kime)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {artikelTable.map((row, i) => (
                <motion.tr key={row.genus} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }} className="border-t border-navy-border hover:bg-navy/40 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`font-semibold text-sm ${row.color}`}>{row.genus}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 ${row.bg} ${row.border} border rounded-lg font-bold ${row.color}`}>{row.nom}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 bg-blue-500/15 border border-blue-500/40 rounded-lg font-bold text-blue-400 ${row.akk !== row.nom ? "ring-1 ring-blue-400/40" : ""}`}>
                      {row.akk}{row.akk !== row.nom && <span className="ml-1 text-[9px] text-blue-300 font-normal">●</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-3 py-1 bg-emerald-500/15 border border-emerald-500/40 rounded-lg font-bold text-emerald-400">{row.dat}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-text-muted mt-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
          Mavi nokta: Nominativ'den farklı olan değişimleri gösterir
        </p>
      </motion.div>

      {/* ── ÖRNEK CÜMLELER ───────────────────────────────────── */}
      <motion.div {...fu(0.15)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={MessageSquare} title="Örnek Cümleler" subtitle="Gerçek cümlelerle pekiştir!" />
        <div className="flex gap-2 mb-6">
          {(["all", "akkusativ", "dativ"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                activeTab === tab
                  ? tab === "akkusativ" ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                    : tab === "dativ" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-gold/20 text-gold border-gold/40"
                  : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {tab === "all" ? "Tümü" : tab === "akkusativ" ? "Akkusativ" : "Dativ"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div key={s.de} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`p-4 rounded-xl border ${s.type === "akkusativ" ? "bg-blue-500/5 border-blue-500/25" : "bg-emerald-500/5 border-emerald-500/25"}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-text-primary text-sm flex-1">{s.de}</p>
                      <SpeakBtn text={s.de} />
                    </div>
                    <p className="text-text-secondary text-xs mt-0.5">{s.tr}</p>
                    <p className={`text-xs mt-2 font-medium ${s.type === "akkusativ" ? "text-blue-400" : "text-emerald-400"}`}>{s.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── FİİL TABLOSU ─────────────────────────────────────── */}
      <motion.div {...fu(0.2)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Star} title="Önemli Fiiller" subtitle="Hangi fiil akkusativ, hangileri dativ ister?" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-blue-500/25 overflow-hidden">
            <div className="bg-blue-500/10 px-4 py-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-bold text-sm">Akkusativ İsteyen Fiiller</span>
            </div>
            <div className="p-4 space-y-2">
              {akkVerbs.map((v, i) => (
                <motion.div key={v} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-center gap-2 text-sm text-text-secondary py-1 border-b border-navy-border last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <span className="flex-1">{v}</span>
                  <SpeakBtn text={v.split(" ")[0]} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-emerald-500/25 overflow-hidden">
            <div className="bg-emerald-500/10 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm">Dativ İsteyen Fiiller</span>
            </div>
            <div className="p-4 space-y-2">
              {datVerbs.map((v, i) => (
                <motion.div key={v} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-center gap-2 text-sm text-text-secondary py-1 border-b border-navy-border last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="flex-1">{v}</span>
                  <SpeakBtn text={v.split(" ")[0]} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── EDATLAR ──────────────────────────────────────────── */}
      <motion.div {...fu(0.25)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={BookOpen} title="Edatlar (Präpositionen)"
          subtitle="Belirli edatlar her zaman aynı hali ister — ezberlemeye değer!" />
        <div className="space-y-4">
          <PrepAccordion title="Akkusativ İsteyen Edatlar (durch · für · gegen · ohne · um)"
            preps={akkPreps} color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/25" />
          <PrepAccordion title="Dativ İsteyen Edatlar (aus · bei · mit · nach · seit · von · zu · gegenüber)"
            preps={datPreps} color="text-emerald-400" bg="bg-emerald-500/10" border="border-emerald-500/25" />
        </div>
        <PrepPractice />
      </motion.div>

      {/* ── TRICK KARTI ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border border-gold/30 rounded-2xl p-6">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="text-gold font-bold text-lg mb-2">Altın Kural — Asla Unutma!</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-1">
                  <span className="text-blue-400 font-extrabold text-base">Wen? / Was?</span>
                  <SpeakBtn text="Wen? Was?" />
                </div>
                <ArrowRight className="w-4 h-4 text-text-muted" />
                <span className="text-blue-300 font-bold text-base">Akkusativ</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-1">
                  <span className="text-emerald-400 font-extrabold text-base">Wem?</span>
                  <SpeakBtn text="Wem?" />
                </div>
                <ArrowRight className="w-4 h-4 text-text-muted" />
                <span className="text-emerald-300 font-bold text-base">Dativ</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Hangi hali kullanacağını bilmiyorsan, cümleye{" "}
              <em className="text-text-primary not-italic font-semibold">"Kimi?"</em> veya{" "}
              <em className="text-text-primary not-italic font-semibold">"Kime?"</em> diye sor.
              "-i ekiyle" cevap → <strong className="text-blue-400">Akkusativ</strong>.{" "}
              "-e ekiyle" cevap → <strong className="text-emerald-400">Dativ</strong>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── CÜMLEYİ PARÇALARA AYIR ───────────────────────────── */}
      <motion.div {...fu(0.32)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Layers} title="Cümleyi Parçalara Ayır"
          subtitle="Her kelimenin cümledeki rolünü analiz et — Akkusativ mi, Dativ mi?" />
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "akkusativ", "dativ"] as const).map((f) => (
            <button key={f} onClick={() => { setBdFilter(f); setExpandedBd(null); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                bdFilter === f
                  ? f === "akkusativ" ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                    : f === "dativ" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-gold/20 text-gold border-gold/40"
                  : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {f === "all" ? "Tümü" : f === "akkusativ" ? "Akkusativ" : "Dativ"}
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
                  s.type === "akkusativ" ? "border-blue-500/25" : "border-emerald-500/25"}`}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setExpandedBd(isOpen ? null : idx)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandedBd(isOpen ? null : idx); }}
                    className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:opacity-90 cursor-pointer ${
                      s.type === "akkusativ" ? "bg-blue-500/8" : "bg-emerald-500/8"}`}>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        s.type === "akkusativ" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                        {s.type === "akkusativ" ? "AKK" : "DAT"}
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
        <GrammarTracker topicId="akkusativ" level="A1" />
        <PracticeSection />
      </motion.div>

    </div>
  );
}
