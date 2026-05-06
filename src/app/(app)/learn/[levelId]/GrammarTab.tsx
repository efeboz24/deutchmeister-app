"use client";

import { useState, useCallback, useEffect } from "react";
import {
  BookOpen, ClipboardList, ChevronDown, ChevronUp,
  CheckCircle, XCircle, RotateCcw, Lightbulb, TableProperties, Trophy,
} from "lucide-react";
import { SpeakBtn } from "@/components/ui/SpeakBtn";
import type { B1GrammarTopic } from "@/lib/grammar-b1";
import type { MistakeEntry } from "@/app/(app)/mistakes/page";

interface GrammarTabProps {
  topics: B1GrammarTopic[];
  levelId: string;
  levelName: string;
}

// ─── Single topic accordion ────────────────────────────────────────────────

interface TopicCardProps {
  topic: B1GrammarTopic;
  completed: boolean;
  onToggleComplete: () => void;
  levelName: string;
}

function TopicCard({ topic, completed, onToggleComplete, levelName }: TopicCardProps) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"theory" | "exercises">("theory");
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [mcqStates, setMcqStates] = useState<Record<number, "correct" | "wrong">>({});
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillChecked, setFillChecked] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [openRule, setOpenRule] = useState<number | null>(0);

  const mcqScore = Object.values(mcqStates).filter((s) => s === "correct").length;
  const totalMCQ = topic.exercises.multipleChoice.length;
  const answeredAll = Object.keys(mcqStates).length === totalMCQ;

  const handleMCQ = (qId: number, idx: number, correct: number) => {
    if (mcqStates[qId]) return;
    setMcqAnswers((p) => ({ ...p, [qId]: idx }));
    const isCorrect = idx === correct;
    setMcqStates((p) => ({ ...p, [qId]: isCorrect ? "correct" : "wrong" }));

    const storageKey = "grammar-mistakes";
    const mistakeKey = `${topic.id}-${qId}`;
    const q = topic.exercises.multipleChoice.find((m) => m.id === qId);
    if (!q) return;

    const existing: MistakeEntry[] = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    if (isCorrect) {
      const updated = existing.filter((m) => m.key !== mistakeKey);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } else {
      if (!existing.find((m) => m.key === mistakeKey)) {
        const entry: MistakeEntry = {
          key: mistakeKey,
          topicId: topic.id,
          topicTitle: topic.title,
          levelName,
          question: q.question,
          options: q.options,
          correct: q.correct,
          explanation: q.explanation,
          addedAt: Date.now(),
        };
        localStorage.setItem(storageKey, JSON.stringify([...existing, entry]));
      }
    }
  };

  const isFillCorrect = (id: number, answer: string) =>
    (fillAnswers[id] ?? "").trim().toLowerCase() === answer.toLowerCase();

  const reset = useCallback(() => {
    setMcqAnswers({});
    setMcqStates({});
    setFillAnswers({});
    setFillChecked({});
    setShowHints({});
  }, []);

  return (
    <div className={`bg-navy-card border rounded-xl overflow-hidden transition-colors ${
      completed ? "border-emerald-500/40" : "border-navy-border"
    }`}>
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-navy-light transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
            completed
              ? "bg-emerald-500/20 border-emerald-500/40"
              : "bg-gold/10 border-gold/20"
          }`}>
            {completed
              ? <CheckCircle className="w-4 h-4 text-emerald-400" />
              : <BookOpen className="w-4 h-4 text-gold" />
            }
          </div>
          <div>
            <p className="font-semibold text-text-primary text-sm">{topic.title}</p>
            <p className="text-xs text-text-muted">{topic.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-text-muted hidden sm:block">
            {totalMCQ + topic.exercises.fillInBlank.length} soru
          </span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-muted" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-navy-border">
          {/* Explanation */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-sm text-text-secondary leading-relaxed">{topic.explanation}</p>
          </div>

          {/* Inner tabs */}
          <div className="px-5 pb-2">
            <div className="flex gap-1 p-1 bg-navy rounded-lg border border-navy-border">
              <button
                onClick={() => setActiveSection("theory")}
                className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                  activeSection === "theory"
                    ? "bg-gold text-navy"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Kural & Örnekler
              </button>
              <button
                onClick={() => setActiveSection("exercises")}
                className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                  activeSection === "exercises"
                    ? "bg-gold text-navy"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Alıştırmalar ({totalMCQ + topic.exercises.fillInBlank.length})
              </button>
            </div>
          </div>

          {/* ── THEORY ── */}
          {activeSection === "theory" && (
            <div className="px-5 pb-5 space-y-3">
              {topic.rules.map((rule, ri) => (
                <div key={ri} className="border border-navy-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenRule(openRule === ri ? null : ri)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-navy-light transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {ri + 1}
                      </span>
                      <span className="text-sm font-semibold text-text-primary">{rule.heading}</span>
                    </div>
                    {openRule === ri ? (
                      <ChevronUp className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                    )}
                  </button>

                  {openRule === ri && (
                    <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                      <p className="text-sm text-text-secondary leading-relaxed">{rule.body}</p>

                      {/* Examples */}
                      <div className="space-y-2">
                        <p className="text-xs text-text-muted font-semibold uppercase tracking-wide">Örnekler</p>
                        <div className="grid gap-2">
                          {rule.examples.map((ex, ei) => (
                            <div key={ei} className="flex items-start gap-3 bg-navy rounded-lg px-3 py-2.5 border border-navy-border group">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-semibold text-text-primary">{ex.de}</p>
                                  <SpeakBtn text={ex.de} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-text-muted mt-0.5">{ex.tr}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Grammar Table */}
                      {rule.table && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5">
                            <TableProperties className="w-3.5 h-3.5 text-gold/70" />
                            <p className="text-xs text-text-muted font-semibold uppercase tracking-wide">Tablo</p>
                          </div>
                          <div className="overflow-x-auto rounded-lg border border-navy-border">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr>
                                  {rule.table.headers.map((h, hi) => (
                                    <th key={hi} className="px-3 py-2.5 bg-gold/15 text-gold text-left text-xs font-bold uppercase tracking-wide border-b border-gold/20">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {rule.table.rows.map((row, rri) => (
                                  <tr key={rri} className={rri % 2 === 0 ? "bg-navy" : "bg-navy-card"}>
                                    {row.map((cell, ci) => (
                                      <td key={ci} className={`px-3 py-2 border-b border-navy-border text-sm group ${
                                        ci === 0 ? "text-gold font-semibold" : "text-text-primary"
                                      }`}>
                                        <span className="flex items-center gap-1.5">
                                          {cell}
                                          {ci > 0 && cell && (
                                            <SpeakBtn
                                              text={cell}
                                              className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5"
                                            />
                                          )}
                                        </span>
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Complete button inside theory */}
              <button
                onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  completed
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : "border-navy-border text-text-muted hover:border-gold/40 hover:text-gold"
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {completed ? "Tamamlandı ✓" : "Tamamlandı olarak işaretle"}
              </button>
            </div>
          )}

          {/* ── EXERCISES ── */}
          {activeSection === "exercises" && (
            <div className="px-5 pb-5 space-y-6">
              {/* MCQ */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-gold" />
                    Çoktan Seçmeli ({totalMCQ} soru)
                  </h3>
                  {answeredAll && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
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

                {topic.exercises.multipleChoice.map((q) => {
                  const state = mcqStates[q.id];
                  const selected = mcqAnswers[q.id];
                  return (
                    <div key={q.id} className="bg-navy border border-navy-border rounded-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-navy-border">
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-bold text-text-muted mt-0.5 flex-shrink-0">{q.id}.</span>
                          <p className="text-sm text-text-primary">{q.question}</p>
                        </div>
                      </div>
                      <div className="p-3 grid gap-2">
                        {q.options.map((opt, idx) => {
                          let cls = "border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
                          if (state) {
                            if (idx === q.correct) cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                            else if (idx === selected && state === "wrong") cls = "border-red-500/50 bg-red-500/10 text-red-300";
                            else cls = "border-navy-border text-text-muted opacity-40";
                          }
                          return (
                            <button
                              key={idx}
                              onClick={() => handleMCQ(q.id, idx, q.correct)}
                              disabled={!!state}
                              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg border text-sm transition-all duration-150 ${cls}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="flex items-center gap-1.5 flex-1">
                                {opt}
                                <SpeakBtn text={opt} className="ml-auto w-5 h-5 opacity-50 hover:opacity-100" />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {state && (
                        <div className={`px-4 py-2.5 border-t text-xs leading-relaxed flex items-start gap-2 ${
                          state === "correct"
                            ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                            : "border-red-500/30 bg-red-500/5 text-red-300"
                        }`}>
                          {state === "correct"
                            ? <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            : <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
                          <span>{state === "correct" ? "Doğru! " : "Yanlış. "}{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Fill in blank */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Boşluk Doldurma ({topic.exercises.fillInBlank.length} soru)
                </h3>
                {topic.exercises.fillInBlank.map((q) => {
                  const checked = fillChecked[q.id];
                  const correct = checked && isFillCorrect(q.id, q.answer);
                  const wrong = checked && !isFillCorrect(q.id, q.answer);
                  return (
                    <div key={q.id} className="bg-navy border border-navy-border rounded-xl p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold text-text-muted mt-0.5">{q.id}.</span>
                        <p className="text-sm text-text-primary leading-relaxed">
                          {q.before}{" "}
                          <input
                            type="text"
                            value={fillAnswers[q.id] ?? ""}
                            onChange={(e) => {
                              if (checked) return;
                              setFillAnswers((p) => ({ ...p, [q.id]: e.target.value }));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && fillAnswers[q.id]?.trim() && !checked) {
                                setFillChecked((p) => ({ ...p, [q.id]: true }));
                              }
                            }}
                            placeholder="___"
                            className={`inline-block w-28 text-center border-b-2 bg-transparent outline-none text-sm font-semibold transition-colors px-1
                              ${correct ? "border-emerald-500 text-emerald-400" : wrong ? "border-red-500 text-red-400" : "border-gold/50 text-gold focus:border-gold"}`}
                          />
                          {q.after && <span className="text-text-muted text-xs ml-1 italic"> {q.after}</span>}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowHints((p) => ({ ...p, [q.id]: !p[q.id] }))}
                          className="text-xs text-text-muted hover:text-gold transition-colors flex items-center gap-1"
                        >
                          <Lightbulb className="w-3 h-3" />
                          {showHints[q.id] ? "Gizle" : "İpucu"}
                        </button>
                        {showHints[q.id] && <span className="text-xs text-gold">{q.hint}</span>}
                      </div>

                      {!checked ? (
                        <button
                          onClick={() => setFillChecked((p) => ({ ...p, [q.id]: true }))}
                          disabled={!fillAnswers[q.id]?.trim()}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gold text-navy hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Kontrol Et
                        </button>
                      ) : (
                        <div className={`flex items-center gap-2 text-xs font-medium ${correct ? "text-emerald-400" : "text-red-400"}`}>
                          {correct ? (
                            <><CheckCircle className="w-3.5 h-3.5" /> Doğru!</>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              Yanlış — doğru cevap:{" "}
                              <span className="font-bold text-gold flex items-center gap-1">
                                {q.answer}
                                <SpeakBtn text={q.answer} className="w-5 h-5" />
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Reset + complete button */}
              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-navy-border text-text-muted text-xs hover:border-gold/40 hover:text-text-primary transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Sıfırla
                </button>
                <button
                  onClick={onToggleComplete}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    completed
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "border-navy-border text-text-muted hover:border-emerald-500/40 hover:text-emerald-400"
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {completed ? "Tamamlandı ✓" : "Tamamlandı"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main GrammarTab ───────────────────────────────────────────────────────

export function GrammarTab({ topics, levelId, levelName }: GrammarTabProps) {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/grammar-progress")
      .then((r) => r.json())
      .then((data) => {
        const levelKey = levelName.toLowerCase();
        const ids: string[] = data.progress?.[levelKey] ?? [];
        setCompletedTopics(new Set(ids));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [levelName]);

  const toggleComplete = useCallback(async (topicId: string) => {
    const next = new Set(completedTopics);
    const nowCompleted = !next.has(topicId);
    if (nowCompleted) next.add(topicId);
    else next.delete(topicId);
    setCompletedTopics(next);

    await fetch("/api/grammar-progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: levelName, topicId, completed: nowCompleted }),
    });
  }, [completedTopics, levelName]);

  const completedCount = completedTopics.size;
  const total = topics.length;

  return (
    <div className="space-y-3">
      <div className="bg-navy-card border border-gold/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold">TELC {levelName} Gramer Konuları</span>
          </div>
          {!loading && (
            <div className="flex items-center gap-1.5">
              <Trophy className={`w-3.5 h-3.5 ${completedCount === total ? "text-gold" : "text-text-muted"}`} />
              <span className={`text-xs font-bold ${
                completedCount === total ? "text-gold" : "text-text-muted"
              }`}>
                {completedCount}/{total} tamamlandı
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!loading && (
          <div className="mt-2 h-1.5 bg-navy rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${total > 0 ? (completedCount / total) * 100 : 0}%` }}
            />
          </div>
        )}

        <p className="text-xs text-text-secondary mt-2">
          Her konuya tıklayarak kural açıklamaları ve alıştırmaları açabilirsin.
          Konuyu bitirince &quot;Tamamlandı&quot; olarak işaretleyebilirsin.
        </p>
      </div>

      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          completed={completedTopics.has(topic.id)}
          onToggleComplete={() => toggleComplete(topic.id)}
          levelName={levelName}
        />
      ))}
    </div>
  );
}
