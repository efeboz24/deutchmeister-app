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

const reflexivePronouns = [
  { sub: "ich",     akk: "mich", dat: "mir"  },
  { sub: "du",      akk: "dich", dat: "dir"  },
  { sub: "er/sie/es", akk: "sich", dat: "sich" },
  { sub: "wir",     akk: "uns",  dat: "uns"  },
  { sub: "ihr",     akk: "euch", dat: "euch" },
  { sub: "sie/Sie", akk: "sich", dat: "sich" },
];

const verbGroups = [
  {
    title: "Akkusativ Reflexiv (çoğunluk)",
    color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30",
    verbs: [
      { v: "sich waschen",      tr: "yıkanmak",         ex: "Ich wasche mich.",           audio: "Ich wasche mich." },
      { v: "sich freuen",       tr: "sevinmek",          ex: "Er freut sich.",              audio: "Er freut sich." },
      { v: "sich erinnern",     tr: "hatırlamak",        ex: "Sie erinnert sich.",          audio: "Sie erinnert sich." },
      { v: "sich vorstellen",   tr: "kendini tanıtmak",  ex: "Ich stelle mich vor.",        audio: "Ich stelle mich vor." },
      { v: "sich entscheiden",  tr: "karar vermek",      ex: "Er entscheidet sich.",        audio: "Er entscheidet sich." },
      { v: "sich befinden",     tr: "bulunmak",          ex: "Das Hotel befindet sich hier.",audio: "Das Hotel befindet sich hier." },
      { v: "sich beeilen",      tr: "acele etmek",       ex: "Beeil dich!",                 audio: "Beeil dich!" },
      { v: "sich fühlen",       tr: "hissetmek",         ex: "Ich fühle mich gut.",         audio: "Ich fühle mich gut." },
    ],
  },
  {
    title: "Dativ Reflexiv (nesne de varsa)",
    color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30",
    verbs: [
      { v: "sich die Hände waschen", tr: "ellerini yıkamak", ex: "Ich wasche mir die Hände.", audio: "Ich wasche mir die Hände." },
      { v: "sich etwas vorstellen",  tr: "bir şey hayal etmek", ex: "Ich stelle mir das vor.", audio: "Ich stelle mir das vor." },
      { v: "sich etwas wünschen",    tr: "bir şey dilemek", ex: "Er wünscht sich ein Fahrrad.", audio: "Er wünscht sich ein Fahrrad." },
      { v: "sich etwas merken",      tr: "bir şeyi aklında tutmak", ex: "Merk dir das!", audio: "Merk dir das!" },
    ],
  },
];

const commonWithPrep = [
  { v: "sich freuen auf + Akk",    tr: "bir şeyi dört gözle beklemek", ex: "Ich freue mich auf den Urlaub.", audio: "Ich freue mich auf den Urlaub." },
  { v: "sich freuen über + Akk",   tr: "bir şeye sevinen olmak",       ex: "Sie freut sich über das Geschenk.", audio: "Sie freut sich über das Geschenk." },
  { v: "sich interessieren für + Akk", tr: "ilgilenmek",               ex: "Er interessiert sich für Musik.", audio: "Er interessiert sich für Musik." },
  { v: "sich erinnern an + Akk",   tr: "hatırlamak",                   ex: "Erinnerst du dich an ihn?", audio: "Erinnerst du dich an ihn?" },
  { v: "sich kümmern um + Akk",    tr: "ilgilenmek/bakmak",            ex: "Sie kümmert sich um die Kinder.", audio: "Sie kümmert sich um die Kinder." },
  { v: "sich ärgern über + Akk",   tr: "sinirlenmek",                  ex: "Er ärgert sich über den Lärm.", audio: "Er ärgert sich über den Lärm." },
];

const questions = [
  { q: "Ich wasche ___ die Hände. (Dativ)", answer: "mir", options: ["mich", "mir", "sich", "uns"], tip: "Ellerini yıkamak = Dativ reflexiv → ich: mir" },
  { q: "Er freut ___ über das Geschenk.", answer: "sich", options: ["ihn", "ihm", "sich", "dich"], tip: "sich freuen = reflexiv → er/sie/es: sich" },
  { q: "Wir müssen ___ beeilen!", answer: "uns", options: ["mich", "dich", "sich", "uns"], tip: "sich beeilen → wir: uns" },
  { q: "Ich freue ___ auf den Urlaub.", answer: "mich", options: ["mich", "mir", "sich", "dich"], tip: "sich freuen auf = Akkusativ reflexiv → ich: mich" },
  { q: "Erinnerst du ___ an ihn?", answer: "dich", options: ["mich", "dich", "sich", "uns"], tip: "sich erinnern an → du: dich" },
  { q: "___ du dich für Musik?", answer: "Interessierst", options: ["Interessierst", "Interessiert", "Interessieren", "Interesse"], tip: "sich interessieren für → du: interessierst dich" },
  { q: "Das Hotel ___ sich in der Stadtmitte.", answer: "befindet", options: ["befinden", "befindet", "befindet sich", "sich befindet"], tip: "sich befinden → er/es: befindet (sich folgt)" },
  { q: "Ich ___ ___ nicht gut. (sich fühlen)", answer: "fühle / mich", options: ["fühle / mich", "fühle / mir", "fühlen / mich", "fühlt / sich"], tip: "sich fühlen, Akkusativ → ich fühle mich" },
  { q: "Sie ___ ___ ein neues Auto. (sich wünschen, Dativ)", answer: "wünscht / sich", options: ["wünscht / sich", "wünscht / ihr", "wünschen / sich", "wünscht / sie"], tip: "sich wünschen mit Objekt = Dativ → sie: sich" },
  { q: "Merk ___ das! (Imperativ, du)", answer: "dir", options: ["dich", "dir", "sich", "mir"], tip: "sich merken = Dativ reflexiv → du: dir (Imperativ)" },
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

export default function ReflexiveVerbenPage() {
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [showPrep, setShowPrep] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 70% 50%, #8b5cf620 0%, transparent 55%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A2 – B1
            </span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2">Reflexive Verben</h1>
          <p className="text-text-secondary text-sm max-w-xl">
            sich waschen, sich freuen, sich erinnern… — özne ve nesne aynı kişi olduğunda kullanılır.
            <strong className="text-violet-400"> Akkusativ (mich/dich/sich)</strong> veya <strong className="text-blue-400">Dativ (mir/dir/sich)</strong> olabilir.
          </p>
        </div>
      </motion.div>

      {/* Pronoun table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-navy-border">
          <div className="text-text-primary font-bold text-sm">Dönüşlü Zamirler (Reflexivpronomen)</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left p-3 text-text-muted text-xs font-semibold w-28">Özne</th>
                <th className="p-3 text-center text-blue-400 text-xs font-bold">Akkusativ</th>
                <th className="p-3 text-center text-violet-400 text-xs font-bold">Dativ</th>
                <th className="p-3 text-left text-text-muted text-xs font-semibold">Örnek</th>
              </tr>
            </thead>
            <tbody>
              {reflexivePronouns.map((row, i) => (
                <motion.tr key={row.sub}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="border-b border-navy-border/40 last:border-0 hover:bg-navy/20 transition-colors">
                  <td className="p-3 text-text-secondary font-semibold text-xs">{row.sub}</td>
                  <td className="p-3 text-center font-black text-blue-400">{row.akk}</td>
                  <td className="p-3 text-center font-black text-violet-400">{row.dat}</td>
                  <td className="p-3 text-text-muted text-xs">
                    {row.sub === "ich" ? "Ich wasche mich / mir" : row.sub === "du" ? "Du wäschst dich / dir" : `${row.sub.split("/")[0]} wäscht sich`}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Verb groups */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {verbGroups.map(group => (
            <div key={group.title} className={`rounded-xl border ${group.border} overflow-hidden`}>
              <div className={`px-4 py-2.5 ${group.bg}`}>
                <span className={`font-bold text-sm ${group.color}`}>{group.title}</span>
              </div>
              <div className="bg-navy-card divide-y divide-navy-border/30">
                {group.verbs.map(v => (
                  <div key={v.v} className="flex items-start gap-2.5 px-3 py-2.5 hover:bg-navy/20 transition-colors">
                    <Speak text={v.audio} />
                    <div className="min-w-0">
                      <div className={`font-bold text-xs ${group.color}`}>{v.v}</div>
                      <div className="text-text-muted text-[10px]">{v.tr}</div>
                      <div className="text-text-secondary text-[11px] mt-0.5 italic">{v.ex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* With prepositions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div role="button" tabIndex={0} onClick={() => setShowPrep(!showPrep)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setShowPrep(!showPrep); }}
          className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-navy/20 transition-colors">
          <div>
            <div className="text-text-primary font-bold text-sm">Edatlı Reflexiv Fiiller</div>
            <div className="text-text-muted text-xs mt-0.5">sich freuen auf/über, sich interessieren für…</div>
          </div>
          <motion.div animate={{ rotate: showPrep ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {showPrep && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="border-t border-navy-border divide-y divide-navy-border/30">
                {commonWithPrep.map(item => (
                  <div key={item.v} className="flex items-start gap-2.5 px-4 py-3 hover:bg-navy/20 transition-colors">
                    <Speak text={item.audio} />
                    <div>
                      <span className="text-gold font-bold text-xs">{item.v}</span>
                      <span className="text-text-muted text-xs ml-2">— {item.tr}</span>
                      <div className="text-text-secondary text-[11px] mt-0.5 italic">{item.ex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tip */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }}
        className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-amber-400 text-xs leading-relaxed">
          <strong>Kural:</strong> Cümlede <em>başka bir nesne (Akkusativ)</em> varsa → reflexiv zamir <strong>Dativ</strong> olur.
          <br /><span className="text-text-muted">Ich wasche <strong className="text-blue-400">mich</strong>. (başka nesne yok → Akk)</span>
          <br /><span className="text-text-muted">Ich wasche <strong className="text-violet-400">mir</strong> die Hände. (die Hände = Akk nesne → reflexiv Dativ)</span>
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
      <GrammarTracker topicId="a2-reflexivverben" level="A2" />
    </div>
  );
}
