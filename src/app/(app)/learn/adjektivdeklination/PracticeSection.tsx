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
  { q: "Der ___ Mann schläft. (alt)", audio: "Der alte Mann schläft.", answer: "alte", options: ["alte", "alten", "altem", "alter"], tip: "Maskulin Nominativ → Schwach: -e" },
  { q: "Ich sehe den ___ Hund. (schwarz)", audio: "Ich sehe den schwarzen Hund.", answer: "schwarzen", options: ["schwarzen", "schwarze", "schwarzer", "schwarzem"], tip: "Maskulin Akkusativ → Schwach: -en" },
  { q: "Er hilft dem ___ Kind. (klein)", audio: "Er hilft dem kleinen Kind.", answer: "kleinen", options: ["kleinen", "kleine", "kleiner", "kleinem"], tip: "Neutrum Dativ → Schwach: -en" },
  { q: "Das ist die Tasche der ___ Frau. (jung)", audio: "Das ist die Tasche der jungen Frau.", answer: "jungen", options: ["jungen", "junge", "junger", "jungem"], tip: "Feminin Genitiv → Schwach: -en" },
  { q: "Ein ___ Mann kommt herein. (alt)", audio: "Ein alter Mann kommt herein.", answer: "alter", options: ["alter", "alte", "alten", "altem"], tip: "Maskulin Nominativ → Gemischt: -er" },
  { q: "Eine ___ Frau singt. (schön)", audio: "Eine schöne Frau singt.", answer: "schöne", options: ["schöne", "schöner", "schönen", "schönem"], tip: "Feminin Nominativ → Gemischt: -e" },
  { q: "Ein ___ Kind lacht. (klein)", audio: "Ein kleines Kind lacht.", answer: "kleines", options: ["kleines", "kleine", "kleinen", "kleinem"], tip: "Neutrum Nominativ → Gemischt: -es" },
  { q: "Ich habe einen ___ Hund. (braun)", audio: "Ich habe einen braunen Hund.", answer: "braunen", options: ["braunen", "braune", "brauner", "braunem"], tip: "Maskulin Akkusativ → Gemischt: -en" },
  { q: "Er dankt einem ___ Freund. (gut)", audio: "Er dankt einem guten Freund.", answer: "guten", options: ["guten", "gute", "guter", "gutem"], tip: "Maskulin Dativ → Gemischt: -en" },
  { q: "___ Kaffee ist lecker. (heiß)", audio: "Heißer Kaffee ist lecker.", answer: "Heißer", options: ["Heißer", "Heiße", "Heißen", "Heißem"], tip: "Maskulin Nominativ → Stark: -er" },
  { q: "___ Milch ist gesund. (frisch)", audio: "Frische Milch ist gesund.", answer: "Frische", options: ["Frische", "Frischer", "Frischen", "Frischem"], tip: "Feminin Nominativ → Stark: -e" },
  { q: "___ Brot liegt auf dem Tisch. (dunkel)", audio: "Dunkles Brot liegt auf dem Tisch.", answer: "Dunkles", options: ["Dunkles", "Dunkle", "Dunklen", "Dunklem"], tip: "Neutrum Nominativ → Stark: -es" },
  { q: "Er trinkt ___ Tee. (kalt)", audio: "Er trinkt kalten Tee.", answer: "kalten", options: ["kalten", "kalte", "kalter", "kaltem"], tip: "Maskulin Akkusativ → Stark: -en" },
  { q: "Sie trägt ___ Kleidung. (elegant)", audio: "Sie trägt elegante Kleidung.", answer: "elegante", options: ["elegante", "eleganten", "eleganter", "elegantem"], tip: "Feminin Akkusativ → Stark: -e" },
  { q: "Das Haus ist aus ___ Holz. (alt)", audio: "Das Haus ist aus altem Holz.", answer: "altem", options: ["altem", "alte", "alten", "alter"], tip: "Neutrum Dativ → Stark: -em" },
  { q: "Die ___ Bücher liegen auf dem Tisch. (alt)", audio: "Die alten Bücher liegen auf dem Tisch.", answer: "alten", options: ["alten", "alte", "alter", "altem"], tip: "Plural Nominativ → Schwach: -en" },
  { q: "Mein ___ Bruder kommt. (groß)", audio: "Mein großer Bruder kommt.", answer: "großer", options: ["großer", "große", "großen", "großem"], tip: "Maskulin Nominativ → Gemischt (mein): -er" },
  { q: "Sie liebt ihr ___ Kind. (klein)", audio: "Sie liebt ihr kleines Kind.", answer: "kleines", options: ["kleines", "kleine", "kleinen", "kleinem"], tip: "Neutrum Akkusativ → Gemischt (ihr): -es" },
  { q: "Er spricht mit ___ Mut. (groß)", audio: "Er spricht mit großem Mut.", answer: "großem", options: ["großem", "große", "großen", "großer"], tip: "Maskulin Dativ → Stark: -em" },
  { q: "Das Aroma ___ Kaffees ist gut. (frisch)", audio: "Das Aroma frischen Kaffees ist gut.", answer: "frischen", options: ["frischen", "frische", "frischer", "frischem"], tip: "Maskulin Genitiv → Stark: -en" },
];

/* ── Schreiben Questions (20) ───────────────────────────────── */
type WriteQ = { sentence: string; audio: string; answer: string; hint: string };

const writeQuestions: WriteQ[] = [
  { sentence: "Der _____ Mann liest gern. (alt)", audio: "Der alte Mann liest gern.", answer: "alte", hint: "Schwach – Mask. Nom. → -e" },
  { sentence: "Die _____ Frau singt schön. (schön)", audio: "Die schöne Frau singt schön.", answer: "schöne", hint: "Schwach – Fem. Nom. → -e" },
  { sentence: "Das _____ Kind schläft. (klein)", audio: "Das kleine Kind schläft.", answer: "kleine", hint: "Schwach – Neu. Nom. → -e" },
  { sentence: "Ich sehe den _____ Hund. (schwarz)", audio: "Ich sehe den schwarzen Hund.", answer: "schwarzen", hint: "Schwach – Mask. Akk. → -en" },
  { sentence: "Er hilft der _____ Frau. (alt)", audio: "Er hilft der alten Frau.", answer: "alten", hint: "Schwach – Fem. Dat. → -en" },
  { sentence: "Wir spielen mit dem _____ Kind. (klein)", audio: "Wir spielen mit dem kleinen Kind.", answer: "kleinen", hint: "Schwach – Neu. Dat. → -en" },
  { sentence: "Ein _____ Mann wartet. (jung)", audio: "Ein junger Mann wartet.", answer: "junger", hint: "Gemischt – Mask. Nom. → -er" },
  { sentence: "Eine _____ Frau lacht. (nett)", audio: "Eine nette Frau lacht.", answer: "nette", hint: "Gemischt – Fem. Nom. → -e" },
  { sentence: "Ein _____ Auto steht dort. (neu)", audio: "Ein neues Auto steht dort.", answer: "neues", hint: "Gemischt – Neu. Nom. → -es" },
  { sentence: "Ich habe einen _____ Freund. (gut)", audio: "Ich habe einen guten Freund.", answer: "guten", hint: "Gemischt – Mask. Akk. → -en" },
  { sentence: "Sie kauft ein _____ Kleid. (rot)", audio: "Sie kauft ein rotes Kleid.", answer: "rotes", hint: "Gemischt – Neu. Akk. → -es" },
  { sentence: "Wir danken einem _____ Lehrer. (nett)", audio: "Wir danken einem netten Lehrer.", answer: "netten", hint: "Gemischt – Mask. Dat. → -en" },
  { sentence: "_____ Kaffee schmeckt gut. (heiß)", audio: "Heißer Kaffee schmeckt gut.", answer: "Heißer", hint: "Stark – Mask. Nom. → -er" },
  { sentence: "_____ Milch ist lecker. (kalt)", audio: "Kalte Milch ist lecker.", answer: "Kalte", hint: "Stark – Fem. Nom. → -e" },
  { sentence: "_____ Wasser ist wichtig. (frisch)", audio: "Frisches Wasser ist wichtig.", answer: "Frisches", hint: "Stark – Neu. Nom. → -es" },
  { sentence: "Er trinkt _____ Saft. (frisch)", audio: "Er trinkt frischen Saft.", answer: "frischen", hint: "Stark – Mask. Akk. → -en" },
  { sentence: "Sie kocht mit _____ Öl. (kalt)", audio: "Sie kocht mit kaltem Öl.", answer: "kaltem", hint: "Stark – Neu. Dat. → -em" },
  { sentence: "Das Parfüm _____ Kaffees ist stark. (frisch)", audio: "Das Parfüm frischen Kaffees ist stark.", answer: "frischen", hint: "Stark – Mask. Gen. → -en" },
  { sentence: "Es gibt viele _____ Möglichkeiten. (gut)", audio: "Es gibt viele gute Möglichkeiten.", answer: "gute", hint: "Stark – Plural Akk. → -e" },
  { sentence: "Die Stimme _____ Milch ist süß. (frisch)", audio: "Die Stimme frischer Milch ist süß.", answer: "frischer", hint: "Stark – Fem. Gen. → -er" },
];

/* ── Lesen Passages (20) ────────────────────────────────────── */
type ReadQ = { passage: string; passageAudio: string; question: string; answer: string; options: string[] };

const readPassages: ReadQ[] = [
  {
    passage: "Der alte Mann liest jeden Morgen die Zeitung. Er trinkt dabei heißen Kaffee. Die frische Luft tut ihm gut.",
    passageAudio: "Der alte Mann liest jeden Morgen die Zeitung. Er trinkt dabei heißen Kaffee. Die frische Luft tut ihm gut.",
    question: "Was trinkt der alte Mann?",
    answer: "heißen Kaffee",
    options: ["heißer Kaffee", "heißen Kaffee", "heißem Kaffee", "heiße Kaffee"],
  },
  {
    passage: "Eine schöne Frau geht in den Park. Sie trägt ein rotes Kleid. Viele Menschen schauen sie an.",
    passageAudio: "Eine schöne Frau geht in den Park. Sie trägt ein rotes Kleid. Viele Menschen schauen sie an.",
    question: "Was trägt die schöne Frau?",
    answer: "ein rotes Kleid",
    options: ["ein rotes Kleid", "ein rote Kleid", "einen roten Kleid", "ein rotem Kleid"],
  },
  {
    passage: "Frisches Brot liegt auf dem Tisch. Die Kinder essen das frische Brot gern. Die Mutter backt es jeden Tag.",
    passageAudio: "Frisches Brot liegt auf dem Tisch. Die Kinder essen das frische Brot gern. Die Mutter backt es jeden Tag.",
    question: "Wie ist das Brot?",
    answer: "frisch",
    options: ["alt", "frisch", "trocken", "hart"],
  },
  {
    passage: "Er hilft dem kleinen Kind. Das Kind trägt eine schwere Tasche. Der nette Mann trägt sie bis nach Hause.",
    passageAudio: "Er hilft dem kleinen Kind. Das Kind trägt eine schwere Tasche. Der nette Mann trägt sie bis nach Hause.",
    question: "Welche Form von 'klein' steht im Text (Neutrum Dativ)?",
    answer: "kleinen",
    options: ["kleine", "kleinen", "kleiner", "kleines"],
  },
  {
    passage: "Mein großer Bruder studiert in Berlin. Er wohnt in einer kleinen Wohnung. Die alte Stadt gefällt ihm sehr.",
    passageAudio: "Mein großer Bruder studiert in Berlin. Er wohnt in einer kleinen Wohnung. Die alte Stadt gefällt ihm sehr.",
    question: "Wie wird 'groß' nach 'mein' (Mask. Nom.) gebeugt?",
    answer: "großer",
    options: ["große", "großen", "großem", "großer"],
  },
  {
    passage: "Kalte Milch und frisches Brot — das mag ich zum Frühstück. Meine Mutter kauft immer frische Produkte.",
    passageAudio: "Kalte Milch und frisches Brot — das mag ich zum Frühstück. Meine Mutter kauft immer frische Produkte.",
    question: "Welche Endung hat 'kalt' in 'kalte Milch' (Fem. Nom. ohne Artikel)?",
    answer: "-e",
    options: ["-er", "-e", "-es", "-en"],
  },
  {
    passage: "Die alten Bücher liegen auf dem Regal. Er liest die interessanten Bücher gerne. Er kauft viele neue Bücher.",
    passageAudio: "Die alten Bücher liegen auf dem Regal. Er liest die interessanten Bücher gerne. Er kauft viele neue Bücher.",
    question: "Welche Endung haben Adjektive im Plural nach dem bestimmten Artikel?",
    answer: "-en",
    options: ["-e", "-er", "-en", "-em"],
  },
  {
    passage: "Ein junger Mann und eine nette Frau treffen sich im Café. Sie trinken heißen Kaffee und essen frischen Kuchen.",
    passageAudio: "Ein junger Mann und eine nette Frau treffen sich im Café. Sie trinken heißen Kaffee und essen frischen Kuchen.",
    question: "Wie wird 'jung' nach 'ein' (Mask. Nom.) gebeugt?",
    answer: "junger",
    options: ["junge", "jungen", "junger", "jungem"],
  },
  {
    passage: "Sie trägt eine elegante Jacke. Die neue Jacke hat sie gestern gekauft. Alle mögen die moderne Farbe.",
    passageAudio: "Sie trägt eine elegante Jacke. Die neue Jacke hat sie gestern gekauft. Alle mögen die moderne Farbe.",
    question: "Welche Endung hat 'elegant' nach 'eine' (Fem. Akk.)?",
    answer: "-e",
    options: ["-er", "-e", "-en", "-em"],
  },
  {
    passage: "Das Haus ist aus altem Holz gebaut. Es gibt viele alte Häuser in dieser Stadt. Altes Holz ist sehr stabil.",
    passageAudio: "Das Haus ist aus altem Holz gebaut. Es gibt viele alte Häuser in dieser Stadt. Altes Holz ist sehr stabil.",
    question: "Wie lautet 'alt' in 'aus altem Holz' (Neu. Dativ ohne Artikel)?",
    answer: "altem",
    options: ["alte", "alten", "altem", "alter"],
  },
  {
    passage: "Er bedankt sich bei seiner netten Lehrerin. Die erfahrene Lehrerin hat ihm viel geholfen. Er schreibt ihr einen langen Brief.",
    passageAudio: "Er bedankt sich bei seiner netten Lehrerin. Die erfahrene Lehrerin hat ihm viel geholfen. Er schreibt ihr einen langen Brief.",
    question: "Wie wird 'lang' in 'einen langen Brief' (Mask. Akk. nach einem) gebeugt?",
    answer: "langen",
    options: ["lange", "langen", "langem", "langer"],
  },
  {
    passage: "Frischer Orangensaft ist sehr lecker. Sie trinkt jeden Morgen frischen Saft. Der frische Geschmack macht sie wach.",
    passageAudio: "Frischer Orangensaft ist sehr lecker. Sie trinkt jeden Morgen frischen Saft. Der frische Geschmack macht sie wach.",
    question: "Welche Form ist 'frisch' im ersten Satz (Mask. Nom. ohne Artikel)?",
    answer: "Frischer",
    options: ["Frische", "Frischen", "Frischer", "Frischem"],
  },
  {
    passage: "Das alte Schloss liegt außerhalb der Stadt. Es gibt viele interessante alte Gebäude dort. Touristen besuchen das schöne Schloss.",
    passageAudio: "Das alte Schloss liegt außerhalb der Stadt. Es gibt viele interessante alte Gebäude dort. Touristen besuchen das schöne Schloss.",
    question: "Welche Endung hat 'alt' in 'das alte Schloss' (Neu. Nom. nach dem bestimmten Artikel)?",
    answer: "-e",
    options: ["-e", "-en", "-er", "-es"],
  },
  {
    passage: "Wegen des starken Regens blieben wir zu Hause. Das kleine Kind spielte drinnen. Wir tranken warmen Tee.",
    passageAudio: "Wegen des starken Regens blieben wir zu Hause. Das kleine Kind spielte drinnen. Wir tranken warmen Tee.",
    question: "Wie lautet 'warm' in 'warmen Tee' (Mask. Akk. ohne Artikel)?",
    answer: "warmen",
    options: ["warme", "warmen", "warmem", "warmer"],
  },
  {
    passage: "Die jungen Studenten lernen fleißig Deutsch. Sie lesen viele interessante Bücher. Die netten Professoren helfen ihnen.",
    passageAudio: "Die jungen Studenten lernen fleißig Deutsch. Sie lesen viele interessante Bücher. Die netten Professoren helfen ihnen.",
    question: "Welche Endung haben Adjektive nach 'die' im Plural (Nom.)?",
    answer: "-en",
    options: ["-e", "-er", "-en", "-em"],
  },
  {
    passage: "Meine kleine Schwester mag keine saure Milch. Sie trinkt lieber frischen Saft. Die frische Luft macht sie auch glücklich.",
    passageAudio: "Meine kleine Schwester mag keine saure Milch. Sie trinkt lieber frischen Saft. Die frische Luft macht sie auch glücklich.",
    question: "Wie wird 'klein' nach 'meine' (Fem. Nom.) gebeugt?",
    answer: "kleine",
    options: ["kleiner", "kleine", "kleines", "kleinen"],
  },
  {
    passage: "Er arbeitet mit großem Eifer. Der fleißige Student macht alles sorgfältig. Seine guten Noten zeigen das.",
    passageAudio: "Er arbeitet mit großem Eifer. Der fleißige Student macht alles sorgfältig. Seine guten Noten zeigen das.",
    question: "Wie lautet 'groß' in 'mit großem Eifer' (Mask. Dat. ohne Artikel)?",
    answer: "großem",
    options: ["großen", "großem", "große", "großer"],
  },
  {
    passage: "Das Aroma frischen Kaffees ist unwiderstehlich. Er kauft immer frischen Kaffee. Guter Kaffee macht ihn glücklich.",
    passageAudio: "Das Aroma frischen Kaffees ist unwiderstehlich. Er kauft immer frischen Kaffee. Guter Kaffee macht ihn glücklich.",
    question: "Wie wird 'gut' in 'Guter Kaffee' (Stark – Mask. Nom.) gebeugt?",
    answer: "Guter",
    options: ["Gute", "Guten", "Guter", "Gutem"],
  },
  {
    passage: "Die Farbe frischer Blumen ist wunderschön. Bunte Blumen stehen im Zimmer. Die schöne Vase gehört meiner Mutter.",
    passageAudio: "Die Farbe frischer Blumen ist wunderschön. Bunte Blumen stehen im Zimmer. Die schöne Vase gehört meiner Mutter.",
    question: "Welche Endung hat 'bunt' in 'bunte Blumen' (Plural Nom. ohne Artikel)?",
    answer: "-e",
    options: ["-e", "-en", "-er", "-em"],
  },
  {
    passage: "Ein kleines Kind spielt im Garten. Das Kind hat einen kleinen Hund. Sie spielen zusammen im grünen Gras.",
    passageAudio: "Ein kleines Kind spielt im Garten. Das Kind hat einen kleinen Hund. Sie spielen zusammen im grünen Gras.",
    question: "Wie wird 'klein' in 'ein kleines Kind' (Gemischt – Neu. Nom.) gebeugt?",
    answer: "kleines",
    options: ["kleine", "kleinen", "kleinem", "kleines"],
  },
];

/* ── ResultScreen ───────────────────────────────────────────── */
type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";
function ResultScreen({ score, total, onRestart, skill, xpEarned }: { score: number; total: number; onRestart: () => void; skill: Skill; xpEarned: number }) {
  const pct = Math.round((score / total) * 100);
  const { update } = useSession();
  useEffect(() => { saveProgress({ xp: xpEarned, skill, skillScore: pct, minutes: 10 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }); }, []);
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
  const msg = pct >= 80 ? "Harika! Adjektivdeklination'ı çok iyi öğrendin." : pct >= 60 ? "İyi gidiyorsun! Biraz daha pratik yap." : "Endişelenme, tabloları tekrar incele!";
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
          className={`inline-block w-24 text-center border-b-2 bg-transparent outline-none px-1 transition-colors duration-200
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
          <p className="text-text-muted text-xs">Adjektivdeklination — 60 soru</p>
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
