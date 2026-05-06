"use client";

import { useState, useEffect } from "react";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Dumbbell, ChevronDown } from "lucide-react";

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

const mcqQuestions = [
  { q: "Ich weiß, ___ er heute kommt. (dass → Satzende)", audio: "Ich weiß, dass er heute kommt.", answer: "dass", options: ["ob", "dass", "weil", "wenn"] },
  { q: "Sie fragt, ___ du morgen Zeit hast. (indirekte Frage mit Ja/Nein)", audio: "Sie fragt, ob du morgen Zeit hast.", answer: "ob", options: ["dass", "ob", "weil", "damit"] },
  { q: "Er bleibt zu Hause, ___ er krank ist. (Ursache/Begründung)", audio: "Er bleibt zu Hause, weil er krank ist.", answer: "weil", options: ["dass", "damit", "weil", "obwohl"] },
  { q: "___ er krank ist, geht er zur Arbeit. (Konzessiv — trotz der Tatsache)", audio: "Obwohl er krank ist, geht er zur Arbeit.", answer: "Obwohl", options: ["Weil", "Obwohl", "Wenn", "Dass"] },
  { q: "Sie lernt Deutsch, ___ sie in Deutschland arbeiten kann. (Zweck/Ziel)", audio: "Sie lernt Deutsch, damit sie in Deutschland arbeiten kann.", answer: "damit", options: ["weil", "obwohl", "damit", "dass"] },
  { q: "Er war so müde, ___ er sofort einschlief. (Folge)", audio: "Er war so müde, dass er sofort einschlief.", answer: "dass", options: ["dass", "weil", "ob", "wenn"] },
  { q: "___ du anrufst, werde ich zu Hause sein. (Konditional — falls/wenn)", audio: "Wenn du anrufst, werde ich zu Hause sein.", answer: "Wenn", options: ["Weil", "Obwohl", "Damit", "Wenn"] },
  { q: "Ich weiß nicht, ___ er kommt oder nicht. (indirekte Entscheidungsfrage)", audio: "Ich weiß nicht, ob er kommt oder nicht.", answer: "ob", options: ["dass", "ob", "weil", "damit"] },
  { q: "Seitdem er Sport macht, ___ er sich besser. (Verb am Satzende — Nebensatz)", audio: "Seitdem er Sport macht, fühlt er sich besser.", answer: "fühlt", options: ["fühlen", "fühlt", "fühle", "gefühlt"] },
  { q: "Bevor sie schlafen geht, ___ sie immer ein Buch. (Temporalsatz)", audio: "Bevor sie schlafen geht, liest sie immer ein Buch.", answer: "liest", options: ["lesen", "liest", "las", "gelesen"] },
  { q: "Er kauft ein neues Auto, ___ er kein Geld hat. (Konzessiv)", audio: "Er kauft ein neues Auto, obwohl er kein Geld hat.", answer: "obwohl", options: ["weil", "obwohl", "damit", "dass"] },
  { q: "Sie wartet, bis der Bus ___. (Temporalsatz, kommen — 3. Pers.)", audio: "Sie wartet, bis der Bus kommt.", answer: "kommt", options: ["komme", "kommt", "kommen", "kam"] },
  { q: "Ich helfe dir, ___ du mich um Hilfe bittest. (Konditional)", audio: "Ich helfe dir, wenn du mich um Hilfe bittest.", answer: "wenn", options: ["damit", "obwohl", "wenn", "weil"] },
  { q: "Er erzählt ihr, was er ___ hat. (indirekte Frage — erleben)", audio: "Er erzählt ihr, was er erlebt hat.", answer: "erlebt", options: ["erleben", "erlebt", "erlebte", "erlebend"] },
  { q: "Nachdem er gegessen hatte, ___ er spazieren. (Verb am Ende - gehen)", audio: "Nachdem er gegessen hatte, ging er spazieren.", answer: "ging", options: ["geht", "ging", "gehen", "gegangen"] },
  { q: "Sie lernt so fleißig, ___ sie alles verstehen will. (Finalsatz)", audio: "Sie lernt so fleißig, damit sie alles verstehen will.", answer: "damit", options: ["weil", "dass", "damit", "obwohl"] },
  { q: "Falls es regnet, ___ wir drinnen bleiben. (Konditional)", audio: "Falls es regnet, werden wir drinnen bleiben.", answer: "werden", options: ["würden", "werden", "sind", "wären"] },
  { q: "Das Kind fragt, woher der Regen ___. (indirekte W-Frage)", audio: "Das Kind fragt, woher der Regen kommt.", answer: "kommt", options: ["kommen", "kommt", "kam", "komme"] },
  { q: "Während sie kocht, ___ er ab. (Simultansatz, abwaschen)", audio: "Während sie kocht, wäscht er ab.", answer: "wäscht", options: ["waschen", "wäscht", "wusch", "gewaschen"] },
  { q: "Er tut, als ob er nichts ___ hätte. (als ob + Konjunktiv II)", audio: "Er tut, als ob er nichts gehört hätte.", answer: "gehört", options: ["hören", "hörte", "gehört", "gehören"] },
];

const schreibenQuestions = [
  { sentence: "Ich weiß, _____ er morgen kommt. (dass)", answer: "dass", hint: "dass → Nebensatz", audio: "Ich weiß, dass er morgen kommt." },
  { sentence: "Er fragt, _____ du schon gegessen hast. (ob)", answer: "ob", hint: "ob → indirekte Ja/Nein-Frage", audio: "Er fragt, ob du schon gegessen hast." },
  { sentence: "Sie bleibt zu Hause, _____ sie krank ist. (weil)", answer: "weil", hint: "weil → Kausal", audio: "Sie bleibt zu Hause, weil sie krank ist." },
  { sentence: "_____ es regnet, nehme ich einen Schirm. (wenn)", answer: "Wenn", hint: "Wenn → Konditional", audio: "Wenn es regnet, nehme ich einen Schirm." },
  { sentence: "Er lernt Deutsch, _____ er in Wien arbeiten kann. (damit)", answer: "damit", hint: "damit → Final (Zweck)", audio: "Er lernt Deutsch, damit er in Wien arbeiten kann." },
  { sentence: "_____ er müde war, arbeitete er weiter. (obwohl)", answer: "Obwohl", hint: "Obwohl → Konzessiv", audio: "Obwohl er müde war, arbeitete er weiter." },
  { sentence: "Sie wartet hier, _____ er ankommt. (bis)", answer: "bis", hint: "bis → Temporal (Endpunkt)", audio: "Sie wartet hier, bis er ankommt." },
  { sentence: "Nachdem sie gegessen hatten, _____ sie spazieren. (gehen, Präteritum)", answer: "gingen", hint: "Nachdem → Verb am Ende + Hauptsatz danach", audio: "Nachdem sie gegessen hatten, gingen sie spazieren." },
  { sentence: "Er fragt, woher du _____. (kommen, Präsens)", answer: "kommst", hint: "W-Frage indirekt → Verb ans Ende", audio: "Er fragt, woher du kommst." },
  { sentence: "Ich helfe dir, _____ du mich bittest. (wenn)", answer: "wenn", hint: "wenn → Konditional", audio: "Ich helfe dir, wenn du mich bittest." },
  { sentence: "Sie ist so klug, _____ alle sie bewundern. (dass)", answer: "dass", hint: "so … dass → Konsekutiv", audio: "Sie ist so klug, dass alle sie bewundern." },
  { sentence: "_____ er anrief, war ich nicht zu Hause. (als)", answer: "Als", hint: "Als → einmalige Vergangenheit", audio: "Als er anrief, war ich nicht zu Hause." },
  { sentence: "Das Kind fragt, was _____ passiert ist. (passieren, Perfekt)", answer: "passiert", hint: "was ... passiert ist (indir. Frage, Perfekt)", audio: "Das Kind fragt, was passiert ist." },
  { sentence: "Er tut so, als _____ er nichts gehört hätte. (ob)", answer: "ob", hint: "als ob + Konjunktiv II", audio: "Er tut so, als ob er nichts gehört hätte." },
  { sentence: "Seitdem sie Sport macht, fühlt sie sich _____. (besser)", answer: "besser", hint: "Steigerungsform: gut → besser", audio: "Seitdem sie Sport macht, fühlt sie sich besser." },
  { sentence: "Während er schläft, _____ sie. (arbeiten, Präsens, sie-sg)", answer: "arbeitet", hint: "Verb am Ende des Nebensatzes; Hauptsatz: arbeitet", audio: "Während er schläft, arbeitet sie." },
  { sentence: "Er fragt, _____ sie heute kommt. (ob)", answer: "ob", hint: "ob → indirekte Ja/Nein-Frage", audio: "Er fragt, ob sie heute kommt." },
  { sentence: "Falls du Zeit hast, _____ uns besuchen. (können, du, Imperativ-Ersatz)", answer: "kannst", hint: "kannst du uns besuchen", audio: "Falls du Zeit hast, kannst du uns besuchen." },
  { sentence: "Bevor sie schläft, _____ sie Zähne. (putzen, sie-sg, Präsens)", answer: "putzt", hint: "putzen → putzt", audio: "Bevor sie schläft, putzt sie Zähne." },
  { sentence: "Ich bin froh, _____ du hier bist. (dass)", answer: "dass", hint: "dass → Inhaltssatz", audio: "Ich bin froh, dass du hier bist." },
];

const lesenQuestions = [
  {
    text: "Er bleibt zu Hause, weil er krank ist. Die Ärztin sagt, dass er sich ausruhen soll.",
    question: "Welche Funktion hat 'weil' in diesem Satz?",
    answer: "Kausalangabe (Begründung)",
    options: ["Zeitangabe", "Kausalangabe (Begründung)", "Konzessivangabe", "Finalangabe"],
  },
  {
    text: "Obwohl er sehr müde war, blieb er bis Mitternacht wach.",
    question: "Was drückt 'obwohl' aus?",
    answer: "Konzessiv — Gegensatz zur Erwartung",
    options: ["Kausal", "Temporal", "Konzessiv — Gegensatz zur Erwartung", "Konditional"],
  },
  {
    text: "Als ich jung war, lebte ich in München. Seitdem wohne ich in Berlin.",
    question: "Welchen Unterschied macht 'als' vs 'wenn' bei der Vergangenheit?",
    answer: "'Als' = einmalige Vergangenheit; 'wenn' = wiederholte/hypothetische Situationen",
    options: ["Kein Unterschied", "'Als' = einmalige Vergangenheit; 'wenn' = wiederholte/hypothetische Situationen", "'Als' = Zukunft, 'wenn' = Vergangenheit", "'Wenn' nur für Konditional"],
  },
  {
    text: "Sie lernt Deutsch, damit sie in Deutschland studieren kann.",
    question: "Welche Funktion hat der 'damit'-Nebensatz?",
    answer: "Finalsatz (Zweck/Ziel angeben)",
    options: ["Kausalsatz", "Konsekutivsatz", "Finalsatz (Zweck/Ziel angeben)", "Konzessivsatz"],
  },
  {
    text: "Er war so erschöpft, dass er sofort einschlief. In der Zeitung stand: Er habe das Projekt abgeschlossen.",
    question: "Warum ist 'dass' im ersten Satz und 'habe' im zweiten Satz?",
    answer: "'dass' = Konsekutivsatz; 'habe' = Konjunktiv I für indirekte Rede",
    options: ["Beide sind Konsekutiv", "'dass' = Konsekutivsatz; 'habe' = Konjunktiv I für indirekte Rede", "Beide sind indirekte Rede", "Nur zeitliche Unterschiede"],
  },
  {
    text: "Nachdem er das Buch gelesen hatte, machte er eine Zusammenfassung.",
    question: "'Nachdem' + Plusquamperfekt zeigt…",
    answer: "Zeitliche Vorzeitigkeit — Handlung A vor Handlung B",
    options: ["Gleichzeitigkeit", "Zeitliche Vorzeitigkeit — Handlung A vor Handlung B", "Zukunft", "Wiederholung"],
  },
  {
    text: "Sie fragt ihn, ob er morgen kommt. / Sie fragt ihn, wann er kommt.",
    question: "Wann benutzt man 'ob', wann benutzt man 'wann'?",
    answer: "'ob' für Ja/Nein-Fragen; 'wann' für Zeitfragen (W-Fragewort bleibt)",
    options: ["Kein Unterschied", "'ob' für Ja/Nein-Fragen; 'wann' für Zeitfragen (W-Fragewort bleibt)", "'wann' immer, 'ob' nur in Formellen", "'ob' für Zukunft"],
  },
  {
    text: "Während sie kochte, schaute er fern. Als das Essen fertig war, aßen sie zusammen.",
    question: "'Während' zeigt…",
    answer: "Gleichzeitigkeit zweier Handlungen",
    options: ["Vorzeitigkeit", "Gleichzeitigkeit zweier Handlungen", "Bedingung", "Gegensatz"],
  },
  {
    text: "Er tut so, als ob er alles verstanden hätte. In Wirklichkeit hat er nichts verstanden.",
    question: "'Als ob' + Konjunktiv II drückt aus…",
    answer: "Irrealen Vergleich — etwas wird so getan als wäre es wahr, obwohl es falsch ist",
    options: ["Echten Vergleich", "Zukunftshoffnung", "Irrealen Vergleich — etwas wird so getan als wäre es wahr, obwohl es falsch ist", "Höflichkeit"],
  },
  {
    text: "Falls du Hilfe brauchst, ruf mich an. / Wenn du Hilfe brauchst, ruf mich an.",
    question: "Was ist der Unterschied zwischen 'falls' und 'wenn'?",
    answer: "'Falls' betont Unsicherheit ob Bedingung eintritt; 'wenn' ist neutraler",
    options: ["Kein Unterschied", "'Falls' für Vergangenheit, 'wenn' für Gegenwart", "'Falls' betont Unsicherheit ob Bedingung eintritt; 'wenn' ist neutraler", "'Wenn' nur für Zukunft"],
  },
];

type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";
function ResultScreen({ score, total, onRestart, skill, xpEarned }: { score: number; total: number; onRestart: () => void; skill: Skill; xpEarned: number }) {
  const { update } = useSession();
  const pct = Math.round((score / total) * 100);
  useEffect(() => { saveProgress({ xp: xpEarned, skill, skillScore: pct, minutes: 10 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }); }, []);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <div className="text-6xl mb-4">{pct === 100 ? "🏆" : pct >= 80 ? "🌟" : pct >= 60 ? "👍" : "💪"}</div>
      <p className="text-3xl font-extrabold text-text-primary mb-2">{score}/{total}</p>
      <p className="text-lg text-gold font-semibold mb-6">{pct}%</p>
      <div className="w-full max-w-xs mx-auto bg-navy-border rounded-full h-3 mb-6">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8 }}
          className={`h-3 rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-gold" : "bg-red-500"}`} />
      </div>
      <button onClick={onRestart}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors">
        <RotateCcw className="w-4 h-4" /> Tekrar Dene
      </button>
    </motion.div>
  );
}

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
    <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
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
          ✓ Doğru: <strong>{q.answer}</strong>
        </motion.p>
      )}
      {!checked && (
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Bağlacı veya fiili yaz…"
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
