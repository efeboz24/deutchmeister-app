"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Dumbbell,
  FileText,
  Headphones,
  PenLine,
  Mic,
  Star,
  X,
} from "lucide-react";

/* ── types ──────────────────────────────────────────────────── */
type Priority = "high" | "medium" | "low";
type Category = "grammatik" | "lesen" | "hören" | "schreiben" | "sprechen" | "vokabeln" | "sınav" | "serbest";

interface Task {
  id: string;
  text: string;
  done: boolean;
  priority: Priority;
  category: Category;
  time?: string;
}

interface DayPlan {
  tasks: Task[];
  note: string;
}

type WeekPlan = Record<string, DayPlan>;

/* ── constants ──────────────────────────────────────────────── */
const DAYS_DE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const DAYS_TR = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
const DAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const CATEGORIES: { id: Category; label: string; icon: React.ElementType; color: string; bg: string; border: string }[] = [
  { id: "grammatik",  label: "Grammatik",  icon: BookOpen,    color: "text-skill-grammatik", bg: "bg-skill-grammatik/15", border: "border-skill-grammatik/30" },
  { id: "lesen",      label: "Lesen",      icon: BookOpen,    color: "text-skill-lesen",     bg: "bg-skill-lesen/15",     border: "border-skill-lesen/30" },
  { id: "hören",      label: "Hören",      icon: Headphones,  color: "text-skill-horen",     bg: "bg-skill-horen/15",     border: "border-skill-horen/30" },
  { id: "schreiben",  label: "Schreiben",  icon: PenLine,     color: "text-skill-schreiben", bg: "bg-skill-schreiben/15", border: "border-skill-schreiben/30" },
  { id: "sprechen",   label: "Sprechen",   icon: Mic,         color: "text-skill-sprechen",  bg: "bg-skill-sprechen/15",  border: "border-skill-sprechen/30" },
  { id: "vokabeln",   label: "Vokabeln",   icon: Star,        color: "text-amber-400",       bg: "bg-amber-500/15",       border: "border-amber-500/30" },
  { id: "sınav",      label: "Sınav",      icon: FileText,    color: "text-red-400",         bg: "bg-red-500/15",         border: "border-red-500/30" },
  { id: "serbest",    label: "Serbest",    icon: Dumbbell,    color: "text-text-muted",      bg: "bg-navy-border/30",     border: "border-navy-border" },
];

const PRIORITIES: { id: Priority; label: string; color: string; dot: string }[] = [
  { id: "high",   label: "Yüksek",  color: "text-red-400",    dot: "bg-red-400" },
  { id: "medium", label: "Orta",    color: "text-amber-400",  dot: "bg-amber-400" },
  { id: "low",    label: "Düşük",   color: "text-green-400",  dot: "bg-green-400" },
];

const QUICK_TASKS = [
  "Akkusativ/Dativ tekrar",
  "Perfekt alıştırması",
  "10 yeni kelime öğren",
  "Hören pratiği (20 dk)",
  "Lesen metni oku",
  "Schreiben: günlük yaz",
  "Sınav soruları çöz",
  "Flashcard tekrarı",
];

/* ── helpers ────────────────────────────────────────────────── */
function getWeekKey(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toISOString().split("T")[0];
}

function getWeekDates(weekStart: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function formatDate(d: Date) {
  return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1).toString().padStart(2, "0")}`;
}

function isTodayDate(d: Date) {
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function getCategoryMeta(id: Category) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[7];
}

function getPriorityMeta(id: Priority) {
  return PRIORITIES.find((p) => p.id === id) ?? PRIORITIES[1];
}

/* ── AddTaskModal ────────────────────────────────────────────── */
function AddTaskModal({
  dayIdx,
  dayDate,
  onAdd,
  onClose,
}: {
  dayIdx: number;
  dayDate: Date;
  onAdd: (task: Task) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("grammatik");
  const [priority, setPriority] = useState<Priority>("medium");
  const [time, setTime] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function submit() {
    const t = text.trim();
    if (!t) return;
    onAdd({ id: uid(), text: t, done: false, priority, category, time: time || undefined });
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="bg-navy-card border border-navy-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-text-primary font-bold text-base">Görev Ekle</h3>
            <p className="text-text-muted text-xs mt-0.5">{DAYS_TR[dayIdx]} · {formatDate(dayDate)}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-navy transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* quick tasks */}
        <div className="mb-4">
          <p className="text-xs text-text-muted mb-2 font-medium">Hızlı Ekle:</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TASKS.map((qt) => (
              <button key={qt} onClick={() => setText(qt)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all
                  ${text === qt ? "bg-gold/20 text-gold border-gold/40" : "bg-navy border-navy-border text-text-muted hover:text-text-secondary hover:border-gold/20"}`}>
                {qt}
              </button>
            ))}
          </div>
        </div>

        {/* text input */}
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); if (e.key === "Escape") onClose(); }}
          placeholder="Görev veya konu yaz..."
          className="w-full bg-navy border border-navy-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-gold/40 transition-colors mb-4"
        />

        {/* category */}
        <div className="mb-4">
          <p className="text-xs text-text-muted mb-2 font-medium">Kategori:</p>
          <div className="grid grid-cols-4 gap-1.5">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setCategory(c.id)}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all
                  ${category === c.id ? `${c.bg} ${c.border} ${c.color}` : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
                <c.icon className="w-3 h-3 shrink-0" />
                <span className="truncate">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* priority + time */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1">
            <p className="text-xs text-text-muted mb-2 font-medium">Öncelik:</p>
            <div className="flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button key={p.id} onClick={() => setPriority(p.id)}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border text-xs font-medium transition-all
                    ${priority === p.id ? `bg-navy-light border-navy-border ${p.color}` : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dot}`} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="w-28">
            <p className="text-xs text-text-muted mb-2 font-medium">Saat (opsiyonel):</p>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
              className="w-full bg-navy border border-navy-border rounded-lg px-2 py-1.5 text-xs text-text-primary outline-none focus:border-gold/40 transition-colors" />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose}
            className="px-4 py-2.5 bg-navy border border-navy-border rounded-xl text-text-muted hover:text-text-secondary text-sm font-medium transition-colors">
            İptal
          </button>
          <button onClick={submit} disabled={!text.trim()}
            className="flex-1 py-2.5 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm">
            Ekle
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── DayCard ─────────────────────────────────────────────────── */
function DayCard({
  dayIdx,
  date,
  plan,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onNoteChange,
}: {
  dayIdx: number;
  date: Date;
  plan: DayPlan;
  onAddTask: (dayIdx: number, date: Date) => void;
  onToggleTask: (dayIdx: number, taskId: string) => void;
  onDeleteTask: (dayIdx: number, taskId: string) => void;
  onNoteChange: (dayIdx: number, note: string) => void;
}) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const isToday = isTodayDate(date);
  const isWeekend = dayIdx >= 5;
  const doneCount = plan.tasks.filter((t) => t.done).length;
  const total = plan.tasks.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: dayIdx * 0.04, duration: 0.4, ease: "easeOut" }}
      className={`flex flex-col rounded-2xl border overflow-hidden transition-colors
        ${isToday
          ? "border-gold/50 bg-gold/5 shadow-lg shadow-gold/5"
          : isWeekend
          ? "border-navy-border bg-navy-card/50"
          : "border-navy-border bg-navy-card"}`}
    >
      {/* day header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b
        ${isToday ? "bg-gold/10 border-gold/20" : "bg-navy/30 border-navy-border"}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-sm ${isToday ? "text-gold" : isWeekend ? "text-text-muted" : "text-text-primary"}`}>
              {DAYS_DE[dayIdx]}
            </span>
            {isToday && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gold text-navy rounded-full">Bugün</span>
            )}
          </div>
          <p className={`text-xs mt-0.5 ${isToday ? "text-gold/70" : "text-text-muted"}`}>
            {DAYS_TR[dayIdx]} · {formatDate(date)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {total > 0 && (
            <span className={`text-xs font-semibold ${doneCount === total ? "text-green-400" : "text-text-muted"}`}>
              {doneCount}/{total}
            </span>
          )}
          <button
            onClick={() => onAddTask(dayIdx, date)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
              ${isToday
                ? "bg-gold/20 text-gold hover:bg-gold/30"
                : "bg-navy-border/50 text-text-muted hover:bg-gold/15 hover:text-gold"}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* progress bar */}
      {total > 0 && (
        <div className="h-0.5 bg-navy-border">
          <motion.div
            className={`h-0.5 ${doneCount === total ? "bg-green-400" : "bg-gold"}`}
            initial={{ width: 0 }}
            animate={{ width: `${(doneCount / total) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      {/* tasks */}
      <div className="flex-1 p-3 space-y-2 min-h-[100px]">
        <AnimatePresence initial={false}>
          {plan.tasks.length === 0 ? (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => onAddTask(dayIdx, date)}
              className="w-full h-16 flex flex-col items-center justify-center gap-1 border border-dashed border-navy-border rounded-xl text-text-muted hover:border-gold/30 hover:text-text-secondary transition-all group"
            >
              <Plus className="w-4 h-4 group-hover:text-gold transition-colors" />
              <span className="text-xs">Görev ekle</span>
            </motion.button>
          ) : (
            plan.tasks.map((task) => {
              const cat = getCategoryMeta(task.category);
              const pri = getPriorityMeta(task.priority);
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -8, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 8, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex items-start gap-2 p-2.5 rounded-xl border transition-all
                    ${task.done
                      ? "bg-navy/30 border-navy-border opacity-60"
                      : `${cat.bg} ${cat.border}`}`}
                >
                  <button onClick={() => onToggleTask(dayIdx, task.id)} className="shrink-0 mt-0.5">
                    {task.done
                      ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                      : <Circle className={`w-4 h-4 ${cat.color}`} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-1.5 flex-wrap">
                      {task.time && (
                        <span className="text-[10px] text-text-muted font-mono shrink-0">{task.time}</span>
                      )}
                      <span className={`text-xs font-medium leading-snug flex-1 ${task.done ? "line-through text-text-muted" : "text-text-primary"}`}>
                        {task.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${cat.bg} ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${pri.dot}`} title={pri.label} />
                    </div>
                  </div>
                  {pendingDeleteId === task.id ? (
                    <div className="shrink-0 flex items-center gap-1">
                      <button
                        onClick={() => { onDeleteTask(dayIdx, task.id); setPendingDeleteId(null); }}
                        className="text-[10px] text-red-400 hover:text-red-300 px-1.5 py-0.5 rounded border border-red-500/30 transition-colors"
                      >
                        Sil
                      </button>
                      <button
                        onClick={() => setPendingDeleteId(null)}
                        className="text-[10px] text-text-muted hover:text-text-primary px-1.5 py-0.5 rounded border border-navy-border transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setPendingDeleteId(task.id)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* note */}
      <div className="px-3 pb-3">
        <textarea
          value={plan.note}
          onChange={(e) => onNoteChange(dayIdx, e.target.value)}
          placeholder="Not ekle..."
          rows={2}
          className="w-full text-xs bg-navy/40 border border-navy-border rounded-lg px-2.5 py-2 text-text-secondary placeholder:text-text-muted outline-none focus:border-gold/30 resize-none transition-colors"
        />
      </div>
    </motion.div>
  );
}

/* ── main page ──────────────────────────────────────────────── */
export default function WochenplanPage() {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d;
  });

  const weekKey = getWeekKey(weekStart);
  const weekDates = getWeekDates(weekStart);

  const [allPlans, setAllPlans] = useState<Record<string, WeekPlan>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("wochenplan");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // DB'den bu haftayı yükle (localStorage boşsa veya geride kalmışsa)
  useEffect(() => {
    fetch(`/api/wochenplan?weekKey=${weekKey}`)
      .then((r) => r.json())
      .then(({ data }) => {
        if (!data || data === "{}") return;
        const dbPlan: WeekPlan = JSON.parse(data);
        setAllPlans((prev) => {
          const merged = { ...prev, [weekKey]: dbPlan };
          localStorage.setItem("wochenplan", JSON.stringify(merged));
          return merged;
        });
      })
      .catch(() => {});
  }, [weekKey]);

  const weekPlan: WeekPlan = allPlans[weekKey] ?? Object.fromEntries(
    DAYS_DE.map((_, i) => [i, { tasks: [], note: "" }])
  );

  function saveWeek(updated: WeekPlan) {
    const next = { ...allPlans, [weekKey]: updated };
    setAllPlans(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("wochenplan", JSON.stringify(next));
    }
    fetch("/api/wochenplan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekKey, data: JSON.stringify(updated) }),
    }).catch(() => {});
  }

  const [modal, setModal] = useState<{ dayIdx: number; date: Date } | null>(null);

  function openAdd(dayIdx: number, date: Date) { setModal({ dayIdx, date }); }

  function addTask(task: Task) {
    if (!modal) return;
    const day = weekPlan[modal.dayIdx] ?? { tasks: [], note: "" };
    saveWeek({ ...weekPlan, [modal.dayIdx]: { ...day, tasks: [...day.tasks, task] } });
  }

  function toggleTask(dayIdx: number, taskId: string) {
    const day = weekPlan[dayIdx] ?? { tasks: [], note: "" };
    saveWeek({
      ...weekPlan,
      [dayIdx]: { ...day, tasks: day.tasks.map((t) => t.id === taskId ? { ...t, done: !t.done } : t) },
    });
  }

  function deleteTask(dayIdx: number, taskId: string) {
    const day = weekPlan[dayIdx] ?? { tasks: [], note: "" };
    saveWeek({ ...weekPlan, [dayIdx]: { ...day, tasks: day.tasks.filter((t) => t.id !== taskId) } });
  }

  function changeNote(dayIdx: number, note: string) {
    const day = weekPlan[dayIdx] ?? { tasks: [], note: "" };
    saveWeek({ ...weekPlan, [dayIdx]: { ...day, note } });
  }

  function prevWeek() {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  }
  function nextWeek() {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  }
  function goToday() {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    setWeekStart(d);
  }

  const isCurrentWeek = weekKey === getWeekKey(today);

  const totalTasks  = Object.values(weekPlan).reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks   = Object.values(weekPlan).reduce((s, d) => s + d.tasks.filter((t) => t.done).length, 0);
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">

      {/* ── HEADER ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-6 md:p-8"
      >
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gold/20 rounded-2xl flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-text-primary">Haftalık Plan</h1>
                <p className="text-text-muted text-xs">Haftalık çalışma planın</p>
              </div>
            </div>
            {totalTasks > 0 && (
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 bg-navy-border rounded-full h-2 max-w-xs">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-2 rounded-full ${pct === 100 ? "bg-green-400" : "bg-gold"}`}
                  />
                </div>
                <span className={`text-sm font-bold ${pct === 100 ? "text-green-400" : "text-gold"}`}>
                  {doneTasks}/{totalTasks} tamamlandı
                </span>
                {pct === 100 && <span className="text-lg">🎉</span>}
              </div>
            )}
          </div>

          {/* week nav */}
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={prevWeek}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-navy border border-navy-border text-text-muted hover:text-text-primary hover:border-gold/30 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center min-w-[140px]">
              <p className="text-text-primary font-semibold text-sm">
                {formatDate(weekDates[0])} – {formatDate(weekDates[6])}
              </p>
              <p className="text-text-muted text-xs">{weekDates[0].getFullYear()}</p>
            </div>
            <button onClick={nextWeek}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-navy border border-navy-border text-text-muted hover:text-text-primary hover:border-gold/30 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
            {!isCurrentWeek && (
              <button onClick={goToday}
                className="px-3 py-2 bg-gold/20 text-gold border border-gold/30 rounded-xl text-xs font-semibold hover:bg-gold/30 transition-colors">
                Bu Hafta
              </button>
            )}
          </div>
        </div>

        {/* mini week bar */}
        <div className="flex gap-1.5 mt-5">
          {weekDates.map((d, i) => {
            const dayPlan = weekPlan[i] ?? { tasks: [], note: "" };
            const done = dayPlan.tasks.filter((t) => t.done).length;
            const tot  = dayPlan.tasks.length;
            const isT  = isTodayDate(d);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className={`text-[10px] font-bold ${isT ? "text-gold" : "text-text-muted"}`}>{DAYS_SHORT[i]}</span>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isT ? "bg-gold/20" : "bg-navy-border"}`}>
                  {tot > 0 && (
                    <div
                      className={`h-full rounded-full ${done === tot ? "bg-green-400" : isT ? "bg-gold" : "bg-text-muted"}`}
                      style={{ width: `${(done / tot) * 100}%` }}
                    />
                  )}
                </div>
                <span className={`text-[9px] ${isT ? "text-gold" : "text-text-muted"}`}>{formatDate(d)}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── CATEGORY LEGEND ──────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <div key={c.id} className={`flex items-center gap-1.5 px-2.5 py-1 ${c.bg} border ${c.border} rounded-full text-xs font-semibold ${c.color}`}>
            <c.icon className="w-3 h-3" />{c.label}
          </div>
        ))}
      </div>

      {/* ── CALENDAR GRID ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {DAYS_DE.map((_, dayIdx) => (
          <DayCard
            key={dayIdx}
            dayIdx={dayIdx}
            date={weekDates[dayIdx]}
            plan={weekPlan[dayIdx] ?? { tasks: [], note: "" }}
            onAddTask={openAdd}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onNoteChange={changeNote}
          />
        ))}
      </div>

      {/* ── ADD TASK MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <AddTaskModal
            dayIdx={modal.dayIdx}
            dayDate={modal.date}
            onAdd={addTask}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
