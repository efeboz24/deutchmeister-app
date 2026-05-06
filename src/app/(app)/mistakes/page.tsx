"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { XCircle, CheckCircle, Trash2, BookOpen, RotateCcw, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { SpeakBtn } from "@/components/ui/SpeakBtn";
import { cn } from "@/lib/utils";

export type MistakeEntry = {
  key: string;
  topicId: string;
  topicTitle: string;
  levelName: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  addedAt: number;
};

const LEVEL_BADGE: Record<string, string> = {
  A1: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  A2: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  B1: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  B2: "bg-orange-500/15 border-orange-500/30 text-orange-400",
  C1: "bg-gold/15 border-gold/30 text-gold",
};

function MistakeCard({
  entry,
  onSolvedCorrectly,
  onDelete,
}: {
  entry: MistakeEntry;
  onSolvedCorrectly: (key: string) => void;
  onDelete: (key: string) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<"correct" | "wrong" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handle = (idx: number) => {
    if (state) return;
    setSelected(idx);
    if (idx === entry.correct) {
      setState("correct");
      setTimeout(() => onSolvedCorrectly(entry.key), 1000);
    } else {
      setState("wrong");
    }
  };

  const reset = () => {
    setSelected(null);
    setState(null);
  };

  return (
    <div className={cn(
      "bg-navy border rounded-xl overflow-hidden transition-all",
      state === "correct" ? "border-emerald-500/40" : "border-navy-border"
    )}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-navy-border flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 mt-0.5",
            LEVEL_BADGE[entry.levelName] ?? "bg-navy border-navy-border text-text-muted"
          )}>
            {entry.levelName}
          </span>
          <div>
            <p className="text-xs text-text-muted">{entry.topicTitle}</p>
            <p className="text-sm text-text-primary mt-0.5">{entry.question}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {confirmDelete ? (
            <>
              <button
                onClick={() => onDelete(entry.key)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded border border-red-500/30 hover:border-red-500/50"
              >
                Evet, sil
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-text-muted hover:text-text-primary transition-colors px-2 py-1 rounded border border-navy-border"
              >
                İptal
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-text-muted hover:text-red-400 transition-colors p-1"
              title="Sil"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="p-3 grid gap-2">
        {entry.options.map((opt, idx) => {
          let cls = "border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
          if (state) {
            if (idx === entry.correct) cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
            else if (idx === selected && state === "wrong") cls = "border-red-500/50 bg-red-500/10 text-red-300";
            else cls = "border-navy-border text-text-muted opacity-40";
          }
          return (
            <button
              key={idx}
              onClick={() => handle(idx)}
              disabled={!!state}
              className={cn(
                "flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg border text-sm transition-all duration-150",
                cls
              )}
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

      {/* Feedback */}
      {state && (
        <div className={cn(
          "px-4 py-2.5 border-t text-xs leading-relaxed flex items-start gap-2",
          state === "correct"
            ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
            : "border-red-500/30 bg-red-500/5 text-red-300"
        )}>
          {state === "correct"
            ? <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            : <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
          <div className="flex-1">
            <span>{state === "correct" ? "Doğru! Hatadan kaldırıldı. " : "Yanlış. "}</span>
            <span>{entry.explanation}</span>
          </div>
          {state === "wrong" && (
            <button onClick={reset} className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveToBackend = useCallback((entries: MistakeEntry[]) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      fetch("/api/mistakes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: JSON.stringify(entries) }),
      }).catch(() => {});
    }, 500);
  }, []);

  const loadFromLocalStorage = useCallback(() => {
    const raw = localStorage.getItem("grammar-mistakes");
    if (raw) {
      try {
        const parsed: MistakeEntry[] = JSON.parse(raw);
        parsed.sort((a, b) => b.addedAt - a.addedAt);
        setMistakes(parsed);
        // Backfill backend
        fetch("/api/mistakes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: raw }),
        }).catch(() => {});
      } catch {
        setMistakes([]);
      }
    }
  }, []);

  useEffect(() => {
    // Load from backend first, fall back to localStorage
    fetch("/api/mistakes")
      .then((r) => r.json())
      .then(({ data }) => {
        if (data && data !== "[]") {
          try {
            const parsed: MistakeEntry[] = JSON.parse(data);
            parsed.sort((a, b) => b.addedAt - a.addedAt);
            setMistakes(parsed);
            localStorage.setItem("grammar-mistakes", data);
          } catch {
            loadFromLocalStorage();
          }
        } else {
          loadFromLocalStorage();
        }
      })
      .catch(() => loadFromLocalStorage())
      .finally(() => setLoaded(true));
  }, [loadFromLocalStorage]);

  const persist = useCallback((next: MistakeEntry[]) => {
    localStorage.setItem("grammar-mistakes", JSON.stringify(next));
    saveToBackend(next);
  }, [saveToBackend]);

  const handleSolvedCorrectly = useCallback((key: string) => {
    setMistakes((prev) => {
      const next = prev.filter((m) => m.key !== key);
      persist(next);
      return next;
    });
  }, [persist]);

  const handleDelete = useCallback((key: string) => {
    setMistakes((prev) => {
      const next = prev.filter((m) => m.key !== key);
      persist(next);
      return next;
    });
  }, [persist]);

  const handleClearAll = () => {
    localStorage.removeItem("grammar-mistakes");
    saveToBackend([]);
    setMistakes([]);
    setConfirmClearAll(false);
  };

  // Group by level
  const grouped = mistakes.reduce<Record<string, MistakeEntry[]>>((acc, m) => {
    if (!acc[m.levelName]) acc[m.levelName] = [];
    acc[m.levelName].push(m);
    return acc;
  }, {});
  const orderedLevels = ["A1", "A2", "B1", "B2", "C1"].filter((l) => grouped[l]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-1">
            <Link href="/learn" className="hover:text-text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Öğrenme
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-400" />
            Yanlış Cevap Defteri
          </h1>
          {loaded && (
            <p className="text-sm text-text-muted mt-1">
              {mistakes.length > 0
                ? `${mistakes.length} yanlış cevap tekrar seni bekliyor`
                : "Tüm sorular doğru cevaplanmış!"}
            </p>
          )}
        </div>
        {mistakes.length > 0 && (
          <div className="flex items-center gap-2">
            {confirmClearAll ? (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span className="text-xs text-red-300">Tümü silinsin mi?</span>
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  Evet
                </button>
                <button
                  onClick={() => setConfirmClearAll(false)}
                  className="text-xs text-text-muted hover:text-text-primary transition-colors"
                >
                  İptal
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClearAll(true)}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-navy-border hover:border-red-500/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Tümünü Sil
              </button>
            )}
          </div>
        )}
      </div>

      {/* Empty state */}
      {loaded && mistakes.length === 0 && (
        <div className="bg-navy-card border border-navy-border rounded-xl p-12 text-center">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <p className="text-text-secondary font-medium">Harika! Hata defterin boş.</p>
          <p className="text-sm text-text-muted mt-1">
            Gramer alıştırmalarında yanlış cevaplar otomatik olarak buraya eklenir.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-gold hover:underline"
          >
            <BookOpen className="w-4 h-4" />
            Gramer çalışmaya git
          </Link>
        </div>
      )}

      {/* Grouped mistakes */}
      {orderedLevels.map((level) => (
        <div key={level} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs font-bold px-2.5 py-1 rounded-full border",
              LEVEL_BADGE[level] ?? "bg-navy border-navy-border text-text-muted"
            )}>
              {level}
            </span>
            <span className="text-xs text-text-muted">{grouped[level].length} hata</span>
            <div className="flex-1 h-px bg-navy-border" />
          </div>

          {grouped[level].map((entry) => (
            <MistakeCard
              key={entry.key}
              entry={entry}
              onSolvedCorrectly={handleSolvedCorrectly}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
