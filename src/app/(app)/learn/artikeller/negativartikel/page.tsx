"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle, RotateCcw, Lightbulb, GraduationCap, Volume2, AlertCircle } from "lucide-react";

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

// kein follows ein-pattern but also has plural forms
const keinTable = [
  { kasus: "Nominativ", mask: "kein",   fem: "keine",  neu: "kein",   pl: "keine" },
  { kasus: "Akkusativ", mask: "keinen", fem: "keine",  neu: "kein",   pl: "keine" },
  { kasus: "Dativ",     mask: "keinem", fem: "keiner", neu: "keinem", pl: "keinen" },
  { kasus: "Genitiv",   mask: "keines", fem: "keiner", neu: "keines", pl: "keiner" },
];

const gCols = [
  { key: "mask", label: "Maskulin", text: "text-blue-400" },
  { key: "fem",  label: "Feminin",  text: "text-pink-400" },
  { key: "neu",  label: "Neutrum",  text: "text-violet-400" },
  { key: "pl",   label: "Plural",   text: "text-green-400" },
];

// kein vs nicht comparison
const keinVsNicht = [
  {
    rule: "kein / keine", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30",
    when: "İsmin önünde article yerine geçer",
    examples: [
      { pos: "Ich habe ein Auto.", neg: "Ich habe kein Auto.", posT: "Arabam var.", negT: "Arabam yok." },
      { pos: "Das ist eine Frau.", neg: "Das ist keine Frau.", posT: "Bu bir kadın.", negT: "Bu bir kadın değil." },
      { pos: "Er trinkt Wasser.", neg: "Er trinkt kein Wasser.", posT: "Su içiyor.", negT: "Su içmiyor." },
    ],
  },
  {
    rule: "nicht", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30",
    when: "Fiilleri, sıfatları, belirli isimleri (the ile) reddeder",
    examples: [
      { pos: "Er schläft.", neg: "Er schläft nicht.", posT: "Uyuyor.", negT: "Uyumuyor." },
      { pos: "Das Wetter ist schön.", neg: "Das Wetter ist nicht schön.", posT: "Hava güzel.", negT: "Hava güzel değil." },
      { pos: "Ich sehe den Mann.", neg: "Ich sehe den Mann nicht.", posT: "Adamı görüyorum.", negT: "Adamı görmüyorum." },
    ],
  },
];

const questions = [
  { q: "Ich habe ___ Bruder. (hiç yok)", answer: "keinen", options: ["kein", "keine", "keinen", "keinem"], tip: "Akkusativ + maskulin → keinen" },
  { q: "Das ist ___ Katze.", answer: "keine", options: ["kein", "keine", "keinen", "keiner"], tip: "Nominativ + feminin → keine" },
  { q: "Er hat ___ Auto.", answer: "kein", options: ["kein", "keine", "keinen", "keinem"], tip: "Akkusativ + neutrum → kein (değişmez!)" },
  { q: "Sie lernt ___ Deutsch. (öğrenmiyor)", answer: "kein", options: ["kein", "keine", "nicht", "nichts"], tip: "Belirsiz isim (artikel yok) → kein" },
  { q: "Das ist ___ schönes Haus.", answer: "kein", options: ["kein", "keine", "keinen", "nicht"], tip: "Nominativ + neutrum + sıfat → kein" },
  { q: "Er schläft ___.", answer: "nicht", options: ["kein", "keine", "nicht", "keinem"], tip: "Fiili reddetmek → nicht" },
  { q: "Ich habe ___ Kinder.", answer: "keine", options: ["kein", "keine", "keinen", "keinem"], tip: "Akkusativ + plural → keine" },
  { q: "Sie ist ___ Ärztin.", answer: "keine", options: ["kein", "keine", "keinen", "nicht"], tip: "Nominativ + feminin (meslek) → keine" },
  { q: "Ich sehe ___ Mann.", answer: "keinen", options: ["kein", "keine", "keinen", "nicht"], tip: "Akkusativ + maskulin → keinen" },
  { q: "Das Wetter ist ___ schön.", answer: "nicht", options: ["kein", "keine", "nicht", "keinem"], tip: "Sıfatı reddetmek → nicht" },
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

export default function NegativartikelPage() {
  const [practiceOpen, setPracticeOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-red-500/20 p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 30% 50%, #ef444420 0%, transparent 60%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A1 – A2
            </span>
            <span className="px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-bold border border-red-500/30">Sık Hata!</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2">Negativartikel: kein / nicht</h1>
          <p className="text-text-secondary text-sm max-w-xl">
            "Hayır" demek için <strong className="text-red-400">kein</strong> mi, <strong className="text-amber-400">nicht</strong> mi? Bu ayrım sınavlarda çok sorulan ve en çok yanlış yapılan konudur.
          </p>
        </div>
      </motion.div>

      {/* kein vs nicht */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
        <h2 className="text-sm font-bold text-text-primary mb-3">kein vs. nicht — Karar Ağacı</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keinVsNicht.map((group) => (
            <div key={group.rule} className={`rounded-xl border ${group.border} overflow-hidden`}>
              <div className={`${group.bg} px-4 py-3`}>
                <div className={`font-black text-lg ${group.color}`}>{group.rule}</div>
                <div className="text-text-secondary text-xs mt-0.5">{group.when}</div>
              </div>
              <div className="p-3 space-y-2 bg-navy-card">
                {group.examples.map((ex) => (
                  <div key={ex.pos} className="p-2.5 rounded-lg bg-navy/60 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400 text-[10px] font-bold">✓</span>
                      <span className="text-text-secondary text-xs">{ex.pos}</span>
                      <span className="text-text-muted text-[10px]">— {ex.posT}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold ${group.color}`}>✗→</span>
                      <Speak text={ex.neg} />
                      <span className={`text-xs font-semibold ${group.color}`}>{ex.neg}</span>
                    </div>
                    <div className="text-text-muted text-[10px] pl-8">{ex.negT}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick rule */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}
        className="flex gap-3 p-4 rounded-xl bg-gold/10 border border-gold/30">
        <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div>
          <div className="text-gold font-bold text-sm">Karar Kuralı</div>
          <div className="text-text-secondary text-xs mt-1 leading-relaxed">
            <strong className="text-red-400">kein</strong> = ein/eine yerini alır (isim önünde) · Artikeli <strong>belirsiz</strong> olan isimler + <strong>artikelsiz</strong> isimler
            <br />
            <strong className="text-amber-400">nicht</strong> = her şeyin (fiil, sıfat, belirli isim) reddi
          </div>
        </div>
      </motion.div>

      {/* kein declension table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-navy-border">
          <div className="text-text-primary font-bold text-sm">kein / keine Çekim Tablosu</div>
          <div className="text-text-muted text-xs mt-0.5">ein-Artikel gibi çekilir + Plural formu var</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left p-3 text-text-muted text-xs font-semibold w-24">Kasus</th>
                {gCols.map(g => (
                  <th key={g.key} className={`p-3 text-center text-xs font-bold ${g.text}`}>{g.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keinTable.map((row, i) => (
                <motion.tr key={row.kasus} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="border-b border-navy-border/40 last:border-0 hover:bg-navy/20 transition-colors">
                  <td className="p-3 text-xs font-bold text-text-secondary">{row.kasus}</td>
                  {gCols.map((g, gi) => {
                    const val = row[g.key as keyof typeof row] as string;
                    const base = "kein";
                    const ending = val.slice(base.length);
                    return (
                      <td key={g.key} className="p-3 text-center">
                        <span className="text-text-secondary text-sm font-semibold">{base}</span>
                        <span className={`text-sm font-black ${gCols[gi].text}`}>{ending || "—"}</span>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-amber-500/8 border-t border-amber-500/20">
          <div className="flex gap-2 text-amber-400 text-xs">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
            <span><strong>Fark:</strong> ein'den farklı olarak kein'in <strong>Plural</strong> formu var! ein (Plural yok) → kein/keine (Plural: keine)</span>
          </div>
        </div>
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
