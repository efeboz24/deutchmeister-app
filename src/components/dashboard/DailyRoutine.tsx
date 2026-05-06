"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, BookMarked, PenLine, MessageSquarePlus, Flame, Plus, Trash2, X, Check } from "lucide-react";

interface DefaultRoutineTask {
  id: string;
  label: string;
  icon: React.ElementType;
  link?: string;
  iconColor: string;
  isDefault: true;
}

interface CustomRoutineTask {
  id: string;
  label: string;
  isDefault: false;
}

type RoutineTask = DefaultRoutineTask | CustomRoutineTask;

const DEFAULT_TASKS: DefaultRoutineTask[] = [
  {
    id: "vocab",
    label: "10 kelime öğren",
    icon: BookMarked,
    link: "/vocabulary",
    iconColor: "text-amber-400",
    isDefault: true,
  },
  {
    id: "letter",
    label: "1 mektup yaz",
    icon: PenLine,
    iconColor: "text-blue-400",
    isDefault: true,
  },
  {
    id: "sentences",
    label: "Öğrenilen kelimelerle 10 cümle yaz",
    icon: MessageSquarePlus,
    link: "/gunluk-rutin/cumleler",
    iconColor: "text-skill-schreiben",
    isDefault: true,
  },
];

const CUSTOM_TASKS_KEY = "dailyRoutine_customTasks";
const HIDDEN_DEFAULTS_KEY = "dailyRoutine_hiddenDefaults";

function getTodayKey() {
  const d = new Date();
  return `dailyRoutine_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function DailyRoutine() {
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [customTasks, setCustomTasks] = useState<CustomRoutineTask[]>([]);
  const [hiddenDefaults, setHiddenDefaults] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecked(loadJSON(getTodayKey(), {}));
    setCustomTasks(loadJSON<CustomRoutineTask[]>(CUSTOM_TASKS_KEY, []));
    setHiddenDefaults(loadJSON<string[]>(HIDDEN_DEFAULTS_KEY, []));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  function toggle(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem(getTodayKey(), JSON.stringify(next)); } catch { /* ignore */ }
  }

  function deleteTask(id: string, isDefault: boolean) {
    if (isDefault) {
      const next = [...hiddenDefaults, id];
      setHiddenDefaults(next);
      try { localStorage.setItem(HIDDEN_DEFAULTS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    } else {
      const next = customTasks.filter((t) => t.id !== id);
      setCustomTasks(next);
      try { localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    }
    // Also remove from checked
    const nextChecked = { ...checked };
    delete nextChecked[id];
    setChecked(nextChecked);
    try { localStorage.setItem(getTodayKey(), JSON.stringify(nextChecked)); } catch { /* ignore */ }
  }

  function addCustomTask() {
    const label = newLabel.trim();
    if (!label) { setAdding(false); return; }
    const task: CustomRoutineTask = { id: `custom-${Date.now()}`, label, isDefault: false };
    const next = [...customTasks, task];
    setCustomTasks(next);
    try { localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setNewLabel("");
    setAdding(false);
  }

  if (!mounted) return null;

  const visibleDefaults = DEFAULT_TASKS.filter((t) => !hiddenDefaults.includes(t.id));
  const allTasks: RoutineTask[] = [...visibleDefaults, ...customTasks];
  const done = allTasks.filter((t) => checked[t.id]).length;
  const total = allTasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = done === total && total > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-navy-card border border-gold/20 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 bg-gold/8 border-b border-gold/15 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
            <Flame className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="text-text-primary font-bold text-sm leading-none">Günlük Rutin</p>
            <p className="text-text-muted text-[10px] mt-0.5">Her gün tamamla</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${allDone ? "text-green-400" : "text-gold"}`}>
            %{pct}
          </span>
          {allDone && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs text-green-400 font-semibold"
            >
              Tamamlandı!
            </motion.span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-navy-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-1 ${allDone ? "bg-green-400" : "bg-gold"}`}
        />
      </div>

      {/* Tasks */}
      <div className="p-4 space-y-2">
        <AnimatePresence initial={false}>
          {allTasks.map((task) => {
            const isDone = !!checked[task.id];
            const isDefault = task.isDefault;
            const Icon = isDefault ? (task as DefaultRoutineTask).icon : null;
            const iconColor = isDefault ? (task as DefaultRoutineTask).iconColor : "text-text-muted";
            const link = isDefault ? (task as DefaultRoutineTask).link : undefined;

            const rowContent = (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all group/row ${
                  isDone
                    ? "bg-navy/30 border-navy-border opacity-60"
                    : "bg-navy/50 border-navy-border hover:border-gold/30 hover:bg-navy/70"
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggle(task.id); }}
                  className="shrink-0"
                  aria-label={isDone ? "Tamamlanmadı olarak işaretle" : "Tamamlandı olarak işaretle"}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className={`w-5 h-5 ${iconColor}`} />
                  )}
                </button>

                {/* Icon + Label */}
                <div className="flex items-center gap-2 flex-1 min-w-0" onClick={() => toggle(task.id)}>
                  {Icon && (
                    <Icon className={`w-4 h-4 shrink-0 ${isDone ? "text-text-muted" : iconColor}`} />
                  )}
                  {!Icon && (
                    <div className="w-4 h-4 shrink-0 rounded bg-navy-border/60" />
                  )}
                  <span className={`text-sm font-medium truncate ${isDone ? "line-through text-text-muted" : "text-text-primary"}`}>
                    {task.label}
                  </span>
                </div>

                {/* Link indicator (default tasks with link) */}
                {link && !isDone && (
                  <span className="text-[10px] text-gold/70 shrink-0 group-hover/row:text-gold transition-colors">
                    Aç →
                  </span>
                )}

                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteTask(task.id, !!isDefault); }}
                  className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-text-muted opacity-0 group-hover/row:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  aria-label="Görevi sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );

            return link && !isDone ? (
              <Link key={task.id} href={link} onClick={(e) => e.stopPropagation()}>
                {rowContent}
              </Link>
            ) : (
              <div key={task.id}>{rowContent}</div>
            );
          })}
        </AnimatePresence>

        {/* New task input */}
        <AnimatePresence>
          {adding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-gold/30 bg-gold/5">
                <input
                  ref={inputRef}
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addCustomTask();
                    if (e.key === "Escape") { setAdding(false); setNewLabel(""); }
                  }}
                  placeholder="Yeni görev adı..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
                />
                <button
                  onClick={addCustomTask}
                  disabled={!newLabel.trim()}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-green-400 hover:bg-green-500/10 transition-colors disabled:opacity-30"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setAdding(false); setNewLabel(""); }}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-navy-border/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-text-muted">{done}/{total} görev tamamlandı</span>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1 text-[10px] text-text-muted hover:text-gold transition-colors font-medium"
          >
            <Plus className="w-3 h-3" />
            Rutin ekle
          </button>
        </div>
      </div>
    </motion.div>
  );
}
