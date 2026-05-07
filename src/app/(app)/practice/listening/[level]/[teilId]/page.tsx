"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Headphones,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  RotateCcw,
  Mic,
  MessageSquare,
  Radio,
  Play,
  Square,
  Lightbulb,
  Volume2,
} from "lucide-react";
import { getHorenTeil, saveHorenProgress, HorenTeilType } from "@/lib/horen-data";
import { saveProgress } from "@/lib/saveProgress";
import { savePracticeMistakes, type PracticeMistakeEntry } from "@/lib/practice-mistakes";
import { WrongAnswerReview } from "@/components/practice/WrongAnswerReview";
import { SpeakBtn } from "@/components/ui/SpeakBtn";

const TYPE_META: Record<HorenTeilType, { icon: React.ElementType; color: string; bg: string }> = {
  ansagen: { icon: Mic, color: "text-blue-400", bg: "bg-blue-500/10" },
  gespraeche: { icon: MessageSquare, color: "text-green-400", bg: "bg-green-500/10" },
  informationen: { icon: Radio, color: "text-violet-400", bg: "bg-violet-500/10" },
};

const LEVEL_COLORS: Record<string, string> = {
  a1: "text-emerald-400",
  a2: "text-blue-400",
  b1: "text-violet-400",
  b2: "text-orange-400",
  c1: "text-gold",
};

type Phase = "exercise" | "results";

// ── Voice helpers ─────────────────────────────────────────────────────────────

function getDeVoices() {
  return window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("de"));
}

function speakSegment(
  text: string,
  { pitch = 1, rate = 0.9 }: { pitch?: number; rate?: number },
  onEnd?: () => void
) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = rate;
  utter.pitch = pitch;
  const voices = getDeVoices();
  if (voices.length > 0) utter.voice = voices[0];
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
}

// Parses "Speaker: line" format into segments
type DialogueLine = { speaker: string; text: string };

function parseDialogue(raw: string): DialogueLine[] {
  return raw.split("\n").flatMap((line) => {
    const m = line.match(/^([^:]+):\s*(.+)/);
    if (!m) return [];
    return [{ speaker: m[1].trim(), text: m[2].trim() }];
  });
}

// Plays dialogue lines sequentially; calls onLine(index) as each line starts,
// calls onEnd when finished. Returns a cancel function.
function playDialogue(
  lines: DialogueLine[],
  maleSpeakers: string[],
  onLine: (i: number) => void,
  onEnd: () => void
): () => void {
  let cancelled = false;

  function playAt(i: number) {
    if (cancelled || i >= lines.length) {
      if (!cancelled) onEnd();
      return;
    }
    onLine(i);
    const isMale = maleSpeakers.some(
      (s) => lines[i].speaker.toLowerCase() === s.toLowerCase()
    );
    speakSegment(lines[i].text, { pitch: isMale ? 0.75 : 1.15, rate: 0.9 }, () => {
      if (!cancelled) playAt(i + 1);
    });
  }

  playAt(0);
  return () => {
    cancelled = true;
    window.speechSynthesis.cancel();
  };
}

// ── DialoguePlayer ────────────────────────────────────────────────────────────

function DialoguePlayer({
  audioText,
  maleSpeakers,
}: {
  audioText: string;
  maleSpeakers: string[];
}) {
  const [playing, setPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const cancelRef = useRef<(() => void) | null>(null);
  const lines = parseDialogue(audioText);

  function toggle() {
    if (playing) {
      cancelRef.current?.();
      setPlaying(false);
      setActiveLine(null);
    } else {
      window.speechSynthesis.cancel();
      setPlaying(true);
      cancelRef.current = playDialogue(
        lines,
        maleSpeakers,
        (i) => setActiveLine(i),
        () => { setPlaying(false); setActiveLine(null); }
      );
    }
  }

  useEffect(() => () => { cancelRef.current?.(); }, []);

  const isMale = (speaker: string) =>
    maleSpeakers.some((s) => speaker.toLowerCase() === s.toLowerCase());

  return (
    <div className="bg-navy-card border border-green-500/20 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-green-400" />
          <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Gespräch</span>
        </div>
        <button
          onClick={() => setShowTranscript((v) => !v)}
          className="text-[11px] text-text-muted hover:text-text-secondary transition-colors"
        >
          {showTranscript ? "Transkripti gizle" : "Transkripti göster"}
        </button>
      </div>

      <button
        onClick={toggle}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
          playing
            ? "bg-green-500/20 border-green-500/50 text-green-300"
            : "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
        }`}
      >
        {playing ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {playing ? "Durdur" : "Diyaloğu Dinle"}
      </button>

      {/* Live transcript */}
      <AnimatePresence>
        {(playing || showTranscript) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5 bg-navy rounded-xl p-4 border border-navy-border">
              {lines.map((line, i) => {
                const male = isMale(line.speaker);
                const active = activeLine === i;
                return (
                  <motion.div
                    key={i}
                    animate={{ opacity: playing ? (active ? 1 : 0.35) : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2 rounded-lg px-2 py-1 ${active ? "bg-green-500/10" : ""}`}
                  >
                    <span
                      className={`text-xs font-bold shrink-0 w-16 pt-0.5 ${
                        male ? "text-blue-400" : "text-pink-400"
                      }`}
                    >
                      {line.speaker}:
                    </span>
                    <span className={`text-sm leading-relaxed ${active ? "text-text-primary" : "text-text-secondary"}`}>
                      {line.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Simple AudioPlayer (ansagen / informationen) ──────────────────────────────

function AudioPlayer({ text, label }: { text: string; label?: string }) {
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
    } else {
      setPlaying(true);
      speakSegment(text, { pitch: 1, rate: 0.9 }, () => setPlaying(false));
    }
  }

  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
        playing
          ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
          : "bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
      }`}
    >
      {playing ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      {label ?? (playing ? "Durdur" : "Dinle")}
    </button>
  );
}

export default function HorenTeilPage() {
  const params = useParams();
  const router = useRouter();
  const level = (params.level as string)?.toLowerCase();
  const teilId = parseInt(params.teilId as string, 10);

  const teil = getHorenTeil(level, teilId);

  const [phase, setPhase] = useState<Phase>("exercise");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [xpSaved, setXpSaved] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<Omit<PracticeMistakeEntry, "key" | "addedAt">[]>([]);
  const [showWrongReview, setShowWrongReview] = useState(false);

  useEffect(() => {
    if (teil) setAnswers(new Array(teil.questions.length).fill(null));
  }, [teil]);

  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  if (!teil) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-text-muted">Bu Teil bulunamadı.</p>
        <Link href={`/practice/listening/${level}`} className="text-gold hover:underline mt-4 inline-block">
          Geri dön
        </Link>
      </div>
    );
  }

  const question = teil.questions[currentQ];
  const TypeIcon = TYPE_META[teil.type].icon;
  const isLastQ = currentQ === teil.questions.length - 1;
  const score = answers.filter((a, i) => a === teil.questions[i].correct).length;
  const pct = Math.round((score / teil.questions.length) * 100);

  function handleSelect(idx: number) {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const updated = [...answers];
    updated[currentQ] = idx;
    setAnswers(updated);
  }

  function handleNext() {
    setShowFeedback(false);
    setShowExplanation(false);
    setSelected(null);
    if (isLastQ) {
      finishTeil();
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  async function finishTeil() {
    const finalScore = answers.filter((a, i) => a === teil!.questions[i].correct).length;
    const finalPct = Math.round((finalScore / teil!.questions.length) * 100);
    const earnedXp = Math.round((finalScore / teil!.questions.length) * teil!.xp);

    saveHorenProgress(level, teilId, finalScore, teil!.questions.length);

    // Collect wrong answers and save to mistakes
    const levelLabel = level.toUpperCase();
    const isRF = teil!.questionFormat === "richtigfalsch";
    const topicTitle = `Hören ${levelLabel} · Teil ${teilId}: ${teil!.title}`;
    const mistakes = teil!.questions
      .map((q, i) => ({ q, userAnswer: answers[i] }))
      .filter(({ q, userAnswer }) => userAnswer !== null && userAnswer !== q.correct)
      .map(({ q, userAnswer }) => ({
        topicId: `horen-${level}-${teilId}`,
        topicTitle,
        levelName: levelLabel,
        question: q.question,
        options: isRF ? ["Richtig", "Falsch"] : (q.options ?? ["Richtig", "Falsch"]),
        correct: q.correct,
        userAnswer: userAnswer as number,
        explanation: q.explanation,
      }));

    setWrongAnswers(mistakes);
    savePracticeMistakes(mistakes);

    if (!xpSaved) {
      setXpSaved(true);
      await saveProgress({ xp: earnedXp, skill: "horen", skillScore: finalPct, minutes: 5 });
    }

    setPhase("results");
  }

  function handleRestart() {
    setPhase("exercise");
    setCurrentQ(0);
    setAnswers(new Array(teil!.questions.length).fill(null));
    setSelected(null);
    setShowFeedback(false);
    setShowExplanation(false);
    setShowTranscript(false);
    setXpSaved(false);
    setWrongAnswers([]);
    setShowWrongReview(false);
  }

  const levelColor = LEVEL_COLORS[level] ?? "text-text-primary";
  const progress = ((currentQ + (showFeedback ? 1 : 0)) / teil.questions.length) * 100;

  // ── Results ───────────────────────────────────────────────────────────────
  if (phase === "results") {
    const earnedXp = Math.round((score / teil.questions.length) * teil.xp);
    const grade = pct >= 80 ? "excellent" : pct >= 60 ? "good" : "try-again";

    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <Link
          href={`/practice/listening/${level}`}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {level.toUpperCase()} Hören
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
        >
          <div
            className={`p-8 text-center border-b border-navy-border ${
              grade === "excellent" ? "bg-green-500/5" : grade === "good" ? "bg-yellow-500/5" : "bg-red-500/5"
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex"
            >
              <Trophy
                className={`w-14 h-14 ${
                  grade === "excellent" ? "text-green-400" : grade === "good" ? "text-yellow-400" : "text-text-muted"
                }`}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-5xl font-bold text-text-primary mt-3 mb-1">
                {score}
                <span className="text-2xl text-text-muted">/{teil.questions.length}</span>
              </p>
              <p className={`text-lg font-semibold ${grade === "excellent" ? "text-green-400" : grade === "good" ? "text-yellow-400" : "text-red-400"}`}>
                {grade === "excellent" ? "Mükemmel!" : grade === "good" ? "İyi iş!" : "Tekrar dene!"}
              </p>
              <p className="text-text-muted text-sm mt-1">{pct}% doğru · +{earnedXp} XP kazandın</p>
            </motion.div>
          </div>

          {/* Transcript toggle */}
          {teil.audioText && (
            <div className="px-5 pt-5">
              <button
                onClick={() => setShowTranscript((v) => !v)}
                className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                {showTranscript ? "Transkripti gizle" : "Transkripti göster"}
              </button>
              <AnimatePresence>
                {showTranscript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                      {teil.audioText.split("\n").map((line, i) => (
                        <p key={i} className="text-sm text-text-secondary leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="p-5 space-y-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Cevap Özeti</p>
            {teil.questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = userAnswer === q.correct;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className={`rounded-xl border p-4 ${correct ? "bg-green-500/5 border-green-500/30" : "bg-red-500/5 border-red-500/30"}`}
                >
                  <div className="flex items-start gap-3">
                    {correct ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary font-medium">{q.question}</p>
                      {!correct && userAnswer !== null && (
                        <p className="text-xs text-red-400 mt-1">
                          Senin cevabın: {teil.questionFormat === "richtigfalsch" ? (userAnswer === 0 ? "Richtig" : "Falsch") : (q.options?.[userAnswer] ?? "")}
                        </p>
                      )}
                      <p className={`text-xs mt-1 font-medium ${correct ? "text-green-400" : "text-text-secondary"}`}>
                        ✓ {teil.questionFormat === "richtigfalsch" ? (q.correct === 0 ? "Richtig" : "Falsch") : (q.options?.[q.correct] ?? "")}
                      </p>
                      <p className="text-xs text-text-muted mt-1.5 bg-navy rounded-lg px-2.5 py-1.5">
                        <span className="text-gold">💡</span> {q.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="px-5 pb-5 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy border border-navy-border text-text-secondary hover:text-text-primary hover:border-navy-border/80 transition-all text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Tekrar
              </button>
              <Link
                href={`/practice/listening/${level}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all text-sm font-semibold"
              >
                Diğer Teile
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {wrongAnswers.length > 0 && (
              <button
                onClick={() => setShowWrongReview((v) => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all text-sm font-semibold"
              >
                <XCircle className="w-4 h-4" />
                {showWrongReview ? "İncelemeyi Kapat" : `${wrongAnswers.length} Yanlış Cevabı İncele`}
              </button>
            )}
          </div>

          <AnimatePresence>
            {showWrongReview && wrongAnswers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-navy-border"
              >
                <div className="p-5">
                  <WrongAnswerReview mistakes={wrongAnswers} accentColor="text-blue-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── Exercise ──────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link
          href={`/practice/listening/${level}`}
          className="hover:text-text-primary transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {level.toUpperCase()} Hören
        </Link>
        <span>/</span>
        <span className={levelColor}>Teil {teilId}</span>
      </div>

      {/* Header card */}
      <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 ${TYPE_META[teil.type].bg} rounded-xl flex items-center justify-center`}>
            <TypeIcon className={`w-5 h-5 ${TYPE_META[teil.type].color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Teil {teil.id} · {teil.typeLabel}
              </span>
            </div>
            <h1 className="text-lg font-bold text-text-primary">{teil.title}</h1>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-semibold text-text-primary">
              {currentQ + 1}
              <span className="text-text-muted font-normal">/{teil.questions.length}</span>
            </p>
            <p className="text-xs text-text-muted">soru</p>
          </div>
        </div>

        <div className="h-1.5 rounded-full bg-navy overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Instruction */}
      <p className="text-xs text-text-muted bg-navy-card border border-navy-border rounded-xl px-4 py-2.5 italic">
        {teil.instruction}
      </p>

      {/* Dialogue player (gespraeche) */}
      {teil.audioText && teil.type === "gespraeche" && (
        <DialoguePlayer
          audioText={teil.audioText}
          maleSpeakers={teil.maleSpeakers ?? []}
        />
      )}

      {/* Full audio player (informationen) */}
      {teil.audioText && teil.type === "informationen" && (
        <div className="bg-navy-card border border-blue-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Hörtext
              </span>
            </div>
            <button
              onClick={() => setShowTranscript((v) => !v)}
              className="text-[11px] text-text-muted hover:text-text-secondary transition-colors"
            >
              {showTranscript ? "Transkripti gizle" : "Transkripti göster"}
            </button>
          </div>

          <AudioPlayer text={teil.audioText} label="Metni Dinle" />

          <AnimatePresence>
            {showTranscript && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 bg-navy rounded-xl p-4 border border-navy-border">
                  {teil.audioText.split("\n").map((line, i) => (
                    <p key={i} className="text-sm text-text-secondary leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          {/* Individual audio (ansagen) */}
          {question.shortAudio && (
            <div className="bg-navy-light border-2 border-dashed border-blue-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Duyuru {question.id}
                </span>
              </div>
              <AudioPlayer text={question.shortAudio} />
            </div>
          )}

          {/* Question */}
          <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
            <div className="flex items-start gap-2 mb-4">
              <p className="text-text-primary font-semibold flex-1">{question.question}</p>
              <SpeakBtn text={question.question} />
            </div>

            {teil.questionFormat === "richtigfalsch" ? (
              <div className="grid grid-cols-2 gap-3">
                {[0, 1].map((idx) => {
                  const isRichtig = idx === 0;
                  const isSelected = selected === idx;
                  const isCorrect = idx === question.correct;
                  let cls = "flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border-2 text-base font-bold transition-all duration-200 ";
                  if (showFeedback) {
                    if (isCorrect) cls += "border-green-500 bg-green-500/15 text-green-400";
                    else if (isSelected && !isCorrect) cls += "border-red-500 bg-red-500/15 text-red-400";
                    else cls += "border-navy-border bg-navy opacity-40 text-text-muted";
                  } else {
                    cls += isRichtig
                      ? "border-green-500/30 bg-green-500/5 text-green-400 hover:bg-green-500/15 hover:border-green-500/60 cursor-pointer"
                      : "border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:border-red-500/60 cursor-pointer";
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!showFeedback ? { scale: 1.02 } : {}}
                      whileTap={!showFeedback ? { scale: 0.97 } : {}}
                      className={cls}
                      onClick={() => handleSelect(idx)}
                      disabled={showFeedback}
                    >
                      <span className="text-2xl">{isRichtig ? "✓" : "✗"}</span>
                      <span>{isRichtig ? "Richtig" : "Falsch"}</span>
                      {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2.5">
                {(question.options ?? []).map((opt, idx) => {
                  const letter = ["a", "b", "c"][idx];
                  const isSelected = selected === idx;
                  const isCorrect = idx === question.correct;
                  const showResult = showFeedback;

                  let optClass = "flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ";
                  if (showResult) {
                    if (isCorrect) optClass += "border-green-500/50 bg-green-500/10 text-text-primary";
                    else if (isSelected && !isCorrect) optClass += "border-red-500/50 bg-red-500/10 text-text-primary";
                    else optClass += "border-navy-border bg-navy opacity-50 text-text-muted";
                  } else {
                    optClass += "border-navy-border bg-navy hover:border-blue-500/40 hover:bg-blue-500/5 text-text-primary cursor-pointer";
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!showFeedback ? { scale: 1.01 } : {}}
                      whileTap={!showFeedback ? { scale: 0.99 } : {}}
                      className={optClass}
                      onClick={() => handleSelect(idx)}
                      disabled={showFeedback}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          showResult && isCorrect ? "bg-green-500 text-white"
                            : showResult && isSelected && !isCorrect ? "bg-red-500 text-white"
                            : "bg-navy-border text-text-muted"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1">{opt}</span>
                      <SpeakBtn text={opt} className="shrink-0 opacity-60 hover:opacity-100" />
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>
            )}

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 overflow-hidden"
                >
                  <button
                    onClick={() => setShowExplanation((v) => !v)}
                    className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors mb-2"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    {showExplanation ? "Açıklamayı gizle" : "Açıklamayı göster"}
                  </button>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 mb-3">
                          <p className="text-sm text-text-secondary leading-relaxed">{question.explanation}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all text-sm font-semibold"
                  >
                    {isLastQ ? (
                      <><Trophy className="w-4 h-4" />Sonuçlara git</>
                    ) : (
                      <>Sonraki soru<ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Question dots */}
      <div className="flex justify-center gap-1.5 pb-2">
        {teil.questions.map((_, i) => {
          const answered = answers[i] !== null;
          const correct = answers[i] === teil.questions[i].correct;
          return (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentQ ? "w-4 h-2 bg-blue-400"
                  : answered ? correct ? "w-2 h-2 bg-green-400/60" : "w-2 h-2 bg-red-400/60"
                  : "w-2 h-2 bg-navy-border"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
