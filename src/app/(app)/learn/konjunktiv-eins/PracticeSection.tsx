"use client";

import { useState, useCallback, useEffect } from "react";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Dumbbell, ChevronDown } from "lucide-react";

export function speakDE(text: string) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

export function SpeakBtn({ text }: { text: string }) {
  return (
    <button onClick={() => speakDE(text)}
      className="w-6 h-6 rounded-full bg-gold/10 hover:bg-gold/25 flex items-center justify-center transition-colors shrink-0"
      title="Dinle">
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gold">
        <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
        <path d="M15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899zM13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
      </svg>
    </button>
  );
}

/* ── MCQ questions ─────────────────────────────────────────── */
const mcqQuestions = [
  { q: "Er sagte, er ___ müde. (sein → Konj. I)", audio: "Er sagte, er sei müde.", answer: "sei", options: ["ist", "sei", "war", "wäre"] },
  { q: "Sie berichtete, sie ___ das Buch gelesen. (haben → Konj. I)", audio: "Sie berichtete, sie habe das Buch gelesen.", answer: "habe", options: ["hat", "habe", "hätte", "hatte"] },
  { q: "Er sagte, er ___ morgen kommen. (werden → Konj. I)", audio: "Er sagte, er werde morgen kommen.", answer: "werde", options: ["wird", "werde", "würde", "wurde"] },
  { q: "Die Zeitung schrieb, das Wetter ___ gut. (sein → Konj. I)", audio: "Die Zeitung schrieb, das Wetter sei gut.", answer: "sei", options: ["ist", "sei", "war", "wäre"] },
  { q: "Er erklärte, er ___ kein Geld. (haben → Konj. I)", audio: "Er erklärte, er habe kein Geld.", answer: "habe", options: ["hat", "habe", "hatte", "hätte"] },
  { q: "Sie sagte, sie ___ nach Hause gehen. (gehen → Konj. I)", audio: "Sie sagte, sie gehe nach Hause.", answer: "gehe", options: ["geht", "gehe", "ging", "ginge"] },
  { q: "Der Arzt sagte, der Patient ___ sich erholen. (sich erholen → Konj. I, er)", audio: "Der Arzt sagte, der Patient erhole sich.", answer: "erhole", options: ["erholt", "erhole", "erholte", "erhielte"] },
  { q: "Er berichtete, die Schüler ___ fleißig. (sein → Konj. I, sie-Pl.)", audio: "Er berichtete, die Schüler seien fleißig.", answer: "seien", options: ["sind", "seien", "wären", "waren"] },
  { q: "Sie erklärte, sie ___ die Aufgabe verstanden. (haben → Konj. I)", audio: "Sie erklärte, sie habe die Aufgabe verstanden.", answer: "habe", options: ["hat", "habe", "hätte", "hatte"] },
  { q: "Der Bericht sagt, die Preise ___ gestiegen. (sein → Konj. I)", audio: "Der Bericht sagt, die Preise seien gestiegen.", answer: "seien", options: ["sind", "seien", "wären", "waren"] },
  { q: "Er sagte, er ___ das nicht gewusst. (haben → Konj. I)", audio: "Er sagte, er habe das nicht gewusst.", answer: "habe", options: ["hat", "habe", "hatte", "hätte"] },
  { q: "Sie berichtete, die Firma ___ erfolgreich. (sein → Konj. I)", audio: "Sie berichtete, die Firma sei erfolgreich.", answer: "sei", options: ["ist", "sei", "wäre", "war"] },
  { q: "Er erklärte, er ___ bald zurückkommen. (werden → Konj. I)", audio: "Er erklärte, er werde bald zurückkommen.", answer: "werde", options: ["wird", "werde", "würde", "wurde"] },
  { q: "Der Zeuge sagte, er ___ nichts gesehen. (haben → Konj. I)", audio: "Der Zeuge sagte, er habe nichts gesehen.", answer: "habe", options: ["hat", "habe", "hätte", "hatte"] },
  { q: "Die Lehrerin sagte, die Klasse ___ ruhig. (sein → Konj. I)", audio: "Die Lehrerin sagte, die Klasse sei ruhig.", answer: "sei", options: ["ist", "sei", "war", "wäre"] },
  { q: "Er schrieb, er ___ in Berlin. (sein → Konj. I)", audio: "Er schrieb, er sei in Berlin.", answer: "sei", options: ["ist", "sei", "wäre", "war"] },
  { q: "Sie sagte, sie ___ krank. (sein → Konj. I)", audio: "Sie sagte, sie sei krank.", answer: "sei", options: ["ist", "sei", "war", "wäre"] },
  { q: "Er berichtete, er ___ das Problem gelöst. (haben → Konj. I)", audio: "Er berichtete, er habe das Problem gelöst.", answer: "habe", options: ["hat", "habe", "hatte", "hätte"] },
  { q: "Die Nachricht lautet, der Zug ___ Verspätung. (haben → Konj. I)", audio: "Die Nachricht lautet, der Zug habe Verspätung.", answer: "habe", options: ["hat", "habe", "hatte", "hätte"] },
  { q: "Er sagte, die Wir ___ zusammenarbeiten. (werden → Konj. I)", audio: "Er sagte, wir werden zusammenarbeiten.", answer: "werden", options: ["werden", "würden", "werde", "wurden"] },
];

/* ── Schreiben questions ───────────────────────────────────── */
const schreibenQuestions = [
  { sentence: "Er sagte, er _____ müde. (sein → Konj. I)", answer: "sei", hint: "sein → er sei", audio: "Er sagte, er sei müde." },
  { sentence: "Sie berichtete, sie _____ das Buch. (haben → Konj. I)", answer: "habe", hint: "haben → sie habe", audio: "Sie berichtete, sie habe das Buch." },
  { sentence: "Der Bericht sagt, er _____ erfolgreich. (sein → Konj. I)", answer: "sei", hint: "sein → er sei", audio: "Der Bericht sagt, er sei erfolgreich." },
  { sentence: "Er erklärte, er _____ bald kommen. (werden → Konj. I)", answer: "werde", hint: "werden → er werde", audio: "Er erklärte, er werde bald kommen." },
  { sentence: "Die Zeitung schrieb, die Preise _____ gestiegen. (sein → Pl.)", answer: "seien", hint: "sein → sie seien", audio: "Die Zeitung schrieb, die Preise seien gestiegen." },
  { sentence: "Er sagte, er _____ kein Geld. (haben → Konj. I)", answer: "habe", hint: "haben → er habe", audio: "Er sagte, er habe kein Geld." },
  { sentence: "Sie erklärte, die Schüler _____ fleißig. (sein → Pl.)", answer: "seien", hint: "sein → sie seien", audio: "Sie erklärte, die Schüler seien fleißig." },
  { sentence: "Er berichtete, er _____ nach Hause gegangen. (sein → Konj. I)", answer: "sei", hint: "sein → er sei ... gegangen", audio: "Er berichtete, er sei nach Hause gegangen." },
  { sentence: "Der Zeuge sagte, er _____ alles gesehen. (haben → Konj. I)", answer: "habe", hint: "haben → er habe", audio: "Der Zeuge sagte, er habe alles gesehen." },
  { sentence: "Die Lehrerin sagte, die Klasse _____ ruhig. (sein → Konj. I)", answer: "sei", hint: "sein → sie sei", audio: "Die Lehrerin sagte, die Klasse sei ruhig." },
  { sentence: "Er schrieb, der Zug _____ Verspätung. (haben → Konj. I)", answer: "habe", hint: "haben → er habe", audio: "Er schrieb, der Zug habe Verspätung." },
  { sentence: "Sie berichtete, das Kind _____ krank. (sein → Konj. I)", answer: "sei", hint: "sein → es sei", audio: "Sie berichtete, das Kind sei krank." },
  { sentence: "Er sagte, er _____ das Problem gelöst. (haben → Konj. I)", answer: "habe", hint: "haben → er habe", audio: "Er sagte, er habe das Problem gelöst." },
  { sentence: "Die Nachricht lautet, die Firma _____ bankrott. (sein → Konj. I)", answer: "sei", hint: "sein → sie sei", audio: "Die Nachricht lautet, die Firma sei bankrott." },
  { sentence: "Er erklärte, sie _____ zusammenarbeiten. (werden → Pl.)", answer: "werden", hint: "werden → sie werden", audio: "Er erklärte, sie werden zusammenarbeiten." },
  { sentence: "Der Arzt sagte, der Patient _____ sich erholen. (werden → Konj. I)", answer: "werde", hint: "werden → er werde", audio: "Der Arzt sagte, der Patient werde sich erholen." },
  { sentence: "Sie schrieb, das Projekt _____ abgeschlossen. (sein → Konj. I)", answer: "sei", hint: "sein → es sei", audio: "Sie schrieb, das Projekt sei abgeschlossen." },
  { sentence: "Er berichtete, er _____ die Lösung gefunden. (haben → Konj. I)", answer: "habe", hint: "haben → er habe", audio: "Er berichtete, er habe die Lösung gefunden." },
  { sentence: "Die Politikerin sagte, die Lage _____ ernst. (sein → Konj. I)", answer: "sei", hint: "sein → sie sei", audio: "Die Politikerin sagte, die Lage sei ernst." },
  { sentence: "Er schrieb, er _____ glücklich. (sein → Konj. I)", answer: "sei", hint: "sein → er sei", audio: "Er schrieb, er sei glücklich." },
];

/* ── Lesen questions ───────────────────────────────────────── */
const lesenQuestions = [
  {
    text: "In der Zeitung stand: Der Minister habe erklärt, die Wirtschaft sei im Aufschwung. Er werde neue Maßnahmen einführen.",
    question: "Warum wird 'habe' und 'sei' verwendet?",
    answer: "Indirekte Rede (Konjunktiv I)",
    options: ["Vergangenheit (Präteritum)", "Indirekte Rede (Konjunktiv I)", "Wunsch (Konjunktiv II)", "Zukunft (Futur)"],
  },
  {
    text: "Der Arzt berichtete: Der Patient sei vollständig genesen. Er habe keine Beschwerden mehr. Er werde nächste Woche entlassen.",
    question: "'Sei', 'habe' und 'werde' sind Formen von…",
    answer: "Konjunktiv I (indirekte Rede)",
    options: ["Konjunktiv II", "Konjunktiv I (indirekte Rede)", "Imperativ", "Präteritum"],
  },
  {
    text: "Der Zeuge sagte aus, er habe den Täter nicht gesehen. Er sei zum Zeitpunkt der Tat zu Hause gewesen.",
    question: "In welchem Kontext wird hier Konjunktiv I verwendet?",
    answer: "Gerichtliche Aussage / indirekte Rede",
    options: ["Freundlicher Wunsch", "Gerichtliche Aussage / indirekte Rede", "Befehl", "Frage"],
  },
  {
    text: "Laut Pressemitteilung: Das Unternehmen habe einen neuen Rekord erzielt. Die Aktionäre seien zufrieden.",
    question: "Wozu dient der Konjunktiv I im journalistischen Text?",
    answer: "Um Distanz zum Gesagten auszudrücken (neutrale Berichterstattung)",
    options: ["Um Höflichkeit auszudrücken", "Um Distanz zum Gesagten auszudrücken (neutrale Berichterstattung)", "Um Unsicherheit auszudrücken", "Um Befehle zu geben"],
  },
  {
    text: "Er sagte: 'Ich bin müde.' → Er sagte, er sei müde. / Er sagte: 'Ich habe das Buch.' → Er sagte, er habe das Buch.",
    question: "Was ändert sich bei der Umwandlung in indirekte Rede?",
    answer: "Das Verb wechselt zu Konjunktiv I",
    options: ["Das Verb wechselt zu Konjunktiv I", "Das Subjekt ändert sich", "Es entsteht eine Frage", "Die Zeitform bleibt gleich"],
  },
  {
    text: "Der Sprecher betonte, die Konferenz sei erfolgreich verlaufen. Alle Teilnehmer hätten konstruktiv zusammengearbeitet.",
    question: "Welche Form passt für 'alle Teilnehmer' (haben → Konj. I)?",
    answer: "hätten",
    options: ["haben", "hatten", "hätten", "habe"],
  },
  {
    text: "In wissenschaftlichen Texten: Es sei darauf hingewiesen, dass… / Es sei bemerkt, dass…",
    question: "Welche besondere Funktion hat 'es sei' hier?",
    answer: "Formelle Einleitung / wissenschaftlicher Stil",
    options: ["Direkter Befehl", "Formelle Einleitung / wissenschaftlicher Stil", "Gesprochene Sprache", "Frage stellen"],
  },
  {
    text: "Er sagte, er gehe jeden Tag ins Büro. (gehen → Konj. I, er)",
    question: "Welche Konjunktiv I Form ist korrekt für 'gehen, er'?",
    answer: "gehe",
    options: ["geht", "ging", "gehe", "ginge"],
  },
  {
    text: "Die Behörde teilte mit, die neue Regelung trete nächsten Monat in Kraft. (treten → Konj. I, sie)",
    question: "Welche Form ist hier verwendet?",
    answer: "trete (Konjunktiv I von treten)",
    options: ["tritt (Präsens)", "trat (Präteritum)", "trete (Konjunktiv I von treten)", "träte (Konjunktiv II)"],
  },
  {
    text: "Konjunktiv I vs II: 'Er sei hier.' (Konj. I) vs 'Er wäre hier.' (Konj. II). Der Unterschied: Konj. I = Bericht, Konj. II = Hypothese.",
    question: "Wann benutzt man Konjunktiv II statt Konjunktiv I?",
    answer: "Wenn Konj. I und Präsens identisch sind (z.B. bei 'wir')",
    options: ["Immer in indirekter Rede", "Wenn Konj. I und Präsens identisch sind (z.B. bei 'wir')", "Nur in der Vergangenheit", "Nur in formellen Texten"],
  },
];

/* ── shared components ─────────────────────────────────────── */
type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";
function ResultScreen({ score, total, onRestart, skill, xpEarned }: { score: number; total: number; onRestart: () => void; skill: Skill; xpEarned: number }) {
  const { update } = useSession();
  const pct = Math.round((score / total) * 100);
  useEffect(() => { saveProgress({ xp: xpEarned, skill, skillScore: pct, minutes: 10 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }); }, []);
  const badge = pct === 100 ? "🏆 Mükemmel!" : pct >= 80 ? "🌟 Harika!" : pct >= 60 ? "👍 İyi!" : "💪 Tekrar Dene!";
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <div className="text-6xl mb-4">{pct === 100 ? "🏆" : pct >= 80 ? "🌟" : pct >= 60 ? "👍" : "💪"}</div>
      <p className="text-3xl font-extrabold text-text-primary mb-2">{score}/{total}</p>
      <p className="text-lg text-gold font-semibold mb-1">{pct}%</p>
      <p className="text-text-secondary mb-6">{badge}</p>
      <div className="w-full max-w-xs mx-auto bg-navy-border rounded-full h-3 mb-6">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-3 rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-gold" : "bg-red-500"}`} />
      </div>
      <button onClick={onRestart}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors">
        <RotateCcw className="w-4 h-4" /> Tekrar Dene
      </button>
    </motion.div>
  );
}

/* ── MCQ Exercise ──────────────────────────────────────────── */
function MCQExercise() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = mcqQuestions[current];
  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= mcqQuestions.length) setDone(true);
      else { setCurrent((c) => c + 1); setSelected(null); }
    }, 900);
  }
  function restart() { setCurrent(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <ResultScreen score={score} total={mcqQuestions.length} onRestart={restart} skill="grammatik" xpEarned={Math.max(10, score * 5)} />;

  return (
    <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-muted">{current + 1}/{mcqQuestions.length}</span>
        <span className="text-xs text-gold font-semibold">{score} puan</span>
      </div>
      <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(current / mcqQuestions.length) * 100}%` }} />
      </div>
      <div className="flex items-start gap-2 mb-5">
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
              whileHover={!selected ? { scale: 1.03 } : {}} whileTap={!selected ? { scale: 0.97 } : {}}
              className={`py-3 px-4 border rounded-xl font-bold text-sm transition-all duration-200 ${style}`}>
              {opt}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Schreiben Exercise ────────────────────────────────────── */
function SchreibenExercise() {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const q = schreibenQuestions[current];
  const parts = q.sentence.split("_____");
  const correct = input.trim().toLowerCase() === q.answer.toLowerCase();

  function check() { if (!input.trim()) return; setChecked(true); if (correct) setScore((s) => s + 1); }
  function next() {
    if (current + 1 >= schreibenQuestions.length) setDone(true);
    else { setCurrent((c) => c + 1); setInput(""); setChecked(false); setShowHint(false); }
  }
  function restart() { setCurrent(0); setInput(""); setChecked(false); setScore(0); setDone(false); setShowHint(false); }

  if (done) return <ResultScreen score={score} total={schreibenQuestions.length} onRestart={restart} skill="schreiben" xpEarned={Math.max(10, score * 8)} />;

  return (
    <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-muted">{current + 1}/{schreibenQuestions.length}</span>
        <span className="text-xs text-gold font-semibold">{score} puan</span>
      </div>
      <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(current / schreibenQuestions.length) * 100}%` }} />
      </div>
      <div className="flex items-center gap-2 mb-1">
        <SpeakBtn text={q.audio} />
        <p className="text-text-primary font-semibold text-sm">{parts[0]}
          <span className={`inline-block border-b-2 min-w-[60px] px-1 mx-1 text-center font-bold ${
            checked ? correct ? "border-green-500 text-green-400" : "border-red-500 text-red-400" : "border-gold text-gold"}`}>
            {checked ? (correct ? input : input || "_") : input || " "}
          </span>
          {parts[1]}
        </p>
      </div>
      {checked && !correct && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-400 mt-1">
          ✓ Doğru cevap: <strong>{q.answer}</strong>
        </motion.p>
      )}
      {!checked && (
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Konjunktiv I formunu yaz…"
          className="w-full mt-4 px-4 py-2.5 bg-navy border border-navy-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-gold/50 placeholder:text-text-muted" />
      )}
      <div className="flex items-center gap-3 mt-4">
        {!checked ? (
          <>
            <button onClick={check} disabled={!input.trim()}
              className="px-5 py-2 bg-gold/20 text-gold border border-gold/30 rounded-xl text-sm font-semibold hover:bg-gold/30 transition-colors disabled:opacity-40">
              Kontrol Et
            </button>
            <button onClick={() => setShowHint((h) => !h)}
              className="px-4 py-2 text-xs text-text-muted border border-navy-border rounded-xl hover:text-text-secondary transition-colors">
              İpucu {showHint ? "▲" : "▼"}
            </button>
          </>
        ) : (
          <button onClick={next} className="px-5 py-2 bg-gold/20 text-gold border border-gold/30 rounded-xl text-sm font-semibold hover:bg-gold/30 transition-colors">
            {current + 1 < schreibenQuestions.length ? "Sonraki →" : "Sonuç"}
          </button>
        )}
        {showHint && !checked && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-amber-400">{q.hint}</motion.span>
        )}
      </div>
    </motion.div>
  );
}

/* ── Lesen Exercise ────────────────────────────────────────── */
function LesenExercise() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = lesenQuestions[current];
  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= lesenQuestions.length) setDone(true);
      else { setCurrent((c) => c + 1); setSelected(null); }
    }, 1100);
  }
  function restart() { setCurrent(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <ResultScreen score={score} total={lesenQuestions.length} onRestart={restart} skill="lesen" xpEarned={Math.max(10, score * 6)} />;

  return (
    <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-muted">{current + 1}/{lesenQuestions.length}</span>
        <span className="text-xs text-gold font-semibold">{score} puan</span>
      </div>
      <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(current / lesenQuestions.length) * 100}%` }} />
      </div>
      <div className="bg-navy/60 border border-navy-border rounded-xl p-4 mb-4">
        <p className="text-text-secondary text-sm leading-relaxed italic">{q.text}</p>
      </div>
      <p className="text-text-primary font-semibold text-sm mb-4">{q.question}</p>
      <div className="space-y-2">
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
              whileHover={!selected ? { scale: 1.01 } : {}}
              className={`w-full py-3 px-4 border rounded-xl text-sm text-left transition-all duration-200 ${style}`}>
              {opt}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── PracticeSection ───────────────────────────────────────── */
export function PracticeSection() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"mcq" | "schreiben" | "lesen">("mcq");

  const tabs = [
    { id: "mcq" as const,       label: "Şıklı",    count: 20, color: "text-blue-400",   activeBg: "bg-blue-500/20 border-blue-500/40" },
    { id: "schreiben" as const, label: "Schreiben",count: 20, color: "text-purple-400", activeBg: "bg-purple-500/20 border-purple-500/40" },
    { id: "lesen" as const,     label: "Lesen",    count: 10, color: "text-emerald-400",activeBg: "bg-emerald-500/20 border-emerald-500/40" },
  ];

  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-6 hover:bg-navy/30 transition-colors">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${open ? "bg-gold/20" : "bg-navy"}`}>
            <Dumbbell className={`w-5 h-5 ${open ? "text-gold" : "text-text-muted"}`} />
          </div>
          <div className="text-left">
            <p className="font-bold text-text-primary">Alıştırmalar</p>
            <p className="text-xs text-text-muted">50 soru · Şıklı, Schreiben, Lesen</p>
          </div>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {!open && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 pb-6 pt-0">
            <div className="border-2 border-dashed border-navy-border rounded-xl py-8 text-center">
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Dumbbell className="w-10 h-10 text-text-muted mx-auto mb-3" />
              </motion.div>
              <p className="text-text-secondary font-medium mb-1">Alıştırmalara Başla</p>
              <p className="text-text-muted text-xs">50 soruluk kapsamlı pratik seti</p>
              <button onClick={() => setOpen(true)}
                className="mt-4 px-5 py-2 bg-gold/15 text-gold border border-gold/25 rounded-xl text-sm font-semibold hover:bg-gold/25 transition-colors">
                Başla →
              </button>
            </div>
          </motion.div>
        )}

        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-navy-border pt-5">
              <div className="flex gap-2 mb-6 flex-wrap">
                {tabs.map((t) => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                      tab === t.id ? t.activeBg + " " + t.color : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
                    {t.label} <span className="text-[10px] opacity-70">({t.count})</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {tab === "mcq" && <MCQExercise />}
                  {tab === "schreiben" && <SchreibenExercise />}
                  {tab === "lesen" && <LesenExercise />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
