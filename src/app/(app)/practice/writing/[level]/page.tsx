"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PenLine,
  CheckCircle2,
  Star,
  Clock,
  Lock,
  Mail,
  MessageSquare,
  FileEdit,
  Send,
  AtSign,
} from "lucide-react";
import {
  getSchreibAufgaben,
  loadSchreibenProgress,
  SchreibenProgress,
  SchreibAufgabe,
  SchreibType,
} from "@/lib/schreiben-data";

const LEVEL_DESCRIPTIONS: Record<string, string> = {
  a1: "Kısa mektup ve mesaj yazma",
  a2: "Kısa mektup ve mesaj yazma",
  b1: "İnformelle / halbformelle E-Mail",
  b2: "Halbformelle E-Mail",
  c1: "Erörterung ve Stellungnahme",
};

const LEVEL_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  a1: { label: "A1", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  a2: { label: "A2", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  b1: { label: "B1", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  b2: { label: "B2", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  c1: { label: "C1", color: "text-gold", bg: "bg-gold/10", border: "border-gold/30" },
};

const TYPE_META: Record<SchreibType, { icon: React.ElementType; color: string; label: string }> = {
  brief:     { icon: Mail,          color: "text-blue-400",   label: "Brief" },
  nachricht: { icon: MessageSquare, color: "text-green-400",  label: "Nachricht" },
  postkarte: { icon: Send,          color: "text-violet-400", label: "Postkarte" },
  anfrage:   { icon: FileEdit,      color: "text-yellow-400", label: "Anfrage" },
  email:        { icon: AtSign,        color: "text-orange-400", label: "E-Mail" },
  erörterung:   { icon: FileEdit,      color: "text-gold",        label: "Erörterung" },
};

function DifficultyStars({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((n) => (
        <Star key={n} className={`w-3 h-3 ${n <= level ? "text-gold fill-gold" : "text-navy-border"}`} />
      ))}
    </div>
  );
}

function AufgabeCard({
  aufgabe,
  progress,
  index,
  level,
}: {
  aufgabe: SchreibAufgabe;
  progress: SchreibenProgress;
  index: number;
  level: string;
}) {
  const done = progress[aufgabe.id];
  const TypeIcon = TYPE_META[aufgabe.type].icon;
  const typeColor = TYPE_META[aufgabe.type].color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/practice/writing/${level}/${aufgabe.id}`} className="block group">
        <div
          className={`relative bg-navy-card border rounded-xl p-4 transition-all duration-200 overflow-hidden
            ${done
              ? done.score >= 70
                ? "border-green-500/40 hover:border-green-500/60"
                : "border-yellow-500/40 hover:border-yellow-500/60"
              : "border-navy-border hover:border-yellow-500/40"
            }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <TypeIcon className={`w-4 h-4 ${typeColor}`} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Aufgabe {aufgabe.id}
                  </span>
                  <DifficultyStars level={aufgabe.difficulty} />
                </div>
                <p className="text-sm font-semibold text-text-primary leading-tight">{aufgabe.title}</p>
              </div>
            </div>

            {done ? (
              <div className="flex flex-col items-end gap-1 shrink-0">
                <CheckCircle2
                  className={`w-4 h-4 ${done.score >= 70 ? "text-green-400" : "text-yellow-400"}`}
                />
                <span className={`text-xs font-bold ${done.score >= 70 ? "text-green-400" : "text-yellow-400"}`}>
                  {done.score}%
                </span>
              </div>
            ) : (
              <span className="text-[10px] text-text-muted bg-navy border border-navy-border rounded-md px-1.5 py-0.5 shrink-0">
                Başla
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-medium ${typeColor}`}>
              {TYPE_META[aufgabe.type].label}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-text-muted">
              <Clock className="w-3 h-3" />
              {aufgabe.wordMin}–{aufgabe.wordMax} kelime · {aufgabe.xp} XP
            </div>
          </div>

          {done && (
            <div className="mt-2.5 h-1 rounded-full bg-navy overflow-hidden">
              <div
                className={`h-full rounded-full ${done.score >= 70 ? "bg-green-400" : "bg-yellow-400"}`}
                style={{ width: `${done.score}%` }}
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function SchreibenLevelPage() {
  const params = useParams();
  const level = (params.level as string)?.toLowerCase();
  const meta = LEVEL_META[level];
  const aufgaben = getSchreibAufgaben(level);
  const [progress, setProgress] = useState<SchreibenProgress>({});

  useEffect(() => {
    setProgress(loadSchreibenProgress(level));
  }, [level]);

  if (!meta) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-text-muted">Geçersiz seviye.</p>
        <Link href="/practice" className="text-gold hover:underline mt-4 inline-block">Geri dön</Link>
      </div>
    );
  }

  const completed = Object.keys(progress).length;
  const totalXP = aufgaben.reduce((s, a) => s + a.xp, 0);
  const earnedXP = aufgaben.reduce((s, a) => {
    const p = progress[a.id];
    return p ? s + Math.round((p.score / 100) * a.xp) : s;
  }, 0);
  const completedScores = aufgaben.map((a) => progress[a.id]?.score).filter((s): s is number => s !== undefined);
  const avgScore = completedScores.length > 0
    ? Math.round(completedScores.reduce((a, b) => a + b, 0) / completedScores.length)
    : null;

  const hasContent = aufgaben.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link href="/practice" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Pratik
        </Link>
        <span>/</span>
        <span className="flex items-center gap-1.5">
          <PenLine className="w-3.5 h-3.5 text-yellow-400" />
          Schreiben
        </span>
        <span>/</span>
        <span className={meta.color}>{meta.label}</span>
      </div>

      {/* Header */}
      <div className={`bg-navy-card border ${meta.border} rounded-2xl p-6`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${meta.bg} rounded-2xl flex items-center justify-center border ${meta.border}`}>
              <PenLine className={`w-7 h-7 ${meta.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${meta.bg} ${meta.color} uppercase tracking-wider`}>
                  {meta.label}
                </span>
                <span className="text-xs text-text-muted">TELC Sınav Formatı · Claude AI</span>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Schreiben Pratiği</h1>
              <p className="text-text-secondary text-sm mt-0.5">
                {LEVEL_DESCRIPTIONS[level] ?? "Yazma pratiği"} — {aufgaben.length} görev
              </p>
            </div>
          </div>

          {hasContent && (
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-text-primary">{completed}</p>
                <p className="text-xs text-text-muted">Tamamlanan</p>
              </div>
              <div className="w-px bg-navy-border" />
              <div>
                <p className="text-2xl font-bold text-gold">{earnedXP}</p>
                <p className="text-xs text-text-muted">Kazanılan XP</p>
              </div>
              <div className="w-px bg-navy-border" />
              <div>
                <p className="text-2xl font-bold text-text-primary">{totalXP}</p>
                <p className="text-xs text-text-muted">Toplam XP</p>
              </div>
              {avgScore !== null && (
                <>
                  <div className="w-px bg-navy-border" />
                  <div>
                    <p className={`text-2xl font-bold ${avgScore >= 70 ? "text-green-400" : avgScore >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                      {avgScore}%
                    </p>
                    <p className="text-xs text-text-muted">Ort. Skor</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {hasContent && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5 text-xs text-text-muted">
              <span>{completed} / {aufgaben.length} tamamlandı</span>
              <span>{Math.round((completed / aufgaben.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-navy overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${(completed / aufgaben.length) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Aufgaben grid */}
      {hasContent ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {aufgaben.map((aufgabe, i) => (
            <AufgabeCard
              key={aufgabe.id}
              aufgabe={aufgabe}
              progress={progress}
              index={i}
              level={level}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-navy-card border border-navy-border rounded-2xl">
          <Lock className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-text-primary font-semibold mb-1">{meta.label} Schreiben — Çok Yakında</p>
          <p className="text-sm text-text-muted">Bu seviye için içerik hazırlanıyor.</p>
        </div>
      )}
    </div>
  );
}
