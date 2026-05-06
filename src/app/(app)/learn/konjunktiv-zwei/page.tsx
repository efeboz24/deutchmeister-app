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
const konjIIForms = [
  { verb: "sein",   sg1: "wäre",   sg2: "wärst",   sg3: "wäre",   pl1: "wären",   pl2: "wärt",    pl3: "wären",   color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/25" },
  { verb: "haben",  sg1: "hätte",  sg2: "hättest", sg3: "hätte",  pl1: "hätten",  pl2: "hättet",  pl3: "hätten",  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
  { verb: "werden", sg1: "würde",  sg2: "würdest", sg3: "würde",  pl1: "würden",  pl2: "würdet",  pl3: "würden",  color: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/25" },
];

const modalForms = [
  { verb: "können",  konjII: "könnte",  meaning: "yapabilmek" },
  { verb: "müssen",  konjII: "müsste",  meaning: "zorunda olmak" },
  { verb: "dürfen",  konjII: "dürfte",  meaning: "izni olmak" },
  { verb: "sollen",  konjII: "sollte",  meaning: "gerekli olmak" },
  { verb: "wollen",  konjII: "wollte",  meaning: "istemek" },
  { verb: "mögen",   konjII: "möchte",  meaning: "arzu etmek" },
];

const usageCases = [
  { type: "irreal", color: "text-red-400",  bg: "bg-red-500/5  border-red-500/20",   title: "İrreal Koşul (Gegenwart/Zukunft)",
    ex1: "Wenn ich Zeit hätte, würde ich mehr lesen.",     tr1: "Vaktim olsaydı, daha çok okurdum.",
    ex2: "Wenn ich reich wäre, würde ich ein Haus kaufen.", tr2: "Zengin olsaydım, ev satın alırdım." },
  { type: "past",   color: "text-amber-400",bg: "bg-amber-500/5 border-amber-500/20",title: "İrreal Koşul (Vergangenheit)",
    ex1: "Wenn ich das gewusst hätte, hätte ich anders gehandelt.", tr1: "Bunu bilseydim, farklı davranırdım.",
    ex2: "Wenn er früher gegangen wäre, hätte er den Zug erwischt.", tr2: "Daha erken gitmiş olsaydı, treni yakalardı." },
  { type: "polite", color: "text-sky-400",  bg: "bg-sky-500/5  border-sky-500/20",   title: "Kibarlık (Höflichkeit)",
    ex1: "Könnten Sie mir bitte helfen?",       tr1: "Bana yardım edebilir misiniz? (nazik)",
    ex2: "Ich hätte gerne einen Kaffee, bitte.", tr2: "Bir kahve alabilir miyim, lütfen." },
  { type: "wish",   color: "text-purple-400",bg: "bg-purple-500/5 border-purple-500/20", title: "Dilek/Temenni (Wunsch)",
    ex1: "Ich wäre so gerne Pilot geworden.",   tr1: "Pilot olmayı çok isterdim.",
    ex2: "Wenn er doch käme!",                   tr2: "Keşke gelse!" },
];

/* ── breakdown ─────────────────────────────────────────────── */
interface SentencePart { word: string; role: string; detail: string; color: string; }
interface BdSentence { full: string; translation: string; type: string; parts: SentencePart[]; }

const breakdownSentences: BdSentence[] = [
  {
    full: "Wenn ich Zeit hätte, würde ich mehr lesen.",
    translation: "Vaktim olsaydı, daha çok okurdum.",
    type: "irreal",
    parts: [
      { word: "Wenn",    role: "Bağlaç (Konjunktion)",   detail: "koşul cümlesi başlatır (wenn-Satz)",   color: "text-amber-400" },
      { word: "ich",     role: "Özne",                   detail: "1. tekil",                             color: "text-purple-400" },
      { word: "Zeit",    role: "Nesne",                   detail: "dişi isim, Akkusativ (artikelsiz)",   color: "text-text-secondary" },
      { word: "hätte",   role: "Konjunktiv II (haben)",   detail: "haben → hätte — irreal koşul",        color: "text-emerald-400" },
      { word: "würde",   role: "Konjunktiv II (werden)",  detail: "Konditionalis — ana cümle",           color: "text-purple-400" },
      { word: "ich",     role: "Özne (Nachfeld)",         detail: "ana cümlenin öznesi",                 color: "text-purple-400" },
      { word: "mehr lesen", role: "Fiil / Nesne",         detail: "lesen = mastar, mehr = zarf",         color: "text-gold" },
    ],
  },
  {
    full: "Könnten Sie mir bitte helfen?",
    translation: "Bana yardım edebilir misiniz?",
    type: "polite",
    parts: [
      { word: "Könnten",  role: "Konjunktiv II (können)",  detail: "können → könnten — nazik soru",      color: "text-sky-400" },
      { word: "Sie",      role: "Özne (resmi siz)",        detail: "resmi hitap şekli, büyük S",         color: "text-purple-400" },
      { word: "mir",      role: "Dativ Nesne",             detail: "ich → mir (Dativ)",                  color: "text-text-secondary" },
      { word: "bitte",    role: "Rica ifadesi",            detail: "naziklik partikülü",                  color: "text-amber-400" },
      { word: "helfen",   role: "Fiil (Infinitiv)",        detail: "helfen → Dativ ister: mir",          color: "text-gold" },
    ],
  },
  {
    full: "Wenn ich das gewusst hätte, hätte ich anders gehandelt.",
    translation: "Bunu bilseydim, farklı davranırdım.",
    type: "past",
    parts: [
      { word: "Wenn",       role: "Bağlaç",              detail: "koşul cümlesi",                          color: "text-amber-400" },
      { word: "ich",        role: "Özne",                detail: "1. tekil",                               color: "text-purple-400" },
      { word: "das",        role: "Nesne",               detail: "Demonstrativpronomen, Akkusativ",        color: "text-text-secondary" },
      { word: "gewusst",    role: "Partizip II",         detail: "wissen → gewusst",                       color: "text-text-muted" },
      { word: "hätte",      role: "Konj. II Plusquamperfekt", detail: "haben → hätte + Partizip II = Vergangenheit", color: "text-red-400" },
      { word: "hätte … gehandelt", role: "Ana cümle Konj. II Plupfkt.", detail: "handeln → gehandelt",   color: "text-red-400" },
    ],
  },
  {
    full: "Er tat so, als ob er alles wüsste.",
    translation: "Her şeyi biliyormuş gibi davrandı.",
    type: "alsobob",
    parts: [
      { word: "Er",       role: "Özne",                  detail: "3. tekil erkek",                         color: "text-purple-400" },
      { word: "tat",      role: "Ana Fiil (Prät.)",      detail: "tun → tat (Präteritum)",                 color: "text-gold" },
      { word: "so",       role: "Zarf",                   detail: "so … als ob yapısını kurar",            color: "text-text-muted" },
      { word: "als ob",   role: "Bağlaç",                detail: "als ob/als wenn + Konjunktiv II",        color: "text-amber-400" },
      { word: "er",       role: "Yan Cümle Öznesi",      detail: "aktarılan kişi",                         color: "text-purple-400" },
      { word: "alles",    role: "Nesne",                  detail: "Indefinitpronomen, Akkusativ",           color: "text-text-secondary" },
      { word: "wüsste",   role: "Konjunktiv II (wissen)", detail: "wissen → wüsste — irreal karşılaştırma", color: "text-emerald-400" },
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
    { q: "Wenn ich Zeit hätte, ___ ich mehr Sport machen. (würde-Form)", audio: "Wenn ich Zeit hätte, würde ich mehr Sport machen.", answer: "würde", options: ["werde", "würde", "wird", "wurde"] },
    { q: "Es ___ schön, wenn du kommen könntest. (sein → Konj. II)", audio: "Es wäre schön, wenn du kommen könntest.", answer: "wäre", options: ["ist", "sei", "wäre", "war"] },
    { q: "___ du mir bitte helfen? (können → Konj. II, du)", audio: "Könntest du mir bitte helfen?", answer: "Könntest", options: ["Kannst", "Könntest", "Konntest", "Könnte"] },
    { q: "Wenn wir mehr Geld ___, könnten wir reisen. (haben → Konj. II)", audio: "Wenn wir mehr Geld hätten, könnten wir reisen.", answer: "hätten", options: ["haben", "hätten", "habe", "hatten"] },
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
      <SectionTitle icon={Zap} title="Hızlı Test" subtitle="Konjunktiv II formunu seç!" color="text-amber-400" />
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
export default function KonjunktivZweiPage() {
  const [openTable, setOpenTable] = useState<string | null>("sein");
  const [bdFilter, setBdFilter] = useState<"all" | "irreal" | "polite" | "past" | "alsobob">("all");
  const [expandedBd, setExpandedBd] = useState<number | null>(null);

  const filteredBd = bdFilter === "all" ? breakdownSentences : breakdownSentences.filter((s) => s.type === bdFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <motion.div {...fu(0)}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-bold tracking-wide uppercase">B1 – B2</span>
            <span className="px-3 py-1 bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30 rounded-full text-xs font-bold tracking-wide uppercase">Grammatik</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight mb-3">
            Konjunktiv <span className="text-gold">II</span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Gerçek olmayan durumları, dileği, kibarlığı ifade etmenin Almanca yolu —
            "Keşke…", "Olsa…", "Acaba…" diyebilmek için şart! 💭
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "İrreal Koşul", icon: ArrowRight },
              { label: "Kibarlık Formları", icon: MessageSquare },
              { label: "50 pratik soru", icon: Zap },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 bg-navy/60 border border-navy-border rounded-lg text-sm text-text-secondary">
                <Icon className="w-3.5 h-3.5 text-gold" />{label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── KULLANIM ALANLARI ─────────────────────────────────── */}
      <motion.div {...fu(0.05)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={BookOpen} title="Nerede Kullanılır?" subtitle="4 ana kullanım alanı" />
        <div className="space-y-4">
          {usageCases.map((c, i) => (
            <motion.div key={c.type} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`border rounded-xl p-5 ${c.bg}`}>
              <p className={`font-bold text-sm mb-3 ${c.color}`}>{c.title}</p>
              <div className="space-y-3">
                {[{ ex: c.ex1, tr: c.tr1 }, { ex: c.ex2, tr: c.tr2 }].map((e, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex items-center gap-1.5 flex-1">
                      <p className="text-text-primary text-sm font-medium">{e.ex}</p>
                      <SpeakBtn text={e.ex} />
                    </div>
                    <p className="text-text-muted text-xs shrink-0 max-w-[180px]">{e.tr}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── TABLOLAR ─────────────────────────────────────────── */}
      <motion.div {...fu(0.1)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Star} title="Konjunktiv II Tabloları"
          subtitle="sein, haben, werden — en önemli üç fiil" />
        <div className="space-y-3 mb-6">
          {konjIIForms.map((v) => {
            const isOpen = openTable === v.verb;
            return (
              <div key={v.verb} className={`border ${v.border} rounded-xl overflow-hidden`}>
                <button onClick={() => setOpenTable(isOpen ? null : v.verb)}
                  className={`w-full flex items-center justify-between px-5 py-3 ${v.bg} hover:opacity-90 transition-opacity`}>
                  <span className={`font-bold text-sm ${v.color}`}>{v.verb} → Konjunktiv II</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className={`w-4 h-4 ${v.color}`} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="overflow-x-auto bg-navy-card">
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="border border-navy-border rounded-xl overflow-hidden">
          <div className="bg-navy/50 px-4 py-2.5">
            <span className="font-bold text-sm text-gold">Modal Fiiller → Konjunktiv II</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
            {modalForms.map((m, i) => (
              <motion.div key={m.verb} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 bg-navy border border-navy-border rounded-xl px-3 py-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-muted text-xs">{m.verb}</span>
                    <ArrowRight className="w-3 h-3 text-text-muted" />
                    <span className="text-gold font-bold text-sm">{m.konjII}</span>
                    <SpeakBtn text={m.konjII} />
                  </div>
                  <span className="text-text-muted text-[10px]">{m.meaning}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── CÜMLEYİ PARÇALARA AYIR ───────────────────────────── */}
      <motion.div {...fu(0.15)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Layers} title="Cümleyi Parçalara Ayır"
          subtitle="Konjunktiv II cümlelerini kelime kelime analiz et!" />
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "irreal", "polite", "past", "alsobob"] as const).map((f) => (
            <button key={f} onClick={() => { setBdFilter(f); setExpandedBd(null); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                bdFilter === f ? "bg-gold/20 text-gold border-gold/40" : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {f === "all" ? "Tümü" : f === "irreal" ? "İrreal Koşul" : f === "polite" ? "Kibarlık" : f === "past" ? "Geçmiş İrreal" : "als ob"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filteredBd.map((s, idx) => {
            const isOpen = expandedBd === idx;
            return (
              <div key={s.full} className="border border-purple-500/25 rounded-xl overflow-hidden">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedBd(isOpen ? null : idx)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandedBd(isOpen ? null : idx); }}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-purple-500/5 hover:opacity-90 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 shrink-0">KONJ II</span>
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
              <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
                <span className="text-purple-400 font-bold text-xl leading-none">1</span>
                <p className="text-text-secondary text-sm">
                  Çoğu fiil için <strong className="text-purple-400">würde + Infinitiv</strong> (Konditionalis I) kullan.
                  <span className="text-text-muted text-xs block mt-0.5">Ich würde gehen. / Er würde kommen.</span>
                </p>
              </div>
              <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
                <span className="text-blue-400 font-bold text-xl leading-none">2</span>
                <p className="text-text-secondary text-sm">
                  <strong className="text-blue-400">sein → wäre</strong>, <strong className="text-blue-400">haben → hätte</strong>,
                  modal fiiller → kendi Konjunktiv II'si.
                  <span className="text-text-muted text-xs block mt-0.5">wäre, hätte, könnte, müsste, dürfte, sollte, wollte</span>
                </p>
              </div>
              <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <span className="text-emerald-400 font-bold text-xl leading-none">3</span>
                <p className="text-text-secondary text-sm">
                  Geçmiş irreal: <strong className="text-emerald-400">hätte/wäre + Partizip II</strong>.
                  <span className="text-text-muted text-xs block mt-0.5">Wenn ich das gewusst hätte, hätte ich anders gehandelt.</span>
                </p>
              </div>
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
        <GrammarTracker topicId="konjunktiv-ii" level="B1" />
        <PracticeSection />
      </motion.div>

    </div>
  );
}
