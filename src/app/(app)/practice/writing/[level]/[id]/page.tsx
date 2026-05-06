"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  PenLine,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import {
  getSchreibAufgabe,
  getSchreibAufgaben,
  saveSchreibenProgress,
} from "@/lib/schreiben-data";
import { saveProgress } from "@/lib/saveProgress";
import type { SchreibenEvalResult } from "@/app/api/schreiben/evaluate/route";

const LEVEL_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  a1: { label: "A1", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  a2: { label: "A2", color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/30" },
  b1: { label: "B1", color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/30" },
  b2: { label: "B2", color: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/30" },
  c1: { label: "C1", color: "text-gold",         bg: "bg-gold/10",        border: "border-gold/30" },
};

function WordCounter({ text, min, max }: { text: string; min: number; max: number }) {
  const count = text.trim() ? text.trim().split(/\s+/).length : 0;
  const ok = count >= min && count <= max;
  const close = count >= min - 3;
  return (
    <span className={`text-xs font-medium tabular-nums ${ok ? "text-green-400" : close ? "text-yellow-400" : "text-text-muted"}`}>
      {count} / {min}–{max} kelime
    </span>
  );
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 70 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
      <svg className="absolute inset-0 -rotate-90" width="80" height="80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="4" className="text-navy" />
        <circle cx="40" cy="40" r={r} fill="none" strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          className={color} stroke="currentColor" />
      </svg>
      <span className={`text-xl font-bold ${color}`}>{score}</span>
    </div>
  );
}

function CriteriaBar({ label, score }: { label: string; score: number }) {
  const color = score >= 70 ? "bg-green-400" : score >= 50 ? "bg-yellow-400" : "bg-red-400";
  const textColor = score >= 70 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-text-secondary w-16 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-navy overflow-hidden">
        <motion.div className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }} animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
      </div>
      <span className={`text-xs font-bold tabular-nums w-8 text-right ${textColor}`}>{score}</span>
    </div>
  );
}

export default function SchreibenAufgabePage() {
  const params = useParams();
  const level = (params.level as string)?.toLowerCase();
  const id = parseInt(params.id as string, 10);
  const meta = LEVEL_META[level];
  const aufgabe = getSchreibAufgabe(level, id);

  const [selectedBullets, setSelectedBullets] = useState<number[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SchreibenEvalResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCorrected, setShowCorrected] = useState(false);
  const [xpSaved, setXpSaved] = useState(false);
  const xpEverSaved = useRef(false);

  if (!meta || !aufgabe) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-text-muted">Görev bulunamadı.</p>
        <Link href={`/practice/writing/${level}`} className="text-gold hover:underline mt-4 inline-block">Geri dön</Link>
      </div>
    );
  }

  // TypeScript narrowing after early return — capture as non-nullable
  const task = aufgabe;
  const allTasks = getSchreibAufgaben(level);
  const nextTask = allTasks.find((t) => t.id === task.id + 1) ?? null;
  const needsChoice = !!(task.chooseBullets && task.chooseBullets < task.bullets.length);
  const required = task.chooseBullets ?? task.bullets.length;

  const activeBullets = needsChoice
    ? selectedBullets.map((i) => task.bullets[i])
    : task.bullets;

  const bulletSelectionDone = !needsChoice || selectedBullets.length === required;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const canSubmit = wordCount >= task.wordMin && !loading && bulletSelectionDone;

  function toggleBullet(i: number) {
    if (result) return;
    setSelectedBullets((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      if (prev.length >= required) return prev;
      return [...prev, i];
    });
  }

  async function handleEvaluate() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setShowCorrected(false);
    setXpSaved(false);

    try {
      const res = await fetch("/api/schreiben/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          aufgabeId: task.id,
          context: task.context,
          addressee: task.addressee,
          bullets: activeBullets,
          wordTarget: Math.round((task.wordMin + task.wordMax) / 2),
          userText: text,
          xp: task.xp,
        }),
      });
      if (!res.ok) throw new Error("API hatası");
      const data: SchreibenEvalResult = await res.json();
      setResult(data);
      saveSchreibenProgress(level, task.id, data.score);
      if (!xpEverSaved.current) {
        await saveProgress({ xp: data.earnedXP, skill: "schreiben", skillScore: data.score, minutes: 5 });
        xpEverSaved.current = true;
        setXpSaved(true);
      }
    } catch {
      setError("Değerlendirme sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  function handleRetry() {
    setResult(null);
    setError(null);
    setShowCorrected(false);
    setText("");
    setSelectedBullets([]);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link href={`/practice/writing/${level}`} className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          {meta.label} Schreiben
        </Link>
        <span>/</span>
        <span className="text-text-secondary">Aufgabe {task.id}</span>
      </div>

      {/* Task Card */}
      <div className={`bg-navy-card border ${meta.border} rounded-2xl p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-9 h-9 ${meta.bg} rounded-xl flex items-center justify-center`}>
            <PenLine className={`w-4 h-4 ${meta.color}`} />
          </div>
          <div>
            <p className={`text-[11px] font-bold uppercase tracking-wider ${meta.color}`}>
              {meta.label} · Aufgabe {task.id}
            </p>
            <p className="text-sm font-semibold text-text-primary">{task.title}</p>
          </div>
        </div>

        {/* Context */}
        <div className="bg-navy rounded-xl p-4 mb-4 border border-navy-border">
          <p className="text-sm text-text-secondary leading-relaxed">{task.context}</p>
          {task.type !== "erörterung" && (
            <p className="text-xs text-text-muted mt-2">
              <span className="font-medium text-text-secondary">Alıcı:</span> {task.addressee}
            </p>
          )}
        </div>

        {/* Stimulus Quotes (C1 Erörterung) */}
        {task.stimulusQuotes && task.stimulusQuotes.length > 0 && (
          <div className="mb-4 space-y-2">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">İlham veren görüşler</p>
            {task.stimulusQuotes.map((q, i) => (
              <div key={i} className="bg-navy rounded-lg px-4 py-3 border-l-2 border-gold/40">
                <p className="text-sm text-text-secondary italic leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bullets */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {needsChoice ? `${required} madde seç` : task.type === "erörterung" ? "Essay yapısı" : "Ele alınması gerekenler"}
            </p>
            {needsChoice && !result && (
              <span className={`text-xs font-medium ${selectedBullets.length === required ? "text-green-400" : "text-text-muted"}`}>
                {selectedBullets.length}/{required} seçildi
              </span>
            )}
          </div>

          {task.bullets.map((b, i) => {
            const isSelected = needsChoice ? selectedBullets.includes(i) : true;
            const selectionFull = needsChoice && selectedBullets.length >= required && !selectedBullets.includes(i);

            // after submission: find position in activeBullets
            const activeIdx = needsChoice ? selectedBullets.indexOf(i) : i;
            const covered = result && activeIdx !== -1 ? result.bulletCoverage[activeIdx] : undefined;

            return (
              <div
                key={i}
                onClick={() => needsChoice && !result ? toggleBullet(i) : undefined}
                className={`flex items-start gap-2 rounded-lg p-2 transition-all
                  ${needsChoice && !result ? "cursor-pointer" : ""}
                  ${needsChoice && !result && !isSelected && !selectionFull ? "hover:bg-navy" : ""}
                  ${needsChoice && selectionFull ? "opacity-40" : ""}
                `}
              >
                {needsChoice ? (
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all
                    ${isSelected
                      ? `${meta.bg} border-current ${meta.color}`
                      : "border-navy-border bg-navy"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                ) : (
                  <span className={`w-5 h-5 rounded-full ${meta.bg} border ${meta.border} flex items-center justify-center shrink-0 text-[10px] font-bold ${meta.color} mt-0.5`}>
                    {i + 1}
                  </span>
                )}

                {result && activeIdx !== -1 ? (
                  <span className={`text-sm leading-relaxed ${covered ? "text-text-primary" : "text-text-muted line-through decoration-red-400/60"}`}>
                    {b}
                    {covered
                      ? <CheckCircle2 className="inline w-3.5 h-3.5 text-green-400 ml-1.5 mb-0.5" />
                      : <AlertCircle className="inline w-3.5 h-3.5 text-red-400 ml-1.5 mb-0.5" />
                    }
                  </span>
                ) : (
                  <span className={`text-sm leading-relaxed ${isSelected || !needsChoice ? "text-text-secondary" : "text-text-muted"}`}>
                    {b}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Writing Area */}
      {!result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Yazdığınız metin</p>
            <WordCounter text={text} min={task.wordMin} max={task.wordMax} />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={task.type === "erörterung"
              ? "Einleitung: Stellen Sie das Thema vor…\n\nArgumente: …\n\nGegenargumente: …\n\nFazit: Meine Position ist…"
              : "Liebe/r … ,\n\n…\n\nViele Grüße"
            }
            className={`w-full ${task.type === "erörterung" ? "h-80 resize-y" : "h-52 resize-none"} bg-navy-card border border-navy-border rounded-xl p-4 text-text-primary text-sm leading-relaxed focus:outline-none focus:border-yellow-500/50 placeholder:text-text-muted transition-colors`}
            disabled={loading}
          />
          <button
            onClick={handleEvaluate}
            disabled={!canSubmit}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
              ${canSubmit
                ? "bg-yellow-500 hover:bg-yellow-400 text-navy-dark"
                : "bg-navy-card border border-navy-border text-text-muted cursor-not-allowed"
              }`}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Claude değerlendiriyor…</>
            ) : (
              <><Sparkles className="w-4 h-4" />Değerlendir</>
            )}
          </button>
          {needsChoice && !bulletSelectionDone && (
            <p className="text-xs text-text-muted text-center">
              Önce {required} madde seçin, sonra yazın.
            </p>
          )}
          {bulletSelectionDone && wordCount < task.wordMin && wordCount > 0 && (
            <p className="text-xs text-text-muted text-center">
              Değerlendirmek için en az {task.wordMin} kelime yazın.
            </p>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Score header */}
            <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
              <div className="flex items-center gap-5">
                <ScoreRing score={result.score} />
                <div className="flex-1 space-y-2.5">
                  <CriteriaBar label="İçerik" score={result.criteriaScores.inhalt} />
                  <CriteriaBar label="Dil" score={result.criteriaScores.sprache} />
                  <CriteriaBar label="Yapı" score={result.criteriaScores.struktur} />
                </div>
              </div>
              {xpSaved && (
                <div className="mt-3 pt-3 border-t border-navy-border flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span className="text-xs text-text-muted">
                    <span className="text-gold font-bold">+{result.earnedXP} XP</span> kazanıldı
                  </span>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-navy-card border border-navy-border rounded-xl p-4">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Genel Yorum</p>
              <p className="text-sm text-text-secondary leading-relaxed">{result.summaryTr}</p>
            </div>

            {/* Corrections */}
            {result.corrections.length > 0 && (
              <div className="bg-navy-card border border-navy-border rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Düzeltmeler</p>
                {result.corrections.map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="text-sm text-red-400 line-through">{c.original}</span>
                      <span className="text-text-muted text-sm">→</span>
                      <span className="text-sm text-green-400 font-medium">{c.corrected}</span>
                    </div>
                    <p className="text-xs text-text-muted">{c.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Corrected version */}
            {result.correctedVersion && (
              <div className="bg-navy-card border border-navy-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowCorrected(!showCorrected)}
                  className="w-full flex items-center justify-between p-4 text-sm font-semibold text-text-primary hover:text-text-primary transition-colors"
                >
                  <span>Düzeltilmiş Versiyon</span>
                  {showCorrected ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                </button>
                <AnimatePresence>
                  {showCorrected && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 border-t border-navy-border pt-3">
                        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{result.correctedVersion}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Submitted text */}
            <div className="bg-navy-card border border-navy-border rounded-xl p-4">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Gönderilen Metin</p>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>

            {/* Actions */}
            <div className={`grid gap-3 ${nextTask ? "grid-cols-3" : "grid-cols-2"}`}>
              <button
                onClick={handleRetry}
                className="py-3 rounded-xl font-semibold text-sm bg-navy-card border border-navy-border text-text-secondary hover:text-text-primary hover:border-yellow-500/40 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Tekrar Dene
              </button>
              <Link
                href={`/practice/writing/${level}`}
                className="py-3 rounded-xl font-semibold text-sm bg-navy-card border border-navy-border text-text-secondary hover:text-text-primary hover:border-yellow-500/40 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Listeye Dön
              </Link>
              {nextTask && (
                <Link
                  href={`/practice/writing/${level}/${nextTask.id}`}
                  className="py-3 rounded-xl font-semibold text-sm bg-yellow-500 hover:bg-yellow-400 text-navy-dark transition-all flex items-center justify-center gap-2"
                >
                  Sonraki
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
