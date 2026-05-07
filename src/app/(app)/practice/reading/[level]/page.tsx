"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Star,
  Clock,
  FileText,
  Signpost,
  AlignLeft,
  Lock,
  Info,
} from "lucide-react";
import { getLesenTeile, loadLesenProgress, LesenProgress, LeseTeil, TeilType } from "@/lib/lesen-data";

const LEVEL_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  a1: { label: "A1", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  a2: { label: "A2", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  b1: { label: "B1", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  b2: { label: "B2", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  c1: { label: "C1", color: "text-gold", bg: "bg-gold/10", border: "border-gold/30" },
};

const TYPE_META: Record<TeilType, { icon: React.ElementType; color: string; label: string }> = {
  schilder:         { icon: Signpost,  color: "text-blue-400",   label: "Schilder & Aushänge" },
  "kurze-texte":    { icon: FileText,  color: "text-green-400",  label: "Kurze Texte" },
  informationstext: { icon: AlignLeft, color: "text-violet-400", label: "Informationstext" },
};

const TYPE_ORDER: TeilType[] = ["schilder", "kurze-texte", "informationstext"];

const TEIL_INFO: Record<TeilType, string> = {
  schilder:         "TELC'de tabela, ilan veya kısa anons okunur · metnin ne anlattığı sorulur",
  "kurze-texte":    "TELC'de kısa e-posta, mesaj veya not okunur · anlama soruları cevaplanır",
  informationstext: "TELC'de gazete haberi, broşür veya bilgi metni okunur · detay soruları gelir",
};

function DifficultyStars({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((n) => (
        <Star
          key={n}
          className={`w-3 h-3 ${n <= level ? "text-gold fill-gold" : "text-navy-border"}`}
        />
      ))}
    </div>
  );
}

function TeilCard({
  teil,
  progress,
  index,
  available,
  level,
}: {
  teil: LeseTeil;
  progress: LesenProgress;
  index: number;
  available: boolean;
  level: string;
}) {
  const done = progress[teil.id];
  const pct = done ? Math.round((done.score / done.total) * 100) : null;
  const TypeIcon = TYPE_META[teil.type].icon;
  const typeColor = TYPE_META[teil.type].color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {available ? (
        <Link href={`/practice/reading/${level}/${teil.id}`} className="block group">
          <div
            className={`relative bg-navy-card border rounded-xl p-4 transition-all duration-200 overflow-hidden
              ${done
                ? pct! >= 80
                  ? "border-green-500/40 hover:border-green-500/60"
                  : "border-yellow-500/40 hover:border-yellow-500/60"
                : "border-navy-border hover:border-green-500/40"
              }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center`}>
                  <TypeIcon className={`w-4 h-4 ${typeColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Teil {teil.id}
                    </span>
                    <DifficultyStars level={teil.difficulty} />
                  </div>
                  <p className="text-sm font-semibold text-text-primary leading-tight">{teil.title}</p>
                </div>
              </div>

              {done ? (
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <CheckCircle2
                    className={`w-4.5 h-4.5 ${pct! >= 80 ? "text-green-400" : "text-yellow-400"}`}
                  />
                  <span className={`text-xs font-bold ${pct! >= 80 ? "text-green-400" : "text-yellow-400"}`}>
                    {done.score}/{done.total}
                  </span>
                </div>
              ) : (
                <span className="text-[10px] text-text-muted bg-navy border border-navy-border rounded-md px-1.5 py-0.5 shrink-0">
                  Başla
                </span>
              )}
            </div>

            {/* Type label + question count */}
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-medium ${typeColor}`}>
                {TYPE_META[teil.type].label}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-text-muted">
                <Clock className="w-3 h-3" />
                {teil.questions.length} soru
              </div>
            </div>

            {/* Progress bar if done */}
            {done && (
              <div className="mt-2.5 h-1 rounded-full bg-navy overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${pct! >= 80 ? "bg-green-400" : "bg-yellow-400"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}

            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          </div>
        </Link>
      ) : (
        <div className="relative bg-navy-card border border-navy-border rounded-xl p-4 opacity-50 cursor-not-allowed">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy border border-navy-border flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-text-muted" />
              </div>
              <div>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Teil {teil.id}
                </span>
                <p className="text-sm font-semibold text-text-secondary leading-tight">{teil.title}</p>
              </div>
            </div>
            <span className="text-[10px] text-text-muted bg-navy border border-navy-border rounded-md px-1.5 py-0.5 shrink-0">
              Yakında
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-text-muted">{TYPE_META[teil.type].label}</span>
            <div className="flex items-center gap-1 text-[11px] text-text-muted">
              <Clock className="w-3 h-3" />
              {teil.questions.length} soru
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function LesenLevelPage() {
  const params = useParams();
  const level = (params.level as string)?.toLowerCase();
  const meta = LEVEL_META[level];
  const teile = getLesenTeile(level);
  const [progress, setProgress] = useState<LesenProgress>({});

  useEffect(() => {
    setProgress(loadLesenProgress(level));
  }, [level]);

  if (!meta) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-text-muted">Geçersiz seviye.</p>
        <Link href="/practice" className="text-gold hover:underline mt-4 inline-block">
          Geri dön
        </Link>
      </div>
    );
  }

  const completed = Object.keys(progress).length;
  const totalXP = teile.reduce((sum, t) => sum + t.xp, 0);
  const earnedXP = teile.reduce((sum, t) => {
    const p = progress[t.id];
    if (!p) return sum;
    return sum + Math.round((p.score / p.total) * t.xp);
  }, 0);

  const hasContent = teile.length > 0;

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
          <BookOpen className="w-3.5 h-3.5 text-green-400" />
          Lesen
        </span>
        <span>/</span>
        <span className={meta.color}>{meta.label}</span>
      </div>

      {/* Header */}
      <div className={`bg-navy-card border ${meta.border} rounded-2xl p-6`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${meta.bg} rounded-2xl flex items-center justify-center border ${meta.border}`}>
              <BookOpen className={`w-7 h-7 ${meta.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${meta.bg} ${meta.color} uppercase tracking-wider`}>
                  {meta.label}
                </span>
                <span className="text-xs text-text-muted">TELC Sınav Formatı</span>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Lesen Pratiği</h1>
              <p className="text-text-secondary text-sm mt-0.5">
                Gerçek sınav metinleriyle okuma becerisi — {teile.length} Teil
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
            </div>
          )}
        </div>

        {/* Overall progress bar */}
        {hasContent && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5 text-xs text-text-muted">
              <span>{completed} / {teile.length} tamamlandı</span>
              <span>{Math.round((completed / teile.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-navy overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${(completed / teile.length) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Teile grouped by type */}
      {hasContent ? (
        <div className="space-y-8">
          {TYPE_ORDER.map((type) => {
            const gruppe = teile.filter((t) => t.type === type);
            if (gruppe.length === 0) return null;
            const { icon: Icon, color, label } = TYPE_META[type];
            const info = TEIL_INFO[type];
            return (
              <div key={type}>
                <div className="flex flex-wrap items-start gap-x-2 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <h2 className="text-sm font-bold text-text-primary">{label}</h2>
                    <span className="text-xs text-text-muted">({gruppe.length} Teil)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-500/8 border border-blue-500/20 rounded-lg px-2.5 py-1">
                    <Info className="w-3 h-3 text-blue-400 shrink-0" />
                    <span className="text-[11px] text-blue-300 leading-tight">{info}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {gruppe.map((teil, i) => (
                    <TeilCard key={teil.id} teil={teil} progress={progress} index={i} available={true} level={level} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-navy-card border border-navy-border rounded-2xl">
          <Lock className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-text-primary font-semibold mb-1">{meta.label} Lesen — Çok Yakında</p>
          <p className="text-sm text-text-muted">Bu seviye için içerik hazırlanıyor.</p>
        </div>
      )}
    </div>
  );
}
