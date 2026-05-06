"use client";

import { useState, useEffect } from "react";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine, ListChecks, BookOpen, ChevronRight, RotateCcw,
  Trophy, CheckCircle2, XCircle, Dumbbell,
} from "lucide-react";
import { SpeakBtn } from "../akkusativ-dativ/PracticeSection";

type MCQ   = { q: string; audio: string; answer: string; options: string[]; tip: string };
type WriteQ = { sentence: string; audio: string; answer: string; hint: string };
type ReadQ  = { passage: string; passageAudio: string; question: string; answer: string; options: string[] };

const mcqQuestions: MCQ[] = [
  { q: "Ich ___ gestern nach Berlin gefahren. (Perfekt – fahren)", audio: "Ich bin gestern nach Berlin gefahren.", answer: "bin", options: ["habe", "bin", "war", "hatte"], tip: "fahren → Bewegung → 'sein' ile Perfekt" },
  { q: "Er ___ das Buch gelesen. (Perfekt – lesen)", audio: "Er hat das Buch gelesen.", answer: "hat", options: ["ist", "hat", "war", "hatte"], tip: "lesen → 'haben' ile Perfekt (geçişli fiil)" },
  { q: "Wir ___ im Restaurant gegessen. (Perfekt – essen)", audio: "Wir haben im Restaurant gegessen.", answer: "haben", options: ["sind", "haben", "waren", "hatten"], tip: "essen → 'haben' ile Perfekt" },
  { q: "Sie ___ früh aufgestanden. (Perfekt – aufstehen)", audio: "Sie ist früh aufgestanden.", answer: "ist", options: ["hat", "ist", "hatte", "war"], tip: "aufstehen → hal değişimi → 'sein' ile Perfekt" },
  { q: "Das Kind ___ eingeschlafen. (Perfekt – einschlafen)", audio: "Das Kind ist eingeschlafen.", answer: "ist", options: ["hat", "ist", "hatte", "war"], tip: "einschlafen → hal değişimi → 'sein'" },
  { q: "Ich ___ einen Brief geschrieben. (Perfekt – schreiben)", audio: "Ich habe einen Brief geschrieben.", answer: "habe", options: ["bin", "habe", "war", "hatte"], tip: "schreiben → 'haben' ile Perfekt" },
  { q: "Er ___ zu spät gekommen. (Perfekt – kommen)", audio: "Er ist zu spät gekommen.", answer: "ist", options: ["hat", "ist", "hatte", "war"], tip: "kommen → Bewegung → 'sein'" },
  { q: "Wir ___ viel Spaß gehabt. (Perfekt – haben)", audio: "Wir haben viel Spaß gehabt.", answer: "haben", options: ["sind", "haben", "waren", "hatten"], tip: "haben → 'haben' ile Perfekt" },
  { q: "Er ___ Arzt. (Präteritum – sein)", audio: "Er war Arzt.", answer: "war", options: ["ist", "war", "hat", "hatte"], tip: "sein → Yazı dilinde Präteritum: war" },
  { q: "Wir ___ keine Zeit. (Präteritum – haben)", audio: "Wir hatten keine Zeit.", answer: "hatten", options: ["haben", "hatten", "sind", "waren"], tip: "haben → Yazı dilinde Präteritum: hatten" },
  { q: "Sie ___ nach Hause gegangen. (Perfekt – gehen)", audio: "Sie ist nach Hause gegangen.", answer: "ist", options: ["hat", "ist", "hatte", "war"], tip: "gehen → Bewegung → 'sein'" },
  { q: "Ich ___ Musik gehört. (Perfekt – hören)", audio: "Ich habe Musik gehört.", answer: "habe", options: ["bin", "habe", "war", "hatte"], tip: "hören → 'haben' ile Perfekt" },
  { q: "Er ___ krank gewesen. (Perfekt – sein)", audio: "Er ist krank gewesen.", answer: "ist", options: ["hat", "ist", "hatte", "war"], tip: "sein → Perfekt: ist … gewesen" },
  { q: "Das Wetter ___ schön. (Präteritum – sein)", audio: "Das Wetter war schön.", answer: "war", options: ["ist", "war", "hat", "hatte"], tip: "sein → Yazı dilinde Präteritum: war" },
  { q: "Ich ___ Kaffee getrunken. (Perfekt – trinken)", audio: "Ich habe Kaffee getrunken.", answer: "habe", options: ["bin", "habe", "war", "hatte"], tip: "trinken → 'haben' ile Perfekt" },
  { q: "Sie ___ viel gearbeitet. (Perfekt – arbeiten)", audio: "Sie hat viel gearbeitet.", answer: "hat", options: ["ist", "hat", "war", "hatte"], tip: "arbeiten → 'haben' ile Perfekt" },
  { q: "Wir ___ im Stau gestanden. (Perfekt – stehen)", audio: "Wir haben im Stau gestanden.", answer: "haben", options: ["sind", "haben", "waren", "hatten"], tip: "stehen → 'haben' ile Perfekt (statik)" },
  { q: "Er ___ ins Kino gegangen. (Perfekt – gehen)", audio: "Er ist ins Kino gegangen.", answer: "ist", options: ["hat", "ist", "hatte", "war"], tip: "gehen → Bewegung → 'sein'" },
  { q: "Ich ___ Hunger gehabt. (Perfekt – haben)", audio: "Ich habe Hunger gehabt.", answer: "habe", options: ["bin", "habe", "war", "hatte"], tip: "haben → 'haben' ile Perfekt" },
  { q: "Sie ___ gestern müde. (Präteritum – sein)", audio: "Sie war gestern müde.", answer: "war", options: ["ist", "war", "hat", "hatte"], tip: "sein → Yazı dilinde Präteritum: war" },
];

const writeQuestions: WriteQ[] = [
  { sentence: "Ich ___ gestern ins Kino gegangen. (sein/Perfekt)", audio: "Ich bin gestern ins Kino gegangen.", answer: "bin", hint: "gehen → Bewegung → 'sein' ile Perfekt → bin" },
  { sentence: "Er ___ das Buch gelesen. (haben/Perfekt)", audio: "Er hat das Buch gelesen.", answer: "hat", hint: "lesen → 'haben' ile Perfekt → hat" },
  { sentence: "Wir ___ nach Berlin geflogen. (sein/Perfekt)", audio: "Wir sind nach Berlin geflogen.", answer: "sind", hint: "fliegen → Bewegung → 'sein' → sind" },
  { sentence: "Sie ___ Musik gehört. (haben/Perfekt)", audio: "Sie hat Musik gehört.", answer: "hat", hint: "hören → 'haben' → hat" },
  { sentence: "Das Kind ___ eingeschlafen. (sein/Perfekt)", audio: "Das Kind ist eingeschlafen.", answer: "ist", hint: "einschlafen → 'sein' → ist" },
  { sentence: "Ich ___ einen Brief geschrieben. (haben/Perfekt)", audio: "Ich habe einen Brief geschrieben.", answer: "habe", hint: "schreiben → 'haben' → habe" },
  { sentence: "Er ___ Arzt. (sein/Präteritum)", audio: "Er war Arzt.", answer: "war", hint: "sein → Präteritum → war" },
  { sentence: "Wir ___ keine Zeit. (haben/Präteritum)", audio: "Wir hatten keine Zeit.", answer: "hatten", hint: "haben → Präteritum → hatten" },
  { sentence: "Sie ___ früh aufgestanden. (sein/Perfekt)", audio: "Sie ist früh aufgestanden.", answer: "ist", hint: "aufstehen → 'sein' → ist" },
  { sentence: "Ich ___ Kaffee getrunken. (haben/Perfekt)", audio: "Ich habe Kaffee getrunken.", answer: "habe", hint: "trinken → 'haben' → habe" },
  { sentence: "Er ___ zu spät gekommen. (sein/Perfekt)", audio: "Er ist zu spät gekommen.", answer: "ist", hint: "kommen → Bewegung → 'sein' → ist" },
  { sentence: "Wir ___ viel Spaß gehabt. (haben/Perfekt)", audio: "Wir haben viel Spaß gehabt.", answer: "haben", hint: "haben → 'haben' → haben" },
  { sentence: "Das Wetter ___ sehr schön. (sein/Präteritum)", audio: "Das Wetter war sehr schön.", answer: "war", hint: "sein → Präteritum → war" },
  { sentence: "Sie ___ viel gearbeitet. (haben/Perfekt)", audio: "Sie hat viel gearbeitet.", answer: "hat", hint: "arbeiten → 'haben' → hat" },
  { sentence: "Ich ___ krank gewesen. (sein/Perfekt)", audio: "Ich bin krank gewesen.", answer: "bin", hint: "sein → Perfekt → bin … gewesen" },
  { sentence: "Er ___ im Park gelaufen. (sein/Perfekt)", audio: "Er ist im Park gelaufen.", answer: "ist", hint: "laufen → Bewegung → 'sein' → ist" },
  { sentence: "Wir ___ im Restaurant gegessen. (haben/Perfekt)", audio: "Wir haben im Restaurant gegessen.", answer: "haben", hint: "essen → 'haben' → haben" },
  { sentence: "Sie ___ gestern müde. (sein/Präteritum)", audio: "Sie war gestern müde.", answer: "war", hint: "sein → Präteritum → war" },
  { sentence: "Ich ___ Hunger gehabt. (haben/Perfekt)", audio: "Ich habe Hunger gehabt.", answer: "habe", hint: "haben → 'haben' → habe" },
  { sentence: "Er ___ spät nach Hause gekommen. (sein/Perfekt)", audio: "Er ist spät nach Hause gekommen.", answer: "ist", hint: "kommen → 'sein' → ist" },
];

const readPassages: ReadQ[] = [
  {
    passage: "Gestern bin ich früh aufgestanden. Ich habe Kaffee getrunken und dann bin ich zur Arbeit gefahren. Die Arbeit war sehr stressig.",
    passageAudio: "Gestern bin ich früh aufgestanden. Ich habe Kaffee getrunken und dann bin ich zur Arbeit gefahren. Die Arbeit war sehr stressig.",
    question: "Wie war die Arbeit?",
    answer: "stressig",
    options: ["schön", "stressig", "langweilig", "interessant"],
  },
  {
    passage: "Als Kind war Maria sehr sportlich. Sie hat jeden Tag Fußball gespielt. Ihr Bruder hat ihr das Fußballspielen beigebracht.",
    passageAudio: "Als Kind war Maria sehr sportlich. Sie hat jeden Tag Fußball gespielt. Ihr Bruder hat ihr das Fußballspielen beigebracht.",
    question: "Wer hat Maria das Fußballspielen beigebracht?",
    answer: "ihr Bruder",
    options: ["ihre Mutter", "ihr Bruder", "ihr Freund", "ihre Lehrerin"],
  },
  {
    passage: "Tom ist letztes Jahr nach Deutschland gezogen. Er hat dort Deutsch gelernt und viele neue Freunde gefunden.",
    passageAudio: "Tom ist letztes Jahr nach Deutschland gezogen. Er hat dort Deutsch gelernt und viele neue Freunde gefunden.",
    question: "Was hat Tom in Deutschland gemacht?",
    answer: "Deutsch gelernt",
    options: ["Englisch gelernt", "Deutsch gelernt", "Musik gemacht", "Sport getrieben"],
  },
  {
    passage: "Wir haben gestern Abend ein schönes Restaurant besucht. Das Essen hat uns sehr gut geschmeckt. Danach sind wir ins Kino gegangen.",
    passageAudio: "Wir haben gestern Abend ein schönes Restaurant besucht. Das Essen hat uns sehr gut geschmeckt. Danach sind wir ins Kino gegangen.",
    question: "Wohin sind sie nach dem Essen gegangen?",
    answer: "ins Kino",
    options: ["nach Hause", "ins Kino", "in die Bar", "in den Park"],
  },
  {
    passage: "Früher hatte er viel Zeit für Hobbys. Er war oft im Park und hat Bücher gelesen. Heute hat er leider keine Zeit mehr.",
    passageAudio: "Früher hatte er viel Zeit für Hobbys. Er war oft im Park und hat Bücher gelesen. Heute hat er leider keine Zeit mehr.",
    question: "Was hat er im Park gemacht?",
    answer: "Bücher gelesen",
    options: ["Sport getrieben", "Bücher gelesen", "Musik gehört", "Freunde getroffen"],
  },
  {
    passage: "Lisa hat gestern eine E-Mail geschrieben. Sie hat ihrem Chef erklärt, warum sie krank gewesen ist.",
    passageAudio: "Lisa hat gestern eine E-Mail geschrieben. Sie hat ihrem Chef erklärt, warum sie krank gewesen ist.",
    question: "Was hat Lisa geschrieben?",
    answer: "eine E-Mail",
    options: ["einen Brief", "eine E-Mail", "ein Buch", "einen Bericht"],
  },
  {
    passage: "Die Kinder sind gestern mit dem Bus in die Schule gefahren. Der Unterricht hat um 8 Uhr angefangen.",
    passageAudio: "Die Kinder sind gestern mit dem Bus in die Schule gefahren. Der Unterricht hat um 8 Uhr angefangen.",
    question: "Wann hat der Unterricht angefangen?",
    answer: "um 8 Uhr",
    options: ["um 7 Uhr", "um 8 Uhr", "um 9 Uhr", "um 10 Uhr"],
  },
  {
    passage: "Er war als Kind sehr schüchtern. Er hat wenig gesprochen und viel gelesen. Als Erwachsener ist er ganz anders geworden.",
    passageAudio: "Er war als Kind sehr schüchtern. Er hat wenig gesprochen und viel gelesen. Als Erwachsener ist er ganz anders geworden.",
    question: "Wie war er als Kind?",
    answer: "schüchtern",
    options: ["laut", "schüchtern", "lustig", "sportlich"],
  },
  {
    passage: "Wir sind letzten Sommer ans Meer gefahren. Wir haben viel geschwommen und am Strand gelegen.",
    passageAudio: "Wir sind letzten Sommer ans Meer gefahren. Wir haben viel geschwommen und am Strand gelegen.",
    question: "Wohin sind sie gefahren?",
    answer: "ans Meer",
    options: ["in die Berge", "ans Meer", "in die Stadt", "nach Hause"],
  },
  {
    passage: "Sie hat das Konzert sehr genossen. Die Musik war wunderschön und die Sängerin hat fantastisch gesungen.",
    passageAudio: "Sie hat das Konzert sehr genossen. Die Musik war wunderschön und die Sängerin hat fantastisch gesungen.",
    question: "Wie hat die Sängerin gesungen?",
    answer: "fantastisch",
    options: ["schlecht", "okay", "fantastisch", "laut"],
  },
  {
    passage: "Als ich klein war, hatte ich einen Hund. Der Hund hieß Max und war sehr treu. Er ist leider mit 12 Jahren gestorben.",
    passageAudio: "Als ich klein war, hatte ich einen Hund. Der Hund hieß Max und war sehr treu. Er ist leider mit 12 Jahren gestorben.",
    question: "Wie hieß der Hund?",
    answer: "Max",
    options: ["Rex", "Max", "Bello", "Finn"],
  },
  {
    passage: "Peter ist heute Morgen aufgewacht und hat gemerkt, dass er Fieber hat. Er ist dann zum Arzt gegangen.",
    passageAudio: "Peter ist heute Morgen aufgewacht und hat gemerkt, dass er Fieber hat. Er ist dann zum Arzt gegangen.",
    question: "Wohin ist Peter gegangen?",
    answer: "zum Arzt",
    options: ["nach Hause", "zum Arzt", "in die Apotheke", "ins Krankenhaus"],
  },
  {
    passage: "Wir haben das neue Café in der Stadtmitte besucht. Der Kaffee war ausgezeichnet und die Atmosphäre war gemütlich.",
    passageAudio: "Wir haben das neue Café in der Stadtmitte besucht. Der Kaffee war ausgezeichnet und die Atmosphäre war gemütlich.",
    question: "Wie war die Atmosphäre?",
    answer: "gemütlich",
    options: ["laut", "gemütlich", "stressig", "langweilig"],
  },
  {
    passage: "Anna hat letztes Jahr ihren Führerschein gemacht. Seitdem fährt sie jeden Tag mit dem Auto zur Arbeit.",
    passageAudio: "Anna hat letztes Jahr ihren Führerschein gemacht. Seitdem fährt sie jeden Tag mit dem Auto zur Arbeit.",
    question: "Was hat Anna letztes Jahr gemacht?",
    answer: "ihren Führerschein",
    options: ["ihre Prüfung", "ihren Führerschein", "einen Kurs", "ihren Job"],
  },
  {
    passage: "Der Film hat drei Stunden gedauert. Danach bin ich sehr müde nach Hause gegangen.",
    passageAudio: "Der Film hat drei Stunden gedauert. Danach bin ich sehr müde nach Hause gegangen.",
    question: "Wie lange hat der Film gedauert?",
    answer: "drei Stunden",
    options: ["zwei Stunden", "drei Stunden", "vier Stunden", "eine Stunde"],
  },
  {
    passage: "Im letzten Winter hatte es viel geschneit. Die Kinder haben draußen gespielt und Schneemänner gebaut.",
    passageAudio: "Im letzten Winter hatte es viel geschneit. Die Kinder haben draußen gespielt und Schneemänner gebaut.",
    question: "Was haben die Kinder gebaut?",
    answer: "Schneemänner",
    options: ["Sandburgen", "Schneemänner", "Häuser", "Autos"],
  },
  {
    passage: "Sie hat eine neue Sprache gelernt. Sie ist jeden Abend zum Sprachkurs gegangen und hat viel geübt.",
    passageAudio: "Sie hat eine neue Sprache gelernt. Sie ist jeden Abend zum Sprachkurs gegangen und hat viel geübt.",
    question: "Wohin ist sie jeden Abend gegangen?",
    answer: "zum Sprachkurs",
    options: ["zum Sport", "zum Sprachkurs", "ins Theater", "zur Arbeit"],
  },
  {
    passage: "Er hat früher in München gewohnt. Vor zwei Jahren ist er nach Berlin umgezogen.",
    passageAudio: "Er hat früher in München gewohnt. Vor zwei Jahren ist er nach Berlin umgezogen.",
    question: "Wo hat er früher gewohnt?",
    answer: "in München",
    options: ["in Berlin", "in München", "in Hamburg", "in Wien"],
  },
  {
    passage: "Die Studenten haben die Prüfung gut bestanden. Sie hatten viel gelernt und waren gut vorbereitet.",
    passageAudio: "Die Studenten haben die Prüfung gut bestanden. Sie hatten viel gelernt und waren gut vorbereitet.",
    question: "Wie haben die Studenten die Prüfung bestanden?",
    answer: "gut",
    options: ["schlecht", "gut", "knapp", "gar nicht"],
  },
  {
    passage: "Ich bin gestern Abend spät ins Bett gegangen. Ich habe einen Film geschaut und dabei eingeschlafen.",
    passageAudio: "Ich bin gestern Abend spät ins Bett gegangen. Ich habe einen Film geschaut und dabei eingeschlafen.",
    question: "Was habe ich geschaut?",
    answer: "einen Film",
    options: ["eine Serie", "einen Film", "ein Konzert", "ein Spiel"],
  },
];

type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";
function ResultScreen({ score, total, onRestart, skill, xpEarned }: { score: number; total: number; onRestart: () => void; skill: Skill; xpEarned: number }) {
  const pct = Math.round((score / total) * 100);
  const { update } = useSession();
  useEffect(() => { saveProgress({ xp: xpEarned, skill, skillScore: pct, minutes: 10 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }); }, []);
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
  const msg = pct >= 80 ? "Harika! Konuyu çok iyi öğrendin." : pct >= 60 ? "İyi gidiyorsun! Biraz daha pratik yap." : "Endişelenme, tekrar çalış!";
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 px-4">
      <div className="text-6xl mb-4">{emoji}</div>
      <div className="text-3xl font-extrabold text-text-primary mb-1">{score}/{total}</div>
      <div className={`text-lg font-bold mb-2 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</div>
      <p className="text-text-secondary text-sm mb-8">{msg}</p>
      <div className="w-full bg-navy-border rounded-full h-3 max-w-xs mx-auto mb-8">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-3 rounded-full ${pct >= 80 ? "bg-green-400" : pct >= 60 ? "bg-yellow-400" : "bg-red-400"}`} />
      </div>
      <button onClick={onRestart} className="inline-flex items-center gap-2 px-6 py-3 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors">
        <RotateCcw className="w-4 h-4" /> Tekrar Dene
      </button>
    </motion.div>
  );
}

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
    <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-muted">{idx + 1}/{mcqQuestions.length}</span>
        <span className="text-xs font-semibold text-gold">{score} puan</span>
      </div>
      <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(idx / mcqQuestions.length) * 100}%` }} />
      </div>
      <div className="flex items-center gap-2 mb-5">
        <p className="text-text-primary font-semibold text-sm leading-relaxed flex-1">{q.q}</p>
        <SpeakBtn text={q.audio} />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {q.options.map((opt) => {
          const isCorrect = opt === q.answer, isSel = opt === selected;
          let cls = "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
          if (selected) {
            if (isCorrect) cls = "bg-green-500/20 border-green-500/50 text-green-400";
            else if (isSel) cls = "bg-red-500/20 border-red-500/50 text-red-400";
            else cls = "bg-navy border-navy-border text-text-muted opacity-40";
          }
          return (
            <motion.button key={opt} onClick={() => choose(opt)}
              whileHover={!selected ? { scale: 1.03 } : {}}
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

function SchreibenExercise() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const q = writeQuestions[idx];
  const isCorrect = checked && input.trim().toLowerCase() === q.answer.toLowerCase();

  function check() { if (!input.trim()) return; setChecked(true); if (input.trim().toLowerCase() === q.answer.toLowerCase()) setScore((s) => s + 1); }
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
        <span className="text-xs text-text-muted">{idx + 1}/{writeQuestions.length}</span>
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
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !checked) check(); }}
          disabled={checked} placeholder="___"
          className={`inline-block w-24 text-center border-b-2 bg-transparent outline-none px-1 transition-colors duration-200
            ${checked ? isCorrect ? "border-green-400 text-green-400" : "border-red-400 text-red-400" : "border-gold text-gold placeholder:text-text-muted"}`} />
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
        <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-3">💡 {q.hint}</p>
      )}
      <div className="flex gap-2">
        {!checked ? (
          <>
            <button onClick={check} disabled={!input.trim()}
              className="flex-1 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 disabled:opacity-40 transition-colors text-sm">
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
            {idx + 1 < writeQuestions.length ? "Sonraki" : "Sonuçları Gör"} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

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
        <span className="text-xs text-text-muted">{idx + 1}/{readPassages.length}</span>
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
          const isCorrect = opt === q.answer, isSel = opt === selected;
          let cls = "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
          if (selected) {
            if (isCorrect) cls = "bg-green-500/20 border-green-500/50 text-green-400";
            else if (isSel) cls = "bg-red-500/20 border-red-500/50 text-red-400";
            else cls = "bg-navy border-navy-border text-text-muted opacity-40";
          }
          return (
            <motion.button key={opt} onClick={() => choose(opt)} whileHover={!selected ? { scale: 1.01 } : {}}
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

type Tab = "mcq" | "schreiben" | "lesen";

export function PerfektPracticeSection() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("mcq");

  const tabs = [
    { id: "mcq" as Tab,       label: "Şıklı Sorular", icon: ListChecks, color: "text-amber-400",  bg: "bg-amber-500/15",  border: "border-amber-500/40",  count: 20 },
    { id: "schreiben" as Tab, label: "Schreiben",      icon: PenLine,    color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/40", count: 20 },
    { id: "lesen" as Tab,     label: "Lesen",          icon: BookOpen,   color: "text-sky-400",    bg: "bg-sky-500/15",    border: "border-sky-500/40",    count: 20 },
  ];

  if (!open) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        onClick={() => setOpen(true)}
        className="relative overflow-hidden border-2 border-dashed border-gold/30 hover:border-gold/60 rounded-2xl p-8 text-center cursor-pointer group transition-all duration-300 bg-gold/5 hover:bg-gold/10">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all" />
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Dumbbell className="w-8 h-8 text-gold" />
        </motion.div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Pratik Bölümü</h3>
        <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
          60 soruluk kapsamlı alıştırma — Şıklı sorular, yazma egzersizleri ve okuma anlama testleri.
        </p>
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {tabs.map((t) => (
            <div key={t.id} className={`flex items-center gap-1.5 px-3 py-1.5 ${t.bg} border ${t.border} rounded-full text-xs font-semibold ${t.color}`}>
              <t.icon className="w-3.5 h-3.5" />{t.label} ({t.count})
            </div>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors text-sm shadow-lg shadow-gold/20">
          <Trophy className="w-4 h-4" /> Alıştırmalara Başla
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 p-5 border-b border-navy-border">
        <div className="w-9 h-9 bg-gold/15 rounded-xl flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h2 className="text-text-primary font-bold text-base">Pratik Alıştırmaları</h2>
          <p className="text-text-muted text-xs">Perfekt & Präteritum — 60 soru</p>
        </div>
        <button onClick={() => setOpen(false)} className="ml-auto text-text-muted hover:text-text-secondary text-xs px-3 py-1 border border-navy-border rounded-lg transition-colors">Kapat</button>
      </div>
      <div className="flex border-b border-navy-border">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all border-b-2
              ${tab === t.id ? `${t.color} border-current bg-navy/30` : "text-text-muted border-transparent hover:text-text-secondary"}`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
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
