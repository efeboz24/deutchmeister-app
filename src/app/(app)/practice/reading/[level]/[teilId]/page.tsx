"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  RotateCcw,
  Signpost,
  FileText,
  AlignLeft,
  Lightbulb,
  Star,
} from "lucide-react";
import { getLesenTeil, saveLesenProgress, TeilType } from "@/lib/lesen-data";
import { saveProgress } from "@/lib/saveProgress";
import { savePracticeMistakes, type PracticeMistakeEntry } from "@/lib/practice-mistakes";
import { WrongAnswerReview } from "@/components/practice/WrongAnswerReview";

const TYPE_META: Record<TeilType, { icon: React.ElementType; color: string; bg: string }> = {
  schilder: { icon: Signpost, color: "text-blue-400", bg: "bg-blue-500/10" },
  "kurze-texte": { icon: FileText, color: "text-green-400", bg: "bg-green-500/10" },
  informationstext: { icon: AlignLeft, color: "text-violet-400", bg: "bg-violet-500/10" },
};

const LEVEL_COLORS: Record<string, string> = {
  a1: "text-emerald-400",
  a2: "text-blue-400",
  b1: "text-violet-400",
  b2: "text-orange-400",
  c1: "text-gold",
};

type Phase = "exercise" | "results";

export default function LesenTeilPage() {
  const params = useParams();
  const router = useRouter();
  const level = (params.level as string)?.toLowerCase();
  const teilId = parseInt(params.teilId as string, 10);

  const teil = getLesenTeil(level, teilId);

  const [phase, setPhase] = useState<Phase>("exercise");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [xpSaved, setXpSaved] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<Omit<PracticeMistakeEntry, "key" | "addedAt">[]>([]);
  const [showWrongReview, setShowWrongReview] = useState(false);

  useEffect(() => {
    if (teil) {
      setAnswers(new Array(teil.questions.length).fill(null));
    }
  }, [teil]);

  if (!teil) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-text-muted">Bu Teil bulunamadı.</p>
        <Link href={`/practice/reading/${level}`} className="text-gold hover:underline mt-4 inline-block">
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
    const finalAnswers = [...answers];
    const finalScore = finalAnswers.filter((a, i) => a === teil!.questions[i].correct).length;
    const finalPct = Math.round((finalScore / teil!.questions.length) * 100);
    const earnedXp = Math.round((finalScore / teil!.questions.length) * teil!.xp);

    saveLesenProgress(level, teilId, finalScore, teil!.questions.length);

    // Collect wrong answers and save to mistakes
    const levelLabel = level.toUpperCase();
    const topicTitle = `Lesen ${levelLabel} · Teil ${teilId}: ${teil!.title}`;
    const mistakes = teil!.questions
      .map((q, i) => ({ q, userAnswer: finalAnswers[i] }))
      .filter(({ q, userAnswer }) => userAnswer !== null && userAnswer !== q.correct)
      .map(({ q, userAnswer }) => ({
        topicId: `lesen-${level}-${teilId}`,
        topicTitle,
        levelName: levelLabel,
        question: q.question,
        options: q.options,
        correct: q.correct,
        userAnswer: userAnswer as number,
        explanation: q.explanation,
      }));

    setWrongAnswers(mistakes);
    savePracticeMistakes(mistakes);

    if (!xpSaved) {
      setXpSaved(true);
      await saveProgress({
        xp: earnedXp,
        skill: "lesen",
        skillScore: finalPct,
        minutes: 5,
      });
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
    setXpSaved(false);
    setWrongAnswers([]);
    setShowWrongReview(false);
  }

  const levelColor = LEVEL_COLORS[level] ?? "text-text-primary";

  // ── Results screen ────────────────────────────────────────────────────────
  if (phase === "results") {
    const earnedXp = Math.round((score / teil.questions.length) * teil.xp);
    const grade = pct >= 80 ? "excellent" : pct >= 60 ? "good" : "try-again";

    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <Link
          href={`/practice/reading/${level}`}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {level.toUpperCase()} Lesen
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden"
        >
          {/* Result header */}
          <div
            className={`p-8 text-center border-b border-navy-border ${
              grade === "excellent"
                ? "bg-green-500/5"
                : grade === "good"
                ? "bg-yellow-500/5"
                : "bg-red-500/5"
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
                  grade === "excellent"
                    ? "text-green-400"
                    : grade === "good"
                    ? "text-yellow-400"
                    : "text-text-muted"
                }`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-5xl font-bold text-text-primary mt-3 mb-1">
                {score}
                <span className="text-2xl text-text-muted">/{teil.questions.length}</span>
              </p>
              <p
                className={`text-lg font-semibold ${
                  grade === "excellent"
                    ? "text-green-400"
                    : grade === "good"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {grade === "excellent"
                  ? "Mükemmel!"
                  : grade === "good"
                  ? "İyi iş!"
                  : "Tekrar dene!"}
              </p>
              <p className="text-text-muted text-sm mt-1">
                {pct}% doğru · +{earnedXp} XP kazandın
              </p>
            </motion.div>
          </div>

          {/* Answer review */}
          <div className="p-5 space-y-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Cevap Özeti
            </p>
            {teil.questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = userAnswer === q.correct;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className={`rounded-xl border p-4 ${
                    correct
                      ? "bg-green-500/5 border-green-500/30"
                      : "bg-red-500/5 border-red-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {correct ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      {q.shortText && (
                        <p className="text-[11px] text-text-muted italic mb-1 font-mono">
                          „{q.shortText}"
                        </p>
                      )}
                      <p className="text-sm text-text-primary font-medium">{q.question}</p>
                      {!correct && userAnswer !== null && (
                        <p className="text-xs text-red-400 mt-1">
                          Senin cevabın: {q.options[userAnswer]}
                        </p>
                      )}
                      <p
                        className={`text-xs mt-1 font-medium ${
                          correct ? "text-green-400" : "text-text-secondary"
                        }`}
                      >
                        ✓ {q.options[q.correct]}
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

          {/* Actions */}
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
                href={`/practice/reading/${level}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all text-sm font-semibold"
              >
                Diğer Teile
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Wrong answer review button */}
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

          {/* Wrong answer review panel */}
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
                  <WrongAnswerReview mistakes={wrongAnswers} accentColor="text-red-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── Exercise screen ───────────────────────────────────────────────────────
  const progress = ((currentQ + (showFeedback ? 1 : 0)) / teil.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link
          href={`/practice/reading/${level}`}
          className="hover:text-text-primary transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {level.toUpperCase()} Lesen
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

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-navy overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Instruction */}
      <p className="text-xs text-text-muted bg-navy-card border border-navy-border rounded-xl px-4 py-2.5 italic">
        {teil.instruction}
      </p>

      {/* Context text (for kurze-texte and informationstext) */}
      {teil.context && (
        <div className="bg-navy-card border border-gold/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              Lesetext
            </span>
          </div>
          <div className="prose prose-sm max-w-none">
            {teil.context.split("\n\n").map((para, i) => (
              <p key={i} className="text-text-primary text-sm leading-relaxed whitespace-pre-line mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </div>
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
          {/* Short text (for schilder type) */}
          {question.shortText && (
            <div className="bg-navy-light border-2 border-dashed border-navy-border rounded-2xl p-5 text-center">
              <p className="text-text-primary font-semibold text-base leading-relaxed">
                {question.shortText}
              </p>
            </div>
          )}

          {/* Question */}
          <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
            <p className="text-text-primary font-semibold mb-4">{question.question}</p>

            <div className="space-y-2.5">
              {question.options.map((opt, idx) => {
                const letter = ["a", "b", "c"][idx];
                const isSelected = selected === idx;
                const isCorrect = idx === question.correct;
                const showResult = showFeedback;

                let optClass =
                  "flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ";

                if (showResult) {
                  if (isCorrect) {
                    optClass += "border-green-500/50 bg-green-500/10 text-text-primary";
                  } else if (isSelected && !isCorrect) {
                    optClass += "border-red-500/50 bg-red-500/10 text-text-primary";
                  } else {
                    optClass += "border-navy-border bg-navy opacity-50 text-text-muted";
                  }
                } else {
                  optClass +=
                    "border-navy-border bg-navy hover:border-green-500/40 hover:bg-green-500/5 text-text-primary cursor-pointer";
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
                        showResult && isCorrect
                          ? "bg-green-500 text-white"
                          : showResult && isSelected && !isCorrect
                          ? "bg-red-500 text-white"
                          : "bg-navy-border text-text-muted"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback area */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 overflow-hidden"
                >
                  {/* Explanation toggle */}
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
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all text-sm font-semibold"
                  >
                    {isLastQ ? (
                      <>
                        <Trophy className="w-4 h-4" />
                        Sonuçlara git
                      </>
                    ) : (
                      <>
                        Sonraki soru
                        <ChevronRight className="w-4 h-4" />
                      </>
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
                i === currentQ
                  ? "w-4 h-2 bg-green-400"
                  : answered
                  ? correct
                    ? "w-2 h-2 bg-green-400/60"
                    : "w-2 h-2 bg-red-400/60"
                  : "w-2 h-2 bg-navy-border"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
