"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, RotateCcw, Trophy, CheckCircle2, XCircle } from "lucide-react";
import { SpeakBtn } from "./PracticeSection";

type PQ = { q: string; audio: string; answer: "Akkusativ" | "Dativ"; options: string[]; tip: string };

const prepQuestions: PQ[] = [
  { q: "durch ___ Park (der)", audio: "durch den Park", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'durch' her zaman Akkusativ ister." },
  { q: "aus ___ Haus (das)", audio: "aus dem Haus", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'aus' her zaman Dativ ister." },
  { q: "für ___ Kind (das)", audio: "für das Kind", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'für' her zaman Akkusativ ister." },
  { q: "mit ___ Bus (der)", audio: "mit dem Bus", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'mit' her zaman Dativ ister." },
  { q: "gegen ___ Wind (der)", audio: "gegen den Wind", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'gegen' her zaman Akkusativ ister." },
  { q: "bei ___ Freund (der)", audio: "bei dem Freund", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'bei' her zaman Dativ ister." },
  { q: "ohne ___ Schlüssel (der)", audio: "ohne den Schlüssel", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'ohne' her zaman Akkusativ ister." },
  { q: "nach ___ Schule (die)", audio: "nach der Schule", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'nach' her zaman Dativ ister." },
  { q: "um ___ Haus (das)", audio: "um das Haus", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'um' her zaman Akkusativ ister." },
  { q: "seit ___ Jahr (das)", audio: "seit einem Jahr", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'seit' her zaman Dativ ister." },
  { q: "für ___ Mutter (die)", audio: "für die Mutter", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'für' her zaman Akkusativ ister." },
  { q: "von ___ Lehrer (der)", audio: "von dem Lehrer", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'von' her zaman Dativ ister." },
  { q: "durch ___ Wald (der)", audio: "durch den Wald", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'durch' her zaman Akkusativ ister." },
  { q: "zu ___ Arzt (der)", audio: "zu dem Arzt", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'zu' her zaman Dativ ister." },
  { q: "gegen ___ Mauer (die)", audio: "gegen die Mauer", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'gegen' her zaman Akkusativ ister." },
  { q: "gegenüber ___ Park (der)", audio: "dem Park gegenüber", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'gegenüber' her zaman Dativ ister." },
  { q: "um ___ Ecke (die)", audio: "um die Ecke", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'um' her zaman Akkusativ ister." },
  { q: "aus ___ Stadt (die)", audio: "aus der Stadt", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'aus' her zaman Dativ ister." },
  { q: "für ___ Bruder (der)", audio: "für den Bruder", answer: "Akkusativ", options: ["Akkusativ", "Dativ"], tip: "'für' her zaman Akkusativ ister." },
  { q: "mit ___ Zug (der)", audio: "mit dem Zug", answer: "Dativ", options: ["Akkusativ", "Dativ"], tip: "'mit' her zaman Dativ ister." },
];

function ResultScreen({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 px-4">
      <div className="text-5xl mb-4">{emoji}</div>
      <div className="text-2xl font-extrabold text-text-primary mb-1">{score}/{total}</div>
      <div className={`text-base font-bold mb-6 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</div>
      <button onClick={onRestart}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors text-sm">
        <RotateCcw className="w-4 h-4" /> Tekrar Dene
      </button>
    </motion.div>
  );
}

export function PrepPractice() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = prepQuestions[idx];

  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= prepQuestions.length) setDone(true);
      else { setIdx((i) => i + 1); setSelected(null); }
    }, 1000);
  }

  function restart() { setIdx(0); setSelected(null); setScore(0); setDone(false); }

  if (!open) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        onClick={() => setOpen(true)}
        className="mt-5 flex items-center justify-between p-4 border border-dashed border-gold/30 rounded-xl cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gold/15 rounded-xl flex items-center justify-center group-hover:bg-gold/25 transition-colors">
            <Dumbbell className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-text-primary font-semibold text-sm">Edat Alıştırması</p>
            <p className="text-text-muted text-xs">20 soru · Akkusativ mi Dativ mi?</p>
          </div>
        </div>
        <motion.span whileHover={{ scale: 1.05 }}
          className="px-4 py-1.5 bg-gold/20 text-gold border border-gold/30 rounded-lg text-xs font-bold hover:bg-gold/30 transition-colors">
          <Trophy className="w-3.5 h-3.5 inline mr-1" />Başla
        </motion.span>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mt-5 bg-navy border border-navy-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-navy-border">
        <span className="text-text-primary font-semibold text-sm flex items-center gap-2">
          <Dumbbell className="w-4 h-4 text-gold" /> Edat Alıştırması
        </span>
        <button onClick={() => setOpen(false)} className="text-text-muted text-xs hover:text-text-secondary">Kapat</button>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {done ? (
            <ResultScreen key="done" score={score} total={prepQuestions.length} onRestart={restart} />
          ) : (
            <motion.div key={idx} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted">{idx + 1}/{prepQuestions.length}</span>
                <span className="text-xs text-gold font-semibold">{score} puan</span>
              </div>
              <div className="w-full bg-navy-border rounded-full h-1 mb-4">
                <div className="bg-gold h-1 rounded-full transition-all" style={{ width: `${(idx / prepQuestions.length) * 100}%` }} />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <p className="text-text-primary font-semibold text-base flex-1">
                  <span className="text-text-muted text-xs mr-2">Edat:</span>{q.q}
                </p>
                <SpeakBtn text={q.audio} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {q.options.map((opt) => {
                  const isCorrect = opt === q.answer;
                  const isSel = opt === selected;
                  let cls = "bg-navy-card border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
                  if (selected) {
                    if (isCorrect) cls = "bg-green-500/20 border-green-500/50 text-green-400";
                    else if (isSel) cls = "bg-red-500/20 border-red-500/50 text-red-400";
                    else cls = "opacity-40 bg-navy-card border-navy-border text-text-muted";
                  }
                  return (
                    <motion.button key={opt} onClick={() => choose(opt)}
                      whileHover={!selected ? { scale: 1.03 } : {}}
                      className={`py-3 px-4 border rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${cls}`}>
                      {selected && isCorrect && <CheckCircle2 className="w-4 h-4" />}
                      {selected && isSel && !isCorrect && <XCircle className="w-4 h-4" />}
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {selected && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs text-text-muted bg-navy/50 border border-navy-border rounded-lg px-3 py-2">
                  💡 {q.tip}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
