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

/* ── SpeakBtn ───────────────────────────────────────────────── */
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

/* ── MCQ Questions (20) ─────────────────────────────────────── */
type MCQ = { q: string; audio: string; answer: string; options: string[]; tip: string };

const mcqQuestions: MCQ[] = [
  { q: "Das ist das Buch ___ Mannes.", audio: "Das ist das Buch des Mannes.", answer: "des", options: ["der", "des", "dem", "den"], tip: "Maskulin Genitiv → des (+s)" },
  { q: "Die Tasche ___ Frau ist rot.", audio: "Die Tasche der Frau ist rot.", answer: "der", options: ["die", "der", "dem", "des"], tip: "Feminin Genitiv → der (değişmez)" },
  { q: "Das Zimmer ___ Kindes ist sauber.", audio: "Das Zimmer des Kindes ist sauber.", answer: "des", options: ["das", "des", "dem", "den"], tip: "Neutrum Genitiv → des (+es)" },
  { q: "Die Farbe ___ Bücher ist blau.", audio: "Die Farbe der Bücher ist blau.", answer: "der", options: ["die", "der", "dem", "den"], tip: "Plural Genitiv → der (değişmez)" },
  { q: "Wegen ___ Regens bleiben wir zu Hause.", audio: "Wegen des Regens bleiben wir zu Hause.", answer: "des", options: ["der", "des", "dem", "den"], tip: "wegen → Genitiv! Mask. → des" },
  { q: "Trotz ___ Lärms schläft das Baby.", audio: "Trotz des Lärms schläft das Baby.", answer: "des", options: ["der", "des", "dem", "den"], tip: "trotz → Genitiv! Mask. → des" },
  { q: "Während ___ Unterrichts schreibt er.", audio: "Während des Unterrichts schreibt er.", answer: "des", options: ["der", "des", "dem", "den"], tip: "während → Genitiv! Mask. → des" },
  { q: "Statt ___ Kaffees trinke ich Tee.", audio: "Statt des Kaffees trinke ich Tee.", answer: "des", options: ["des", "dem", "der", "den"], tip: "statt → Genitiv! Mask. → des" },
  { q: "Aufgrund ___ Kälte bleiben wir drinnen.", audio: "Aufgrund der Kälte bleiben wir drinnen.", answer: "der", options: ["die", "der", "dem", "des"], tip: "aufgrund → Genitiv! Fem. → der" },
  { q: "Das ist die Mutter ___ Kindes.", audio: "Das ist die Mutter des Kindes.", answer: "des", options: ["das", "des", "dem", "den"], tip: "Neutrum Genitiv → des (+es)" },
  { q: "Innerhalb ___ Stadt gibt es viele Parks.", audio: "Innerhalb der Stadt gibt es viele Parks.", answer: "der", options: ["die", "der", "dem", "des"], tip: "innerhalb → Genitiv! Fem. → der" },
  { q: "Außerhalb ___ Hauses ist es kalt.", audio: "Außerhalb des Hauses ist es kalt.", answer: "des", options: ["des", "dem", "der", "den"], tip: "außerhalb → Genitiv! Neu. → des" },
  { q: "Der Name ___ Lehrerin ist Müller.", audio: "Der Name der Lehrerin ist Müller.", answer: "der", options: ["die", "der", "dem", "des"], tip: "Feminin Genitiv → der" },
  { q: "Das Auto ___ Vaters ist neu.", audio: "Das Auto des Vaters ist neu.", answer: "des", options: ["der", "des", "dem", "den"], tip: "Mask. Genitiv → des (+s)" },
  { q: "Dank ___ Hilfe hat er bestanden.", audio: "Dank der Hilfe hat er bestanden.", answer: "der", options: ["die", "der", "dem", "des"], tip: "dank → Genitiv! Fem. → der" },
  { q: "Die Stimme ___ Sängers ist schön.", audio: "Die Stimme des Sängers ist schön.", answer: "des", options: ["der", "des", "dem", "den"], tip: "Mask. Genitiv → des (+s)" },
  { q: "Mithilfe ___ Lehrers hat er gelernt.", audio: "Mithilfe des Lehrers hat er gelernt.", answer: "des", options: ["der", "des", "dem", "den"], tip: "mithilfe → Genitiv! Mask. → des" },
  { q: "Das Ende ___ Films war spannend.", audio: "Das Ende des Films war spannend.", answer: "des", options: ["des", "dem", "der", "den"], tip: "Mask. Genitiv → des (+s)" },
  { q: "Laut ___ Wetterberichts regnet es.", audio: "Laut des Wetterberichts regnet es.", answer: "des", options: ["der", "des", "dem", "den"], tip: "laut → Genitiv! Mask. → des" },
  { q: "Die Qualität ___ Produkte ist hoch.", audio: "Die Qualität der Produkte ist hoch.", answer: "der", options: ["die", "der", "dem", "den"], tip: "Plural Genitiv → der" },
];

/* ── Schreiben Questions (20) ───────────────────────────────── */
type WriteQ = { sentence: string; audio: string; answer: string; hint: string };

const writeQuestions: WriteQ[] = [
  { sentence: "Das ist das Buch _____ Mannes.", audio: "Das ist das Buch des Mannes.", answer: "des", hint: "Maskulin Genitiv → des" },
  { sentence: "Die Tasche _____ Frau ist schön.", audio: "Die Tasche der Frau ist schön.", answer: "der", hint: "Feminin Genitiv → der" },
  { sentence: "Das Zimmer _____ Kindes ist klein.", audio: "Das Zimmer des Kindes ist klein.", answer: "des", hint: "Neutrum Genitiv → des" },
  { sentence: "Wegen _____ Regens bleibe ich zu Hause.", audio: "Wegen des Regens bleibe ich zu Hause.", answer: "des", hint: "wegen + Genitiv → Mask. → des" },
  { sentence: "Trotz _____ Kälte geht er spazieren.", audio: "Trotz der Kälte geht er spazieren.", answer: "der", hint: "trotz + Genitiv → Fem. → der" },
  { sentence: "Das Auto _____ Vaters ist alt.", audio: "Das Auto des Vaters ist alt.", answer: "des", hint: "Mask. Genitiv → des (+s)" },
  { sentence: "Die Farbe _____ Blume ist rot.", audio: "Die Farbe der Blume ist rot.", answer: "der", hint: "Feminin Genitiv → der" },
  { sentence: "Während _____ Unterrichts ist es still.", audio: "Während des Unterrichts ist es still.", answer: "des", hint: "während + Genitiv → Mask. → des" },
  { sentence: "Statt _____ Kaffees trinke ich Wasser.", audio: "Statt des Kaffees trinke ich Wasser.", answer: "des", hint: "statt + Genitiv → Mask. → des" },
  { sentence: "Die Stimme _____ Sängers ist laut.", audio: "Die Stimme des Sängers ist laut.", answer: "des", hint: "Mask. Genitiv → des (+s)" },
  { sentence: "Aufgrund _____ Müdigkeit schläft er.", audio: "Aufgrund der Müdigkeit schläft er.", answer: "der", hint: "aufgrund + Genitiv → Fem. → der" },
  { sentence: "Innerhalb _____ Stadt gibt es Museen.", audio: "Innerhalb der Stadt gibt es Museen.", answer: "der", hint: "innerhalb + Genitiv → Fem. → der" },
  { sentence: "Das Dach _____ Hauses ist rot.", audio: "Das Dach des Hauses ist rot.", answer: "des", hint: "Neutrum Genitiv → des (+es)" },
  { sentence: "Die Meinung _____ Lehrers ist wichtig.", audio: "Die Meinung des Lehrers ist wichtig.", answer: "des", hint: "Mask. Genitiv → des (+s)" },
  { sentence: "Dank _____ Unterstützung hat sie bestanden.", audio: "Dank der Unterstützung hat sie bestanden.", answer: "der", hint: "dank + Genitiv → Fem. → der" },
  { sentence: "Das Ende _____ Films war schön.", audio: "Das Ende des Films war schön.", answer: "des", hint: "Mask. Genitiv → des (+s)" },
  { sentence: "Die Namen _____ Schüler stehen hier.", audio: "Die Namen der Schüler stehen hier.", answer: "der", hint: "Plural Genitiv → der" },
  { sentence: "Außerhalb _____ Hauses ist es warm.", audio: "Außerhalb des Hauses ist es warm.", answer: "des", hint: "außerhalb + Genitiv → Neu. → des" },
  { sentence: "Mithilfe _____ Freundin hat sie es geschafft.", audio: "Mithilfe der Freundin hat sie es geschafft.", answer: "der", hint: "mithilfe + Genitiv → Fem. → der" },
  { sentence: "Die Qualität _____ Produktes ist gut.", audio: "Die Qualität des Produktes ist gut.", answer: "des", hint: "Neutrum Genitiv → des (+es)" },
];

/* ── Lesen Passages (20) ────────────────────────────────────── */
type ReadQ = { passage: string; passageAudio: string; question: string; answer: string; options: string[] };

const readPassages: ReadQ[] = [
  {
    passage: "Das Buch des Lehrers ist sehr interessant. Die Schüler lesen es gern. Der Inhalt des Buches ist lehrreich.",
    passageAudio: "Das Buch des Lehrers ist sehr interessant. Die Schüler lesen es gern. Der Inhalt des Buches ist lehrreich.",
    question: "Wessen Buch ist interessant?",
    answer: "des Lehrers",
    options: ["dem Lehrer", "des Lehrers", "der Lehrer", "den Lehrer"],
  },
  {
    passage: "Wegen des starken Regens bleiben wir zu Hause. Der Regen fällt den ganzen Tag. Wir trinken Tee.",
    passageAudio: "Wegen des starken Regens bleiben wir zu Hause. Der Regen fällt den ganzen Tag. Wir trinken Tee.",
    question: "Warum bleiben sie zu Hause?",
    answer: "Wegen des starken Regens",
    options: ["Wegen dem starken Regen", "Wegen des starken Regens", "Wegen der starke Regen", "Trotz des Regens"],
  },
  {
    passage: "Die Tasche der Frau ist aus Leder. Sie kauft sie im Geschäft. Die Qualität der Tasche ist sehr gut.",
    passageAudio: "Die Tasche der Frau ist aus Leder. Sie kauft sie im Geschäft. Die Qualität der Tasche ist sehr gut.",
    question: "Wessen Tasche ist aus Leder?",
    answer: "der Frau",
    options: ["die Frau", "der Frau", "dem Frau", "den Frau"],
  },
  {
    passage: "Trotz des Lärms schläft das Kind. Das Zimmer des Kindes ist klein. Die Mutter singt ein Lied.",
    passageAudio: "Trotz des Lärms schläft das Kind. Das Zimmer des Kindes ist klein. Die Mutter singt ein Lied.",
    question: "Wessen Zimmer ist klein?",
    answer: "des Kindes",
    options: ["das Kind", "des Kindes", "dem Kind", "den Kindes"],
  },
  {
    passage: "Das Auto des Vaters ist neu. Er fährt jeden Tag damit. Der Name des Vaters ist Klaus.",
    passageAudio: "Das Auto des Vaters ist neu. Er fährt jeden Tag damit. Der Name des Vaters ist Klaus.",
    question: "Wessen Auto ist neu?",
    answer: "des Vaters",
    options: ["der Vater", "des Vaters", "dem Vater", "den Vater"],
  },
  {
    passage: "Während des Unterrichts ist es still. Die Stimme des Lehrers ist laut. Alle hören zu.",
    passageAudio: "Während des Unterrichts ist es still. Die Stimme des Lehrers ist laut. Alle hören zu.",
    question: "Welche Präposition steht mit Genitiv im ersten Satz?",
    answer: "Während",
    options: ["Trotz", "Während", "Wegen", "Statt"],
  },
  {
    passage: "Die Farbe der Blume ist gelb. Das Aroma der Blume ist süß. Der Gärtner pflegt die Blumen.",
    passageAudio: "Die Farbe der Blume ist gelb. Das Aroma der Blume ist süß. Der Gärtner pflegt die Blumen.",
    question: "Wie lautet der Genitiv von 'die Blume'?",
    answer: "der Blume",
    options: ["die Blume", "der Blume", "dem Blume", "des Blume"],
  },
  {
    passage: "Statt des Kaffees trinkt er Tee. Der Kaffee des Hauses ist teuer. Er bevorzugt Tee.",
    passageAudio: "Statt des Kaffees trinkt er Tee. Der Kaffee des Hauses ist teuer. Er bevorzugt Tee.",
    question: "Wie lautet 'statt' + Maskulin Genitiv?",
    answer: "statt des Kaffees",
    options: ["statt dem Kaffee", "statt des Kaffees", "statt der Kaffee", "statt den Kaffee"],
  },
  {
    passage: "Aufgrund der Müdigkeit schläft er früh. Der Arzt des Krankenhauses empfiehlt Ruhe. Er schläft gut.",
    passageAudio: "Aufgrund der Müdigkeit schläft er früh. Der Arzt des Krankenhauses empfiehlt Ruhe. Er schläft gut.",
    question: "Wie lautet der Genitiv von 'die Müdigkeit'?",
    answer: "der Müdigkeit",
    options: ["die Müdigkeit", "der Müdigkeit", "dem Müdigkeit", "des Müdigkeit"],
  },
  {
    passage: "Das Dach des Hauses ist rot. Die Fenster des Hauses sind groß. Der Besitzer des Hauses ist reich.",
    passageAudio: "Das Dach des Hauses ist rot. Die Fenster des Hauses sind groß. Der Besitzer des Hauses ist reich.",
    question: "Wie lautet der Genitiv von 'das Haus'?",
    answer: "des Hauses",
    options: ["das Haus", "des Hauses", "dem Haus", "den Hauses"],
  },
  {
    passage: "Innerhalb der Stadt gibt es viele Parks. Die Bewohner der Stadt sind freundlich. Die Geschichte der Stadt ist alt.",
    passageAudio: "Innerhalb der Stadt gibt es viele Parks. Die Bewohner der Stadt sind freundlich. Die Geschichte der Stadt ist alt.",
    question: "Was bedeutet 'innerhalb' grammatisch?",
    answer: "Genitiv-Präposition",
    options: ["Akkusativ-Präposition", "Dativ-Präposition", "Genitiv-Präposition", "Nominativ-Präposition"],
  },
  {
    passage: "Dank der Hilfe seiner Freunde hat er die Prüfung bestanden. Die Note des Schülers ist sehr gut. Er ist glücklich.",
    passageAudio: "Dank der Hilfe seiner Freunde hat er die Prüfung bestanden. Die Note des Schülers ist sehr gut. Er ist glücklich.",
    question: "Wie lautet der Genitiv von 'der Schüler'?",
    answer: "des Schülers",
    options: ["der Schüler", "des Schülers", "dem Schüler", "den Schüler"],
  },
  {
    passage: "Mithilfe des Lehrers hat sie Deutsch gelernt. Der Erfolg der Schülerin ist groß. Sie spricht fließend.",
    passageAudio: "Mithilfe des Lehrers hat sie Deutsch gelernt. Der Erfolg der Schülerin ist groß. Sie spricht fließend.",
    question: "Wie lautet der Genitiv von 'die Schülerin'?",
    answer: "der Schülerin",
    options: ["die Schülerin", "der Schülerin", "dem Schülerin", "des Schülerin"],
  },
  {
    passage: "Das Ende des Films war überraschend. Die Meinung der Kritiker ist positiv. Viele Menschen sehen ihn.",
    passageAudio: "Das Ende des Films war überraschend. Die Meinung der Kritiker ist positiv. Viele Menschen sehen ihn.",
    question: "Welche Artikel-Form steht im Genitiv Plural?",
    answer: "der",
    options: ["die", "der", "dem", "des"],
  },
  {
    passage: "Laut des Wetterberichts regnet es morgen. Der Name des Meteorologen ist Müller. Er sagt die Wahrheit.",
    passageAudio: "Laut des Wetterberichts regnet es morgen. Der Name des Meteorologen ist Müller. Er sagt die Wahrheit.",
    question: "Welche Präposition steht mit Genitiv?",
    answer: "laut",
    options: ["mit", "laut", "bei", "nach"],
  },
  {
    passage: "Die Namen der Schüler stehen auf der Liste. Der Direktor der Schule kennt alle. Die Qualität der Schule ist gut.",
    passageAudio: "Die Namen der Schüler stehen auf der Liste. Der Direktor der Schule kennt alle. Die Qualität der Schule ist gut.",
    question: "Wie lautet der Genitiv von 'die Schule'?",
    answer: "der Schule",
    options: ["die Schule", "der Schule", "dem Schule", "des Schule"],
  },
  {
    passage: "Außerhalb des Dorfes gibt es Felder. Die Bewohner des Dorfes sind ruhig. Das Leben des Dorfes ist einfach.",
    passageAudio: "Außerhalb des Dorfes gibt es Felder. Die Bewohner des Dorfes sind ruhig. Das Leben des Dorfes ist einfach.",
    question: "Wie lautet der Genitiv von 'das Dorf'?",
    answer: "des Dorfes",
    options: ["das Dorf", "des Dorfes", "dem Dorf", "den Dorfes"],
  },
  {
    passage: "Wegen der Erkältung bleibt sie zu Hause. Der Arzt der Klinik kommt zu Besuch. Die Gesundheit der Patientin ist wichtig.",
    passageAudio: "Wegen der Erkältung bleibt sie zu Hause. Der Arzt der Klinik kommt zu Besuch. Die Gesundheit der Patientin ist wichtig.",
    question: "Wie lautet 'wegen' + Feminin Genitiv?",
    answer: "wegen der Erkältung",
    options: ["wegen die Erkältung", "wegen dem Erkältung", "wegen der Erkältung", "wegen des Erkältung"],
  },
  {
    passage: "Das Aroma frischen Kaffees ist herrlich. Der Geschmack des Kuchens ist süß. Die Mutter des Bäckers ist stolz.",
    passageAudio: "Das Aroma frischen Kaffees ist herrlich. Der Geschmack des Kuchens ist süß. Die Mutter des Bäckers ist stolz.",
    question: "Wie lautet der Genitiv von 'der Bäcker'?",
    answer: "des Bäckers",
    options: ["der Bäcker", "des Bäckers", "dem Bäcker", "den Bäcker"],
  },
  {
    passage: "Die Hilfe der Nachbarin war wichtig. Trotz der Schwierigkeiten hat er es geschafft. Der Mut des Mannes ist bewundernswert.",
    passageAudio: "Die Hilfe der Nachbarin war wichtig. Trotz der Schwierigkeiten hat er es geschafft. Der Mut des Mannes ist bewundernswert.",
    question: "Welche Genitiv-Form steht in 'Trotz der Schwierigkeiten'?",
    answer: "der Schwierigkeiten",
    options: ["die Schwierigkeiten", "der Schwierigkeiten", "den Schwierigkeiten", "dem Schwierigkeiten"],
  },
];

/* ── ResultScreen ───────────────────────────────────────────── */
type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";
function ResultScreen({ score, total, onRestart, skill, xpEarned }: { score: number; total: number; onRestart: () => void; skill: Skill; xpEarned: number }) {
  const pct = Math.round((score / total) * 100);
  const { update } = useSession();
  useEffect(() => { saveProgress({ xp: xpEarned, skill, skillScore: pct, minutes: 10 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }); }, []);
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
  const msg = pct >= 80 ? "Harika! Genitiv'i çok iyi öğrendin." : pct >= 60 ? "İyi gidiyorsun! Biraz daha pratik yap." : "Endişelenme, tekrar çalış!";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10 px-4"
    >
      <div className="text-6xl mb-4">{emoji}</div>
      <div className="text-3xl font-extrabold text-text-primary mb-1">{score}/{total}</div>
      <div className={`text-lg font-bold mb-2 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}% doğru</div>
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

/* ── MCQExercise ────────────────────────────────────────────── */
function MCQExercise() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = mcqQuestions[idx];

  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= mcqQuestions.length) setDone(true);
      else { setIdx((i) => i + 1); setSelected(null); }
    }, 1000);
  }

  function restart() { setIdx(0); setSelected(null); setScore(0); setDone(false); }

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
        <SpeakBtn text={q.audio} />
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

/* ── SchreibenExercise ──────────────────────────────────────── */
function SchreibenExercise() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const q = writeQuestions[idx];
  const isCorrect = checked && input.trim().toLowerCase() === q.answer.toLowerCase();

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

  const parts = q.sentence.split("_____");

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
          className={`inline-block w-16 text-center border-b-2 bg-transparent outline-none px-1 transition-colors duration-200
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

/* ── LesenExercise ──────────────────────────────────────────── */
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

/* ── Main Export ────────────────────────────────────────────── */
type Tab = "mcq" | "schreiben" | "lesen";

export function PracticeSection() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("mcq");

  const tabs: { id: Tab; label: string; icon: React.ElementType; color: string; bg: string; border: string; count: number }[] = [
    { id: "mcq",       label: "Şıklı Sorular", icon: ListChecks, color: "text-amber-400",  bg: "bg-amber-500/15",  border: "border-amber-500/40",  count: 20 },
    { id: "schreiben", label: "Schreiben",      icon: PenLine,   color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/40", count: 20 },
    { id: "lesen",     label: "Lesen",          icon: BookOpen,  color: "text-sky-400",    bg: "bg-sky-500/15",    border: "border-sky-500/40",    count: 20 },
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
      <div className="flex items-center gap-3 p-5 border-b border-navy-border">
        <div className="w-9 h-9 bg-gold/15 rounded-xl flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h2 className="text-text-primary font-bold text-base">Pratik Alıştırmaları</h2>
          <p className="text-text-muted text-xs">Genitiv — 60 soru</p>
        </div>
        <button onClick={() => setOpen(false)} className="ml-auto text-text-muted hover:text-text-secondary text-xs px-3 py-1 border border-navy-border rounded-lg transition-colors">Kapat</button>
      </div>

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
