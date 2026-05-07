"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle2, ChevronDown, Lightbulb, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PracticeMistakeEntry } from "@/lib/practice-mistakes";

interface WrongAnswerReviewProps {
  mistakes: Omit<PracticeMistakeEntry, "key" | "addedAt">[];
  accentColor?: string;
}

function MistakeItem({
  entry,
  index,
}: {
  entry: Omit<PracticeMistakeEntry, "key" | "addedAt">;
  index: number;
}) {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="bg-navy border border-red-500/20 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-red-500/5 transition-colors"
      >
        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <p className="flex-1 text-sm text-text-primary font-medium leading-snug">{entry.question}</p>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-navy-border pt-3">
              {/* Wrong answer — strikethrough */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/25">
                <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="text-sm text-red-400 line-through decoration-red-400 decoration-2">
                  {entry.options[entry.userAnswer]}
                </span>
                <span className="text-[10px] text-red-400/70 ml-auto shrink-0">Senin cevabın</span>
              </div>

              {/* Correct answer */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/25">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="text-sm text-green-400 font-medium">
                  {entry.options[entry.correct]}
                </span>
                <span className="text-[10px] text-green-400/70 ml-auto shrink-0">Doğru cevap</span>
              </div>

              {/* Explanation */}
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-gold/5 border border-gold/20">
                <Lightbulb className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary leading-relaxed">{entry.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function WrongAnswerReview({ mistakes, accentColor = "text-red-400" }: WrongAnswerReviewProps) {
  if (mistakes.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <XCircle className={cn("w-4.5 h-4.5", accentColor)} />
          <h3 className="text-sm font-bold text-text-primary">
            {mistakes.length} Yanlış Cevap İncelemesi
          </h3>
        </div>
        <Link
          href="/mistakes"
          className="flex items-center gap-1 text-xs text-text-muted hover:text-gold transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          Hata Defterine Git
        </Link>
      </div>

      <p className="text-xs text-text-muted">
        Yanlış cevapların otomatik olarak hata defterine kaydedildi. Aşağıda her sorunun neden yanlış olduğunu incele.
      </p>

      <div className="space-y-2">
        {mistakes.map((m, i) => (
          <MistakeItem key={`${m.topicId}-${i}`} entry={m} index={i} />
        ))}
      </div>
    </div>
  );
}
