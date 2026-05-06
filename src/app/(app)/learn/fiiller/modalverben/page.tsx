"use client";

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { saveProgress } from '@/lib/saveProgress';
import { GrammarTracker } from "@/components/learn/GrammarTracker";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle, RotateCcw, Lightbulb, GraduationCap, Volume2, Zap } from "lucide-react";

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

const modals = [
  { verb: "können",  tr: "yapabilmek",    color: "text-blue-400",   bg: "bg-blue-500/15",   border: "border-blue-500/40",   conj: ["kann","kannst","kann","können","könnt","können"], ex: "Ich kann Deutsch sprechen.", exTr: "Almanca konuşabiliyorum." },
  { verb: "müssen",  tr: "zorunda olmak", color: "text-red-400",    bg: "bg-red-500/15",    border: "border-red-500/40",    conj: ["muss","musst","muss","müssen","müsst","müssen"], ex: "Du musst lernen.", exTr: "Çalışman gerekiyor." },
  { verb: "dürfen",  tr: "izni olmak",    color: "text-green-400",  bg: "bg-green-500/15",  border: "border-green-500/40",  conj: ["darf","darfst","darf","dürfen","dürft","dürfen"], ex: "Hier darf man rauchen.", exTr: "Burada sigara içilebilir." },
  { verb: "wollen",  tr: "istemek",       color: "text-amber-400",  bg: "bg-amber-500/15",  border: "border-amber-500/40",  conj: ["will","willst","will","wollen","wollt","wollen"], ex: "Sie will Ärztin werden.", exTr: "Doktor olmak istiyor." },
  { verb: "sollen",  tr: "yapması lazım", color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/40", conj: ["soll","sollst","soll","sollen","sollt","sollen"], ex: "Er soll früh kommen.", exTr: "Erken gelmesi gerekiyor (dışarıdan)." },
  { verb: "mögen",   tr: "hoşlanmak",     color: "text-pink-400",   bg: "bg-pink-500/15",   border: "border-pink-500/40",   conj: ["mag","magst","mag","mögen","mögt","mögen"], ex: "Ich mag Kaffee.", exTr: "Kahveyi severim." },
];

const subjects = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

const meanings = [
  { modal: "können",  uses: ["Fähigkeit: Ich kann schwimmen.", "Möglichkeit: Es kann regnen.", "Erlaubnis (höflich): Kann ich gehen?"] },
  { modal: "müssen",  uses: ["Notwendigkeit: Ich muss arbeiten.", "Logische Schlussfolgerung: Er muss krank sein."] },
  { modal: "dürfen",  uses: ["Erlaubnis: Du darfst hier parken.", "Verbot (negativ): Du darfst nicht rauchen."] },
  { modal: "wollen",  uses: ["Absicht: Ich will reisen.", "Wunsch: Er will mehr verdienen."] },
  { modal: "sollen",  uses: ["Auftrag: Du sollst das erledigen.", "Gerücht: Er soll reich sein."] },
  { modal: "mögen",   uses: ["Zuneigung: Ich mag ihn.", "Möchten (höflicher Wunsch): Ich möchte Kaffee."] },
];

const questions = [
  { q: "Ich ___ Deutsch sprechen. (yapabilmek)", answer: "kann", options: ["kann", "muss", "darf", "soll"], tip: "Fähigkeit (beceri) → können → ich: kann" },
  { q: "Du ___ früh aufstehen. (zorunlu)", answer: "musst", options: ["kannst", "darfst", "musst", "sollst"], tip: "Notwendigkeit (zorunluluk) → müssen → du: musst" },
  { q: "Hier ___ man nicht rauchen. (yasak)", answer: "darf", options: ["kann", "darf", "muss", "will"], tip: "Verbot = dürfen negativ → darf nicht = yasak" },
  { q: "Er ___ Arzt werden. (istiyor)", answer: "will", options: ["soll", "muss", "will", "darf"], tip: "Eigener Wunsch (kendi isteği) → wollen → er: will" },
  { q: "Sie ___ das Formular ausfüllen. (başkası söyledi)", answer: "soll", options: ["muss", "soll", "will", "kann"], tip: "Auftrag von außen (dıştan emir) → sollen → sie: soll" },
  { q: "Ich ___ ein Eis. (hoşlanıyorum/istiyorum nazikçe)", answer: "möchte", options: ["mag", "möchte", "muss", "kann"], tip: "Höflicher Wunsch (nazik istek) → möchten → ich: möchte" },
  { q: "Wir ___ morgen kommen. (gelebiliriz)", answer: "können", options: ["müssen", "können", "sollen", "wollen"], tip: "Möglichkeit (olasılık) → können → wir: können" },
  { q: "___ ich das Fenster öffnen? (izin isteme)", answer: "Darf", options: ["Muss", "Darf", "Soll", "Will"], tip: "Erlaubnis bitten (izin istemek) → dürfen → ich: darf" },
  { q: "Ihr ___ leise sein! (zorunlu)", answer: "müsst", options: ["könnt", "sollt", "müsst", "wollt"], tip: "Notwendigkeit → müssen → ihr: müsst" },
  { q: "Das ___ wahr sein. (muhtemelen doğrudur)", answer: "muss", options: ["kann", "muss", "darf", "soll"], tip: "Logische Schlussfolgerung (mantıksal çıkarım) → müssen → es: muss" },
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
                ? correct ? "bg-green-500/20 border-green-500/50 text-green-400"
                  : picked ? "bg-red-500/20 border-red-500/50 text-red-400"
                  : "opacity-40 bg-navy border-navy-border text-text-muted"
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

export default function ModalverbenPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showMeanings, setShowMeanings] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const selected = modals.find(m => m.verb === activeModal) ?? modals[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 20% 50%, #3b82f620 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, #f59e0b15 0%, transparent 55%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A1 – B1
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">Çok Çıkar!</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2 flex items-center gap-2">
            <Zap className="w-6 h-6 text-gold" /> Modalverben
          </h1>
          <p className="text-text-secondary text-sm max-w-xl">
            können · müssen · dürfen · wollen · sollen · mögen — 6 modal fiil ve cümle yapısı.
            <strong className="text-gold"> Modal 2. pozisyonda, asıl fiil cümle SONUNDA!</strong>
          </p>
        </div>
      </motion.div>

      {/* Sentence structure box */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
        className="p-4 rounded-xl bg-gold/10 border border-gold/30">
        <div className="text-gold font-bold text-sm mb-2">⚡ Cümle Yapısı — En Önemli Kural</div>
        <div className="flex items-center gap-2 flex-wrap text-sm font-mono">
          <span className="px-2 py-1 rounded bg-navy text-text-secondary">Özne</span>
          <span className="text-gold font-black">+</span>
          <span className="px-2 py-1 rounded bg-gold/20 text-gold font-black">Modal</span>
          <span className="text-gold font-black">+</span>
          <span className="px-2 py-1 rounded bg-navy text-text-muted">... diğer şeyler ...</span>
          <span className="text-gold font-black">+</span>
          <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-black">Infinitiv</span>
        </div>
        <div className="flex items-center gap-2 mt-2 flex-wrap text-sm font-mono">
          <Speak text="Ich kann morgen Deutsch lernen." />
          <span className="text-text-secondary">Ich</span>
          <span className="text-gold font-black">kann</span>
          <span className="text-text-muted">morgen</span>
          <span className="text-blue-400 font-black">lernen</span>
          <span className="text-text-muted text-xs">.</span>
        </div>
      </motion.div>

      {/* Modal verb selector */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }}>
        <h2 className="text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Fiil Seç → Çekimi Gör</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {modals.map(m => (
            <motion.button key={m.verb} whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal(activeModal === m.verb ? null : m.verb)}
              className={`px-3 py-1.5 rounded-xl text-sm font-bold border transition-all ${activeModal === m.verb ? `${m.bg} ${m.border} ${m.color}` : "bg-navy-card border-navy-border text-text-muted hover:border-navy-border/80"}`}>
              {m.verb}
              <span className="text-[10px] font-normal ml-1 opacity-70">{m.tr}</span>
            </motion.button>
          ))}
        </div>

        {/* Conjugation table */}
        <div className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
          <div className={`px-4 py-3 border-b border-navy-border ${selected.bg}`}>
            <span className={`font-black text-xl ${selected.color}`}>{selected.verb}</span>
            <span className="text-text-muted text-sm ml-2">— {selected.tr}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 divide-y divide-navy-border/40 sm:divide-y-0">
            {subjects.map((sub, i) => (
              <motion.div key={sub}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className="flex items-center justify-between px-4 py-3 border-b border-navy-border/30 hover:bg-navy/20 transition-colors">
                <span className="text-text-muted text-xs">{sub}</span>
                <span className={`font-black text-sm ${selected.color}`}>{selected.conj[i]}</span>
              </motion.div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-navy-border bg-navy/30 flex items-center gap-2">
            <Speak text={selected.ex} />
            <div>
              <span className="text-text-secondary text-xs">{selected.ex}</span>
              <span className="text-text-muted text-xs ml-2">— {selected.exTr}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full conjugation overview table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-navy-border">
          <div className="text-text-primary font-bold text-sm">Tam Çekim Tablosu</div>
          <div className="text-text-muted text-xs mt-0.5">Tüm modal fiiller — ich/du/er formu</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left p-3 text-text-muted font-semibold w-20">Özne</th>
                {modals.map(m => (
                  <th key={m.verb} className={`p-3 text-center font-black ${m.color}`}>{m.verb}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, si) => (
                <tr key={sub} className="border-b border-navy-border/30 last:border-0 hover:bg-navy/20 transition-colors">
                  <td className="p-3 text-text-muted font-semibold">{sub}</td>
                  {modals.map(m => (
                    <td key={m.verb} className="p-3 text-center">
                      <span className={`font-bold ${m.color}`}>{m.conj[si]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Meanings */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div role="button" tabIndex={0} onClick={() => setShowMeanings(!showMeanings)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setShowMeanings(!showMeanings); }}
          className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-navy/20 transition-colors">
          <div>
            <div className="text-text-primary font-bold text-sm">Anlam Nüansları</div>
            <div className="text-text-muted text-xs mt-0.5">Her modal fiilin farklı kullanım alanları</div>
          </div>
          <motion.div animate={{ rotate: showMeanings ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {showMeanings && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="px-4 pb-4 border-t border-navy-border pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {meanings.map(m => {
                  const modal = modals.find(x => x.verb === m.modal)!;
                  return (
                    <div key={m.modal} className={`rounded-lg border ${modal.border} ${modal.bg} p-3`}>
                      <div className={`font-black text-sm ${modal.color} mb-2`}>{m.modal}</div>
                      <div className="space-y-1">
                        {m.uses.map((use, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className={`text-[10px] font-black ${modal.color} mt-0.5 shrink-0`}>▸</span>
                            <span className="text-text-secondary text-[11px] leading-snug">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tip */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.4 }}
        className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-amber-400 text-xs leading-relaxed">
          <strong>Sınav tuzağı:</strong> <code className="bg-navy px-1 rounded">dürfen nicht</code> = yasak (can't), <code className="bg-navy px-1 rounded">nicht müssen</code> = zorunda değil (don't have to). Bu ikisi karıştırılır!<br />
          <span className="mt-1 block text-text-muted">Du <strong className="text-red-400">darfst nicht</strong> kommen ≠ Du <strong className="text-amber-400">musst nicht</strong> kommen</span>
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
      <GrammarTracker topicId="modalverben-a1" level="A1" />
    </div>
  );
}
