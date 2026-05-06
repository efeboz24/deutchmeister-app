"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle, RotateCcw, Lightbulb, GraduationCap, Volume2 } from "lucide-react";

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

// All possessive pronouns: stem forms
const pronouns = [
  { stem: "mein",  person: "ben",      tr: "(benim)" },
  { stem: "dein",  person: "sen",      tr: "(senin)" },
  { stem: "sein",  person: "o (erk.)", tr: "(onun/erkek)" },
  { stem: "ihr",   person: "o (dişi)", tr: "(onun/dişi)" },
  { stem: "sein",  person: "o (nötr)", tr: "(onun/nötr)" },
  { stem: "unser", person: "biz",      tr: "(bizim)" },
  { stem: "euer",  person: "siz",      tr: "(sizin)" },
  { stem: "ihr",   person: "onlar",    tr: "(onların)" },
  { stem: "Ihr",   person: "Siz",      tr: "(formal siz)" },
];

// Endings follow ein-pattern
const endings: Record<string, Record<string, string>> = {
  Nominativ: { mask: "",    fem: "e",   neu: "",    pl: "e" },
  Akkusativ: { mask: "en",  fem: "e",   neu: "",    pl: "e" },
  Dativ:     { mask: "em",  fem: "er",  neu: "em",  pl: "en" },
  Genitiv:   { mask: "es",  fem: "er",  neu: "es",  pl: "er" },
};

const kasusRows = ["Nominativ", "Akkusativ", "Dativ", "Genitiv"];
const genderCols = ["mask", "fem", "neu", "pl"];
const genderHeaders = [
  { label: "Maskulin", text: "text-blue-400", ex: "(der Mann)" },
  { label: "Feminin",  text: "text-pink-400",   ex: "(die Frau)" },
  { label: "Neutrum",  text: "text-violet-400", ex: "(das Kind)" },
  { label: "Plural",   text: "text-green-400",  ex: "(die Kinder)" },
];

function buildForm(stem: string, kasus: string, gender: string): string {
  const end = endings[kasus][gender];
  // Handle "euer" → "eur" + ending when ending starts with vowel
  if (stem === "euer" && end.length > 0) return "eur" + end;
  return stem + end;
}

const examples = [
  { de: "Das ist mein Buch.", tr: "Bu benim kitabım.", audio: "Das ist mein Buch." },
  { de: "Ich sehe deinen Freund.", tr: "Arkadaşını görüyorum.", audio: "Ich sehe deinen Freund." },
  { de: "Er hilft seiner Mutter.", tr: "Annesine yardım ediyor.", audio: "Er hilft seiner Mutter." },
  { de: "Das ist unser Haus.", tr: "Bu bizim evimiz.", audio: "Das ist unser Haus." },
  { de: "Ich danke Ihrer Hilfe.", tr: "Yardımınıza teşekkür ederim.", audio: "Ich danke Ihrer Hilfe." },
  { de: "Wo ist euer Auto?", tr: "Arabanız nerede?", audio: "Wo ist euer Auto?" },
];

const questions = [
  { q: "Das ist ___ Buch. (mein, neutrum, Nom)", answer: "mein", options: ["mein", "meine", "meinen", "meinem"], tip: "Nominativ + neutrum → kök + '' (ek yok)" },
  { q: "Ich sehe ___ Freund. (mein, Mask, Akk)", answer: "meinen", options: ["mein", "meine", "meinen", "meinem"], tip: "Akkusativ + maskulin → mein + en" },
  { q: "Er hilft ___ Mutter. (sein, Fem, Dat)", answer: "seiner", options: ["seine", "seiner", "seinem", "seinen"], tip: "Dativ + feminin → sein + er" },
  { q: "___ Auto ist neu. (ihr, Neu, Nom)", answer: "Ihr", options: ["Ihre", "Ihr", "Ihrem", "Ihren"], tip: "Nominativ + neutrum → Ihr + '' (ek yok)" },
  { q: "Ich liebe ___ Familie. (mein, Fem, Akk)", answer: "meine", options: ["mein", "meine", "meinen", "meinem"], tip: "Akkusativ + feminin → mein + e" },
  { q: "Das ist ___ Haus. (unser, Neu, Nom)", answer: "unser", options: ["unser", "unsere", "unserem", "unseren"], tip: "Nominativ + neutrum → unser (ek yok)" },
  { q: "Wo ist ___ Schlüssel? (dein, Mask, Nom)", answer: "dein", options: ["dein", "deine", "deinen", "deinem"], tip: "Nominativ + maskulin → dein + '' (ek yok)" },
  { q: "Er dankt ___ Vater. (sein, Mask, Dat)", answer: "seinem", options: ["sein", "seine", "seinen", "seinem"], tip: "Dativ + maskulin → sein + em" },
  { q: "Das ist ___ Tasche. (euer, Fem, Nom)", answer: "eure", options: ["euer", "eure", "eurem", "euren"], tip: "Nominativ + feminin → eur + e (euer'den 'e' düşer)" },
  { q: "Ich kenne ___ Eltern. (ihr, Pl, Akk)", answer: "ihre", options: ["ihr", "ihre", "ihrem", "ihren"], tip: "Akkusativ + plural → ihr + e" },
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

export default function PossessivartikelPage() {
  const [activeStem, setActiveStem] = useState("mein");
  const [showExamples, setShowExamples] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const stem = activeStem;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 70% 50%, #8b5cf620 0%, transparent 60%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A2 – B1
            </span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2">Possessivartikel</h1>
          <p className="text-text-secondary text-sm max-w-xl">
            mein, dein, sein, ihr, unser, euer — iyelik sıfatları. <strong>ein-</strong>Artikel çekimiyle aynı ekleri alır. Bir kişiyi seç → tabloyu gör.
          </p>
        </div>
      </motion.div>

      {/* Person selector */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
        <h2 className="text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Kişi Seç</h2>
        <div className="flex flex-wrap gap-2">
          {pronouns.map((p, i) => {
            const key = `${p.stem}-${i}`;
            const isActive = activeStem === p.stem && pronouns.findIndex((pp, ii) => pp.stem === activeStem && ii === (pronouns.findIndex(x => x.stem === activeStem))) === i;
            return (
              <motion.button key={key} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStem(p.stem)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${activeStem === p.stem
                  ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                  : "bg-navy-card border-navy-border text-text-muted hover:border-navy-border/80 hover:text-text-secondary"}`}>
                <span className="font-black">{p.stem}-</span>
                <span className="opacity-70 ml-1">{p.person}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Declension table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-navy-border bg-violet-500/10">
          <span className="text-violet-400 font-black text-lg">{stem}-</span>
          <span className="text-text-muted text-sm ml-1">çekimi (ein-Artikel modeli)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left p-3 text-text-muted font-semibold text-xs w-24">Kasus</th>
                {genderHeaders.map(h => (
                  <th key={h.label} className="p-3 text-center">
                    <div className={`font-bold text-xs ${h.text}`}>{h.label}</div>
                    <div className="text-text-muted text-[10px] mt-0.5">{h.ex}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kasusRows.map((kasus, ki) => (
                <motion.tr key={kasus}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ki * 0.05, duration: 0.3 }}
                  className="border-b border-navy-border/40 last:border-0 hover:bg-navy/20 transition-colors">
                  <td className="p-3 text-xs font-bold text-text-secondary">{kasus}</td>
                  {genderCols.map((g, gi) => {
                    const form = buildForm(stem, kasus, g);
                    const ending = endings[kasus][g];
                    const stemPart = form.slice(0, form.length - ending.length);
                    return (
                      <td key={g} className="p-3 text-center">
                        <span className="text-text-secondary text-sm font-semibold">{stemPart}</span>
                        <span className={`text-sm font-black ${genderHeaders[gi].text}`}>{ending || "—"}</span>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-violet-500/8 border-t border-violet-500/20">
          <div className="flex gap-2 text-violet-400 text-xs">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Renksiz = kök, <strong className="text-violet-400">renkli = ek</strong>. Possessivartikeller hep <strong>ein-Artikel</strong> eklerini alır.</span>
          </div>
        </div>
      </motion.div>

      {/* ein-Artikel comparison */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}
        className="p-4 rounded-xl bg-gold/10 border border-gold/30">
        <div className="text-gold font-bold text-sm mb-2">💡 Anahtar Kural: ein-Artikel ile aynı!</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            { kasus: "Nom (mask)", ein: "ein", mein: "mein" },
            { kasus: "Akk (mask)", ein: "einen", mein: "meinen" },
            { kasus: "Dat (mask)", ein: "einem", mein: "meinem" },
            { kasus: "Gen (mask)", ein: "eines", mein: "meines" },
          ].map(row => (
            <div key={row.kasus} className="p-2 rounded-lg bg-navy/60">
              <div className="text-text-muted text-[10px]">{row.kasus}</div>
              <div className="text-text-secondary mt-1">{row.ein} = <span className="text-gold font-bold">{row.mein}</span></div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Example sentences */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div role="button" tabIndex={0} onClick={() => setShowExamples(!showExamples)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setShowExamples(!showExamples); }}
          className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-navy/20 transition-colors">
          <div className="font-bold text-text-primary text-sm">Örnek Cümleler</div>
          <motion.div animate={{ rotate: showExamples ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {showExamples && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="px-4 pb-4 pt-2 border-t border-navy-border space-y-2">
                {examples.map(ex => (
                  <div key={ex.de} className="flex items-center gap-2.5 p-3 rounded-lg bg-navy/60">
                    <Speak text={ex.audio} />
                    <div>
                      <div className="text-text-primary text-sm font-semibold">{ex.de}</div>
                      <div className="text-text-muted text-xs mt-0.5">{ex.tr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
