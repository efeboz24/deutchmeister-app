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

/* ── MCQ questions ─────────────────────────────────────────── */
const mcqQuestions = [
  { q: "Wenn ich Zeit hätte, ___ ich ins Kino gehen. (gehen → Konj. II Konditionalis)", audio: "Wenn ich Zeit hätte, würde ich ins Kino gehen.", answer: "würde", options: ["werde", "würde", "wird", "wurde"] },
  { q: "Er ___ gerne Arzt. (sein → Konjunktiv II)", audio: "Er wäre gerne Arzt.", answer: "wäre", options: ["ist", "sei", "wäre", "war"] },
  { q: "Wenn wir mehr Geld ___, könnten wir reisen. (haben → Konj. II)", audio: "Wenn wir mehr Geld hätten, könnten wir reisen.", answer: "hätten", options: ["haben", "hätten", "habe", "hatten"] },
  { q: "Ich ___ dir helfen, wenn du fragst. (können → Konj. II)", audio: "Ich könnte dir helfen, wenn du fragst.", answer: "könnte", options: ["kann", "könnte", "konnte", "könne"] },
  { q: "Sie ___ gerne nach Paris fahren. (wollen → Konj. II, sie-sg)", audio: "Sie wollte gerne nach Paris fahren.", answer: "wollte", options: ["will", "wollte", "wolle", "würde wollen"] },
  { q: "Wenn er früher aufgestanden ___, hätte er den Zug nicht verpasst.", audio: "Wenn er früher aufgestanden wäre, hätte er den Zug nicht verpasst.", answer: "wäre", options: ["ist", "sei", "wäre", "war"] },
  { q: "___ du mir bitte helfen? (höfliche Bitte)", audio: "Könntest du mir bitte helfen?", answer: "Könntest", options: ["Kannst", "Könntest", "Konntest", "Könnte"] },
  { q: "Wenn ich du ___, würde ich das nicht tun.", audio: "Wenn ich du wäre, würde ich das nicht tun.", answer: "wäre", options: ["bin", "sei", "wäre", "war"] },
  { q: "Er tat so, als ob er alles ___ (wissen → Konj. II).", audio: "Er tat so, als ob er alles wüsste.", answer: "wüsste", options: ["weiß", "wisse", "wüsste", "wusste"] },
  { q: "Es ___ schön, wenn du kommen könntest. (sein → Konj. II)", audio: "Es wäre schön, wenn du kommen könntest.", answer: "wäre", options: ["ist", "sei", "wäre", "war"] },
  { q: "Wenn ich das gewusst ___, hätte ich anders gehandelt.", audio: "Wenn ich das gewusst hätte, hätte ich anders gehandelt.", answer: "hätte", options: ["habe", "hatte", "hätte", "habe gehabt"] },
  { q: "___ Sie mir bitte sagen, wo die Post ist? (können → höflich)", audio: "Könnten Sie mir bitte sagen, wo die Post ist?", answer: "Könnten", options: ["Können", "Könnten", "Konnten", "Könnte"] },
  { q: "Ich ___ so gerne Urlaub machen. (mögen → Konj. II)", audio: "Ich möchte so gerne Urlaub machen.", answer: "möchte", options: ["mag", "möge", "möchte", "mochte"] },
  { q: "Sie sagte, er ___ krank. (sein → Konj. II, weil Konj. I = Präsens)", audio: "Sie sagte, er wäre krank.", answer: "wäre", options: ["sei", "wäre", "ist", "war"] },
  { q: "Ohne deinen Rat ___ ich das nicht geschafft. (haben → Konj. II Pluperfekt)", audio: "Ohne deinen Rat hätte ich das nicht geschafft.", answer: "hätte", options: ["habe", "hätte", "hatte", "habe gehabt"] },
  { q: "Er ___ lieber zu Hause bleiben. (mögen → Konj. II, er)", audio: "Er möchte lieber zu Hause bleiben.", answer: "möchte", options: ["mag", "möge", "möchte", "mochte"] },
  { q: "Wenn es nicht so teuer ___, würde ich es kaufen.", audio: "Wenn es nicht so teuer wäre, würde ich es kaufen.", answer: "wäre", options: ["ist", "sei", "wäre", "war"] },
  { q: "Du ___ mehr schlafen. (sollen → Konj. II)", audio: "Du solltest mehr schlafen.", answer: "solltest", options: ["sollst", "solltest", "solle", "würdest sollen"] },
  { q: "Ich ___ gerne Pianist geworden. (werden → Konj. II Pluperfekt)", audio: "Ich wäre gerne Pianist geworden.", answer: "wäre", options: ["bin", "sei", "wäre", "war"] },
  { q: "Wenn ich reich ___, würde ich die Welt bereisen.", audio: "Wenn ich reich wäre, würde ich die Welt bereisen.", answer: "wäre", options: ["bin", "sei", "wäre", "war"] },
];

/* ── Schreiben questions ───────────────────────────────────── */
const schreibenQuestions = [
  { sentence: "Wenn ich Zeit _____, würde ich mehr lesen. (haben → Konj. II)", answer: "hätte", hint: "haben → hätte", audio: "Wenn ich Zeit hätte, würde ich mehr lesen." },
  { sentence: "Er _____ gerne Musiker. (sein → Konj. II)", answer: "wäre", hint: "sein → wäre", audio: "Er wäre gerne Musiker." },
  { sentence: "Sie _____ gerne nach Japan reisen. (möchte – Konj. II mögen)", answer: "möchte", hint: "mögen → möchte", audio: "Sie möchte gerne nach Japan reisen." },
  { sentence: "Wenn wir mehr Zeit _____, könnten wir mehr üben. (haben → Konj. II)", answer: "hätten", hint: "haben → hätten", audio: "Wenn wir mehr Zeit hätten, könnten wir mehr üben." },
  { sentence: "Ich _____ dir helfen, wenn du es brauchst. (können → Konj. II)", answer: "könnte", hint: "können → könnte", audio: "Ich könnte dir helfen, wenn du es brauchst." },
  { sentence: "Es _____ schön, wenn du mich besuchen würdest. (sein → Konj. II)", answer: "wäre", hint: "sein → wäre", audio: "Es wäre schön, wenn du mich besuchen würdest." },
  { sentence: "Er tat so, als ob er alles _____. (wissen → Konj. II)", answer: "wüsste", hint: "wissen → wüsste", audio: "Er tat so, als ob er alles wüsste." },
  { sentence: "Wenn ich das früher gewusst _____, hätte ich anders entschieden.", answer: "hätte", hint: "haben → hätte (Plusquamperfekt Konj. II)", audio: "Wenn ich das früher gewusst hätte, hätte ich anders entschieden." },
  { sentence: "Du _____ mehr Sport machen. (sollen → Konj. II, du)", answer: "solltest", hint: "sollen → solltest", audio: "Du solltest mehr Sport machen." },
  { sentence: "Ohne Ihren Rat _____ ich das nie geschafft. (haben → Konj. II)", answer: "hätte", hint: "haben → hätte", audio: "Ohne Ihren Rat hätte ich das nie geschafft." },
  { sentence: "Wenn er nicht so laut _____, könnten wir schlafen. (sein → Konj. II)", answer: "wäre", hint: "sein → wäre", audio: "Wenn er nicht so laut wäre, könnten wir schlafen." },
  { sentence: "Ich _____ lieber zu Hause bleiben. (mögen → Konj. II)", answer: "möchte", hint: "mögen → möchte", audio: "Ich möchte lieber zu Hause bleiben." },
  { sentence: "_____ Sie mir bitte helfen? (können → Konj. II, Sie)", answer: "Könnten", hint: "können → könnten", audio: "Könnten Sie mir bitte helfen?" },
  { sentence: "Wenn ich du _____, würde ich sofort aufhören.", answer: "wäre", hint: "sein → wäre", audio: "Wenn ich du wäre, würde ich sofort aufhören." },
  { sentence: "Er _____ gerne kommen, aber er hat keine Zeit. (wollen → Konj. II)", answer: "würde", hint: "würde + kommen (würde-Form)", audio: "Er würde gerne kommen, aber er hat keine Zeit." },
  { sentence: "Wenn es nicht so kalt _____, ginge ich spazieren. (sein → Konj. II)", answer: "wäre", hint: "sein → wäre", audio: "Wenn es nicht so kalt wäre, ginge ich spazieren." },
  { sentence: "Das _____ wirklich toll. (sein → Konj. II)", answer: "wäre", hint: "sein → wäre", audio: "Das wäre wirklich toll." },
  { sentence: "Wenn wir früher losgefahren _____, wären wir pünktlich. (sein → Konj. II Plusquamperfekt)", answer: "wären", hint: "sein → wären", audio: "Wenn wir früher losgefahren wären, wären wir pünktlich." },
  { sentence: "Ich _____ gerne Arzt geworden. (sein → Konj. II, ich)", answer: "wäre", hint: "sein → wäre", audio: "Ich wäre gerne Arzt geworden." },
  { sentence: "Er fragte, ob sie mitkommen _____. (wollen → Konj. II, sie-sg)", answer: "wolle", hint: "wollen → wolle (Konj. I) oder wollte (Konj. II) — hier Konj. II", audio: "Er fragte, ob sie mitkommen wolle." },
];

/* ── Lesen questions ───────────────────────────────────────── */
const lesenQuestions = [
  {
    text: "Wenn ich mehr Geld hätte, würde ich eine Weltreise machen. Ich würde zunächst nach Asien fliegen, dann nach Südamerika.",
    question: "Warum wird 'hätte' und 'würde' verwendet?",
    answer: "Irreale Bedingung (hypothetische Situation in der Gegenwart)",
    options: ["Echte Zukunft", "Irreale Bedingung (hypothetische Situation in der Gegenwart)", "Vergangenheitsbericht", "Höfliche Bitte"],
  },
  {
    text: "Könnten Sie mir bitte sagen, wie ich zum Bahnhof komme? Ich wäre Ihnen sehr dankbar.",
    question: "Welche Funktion hat Konjunktiv II hier?",
    answer: "Höflichkeitsform",
    options: ["Irreale Bedingung", "Höflichkeitsform", "Vergangene Handlung", "Direkte Aufforderung"],
  },
  {
    text: "Er tat so, als ob er die Antwort wüsste. In Wirklichkeit hatte er keine Ahnung.",
    question: "Was drückt 'als ob … wüsste' aus?",
    answer: "Irreale Vergleichssituation",
    options: ["Echte Situation", "Irreale Vergleichssituation", "Zukunft", "Vergangenheit"],
  },
  {
    text: "Wenn wir früher aufgebrochen wären, hätten wir den Zug nicht verpasst.",
    question: "Dies ist ein Beispiel für…",
    answer: "Irreale Bedingung in der Vergangenheit (Konjunktiv II Pluperfekt)",
    options: ["Konjunktiv I indirekte Rede", "Irreale Bedingung in der Vergangenheit (Konjunktiv II Pluperfekt)", "Futur I", "Imperativ"],
  },
  {
    text: "Ich möchte einen Kaffee bestellen. / Hätten Sie einen Moment Zeit?",
    question: "Welcher Konjunktiv II-Typ wird hier verwendet?",
    answer: "möchte (höfliche Bitte) / Konjunktiv II hätten (höfliche Frage)",
    options: ["Irreale Bedingung", "möchte (höfliche Bitte) / Konjunktiv II hätten (höfliche Frage)", "Konjunktiv I", "Präteritum"],
  },
  {
    text: "An deiner Stelle würde ich das anders machen. Du solltest mehr üben.",
    question: "Was bedeutet 'würde … machen' hier?",
    answer: "Ratschlag mit Konjunktiv II (würde-Form)",
    options: ["Vergangenheit", "Ratschlag mit Konjunktiv II (würde-Form)", "Konjunktiv I", "Befehl"],
  },
  {
    text: "Ohne deinen Rat hätte ich den Job nicht bekommen. Ich bin dir sehr dankbar.",
    question: "'Hätte … bekommen' ist eine Form von…",
    answer: "Konjunktiv II Vergangenheit (hätte + Partizip II)",
    options: ["Perfekt", "Konjunktiv II Vergangenheit (hätte + Partizip II)", "Futur II", "Plusquamperfekt"],
  },
  {
    text: "Er wäre lieber zu Hause geblieben, aber er musste zur Arbeit.",
    question: "Was drückt 'wäre … geblieben' aus?",
    answer: "Irrealer Wunsch in der Vergangenheit",
    options: ["Erfüllte Handlung", "Irrealer Wunsch in der Vergangenheit", "Zukunftsplan", "Befehl"],
  },
  {
    text: "Wenn sie nur früher gekommen wäre! Das wäre so schön gewesen.",
    question: "Der Ausruf 'Wenn sie nur … wäre!' drückt aus…",
    answer: "Irrealer Wunsch / Bedauern über die Vergangenheit",
    options: ["Freude über Vergangenheit", "Irrealer Wunsch / Bedauern über die Vergangenheit", "Zukunftshoffnung", "Direkte Frage"],
  },
  {
    text: "Würden Sie bitte das Fenster öffnen? / Dürfte ich kurz stören?",
    question: "Konjunktiv II in diesen Sätzen dient der…",
    answer: "Höflichen Bitte / Anfrage",
    options: ["Vergangenheitserzählung", "Irrealen Bedingung", "Höflichen Bitte / Anfrage", "Indirekte Rede"],
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
          placeholder="Konjunktiv II formunu yaz…"
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
