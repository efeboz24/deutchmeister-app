"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap, LayoutDashboard, BookOpen, Dumbbell, FileText,
  BookMarked, CalendarDays, UserCircle, BarChart3, XCircle,
  Trophy, ChevronDown, Music, ClipboardCheck,
  Search, Bell, Zap, LogOut, BookOpen as NoteIcon,
  Flame, Star, CheckCircle2, RotateCcw, Clock,
  Brain, Lock, ArrowRight, ChevronLeft, ChevronRight,
  PenLine, Headphones, Mic,
} from "lucide-react";

/* ─── Fake data ─── */
const USER = { name: "Ayşe K.", level: "B1", initials: "AK", xp: 2840, maxXp: 5000, streak: 18 };

const NAV = [
  { icon: LayoutDashboard, label: "Panel",           active: false },
  { icon: BookOpen,        label: "Öğren",           active: false },
  { icon: Dumbbell,        label: "Pratik",          active: false },
  { icon: FileText,        label: "Sınav",           active: false },
  { icon: BookMarked,      label: "Kelimeler",       active: false },
  { icon: BarChart3,       label: "İlerleme",        active: false },
  { icon: XCircle,         label: "Yanlış Cevaplar", active: false },
  { icon: CalendarDays,    label: "Haftalık Plan",   active: false },
  { icon: UserCircle,      label: "Profilim",        active: false },
];

const SKILLS = [
  { label: "Hören",    score: 62, color: "bg-blue-500",    text: "text-blue-400",    icon: Headphones },
  { label: "Lesen",    score: 74, color: "bg-emerald-500", text: "text-emerald-400", icon: BookOpen   },
  { label: "Schreiben",score: 51, color: "bg-amber-500",   text: "text-amber-400",   icon: PenLine    },
  { label: "Sprechen", score: 45, color: "bg-violet-500",  text: "text-violet-400",  icon: Mic        },
  { label: "Grammatik",score: 68, color: "bg-teal-500",    text: "text-teal-400",    icon: Brain      },
];

const EXAM_TOPICS = [
  { label: "Akkusativ / Dativ",    level: "A1-A2" },
  { label: "Perfekt / Präteritum", level: "A2-B1" },
  { label: "Konjunktiv II",        level: "B1-B2" },
  { label: "Genitiv",              level: "B1"    },
  { label: "Nebensätze",           level: "A2-B2" },
];

const LEVEL_BADGE: Record<string, string> = {
  "A1-A2": "bg-blue-500/20 text-blue-400",
  "A2-B1": "bg-emerald-500/20 text-emerald-400",
  "B1":    "bg-teal-500/20 text-teal-400",
  "B1-B2": "bg-violet-500/20 text-violet-400",
  "A2-B2": "bg-amber-500/20 text-amber-400",
};

const SCENES = ["dashboard", "kelimeler", "gramer", "sinav", "haftalikplan", "ilerleme"] as const;
type Scene = typeof SCENES[number];

const SCENE_LABELS: Record<Scene, string> = {
  dashboard:   "Panel",
  kelimeler:   "Kelimeler",
  gramer:      "Gramer",
  sinav:       "Sınav",
  haftalikplan:"Haftalık Plan",
  ilerleme:    "İlerleme",
};

const SCENE_NAV_IDX: Record<Scene, number> = {
  dashboard:   0,
  kelimeler:   4,
  gramer:      1,
  sinav:       3,
  haftalikplan:7,
  ilerleme:    5,
};

/* ─── Static Sidebar ─── */
function DemoSidebar({ activeScene }: { activeScene: Scene }) {
  const activeIdx = SCENE_NAV_IDX[activeScene];
  const [examOpen, setExamOpen] = useState(true);

  return (
    <aside className="w-64 shrink-0 bg-navy-light border-r border-navy-border flex flex-col h-full">
      {/* Logo */}
      <div className="px-3 py-4 border-b border-navy-border flex items-center justify-between min-h-[73px]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-navy" />
          </div>
          <div>
            <span className="text-text-primary font-bold text-lg leading-none block">Deutsch</span>
            <span className="text-gold text-sm font-semibold leading-none">Meister</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV.map(({ icon: Icon, label }, i) => {
          const isActive = i === activeIdx;
          return (
            <motion.div key={label}
              animate={isActive ? { backgroundColor: "rgba(245,166,35,0.15)" } : { backgroundColor: "transparent" }}
              className={`flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-default ${
                isActive ? "text-gold border border-gold/30" : "text-text-secondary"
              }`}>
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-gold" : ""}`} />
              <span className="whitespace-nowrap">{label}</span>
            </motion.div>
          );
        })}

        <div className="border-t border-navy-border my-3" />

        {/* Sınav Kazandıran Konular */}
        <button onClick={() => setExamOpen(o => !o)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-navy hover:text-text-primary transition-all">
          <Trophy className="w-5 h-5 shrink-0 text-gold" />
          <span className="flex-1 text-left text-sm font-semibold whitespace-nowrap">Sınav Kazandıran Konular</span>
          <motion.div animate={{ rotate: examOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {examOpen && (
            <motion.ul key="exam" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
              className="overflow-hidden pl-2 space-y-1">
              {EXAM_TOPICS.map(({ label, level }) => (
                <li key={label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy border border-navy-border text-text-secondary text-xs cursor-default hover:border-gold/30 transition-colors">
                  <span className="truncate mr-2 font-medium">{label}</span>
                  <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${LEVEL_BADGE[level]}`}>{level}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="border-t border-navy-border my-3" />

        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary cursor-default">
          <ClipboardCheck className="w-5 h-5 shrink-0 text-amber-400" />
          <span className="flex-1 text-sm font-semibold whitespace-nowrap">Prüfungstraining</span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">YENİ</span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary cursor-default">
          <Music className="w-5 h-5 shrink-0 text-purple-400" />
          <span className="text-sm font-semibold whitespace-nowrap">Musik auf Deutsch</span>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-navy-border shrink-0">
        <div className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium text-text-muted cursor-default">
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Çıkış Yap</span>
        </div>
      </div>
    </aside>
  );
}

/* ─── Static Header ─── */
function DemoHeader() {
  return (
    <header className="h-16 bg-navy-light border-b border-navy-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3 bg-navy border border-navy-border rounded-lg px-3 py-2 w-64">
        <Search className="w-4 h-4 text-text-muted shrink-0" />
        <span className="text-sm text-text-muted">Ara...</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg">
          <Zap className="w-3.5 h-3.5 text-gold" />
          <span className="text-sm font-semibold text-gold">{USER.xp.toLocaleString()} XP</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-navy border border-navy-border rounded-lg text-text-secondary">
          <NoteIcon className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Not Defteri</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <span className="text-sm">🔥</span>
          <span className="text-sm font-semibold text-orange-400">{USER.streak} gün</span>
        </div>
        <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-navy border border-navy-border">
          <Bell className="w-4 h-4 text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gold/20 border border-gold/30 rounded-full flex items-center justify-center">
            <span className="text-gold text-xs font-bold">{USER.initials}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary leading-none mb-0.5">{USER.name}</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400">{USER.level}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Scene: Dashboard ─── */
function SceneDashboard() {
  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      {/* Welcome */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-2xl border border-navy-border p-6">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm">{USER.streak} günlük seri!</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Merhaba, {USER.name.split(" ")[0]}!</h1>
            <p className="text-text-muted text-sm mt-1">Devam et, B2&apos;ye sadece 43 gün kaldı.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-gold">{Math.round((USER.xp / USER.maxXp) * 100)}%</div>
            <p className="text-xs text-text-muted">B1 tamamlandı</p>
          </div>
        </div>
        {/* XP bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-text-muted mb-1.5">
            <span>XP İlerlemesi</span>
            <span className="text-gold font-medium">{USER.xp.toLocaleString()} / {USER.maxXp.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-navy rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full"
              initial={{ width: 0 }} animate={{ width: `${(USER.xp / USER.maxXp) * 100}%` }}
              transition={{ duration: 1.4, ease: "easeOut" }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Skill panel */}
        <div className="col-span-2 bg-navy-card border border-navy-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-text-primary text-sm flex items-center gap-2">
              <Brain className="w-4 h-4 text-gold" /> Beceri Skorları
            </h2>
            <span className="text-xs text-text-muted bg-navy px-2 py-0.5 rounded-full border border-navy-border">Ort. 60%</span>
          </div>
          <div className="space-y-3">
            {SKILLS.map(({ label, score, color, text, icon: Icon }, i) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${text} shrink-0`} />
                <span className={`text-xs font-medium w-16 shrink-0 ${text}`}>{label}</span>
                <div className="flex-1 h-2 bg-navy rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }} animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }} />
                </div>
                <span className="text-xs text-text-muted w-7 text-right">{score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          {[
            { icon: Trophy, label: "Geçilen Sınav", value: "3", color: "text-gold", bg: "bg-gold/10 border-gold/20" },
            { icon: BookMarked, label: "Kelime", value: "847", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { icon: BookOpen, label: "Gramer Konusu", value: "24/65", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className={`bg-navy-card border rounded-xl p-3.5 ${bg}`}>
              <Icon className={`w-5 h-5 mb-2 ${color}`} />
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-[11px] text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wochenplan preview — blurred */}
      <div className="relative bg-navy-card border border-navy-border rounded-2xl p-5 overflow-hidden">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-text-primary text-sm flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gold" /> Bugünkü Plan
          </h2>
          <span className="text-xs text-gold font-medium">2/4 tamamlandı</span>
        </div>
        <div className="space-y-2">
          {[
            { text: "Akkusativ tekrar", done: true,  cat: "Grammatik" },
            { text: "10 kelime kartı çevir", done: true,  cat: "Vokabeln" },
            { text: "B1 Mock Sınav #3", done: false, cat: "Sınav" },
            { text: "Lesen metni oku", done: false, cat: "Lesen" },
          ].map(({ text, done, cat }) => (
            <div key={text} className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-xs ${
              done ? "border-emerald-500/20 bg-emerald-500/5 text-text-muted line-through" : "border-navy-border text-text-secondary"
            }`}>
              {done ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border border-navy-border shrink-0" />}
              <span className="flex-1">{text}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-navy border border-navy-border text-text-muted">{cat}</span>
            </div>
          ))}
        </div>
        {/* blur overlay on bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-card to-transparent flex items-end justify-center pb-3">
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Lock className="w-3 h-3" /> Tam Haftalık Plan için giriş yap
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Scene: Kelimeler ─── */
function SceneKelimeler() {
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState<string | null>(null);

  const rate = (label: string) => {
    setRated(label);
    setTimeout(() => { setFlipped(false); setRated(null); }, 1000);
  };

  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Kelime Tekrarı</h1>
          <p className="text-text-muted text-sm mt-0.5">SM-2 algoritması ile akıllı zamanlama</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-navy-card border border-navy-border rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-bold text-amber-400">147</p>
            <p className="text-xs text-text-muted">Bekleyen kart</p>
          </div>
          <div className="bg-navy-card border border-navy-border rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-bold text-emerald-400">847</p>
            <p className="text-xs text-text-muted">Öğrenildi</p>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="max-w-xl mx-auto space-y-4">
        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="h-1.5 rounded-full bg-emerald-400 flex-1 max-w-[60px]" />
          <div className="h-1.5 rounded-full bg-emerald-400 flex-1 max-w-[60px]" />
          <div className="h-1.5 rounded-full bg-gold flex-1 max-w-[60px]" />
          <div className="h-1.5 rounded-full bg-navy-border flex-1 max-w-[60px]" />
          <div className="h-1.5 rounded-full bg-navy-border flex-1 max-w-[60px]" />
          <span className="text-xs text-text-muted ml-1">3/5</span>
        </div>

        {/* Flashcard */}
        <motion.div onClick={() => !rated && setFlipped(f => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", cursor: rated ? "default" : "pointer", perspective: 1200 }}
          className="relative h-56 rounded-2xl select-none">
          {/* Front */}
          <div className="absolute inset-0 bg-navy-card border border-navy-border rounded-2xl flex flex-col items-center justify-center gap-3 px-6"
            style={{ backfaceVisibility: "hidden" }}>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-violet-500/15 border-violet-500/30 text-violet-400">B1</span>
            <p className="text-4xl font-bold text-text-primary">die Bewerbung</p>
            <p className="text-xs text-text-muted">Tıklayarak anlamı gör →</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-gold/5 border border-gold/25 rounded-2xl flex flex-col items-center justify-center gap-3 px-8 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <p className="text-3xl font-bold text-gold">iş başvurusu</p>
            <p className="text-sm text-text-secondary italic leading-relaxed">
              &ldquo;Ich habe eine Bewerbung für die Stelle geschickt.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Rating buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Sıfırla", days: "Yarın",  cls: "border-red-500/30 text-red-400 hover:bg-red-500/10" },
            { label: "Zor",     days: "3 gün",  cls: "border-orange-500/30 text-orange-400 hover:bg-orange-500/10" },
            { label: "Orta",    days: "7 gün",  cls: "border-amber-500/30 text-amber-400 hover:bg-amber-500/10" },
            { label: "Kolay",   days: "14 gün", cls: "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" },
          ].map(({ label, days, cls }) => (
            <button key={label} onClick={() => rate(label)}
              className={`flex flex-col items-center gap-0.5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${cls} ${rated === label ? "scale-95 opacity-50" : ""}`}>
              {label}
              <span className="text-[10px] font-normal opacity-60">{days}</span>
            </button>
          ))}
        </div>

        {/* SRS info */}
        <div className="bg-navy-card border border-navy-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1.5"><RotateCcw className="w-3 h-3" /> Tekrar Geçmişi</span>
            <span className="text-gold font-medium">EF: 2.6</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-navy rounded-lg p-2 border border-navy-border">
              <p className="font-bold text-text-primary">5×</p>
              <p className="text-text-muted">Tekrar</p>
            </div>
            <div className="bg-navy rounded-lg p-2 border border-navy-border">
              <p className="font-bold text-emerald-400">80%</p>
              <p className="text-text-muted">Başarı</p>
            </div>
            <div className="bg-navy rounded-lg p-2 border border-navy-border">
              <p className="font-bold text-gold">14g</p>
              <p className="text-text-muted">Sonraki</p>
            </div>
          </div>
        </div>

        {/* Locked feature */}
        <div className="relative bg-navy-card border border-navy-border rounded-xl p-4 overflow-hidden">
          <div className="blur-sm select-none pointer-events-none">
            <p className="text-sm font-semibold text-text-primary mb-2">Kelime Çalışma İstatistikleri</p>
            <div className="grid grid-cols-2 gap-2">
              {["Bu hafta: +234 kelime", "En zor kart: 8×", "Öğrenme hızı: ↑12%", "Streak: 18 gün"].map(t => (
                <div key={t} className="bg-navy rounded-lg p-2 border border-navy-border text-xs text-text-muted">{t}</div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-navy/60 backdrop-blur-[1px] rounded-xl">
            <div className="flex items-center gap-2 bg-navy-card border border-navy-border rounded-lg px-4 py-2">
              <Lock className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-text-primary">Üye ol, kilidini aç</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Scene: Gramer ─── */
function SceneGramer() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 0;

  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Gramer Alıştırması</h1>
          <p className="text-text-muted text-sm mt-0.5">B1 · Konjunktiv II</p>
        </div>
        <div className="text-sm text-text-muted bg-navy-card border border-navy-border px-4 py-2 rounded-xl">
          7 / 13 konu tamamlandı
        </div>
      </div>

      {/* Topic progress */}
      <div className="grid grid-cols-5 gap-2">
        {["Präsens", "Perfekt", "Passiv", "Konj. II", "Relativ"].map((t, i) => (
          <div key={t} className={`rounded-xl p-2.5 text-center border text-xs font-medium ${
            i < 3 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
            i === 3 ? "bg-gold/10 border-gold/30 text-gold" :
            "bg-navy-card border-navy-border text-text-muted"
          }`}>
            {i < 3 && <CheckCircle2 className="w-3 h-3 mx-auto mb-1" />}
            {i === 3 && <div className="w-2 h-2 rounded-full bg-gold mx-auto mb-1 animate-pulse" />}
            {t}
          </div>
        ))}
      </div>

      {/* Question card */}
      <div className="bg-navy-card border border-navy-border rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-400">Konjunktiv II</span>
          <span className="text-xs text-text-muted">Soru 3/5</span>
          <div className="flex-1 h-1.5 bg-navy rounded-full overflow-hidden ml-2">
            <div className="h-full bg-violet-500 rounded-full" style={{ width: "60%" }} />
          </div>
        </div>

        <p className="text-text-primary text-base leading-relaxed">
          Wenn ich mehr Zeit{" "}
          <span className={`px-2 py-0.5 rounded font-bold transition-all ${
            selected === null ? "bg-navy border border-dashed border-navy-border text-text-muted" :
            selected === correct ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/15 text-red-300"
          }`}>
            {selected !== null ? ["hätte", "habe", "hatte", "haben"][correct] : "___"}
          </span>
          , würde ich jeden Tag Klavier spielen.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {["hätte", "habe", "hatte", "haben"].map((opt, i) => {
            let cls = "border-navy-border text-text-secondary hover:border-gold/30 hover:text-text-primary";
            if (selected !== null) {
              if (i === correct) cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
              else if (i === selected && selected !== correct) cls = "border-red-500/40 bg-red-500/10 text-red-300";
              else cls = "border-navy-border text-text-muted opacity-40";
            }
            return (
              <button key={opt} onClick={() => selected === null && setSelected(i)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${cls}`}>
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 border text-sm leading-relaxed ${
                selected === correct
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                  : "bg-red-500/5 border-red-500/20 text-red-300"
              }`}>
              <div className="flex items-start gap-2">
                {selected === correct
                  ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  : <XCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                <span>
                  {selected === correct
                    ? "Mükemmel! \"hätte\" — haben fiilinin Konjunktiv II halidir. Varsayımsal durumlarda kullanılır."
                    : "Yanlış. \"hätte\" doğru cevaptır — haben fiilinin Konjunktiv II hali, varsayımsal durumlarda kullanılır."}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Yanlış Cevap Defteri — blurred */}
      <div className="relative bg-navy-card border border-navy-border rounded-2xl p-5 overflow-hidden">
        <div className="blur-sm pointer-events-none select-none">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="font-semibold text-sm text-text-primary">Yanlış Cevap Defteri</span>
            <span className="text-xs text-red-400 ml-auto">12 hata</span>
          </div>
          {["Passiv Yapısı · B1", "Relativsatz · B2", "Genitiv · B1"].map(t => (
            <div key={t} className="flex items-center gap-2 px-3 py-2 bg-navy rounded-lg border border-navy-border mb-1.5 text-xs text-text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{t}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-navy/50 backdrop-blur-[1px] rounded-2xl">
          <div className="flex items-center gap-2 bg-navy-card border border-navy-border rounded-lg px-4 py-2">
            <Lock className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-text-primary">Hata takibi için giriş yap</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Scene: Sınav ─── */
function SceneSinav() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 1;

  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      {/* Exam list header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Deneme Sınavları</h1>
          <p className="text-text-muted text-sm mt-0.5">Gerçek telc sınav formatı</p>
        </div>
        <div className="text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
          3 sınav geçildi
        </div>
      </div>

      {/* Exam in progress */}
      <div className="bg-navy-card border border-gold/20 rounded-2xl overflow-hidden">
        {/* Exam top bar */}
        <div className="bg-gold/5 border-b border-gold/15 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">telc B1 Mock Sınav #3</p>
              <p className="text-xs text-text-muted">Lesen und Schreiben · Teil 2</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">47:22</span>
            </div>
            <div className="text-xs text-text-muted bg-navy border border-navy-border rounded-lg px-2.5 py-1.5">
              3/5 soru
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-navy-border">
          <div className="h-full bg-gold" style={{ width: "60%" }} />
        </div>

        {/* Question */}
        <div className="p-5 space-y-4">
          <div className="bg-navy rounded-xl p-4 border border-navy-border">
            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-2">Okuma Metni</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Die Bundesagentur für Arbeit berichtet, dass die Nachfrage nach{" "}
              <span className="bg-gold/15 text-gold px-0.5 rounded">Fachkräften</span> in den Bereichen
              IT und Gesundheit stark gestiegen ist. Besonders Pflegekräfte und Softwareentwickler
              werden dringend gesucht, da der{" "}
              <span className="bg-gold/15 text-gold px-0.5 rounded">Fachkräftemangel</span> zunimmt...
            </p>
          </div>

          <p className="text-sm font-medium text-text-primary">
            In welchen Bereichen werden laut dem Text besonders viele Fachkräfte gesucht?
          </p>

          <div className="space-y-2">
            {[
              "Landwirtschaft und Tourismus",
              "IT und Gesundheit",
              "Bildung und Verwaltung",
              "Bauwesen und Logistik",
            ].map((opt, i) => {
              let cls = "border-navy-border text-text-secondary hover:border-gold/30 hover:text-text-primary";
              if (selected !== null) {
                if (i === correct) cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                else if (i === selected && selected !== correct) cls = "border-red-500/40 bg-red-500/10 text-red-300";
                else cls = "border-navy-border text-text-muted opacity-40";
              }
              return (
                <button key={opt} onClick={() => selected === null && setSelected(i)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm text-left transition-all ${cls}`}>
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-3.5 border text-sm ${
                  selected === correct
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                    : "bg-red-500/5 border-red-500/20 text-red-300"
                }`}>
                <div className="flex items-start gap-2">
                  {selected === correct ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                  {selected === correct
                    ? "Doğru! Metinde \"IT ve Gesundheit\" alanları açıkça belirtilmiş."
                    : "Yanlış. Metinde \"IT und Gesundheit\" ifadesine dikkat et."}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Analysis — blurred */}
      <div className="relative bg-navy-card border border-navy-border rounded-2xl p-5 overflow-hidden">
        <div className="blur-sm pointer-events-none select-none space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-gold" />
            <span className="font-semibold text-sm text-text-primary">AI Sınav Analizi</span>
            <span className="ml-auto text-xs bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full">68/100</span>
          </div>
          <div className="bg-navy rounded-xl p-3 border border-navy-border text-xs text-text-secondary">
            Lesen bölümünde iyi performans gösterdin. Konjunktiv II ve Passiv kullanımını...
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Konjunktiv II", "Passivkonstruktionen", "Relativsätze"].map(t => (
              <span key={t} className="text-xs px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full">{t}</span>
            ))}
          </div>
          <div className="space-y-1.5">
            {["die Fachkraft → uzman eleman", "der Mangel → eksiklik", "dringend → acilen"].map(t => (
              <div key={t} className="px-3 py-1.5 bg-navy rounded-lg border border-navy-border text-xs text-text-muted">{t}</div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-navy/60 backdrop-blur-[1px] rounded-2xl">
          <div className="text-center space-y-2">
            <div className="flex items-center gap-2 bg-navy-card border border-gold/30 rounded-xl px-5 py-2.5 shadow-lg">
              <Lock className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-text-primary">AI Analizi için giriş yap</span>
            </div>
            <p className="text-xs text-text-muted">Claude AI ile kişisel geri bildirim</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Scene: İlerleme ─── */
const GRAMMAR_DATA = [
  { level: "A1", completed: 13, total: 13, bar: "bg-emerald-500", badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" },
  { level: "A2", completed: 10, total: 13, bar: "bg-blue-500",    badge: "bg-blue-500/15 border-blue-500/30 text-blue-400" },
  { level: "B1", completed: 7,  total: 13, bar: "bg-violet-500",  badge: "bg-violet-500/15 border-violet-500/30 text-violet-400" },
  { level: "B2", completed: 2,  total: 13, bar: "bg-orange-500",  badge: "bg-orange-500/15 border-orange-500/30 text-orange-400" },
  { level: "C1", completed: 0,  total: 13, bar: "bg-yellow-500",  badge: "bg-yellow-500/15 border-yellow-500/30 text-yellow-400" },
];

const SKILL_DATA = [
  { label: "Dinleme",  score: 62, bar: "bg-blue-500",    color: "text-blue-400" },
  { label: "Okuma",    score: 74, bar: "bg-emerald-500", color: "text-emerald-400" },
  { label: "Yazma",    score: 51, bar: "bg-amber-500",   color: "text-amber-400" },
  { label: "Konuşma",  score: 45, bar: "bg-violet-500",  color: "text-violet-400" },
  { label: "Gramer",   score: 68, bar: "bg-teal-500",    color: "text-teal-400" },
];

const EXAM_ATTEMPTS = [
  { name: "telc A2 Mock #2", date: "12.04.2026", score: 81, passed: true },
  { name: "telc B1 Mock #1", date: "20.04.2026", score: 73, passed: true },
  { name: "telc B1 Mock #2", date: "28.04.2026", score: 68, passed: false },
];

function SceneIlerleme() {
  const avgSkill = Math.round(SKILL_DATA.reduce((s, x) => s + x.score, 0) / SKILL_DATA.length);

  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gold" /> İlerleme Raporu
        </h1>
        <p className="text-text-muted text-sm mt-0.5">Tüm öğrenme istatistiklerin tek yerde</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Mevcut Seviye", value: "B1", sub: "TELC", icon: GraduationCap, color: "text-gold" },
          { label: "Toplam XP", value: "2.840", sub: "Hedef: 5.000", icon: Star, color: "text-gold" },
          { label: "Çalışma Serisi", value: "18 gün", sub: "Üst üste", icon: Flame, color: "text-orange-400" },
          { label: "Toplam Süre", value: "47s 20dk", sub: "89 oturum", icon: Clock, color: "text-blue-400" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-navy-card border border-navy-border rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">{label}</p>
                <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{sub}</p>
              </div>
              <div className={`w-8 h-8 rounded-lg bg-navy flex items-center justify-center border border-navy-border ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Grammar progress */}
        <div className="bg-navy-card border border-navy-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold" />
              <h2 className="font-semibold text-text-primary text-sm">Gramer İlerlemesi</h2>
            </div>
            <span className="text-xs text-text-muted">32/65 konu</span>
          </div>
          <div className="space-y-3">
            {GRAMMAR_DATA.map(({ level, completed, total, bar, badge }) => {
              const pct = Math.round((completed / total) * 100);
              return (
                <div key={level}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${badge}`}>{level}</span>
                      {completed === total && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <span className="text-xs text-text-muted">{completed}/{total}</span>
                  </div>
                  <div className="h-2 bg-navy rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full ${bar}`}
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill scores */}
        <div className="bg-navy-card border border-navy-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-gold" />
              <h2 className="font-semibold text-text-primary text-sm">Beceri Skorları</h2>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold">Ort: {avgSkill}%</span>
          </div>
          <div className="space-y-3">
            {SKILL_DATA.map(({ label, score, bar, color }, i) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium ${color}`}>{label}</span>
                  <span className="text-xs text-text-muted">{score}%</span>
                </div>
                <div className="h-2 bg-navy rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${bar}`}
                    initial={{ width: 0 }} animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vocabulary + Recent Exams — blurred */}
      <div className="relative bg-navy-card border border-navy-border rounded-2xl p-5 overflow-hidden">
        <div className="blur-sm pointer-events-none select-none">
          <div className="grid grid-cols-2 gap-4">
            {/* Vocabulary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-sm text-text-primary">Kelime Durumu</span>
                <span className="ml-auto text-xs text-emerald-400 font-bold">847/1500</span>
              </div>
              <div className="h-3 bg-navy rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "56%" }} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-navy rounded-lg px-3 py-2 border border-navy-border">
                  <p className="text-lg font-bold text-text-primary">847</p>
                  <p className="text-xs text-text-muted">Öğrenildi</p>
                </div>
                <div className="bg-navy rounded-lg px-3 py-2 border border-navy-border">
                  <p className="text-lg font-bold text-text-primary">234</p>
                  <p className="text-xs text-text-muted">Çalışılıyor</p>
                </div>
              </div>
            </div>
            {/* Recent exams */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gold" />
                <span className="font-semibold text-sm text-text-primary">Son Sınavlar</span>
              </div>
              <div className="space-y-2">
                {EXAM_ATTEMPTS.map((a) => (
                  <div key={a.name} className="flex items-center gap-2 px-3 py-2 bg-navy rounded-lg border border-navy-border text-xs">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${a.passed ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                      {a.score}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-medium truncate">{a.name}</p>
                      <p className="text-text-muted">{a.date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${a.passed ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                      {a.passed ? "Geçti" : "Kaldı"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-navy/60 backdrop-blur-[1px] rounded-2xl">
          <div className="text-center space-y-1.5">
            <div className="flex items-center gap-2 bg-navy-card border border-gold/30 rounded-xl px-5 py-2.5 shadow-lg">
              <Lock className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-text-primary">Tüm istatistikler için giriş yap</span>
            </div>
            <p className="text-xs text-text-muted">Kelime durumu · Sınav geçmişi · Çalışma analizi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Scene: Haftalık Plan ─── */
const WEEK_DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MOCK_WEEK: Record<number, { text: string; cat: string; done: boolean; priority: "high" | "medium" | "low" }[]> = {
  0: [
    { text: "Akkusativ tekrar", cat: "Grammatik", done: true, priority: "high" },
    { text: "10 kelime kartı", cat: "Vokabeln", done: true, priority: "medium" },
    { text: "B1 Mock Sınav #3", cat: "Sınav", done: false, priority: "high" },
    { text: "Lesen metni oku", cat: "Lesen", done: false, priority: "low" },
  ],
  1: [
    { text: "Konjunktiv II alıştırması", cat: "Grammatik", done: false, priority: "high" },
    { text: "Podcast dinle (15 dk)", cat: "Hören", done: false, priority: "medium" },
  ],
  2: [
    { text: "Schreiben taslağı yaz", cat: "Schreiben", done: false, priority: "high" },
    { text: "Genitiv kuralları", cat: "Grammatik", done: false, priority: "medium" },
    { text: "15 yeni kelime", cat: "Vokabeln", done: false, priority: "low" },
  ],
  3: [
    { text: "B2 okuma parçası", cat: "Lesen", done: false, priority: "medium" },
    { text: "Konuşma pratiği", cat: "Sprechen", done: false, priority: "high" },
  ],
  4: [
    { text: "Haftalık tekrar", cat: "Vokabeln", done: false, priority: "medium" },
    { text: "Mock Sınav değerlendirme", cat: "Sınav", done: false, priority: "high" },
  ],
};

const CAT_COLOR: Record<string, string> = {
  Grammatik: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  Vokabeln:  "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Sınav:     "text-red-400 bg-red-500/10 border-red-500/20",
  Lesen:     "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Hören:     "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Schreiben: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Sprechen:  "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

const PRI_DOT: Record<string, string> = { high: "bg-red-400", medium: "bg-amber-400", low: "bg-green-400" };

function SceneHaftalikPlan() {
  const [activeDay, setActiveDay] = useState(0);
  const tasks = MOCK_WEEK[activeDay] ?? [];
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;

  const weekStats = [
    { label: "Bu hafta", value: "18 görev", color: "text-gold" },
    { label: "Tamamlandı", value: "7 görev", color: "text-emerald-400" },
    { label: "Haftalık XP", value: "+340", color: "text-violet-400" },
  ];

  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gold" /> Haftalık Plan
          </h1>
          <p className="text-text-muted text-sm mt-0.5">Kendi çalışma programını oluştur</p>
        </div>
        <div className="flex items-center gap-2">
          {weekStats.map(({ label, value, color }) => (
            <div key={label} className="bg-navy-card border border-navy-border rounded-xl px-3 py-2 text-center">
              <p className={`text-sm font-bold ${color}`}>{value}</p>
              <p className="text-[10px] text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Day selector */}
      <div className="grid grid-cols-7 gap-1.5">
        {WEEK_DAYS.map((d, i) => {
          const dayTasks = MOCK_WEEK[i] ?? [];
          const isToday = i === 0;
          return (
            <button key={d} onClick={() => setActiveDay(i)}
              className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                activeDay === i
                  ? "bg-gold/10 border-gold/40 text-gold"
                  : isToday
                  ? "bg-navy-card border-navy-border text-text-primary ring-1 ring-gold/20"
                  : "bg-navy-card border-navy-border text-text-muted hover:border-gold/20 hover:text-text-secondary"
              }`}>
              <span className="font-semibold">{d}</span>
              {dayTasks.length > 0 ? (
                <div className="flex gap-0.5">
                  {dayTasks.slice(0, 4).map((t, ti) => (
                    <div key={ti} className={`w-1.5 h-1.5 rounded-full ${t.done ? "bg-emerald-400" : "bg-navy-border"}`} />
                  ))}
                </div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-navy-border" />
              )}
              {isToday && <span className="text-[9px] text-gold/70 font-bold">bugün</span>}
            </button>
          );
        })}
      </div>

      {/* Day tasks */}
      <div className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-navy-border flex items-center justify-between bg-navy/50">
          <span className="font-semibold text-sm text-text-primary">
            {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"][activeDay]}
          </span>
          {total > 0 && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
              done === total ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-text-muted border-navy-border bg-navy"
            }`}>
              {done}/{total} tamamlandı
            </span>
          )}
        </div>

        {total > 0 ? (
          <div className="p-3 space-y-2">
            {tasks.map((task, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                task.done
                  ? "border-emerald-500/15 bg-emerald-500/5 text-text-muted"
                  : "border-navy-border text-text-secondary hover:border-gold/20"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${PRI_DOT[task.priority]}`} />
                {task.done
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  : <div className="w-4 h-4 rounded-full border border-navy-border shrink-0" />}
                <span className={`flex-1 ${task.done ? "line-through" : ""}`}>{task.text}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CAT_COLOR[task.cat] ?? "text-text-muted border-navy-border"}`}>
                  {task.cat}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-text-muted text-sm">
            Bu gün için henüz görev yok
          </div>
        )}
      </div>

      {/* Locked: add task + week note */}
      <div className="relative bg-navy-card border border-navy-border rounded-2xl p-5 overflow-hidden">
        <div className="blur-sm pointer-events-none select-none space-y-3">
          <p className="text-sm font-semibold text-text-primary">Görev Ekle & Notlar</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-navy border border-navy-border rounded-xl px-3 py-2 text-xs text-text-muted">Yeni görev yaz...</div>
            <div className="px-3 py-2 bg-gold/20 border border-gold/30 rounded-xl text-xs text-gold font-bold">Ekle</div>
          </div>
          <div className="bg-navy border border-navy-border rounded-xl p-3 text-xs text-text-muted h-16">
            Bu haftanın notları buraya...
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-navy/60 backdrop-blur-[1px] rounded-2xl">
          <div className="text-center space-y-1.5">
            <div className="flex items-center gap-2 bg-navy-card border border-gold/30 rounded-xl px-5 py-2.5 shadow-lg">
              <Lock className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-text-primary">Kendi planını oluşturmak için giriş yap</span>
            </div>
            <p className="text-xs text-text-muted">Ücretsiz — sınırsız plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CTA Bar ─── */
function CTABar({ scene }: { scene: Scene }) {
  const msgs: Record<Scene, string> = {
    dashboard:   "Kendi ilerleme panelinizi görmek için",
    kelimeler:   "5.000+ kelimeye erişmek için",
    gramer:      "65+ gramer konusunu açmak için",
    sinav:       "Mock sınav ve AI analizine erişmek için",
    haftalikplan:"Kişisel çalışma planı oluşturmak için",
    ilerleme:    "Tam istatistik raporuna erişmek için",
  };

  return (
    <motion.div key={scene} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="border-t border-navy-border bg-navy-light px-6 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-sm text-text-secondary">{msgs[scene]}</span>
      </div>
      <Link href="/register"
        className="flex items-center gap-2 bg-gold text-navy font-bold text-sm px-5 py-2 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20">
        Ücretsiz Başla
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function DemoPage() {
  const [scene, setScene] = useState<Scene>("dashboard");
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setScene(s => {
      const i = SCENES.indexOf(s);
      return SCENES[(i + 1) % SCENES.length];
    });
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(advance, 6000);
    return () => clearTimeout(t);
  }, [scene, paused, advance]);

  return (
    <div className="h-screen bg-navy text-text-primary flex flex-col overflow-hidden">

      {/* Top demo banner */}
      <div className="bg-gold/10 border-b border-gold/20 px-6 py-2 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-2 text-xs text-gold">
          <Star className="w-3.5 h-3.5 fill-gold" />
          <span className="font-semibold">Demo Modu</span>
          <span className="text-gold/70">— Bu gerçek bir önizlemedir</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">Zaten hesabın var mı?</span>
          <Link href="/login" className="text-xs font-semibold text-gold hover:underline">Giriş Yap</Link>
        </div>
      </div>

      {/* App shell */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DemoSidebar activeScene={scene} />

        {/* Content column */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DemoHeader />

          {/* Scene switcher tabs */}
          <div className="flex items-center gap-1 px-4 pt-3 pb-0 border-b border-navy-border bg-navy-light shrink-0">
            {SCENES.map((s) => (
              <button key={s}
                onClick={() => { setScene(s); setPaused(true); }}
                className={`relative px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  scene === s
                    ? "text-gold bg-navy border border-b-0 border-navy-border"
                    : "text-text-muted hover:text-text-secondary"
                }`}>
                {SCENE_LABELS[s]}
                {scene === s && !paused && (
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold origin-left rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={scene} />
                )}
              </button>
            ))}
            <div className="flex-1" />
            <div className="flex items-center gap-2 pb-2">
              <button onClick={() => { const i = SCENES.indexOf(scene); setScene(SCENES[(i - 1 + SCENES.length) % SCENES.length]); setPaused(true); }}
                className="w-6 h-6 flex items-center justify-center rounded-md border border-navy-border text-text-muted hover:text-text-primary transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => { advance(); setPaused(true); }}
                className="w-6 h-6 flex items-center justify-center rounded-md border border-navy-border text-text-muted hover:text-text-primary transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setPaused(p => !p)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                  paused
                    ? "border-gold/40 text-gold bg-gold/10"
                    : "border-navy-border text-text-muted hover:text-text-primary"
                }`}>
                {paused ? "▶ Oynat" : "⏸ Duraklat"}
              </button>
            </div>
          </div>

          {/* Scene content */}
          <div className="flex-1 overflow-hidden bg-navy relative">
            <AnimatePresence mode="wait">
              <motion.div key={scene}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0">
                {scene === "dashboard"    && <SceneDashboard />}
                {scene === "kelimeler"   && <SceneKelimeler />}
                {scene === "gramer"      && <SceneGramer />}
                {scene === "sinav"       && <SceneSinav />}
                {scene === "haftalikplan"&& <SceneHaftalikPlan />}
                {scene === "ilerleme"    && <SceneIlerleme />}
              </motion.div>
            </AnimatePresence>
          </div>

          <CTABar scene={scene} />
        </div>
      </div>
    </div>
  );
}
