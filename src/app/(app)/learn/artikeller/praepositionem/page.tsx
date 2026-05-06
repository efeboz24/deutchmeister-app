"use client";

import { useState } from "react";
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

// Contraction map
const contractions = [
  {
    group: "Dativ Kısaltmaları",
    color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/40",
    items: [
      { full: "an + dem", short: "am", ex: "am Montag, am Morgen", tr: "pazartesi, sabah" },
      { full: "bei + dem", short: "beim", ex: "beim Arzt, beim Essen", tr: "doktorda, yemekte" },
      { full: "in + dem", short: "im", ex: "im Park, im Winter", tr: "parkta, kışın" },
      { full: "von + dem", short: "vom", ex: "vom Bahnhof, vom Arzt", tr: "istasyondan" },
      { full: "zu + dem", short: "zum", ex: "zum Bahnhof, zum Arzt", tr: "istasyona" },
      { full: "zu + der", short: "zur", ex: "zur Schule, zur Arbeit", tr: "okula, işe" },
    ],
  },
  {
    group: "Akkusativ Kısaltmaları",
    color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/40",
    items: [
      { full: "an + das", short: "ans", ex: "ans Meer, ans Telefon", tr: "denize, telefona" },
      { full: "auf + das", short: "aufs", ex: "aufs Land, aufs Dach", tr: "kıra, çatıya" },
      { full: "durch + das", short: "durchs", ex: "durchs Fenster", tr: "pencereden" },
      { full: "für + das", short: "fürs", ex: "fürs Wochenende", tr: "hafta sonu için" },
      { full: "in + das", short: "ins", ex: "ins Kino, ins Bett", tr: "sinemaya, yatağa" },
      { full: "um + das", short: "ums", ex: "ums Haus", tr: "evin etrafında" },
    ],
  },
];

// Direction vs Location
const dirLoc = [
  {
    type: "Richtung (Yön)", q: "Wohin? (Nereye?)", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30",
    pairs: [
      { prep: "in + Akkusativ", short: "ins / in die / in den", ex: "Ich gehe ins Kino.", tr: "Sinemaya gidiyorum." },
      { prep: "auf + Akkusativ", short: "aufs / auf die / auf den", ex: "Er geht auf den Berg.", tr: "Dağa çıkıyor." },
      { prep: "an + Akkusativ", short: "ans / an die / an den", ex: "Sie geht an den See.", tr: "Göle gidiyor." },
    ],
  },
  {
    type: "Ort (Yer)", q: "Wo? (Nerede?)", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30",
    pairs: [
      { prep: "in + Dativ", short: "im / in der / in dem", ex: "Ich bin im Kino.", tr: "Sinemadayım." },
      { prep: "auf + Dativ", short: "auf dem", ex: "Er ist auf dem Berg.", tr: "Dağda." },
      { prep: "an + Dativ", short: "am / an der / an dem", ex: "Sie ist am See.", tr: "Gölde." },
    ],
  },
];

// Always Dativ prepositions
const alwaysDativ = ["mit", "nach", "bei", "seit", "von", "zu", "aus", "gegenüber"];
const alwaysAkkusativ = ["durch", "für", "gegen", "ohne", "um"];
const alwaysGenitiv = ["wegen", "trotz", "während", "statt", "innerhalb", "außerhalb"];

const questions = [
  { q: "Ich gehe ___ Kino. (ins / im)", answer: "ins Kino", options: ["ins Kino", "im Kino", "in die Kino", "in das Kino"], tip: "gehen = hareket → Akkusativ → in + das = ins" },
  { q: "Er ist ___ Arzt. (bei)", answer: "beim Arzt", options: ["beim Arzt", "bei dem Arzt", "bei den Arzt", "bei Arzt"], tip: "bei + dem = beim (zorunlu kısaltma)" },
  { q: "Wir fahren ___ Schule. (zur / zum)", answer: "zur Schule", options: ["zur Schule", "zum Schule", "zu der Schule", "zu Schule"], tip: "Schule = die Schule (feminin) → zu + der = zur" },
  { q: "Das Buch liegt ___ Tisch.", answer: "auf dem Tisch", options: ["auf dem Tisch", "auf den Tisch", "auf das Tisch", "auf Tisch"], tip: "liegen = yer belirtir → Dativ → auf + dem" },
  { q: "Sie legt das Buch ___ Tisch.", answer: "auf den Tisch", options: ["auf dem Tisch", "auf den Tisch", "auf das Tisch", "aufs Tisch"], tip: "legen = hareket ettirme → Akkusativ → auf + den" },
  { q: "Er kommt ___ Bahnhof.", answer: "vom Bahnhof", options: ["vom Bahnhof", "von dem Bahnhof", "von Bahnhof", "beim Bahnhof"], tip: "von + dem = vom (zorunlu kısaltma)" },
  { q: "Wir gehen ___ Park.", answer: "in den Park", options: ["im Park", "in den Park", "ins Park", "in dem Park"], tip: "gehen = hareket → Akkusativ → Park = der Park → in + den" },
  { q: "Er wohnt ___ Bahnhof.", answer: "am Bahnhof", options: ["am Bahnhof", "an dem Bahnhof", "ans Bahnhof", "beim Bahnhof"], tip: "wohnen = yer belirtir → Dativ → an + dem = am" },
  { q: "Wegen ___ Regens bleiben wir.", answer: "des Regens", options: ["den Regen", "dem Regen", "des Regens", "der Regen"], tip: "wegen → Genitiv → Regen = der Regen → des Regens" },
  { q: "Sie fährt ___ Meer.", answer: "ans Meer", options: ["am Meer", "ans Meer", "an dem Meer", "in das Meer"], tip: "fahren = hareket → Akkusativ → an + das = ans" },
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
        {sel && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`p-3 rounded-xl text-xs border ${sel === q.answer ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-amber-500/10 border-amber-500/30 text-amber-400"}`}>
          💡 {q.tip}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default function PraepositionemPage() {
  const [practiceOpen, setPracticeOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 70% 30%, #f59e0b15 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, #8b5cf620 0%, transparent 60%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A2 – B1
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/30">Çok Çıkar!</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2 flex items-center gap-2">
            <Zap className="w-6 h-6 text-gold" />
            Artikel + Präpositionen
          </h1>
          <p className="text-text-secondary text-sm max-w-xl">
            <strong className="text-amber-400">zum, zur, im, ins, am, ans, beim, vom</strong> — edatlarla artikel birleşince ortaya çıkan zorunlu kısaltmalar ve yön-yer kuralları.
          </p>
        </div>
      </motion.div>

      {/* Contractions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
        <h2 className="text-sm font-bold text-text-primary mb-3">Zorunlu Kısaltmalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contractions.map(group => (
            <div key={group.group} className={`rounded-xl border ${group.border} overflow-hidden`}>
              <div className={`${group.bg} px-4 py-2.5`}>
                <span className={`font-bold text-sm ${group.color}`}>{group.group}</span>
              </div>
              <div className="bg-navy-card divide-y divide-navy-border/40">
                {group.items.map(item => (
                  <div key={item.short} className="flex items-center gap-3 px-3 py-2.5 hover:bg-navy/30 transition-colors">
                    <div className="flex items-center gap-1.5 min-w-[5rem]">
                      <span className="text-text-muted text-xs">{item.full}</span>
                    </div>
                    <span className="text-text-muted text-xs">=</span>
                    <span className={`font-black text-sm ${group.color} min-w-[3rem]`}>{item.short}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Speak text={item.ex.split(",")[0].trim()} />
                        <span className="text-text-secondary text-[11px] truncate">{item.ex}</span>
                      </div>
                      <div className="text-text-muted text-[10px] pl-7">{item.tr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Direction vs Location */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}>
        <h2 className="text-sm font-bold text-text-primary mb-1">Yön (Wohin?) vs. Yer (Wo?)</h2>
        <p className="text-text-muted text-xs mb-3">Aynı edat, farklı hal — en çok karıştırılan konu!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dirLoc.map(group => (
            <div key={group.type} className={`rounded-xl border ${group.border} overflow-hidden`}>
              <div className={`${group.bg} px-4 py-3`}>
                <div className={`font-bold text-sm ${group.color}`}>{group.type}</div>
                <div className="text-text-muted text-xs mt-0.5">{group.q}</div>
              </div>
              <div className="p-3 space-y-2 bg-navy-card">
                {group.pairs.map(pair => (
                  <div key={pair.prep} className="p-2.5 rounded-lg bg-navy/60">
                    <div className="flex items-center gap-2 mb-1">
                      <Speak text={pair.ex} />
                      <span className={`font-bold text-xs ${group.color}`}>{pair.short}</span>
                    </div>
                    <div className="text-text-primary text-xs pl-8">{pair.ex}</div>
                    <div className="text-text-muted text-[10px] pl-8">{pair.tr}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span className="text-amber-400 text-xs">
            <strong>Kural:</strong> "Ich gehe <em>ins</em> Kino" (hareket → Akk) vs "Ich bin <em>im</em> Kino" (yer → Dat)
          </span>
        </div>
      </motion.div>

      {/* Fixed case prepositions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { title: "HEP Dativ", items: alwaysDativ, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
          { title: "HEP Akkusativ", items: alwaysAkkusativ, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
          { title: "HEP Genitiv", items: alwaysGenitiv, color: "text-gold", bg: "bg-gold/10", border: "border-gold/30" },
        ].map(group => (
          <div key={group.title} className={`rounded-xl border ${group.border} p-3`}>
            <div className={`font-black text-sm ${group.color} mb-2`}>{group.title}</div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map(item => (
                <span key={item} className={`px-2 py-0.5 rounded-full ${group.bg} ${group.color} text-[11px] font-semibold`}>{item}</span>
              ))}
            </div>
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
