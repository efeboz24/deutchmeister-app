"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mic, CheckCircle2, Star, Clock, Lock, Info } from "lucide-react";
import {
  getSprechenAufgaben,
  loadSprechenProgress,
  SprechenProgress,
  SprechenAufgabe,
  SprechenTeilType,
  TEIL_ORDER,
  TYPE_LABELS,
} from "@/lib/sprechen-data";

const LEVEL_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  a1: { label: "A1", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  a2: { label: "A2", color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/30" },
  b1: { label: "B1", color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/30" },
  b2: { label: "B2", color: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/30" },
  c1: { label: "C1", color: "text-gold",        bg: "bg-gold/10",        border: "border-gold/30" },
};

// Per-level TELC info per teil type
const TEIL_INFO: Partial<Record<string, Partial<Record<SprechenTeilType, string>>>> = {
  a1: {
    vorstellen: "TELC sınavında 1 kez sorar · kendinizi ~1 dk tanıtırsınız",
    fragen:     "TELC'de 3 kart üzerinden soru sorma ve cevap verme alışverişi yapılır",
  },
  a2: {
    vorstellen: "TELC sınavında 1 kez sorar · daha geniş bir tanıtım beklenir",
    alltag:     "TELC'de günlük diyalog senaryoları gelir · ~2 dk konuşma",
    bild:       "TELC'de 1 resim gösterilir, ~1 dk içinde ne gördüğünüzü anlatırsınız",
  },
  b1: {
    praesentation: "TELC'de notlarla ~2 dk sunum yapılır · giriş-gelişme-sonuç beklenir",
    reaktion:      "TELC'de bir duruma tepki verir, çözüm önerisi sunarsınız",
    planung:       "TELC'de partner ile birlikte ortak bir karar alırsınız · burada her iki rolü de oynarsınız",
  },
  b2: {
    praesentation: "TELC'de grafik veya tablo içeren ~3 dk sunum yapılır",
    diskussion:    "TELC'de bir konuyu farklı açılardan tartışır, kendi görüşünüzü savunursunuz",
    argumentation: "TELC'de partnerinizin görüşüne karşı argüman üretirsiniz",
  },
  c1: {
    vortrag:  "TELC'de ~5 dk akademik kurzvortrag yapılır · kaynaklara atıf ve yapılandırma beklenir",
    debatte:  "TELC'de karmaşık bir konuyu nuanslı biçimde tartışırsınız · birden fazla perspektif sunulur",
    analyse:  "TELC'de bir metin, istatistik veya durum derinlemesine analiz edilir",
  },
};

const TYPE_ICONS: Record<SprechenTeilType, string> = {
  vorstellen: "👤", fragen: "❓", alltag: "☕", bild: "🖼️",
  praesentation: "📊", reaktion: "💬", planung: "📋",
  diskussion: "⚖️", argumentation: "🗣️",
  vortrag: "🎤", debatte: "🏛️", analyse: "🔍",
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

function AufgabeCard({ aufgabe, progress, index, level }: { aufgabe: SprechenAufgabe; progress: SprechenProgress; index: number; level: string }) {
  const done = progress[aufgabe.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/practice/speaking/${level}/${aufgabe.id}`} className="block group">
        <div className={`relative bg-navy-card border rounded-xl p-4 transition-all duration-200 overflow-hidden
          ${done
            ? done.score >= 70 ? "border-green-500/40 hover:border-green-500/60" : "border-yellow-500/40 hover:border-yellow-500/60"
            : "border-navy-border hover:border-purple-500/40"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-base">
                {TYPE_ICONS[aufgabe.type]}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{aufgabe.id.toUpperCase()}</span>
                  <DifficultyStars level={aufgabe.difficulty} />
                </div>
                <p className="text-sm font-semibold text-text-primary leading-tight">{aufgabe.title}</p>
              </div>
            </div>
            {done ? (
              <div className="flex flex-col items-end gap-1 shrink-0">
                <CheckCircle2 className={`w-4 h-4 ${done.score >= 70 ? "text-green-400" : "text-yellow-400"}`} />
                <span className={`text-xs font-bold ${done.score >= 70 ? "text-green-400" : "text-yellow-400"}`}>{done.score}%</span>
              </div>
            ) : (
              <span className="text-[10px] text-text-muted bg-navy border border-navy-border rounded-md px-1.5 py-0.5 shrink-0">Başla</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-purple-400">{TYPE_LABELS[aufgabe.type]}</span>
            <div className="flex items-center gap-1 text-[11px] text-text-muted">
              <Clock className="w-3 h-3" />
              {aufgabe.minSeconds}–{aufgabe.maxSeconds}s · {aufgabe.xp} XP
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

export default function SprechenLevelPage() {
  const params = useParams();
  const level = (params.level as string)?.toLowerCase();
  const meta = LEVEL_META[level];
  const aufgaben = getSprechenAufgaben(level);
  const [progress, setProgress] = useState<SprechenProgress>({});

  useEffect(() => {
    setProgress(loadSprechenProgress(level));
  }, [level]);

  if (!meta) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-text-muted">Geçersiz seviye.</p>
        <Link href="/practice" className="text-gold hover:underline mt-4 inline-block">Geri dön</Link>
      </div>
    );
  }

  const teilOrder = TEIL_ORDER[level] ?? [];
  const completed = Object.keys(progress).length;
  const totalXP = aufgaben.reduce((s, a) => s + a.xp, 0);
  const earnedXP = aufgaben.reduce((s, a) => {
    const p = progress[a.id];
    return p ? s + Math.round((p.score / 100) * a.xp) : s;
  }, 0);
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
          <Mic className="w-3.5 h-3.5 text-purple-400" />
          Sprechen
        </span>
        <span>/</span>
        <span className={meta.color}>{meta.label}</span>
      </div>

      {/* Header */}
      <div className={`bg-navy-card border ${meta.border} rounded-2xl p-6`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${meta.bg} rounded-2xl flex items-center justify-center border ${meta.border}`}>
              <Mic className={`w-7 h-7 ${meta.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${meta.bg} ${meta.color} uppercase tracking-wider`}>{meta.label}</span>
                <span className="text-xs text-text-muted">TELC Sınav Formatı · Claude AI</span>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Sprechen Pratiği</h1>
              <p className="text-text-secondary text-sm mt-0.5">
                Mikrofon ile konuşma pratiği — {aufgaben.length} görev
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

        {hasContent && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5 text-xs text-text-muted">
              <span>{completed} / {aufgaben.length} tamamlandı</span>
              <span>{Math.round((completed / aufgaben.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-navy overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: `${(completed / aufgaben.length) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Teile */}
      {hasContent ? (
        <div className="space-y-8">
          {teilOrder.map((type, teilIdx) => {
            const gruppe = aufgaben.filter((a) => a.type === type);
            if (gruppe.length === 0) return null;
            const info = TEIL_INFO[level]?.[type];
            return (
              <div key={type}>
                <div className="flex flex-wrap items-start gap-x-2 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{TYPE_ICONS[type]}</span>
                    <h2 className="text-sm font-bold text-text-primary">
                      Teil {teilIdx + 1} — {TYPE_LABELS[type]}
                    </h2>
                    <span className="text-xs text-text-muted">({gruppe.length} görev)</span>
                  </div>
                  {info && (
                    <div className="flex items-center gap-1.5 bg-blue-500/8 border border-blue-500/20 rounded-lg px-2.5 py-1">
                      <Info className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="text-[11px] text-blue-300 leading-tight">{info}</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {gruppe.map((aufgabe, i) => (
                    <AufgabeCard key={aufgabe.id} aufgabe={aufgabe} progress={progress} index={i} level={level} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-navy-card border border-navy-border rounded-2xl">
          <Lock className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-text-primary font-semibold mb-1">{meta.label} Sprechen — Çok Yakında</p>
          <p className="text-sm text-text-muted">Bu seviye için içerik hazırlanıyor.</p>
        </div>
      )}
    </div>
  );
}
