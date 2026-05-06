"use client";

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { saveProgress } from '@/lib/saveProgress';
import { GrammarTracker } from "@/components/learn/GrammarTracker";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle, RotateCcw, Lightbulb, GraduationCap, Volume2, Search } from "lucide-react";

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

type VerbPrep = { verb: string; prep: string; kasus: string; tr: string; ex: string; audio: string };

const verbPreps: VerbPrep[] = [
  // an + Akk
  { verb: "denken",       prep: "an + Akk",  kasus: "Akkusativ", tr: "düşünmek",          ex: "Ich denke an dich.",          audio: "Ich denke an dich." },
  { verb: "glauben",      prep: "an + Akk",  kasus: "Akkusativ", tr: "inanmak",            ex: "Sie glaubt an Gott.",          audio: "Sie glaubt an Gott." },
  { verb: "schreiben",    prep: "an + Akk",  kasus: "Akkusativ", tr: "yazmak (birine)",     ex: "Er schreibt an seinen Freund.",audio: "Er schreibt an seinen Freund." },
  // auf + Akk
  { verb: "warten",       prep: "auf + Akk", kasus: "Akkusativ", tr: "beklemek",            ex: "Ich warte auf den Bus.",        audio: "Ich warte auf den Bus." },
  { verb: "hoffen",       prep: "auf + Akk", kasus: "Akkusativ", tr: "ummak",               ex: "Er hofft auf Erfolg.",          audio: "Er hofft auf Erfolg." },
  { verb: "achten",       prep: "auf + Akk", kasus: "Akkusativ", tr: "dikkat etmek",        ex: "Bitte achte auf die Zeit.",     audio: "Bitte achte auf die Zeit." },
  { verb: "sich freuen",  prep: "auf + Akk", kasus: "Akkusativ", tr: "dört gözle beklemek", ex: "Ich freue mich auf den Urlaub.",audio: "Ich freue mich auf den Urlaub." },
  { verb: "antworten",    prep: "auf + Akk", kasus: "Akkusativ", tr: "cevap vermek",        ex: "Er antwortet auf die Frage.",   audio: "Er antwortet auf die Frage." },
  // über + Akk
  { verb: "sprechen",     prep: "über + Akk",kasus: "Akkusativ", tr: "hakkında konuşmak",   ex: "Wir sprechen über das Problem.",audio: "Wir sprechen über das Problem." },
  { verb: "nachdenken",   prep: "über + Akk",kasus: "Akkusativ", tr: "üzerine düşünmek",    ex: "Sie denkt über die Frage nach.",audio: "Sie denkt über die Frage nach." },
  { verb: "sich freuen",  prep: "über + Akk",kasus: "Akkusativ", tr: "sevinmek",             ex: "Er freut sich über das Geschenk.",audio: "Er freut sich über das Geschenk." },
  { verb: "sich ärgern",  prep: "über + Akk",kasus: "Akkusativ", tr: "sinirlenmek",          ex: "Ich ärgere mich über den Stau.",audio: "Ich ärgere mich über den Stau." },
  // für + Akk
  { verb: "danken",       prep: "für + Akk", kasus: "Akkusativ", tr: "teşekkür etmek",      ex: "Ich danke dir für deine Hilfe.",audio: "Ich danke dir für deine Hilfe." },
  { verb: "sich interessieren", prep: "für + Akk", kasus: "Akkusativ", tr: "ilgilenmek",   ex: "Er interessiert sich für Sport.",audio: "Er interessiert sich für Sport." },
  { verb: "sich entscheiden",   prep: "für + Akk", kasus: "Akkusativ", tr: "karar vermek (için)",ex: "Sie entscheidet sich für das Rote.",audio: "Sie entscheidet sich für das Rote." },
  // mit + Dat
  { verb: "sprechen",     prep: "mit + Dat", kasus: "Dativ",     tr: "biriyle konuşmak",    ex: "Ich spreche mit dem Arzt.",     audio: "Ich spreche mit dem Arzt." },
  { verb: "anfangen",     prep: "mit + Dat", kasus: "Dativ",     tr: "ile başlamak",         ex: "Er fängt mit dem Lernen an.",   audio: "Er fängt mit dem Lernen an." },
  { verb: "aufhören",     prep: "mit + Dat", kasus: "Dativ",     tr: "ile bırakmak",         ex: "Sie hört mit dem Rauchen auf.", audio: "Sie hört mit dem Rauchen auf." },
  // von + Dat
  { verb: "träumen",      prep: "von + Dat", kasus: "Dativ",     tr: "rüya görmek",          ex: "Ich träume von einer Reise.",   audio: "Ich träume von einer Reise." },
  { verb: "abhängen",     prep: "von + Dat", kasus: "Dativ",     tr: "bağlı olmak",          ex: "Es hängt vom Wetter ab.",       audio: "Es hängt vom Wetter ab." },
  { verb: "sprechen",     prep: "von + Dat", kasus: "Dativ",     tr: "hakkında bahsetmek",   ex: "Er spricht von seiner Arbeit.", audio: "Er spricht von seiner Arbeit." },
  // um + Akk
  { verb: "bitten",       prep: "um + Akk",  kasus: "Akkusativ", tr: "istemek/rica etmek",   ex: "Ich bitte dich um Hilfe.",      audio: "Ich bitte dich um Hilfe." },
  { verb: "sich kümmern", prep: "um + Akk",  kasus: "Akkusativ", tr: "ilgilenmek",            ex: "Sie kümmert sich um die Kinder.",audio: "Sie kümmert sich um die Kinder." },
];

const prepColors: Record<string, { text: string; bg: string; border: string }> = {
  "an + Akk":  { text: "text-blue-400",   bg: "bg-blue-500/15",   border: "border-blue-500/40" },
  "auf + Akk": { text: "text-amber-400",  bg: "bg-amber-500/15",  border: "border-amber-500/40" },
  "über + Akk":{ text: "text-violet-400", bg: "bg-violet-500/15", border: "border-violet-500/40" },
  "für + Akk": { text: "text-green-400",  bg: "bg-green-500/15",  border: "border-green-500/40" },
  "mit + Dat": { text: "text-pink-400",   bg: "bg-pink-500/15",   border: "border-pink-500/40" },
  "von + Dat": { text: "text-teal-400",   bg: "bg-teal-500/15",   border: "border-teal-500/40" },
  "um + Akk":  { text: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-500/40" },
};

const questions = [
  { q: "Ich warte ___ den Bus.", answer: "auf", options: ["an", "auf", "über", "für"], tip: "warten + auf + Akkusativ" },
  { q: "Er denkt ___ seine Familie.", answer: "an", options: ["auf", "an", "von", "mit"], tip: "denken + an + Akkusativ" },
  { q: "Wir sprechen ___ das Problem.", answer: "über", options: ["von", "über", "an", "auf"], tip: "sprechen über + Akkusativ (hakkında)" },
  { q: "Ich danke dir ___ deine Hilfe.", answer: "für", options: ["an", "über", "für", "von"], tip: "danken + für + Akkusativ" },
  { q: "Sie fängt ___ dem Sport an.", answer: "mit", options: ["an", "mit", "bei", "von"], tip: "anfangen + mit + Dativ" },
  { q: "Er träumt ___ einer Reise.", answer: "von", options: ["über", "von", "an", "für"], tip: "träumen + von + Dativ" },
  { q: "Ich bitte dich ___ Hilfe.", answer: "um", options: ["für", "um", "an", "bei"], tip: "bitten + um + Akkusativ" },
  { q: "Sie interessiert sich ___ Musik.", answer: "für", options: ["an", "über", "für", "mit"], tip: "sich interessieren + für + Akkusativ" },
  { q: "Er ärgert sich ___ den Lärm.", answer: "über", options: ["an", "auf", "über", "für"], tip: "sich ärgern + über + Akkusativ" },
  { q: "Es hängt ___ dem Wetter ab.", answer: "von", options: ["an", "von", "mit", "auf"], tip: "abhängen + von + Dativ" },
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

export default function VerbenPraepositionemPage() {
  const [search, setSearch] = useState("");
  const [activePrep, setActivePrep] = useState<string | null>(null);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const uniquePreps = [...new Set(verbPreps.map(v => v.prep))];

  const filtered = verbPreps.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = !q || v.verb.includes(q) || v.tr.includes(q) || v.prep.includes(q);
    const matchPrep = !activePrep || v.prep === activePrep;
    return matchSearch && matchPrep;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 60% 40%, #8b5cf615 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, #f59e0b10 0%, transparent 55%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> B1 – B2
            </span>
            <span className="px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-400 text-xs font-bold border border-violet-500/30">B1+ Zorunlu</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2">Verben + Präpositionen</h1>
          <p className="text-text-secondary text-sm max-w-xl">
            warten <strong className="text-amber-400">auf</strong>, denken <strong className="text-blue-400">an</strong>, sprechen <strong className="text-violet-400">über</strong>…
            Fiil+edat kombinasyonları ezber gerektirir — her birinin hangi hali (Akk/Dat) aldığını öğren.
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Fiil veya edat ara…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-navy border border-navy-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/50 transition-colors" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {uniquePreps.map(prep => {
            const pc = prepColors[prep] ?? { text: "text-gold", bg: "bg-gold/15", border: "border-gold/40" };
            return (
              <button key={prep} onClick={() => setActivePrep(activePrep === prep ? null : prep)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${activePrep === prep ? `${pc.bg} ${pc.border} ${pc.text}` : "bg-navy-card border-navy-border text-text-muted hover:border-navy-border/80"}`}>
                {prep}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Verb list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="divide-y divide-navy-border/30">
          <AnimatePresence>
            {filtered.map((v, i) => {
              const pc = prepColors[v.prep] ?? { text: "text-gold", bg: "bg-gold/15", border: "border-gold/40" };
              return (
                <motion.div key={`${v.verb}-${v.prep}`}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }} transition={{ delay: i * 0.02, duration: 0.2 }}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-navy/20 transition-colors">
                  <Speak text={v.audio} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-text-primary text-sm">{v.verb}</span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>{v.prep}</span>
                      <span className="text-text-muted text-xs">— {v.tr}</span>
                    </div>
                    <div className="text-text-secondary text-xs mt-0.5 italic">{v.ex}</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-text-muted text-sm">Sonuç bulunamadı</div>
          )}
        </div>
      </motion.div>

      {/* Tip */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
        className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-amber-400 text-xs leading-relaxed">
          <strong>Dikkat:</strong> Aynı fiil farklı edatla farklı anlam verebilir!<br />
          <span className="text-text-muted">sprechen <strong className="text-amber-400">über</strong> → hakkında konuşmak · sprechen <strong className="text-pink-400">mit</strong> → biriyle konuşmak</span>
          <br />
          <span className="text-text-muted">sich freuen <strong className="text-amber-400">auf</strong> → dört gözle beklemek · sich freuen <strong className="text-violet-400">über</strong> → sevincini yaşamak</span>
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
      <GrammarTracker topicId="verben-praepositionen" level="B1" />
    </div>
  );
}
