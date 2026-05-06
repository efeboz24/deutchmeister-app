"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, Send } from "lucide-react";

interface Word {
  word: string;
  meaning: string;
}

interface SentenceWritingTaskProps {
  words: Word[];
}

const GOAL = 10;

export function SentenceWritingTask({ words }: SentenceWritingTaskProps) {
  const [sentences, setSentences] = useState<string[]>(Array(GOAL).fill(""));
  const [saved, setSaved] = useState(false);

  const filledCount = sentences.filter((s) => s.trim().length > 0).length;
  const pct = Math.round((filledCount / GOAL) * 100);
  const canSave = filledCount === GOAL && !saved;

  function updateSentence(idx: number, value: string) {
    setSentences((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }

  function handleSave() {
    const key = `dailySentences_${new Date().toISOString().split("T")[0]}`;
    try {
      localStorage.setItem(key, JSON.stringify(sentences));
    } catch { /* ignore */ }

    // Mark sentence routine task as done in daily routine
    const routineKey = `dailyRoutine_${new Date().toISOString().split("T")[0]}`;
    try {
      const raw = localStorage.getItem(routineKey);
      const checked = raw ? JSON.parse(raw) : {};
      localStorage.setItem(routineKey, JSON.stringify({ ...checked, sentences: true }));
    } catch { /* ignore */ }

    setSaved(true);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-xl bg-navy-card border border-navy-border flex items-center justify-center hover:border-gold/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Cümle Yazma Görevi</h1>
          <p className="text-xs text-text-muted">Öğrendiğin kelimelerle {GOAL} cümle yaz</p>
        </div>
      </div>

      {/* Word chips */}
      {words.length > 0 && (
        <div className="bg-navy-card border border-navy-border rounded-xl p-4">
          <p className="text-xs text-text-muted font-medium mb-3 uppercase tracking-wider">Kullanabileceğin kelimeler</p>
          <div className="flex flex-wrap gap-2">
            {words.map((w) => (
              <motion.span
                key={w.word}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/25 rounded-full text-sm"
              >
                <span className="text-gold font-semibold">{w.word}</span>
                <span className="text-text-muted text-xs">— {w.meaning}</span>
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="bg-navy-card border border-navy-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary font-medium">{filledCount}/{GOAL} cümle yazıldı</span>
          <span className={`text-sm font-bold ${filledCount === GOAL ? "text-green-400" : "text-gold"}`}>%{pct}</span>
        </div>
        <div className="h-2 bg-navy-border rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`h-2 rounded-full ${filledCount === GOAL ? "bg-green-400" : "bg-gold"}`}
          />
        </div>
      </div>

      {/* Sentence inputs */}
      <AnimatePresence>
        {!saved ? (
          <motion.div exit={{ opacity: 0, y: -10 }} className="space-y-3">
            {sentences.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-start gap-3"
              >
                <span className={`mt-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  val.trim() ? "bg-gold/20 text-gold" : "bg-navy-border text-text-muted"
                }`}>
                  {idx + 1}
                </span>
                <textarea
                  value={val}
                  onChange={(e) => updateSentence(idx, e.target.value)}
                  rows={2}
                  placeholder={`${idx + 1}. cümle...`}
                  className="flex-1 bg-navy-card border border-navy-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors"
                />
              </motion.div>
            ))}

            <motion.button
              onClick={handleSave}
              disabled={!canSave}
              whileHover={canSave ? { scale: 1.02 } : {}}
              whileTap={canSave ? { scale: 0.98 } : {}}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                canSave
                  ? "bg-gold text-navy cursor-pointer hover:bg-gold/90"
                  : "bg-navy-border text-text-muted cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
              {filledCount < GOAL ? `${GOAL - filledCount} cümle daha yaz` : "Kaydet"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </motion.div>
            <div>
              <p className="text-text-primary font-bold text-lg">Harika iş!</p>
              <p className="text-text-muted text-sm mt-1">10 cümle başarıyla kaydedildi. Günlük rutin tamamlandı!</p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-navy rounded-xl font-semibold text-sm hover:bg-gold/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard'a dön
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
