"use client";

import { useState, useEffect } from "react";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  ListChecks,
  BookOpen,
  ChevronRight,
  RotateCcw,
  Trophy,
  Volume2,
  CheckCircle2,
  XCircle,
  Dumbbell,
} from "lucide-react";

export function speakDE(text: string, e?: React.MouseEvent) {
  e?.stopPropagation();
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

export function SpeakBtn({ text, className = "" }: { text: string; className?: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={(e) => {
        setActive(true);
        speakDE(text, e);
        setTimeout(() => setActive(false), 1200);
      }}
      title="Almanca seslendir"
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200
        ${active ? "bg-gold/30 text-gold scale-110" : "bg-navy-border/50 text-text-muted hover:bg-gold/20 hover:text-gold"}
        ${className}`}
    >
      <Volume2 className="w-3.5 h-3.5" />
    </button>
  );
}

/* ── question data ──────────────────────────────────────────── */

type MCQ = { q: string; audio?: string; answer: string; options: string[]; tip: string };
type WriteQ = { sentence: string; audio: string; blank: string; answer: string; hint: string };
type ReadQ = { passage: string; passageAudio: string; question: string; answer: string; options: string[] };

const mcqQuestions: MCQ[] = [
  { q: "Ich sehe ___ Mann. (der)", audio: "Ich sehe den Mann.", answer: "den", options: ["der", "den", "dem", "des"], tip: "sehen → Akkusativ (wen?)" },
  { q: "Er hilft ___ Frau. (die)", audio: "Er hilft der Frau.", answer: "der", options: ["die", "den", "der", "des"], tip: "helfen → Dativ (wem?)" },
  { q: "Wir kaufen ___ Auto. (das)", audio: "Wir kaufen das Auto.", answer: "das", options: ["das", "dem", "den", "des"], tip: "kaufen → Akkusativ (was?)" },
  { q: "Sie dankt ___ Lehrer. (der)", audio: "Sie dankt dem Lehrer.", answer: "dem", options: ["der", "den", "dem", "die"], tip: "danken → Dativ (wem?)" },
  { q: "Ich liebe ___ Hund. (der)", audio: "Ich liebe den Hund.", answer: "den", options: ["der", "den", "dem", "die"], tip: "lieben → Akkusativ (wen?)" },
  { q: "Das Buch gehört ___ Kind. (das)", audio: "Das Buch gehört dem Kind.", answer: "dem", options: ["das", "dem", "den", "der"], tip: "gehören → Dativ (wem?)" },
  { q: "Er hört ___ Musik. (die)", audio: "Er hört die Musik.", answer: "die", options: ["die", "der", "dem", "des"], tip: "hören → Akkusativ (was?)" },
  { q: "Ich folge ___ Mann. (der)", audio: "Ich folge dem Mann.", answer: "dem", options: ["der", "den", "dem", "die"], tip: "folgen → Dativ (wem?)" },
  { q: "Sie liest ___ Buch. (das)", audio: "Sie liest das Buch.", answer: "das", options: ["das", "dem", "den", "die"], tip: "lesen → Akkusativ (was?)" },
  { q: "Er vertraut ___ Freund. (der)", audio: "Er vertraut dem Freund.", answer: "dem", options: ["der", "den", "dem", "die"], tip: "vertrauen → Dativ (wem?)" },
  { q: "Ich kenne ___ Frau. (die)", audio: "Ich kenne die Frau.", answer: "die", options: ["die", "der", "dem", "den"], tip: "kennen → Akkusativ (wen?)" },
  { q: "Wir glauben ___ Lehrer. (der)", audio: "Wir glauben dem Lehrer.", answer: "dem", options: ["der", "den", "dem", "die"], tip: "glauben → Dativ (wem?)" },
  { q: "Er trinkt ___ Kaffee. (der)", audio: "Er trinkt den Kaffee.", answer: "den", options: ["der", "den", "dem", "die"], tip: "trinken → Akkusativ (was?)" },
  { q: "Sie antwortet ___ Kind. (das)", audio: "Sie antwortet dem Kind.", answer: "dem", options: ["das", "dem", "den", "die"], tip: "antworten → Dativ (wem?)" },
  { q: "Ich brauche ___ Stift. (der)", audio: "Ich brauche den Stift.", answer: "den", options: ["der", "den", "dem", "die"], tip: "brauchen → Akkusativ (was?)" },
  { q: "Er begegnet ___ Frau. (die)", audio: "Er begegnet der Frau.", answer: "der", options: ["die", "der", "dem", "den"], tip: "begegnen → Dativ (wem?)" },
  { q: "Wir machen ___ Hausaufgaben. (die/pl)", audio: "Wir machen die Hausaufgaben.", answer: "die", options: ["die", "der", "dem", "den"], tip: "machen → Akkusativ (was?) — çoğul" },
  { q: "Ich zuhöre ___ Mann. (der)", audio: "Ich höre dem Mann zu.", answer: "dem", options: ["der", "den", "dem", "die"], tip: "zuhören → Dativ (wem?)" },
  { q: "Sie sieht ___ Kind. (das)", audio: "Sie sieht das Kind.", answer: "das", options: ["das", "dem", "den", "die"], tip: "sehen → Akkusativ (wen?)" },
  { q: "Das gefällt ___ Frau. (die)", audio: "Das gefällt der Frau.", answer: "der", options: ["die", "der", "dem", "den"], tip: "gefallen → Dativ (wem?)" },
];

const writeQuestions: WriteQ[] = [
  { sentence: "Ich sehe ___ Mann.", audio: "Ich sehe den Mann.", blank: "den", answer: "den", hint: "der → Akkusativ" },
  { sentence: "Er hilft ___ Frau.", audio: "Er hilft der Frau.", blank: "der", answer: "der", hint: "die → Dativ" },
  { sentence: "Wir kaufen ___ Auto.", audio: "Wir kaufen das Auto.", blank: "das", answer: "das", hint: "das → Akkusativ (değişmez)" },
  { sentence: "Sie dankt ___ Lehrer.", audio: "Sie dankt dem Lehrer.", blank: "dem", answer: "dem", hint: "der → Dativ" },
  { sentence: "Ich liebe ___ Hund.", audio: "Ich liebe den Hund.", blank: "den", answer: "den", hint: "der → Akkusativ" },
  { sentence: "Das Buch gehört ___ Kind.", audio: "Das Buch gehört dem Kind.", blank: "dem", answer: "dem", hint: "das → Dativ" },
  { sentence: "Er hört ___ Musik.", audio: "Er hört die Musik.", blank: "die", answer: "die", hint: "die → Akkusativ (değişmez)" },
  { sentence: "Ich folge ___ Mann.", audio: "Ich folge dem Mann.", blank: "dem", answer: "dem", hint: "der → Dativ" },
  { sentence: "Sie liest ___ Buch.", audio: "Sie liest das Buch.", blank: "das", answer: "das", hint: "das → Akkusativ (değişmez)" },
  { sentence: "Er trinkt ___ Kaffee.", audio: "Er trinkt den Kaffee.", blank: "den", answer: "den", hint: "der → Akkusativ" },
  { sentence: "Ich kenne ___ Frau.", audio: "Ich kenne die Frau.", blank: "die", answer: "die", hint: "die → Akkusativ (değişmez)" },
  { sentence: "Wir glauben ___ Lehrer.", audio: "Wir glauben dem Lehrer.", blank: "dem", answer: "dem", hint: "der → Dativ" },
  { sentence: "Sie antwortet ___ Kind.", audio: "Sie antwortet dem Kind.", blank: "dem", answer: "dem", hint: "das → Dativ" },
  { sentence: "Ich brauche ___ Stift.", audio: "Ich brauche den Stift.", blank: "den", answer: "den", hint: "der → Akkusativ" },
  { sentence: "Er begegnet ___ Frau.", audio: "Er begegnet der Frau.", blank: "der", answer: "der", hint: "die → Dativ" },
  { sentence: "Wir sehen ___ Kind.", audio: "Wir sehen das Kind.", blank: "das", answer: "das", hint: "das → Akkusativ (değişmez)" },
  { sentence: "Das gefällt ___ Mann.", audio: "Das gefällt dem Mann.", blank: "dem", answer: "dem", hint: "der → Dativ" },
  { sentence: "Sie liebt ___ Hund.", audio: "Sie liebt den Hund.", blank: "den", answer: "den", hint: "der → Akkusativ" },
  { sentence: "Ich vertraue ___ Freund.", audio: "Ich vertraue dem Freund.", blank: "dem", answer: "dem", hint: "der → Dativ" },
  { sentence: "Er macht ___ Hausaufgaben.", audio: "Er macht die Hausaufgaben.", blank: "die", answer: "die", hint: "die (çoğul) → Akkusativ (değişmez)" },
];

const readPassages: ReadQ[] = [
  {
    passage: "Anna kauft den Apfel im Supermarkt. Sie gibt dem Verkäufer das Geld. Der Verkäufer dankt ihr.",
    passageAudio: "Anna kauft den Apfel im Supermarkt. Sie gibt dem Verkäufer das Geld. Der Verkäufer dankt ihr.",
    question: "Was kauft Anna?",
    answer: "den Apfel",
    options: ["dem Apfel", "den Apfel", "der Apfel", "das Apfel"],
  },
  {
    passage: "Tom hilft dem alten Mann. Er trägt die schwere Tasche. Der Mann dankt Tom herzlich.",
    passageAudio: "Tom hilft dem alten Mann. Er trägt die schwere Tasche. Der Mann dankt Tom herzlich.",
    question: "Wem hilft Tom?",
    answer: "dem alten Mann",
    options: ["der alte Mann", "den alten Mann", "dem alten Mann", "des alten Mannes"],
  },
  {
    passage: "Maria liebt das Buch. Sie liest es jeden Abend. Das Buch gehört ihrer Mutter.",
    passageAudio: "Maria liebt das Buch. Sie liest es jeden Abend. Das Buch gehört ihrer Mutter.",
    question: "Was liebt Maria?",
    answer: "das Buch",
    options: ["das Buch", "dem Buch", "den Buch", "der Buch"],
  },
  {
    passage: "Peter schreibt dem Lehrer einen Brief. Der Lehrer antwortet dem Schüler sofort.",
    passageAudio: "Peter schreibt dem Lehrer einen Brief. Der Lehrer antwortet dem Schüler sofort.",
    question: "Wem schreibt Peter?",
    answer: "dem Lehrer",
    options: ["der Lehrer", "den Lehrer", "dem Lehrer", "die Lehrerin"],
  },
  {
    passage: "Wir sehen den Film im Kino. Der Film gefällt uns sehr gut. Wir empfehlen den Film unseren Freunden.",
    passageAudio: "Wir sehen den Film im Kino. Der Film gefällt uns sehr gut. Wir empfehlen den Film unseren Freunden.",
    question: "Was sehen wir im Kino?",
    answer: "den Film",
    options: ["der Film", "dem Film", "den Film", "das Film"],
  },
  {
    passage: "Lisa kauft die Blumen für ihre Mutter. Sie gibt der Mutter die Blumen. Die Mutter freut sich sehr.",
    passageAudio: "Lisa kauft die Blumen für ihre Mutter. Sie gibt der Mutter die Blumen. Die Mutter freut sich sehr.",
    question: "Wem gibt Lisa die Blumen?",
    answer: "der Mutter",
    options: ["die Mutter", "den Mutter", "dem Mutter", "der Mutter"],
  },
  {
    passage: "Ich trinke den Kaffee gern. Der Kaffee schmeckt gut. Ich danke dem Kellner.",
    passageAudio: "Ich trinke den Kaffee gern. Der Kaffee schmeckt gut. Ich danke dem Kellner.",
    question: "Was trinke ich gern?",
    answer: "den Kaffee",
    options: ["der Kaffee", "dem Kaffee", "den Kaffee", "das Kaffee"],
  },
  {
    passage: "Der Hund folgt dem Kind in den Park. Das Kind liebt den Hund sehr. Sie spielen zusammen.",
    passageAudio: "Der Hund folgt dem Kind in den Park. Das Kind liebt den Hund sehr. Sie spielen zusammen.",
    question: "Wem folgt der Hund?",
    answer: "dem Kind",
    options: ["das Kind", "den Kind", "dem Kind", "der Kind"],
  },
  {
    passage: "Sara liest das Buch in der Bibliothek. Sie empfiehlt das Buch dem Freund. Der Freund ist begeistert.",
    passageAudio: "Sara liest das Buch in der Bibliothek. Sie empfiehlt das Buch dem Freund. Der Freund ist begeistert.",
    question: "Wem empfiehlt Sara das Buch?",
    answer: "dem Freund",
    options: ["der Freund", "den Freund", "dem Freund", "die Freundin"],
  },
  {
    passage: "Jan hört die Musik. Die Musik gefällt ihm. Er hört sie jeden Tag.",
    passageAudio: "Jan hört die Musik. Die Musik gefällt ihm. Er hört sie jeden Tag.",
    question: "Was hört Jan?",
    answer: "die Musik",
    options: ["die Musik", "der Musik", "dem Musik", "den Musik"],
  },
  {
    passage: "Die Kinder helfen der Lehrerin. Sie tragen die Bücher. Die Lehrerin dankt den Kindern.",
    passageAudio: "Die Kinder helfen der Lehrerin. Sie tragen die Bücher. Die Lehrerin dankt den Kindern.",
    question: "Wem helfen die Kinder?",
    answer: "der Lehrerin",
    options: ["die Lehrerin", "den Lehrerin", "dem Lehrerin", "der Lehrerin"],
  },
  {
    passage: "Er kauft den Computer für die Arbeit. Der Computer kostet viel Geld. Er zeigt den Computer dem Chef.",
    passageAudio: "Er kauft den Computer für die Arbeit. Der Computer kostet viel Geld. Er zeigt den Computer dem Chef.",
    question: "Was kauft er?",
    answer: "den Computer",
    options: ["der Computer", "dem Computer", "den Computer", "das Computer"],
  },
  {
    passage: "Wir begegnen der alten Frau im Park. Sie kennt uns gut. Wir grüßen sie freundlich.",
    passageAudio: "Wir begegnen der alten Frau im Park. Sie kennt uns gut. Wir grüßen sie freundlich.",
    question: "Wem begegnen wir?",
    answer: "der alten Frau",
    options: ["die alte Frau", "den alten Frau", "dem alten Frau", "der alten Frau"],
  },
  {
    passage: "Sie macht die Hausaufgaben. Dann hilft sie dem Bruder. Der Bruder ist sehr dankbar.",
    passageAudio: "Sie macht die Hausaufgaben. Dann hilft sie dem Bruder. Der Bruder ist sehr dankbar.",
    question: "Was macht sie zuerst?",
    answer: "die Hausaufgaben",
    options: ["der Hausaufgaben", "dem Hausaufgaben", "die Hausaufgaben", "den Hausaufgaben"],
  },
  {
    passage: "Paul vertraut dem Arzt. Der Arzt hilft dem Patienten. Der Patient dankt dem Arzt.",
    passageAudio: "Paul vertraut dem Arzt. Der Arzt hilft dem Patienten. Der Patient dankt dem Arzt.",
    question: "Wem vertraut Paul?",
    answer: "dem Arzt",
    options: ["der Arzt", "den Arzt", "dem Arzt", "die Ärztin"],
  },
  {
    passage: "Ich sehe das Mädchen im Garten. Das Mädchen spielt mit dem Ball. Ich rufe das Mädchen.",
    passageAudio: "Ich sehe das Mädchen im Garten. Das Mädchen spielt mit dem Ball. Ich rufe das Mädchen.",
    question: "Was sehe ich im Garten?",
    answer: "das Mädchen",
    options: ["das Mädchen", "dem Mädchen", "der Mädchen", "den Mädchen"],
  },
  {
    passage: "Sie liebt den Sommer. Im Sommer schwimmt sie gern. Das Schwimmen gefällt ihr sehr.",
    passageAudio: "Sie liebt den Sommer. Im Sommer schwimmt sie gern. Das Schwimmen gefällt ihr sehr.",
    question: "Was liebt sie?",
    answer: "den Sommer",
    options: ["der Sommer", "dem Sommer", "den Sommer", "das Sommer"],
  },
  {
    passage: "Der Schüler antwortet dem Lehrer. Er weiß die Antwort. Der Lehrer lobt den Schüler.",
    passageAudio: "Der Schüler antwortet dem Lehrer. Er weiß die Antwort. Der Lehrer lobt den Schüler.",
    question: "Wem antwortet der Schüler?",
    answer: "dem Lehrer",
    options: ["der Lehrer", "den Lehrer", "dem Lehrer", "die Lehrerin"],
  },
  {
    passage: "Wir kennen die Stadt gut. Wir zeigen dem Touristen die Stadt. Der Tourist ist begeistert.",
    passageAudio: "Wir kennen die Stadt gut. Wir zeigen dem Touristen die Stadt. Der Tourist ist begeistert.",
    question: "Wem zeigen wir die Stadt?",
    answer: "dem Touristen",
    options: ["der Tourist", "den Tourist", "dem Touristen", "die Touristin"],
  },
  {
    passage: "Anna glaubt dem Freund. Sie vertraut ihm. Der Freund lügt aber nicht.",
    passageAudio: "Anna glaubt dem Freund. Sie vertraut ihm. Der Freund lügt aber nicht.",
    question: "Wem glaubt Anna?",
    answer: "dem Freund",
    options: ["der Freund", "den Freund", "dem Freund", "die Freundin"],
  },
];

/* ── shared result screen ───────────────────────────────────── */
type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";
function ResultScreen({ score, total, onRestart, skill, xpEarned }: { score: number; total: number; onRestart: () => void; skill: Skill; xpEarned: number }) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
  const msg = pct >= 80 ? "Harika! Konuyu çok iyi öğrendin." : pct >= 60 ? "İyi gidiyorsun! Biraz daha pratik yap." : "Endişelenme, tekrar çalış!";
  const { update } = useSession();
  useEffect(() => { saveProgress({ xp: xpEarned, skill, skillScore: pct, minutes: 10 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }); }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10 px-4"
    >
      <div className="text-6xl mb-4">{emoji}</div>
      <div className="text-3xl font-extrabold text-text-primary mb-1">{score}/{total}</div>
      <div className={`text-lg font-bold mb-2 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}% doğru</div>
      <div className="inline-flex items-center gap-1.5 bg-gold/15 border border-gold/30 text-gold text-sm font-bold px-3 py-1 rounded-full mb-3">+{xpEarned} XP kazandın!</div>
      <p className="text-text-secondary text-sm mb-8">{msg}</p>
      <div className="w-full bg-navy-border rounded-full h-3 max-w-xs mx-auto mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-3 rounded-full ${pct >= 80 ? "bg-green-400" : pct >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
        />
      </div>
      <button
        onClick={onRestart}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Tekrar Dene
      </button>
    </motion.div>
  );
}

/* ── MCQ exercise ───────────────────────────────────────────── */
function MCQExercise() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState<number[]>([]);

  const q = mcqQuestions[idx];

  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    else setWrong((w) => [...w, idx]);
    setTimeout(() => {
      if (idx + 1 >= mcqQuestions.length) setDone(true);
      else { setIdx((i) => i + 1); setSelected(null); }
    }, 1000);
  }

  function restart() { setIdx(0); setSelected(null); setScore(0); setDone(false); setWrong([]); }

  if (done) return <ResultScreen score={score} total={mcqQuestions.length} onRestart={restart} skill="grammatik" xpEarned={Math.max(10, score * 5)} />;

  return (
    <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-muted">{idx + 1} / {mcqQuestions.length}</span>
        <span className="text-xs font-semibold text-gold">{score} puan</span>
      </div>
      <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(idx / mcqQuestions.length) * 100}%` }} />
      </div>

      <div className="flex items-center gap-2 mb-5">
        <p className="text-text-primary font-semibold text-base leading-relaxed flex-1">{q.q}</p>
        {q.audio && <SpeakBtn text={q.audio} />}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {q.options.map((opt) => {
          const isCorrect = opt === q.answer;
          const isSel = opt === selected;
          let cls = "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
          if (selected) {
            if (isCorrect) cls = "bg-green-500/20 border-green-500/50 text-green-400";
            else if (isSel) cls = "bg-red-500/20 border-red-500/50 text-red-400";
            else cls = "bg-navy border-navy-border text-text-muted opacity-40";
          }
          return (
            <motion.button key={opt} onClick={() => choose(opt)}
              whileHover={!selected ? { scale: 1.03 } : {}} whileTap={!selected ? { scale: 0.97 } : {}}
              className={`py-3 px-4 border rounded-xl font-bold text-sm transition-all duration-200 ${cls}`}>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs text-text-muted bg-navy/50 border border-navy-border rounded-lg px-3 py-2">
          💡 {q.tip}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ── Schreiben exercise ─────────────────────────────────────── */
function SchreibenExercise() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const q = writeQuestions[idx];
  const isCorrect = checked && input.trim().toLowerCase() === q.answer.toLowerCase();
  const isWrong = checked && !isCorrect;

  function check() {
    if (!input.trim()) return;
    setChecked(true);
    if (input.trim().toLowerCase() === q.answer.toLowerCase()) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= writeQuestions.length) setDone(true);
    else { setIdx((i) => i + 1); setInput(""); setChecked(false); setShowHint(false); }
  }

  function restart() { setIdx(0); setInput(""); setChecked(false); setScore(0); setDone(false); setShowHint(false); }

  if (done) return <ResultScreen score={score} total={writeQuestions.length} onRestart={restart} skill="schreiben" xpEarned={Math.max(10, score * 8)} />;

  const parts = q.sentence.split("___");

  return (
    <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-muted">{idx + 1} / {writeQuestions.length}</span>
        <span className="text-xs font-semibold text-gold">{score} puan</span>
      </div>
      <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(idx / writeQuestions.length) * 100}%` }} />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <SpeakBtn text={q.audio} />
        <p className="text-xs text-text-muted">Sesi dinle, boşluğu doldur</p>
      </div>

      <div className="bg-navy border border-navy-border rounded-xl p-4 mb-4 flex items-center flex-wrap gap-1 text-base font-semibold text-text-primary">
        <span>{parts[0]}</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !checked) check(); }}
          disabled={checked}
          placeholder="___"
          className={`inline-block w-20 text-center border-b-2 bg-transparent outline-none px-1 transition-colors duration-200
            ${checked
              ? isCorrect ? "border-green-400 text-green-400" : "border-red-400 text-red-400"
              : "border-gold text-gold placeholder:text-text-muted"
            }`}
        />
        <span>{parts[1]}</span>
      </div>

      {checked && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 mb-3 text-sm font-medium
            ${isCorrect ? "bg-green-500/10 border border-green-500/30 text-green-400" : "bg-red-500/10 border border-red-500/30 text-red-400"}`}>
          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {isCorrect ? "Doğru!" : `Yanlış. Doğru cevap: "${q.answer}"`}
          <span className="text-text-muted text-xs ml-auto">{q.hint}</span>
        </motion.div>
      )}

      {!checked && showHint && (
        <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-3">
          💡 İpucu: {q.hint}
        </p>
      )}

      <div className="flex gap-2">
        {!checked ? (
          <>
            <button onClick={check} disabled={!input.trim()}
              className="flex-1 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm">
              Kontrol Et
            </button>
            {!showHint && (
              <button onClick={() => setShowHint(true)}
                className="px-4 py-2.5 bg-navy border border-navy-border rounded-xl text-text-muted hover:text-text-secondary text-sm transition-colors">
                İpucu
              </button>
            )}
          </>
        ) : (
          <button onClick={next}
            className="flex-1 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors text-sm flex items-center justify-center gap-2">
            {idx + 1 < writeQuestions.length ? "Sonraki" : "Sonuçları Gör"}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Lesen exercise ─────────────────────────────────────────── */
function LesenExercise() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = readPassages[idx];

  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= readPassages.length) setDone(true);
      else { setIdx((i) => i + 1); setSelected(null); }
    }, 1100);
  }

  function restart() { setIdx(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <ResultScreen score={score} total={readPassages.length} onRestart={restart} skill="lesen" xpEarned={Math.max(10, score * 6)} />;

  return (
    <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-muted">{idx + 1} / {readPassages.length}</span>
        <span className="text-xs font-semibold text-gold">{score} puan</span>
      </div>
      <div className="w-full bg-navy-border rounded-full h-1.5 mb-4">
        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(idx / readPassages.length) * 100}%` }} />
      </div>

      <div className="bg-navy/60 border border-navy-border rounded-xl p-4 mb-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Metni Oku</p>
          <SpeakBtn text={q.passageAudio} />
        </div>
        <p className="text-text-primary text-sm leading-relaxed">{q.passage}</p>
      </div>

      <p className="text-text-primary font-semibold text-sm mb-4">{q.question}</p>

      <div className="space-y-2">
        {q.options.map((opt) => {
          const isCorrect = opt === q.answer;
          const isSel = opt === selected;
          let cls = "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
          if (selected) {
            if (isCorrect) cls = "bg-green-500/20 border-green-500/50 text-green-400";
            else if (isSel) cls = "bg-red-500/20 border-red-500/50 text-red-400";
            else cls = "bg-navy border-navy-border text-text-muted opacity-40";
          }
          return (
            <motion.button key={opt} onClick={() => choose(opt)}
              whileHover={!selected ? { scale: 1.01 } : {}}
              className={`w-full text-left py-2.5 px-4 border rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${cls}`}>
              {selected && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
              {selected && isSel && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
              {opt}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── main export ────────────────────────────────────────────── */
type Tab = "mcq" | "schreiben" | "lesen";

export function PracticeSection() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("mcq");

  const tabs: { id: Tab; label: string; icon: React.ElementType; color: string; bg: string; border: string; count: number }[] = [
    { id: "mcq",       label: "Şıklı Sorular", icon: ListChecks, color: "text-amber-400",   bg: "bg-amber-500/15",   border: "border-amber-500/40",   count: 20 },
    { id: "schreiben", label: "Schreiben",      icon: PenLine,    color: "text-purple-400",  bg: "bg-purple-500/15",  border: "border-purple-500/40",  count: 20 },
    { id: "lesen",     label: "Lesen",          icon: BookOpen,   color: "text-sky-400",     bg: "bg-sky-500/15",     border: "border-sky-500/40",     count: 20 },
  ];

  if (!open) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden border-2 border-dashed border-gold/30 hover:border-gold/60 rounded-2xl p-8 text-center cursor-pointer group transition-all duration-300 bg-gold/5 hover:bg-gold/10"
        onClick={() => setOpen(true)}
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all" />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Dumbbell className="w-8 h-8 text-gold" />
        </motion.div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Pratik Bölümü</h3>
        <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
          60 soruluk kapsamlı alıştırma — Şıklı sorular, yazma egzersizleri ve okuma anlama testleri.
        </p>
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {tabs.map((t) => (
            <div key={t.id} className={`flex items-center gap-1.5 px-3 py-1.5 ${t.bg} border ${t.border} rounded-full text-xs font-semibold ${t.color}`}>
              <t.icon className="w-3.5 h-3.5" />
              {t.label} ({t.count})
            </div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors text-sm shadow-lg shadow-gold/20"
          onClick={() => setOpen(true)}
        >
          <Trophy className="w-4 h-4" />
          Alıştırmalara Başla
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
    >
      {/* header */}
      <div className="flex items-center gap-3 p-5 border-b border-navy-border">
        <div className="w-9 h-9 bg-gold/15 rounded-xl flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h2 className="text-text-primary font-bold text-base">Pratik Alıştırmaları</h2>
          <p className="text-text-muted text-xs">Akkusativ & Dativ — 60 soru</p>
        </div>
        <button onClick={() => setOpen(false)} className="ml-auto text-text-muted hover:text-text-secondary text-xs px-3 py-1 border border-navy-border rounded-lg transition-colors">Kapat</button>
      </div>

      {/* tabs */}
      <div className="flex border-b border-navy-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all border-b-2
              ${tab === t.id ? `${t.color} border-current bg-navy/30` : "text-text-muted border-transparent hover:text-text-secondary"}`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {tab === "mcq"       && <MCQExercise key="mcq" />}
          {tab === "schreiben" && <SchreibenExercise key="sch" />}
          {tab === "lesen"     && <LesenExercise key="les" />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
