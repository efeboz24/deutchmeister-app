"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  BookOpen, List, ClipboardList, ChevronDown, ChevronUp,
  CheckCircle, XCircle, RotateCcw, Lightbulb, Volume2, TableProperties, Trophy
} from "lucide-react";
import type { LessonContent } from "@/lib/lesson-content";
import { saveProgress } from "@/lib/saveProgress";

type Tab = "theory" | "vocab" | "quiz";

interface LessonViewerProps {
  content: LessonContent;
  lessonName: string;
}

/** Browser TTS — reads a German word/phrase aloud */
function speakGerman(text: string) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

export function LessonViewer({ content, lessonName }: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("theory");

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "theory", label: "Teori", icon: BookOpen },
    { id: "vocab", label: "Kelimeler", icon: List },
    { id: "quiz", label: "Alıştırmalar", icon: ClipboardList },
  ];

  return (
    <div className="space-y-6">
      {/* Lesson header */}
      <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
        <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">{lessonName}</p>
        <h1 className="text-2xl font-bold text-text-primary mb-1">{content.title}</h1>
        <p className="text-sm text-text-secondary">{content.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-navy-card border border-navy-border rounded-xl">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === id
                ? "bg-gold text-navy shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-navy-light"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "theory" && <TheoryTab content={content} />}
      {activeTab === "vocab" && <VocabTab content={content} />}
      {activeTab === "quiz" && <QuizTab content={content} />}
    </div>
  );
}

// ─── GRAMMAR TABLE ────────────────────────────────────────────────────────────

function GrammarTable({ table }: { table: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-navy-border">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 bg-gold/15 text-gold text-left text-xs font-bold uppercase tracking-wide border-b border-gold/20"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr
              key={ri}
              className={`animate-slideInRow transition-colors ${ri % 2 === 0 ? "bg-navy" : "bg-navy-card"} hover:bg-gold/5`}
              style={{ animationDelay: `${ri * 50}ms` }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-2 border-b border-navy-border text-sm ${
                    ci === 0
                      ? "text-gold font-semibold"
                      : cell.includes("✓")
                      ? "text-emerald-400 font-medium"
                      : cell.includes("✗")
                      ? "text-text-muted"
                      : "text-text-primary"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── THEORY TAB ──────────────────────────────────────────────────────────────

function TheoryTab({ content }: { content: LessonContent }) {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {/* Intro */}
      <div className="bg-navy-card border border-gold/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-gold" />
          <span className="text-sm font-semibold text-gold">Giriş</span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{content.theory.intro}</p>
      </div>

      {/* Sections */}
      {content.theory.sections.map((section, idx) => (
        <div
          key={idx}
          className="bg-navy-card border border-navy-border rounded-xl overflow-hidden animate-fadeIn"
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-navy-light transition-colors"
            onClick={() => setOpenSection(openSection === idx ? null : idx)}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs flex items-center justify-center font-bold flex-shrink-0">
                {section.icon ?? (idx + 1)}
              </span>
              <span className="font-semibold text-text-primary text-sm text-left">{section.heading}</span>
            </div>
            {openSection === idx ? (
              <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
            )}
          </button>

          {openSection === idx && (
            <div className="px-5 pb-5 space-y-4 animate-fadeIn">
              <p className="text-sm text-text-secondary leading-relaxed">{section.body}</p>

              {section.examples && section.examples.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">Örnekler</p>
                  <div className="grid gap-2">
                    {section.examples.map((ex, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-3 bg-navy rounded-lg px-4 py-3 border border-navy-border group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-text-primary">{ex.de}</p>
                            <button
                              onClick={(e) => { e.stopPropagation(); speakGerman(ex.de); }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-gold/60 hover:text-gold flex-shrink-0"
                              title="Telaffuzu Dinle"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-text-muted mt-0.5">{ex.tr}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar table */}
              {section.table && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <TableProperties className="w-3.5 h-3.5 text-gold/70" />
                    <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">Tablo</p>
                  </div>
                  <GrammarTable table={section.table} />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── VOCAB TAB ────────────────────────────────────────────────────────────────

function ConjugationTable({ conjugation }: { conjugation: { pronoun: string; form: string }[] }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-violet-500/20 bg-violet-500/5">
      <div className="px-3 py-1.5 border-b border-violet-500/20 flex items-center gap-1.5">
        <TableProperties className="w-3 h-3 text-violet-400" />
        <span className="text-xs font-semibold text-violet-400 uppercase tracking-wide">Fiil Çekimi</span>
      </div>
      <table className="w-full text-xs">
        <tbody>
          {conjugation.map((c, ci) => (
            <tr key={ci} className={ci % 2 === 0 ? "bg-transparent" : "bg-violet-500/5"}>
              <td className="px-3 py-1.5 text-text-muted font-medium w-2/5 border-b border-violet-500/10">{c.pronoun}</td>
              <td className="px-3 py-1.5 text-text-primary font-bold border-b border-violet-500/10">
                <span className="flex items-center gap-2">
                  {c.form}
                  <button
                    onClick={(e) => { e.stopPropagation(); speakGerman(c.form); }}
                    className="text-violet-400/50 hover:text-violet-400 transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VocabTab({ content }: { content: LessonContent }) {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted text-center">
        Kartlara tıklayarak çeviriyi görün · 🔊 sesli telaffuzu dinleyin
      </p>
      {content.vocabulary.map((item, idx) => {
        const isFlipped = flippedId === idx;
        const isVerb = item.partOfSpeech === "Verb" || item.partOfSpeech === "Modalverb";
        return (
          <div
            key={idx}
            onClick={() => setFlippedId(isFlipped ? null : idx)}
            className="w-full text-left bg-navy-card border border-navy-border rounded-xl p-4 hover:border-gold/40 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text-muted font-mono">{idx + 1}</span>
                  <span className="font-bold text-text-primary">{item.word}</span>
                  <span className="text-xs text-text-muted bg-navy px-1.5 py-0.5 rounded border border-navy-border">
                    {item.partOfSpeech}
                  </span>
                  {/* Speaker button — always visible */}
                  <button
                    onClick={(e) => { e.stopPropagation(); speakGerman(item.word); }}
                    className="ml-auto text-gold/50 hover:text-gold transition-colors flex-shrink-0"
                    title="Telaffuzu Dinle"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {isFlipped ? (
                  <div className="mt-2 space-y-1 animate-fadeIn">
                    <p className="text-sm font-medium text-gold">{item.meaning}</p>
                    <p className="text-xs text-text-secondary italic">„{item.example}"</p>
                    {/* Verb conjugation note */}
                    {isVerb && item.conjugation && item.conjugation.length > 0 && (
                      <ConjugationTable conjugation={item.conjugation} />
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted mt-0.5">
                    Tıkla → çeviriyi gör{isVerb ? " · fiil çekimini gör" : ""}
                  </p>
                )}
              </div>
              <div className={`transition-transform duration-300 flex-shrink-0 ${isFlipped ? "rotate-180" : ""}`}>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── QUIZ TAB ─────────────────────────────────────────────────────────────────

type MCQState = "unanswered" | "correct" | "wrong";

function QuizTab({ content }: { content: LessonContent }) {
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [mcqStates, setMcqStates] = useState<Record<number, MCQState>>({});
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillChecked, setFillChecked] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  const mcqScore = Object.values(mcqStates).filter((s) => s === "correct").length;
  const totalMCQ = content.exercises.multipleChoice.length;
  const answeredAll = totalMCQ > 0 && Object.keys(mcqStates).length === totalMCQ;

  const pct = totalMCQ > 0 ? Math.round((mcqScore / totalMCQ) * 100) : 0;
  const earnedXP = answeredAll ? Math.max(20, 10 + mcqScore * 3 + (mcqScore === totalMCQ ? 15 : 0)) : 0;
  const savedRef = useRef(false);

  useEffect(() => {
    if (!answeredAll || savedRef.current) return;
    savedRef.current = true;
    saveProgress({ xp: earnedXP, skill: "grammatik", skillScore: pct });
  }, [answeredAll, earnedXP, pct]);

  const handleMCQSelect = (questionId: number, optionIdx: number, correct: number) => {
    if (mcqStates[questionId]) return;
    const isCorrect = optionIdx === correct;
    setMcqAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setMcqStates((prev) => ({ ...prev, [questionId]: isCorrect ? "correct" : "wrong" }));
  };

  const handleFillCheck = (id: number) => {
    setFillChecked((prev) => ({ ...prev, [id]: true }));
  };

  const isFillCorrect = (id: number, answer: string) => {
    const userAnswer = (fillAnswers[id] ?? "").trim().toLowerCase();
    return userAnswer === answer.toLowerCase();
  };

  const resetAll = useCallback(() => {
    setMcqAnswers({});
    setMcqStates({});
    setFillAnswers({});
    setFillChecked({});
    setShowHints({});
  }, []);

  return (
    <div className="space-y-8">
      {/* Completion banner */}
      {answeredAll && (
        <div className={`flex items-center gap-4 p-4 rounded-xl border ${
          mcqScore === totalMCQ
            ? "bg-emerald-500/10 border-emerald-500/30"
            : pct >= 70
            ? "bg-gold/10 border-gold/30"
            : "bg-navy-card border-navy-border"
        }`}>
          <Trophy className={`w-8 h-8 flex-shrink-0 ${
            mcqScore === totalMCQ ? "text-emerald-400" : pct >= 70 ? "text-gold" : "text-text-muted"
          }`} />
          <div>
            <p className="font-bold text-text-primary text-sm">
              {mcqScore === totalMCQ
                ? "Mükemmel! Tüm soruları doğru yanıtladın."
                : pct >= 70
                ? "Harika iş! Çoğu soruyu doğru yanıtladın."
                : "Alıştırmalar tamamlandı. Tekrar çalışmaya devam et!"}
            </p>
            <p className="text-xs text-text-secondary mt-0.5">
              {mcqScore}/{totalMCQ} doğru ·{" "}
              <span className="text-gold font-semibold">+{earnedXP} XP</span> kazanıldı
            </p>
          </div>
        </div>
      )}

      {/* MCQ Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-gold" />
            Çoktan Seçmeli ({totalMCQ} soru)
          </h2>
          {answeredAll && (
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              mcqScore === totalMCQ
                ? "bg-emerald-500/15 text-emerald-400"
                : mcqScore >= Math.ceil(totalMCQ * 0.7)
                ? "bg-gold/15 text-gold"
                : "bg-red-500/15 text-red-400"
            }`}>
              {mcqScore}/{totalMCQ} doğru
            </span>
          )}
        </div>

        {content.exercises.multipleChoice.map((q) => {
          const state = mcqStates[q.id];
          const selected = mcqAnswers[q.id];

          return (
            <div key={q.id} className="bg-navy-card border border-navy-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-navy-border">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-text-muted mt-0.5 flex-shrink-0">{q.id}.</span>
                  <p className="text-sm font-medium text-text-primary">{q.question}</p>
                </div>
              </div>

              <div className="p-4 grid gap-2">
                {q.options.map((opt, idx) => {
                  let btnClass = "border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
                  if (state) {
                    if (idx === q.correct) {
                      btnClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                    } else if (idx === selected && state === "wrong") {
                      btnClass = "border-red-500/50 bg-red-500/10 text-red-300";
                    } else {
                      btnClass = "border-navy-border text-text-muted opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleMCQSelect(q.id, idx, q.correct)}
                      disabled={!!state}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all duration-150 ${btnClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {state && (
                <div
                  className={`px-5 py-3 border-t text-xs leading-relaxed flex items-start gap-2 ${
                    state === "correct"
                      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                      : "border-red-500/30 bg-red-500/5 text-red-300"
                  }`}
                >
                  {state === "correct" ? (
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{state === "correct" ? "Doğru! " : "Yanlış. "}{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fill in blank section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          Boşluk Doldurma ({content.exercises.fillInBlank.length} soru)
        </h2>

        {content.exercises.fillInBlank.map((q) => {
          const checked = fillChecked[q.id];
          const correct = checked && isFillCorrect(q.id, q.answer);
          const wrong = checked && !isFillCorrect(q.id, q.answer);

          return (
            <div key={q.id} className="bg-navy-card border border-navy-border rounded-xl p-5 space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-text-muted mt-0.5">{q.id}.</span>
                <p className="text-sm text-text-primary leading-relaxed">
                  {q.before}{" "}
                  <input
                    type="text"
                    value={fillAnswers[q.id] ?? ""}
                    onChange={(e) => {
                      if (checked) return;
                      setFillAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && fillAnswers[q.id]?.trim() && !checked) {
                        handleFillCheck(q.id);
                      }
                    }}
                    placeholder="___"
                    className={`inline-block w-28 text-center border-b-2 bg-transparent outline-none text-sm font-semibold transition-colors px-1
                      ${correct ? "border-emerald-500 text-emerald-400" : wrong ? "border-red-500 text-red-400" : "border-gold/50 text-gold focus:border-gold"}`}
                  />
                  {q.after && <span className="text-text-muted text-xs ml-1 italic">{q.after}</span>}
                </p>
              </div>

              {/* Hint */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                  className="text-xs text-text-muted hover:text-gold transition-colors flex items-center gap-1"
                >
                  <Lightbulb className="w-3 h-3" />
                  {showHints[q.id] ? "İpucunu Gizle" : "İpucu"}
                </button>
                {showHints[q.id] && (
                  <span className="text-xs text-gold">{q.hint}</span>
                )}
              </div>

              {/* Check button */}
              {!checked ? (
                <button
                  onClick={() => handleFillCheck(q.id)}
                  disabled={!(fillAnswers[q.id]?.trim())}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gold text-navy hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Kontrol Et
                </button>
              ) : (
                <div className={`flex items-center gap-2 text-xs font-medium ${correct ? "text-emerald-400" : "text-red-400"}`}>
                  {correct ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Doğru!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      Yanlış — doğru cevap: <span className="font-bold text-gold">{q.answer}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <button
        onClick={resetAll}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-navy-border text-text-muted text-sm hover:border-gold/40 hover:text-text-primary transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Alıştırmaları Sıfırla
      </button>
    </div>
  );
}
