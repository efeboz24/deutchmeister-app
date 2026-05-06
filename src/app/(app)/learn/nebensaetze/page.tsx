"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BookOpen, Lightbulb, ChevronDown, MessageSquare, Zap,
  Layers, Star, ArrowRight,
} from "lucide-react";
import { PracticeSection, SpeakBtn } from "./PracticeSection";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

function fu(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

/* ── data ──────────────────────────────────────────────────── */
const nebensatzTypes = [
  {
    type: "kausal",  color: "text-red-400",    bg: "bg-red-500/8    border-red-500/25",
    title: "Kausalsatz (Neden?)",
    conjunctions: ["weil", "da"],
    rule: "Verb → sona gider",
    examples: [
      { de: "Er bleibt zu Hause, weil er krank ist.", tr: "Hasta olduğu için evde kalıyor." },
      { de: "Da es regnet, nehme ich einen Schirm.", tr: "Yağmur yağdığı için şemsiye alıyorum." },
    ],
  },
  {
    type: "temporal", color: "text-blue-400",  bg: "bg-blue-500/8   border-blue-500/25",
    title: "Temporalsatz (Ne Zaman?)",
    conjunctions: ["als", "wenn", "bevor", "nachdem", "seitdem", "bis", "während"],
    rule: "als = tek seferlik geçmiş; wenn = koşul/tekrar",
    examples: [
      { de: "Als ich jung war, spielte ich Fußball.", tr: "Genç olduğumda futbol oynardım." },
      { de: "Bevor sie schläft, liest sie ein Buch.", tr: "Uyumadan önce kitap okuyor." },
    ],
  },
  {
    type: "konditional", color: "text-amber-400", bg: "bg-amber-500/8 border-amber-500/25",
    title: "Konditionalsatz (Koşul)",
    conjunctions: ["wenn", "falls", "sofern"],
    rule: "wenn/falls → koşul cümlesi, ana cümle sonra",
    examples: [
      { de: "Wenn es regnet, bleibe ich zu Hause.", tr: "Yağmur yağarsa evde kalırım." },
      { de: "Falls du Zeit hast, ruf mich an.", tr: "Vaktın olursa ara beni." },
    ],
  },
  {
    type: "konzessiv", color: "text-purple-400", bg: "bg-purple-500/8 border-purple-500/25",
    title: "Konzessivsatz (Rağmen)",
    conjunctions: ["obwohl", "obgleich", "trotzdem (Hauptsatz)"],
    rule: "Beklenmedik karşıtlık — obwohl + Nebensatz",
    examples: [
      { de: "Obwohl er müde ist, arbeitet er weiter.", tr: "Yorgun olmasına rağmen çalışmaya devam ediyor." },
      { de: "Er kam zur Party, obwohl er krank war.", tr: "Hasta olmasına rağmen partiye geldi." },
    ],
  },
  {
    type: "final",   color: "text-emerald-400", bg: "bg-emerald-500/8 border-emerald-500/25",
    title: "Finalsatz (Amaç)",
    conjunctions: ["damit", "um … zu (+ Inf.)"],
    rule: "Hem özne aynı → um…zu; farklı özne → damit",
    examples: [
      { de: "Sie lernt Deutsch, damit sie in Wien arbeiten kann.", tr: "Viyana'da çalışabilmek için Almanca öğreniyor." },
      { de: "Er spart Geld, um ein Auto zu kaufen.", tr: "Araba almak için para biriktiriyor." },
    ],
  },
  {
    type: "konsekutiv", color: "text-sky-400", bg: "bg-sky-500/8 border-sky-500/25",
    title: "Konsekutivsatz (Sonuç)",
    conjunctions: ["so … dass", "sodass"],
    rule: "so [Adjektiv], dass → sonuç cümlesi",
    examples: [
      { de: "Er war so müde, dass er sofort einschlief.", tr: "O kadar yorgundu ki hemen uyudu." },
      { de: "Sie lachte so laut, dass alle sie hörten.", tr: "O kadar yüksek sesle güldü ki herkes duydu." },
    ],
  },
];

const indirektRedeSatz = [
  { direct: 'Er fragt: "Kommst du?"',        indirect: "Er fragt, ob sie kommt.",          note: "Ja/Nein-Frage → ob", color: "text-blue-400" },
  { direct: 'Sie fragt: "Wann kommst du?"',  indirect: "Sie fragt, wann er kommt.",        note: "W-Frage → W-Wort bleibt", color: "text-emerald-400" },
  { direct: 'Er sagt: "Ich bin müde."',      indirect: "Er sagt, dass er müde ist.",       note: "Aussage → dass", color: "text-purple-400" },
];

/* ── breakdown ─────────────────────────────────────────────── */
interface SentencePart { word: string; role: string; detail: string; color: string; }
interface BdSentence { full: string; translation: string; type: string; parts: SentencePart[]; }

const breakdownSentences: BdSentence[] = [
  {
    full: "Er bleibt zu Hause, weil er krank ist.",
    translation: "Hasta olduğu için evde kalıyor.",
    type: "kausal",
    parts: [
      { word: "Er",       role: "Özne (Hauptsatz)",   detail: "3. tekil erkek",                   color: "text-purple-400" },
      { word: "bleibt",   role: "Yüklem (Hauptsatz)",  detail: "bleiben → Präsens, 3. tekil",      color: "text-gold" },
      { word: "zu Hause", role: "Yer Zarfı",           detail: "deyimsel ifade: evde",             color: "text-text-secondary" },
      { word: "weil",     role: "Bağlaç (Kausal)",    detail: "Kausalbağlaç — nedeni açıklar",     color: "text-red-400" },
      { word: "er",       role: "Özne (Nebensatz)",    detail: "Nebensatz'ın öznesi",               color: "text-sky-400" },
      { word: "krank",    role: "Prädikativ",          detail: "yüklem sıfatı: hasta",             color: "text-text-secondary" },
      { word: "ist",      role: "Verb (Satzende!)",    detail: "Nebensatz'ta fiil sona gider",      color: "text-red-400" },
    ],
  },
  {
    full: "Obwohl er müde war, arbeitete er weiter.",
    translation: "Yorgun olmasına rağmen çalışmaya devam etti.",
    type: "konzessiv",
    parts: [
      { word: "Obwohl",    role: "Bağlaç (Konzessiv)", detail: "Konzessivbağlaç — 'rağmen'",       color: "text-purple-400" },
      { word: "er",        role: "Özne (Nebensatz)",   detail: "3. tekil erkek",                   color: "text-sky-400" },
      { word: "müde",      role: "Prädikativ",         detail: "yüklem sıfatı: yorgun",            color: "text-text-secondary" },
      { word: "war",       role: "Verb (Satzende)",    detail: "sein → war (Nebensatz sonu)",       color: "text-purple-400" },
      { word: "arbeitete", role: "Yüklem (Hauptsatz)", detail: "Hauptsatz'ın yüklemi, Präteritum", color: "text-gold" },
      { word: "er",        role: "Özne (Hauptsatz)",   detail: "3. tekil erkek",                   color: "text-sky-400" },
      { word: "weiter",    role: "Zarf (Ayrılık Ön.)", detail: "weiterarbeiten'in ön eki",         color: "text-text-secondary" },
    ],
  },
  {
    full: "Sie lernt Deutsch, damit sie in Wien arbeiten kann.",
    translation: "Viyana'da çalışabilmek için Almanca öğreniyor.",
    type: "final",
    parts: [
      { word: "Sie",      role: "Özne (Hauptsatz)",    detail: "3. tekil dişi",                     color: "text-purple-400" },
      { word: "lernt",    role: "Yüklem (Hauptsatz)",  detail: "lernen → 3. tekil",                 color: "text-gold" },
      { word: "Deutsch",  role: "Nesne",               detail: "Akkusativ (artikelsiz dil adı)",    color: "text-text-secondary" },
      { word: "damit",    role: "Bağlaç (Final)",      detail: "Finalbağlaç — amacı gösterir",      color: "text-emerald-400" },
      { word: "sie",      role: "Özne (Nebensatz)",    detail: "farklı özne → damit (um…zu değil)", color: "text-sky-400" },
      { word: "in Wien",  role: "Yer Zarfı",           detail: "Dativ ile yer bildirimi",           color: "text-text-secondary" },
      { word: "arbeiten", role: "Mastar (Infinitiv)",  detail: "Modal fiilden önce gelir",          color: "text-emerald-300" },
      { word: "kann",     role: "Modal Fiil (Satzende)", detail: "können → kann, Nebensatz sonu",  color: "text-emerald-400" },
    ],
  },
  {
    full: "Als ich jung war, spielte ich Fußball.",
    translation: "Genç olduğumda futbol oynardım.",
    type: "temporal",
    parts: [
      { word: "Als",      role: "Bağlaç (Temporal)",   detail: "als → tek seferlik geçmiş",         color: "text-blue-400" },
      { word: "ich",      role: "Özne (Nebensatz)",    detail: "1. tekil",                          color: "text-sky-400" },
      { word: "jung",     role: "Prädikativ",          detail: "yüklem sıfatı",                    color: "text-text-secondary" },
      { word: "war",      role: "Verb (Satzende, Prät.)", detail: "sein → war, Nebensatz sonu",    color: "text-blue-400" },
      { word: "spielte",  role: "Yüklem (Hauptsatz)",  detail: "spielen → Präteritum, 1. tekil",   color: "text-gold" },
      { word: "ich",      role: "Özne (Hauptsatz)",    detail: "Hauptsatz başta Nebensatz varsa özne sonra gelir", color: "text-sky-400" },
      { word: "Fußball",  role: "Nesne",               detail: "Akkusativ (artikelsiz)",            color: "text-text-secondary" },
    ],
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

function QuizCard() {
  const questions = [
    { q: "Er bleibt zu Hause, ___ er krank ist. (Neden?)", audio: "Er bleibt zu Hause, weil er krank ist.", answer: "weil", options: ["damit", "obwohl", "weil", "wenn"] },
    { q: "___ er müde war, arbeitete er weiter. (Rağmen)", audio: "Obwohl er müde war, arbeitete er weiter.", answer: "Obwohl", options: ["Weil", "Obwohl", "Wenn", "Damit"] },
    { q: "Sie lernt Deutsch, ___ sie in Wien arbeiten kann. (Amaç)", audio: "Sie lernt Deutsch, damit sie in Wien arbeiten kann.", answer: "damit", options: ["weil", "obwohl", "damit", "dass"] },
    { q: "___ ich jung war, spielte ich Fußball. (Geçmiş zaman — tek sefer)", audio: "Als ich jung war, spielte ich Fußball.", answer: "Als", options: ["Wenn", "Als", "Weil", "Damit"] },
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
      <SectionTitle icon={Zap} title="Hızlı Test" subtitle="Doğru bağlacı seç!" color="text-amber-400" />
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

/* ── main page ──────────────────────────────────────────────── */
export default function NebensaetzePage() {
  const [openType, setOpenType] = useState<string | null>("kausal");
  const [bdFilter, setBdFilter] = useState<"all" | "kausal" | "konzessiv" | "final" | "temporal">("all");
  const [expandedBd, setExpandedBd] = useState<number | null>(null);

  const filteredBd = bdFilter === "all" ? breakdownSentences : breakdownSentences.filter((s) => s.type === bdFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <motion.div {...fu(0)}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-bold tracking-wide uppercase">A2 – B2</span>
            <span className="px-3 py-1 bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30 rounded-full text-xs font-bold tracking-wide uppercase">Grammatik</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight mb-3">
            Nebensätze <span className="text-gold">(Yan Cümleler)</span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Almanca'nın en temel yapı taşlarından biri! Neden, ne zaman, rağmen, amaç —
            hepsini doğru bağlaçlarla ifade etmeyi öğren. 🔗
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "6 Nebensatz türü", icon: BookOpen },
              { label: "Bağlaç tablosu", icon: Star },
              { label: "50 pratik soru", icon: Zap },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 bg-navy/60 border border-navy-border rounded-lg text-sm text-text-secondary">
                <Icon className="w-3.5 h-3.5 text-gold" />{label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── TEMEL KURAL ──────────────────────────────────────── */}
      <motion.div {...fu(0.05)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-navy-card border border-gold/25 rounded-2xl p-5">
            <div className="w-10 h-10 bg-gold/15 rounded-xl flex items-center justify-center mb-3">
              <ArrowRight className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-gold font-bold text-base mb-2">Temel Kural #1</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Nebensatz'ta (yan cümlede) <strong className="text-text-primary">fiil her zaman sona</strong> gider.
            </p>
            <div className="mt-3 bg-navy rounded-xl p-3 border border-navy-border">
              <p className="text-xs text-text-muted mb-1">Yanlış ✗:</p>
              <p className="text-red-400 text-xs line-through">weil er ist krank</p>
              <p className="text-xs text-text-muted mt-1.5 mb-1">Doğru ✓:</p>
              <div className="flex items-center gap-1.5">
                <p className="text-green-400 text-xs">weil er krank <strong>ist</strong></p>
                <SpeakBtn text="weil er krank ist" />
              </div>
            </div>
          </div>
          <div className="bg-navy-card border border-amber-500/25 rounded-2xl p-5">
            <div className="w-10 h-10 bg-amber-500/15 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-amber-400 font-bold text-base mb-2">Temel Kural #2</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Nebensatz başta gelirse, <strong className="text-text-primary">ana cümlede özne ile fiil yer değiştirir</strong> (Inversion).
            </p>
            <div className="mt-3 bg-navy rounded-xl p-3 border border-navy-border">
              <div className="flex items-center gap-1.5">
                <p className="text-text-secondary text-xs"><span className="text-blue-400">Weil er krank ist,</span> <span className="text-gold">bleibt er</span> zu Hause.</p>
                <SpeakBtn text="Weil er krank ist, bleibt er zu Hause." />
              </div>
              <p className="text-text-muted text-[10px] mt-1">← "bleibt er" → fiil öne geliyor!</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── NEBENSATZ TÜRLERİ ────────────────────────────────── */}
      <motion.div {...fu(0.1)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={BookOpen} title="Nebensatz Türleri"
          subtitle="Her türün bağlacı ve kullanım amacı farklıdır" />
        <div className="space-y-3">
          {nebensatzTypes.map((ns) => {
            const isOpen = openType === ns.type;
            return (
              <div key={ns.type} className={`border rounded-xl overflow-hidden ${ns.bg}`}>
                <button onClick={() => setOpenType(isOpen ? null : ns.type)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:opacity-90 transition-opacity">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-sm ${ns.color}`}>{ns.title}</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {ns.conjunctions.slice(0, 3).map((c) => (
                        <span key={c} className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy/50 ${ns.color}`}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className={`w-4 h-4 ${ns.color}`} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-5 pb-5 bg-navy-card border-t border-navy-border">
                        <p className="text-xs text-text-muted font-medium mt-3 mb-2">
                          📌 {ns.rule}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {ns.conjunctions.map((c) => (
                            <div key={c} className="flex items-center gap-1.5 bg-navy border border-navy-border rounded-lg px-3 py-1.5">
                              <span className={`font-bold text-sm ${ns.color}`}>{c}</span>
                              <SpeakBtn text={c} />
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          {ns.examples.map((e, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="flex items-start gap-3 p-3 bg-navy rounded-xl border border-navy-border">
                              <div className="flex-1">
                                <div className="flex items-center gap-1.5">
                                  <p className="text-text-primary text-sm font-medium">{e.de}</p>
                                  <SpeakBtn text={e.de} />
                                </div>
                                <p className="text-text-muted text-xs mt-0.5">{e.tr}</p>
                              </div>
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

      {/* ── İNDİREKTE REDE ───────────────────────────────────── */}
      <motion.div {...fu(0.15)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={MessageSquare} title="İndirekte Rede ile Nebensatz"
          subtitle="Soru ve açıklamaları aktarırken kullanılan yapılar" />
        <div className="space-y-3">
          {indirektRedeSatz.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="border border-navy-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-navy/30 flex items-center gap-2">
                <span className="text-xs text-text-muted font-semibold uppercase tracking-wide">Direkt:</span>
                <p className="text-text-secondary text-sm flex-1">{s.direct}</p>
                <SpeakBtn text={s.direct.replace(/"/g, "")} />
              </div>
              <div className="px-4 py-3 flex items-center gap-2">
                <span className="text-xs text-gold font-semibold uppercase tracking-wide">İndirekt:</span>
                <p className={`text-sm font-semibold flex-1 ${s.color}`}>{s.indirect}</p>
                <SpeakBtn text={s.indirect} />
              </div>
              <div className="px-4 pb-3">
                <span className={`text-xs font-medium ${s.color}`}>{s.note}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── CÜMLEYİ PARÇALARA AYIR ───────────────────────────── */}
      <motion.div {...fu(0.2)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Layers} title="Cümleyi Parçalara Ayır"
          subtitle="Nebensatz cümlelerini kelime kelime analiz et!" />
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "kausal", "konzessiv", "final", "temporal"] as const).map((f) => (
            <button key={f} onClick={() => { setBdFilter(f); setExpandedBd(null); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                bdFilter === f ? "bg-gold/20 text-gold border-gold/40" : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {f === "all" ? "Tümü" : f === "kausal" ? "Kausal" : f === "konzessiv" ? "Konzessiv" : f === "final" ? "Final" : "Temporal"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filteredBd.map((s, idx) => {
            const isOpen = expandedBd === idx;
            const typeColorMap: Record<string, string> = {
              kausal: "border-red-500/25 bg-red-500/5", konzessiv: "border-purple-500/25 bg-purple-500/5",
              final: "border-emerald-500/25 bg-emerald-500/5", temporal: "border-blue-500/25 bg-blue-500/5",
            };
            const tagColorMap: Record<string, string> = {
              kausal: "bg-red-500/20 text-red-400", konzessiv: "bg-purple-500/20 text-purple-400",
              final: "bg-emerald-500/20 text-emerald-400", temporal: "bg-blue-500/20 text-blue-400",
            };
            const tagLabels: Record<string, string> = { kausal: "KAUS", konzessiv: "KONZ", final: "FIN", temporal: "TEMP" };
            return (
              <div key={s.full} className={`border rounded-xl overflow-hidden ${typeColorMap[s.type] ?? "border-navy-border"}`}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedBd(isOpen ? null : idx)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandedBd(isOpen ? null : idx); }}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:opacity-90 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${tagColorMap[s.type] ?? "bg-navy text-text-muted"}`}>
                      {tagLabels[s.type] ?? "NS"}
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
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-3 bg-navy-card">
                        <p className="text-xs text-text-muted mb-3 font-medium uppercase tracking-wider">Kelime Analizi</p>
                        <div className="flex flex-wrap gap-3">
                          {s.parts.map((p, pi) => (
                            <motion.div key={pi} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
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

      {/* ── TRICK KARTI ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
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
              {[
                { n: "1", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",    text: "weil vs da: her ikisi de 'çünkü' — da daha resmi, cümle başına gelebilir." },
                { n: "2", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",  text: "als vs wenn: 'als' tek seferlik geçmiş; 'wenn' tekrar eden veya koşul." },
                { n: "3", color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20", text: "damit vs um…zu: aynı özne → um…zu; farklı özne → damit." },
                { n: "4", color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20", text: "Nebensatz önce gelirse, Hauptsatz'ta fiil öne geçer (Inversion)." },
              ].map((r) => (
                <div key={r.n} className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${r.bg}`}>
                  <span className={`font-bold text-xl leading-none ${r.color}`}>{r.n}</span>
                  <p className="text-text-secondary text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── HIZLI TEST ───────────────────────────────────────── */}
      <motion.div {...fu(0.35)}>
        <QuizCard />
      </motion.div>

      {/* ── PRATİK BÖLÜMÜ ────────────────────────────────────── */}
      <motion.div {...fu(0.4)}>
        <GrammarTracker topicId="relativsaetze" level="B1" />
        <PracticeSection />
      </motion.div>

    </div>
  );
}
