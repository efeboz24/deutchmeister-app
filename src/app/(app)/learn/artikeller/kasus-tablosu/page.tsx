"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle, RotateCcw, Lightbulb, GraduationCap, Volume2, Layers } from "lucide-react";

function speakDE(text: string, e?: React.MouseEvent) {
  e?.stopPropagation();
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function Speak({ text }: { text: string }) {
  const [a, setA] = useState(false);
  return (
    <button onClick={e => { setA(true); speakDE(text, e); setTimeout(() => setA(false), 1200); }}
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full transition-all ${a ? "bg-gold/30 text-gold" : "bg-navy-border/50 text-text-muted hover:bg-gold/20 hover:text-gold"}`}>
      <Volume2 className="w-3 h-3" />
    </button>
  );
}

type Gender = "mask" | "fem" | "neu" | "pl";

const gColors: Record<Gender, { text: string; bg: string; border: string; label: string; header: string }> = {
  mask: { text: "text-blue-400",   bg: "bg-blue-500/15",   border: "border-blue-500/40",   label: "DER",  header: "Maskulin" },
  fem:  { text: "text-pink-400",   bg: "bg-pink-500/15",   border: "border-pink-500/40",   label: "DIE",  header: "Feminin"  },
  neu:  { text: "text-violet-400", bg: "bg-violet-500/15", border: "border-violet-500/40", label: "DAS",  header: "Neutrum"  },
  pl:   { text: "text-green-400",  bg: "bg-green-500/15",  border: "border-green-500/40",  label: "DIE",  header: "Plural"   },
};

const kasusColors = ["text-teal-400", "text-amber-400", "text-purple-400", "text-gold"];
const kasusNames = ["Nominativ", "Akkusativ", "Dativ", "Genitiv"];
const kasusTips  = ["Kim/Ne?", "Kimi/Neyi?", "Kime?", "Kimin?"];

const bestimmt: Record<string, Record<Gender, string>> = {
  Nominativ: { mask: "der",  fem: "die", neu: "das", pl: "die" },
  Akkusativ: { mask: "den",  fem: "die", neu: "das", pl: "die" },
  Dativ:     { mask: "dem",  fem: "der", neu: "dem", pl: "den" },
  Genitiv:   { mask: "des",  fem: "der", neu: "des", pl: "der" },
};

const unbestimmt: Record<string, Record<Gender, string>> = {
  Nominativ: { mask: "ein",   fem: "eine",  neu: "ein",   pl: "—" },
  Akkusativ: { mask: "einen", fem: "eine",  neu: "ein",   pl: "—" },
  Dativ:     { mask: "einem", fem: "einer", neu: "einem", pl: "—" },
  Genitiv:   { mask: "eines", fem: "einer", neu: "eines", pl: "—" },
};

const changedCells: Record<string, Gender[]> = {
  Nominativ: [],
  Akkusativ: ["mask"],
  Dativ:     ["mask", "fem", "neu", "pl"],
  Genitiv:   ["mask", "fem", "neu", "pl"],
};

const kasusExamples = [
  {
    kasus: "Nominativ", color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/30",
    examples: [
      { de: "Der Mann ist groß.", tr: "Adam uzun boylu.", audio: "Der Mann ist groß." },
      { de: "Die Frau arbeitet.", tr: "Kadın çalışıyor.", audio: "Die Frau arbeitet." },
      { de: "Das Kind schläft.", tr: "Çocuk uyuyor.", audio: "Das Kind schläft." },
    ],
  },
  {
    kasus: "Akkusativ", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30",
    examples: [
      { de: "Ich sehe den Mann.", tr: "Adamı görüyorum.", audio: "Ich sehe den Mann." },
      { de: "Er kauft die Uhr.", tr: "Saati satın alıyor.", audio: "Er kauft die Uhr." },
      { de: "Sie liest das Buch.", tr: "Kitabı okuyor.", audio: "Sie liest das Buch." },
    ],
  },
  {
    kasus: "Dativ", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30",
    examples: [
      { de: "Er hilft dem Mann.", tr: "Adama yardım ediyor.", audio: "Er hilft dem Mann." },
      { de: "Ich danke der Frau.", tr: "Kadına teşekkür ediyorum.", audio: "Ich danke der Frau." },
      { de: "mit dem Kind", tr: "çocukla", audio: "mit dem Kind" },
    ],
  },
  {
    kasus: "Genitiv", color: "text-gold", bg: "bg-gold/10", border: "border-gold/30",
    examples: [
      { de: "das Buch des Mannes", tr: "adamın kitabı", audio: "das Buch des Mannes" },
      { de: "wegen der Frau", tr: "kadın yüzünden", audio: "wegen der Frau" },
      { de: "das Spielzeug des Kindes", tr: "çocuğun oyuncağı", audio: "das Spielzeug des Kindes" },
    ],
  },
];

const questions = [
  { q: "Ich sehe ___ Mann.", answer: "den", options: ["der", "den", "dem", "des"], tip: "Akkusativ + maskulin → den" },
  { q: "Er hilft ___ Frau.", answer: "der", options: ["die", "der", "dem", "den"], tip: "helfen + Dativ + feminin → der" },
  { q: "___ Kind schläft.", answer: "Das", options: ["Der", "Die", "Das", "Den"], tip: "Nominativ + neutrum → das" },
  { q: "mit ___ Bus.", answer: "dem", options: ["der", "den", "dem", "des"], tip: "mit + Dativ + maskulin → dem" },
  { q: "wegen ___ Regens.", answer: "des", options: ["der", "die", "dem", "des"], tip: "wegen + Genitiv + maskulin → des" },
  { q: "Ich kaufe ___ Buch.", answer: "das", options: ["der", "die", "das", "dem"], tip: "Akkusativ + neutrum → das (değişmez!)" },
  { q: "___ Lehrerin erklärt.", answer: "Die", options: ["Der", "Die", "Das", "Den"], tip: "Nominativ + feminin → die" },
  { q: "Er dankt ___ Arzt.", answer: "dem", options: ["den", "der", "dem", "des"], tip: "danken + Dativ + maskulin → dem" },
  { q: "das Haus ___ Mannes.", answer: "des", options: ["der", "die", "dem", "des"], tip: "Genitiv + maskulin → des" },
  { q: "Ich sehe ___ Frau.", answer: "die", options: ["der", "die", "dem", "den"], tip: "Akkusativ + feminin → die (değişmez!)" },
];

function MiniPractice() {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];

  function pick(opt: string) {
    if (sel) return;
    setSel(opt);
    if (opt === q.answer) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx(i => i + 1); setSel(null); }
    }, 1100);
  }

  function restart() { setIdx(0); setSel(null); setScore(0); setDone(false); }

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-4">
      <div className="text-4xl">{score >= 8 ? "🏆" : score >= 6 ? "👍" : "💪"}</div>
      <div className="text-2xl font-black text-text-primary">{score} / {questions.length}</div>
      <div className="w-full bg-navy rounded-full h-2 max-w-xs mx-auto">
        <motion.div className="bg-gold h-2 rounded-full" initial={{ width: 0 }} animate={{ width: `${(score / questions.length) * 100}%` }} transition={{ duration: 0.8 }} />
      </div>
      <button onClick={restart} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/15 text-gold font-bold text-sm border border-gold/30 hover:bg-gold/25 transition-colors">
        <RotateCcw className="w-4 h-4" /> Tekrar Dene
      </button>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-text-muted">
        <span>{idx + 1} / {questions.length}</span>
        <span className="text-gold font-bold">{score} puan</span>
      </div>
      <div className="w-full bg-navy rounded-full h-1.5">
        <motion.div className="bg-gold h-1.5 rounded-full" animate={{ width: `${(idx / questions.length) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>
      <div className="bg-navy/60 rounded-xl p-4">
        <p className="text-text-primary font-semibold text-sm">{q.q}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {q.options.map(opt => {
          const picked = sel === opt, correct = opt === q.answer;
          return (
            <motion.button key={opt} whileTap={{ scale: 0.97 }} onClick={() => pick(opt)}
              className={`py-3 rounded-xl text-sm font-bold border transition-all ${sel
                ? correct ? "bg-green-500/20 border-green-500/50 text-green-400" : picked ? "bg-red-500/20 border-red-500/50 text-red-400" : "opacity-40 bg-navy border-navy-border text-text-muted"
                : "bg-navy border-navy-border text-text-primary hover:border-gold/50"}`}>
              {sel && correct && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1" />}
              {sel && picked && !correct && <XCircle className="inline w-3.5 h-3.5 mr-1" />}
              {opt}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {sel && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`p-3 rounded-xl text-xs border ${sel === q.answer ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-amber-500/10 border-amber-500/30 text-amber-400"}`}>
          💡 {q.tip}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default function KasusTablosuPage() {
  const [tableMode, setTableMode] = useState<"bestimmt" | "unbestimmt">("bestimmt");
  const [activeGender, setActiveGender] = useState<Gender | null>(null);
  const [openKasus, setOpenKasus] = useState<string | null>(null);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const tableData = tableMode === "bestimmt" ? bestimmt : unbestimmt;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 30% 50%, #14b8a620 0%, transparent 60%)" }} />
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A1 – B1
            </span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2 flex items-center gap-3">
            <Layers className="w-6 h-6 text-skill-grammatik" />
            Kasus-Tablosu
          </h1>
          <p className="text-text-secondary text-sm max-w-xl">
            Dört Almanca halde (Nominativ, Akkusativ, Dativ, Genitiv) bestimmte ve unbestimmte artikellerin tam formu.
            Bir cinsiyete tıkla → o sütun vurgulanır.
          </p>
        </div>
      </motion.div>

      {/* Gender selector */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
        className="flex gap-2 flex-wrap">
        {(["mask", "fem", "neu", "pl"] as Gender[]).map(g => {
          const c = gColors[g];
          const isActive = activeGender === g;
          return (
            <motion.button key={g} whileTap={{ scale: 0.95 }} onClick={() => setActiveGender(isActive ? null : g)}
              className={`px-4 py-2 rounded-xl text-sm font-black border transition-all ${isActive ? `${c.bg} ${c.border} ${c.text}` : "bg-navy-card border-navy-border text-text-muted hover:border-navy-border/80"}`}>
              {c.label}
              <span className="text-[10px] font-normal ml-1.5 opacity-70">{c.header}</span>
            </motion.button>
          );
        })}
        {activeGender && (
          <button onClick={() => setActiveGender(null)} className="px-3 py-2 rounded-xl text-xs text-text-muted border border-navy-border hover:text-text-secondary transition-colors">
            Temizle ✕
          </button>
        )}
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="flex border-b border-navy-border">
          {(["bestimmt", "unbestimmt"] as const).map(t => (
            <button key={t} onClick={() => setTableMode(t)}
              className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${tableMode === t ? "text-gold border-gold bg-gold/5" : "text-text-muted border-transparent hover:text-text-secondary"}`}>
              {t === "bestimmt" ? "Bestimmte (der/die/das)" : "Unbestimmte (ein/eine)"}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left p-4 text-text-muted font-semibold text-xs w-28">Kasus</th>
                {(["mask", "fem", "neu", "pl"] as Gender[]).map(g => (
                  <th key={g} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className={`text-lg font-black ${gColors[g].text}`}>{gColors[g].label}</span>
                      <span className="text-text-muted text-[10px] font-normal">{gColors[g].header}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {kasusNames.map((kasus, ki) => (
                  <motion.tr key={`${tableMode}-${kasus}`}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ki * 0.06, duration: 0.3 }}
                    className="border-b border-navy-border/40 last:border-0 hover:bg-navy/20 transition-colors">
                    <td className="p-4">
                      <div className={`font-bold text-xs ${kasusColors[ki]}`}>{kasus}</div>
                      <div className="text-text-muted text-[10px] mt-0.5">{kasusTips[ki]}</div>
                    </td>
                    {(["mask", "fem", "neu", "pl"] as Gender[]).map(g => {
                      const val = tableData[kasus][g];
                      const isChanged = changedCells[kasus]?.includes(g);
                      const isHighlighted = activeGender === g;
                      return (
                        <td key={g} className="p-4 text-center">
                          <motion.span animate={{ scale: isHighlighted ? 1.15 : 1 }} transition={{ duration: 0.2 }}
                            className={`inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-lg font-black text-base transition-all ${
                              val === "—" ? "text-text-muted text-sm font-normal"
                              : isChanged && isHighlighted ? `${gColors[g].bg} ${gColors[g].text} border ${gColors[g].border} ring-2 ring-offset-1 ring-offset-navy-card ${gColors[g].border}`
                              : isChanged ? `${gColors[g].bg} ${gColors[g].text} border ${gColors[g].border}`
                              : isHighlighted ? `${gColors[g].bg} ${gColors[g].text}`
                              : "text-text-primary"
                            }`}>
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

        <div className="p-3 bg-amber-500/8 border-t border-amber-500/20">
          <div className="flex gap-2 text-amber-400 text-xs">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Renkli hücreler = değişen formlar. <strong>Akkusativ'de sadece maskulin değişir!</strong> Feminin ve neutrum sabit kalır.</span>
          </div>
        </div>
      </motion.div>

      {/* Kasus examples (collapsible each) */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }} className="space-y-2">
        <h2 className="text-sm font-bold text-text-primary px-1">Her Hal için Örnek Cümleler</h2>
        {kasusExamples.map(k => (
          <div key={k.kasus} className={`rounded-xl border ${k.border} overflow-hidden`}>
            <div role="button" tabIndex={0}
              onClick={() => setOpenKasus(openKasus === k.kasus ? null : k.kasus)}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setOpenKasus(openKasus === k.kasus ? null : k.kasus); }}
              className="w-full flex items-center justify-between p-3.5 cursor-pointer hover:bg-navy/20 transition-colors">
              <span className={`font-bold text-sm ${k.color}`}>{k.kasus}</span>
              <motion.div animate={{ rotate: openKasus === k.kasus ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </motion.div>
            </div>
            <AnimatePresence initial={false}>
              {openKasus === k.kasus && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <div className={`px-4 pb-4 pt-1 space-y-2 border-t ${k.border} ${k.bg}`}>
                    {k.examples.map(ex => (
                      <div key={ex.de} className="flex items-center gap-2 p-2.5 rounded-lg bg-navy/50">
                        <Speak text={ex.audio} />
                        <div>
                          <div className="text-text-primary text-xs font-semibold">{ex.de}</div>
                          <div className="text-text-muted text-[10px] mt-0.5">{ex.tr}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* Practice */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <button onClick={() => setPracticeOpen(!practiceOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-navy/20 transition-colors">
          <div className="font-bold text-text-primary text-sm">10 Pratik Soru</div>
          <motion.div animate={{ rotate: practiceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {practiceOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="p-4 border-t border-navy-border"><MiniPractice /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
