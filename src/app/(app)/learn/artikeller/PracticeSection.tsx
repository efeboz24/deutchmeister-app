"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { saveProgress } from "@/lib/saveProgress";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Dumbbell,
  PenLine,
  ListChecks,
  BookOpen,
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

// ── MCQ ───────────────────────────────────────────────────────────────────────
const mcqQuestions = [
  {
    q: "_____ Mädchen spielt im Garten.",
    audio: "Das Mädchen spielt im Garten.",
    answer: "Das",
    options: ["Der", "Die", "Das", "Den"],
    tip: "-chen soneki HER ZAMAN neutrum → das Mädchen, das Häuschen, das Fräulein",
  },
  {
    q: "Ich lese _____ Zeitung.",
    audio: "Ich lese die Zeitung.",
    answer: "die",
    options: ["der", "die", "das", "den"],
    tip: "-ung soneki HER ZAMAN feminin. Zeitung Akkusativ'de de 'die' kalır!",
  },
  {
    q: "Er fährt mit _____ Bus.",
    audio: "Er fährt mit dem Bus.",
    answer: "dem",
    options: ["der", "die", "dem", "den"],
    tip: "'mit' edatı HER ZAMAN Dativ ister. Maskulin Dativ = dem",
  },
  {
    q: "_____ Winter ist sehr kalt.",
    audio: "Der Winter ist sehr kalt.",
    answer: "Der",
    options: ["Der", "Die", "Das", "Den"],
    tip: "Mevsimler HER ZAMAN maskulin: der Frühling, der Sommer, der Herbst, der Winter",
  },
  {
    q: "Sie hilft _____ Ärztin.",
    audio: "Sie hilft der Ärztin.",
    answer: "der",
    options: ["der", "die", "dem", "das"],
    tip: "'helfen' Dativ ister. Feminin Dativ = der (Nominativ ile karışturma!)",
  },
  {
    q: "_____ Universität ist sehr groß.",
    audio: "Die Universität ist sehr groß.",
    answer: "Die",
    options: ["Der", "Die", "Das", "Den"],
    tip: "-tät soneki HER ZAMAN feminin: die Universität, die Qualität, die Realität",
  },
  {
    q: "Ich kaufe _____ neues Auto.",
    audio: "Ich kaufe ein neues Auto.",
    answer: "ein",
    options: ["ein", "eine", "einen", "einem"],
    tip: "Auto = das Auto (neutrum). Akkusativ Neutrum Unbestimmt = ein (değişmez!)",
  },
  {
    q: "_____ Museum ist sehr schön.",
    audio: "Das Museum ist sehr schön.",
    answer: "Das",
    options: ["Der", "Die", "Das", "Den"],
    tip: "-um soneki genellikle neutrum: das Museum, das Zentrum, das Gymnasium",
  },
  {
    q: "Er trinkt _____ Kaffee.",
    audio: "Er trinkt einen Kaffee.",
    answer: "einen",
    options: ["ein", "eine", "einen", "einem"],
    tip: "Kaffee = der Kaffee (maskulin). Akkusativ Maskulin Unbestimmt = einen",
  },
  {
    q: "_____ Montag ist der erste Wochentag.",
    audio: "Der Montag ist der erste Wochentag.",
    answer: "Der",
    options: ["Der", "Die", "Das", "Den"],
    tip: "Haftanın günleri HER ZAMAN maskulin: der Montag, der Dienstag...",
  },
  {
    q: "Das Buch gehört _____ Studentin.",
    audio: "Das Buch gehört der Studentin.",
    answer: "der",
    options: ["der", "die", "dem", "den"],
    tip: "'gehören' Dativ ister. Studentin = die Studentin. Dativ Feminin = der",
  },
  {
    q: "_____ Freiheit ist unbezahlbar.",
    audio: "Die Freiheit ist unbezahlbar.",
    answer: "Die",
    options: ["Der", "Die", "Das", "Den"],
    tip: "-heit soneki HER ZAMAN feminin: die Freiheit, die Gesundheit, die Sicherheit",
  },
  {
    q: "Sie wohnt in _____ kleinen Wohnung.",
    audio: "Sie wohnt in einer kleinen Wohnung.",
    answer: "einer",
    options: ["ein", "eine", "einer", "einem"],
    tip: "'in' yer anlamında Dativ. Feminin Dativ Unbestimmt = einer",
  },
  {
    q: "_____ Kind schläft fest.",
    audio: "Das Kind schläft fest.",
    answer: "Das",
    options: ["Der", "Die", "Das", "Den"],
    tip: "Kind = das Kind (neutrum). Ezberlenmesi gereken kelimelerden!",
  },
  {
    q: "Ich spreche mit _____ Lehrerin.",
    audio: "Ich spreche mit der Lehrerin.",
    answer: "der",
    options: ["der", "die", "dem", "den"],
    tip: "'mit' Dativ ister. Lehrerin = die Lehrerin (-in → feminin). Dativ Feminin = der",
  },
  {
    q: "Er arbeitet für _____ große Firma.",
    audio: "Er arbeitet für eine große Firma.",
    answer: "eine",
    options: ["ein", "eine", "einen", "einem"],
    tip: "'für' Akkusativ ister. Firma = die Firma. Akkusativ Feminin Unbestimmt = eine",
  },
  {
    q: "_____ Möglichkeit existiert noch.",
    audio: "Die Möglichkeit existiert noch.",
    answer: "Die",
    options: ["Der", "Die", "Das", "Den"],
    tip: "-keit soneki HER ZAMAN feminin: die Möglichkeit, die Freundlichkeit, die Fähigkeit",
  },
  {
    q: "Wir fahren mit _____ Zug.",
    audio: "Wir fahren mit dem Zug.",
    answer: "dem",
    options: ["der", "die", "dem", "den"],
    tip: "'mit' Dativ. Zug = der Zug (maskulin). Dativ Maskulin = dem",
  },
  {
    q: "_____ Januar ist der kälteste Monat.",
    audio: "Der Januar ist der kälteste Monat.",
    answer: "Der",
    options: ["Der", "Die", "Das", "Den"],
    tip: "Aylar HER ZAMAN maskulin: der Januar, der Februar, der März...",
  },
  {
    q: "Das ist _____ Schreibtisch.",
    audio: "Das ist ein Schreibtisch.",
    answer: "ein",
    options: ["ein", "eine", "einen", "einem"],
    tip: "Schreibtisch = der Schreibtisch. Son kelime 'Tisch' (maskulin) → der/ein. Nominativ = ein",
  },
];

function MCQExercise() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = mcqQuestions[idx];
  const isCorrect = selected === q.answer;

  function pick(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= mcqQuestions.length) setDone(true);
      else { setIdx((i) => i + 1); setSelected(null); }
    }, 1200);
  }

  function restart() { setIdx(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <Result score={score} total={mcqQuestions.length} onRetry={restart} xp={Math.max(10, score * 5)} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{idx + 1} / {mcqQuestions.length}</span>
        <span className="text-gold font-bold">{score} puan</span>
      </div>
      <div className="w-full bg-navy rounded-full h-1.5">
        <motion.div
          className="bg-gold h-1.5 rounded-full"
          animate={{ width: `${((idx) / mcqQuestions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="bg-navy/60 rounded-xl p-4 flex items-start gap-3">
        <SpeakBtn text={q.audio} />
        <p className="text-text-primary font-semibold text-sm leading-relaxed">{q.q}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {q.options.map((opt) => {
          const picked = selected === opt;
          const correct = opt === q.answer;
          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.97 }}
              onClick={() => pick(opt)}
              className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all duration-200 ${
                selected
                  ? correct
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : picked
                    ? "bg-red-500/20 border-red-500/50 text-red-400"
                    : "bg-navy border-navy-border text-text-muted opacity-50"
                  : "bg-navy border-navy-border text-text-primary hover:border-gold/50 hover:bg-gold/5"
              }`}
            >
              {selected && correct && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1" />}
              {selected && picked && !correct && <XCircle className="inline w-3.5 h-3.5 mr-1" />}
              {opt}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-3 rounded-xl text-xs leading-relaxed border ${
              isCorrect
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            💡 {q.tip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Schreiben ─────────────────────────────────────────────────────────────────
const writeQuestions = [
  { q: "___ Zeitung liegt auf dem Tisch.", a: "Die", hint: "-ung → die (feminin, %100)" },
  { q: "Ich sehe ___ Mann auf der Straße.", a: "den", hint: "Akkusativ, maskulin → den" },
  { q: "___ Buch ist sehr interessant.", a: "Das", hint: "Buch = das Buch (neutrum)" },
  { q: "Er hilft ___ alten Frau.", a: "der", hint: "helfen + Dativ, feminin → der" },
  { q: "___ Frühling kommt bald.", a: "Der", hint: "Mevsimler maskulin → der" },
  { q: "Ich lerne mit ___ Freundin.", a: "einer", hint: "mit + Dativ, feminin unbestimmt → einer" },
  { q: "___ Möglichkeit gibt es immer.", a: "Die", hint: "-keit → die (feminin, %100)" },
  { q: "Sie schreibt ___ Brief.", a: "einen", hint: "Akkusativ, maskulin unbestimmt → einen" },
  { q: "Das gehört ___ Lehrers.", a: "des", hint: "Genitiv, maskulin → des" },
  { q: "___ Häuschen ist sehr klein.", a: "Das", hint: "-chen → das (neutrum, %100)" },
  { q: "Wir fahren zu ___ Freund.", a: "einem", hint: "zu + Dativ, maskulin unbestimmt → einem" },
  { q: "___ Gesellschaft verändert sich.", a: "Die", hint: "-schaft → die (feminin, %100)" },
  { q: "Er kommt aus ___ Stadt.", a: "einer", hint: "aus + Dativ, Stadt = die Stadt, unbestimmt → einer" },
  { q: "Das Auto gehört ___ Frau.", a: "der", hint: "gehören + Dativ, feminin bestimmt → der" },
  { q: "___ Museum öffnet um 9 Uhr.", a: "Das", hint: "-um → das (neutrum)" },
  { q: "Ich denke an ___ Urlaub.", a: "den", hint: "denken an + Akkusativ, maskulin → den" },
  { q: "___ Station ist hier.", a: "Die", hint: "-tion → die (feminin, %100)" },
  { q: "Er wohnt bei ___ Eltern.", a: "den", hint: "bei + Dativ, Plural → den" },
  { q: "___ Qualität ist sehr gut.", a: "Die", hint: "-tät → die (feminin, %100)" },
  { q: "Ich spreche mit ___ Direktor.", a: "dem", hint: "mit + Dativ, maskulin → dem" },
];

function SchreibenExercise() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const q = writeQuestions[idx];
  const isCorrect = input.trim().toLowerCase() === q.a.toLowerCase();

  function check() {
    if (!input.trim() || checked) return;
    setChecked(true);
    if (isCorrect) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= writeQuestions.length) setDone(true);
    else { setIdx((i) => i + 1); setInput(""); setChecked(false); setShowHint(false); }
  }

  function restart() { setIdx(0); setInput(""); setChecked(false); setScore(0); setDone(false); setShowHint(false); }

  if (done) return <Result score={score} total={writeQuestions.length} onRetry={restart} xp={Math.max(10, score * 8)} />;

  const parts = q.q.split("___");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{idx + 1} / {writeQuestions.length}</span>
        <span className="text-purple-400 font-bold">{score} puan</span>
      </div>
      <div className="w-full bg-navy rounded-full h-1.5">
        <motion.div
          className="bg-purple-500 h-1.5 rounded-full"
          animate={{ width: `${(idx / writeQuestions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="bg-navy/60 rounded-xl p-4">
        <p className="text-text-primary text-sm font-medium flex flex-wrap items-center gap-1">
          {parts[0]}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !checked && check()}
            disabled={checked}
            placeholder="___"
            className="w-24 text-center bg-navy border border-navy-border rounded-lg px-2 py-1 text-purple-400 font-bold focus:outline-none focus:border-purple-500/50"
          />
          {parts[1]}
        </p>
      </div>
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl text-xs border ${
              isCorrect
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {isCorrect ? "✓ Harika!" : `✗ Doğrusu: ${q.a}`} — {q.hint}
          </motion.div>
        )}
        {showHint && !checked && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl text-xs border bg-purple-500/10 border-purple-500/30 text-purple-400"
          >
            💡 {q.hint}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-2">
        {!checked ? (
          <>
            <button
              onClick={check}
              disabled={!input.trim()}
              className="flex-1 py-2.5 rounded-xl bg-purple-500/20 text-purple-400 font-bold text-sm border border-purple-500/40 hover:bg-purple-500/30 transition-colors disabled:opacity-40"
            >
              Kontrol Et
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2.5 rounded-xl bg-navy border border-navy-border text-text-muted text-sm hover:text-text-secondary transition-colors"
            >
              İpucu
            </button>
          </>
        ) : (
          <button
            onClick={next}
            className="flex-1 py-2.5 rounded-xl bg-purple-500/20 text-purple-400 font-bold text-sm border border-purple-500/40 hover:bg-purple-500/30 transition-colors"
          >
            {idx + 1 >= writeQuestions.length ? "Sonucu Gör" : "Devam →"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Lesen ─────────────────────────────────────────────────────────────────────
const lesenQuestions = [
  {
    passage: "Der Mann kauft ein Buch. Er gibt dem Kind das Buch als Geschenk. Die Mutter des Kindes freut sich sehr.",
    passageAudio: "Der Mann kauft ein Buch. Er gibt dem Kind das Buch als Geschenk. Die Mutter des Kindes freut sich sehr.",
    question: "'dem Kind' — hangi hal (Kasus)?",
    answer: "Dativ",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Die Qualität der Universität ist ausgezeichnet. Die Studentin arbeitet fleißig für eine bessere Zukunft.",
    passageAudio: "Die Qualität der Universität ist ausgezeichnet.",
    question: "'der Universität' — hangi hal?",
    answer: "Genitiv",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Das Mädchen spielt mit dem Ball. Der Ball gehört dem Bruder des Mädchens.",
    passageAudio: "Das Mädchen spielt mit dem Ball.",
    question: "'mit dem Ball' — 'mit' hangi hali gerektirir?",
    answer: "Dativ",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Im Winter fährt die Familie in die Berge. Der Schnee macht den Kindern Spaß.",
    passageAudio: "Im Winter fährt die Familie in die Berge.",
    question: "'den Kindern' — 'Kinder' hangi halde?",
    answer: "Dativ",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Die Freiheit ist ein wichtiges Gut. Ohne die Freiheit kann ein Mensch nicht glücklich sein.",
    passageAudio: "Die Freiheit ist ein wichtiges Gut.",
    question: "'die Freiheit' — hangi sonekten feminin (die)?",
    answer: "-heit",
    options: ["-ung", "-heit", "-keit", "-schaft"],
  },
  {
    passage: "Er kauft einen Schreibtisch für das Büro. Der Schreibtisch ist aus Holz.",
    passageAudio: "Er kauft einen Schreibtisch für das Büro.",
    question: "'einen Schreibtisch' — neden 'einen'?",
    answer: "Akkusativ + maskulin",
    options: ["Nominativ + maskulin", "Akkusativ + maskulin", "Dativ + maskulin", "Genitiv + maskulin"],
  },
  {
    passage: "Das Museum öffnet um neun Uhr. Die Ausstellung zeigt die Geschichte der Stadt.",
    passageAudio: "Das Museum öffnet um neun Uhr.",
    question: "'Das Museum' — hangi sonekten neutrum (das)?",
    answer: "-um",
    options: ["-ung", "-chen", "-um", "-heit"],
  },
  {
    passage: "Die Freundschaft zwischen den zwei Ländern ist sehr wichtig. Sie hilft der ganzen Gesellschaft.",
    passageAudio: "Die Freundschaft zwischen den zwei Ländern ist sehr wichtig.",
    question: "'zwischen den Ländern' — 'zwischen' hangi hali ister (yer anlamında)?",
    answer: "Dativ",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Im Januar fährt er mit dem Zug nach Berlin. Das ist die schnellste Verbindung.",
    passageAudio: "Im Januar fährt er mit dem Zug nach Berlin.",
    question: "'Im Januar' — aylar hangi cinsiyet?",
    answer: "Maskulin (der)",
    options: ["Maskulin (der)", "Feminin (die)", "Neutrum (das)", "Değişir"],
  },
  {
    passage: "Das Häuschen am See gehört einer alten Frau. Die Frau lebt allein dort.",
    passageAudio: "Das Häuschen am See gehört einer alten Frau.",
    question: "'Das Häuschen' — neden 'das'?",
    answer: "-chen soneki her zaman das",
    options: ["-chen soneki her zaman das", "Ev neutrumdur", "İstisna kelime", "-lein soneki"],
  },
  {
    passage: "Die Möglichkeit, Deutsch zu lernen, ist eine große Chance für die Zukunft.",
    passageAudio: "Die Möglichkeit, Deutsch zu lernen, ist eine große Chance.",
    question: "'Die Möglichkeit' — hangi sonekten feminin?",
    answer: "-keit",
    options: ["-heit", "-schaft", "-keit", "-tion"],
  },
  {
    passage: "Er gibt der Lehrerin einen Brief. Die Lehrerin liest den Brief laut vor.",
    passageAudio: "Er gibt der Lehrerin einen Brief.",
    question: "'der Lehrerin' — bu cümlede hangi hal?",
    answer: "Dativ",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Wegen des schlechten Wetters bleibt die Familie zuhause. Der Regen hört nicht auf.",
    passageAudio: "Wegen des schlechten Wetters bleibt die Familie zuhause.",
    question: "'wegen des Wetters' — 'wegen' hangi hali gerektirir?",
    answer: "Genitiv",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Die Gesellschaft braucht mehr Toleranz und Respekt. Ohne Toleranz gibt es keinen Frieden.",
    passageAudio: "Die Gesellschaft braucht mehr Toleranz und Respekt.",
    question: "'Die Gesellschaft' — hangi sonekten feminin?",
    answer: "-schaft",
    options: ["-heit", "-schaft", "-keit", "-ung"],
  },
  {
    passage: "Das Kind spielt mit einem Ball. Der Ball ist rot und gehört dem Kind.",
    passageAudio: "Das Kind spielt mit einem Ball.",
    question: "'mit einem Ball' — 'Ball' hangi cinsiyet?",
    answer: "Maskulin (der Ball)",
    options: ["Maskulin (der Ball)", "Feminin (die Ball)", "Neutrum (das Ball)", "Belirsiz"],
  },
  {
    passage: "Die Station ist direkt neben dem Bahnhof. Jeden Montag fährt er mit dem Bus.",
    passageAudio: "Die Station ist direkt neben dem Bahnhof.",
    question: "'Die Station' — hangi sonekten feminin?",
    answer: "-tion",
    options: ["-ung", "-tion", "-heit", "-schaft"],
  },
  {
    passage: "Im Sommer schwimmt die Familie im See. Der Sommer ist die schönste Jahreszeit.",
    passageAudio: "Im Sommer schwimmt die Familie im See.",
    question: "'Der Sommer' — neden maskulin?",
    answer: "Mevsimler maskulin",
    options: ["Mevsimler maskulin", "Sommer -er ile biter", "İstisna kelime", "Her hava olayı maskulin"],
  },
  {
    passage: "Das Dokument liegt auf dem Tisch des Direktors. Er sucht es schon lange.",
    passageAudio: "Das Dokument liegt auf dem Tisch des Direktors.",
    question: "'des Direktors' — bu hangi hal?",
    answer: "Genitiv",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
  {
    passage: "Die Energie der Sonne ist unbegrenzt. Das Sonnensystem hat acht Planeten.",
    passageAudio: "Die Energie der Sonne ist unbegrenzt.",
    question: "'Die Energie' — hangi sonekten feminin?",
    answer: "-ie",
    options: ["-ie", "-gie", "-ung", "-heit"],
  },
  {
    passage: "Er kauft ein Buch für einen Freund. Das Buch handelt von der Geschichte Deutschlands.",
    passageAudio: "Er kauft ein Buch für einen Freund.",
    question: "'für einen Freund' — 'für' hangi hali gerektirir?",
    answer: "Akkusativ",
    options: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  },
];

function LesenExercise() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = lesenQuestions[idx];
  const isCorrect = selected === q.answer;

  function pick(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= lesenQuestions.length) setDone(true);
      else { setIdx((i) => i + 1); setSelected(null); }
    }, 1200);
  }

  function restart() { setIdx(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return <Result score={score} total={lesenQuestions.length} onRetry={restart} xp={Math.max(10, score * 6)} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{idx + 1} / {lesenQuestions.length}</span>
        <span className="text-sky-400 font-bold">{score} puan</span>
      </div>
      <div className="w-full bg-navy rounded-full h-1.5">
        <motion.div
          className="bg-sky-500 h-1.5 rounded-full"
          animate={{ width: `${(idx / lesenQuestions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="bg-navy/60 rounded-xl p-4 space-y-2">
        <div className="flex items-start gap-2">
          <SpeakBtn text={q.passageAudio} />
          <p className="text-text-secondary text-xs leading-relaxed italic">{q.passage}</p>
        </div>
      </div>
      <p className="text-text-primary text-sm font-semibold">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt) => {
          const picked = selected === opt;
          const correct = opt === q.answer;
          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.98 }}
              onClick={() => pick(opt)}
              className={`w-full py-2.5 px-4 rounded-xl text-sm text-left border transition-all duration-200 ${
                selected
                  ? correct
                    ? "bg-green-500/20 border-green-500/50 text-green-400 font-semibold"
                    : picked
                    ? "bg-red-500/20 border-red-500/50 text-red-400"
                    : "bg-navy border-navy-border text-text-muted opacity-50"
                  : "bg-navy border-navy-border text-text-primary hover:border-sky-500/40 hover:bg-sky-500/5"
              }`}
            >
              {selected && correct && <CheckCircle2 className="inline w-3.5 h-3.5 mr-2" />}
              {selected && picked && !correct && <XCircle className="inline w-3.5 h-3.5 mr-2" />}
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── Result ────────────────────────────────────────────────────────────────────
function Result({ score, total, onRetry, xp }: { score: number; total: number; onRetry: () => void; xp?: number }) {
  const { update } = useSession();
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
  useEffect(() => {
    if (xp === undefined) return;
    saveProgress({ xp, skill: "grammatik", skillScore: pct, minutes: 10 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6 space-y-4"
    >
      <div className="text-5xl">{emoji}</div>
      <div>
        <div className="text-2xl font-black text-text-primary">{score} / {total}</div>
        <div className="text-text-muted text-sm mt-1">%{pct} başarı</div>
      </div>
      <div className="w-full bg-navy rounded-full h-3 max-w-xs mx-auto">
        <motion.div
          className="bg-gold h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold/15 text-gold font-bold text-sm border border-gold/30 hover:bg-gold/25 transition-colors"
      >
        <RotateCcw className="w-4 h-4" /> Tekrar Dene
      </button>
    </motion.div>
  );
}

// ── Tab Shell ─────────────────────────────────────────────────────────────────
const tabs = [
  { id: "mcq", label: "Seçmeli", icon: <ListChecks className="w-4 h-4" />, color: "amber", count: 20 },
  { id: "schreiben", label: "Yaz", icon: <PenLine className="w-4 h-4" />, color: "purple", count: 20 },
  { id: "lesen", label: "Oku & Anla", icon: <BookOpen className="w-4 h-4" />, color: "sky", count: 20 },
] as const;

const colorMap = {
  amber: { active: "text-amber-400 border-amber-500/40 bg-amber-500/10", badge: "bg-amber-500/20 text-amber-400" },
  purple: { active: "text-purple-400 border-purple-500/40 bg-purple-500/10", badge: "bg-purple-500/20 text-purple-400" },
  sky: { active: "text-sky-400 border-sky-500/40 bg-sky-500/10", badge: "bg-sky-500/20 text-sky-400" },
};

export default function PracticeSection() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"mcq" | "schreiben" | "lesen">("mcq");

  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-navy/20 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
          <Dumbbell className="w-5 h-5 text-gold" />
        </div>
        <div className="flex-1">
          <div className="text-text-primary font-bold">Alıştırmalar</div>
          <div className="text-text-muted text-xs mt-0.5">60 soru · Seçmeli · Yazma · Okuma</div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <Trophy className="w-4 h-4 text-gold" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-navy-border">
              {/* Tab bar */}
              <div className="flex border-b border-navy-border">
                {tabs.map((t) => {
                  const c = colorMap[t.color];
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-colors ${
                        isActive ? c.active : "text-text-muted border-transparent hover:text-text-secondary"
                      }`}
                    >
                      {t.icon}
                      <span className="hidden sm:inline">{t.label}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${c.badge}`}>{t.count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Exercise content */}
              <div className="p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "mcq" && <MCQExercise />}
                    {activeTab === "schreiben" && <SchreibenExercise />}
                    {activeTab === "lesen" && <LesenExercise />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
