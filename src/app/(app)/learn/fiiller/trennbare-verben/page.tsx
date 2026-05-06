"use client";

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { saveProgress } from '@/lib/saveProgress';
import { GrammarTracker } from "@/components/learn/GrammarTracker";
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

const prefixColors: Record<string, { text: string; bg: string; border: string }> = {
  auf:  { text: "text-blue-400",   bg: "bg-blue-500/20",   border: "border-blue-500/40" },
  an:   { text: "text-amber-400",  bg: "bg-amber-500/20",  border: "border-amber-500/40" },
  aus:  { text: "text-green-400",  bg: "bg-green-500/20",  border: "border-green-500/40" },
  ab:   { text: "text-red-400",    bg: "bg-red-500/20",    border: "border-red-500/40" },
  ein:  { text: "text-violet-400", bg: "bg-violet-500/20", border: "border-violet-500/40" },
  mit:  { text: "text-pink-400",   bg: "bg-pink-500/20",   border: "border-pink-500/40" },
  zu:   { text: "text-teal-400",   bg: "bg-teal-500/20",   border: "border-teal-500/40" },
  zurück: { text: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/40" },
};

const verbs = [
  { prefix: "auf", stem: "stehen",  inf: "aufstehen",   tr: "kalkmak",        präs: "steht…auf",   perf: "ist aufgestanden",  ex: "Ich stehe um 7 Uhr auf.",         audio: "Ich stehe um 7 Uhr auf." },
  { prefix: "an",  stem: "rufen",   inf: "anrufen",    tr: "aramak (tel.)",   präs: "ruft…an",     perf: "hat angerufen",     ex: "Er ruft seine Mutter an.",        audio: "Er ruft seine Mutter an." },
  { prefix: "ein", stem: "kaufen",  inf: "einkaufen",  tr: "alışveriş yapmak",präs: "kauft…ein",   perf: "hat eingekauft",    ex: "Sie kauft im Supermarkt ein.",    audio: "Sie kauft im Supermarkt ein." },
  { prefix: "auf", stem: "machen",  inf: "aufmachen",  tr: "açmak",           präs: "macht…auf",   perf: "hat aufgemacht",    ex: "Er macht die Tür auf.",           audio: "Er macht die Tür auf." },
  { prefix: "zu",  stem: "machen",  inf: "zumachen",   tr: "kapatmak",        präs: "macht…zu",    perf: "hat zugemacht",     ex: "Sie macht das Fenster zu.",       audio: "Sie macht das Fenster zu." },
  { prefix: "mit", stem: "kommen",  inf: "mitkommen",  tr: "birlikte gelmek", präs: "kommt…mit",   perf: "ist mitgekommen",   ex: "Kommst du mit?",                  audio: "Kommst du mit?" },
  { prefix: "ab",  stem: "fahren",  inf: "abfahren",   tr: "hareket etmek",   präs: "fährt…ab",    perf: "ist abgefahren",    ex: "Der Zug fährt um 9 ab.",          audio: "Der Zug fährt um 9 ab." },
  { prefix: "an",  stem: "kommen",  inf: "ankommen",   tr: "varmak",          präs: "kommt…an",    perf: "ist angekommen",    ex: "Er kommt um 10 an.",              audio: "Er kommt um 10 an." },
  { prefix: "aus", stem: "gehen",   inf: "ausgehen",   tr: "dışarı çıkmak",   präs: "geht…aus",    perf: "ist ausgegangen",   ex: "Wir gehen am Abend aus.",         audio: "Wir gehen am Abend aus." },
  { prefix: "zurück", stem: "kommen", inf: "zurückkommen", tr: "geri dönmek", präs: "kommt…zurück", perf: "ist zurückgekommen", ex: "Sie kommt morgen zurück.",     audio: "Sie kommt morgen zurück." },
  { prefix: "auf", stem: "hören",   inf: "aufhören",   tr: "bırakmak/durmak", präs: "hört…auf",    perf: "hat aufgehört",     ex: "Er hört mit dem Rauchen auf.",    audio: "Er hört mit dem Rauchen auf." },
  { prefix: "an",  stem: "fangen",  inf: "anfangen",   tr: "başlamak",        präs: "fängt…an",    perf: "hat angefangen",    ex: "Wann fängt der Film an?",         audio: "Wann fängt der Film an?" },
];

const usageRules = [
  {
    title: "Präsens — Önek SONA gider",
    color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30",
    example: { verb: "aufstehen", sentence: "Ich stehe um 7 Uhr auf.", breakdown: ["Ich", "stehe", "um 7 Uhr", "auf"] },
  },
  {
    title: "Perfekt — ge- ARASINA girer",
    color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30",
    example: { verb: "aufstehen", sentence: "Ich bin um 7 Uhr aufgestanden.", breakdown: ["Ich", "bin", "um 7 Uhr", "auf|ge|standen"] },
  },
  {
    title: "Modal ile — Infinitiv bütün kalır",
    color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30",
    example: { verb: "aufstehen", sentence: "Ich muss um 7 Uhr aufstehen.", breakdown: ["Ich", "muss", "um 7 Uhr", "aufstehen"] },
  },
  {
    title: "Nebensatz — Önek fiile yapışık kalır",
    color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30",
    example: { verb: "aufstehen", sentence: "…, weil ich um 7 Uhr aufstehe.", breakdown: ["weil", "ich", "um 7 Uhr", "aufstehe"] },
  },
];

const questions = [
  { q: "Ich ___ um 7 Uhr ___. (aufstehen, Präsens)", answer: "stehe / auf", options: ["stehe / auf", "aufstehe /", "stehe / aufstehe", "auf / stehe"], tip: "Präsens: Önek sona → ich stehe…auf" },
  { q: "Er ___ seine Mutter ___. (anrufen)", answer: "ruft / an", options: ["ruft / an", "anruft /", "ruftan / ", "an / ruft"], tip: "Präsens: anrufen → er ruft…an" },
  { q: "Sie ___ gestern im Supermarkt ___. (einkaufen, Perfekt)", answer: "hat eingekauft", options: ["hat eingekauft", "ist eingekauft", "hat einkauft", "ist einkaufen"], tip: "Perfekt: ein|ge|kauft → hat eingekauft (Beweget yok → haben)" },
  { q: "___ du ___? (mitkommen, Frage)", answer: "Kommst / mit", options: ["Kommst / mit", "Mit / kommst", "Komm / mit", "Mitkommst /"], tip: "Frage Präsens: önek sona → Kommst du mit?" },
  { q: "Der Zug ___ um 9 Uhr ___. (abfahren)", answer: "fährt / ab", options: ["fährt / ab", "abfährt /", "fährt / abfährt", "ab / fährt"], tip: "abfahren → fährt (umlaut!) ab" },
  { q: "Er ___ um 10 Uhr ___. (ankommen, Perfekt)", answer: "ist angekommen", options: ["hat angekommen", "ist angekommen", "ist ankommen", "hat ankommte"], tip: "ankommen = Beweget → sein: ist an|ge|kommen" },
  { q: "Ich muss früh ___. (aufstehen)", answer: "aufstehen", options: ["aufstehen", "aufstehe", "stehe auf", "aufstehend"], tip: "Modal ile: Infinitiv bütün kalır sonda → aufstehen" },
  { q: "Wann ___ der Film ___? (anfangen)", answer: "fängt / an", options: ["fängt / an", "anfängt /", "fängt / anfängt", "an / fängt"], tip: "anfangen: fangen → fängt (umlaut!) → an" },
  { q: "…, weil er früh ___. (aufstehen, Nebensatz)", answer: "aufsteht", options: ["aufsteht", "steht auf", "auf steht", "aufstehe"], tip: "Nebensatz: önek ayrılmaz, fiil sona → aufsteht" },
  { q: "Sie ___ gestern Abend ___. (ausgehen, Perfekt)", answer: "ist ausgegangen", options: ["hat ausgegangen", "ist ausgegangen", "ist ausgegehen", "hat ausgehen"], tip: "ausgehen = Beweget → sein: ist aus|ge|gangen" },
];

function MiniPractice() {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const { update } = useSession();
  useEffect(() => {
    if (!done) return;
    const xp = Math.max(10, score * 5);
    const pct = Math.round((score / questions.length) * 100);
    saveProgress({ xp, skill: 'grammatik', skillScore: pct, minutes: 8 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); });
  }, [done]);

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
      <div className="grid grid-cols-1 gap-2">
        {q.options.map(opt => {
          const picked = sel === opt, correct = opt === q.answer;
          return (
            <motion.button key={opt} whileTap={{ scale: 0.98 }} onClick={() => pick(opt)}
              className={`py-2.5 px-4 rounded-xl text-sm text-left font-semibold border transition-all ${sel
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
        {sel && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`p-3 rounded-xl text-xs border ${sel === q.answer ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-amber-500/10 border-amber-500/30 text-amber-400"}`}>
            💡 {q.tip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TrennbareVerbenPage() {
  const [practiceOpen, setPracticeOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 25% 50%, #3b82f618 0%, transparent 55%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A1 – A2
            </span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2">Trennbare Verben</h1>
          <p className="text-text-secondary text-sm max-w-xl">
            aufstehen, anrufen, einkaufen… — önek cümlenin <strong className="text-blue-400">sonuna</strong> gider.
            Perfekt'te <strong className="text-green-400">ge-</strong> önek ile kök arasına girer.
          </p>
        </div>
      </motion.div>

      {/* Usage rules */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}>
        <h2 className="text-sm font-bold text-text-primary mb-3">4 Durum — 4 Kural</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {usageRules.map(rule => (
            <div key={rule.title} className={`rounded-xl border ${rule.border} p-4`}>
              <div className={`font-bold text-xs ${rule.color} mb-2`}>{rule.title}</div>
              <div className="flex items-center gap-2">
                <Speak text={rule.example.sentence} />
                <div className="flex flex-wrap gap-1 text-xs font-mono">
                  {rule.example.breakdown.map((part, i) => (
                    <span key={i} className={part.includes("|") ? `font-black ${rule.color}` : "text-text-secondary"}>
                      {part.replace(/\|/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Verb table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-navy-border">
          <div className="text-text-primary font-bold text-sm">Önemli Ayrılabilen Fiiller</div>
          <div className="text-text-muted text-xs mt-0.5">Önek · Prezens · Perfekt · Türkçe</div>
        </div>
        <div className="divide-y divide-navy-border/40">
          {verbs.map((v, i) => {
            const pc = prefixColors[v.prefix] ?? { text: "text-gold", bg: "bg-gold/20", border: "border-gold/40" };
            return (
              <motion.div key={v.inf}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-navy/20 transition-colors">
                <span className={`shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>{v.prefix}-</span>
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 items-center">
                  <span className={`font-black text-sm ${pc.text}`}>{v.inf}</span>
                  <span className="text-text-muted text-xs">{v.tr}</span>
                  <span className="text-text-secondary text-xs">{v.präs}</span>
                  <span className="text-text-muted text-xs font-mono">{v.perf}</span>
                </div>
                <Speak text={v.audio} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Tip */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
        className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-amber-400 text-xs leading-relaxed">
          <strong>haben vs sein:</strong> Hareket veya yer değişimi bildiren fiiller (kommen, gehen, fahren, fliegen…) Perfekt'te <strong>sein</strong> alır. Diğerleri <strong>haben</strong>.<br />
          <span className="text-text-muted mt-1 block">Er ist angekommen ✓ · Sie hat angerufen ✓</span>
        </div>
      </motion.div>

      {/* Practice */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}
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
      <GrammarTracker topicId="trennbare-verben" level="A1" />
    </div>
  );
}
