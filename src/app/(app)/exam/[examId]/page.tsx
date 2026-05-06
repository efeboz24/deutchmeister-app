"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, XCircle, RotateCcw, Trophy, Clock,
  ArrowLeft, ChevronRight, BookOpen, PenLine, Flag,
  AlertTriangle, ChevronDown, ChevronUp, Brain, Lightbulb,
  Plus, Check,
} from "lucide-react";
import Link from "next/link";
import WritingInput from "./WritingInput";
import type { WritingEvalResult } from "@/app/api/exam/evaluate-writing/route";
import type { AnalysisResult } from "@/app/api/exam/analyze/route";

interface Question {
  id: string;
  context?: string;
  text: string;
  options: string[];
  answer: string;
  explanation?: string;
}

interface Section {
  id: string;
  category: "Lesen" | "Schreiben";
  teil: number;
  title: string;
  instructions: string;
  passage?: string;
  questions: Question[];
}

interface ExamData {
  name: string;
  duration: number;
  levelName: string;
  sections: Section[];
  passingScore: number;
}

type Phase = "intro" | "section-intro" | "question" | "section-done" | "evaluating" | "result";

interface WrongItem {
  question: Question;
  userAnswer: string | undefined;
  section: Section;
}

interface ResultData {
  score: number;
  passed: boolean;
  xp: number;
  correctCount: number;
  totalCount: number;
  bySection: { title: string; category: string; correct: number; total: number }[];
  wrongAnswers: WrongItem[];
  writingEvals: Record<string, WritingEvalResult>;
}

export default function ExamSessionPage() {
  const { examId } = useParams<{ examId: string }>();
  const { update } = useSession();

  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>("intro");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ResultData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [resultTab, setResultTab] = useState<"summary" | "wrong" | "writing" | "analysis">("summary");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const [savingWords, setSavingWords] = useState<Record<string, boolean>>({});
  const [expandedWrong, setExpandedWrong] = useState<string | null>(null);
  const [activeNavCategory, setActiveNavCategory] = useState<"Lesen" | "Schreiben">("Lesen");
  const [writingEvals, setWritingEvals] = useState<Record<string, WritingEvalResult>>({});
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(`/api/exam/${examId}`)
      .then((r) => r.json())
      .then(({ data }) => {
        setExam(data);
        setTimeLeft(data.duration * 60);
        const firstCat = data.sections[0]?.category ?? "Lesen";
        setActiveNavCategory(firstCat);
      })
      .finally(() => setLoading(false));
  }, [examId]);

  useEffect(() => {
    if (!exam || phase === "intro" || phase === "result" || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) { clearInterval(t); void handleSubmit(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, phase]);

  const allQuestions = exam?.sections.flatMap((s) => s.questions) ?? [];

  async function handleSubmit(finalAnswers?: Record<string, string>) {
    if (!exam) return;
    const ans = finalAnswers ?? answers;

    // Collect writing questions for AI evaluation
    const writingAnswersList = exam.sections
      .filter((s) => s.category === "Schreiben")
      .flatMap((s) =>
        s.questions.map((q) => ({
          questionId: q.id,
          questionText: q.text,
          sectionInstructions: s.instructions,
          teil: s.teil,
          userAnswer: ans[q.id] ?? "",
          expectedAnswer: q.answer,
        }))
      );

    let evals: Record<string, WritingEvalResult> = {};

    if (writingAnswersList.length > 0) {
      setPhase("evaluating");
      setShowFinishModal(false);
      try {
        const evalRes = await fetch("/api/exam/evaluate-writing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: writingAnswersList }),
        });
        const evalData = await evalRes.json() as { evaluations: Record<string, WritingEvalResult> };
        evals = evalData.evaluations ?? {};
        setWritingEvals(evals);
      } catch {
        // fallback: treat all writing as incorrect
      }
    }

    const writingQIds = new Set(writingAnswersList.map((a) => a.questionId));

    const correctCount = allQuestions.filter((q) => {
      if (writingQIds.has(q.id)) return evals[q.id]?.correct ?? false;
      return ans[q.id] === q.answer;
    }).length;

    const totalCount = allQuestions.length;
    const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const passed = score >= (exam.passingScore ?? 60);

    const bySection = exam.sections.map((s) => ({
      title: s.title,
      category: s.category,
      correct:
        s.category === "Schreiben"
          ? s.questions.filter((q) => evals[q.id]?.correct ?? false).length
          : s.questions.filter((q) => ans[q.id] === q.answer).length,
      total: s.questions.length,
    }));

    const wrongAnswers: WrongItem[] = allQuestions
      .filter((q) => {
        if (writingQIds.has(q.id)) return !(evals[q.id]?.correct ?? false);
        return ans[q.id] !== q.answer;
      })
      .map((q) => ({
        question: q,
        userAnswer: ans[q.id],
        section: exam.sections.find((s) => s.questions.some((sq) => sq.id === q.id))!,
      }));

    const res = await fetch("/api/exam/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId, score, passed, correctCount, totalCount }),
    });
    const data = await res.json();
    const computedResult = { score, passed, xp: data.xp ?? 0, correctCount, totalCount, bySection, wrongAnswers, writingEvals: evals };
    setResult(computedResult);
    setPhase("result");
    setShowFinishModal(false);
    update();
    void fetchAnalysis(allQuestions, ans, bySection, evals);
  }

  async function fetchAnalysis(
    allQs: Question[],
    ans: Record<string, string>,
    bySec: ResultData["bySection"],
    wEvals: Record<string, WritingEvalResult>
  ) {
    if (!exam) return;
    setAnalysisLoading(true);
    try {
      const questions = allQs.map((q) => {
        const section = exam.sections.find((s) => s.questions.some((sq) => sq.id === q.id))!;
        return {
          id: q.id,
          text: q.text,
          correctAnswer: q.answer,
          userAnswer: ans[q.id] ?? "",
          sectionCategory: section.category,
          sectionTeil: section.teil,
          options: q.options,
          isCorrect: section.category === "Schreiben" ? (wEvals[q.id]?.correct ?? false) : ans[q.id] === q.answer,
        };
      });
      const writingFeedbacks: Record<string, string> = {};
      for (const [id, ev] of Object.entries(wEvals)) {
        writingFeedbacks[id] = ev.feedback;
      }
      const res = await fetch("/api/exam/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions, bySection: bySec, writingFeedbacks }),
      });
      const resData = await res.json() as { analysis: AnalysisResult };
      setAnalysis(resData.analysis);
    } catch {
      // ignore — user can still see other tabs
    } finally {
      setAnalysisLoading(false);
    }
  }

  function pick(opt: string) {
    if (selected || !exam) return;
    const section = exam.sections[sectionIdx];
    const question = section.questions[questionIdx];
    const newAnswers = { ...answers, [question.id]: opt };
    setSelected(opt);
    setAnswers(newAnswers);

    autoAdvanceRef.current = setTimeout(() => {
      autoAdvanceRef.current = null;
      const isLastQuestion = questionIdx + 1 >= section.questions.length;
      if (isLastQuestion) {
        setPhase("section-done");
        setSelected(null);
      } else {
        setQuestionIdx((i) => i + 1);
        setSelected(null);
      }
    }, 900);
  }

  async function saveWord(word: string, meaning: string) {
    if (!exam || savedWords[word] || savingWords[word]) return;
    setSavingWords((prev) => ({ ...prev, [word]: true }));
    try {
      await fetch("/api/vocabulary/save-from-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, meaning, levelName: exam.levelName }),
      });
      setSavedWords((prev) => ({ ...prev, [word]: true }));
    } catch {
      // ignore
    } finally {
      setSavingWords((prev) => ({ ...prev, [word]: false }));
    }
  }

  function clearAutoAdvance() {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }

  function navigateToQuestion(idx: number) {
    clearAutoAdvance();
    setQuestionIdx(idx);
    setSelected(null);
    setPhase("question");
  }

  function navigatePrev() {
    clearAutoAdvance();
    setSelected(null);
    if (questionIdx > 0) {
      setQuestionIdx(questionIdx - 1);
    } else if (sectionIdx > 0) {
      const prevIdx = sectionIdx - 1;
      const prevSec = exam!.sections[prevIdx];
      setSectionIdx(prevIdx);
      setQuestionIdx(prevSec.questions.length - 1);
      setActiveNavCategory(prevSec.category);
      setPhase("question");
    }
  }

  function navigateToSection(idx: number) {
    if (!exam) return;
    setSectionIdx(idx);
    setQuestionIdx(0);
    setSelected(null);
    setActiveNavCategory(exam.sections[idx].category);
    // If section has any answers already, go to question view directly
    const sectionAnswered = exam.sections[idx].questions.some((q) => answers[q.id]);
    setPhase(sectionAnswered ? "question" : "section-intro");
  }

  function nextSection() {
    if (!exam) return;
    const isLastSection = sectionIdx + 1 >= exam.sections.length;
    if (isLastSection) {
      setShowFinishModal(true);
    } else {
      setSectionIdx((i) => i + 1);
      setQuestionIdx(0);
      setSelected(null);
      setActiveNavCategory(exam.sections[sectionIdx + 1].category);
      setPhase("section-intro");
    }
  }

  if (phase === "evaluating") return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4 py-16">
      <div className="w-12 h-12 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
      <div className="text-center space-y-1">
        <p className="text-text-primary font-semibold">Yazma cevapları değerlendiriliyor...</p>
        <p className="text-text-muted text-sm">Claude AI cevaplarınızı analiz ediyor</p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-64">
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );

  if (!exam) return (
    <div className="text-center py-16">
      <p className="text-text-muted">Sınav bulunamadı.</p>
      <Link href="/exam" className="text-gold text-sm mt-2 inline-block">← Geri dön</Link>
    </div>
  );

  if (exam.sections.length === 0) return (
    <div className="max-w-xl mx-auto text-center py-16 space-y-4">
      <p className="text-2xl">📋</p>
      <p className="text-text-primary font-semibold">Bu sınava henüz soru eklenmemiş.</p>
      <Link href="/exam" className="text-gold text-sm">← Sınavlara dön</Link>
    </div>
  );

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerWarning = timeLeft < 120;

  const lesenSections = exam.sections.filter((s) => s.category === "Lesen");
  const schreibenSections = exam.sections.filter((s) => s.category === "Schreiben");
  const hasLesen = lesenSections.length > 0;
  const hasSchreiben = schreibenSections.length > 0;

  const navCategorySections = activeNavCategory === "Lesen" ? lesenSections : schreibenSections;

  // ─── SECTION NAVIGATION BAR (visible during exam) ─────────────────────────
  function SectionNavBar() {
    return (
      <div className="space-y-2 mb-4">
        {/* Category tabs */}
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-1.5">
            {hasLesen && (
              <button
                onClick={() => setActiveNavCategory("Lesen")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeNavCategory === "Lesen"
                    ? "bg-blue-400/15 border-blue-400/40 text-blue-400"
                    : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"
                }`}
              >
                <BookOpen className="w-3 h-3" /> Lesen
              </button>
            )}
            {hasSchreiben && (
              <button
                onClick={() => setActiveNavCategory("Schreiben")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeNavCategory === "Schreiben"
                    ? "bg-emerald-400/15 border-emerald-400/40 text-emerald-400"
                    : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"
                }`}
              >
                <PenLine className="w-3 h-3" /> Schreiben
              </button>
            )}
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-mono font-bold ${
            timerWarning ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-navy-border bg-navy-card text-text-secondary"
          }`}>
            <Clock className="w-3.5 h-3.5" />
            {mins}:{secs.toString().padStart(2, "0")}
          </div>

          {/* Finish button */}
          <button
            onClick={() => setShowFinishModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors"
          >
            <Flag className="w-3 h-3" /> Bitir
          </button>
        </div>

        {/* Teil navigation */}
        {navCategorySections.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {navCategorySections.map((s) => {
              const globalIdx = exam!.sections.indexOf(s);
              const isActive = globalIdx === sectionIdx;
              const isDone = s.questions.every((q) => answers[q.id]);
              const isStarted = s.questions.some((q) => answers[q.id]);
              return (
                <button
                  key={s.id}
                  onClick={() => navigateToSection(globalIdx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                    isActive
                      ? activeNavCategory === "Lesen"
                        ? "bg-blue-400/20 border-blue-400/50 text-blue-300"
                        : "bg-emerald-400/20 border-emerald-400/50 text-emerald-300"
                      : isDone
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : isStarted
                      ? "bg-gold/10 border-gold/30 text-gold"
                      : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {isDone && !isActive && <CheckCircle2 className="w-2.5 h-2.5" />}
                  Teil {s.teil}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ─── FINISH MODAL ─────────────────────────────────────────────────────────
  function FinishModal() {
    const answeredCount = Object.keys(answers).length;
    const remaining = allQuestions.length - answeredCount;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-navy-card border border-navy-border rounded-2xl p-6 max-w-sm w-full space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Sınavı bitir?</h3>
              {remaining > 0 && (
                <p className="text-xs text-text-muted mt-0.5">{remaining} soru cevaplanmadı</p>
              )}
            </div>
          </div>
          <p className="text-text-secondary text-sm">
            {remaining > 0
              ? `${remaining} soruyu boş bırakarak sınavı teslim etmek istediğine emin misin?`
              : "Tüm soruları cevapladın. Sınavı teslim etmek istiyor musun?"}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFinishModal(false)}
              className="flex-1 py-2.5 rounded-xl border border-navy-border text-text-secondary text-sm font-medium hover:border-gold/30 transition-colors"
            >
              Devam Et
            </button>
            <button
              onClick={() => void handleSubmit()}
              className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-sm font-bold hover:bg-red-500/25 transition-colors"
            >
              Teslim Et
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto space-y-6"
      >
        <Link href="/exam" className="flex items-center gap-1.5 text-text-muted hover:text-text-secondary text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Sınavlara dön
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-gold uppercase tracking-widest">{exam.levelName}</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary">{exam.name}</h1>
          <p className="text-text-secondary mt-1">Gerçek telc sınav formatında simülasyon</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-navy-card border border-navy-border rounded-xl p-4">
            <Clock className="w-4 h-4 text-gold mb-2" />
            <p className="text-text-primary font-bold">{exam.duration} dakika</p>
            <p className="text-text-muted text-xs">Toplam süre</p>
          </div>
          <div className="bg-navy-card border border-navy-border rounded-xl p-4">
            <Trophy className="w-4 h-4 text-gold mb-2" />
            <p className="text-text-primary font-bold">{exam.passingScore}%</p>
            <p className="text-text-muted text-xs">Geçme puanı</p>
          </div>
        </div>

        <div className="space-y-3">
          {hasLesen && (
            <div className="bg-navy-card border border-navy-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-text-primary">Lesen</span>
                <span className="text-xs text-text-muted">({lesenSections.reduce((a, s) => a + s.questions.length, 0)} soru)</span>
              </div>
              <div className="space-y-1.5">
                {lesenSections.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{s.title}</span>
                    <span className="text-text-muted text-xs">{s.questions.length} soru</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {hasSchreiben && (
            <div className="bg-navy-card border border-navy-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <PenLine className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-text-primary">Schreiben</span>
                <span className="text-xs text-text-muted">({schreibenSections.reduce((a, s) => a + s.questions.length, 0)} soru)</span>
              </div>
              <div className="space-y-1.5">
                {schreibenSections.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{s.title}</span>
                    <span className="text-text-muted text-xs">{s.questions.length} soru</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setPhase("section-intro")}
          className="w-full py-3.5 rounded-xl bg-gold/15 border border-gold/30 text-gold font-bold text-sm hover:bg-gold/25 transition-colors flex items-center justify-center gap-2"
        >
          Sınavı Başlat <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  if (phase === "result" && result) {
    const emoji = result.passed ? "🏆" : result.score >= 40 ? "📚" : "💪";
    const lesenResult = result.bySection.filter((s) => s.category === "Lesen");
    const schreibenResult = result.bySection.filter((s) => s.category === "Schreiben");

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto space-y-5"
      >
        {/* Score header */}
        <div className="text-center space-y-3 pt-4">
          <div className="text-5xl">{emoji}</div>
          <div>
            <h2 className="text-4xl font-black text-text-primary">{result.score}%</h2>
            <p className="text-text-muted mt-1">{result.correctCount} / {result.totalCount} doğru</p>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
            result.passed ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"
          }`}>
            {result.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {result.passed ? "GEÇTİN! Tebrikler!" : "Başarısız — Tekrar dene!"}
          </div>
          <div className="bg-gold/10 border border-gold/30 rounded-xl p-3">
            <p className="text-gold font-bold text-lg">+{result.xp} XP kazandın!</p>
          </div>
        </div>

        {/* Result tabs */}
        <div className="flex gap-1 bg-navy p-1 rounded-xl border border-navy-border">
          <button
            onClick={() => setResultTab("summary")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              resultTab === "summary" ? "bg-navy-card text-text-primary" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Özet
          </button>
          <button
            onClick={() => setResultTab("wrong")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              resultTab === "wrong" ? "bg-navy-card text-text-primary" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Yanlışlar
            {result.wrongAnswers.length > 0 && (
              <span className="bg-red-500/20 text-red-400 text-xs px-1.5 py-0.5 rounded-full border border-red-500/30">
                {result.wrongAnswers.length}
              </span>
            )}
          </button>
          {hasSchreiben && Object.keys(result.writingEvals).length > 0 && (
            <button
              onClick={() => setResultTab("writing")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                resultTab === "writing" ? "bg-navy-card text-text-primary" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <PenLine className="w-3 h-3" /> Schreiben
            </button>
          )}
          <button
            onClick={() => setResultTab("analysis")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              resultTab === "analysis" ? "bg-navy-card text-text-primary" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {analysisLoading
              ? <div className="w-3 h-3 border border-gold/40 border-t-gold rounded-full animate-spin" />
              : <Brain className="w-3 h-3" />
            }
            Analiz
          </button>
        </div>

        <AnimatePresence mode="wait">
          {resultTab === "analysis" ? (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {analysisLoading ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  <p className="text-text-muted text-sm">Sınav analiz ediliyor...</p>
                </div>
              ) : analysis ? (
                <>
                  {/* Overall feedback */}
                  <div className="bg-gold/8 border border-gold/25 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-gold" />
                      <span className="text-xs font-bold text-gold uppercase tracking-wider">Genel Değerlendirme</span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{analysis.overallFeedback}</p>
                  </div>

                  {/* Weak topics */}
                  {analysis.weakTopics.length > 0 && (
                    <div className="bg-navy-card border border-navy-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Zayıf Konular</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.weakTopics.map((topic, i) => (
                          <span key={i} className="bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs px-2.5 py-1 rounded-lg">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Important vocabulary */}
                  {analysis.importantVocabulary.length > 0 && (
                    <div className="bg-navy-card border border-navy-border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Önemli Kelimeler</span>
                        </div>
                        <span className="text-xs text-text-muted">+ ile kelimelerine ekle</span>
                      </div>
                      <div className="space-y-1.5">
                        {analysis.importantVocabulary.map((v, i) => {
                          const isSaved = savedWords[v.word];
                          const isSaving = savingWords[v.word];
                          return (
                            <div key={i} className="bg-navy rounded-lg px-3 py-2.5 flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-text-primary text-sm font-bold">{v.word}</p>
                                <p className="text-text-muted text-xs">{v.meaning}</p>
                              </div>
                              <button
                                onClick={() => void saveWord(v.word, v.meaning)}
                                disabled={isSaved || isSaving}
                                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                  isSaved
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                                    : "bg-navy-card border border-navy-border text-text-muted hover:border-gold/50 hover:text-gold active:scale-95"
                                }`}
                              >
                                {isSaving ? (
                                  <div className="w-3 h-3 border border-current/30 border-t-current rounded-full animate-spin" />
                                ) : isSaved ? (
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Per-question Turkish explanations */}
                  <div className="bg-navy-card border border-navy-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-text-secondary" />
                      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Tüm Soru Açıklamaları</span>
                    </div>
                    <div className="space-y-2.5">
                      {allQuestions.map((q, i) => {
                        const section = exam.sections.find((s) => s.questions.some((sq) => sq.id === q.id))!;
                        const isCorrect = section.category === "Schreiben"
                          ? (result.writingEvals[q.id]?.correct ?? false)
                          : answers[q.id] === q.answer;
                        const explanation = analysis.questionExplanations[q.id];
                        return (
                          <div key={q.id} className="flex gap-3 items-start">
                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                              isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}>
                              {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-text-secondary text-xs font-medium leading-snug">{i + 1}. {q.text}</p>
                              {explanation && (
                                <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{explanation}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-text-muted text-sm">Analiz yüklenemedi.</p>
                </div>
              )}
            </motion.div>
          ) : resultTab === "writing" ? (
            <motion.div
              key="writing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              {exam.sections
                .filter((s) => s.category === "Schreiben")
                .flatMap((s) => s.questions.map((q) => ({ q, s })))
                .map(({ q, s }) => {
                  const ev = result.writingEvals[q.id];
                  const userAns = answers[q.id] ?? "";
                  return (
                    <div key={q.id} className="bg-navy-card border border-navy-border rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-400/70 uppercase tracking-wide">
                          Schreiben – Teil {s.teil}
                        </span>
                        {ev && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                            ev.correct
                              ? "bg-green-500/15 border-green-500/30 text-green-400"
                              : "bg-red-500/15 border-red-500/30 text-red-400"
                          }`}>
                            {ev.score}/100
                          </span>
                        )}
                      </div>
                      <p className="text-text-primary text-sm font-medium">{q.text}</p>
                      <div className="space-y-2">
                        <div className="bg-navy rounded-lg p-3">
                          <p className="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Senin Cevabın</p>
                          <p className="text-text-secondary text-sm">{userAns || <span className="italic opacity-60">Boş bırakıldı</span>}</p>
                        </div>
                        <div className="bg-navy rounded-lg p-3">
                          <p className="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Beklenen Cevap</p>
                          <p className="text-green-400 text-sm">{q.answer}</p>
                        </div>
                        {ev?.feedback && (
                          <div className="bg-gold/8 border border-gold/20 rounded-lg p-3">
                            <p className="text-xs font-bold text-gold mb-1 uppercase tracking-wide">AI Değerlendirmesi</p>
                            <p className="text-text-secondary text-sm">{ev.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          ) : resultTab === "summary" ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              {/* Lesen section results */}
              {lesenResult.length > 0 && (
                <div className="bg-navy-card border border-navy-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Lesen</span>
                  </div>
                  <div className="space-y-2.5">
                    {lesenResult.map((s, i) => {
                      const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">{s.title}</span>
                            <span className="text-text-muted text-xs">{s.correct}/{s.total} · {pct}%</span>
                          </div>
                          <div className="w-full bg-navy rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${pct >= 60 ? "bg-green-400" : "bg-red-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Schreiben section results */}
              {schreibenResult.length > 0 && (
                <div className="bg-navy-card border border-navy-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <PenLine className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Schreiben</span>
                  </div>
                  <div className="space-y-2.5">
                    {schreibenResult.map((s, i) => {
                      const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">{s.title}</span>
                            <span className="text-text-muted text-xs">{s.correct}/{s.total} · {pct}%</span>
                          </div>
                          <div className="w-full bg-navy rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${pct >= 60 ? "bg-green-400" : "bg-red-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              {result.wrongAnswers.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <div className="text-3xl">🎯</div>
                  <p className="text-text-primary font-semibold">Mükemmel! Hiç yanlışın yok.</p>
                </div>
              ) : (
                result.wrongAnswers.map((item, i) => {
                  const isExpanded = expandedWrong === item.question.id;
                  const catColor = item.section.category === "Lesen" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
                  return (
                    <div key={item.question.id} className="bg-navy-card border border-navy-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedWrong(isExpanded ? null : item.question.id)}
                        className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-white/2 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-red-400 text-xs font-bold flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> {i + 1}. Yanlış
                            </span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${catColor}`}>
                              {item.section.category} · Teil {item.section.teil}
                            </span>
                          </div>
                          <p className="text-text-primary text-sm leading-relaxed line-clamp-2">{item.question.text}</p>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-3 border-t border-navy-border pt-3">
                              {item.question.context && (
                                <div className="bg-navy rounded-lg p-3">
                                  <p className="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Metin</p>
                                  <p className="text-text-secondary text-xs leading-relaxed italic">{item.question.context}</p>
                                </div>
                              )}

                              <p className="text-text-primary text-sm font-medium">{item.question.text}</p>

                              {/* Answer display: writing vs multiple choice */}
                              {item.section.category === "Schreiben" ? (
                                <div className="space-y-2">
                                  <div className="bg-navy rounded-lg p-3">
                                    <p className="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Senin Cevabın</p>
                                    <p className="text-red-400 text-sm">{item.userAnswer || <span className="italic opacity-60">Boş bırakıldı</span>}</p>
                                  </div>
                                  <div className="bg-navy rounded-lg p-3">
                                    <p className="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Beklenen Cevap</p>
                                    <p className="text-green-400 text-sm">{item.question.answer}</p>
                                  </div>
                                  {result.writingEvals[item.question.id]?.feedback && (
                                    <div className="bg-gold/8 border border-gold/20 rounded-lg p-3">
                                      <p className="text-xs font-bold text-gold mb-1 uppercase tracking-wide">AI Değerlendirmesi</p>
                                      <p className="text-text-secondary text-sm">{result.writingEvals[item.question.id].feedback}</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-1.5">
                                  {item.question.options.map((opt) => {
                                    const isCorrect = opt === item.question.answer;
                                    const isUserWrong = opt === item.userAnswer && !isCorrect;
                                    return (
                                      <div
                                        key={opt}
                                        className={`px-3 py-2 rounded-lg text-sm border flex items-center gap-2 ${
                                          isCorrect
                                            ? "bg-green-500/15 border-green-500/40 text-green-400"
                                            : isUserWrong
                                            ? "bg-red-500/15 border-red-500/40 text-red-400"
                                            : "bg-navy border-navy-border text-text-muted opacity-50"
                                        }`}
                                      >
                                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                                        {isUserWrong && <XCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                                        {opt}
                                        {isCorrect && <span className="ml-auto text-xs opacity-70">Doğru cevap</span>}
                                        {isUserWrong && <span className="ml-auto text-xs opacity-70">Senin cevabın</span>}
                                      </div>
                                    );
                                  })}
                                  {!item.userAnswer && (
                                    <p className="text-text-muted text-xs italic">Bu soruyu boş bıraktın.</p>
                                  )}
                                </div>
                              )}

                              {/* Explanation */}
                              {item.question.explanation && (
                                <div className="bg-gold/8 border border-gold/20 rounded-lg p-3">
                                  <p className="text-xs font-bold text-gold mb-1.5 uppercase tracking-wide">Açıklama</p>
                                  <p className="text-text-secondary text-sm leading-relaxed">{item.question.explanation}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 justify-center pb-6">
          <Link href="/exam" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-card border border-navy-border text-text-secondary text-sm hover:border-gold/30 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Sınavlar
          </Link>
          <button
            onClick={() => {
              setSectionIdx(0); setQuestionIdx(0); setSelected(null);
              setAnswers({}); setResult(null); setPhase("intro");
              setTimeLeft(exam.duration * 60); setResultTab("summary");
              setExpandedWrong(null); setWritingEvals({}); setAnalysis(null); setAnalysisLoading(false); setSavedWords({}); setSavingWords({});
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold/15 border border-gold/30 text-gold font-bold text-sm hover:bg-gold/25 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Tekrar Al
          </button>
        </div>
      </motion.div>
    );
  }

  const currentSection = exam.sections[sectionIdx];
  const categoryColor = currentSection.category === "Lesen" ? "text-blue-400" : "text-emerald-400";
  const categoryBg = currentSection.category === "Lesen" ? "bg-blue-400/10 border-blue-400/20" : "bg-emerald-400/10 border-emerald-400/20";
  const CategoryIcon = currentSection.category === "Lesen" ? BookOpen : PenLine;

  // ─── SECTION INTRO ────────────────────────────────────────────────────────
  if (phase === "section-intro") {
    return (
      <>
        {showFinishModal && <FinishModal />}
        <motion.div
          key={`section-intro-${sectionIdx}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl mx-auto space-y-5"
        >
          <SectionNavBar />

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold ${categoryBg} ${categoryColor}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            {currentSection.category} – Teil {currentSection.teil}
          </div>

          <div>
            <h2 className="text-xl font-black text-text-primary">{currentSection.title}</h2>
            <p className="text-text-secondary mt-2 leading-relaxed">{currentSection.instructions}</p>
          </div>

          {currentSection.passage && (
            <div className="bg-navy-card border border-navy-border rounded-xl p-4">
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Okuma Metni</p>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">{currentSection.passage}</p>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>{currentSection.questions.length} soru</span>
            <span>Bölüm {sectionIdx + 1} / {exam.sections.length}</span>
          </div>

          <button
            onClick={() => setPhase("question")}
            className="w-full py-3.5 rounded-xl bg-gold/15 border border-gold/30 text-gold font-bold text-sm hover:bg-gold/25 transition-colors flex items-center justify-center gap-2"
          >
            Başla <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </>
    );
  }

  // ─── SECTION DONE ─────────────────────────────────────────────────────────
  if (phase === "section-done") {
    const sectionQuestions = currentSection.questions;
    const isWritingSection = currentSection.category === "Schreiben";
    const correct = isWritingSection
      ? sectionQuestions.filter((q) => answers[q.id]?.trim()).length
      : sectionQuestions.filter((q) => answers[q.id] === q.answer).length;
    const isLastSection = sectionIdx + 1 >= exam.sections.length;
    const nextSec = !isLastSection ? exam.sections[sectionIdx + 1] : null;

    return (
      <>
        {showFinishModal && <FinishModal />}
        <motion.div
          key={`section-done-${sectionIdx}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto space-y-5"
        >
          <SectionNavBar />

          <div className="text-center space-y-4 py-4">
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto ${categoryBg}`}>
              <CategoryIcon className={`w-7 h-7 ${categoryColor}`} />
            </div>
            <div>
              <h2 className="text-xl font-black text-text-primary">{currentSection.title} tamamlandı!</h2>
              <p className="text-text-muted mt-1">
                {correct} / {sectionQuestions.length} {isWritingSection ? "cevaplandı" : "doğru"}
              </p>
            </div>

            {nextSec ? (
              <div className="bg-navy-card border border-navy-border rounded-xl p-4 text-left">
                <p className="text-xs text-text-muted mb-1">Sıradaki bölüm</p>
                <p className="font-semibold text-text-primary">{nextSec.title}</p>
                <p className="text-text-muted text-sm mt-0.5">{nextSec.questions.length} soru</p>
              </div>
            ) : (
              <div className="bg-gold/8 border border-gold/20 rounded-xl p-4">
                <p className="text-gold font-semibold text-sm">Tüm bölümleri tamamladın!</p>
                <p className="text-text-muted text-xs mt-1">Sınavı teslim etmeye hazır olduğunda "Sınavı Bitir" butonuna bas.</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {isLastSection ? (
              <button
                onClick={() => setShowFinishModal(true)}
                className="flex-1 py-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 font-bold text-sm hover:bg-red-500/25 transition-colors flex items-center justify-center gap-2"
              >
                <Flag className="w-4 h-4" /> Sınavı Bitir
              </button>
            ) : (
              <button
                onClick={nextSection}
                className="flex-1 py-3.5 rounded-xl bg-gold/15 border border-gold/30 text-gold font-bold text-sm hover:bg-gold/25 transition-colors flex items-center justify-center gap-2"
              >
                Devam Et <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </>
    );
  }

  // ─── QUESTION ─────────────────────────────────────────────────────────────
  const q = currentSection.questions[questionIdx];
  const totalDone = exam.sections.slice(0, sectionIdx).reduce((a, s) => a + s.questions.length, 0) + questionIdx;
  const totalAll = allQuestions.length;

  return (
    <>
      {showFinishModal && <FinishModal />}
      <div className="max-w-xl mx-auto space-y-4">
        <SectionNavBar />

        {/* Question number navigation */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {currentSection.questions.map((sq, idx) => {
              const isAnswered = !!answers[sq.id];
              const isCurrent = idx === questionIdx;
              return (
                <button
                  key={sq.id}
                  onClick={() => navigateToQuestion(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                    isCurrent
                      ? currentSection.category === "Lesen"
                        ? "bg-blue-400/25 border-blue-400/60 text-blue-300"
                        : "bg-emerald-400/25 border-emerald-400/60 text-emerald-300"
                      : isAnswered
                      ? "bg-gold/15 border-gold/40 text-gold"
                      : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={navigatePrev}
              disabled={questionIdx === 0 && sectionIdx === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-navy-border text-text-muted text-xs font-medium hover:text-text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Önceki
            </button>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${categoryBg} ${categoryColor}`}>
                <CategoryIcon className="w-3 h-3" />
                {currentSection.category} – T{currentSection.teil}
              </div>
              <span className="text-text-muted text-xs font-medium">{questionIdx + 1} / {currentSection.questions.length}</span>
            </div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="w-full bg-navy rounded-full h-1">
          <motion.div
            className="bg-gold h-1 rounded-full"
            animate={{ width: `${((totalDone + 1) / totalAll) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Schreiben: instructions text (scenario/person info needed during questions) */}
        {currentSection.category === "Schreiben" && (
          <div className="bg-navy-card border border-emerald-400/20 rounded-xl p-3">
            <p className="text-xs font-bold text-emerald-400/70 mb-1.5 uppercase tracking-wide">Görev Metni</p>
            <p className="text-text-secondary text-sm leading-relaxed">{currentSection.instructions}</p>
          </div>
        )}

        {/* Lesen: passage text */}
        {currentSection.category === "Lesen" && currentSection.passage && (
          <div className="bg-navy-card border border-navy-border rounded-xl p-3 max-h-36 overflow-y-auto">
            <p className="text-text-secondary text-xs leading-relaxed whitespace-pre-line">{currentSection.passage}</p>
          </div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            {q.context && (
              <div className="bg-navy border border-navy-border rounded-xl p-3">
                <p className="text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide">Metin</p>
                <p className="text-text-secondary text-sm leading-relaxed italic">{q.context}</p>
              </div>
            )}

            <div className="bg-navy-card border border-navy-border rounded-2xl p-4">
              <p className="text-text-primary font-semibold text-base leading-relaxed">{q.text}</p>
            </div>

            {currentSection.category === "Schreiben" ? (
              <WritingInput
                questionId={q.id}
                currentValue={answers[q.id] ?? ""}
                teil={currentSection.teil}
                onSave={(text) => setAnswers((prev) => ({ ...prev, [q.id]: text }))}
                onNext={() => {
                  const isLastQuestion = questionIdx + 1 >= currentSection.questions.length;
                  if (isLastQuestion) {
                    setPhase("section-done");
                  } else {
                    setQuestionIdx((i) => i + 1);
                  }
                }}
              />
            ) : (
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const picked = selected === opt;
                  const correct = opt === q.answer;
                  return (
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => pick(opt)}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-medium text-left border transition-all duration-200 ${
                        selected
                          ? correct
                            ? "bg-green-500/20 border-green-500/50 text-green-400"
                            : picked
                            ? "bg-red-500/20 border-red-500/50 text-red-400"
                            : "bg-navy border-navy-border text-text-muted opacity-50"
                          : "bg-navy border-navy-border text-text-primary hover:border-gold/40 hover:bg-gold/5"
                      }`}
                    >
                      {selected && correct && <CheckCircle2 className="inline w-3.5 h-3.5 mr-2" />}
                      {selected && picked && !correct && <XCircle className="inline w-3.5 h-3.5 mr-2" />}
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
