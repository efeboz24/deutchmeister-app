"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, CheckCircle2, Circle, Plus, ExternalLink } from "lucide-react";

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
type AllPlans = Record<string, WeekPlan>;

const DAYS_DE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const DAYS_TR = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

const CAT_COLORS: Record<Category, string> = {
  grammatik: "text-skill-grammatik",
  lesen:     "text-skill-lesen",
  hören:     "text-skill-horen",
  schreiben: "text-skill-schreiben",
  sprechen:  "text-skill-sprechen",
  vokabeln:  "text-amber-400",
  sınav:     "text-red-400",
  serbest:   "text-text-muted",
};

const PRI_DOT: Record<Priority, string> = {
  high:   "bg-red-400",
  medium: "bg-amber-400",
  low:    "bg-green-400",
};

function getWeekKey(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toISOString().split("T")[0];
}

function formatDate(d: Date) {
  return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1).toString().padStart(2, "0")}`;
}

export function TodayWochenplan() {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todayIdx, setTodayIdx] = useState(0);
  const [todayDate, setTodayDate] = useState("");
  const [weekKey, setWeekKey] = useState("");

  useEffect(() => {
    const today = new Date();
    const dayIdx = (today.getDay() + 6) % 7;
    const wk = getWeekKey(today);
    setTodayIdx(dayIdx);
    setTodayDate(formatDate(today));
    setWeekKey(wk);

    try {
      const raw = localStorage.getItem("wochenplan");
      if (raw) {
        const all: AllPlans = JSON.parse(raw);
        const dayPlan: DayPlan = all[wk]?.[dayIdx] ?? { tasks: [], note: "" };
        setTasks(dayPlan.tasks);
      }
    } catch {
      setTasks([]);
    }
    setMounted(true);

    // DB'den taze veriyi çek (localStorage'dan sonra override et)
    fetch(`/api/wochenplan?weekKey=${wk}`)
      .then((r) => r.json())
      .then(({ data }) => {
        if (!data || data === "{}") return;
        const dbWeekPlan: WeekPlan = JSON.parse(data);
        const dayPlan: DayPlan = dbWeekPlan[dayIdx] ?? { tasks: [], note: "" };
        setTasks(dayPlan.tasks);
        // localStorage'ı da güncelle
        const raw = localStorage.getItem("wochenplan");
        const all: AllPlans = raw ? JSON.parse(raw) : {};
        localStorage.setItem("wochenplan", JSON.stringify({ ...all, [wk]: dbWeekPlan }));
      })
      .catch(() => {});
  }, []);

  function toggleTask(taskId: string) {
    const updated = tasks.map((t) => t.id === taskId ? { ...t, done: !t.done } : t);
    setTasks(updated);

    try {
      const raw = localStorage.getItem("wochenplan");
      const all: AllPlans = raw ? JSON.parse(raw) : {};
      const weekPlan: WeekPlan = all[weekKey] ?? {};
      const dayPlan: DayPlan = weekPlan[todayIdx] ?? { tasks: [], note: "" };
      const next: AllPlans = {
        ...all,
        [weekKey]: {
          ...weekPlan,
          [todayIdx]: { ...dayPlan, tasks: updated },
        },
      };
      localStorage.setItem("wochenplan", JSON.stringify(next));
    } catch { /* ignore */ }
  }

  if (!mounted) return null;

  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-navy-card border border-gold/20 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-gold/8 border-b border-gold/15 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gold/20 rounded-lg flex items-center justify-center">
            <CalendarDays className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <p className="text-text-primary font-bold text-sm leading-none">{DAYS_DE[todayIdx]}</p>
            <p className="text-text-muted text-[10px] mt-0.5">{DAYS_TR[todayIdx]} · {todayDate}</p>
          </div>
        </div>
        <Link
          href="/wochenplan"
          className="flex items-center gap-1 text-[10px] text-text-muted hover:text-gold transition-colors font-medium"
        >
          Tümü <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="h-1 bg-navy-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-1 ${pct === 100 ? "bg-green-400" : "bg-gold"}`}
          />
        </div>
      )}

      {/* Tasks */}
      <div className="p-3 space-y-1.5">
        {total === 0 ? (
          <Link
            href="/wochenplan"
            className="flex flex-col items-center gap-1.5 py-4 border border-dashed border-navy-border rounded-xl text-text-muted hover:border-gold/30 hover:text-text-secondary transition-all group"
          >
            <Plus className="w-4 h-4 group-hover:text-gold transition-colors" />
            <span className="text-xs">Bugün için görev yok</span>
            <span className="text-[10px] text-gold/70">Haftalık Plan'a git →</span>
          </Link>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                    task.done
                      ? "bg-navy/30 border-navy-border opacity-60"
                      : "bg-navy/50 border-navy-border hover:border-gold/20"
                  }`}
                >
                  <button onClick={() => toggleTask(task.id)} className="shrink-0">
                    {task.done
                      ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                      : <Circle className={`w-4 h-4 ${CAT_COLORS[task.category]}`} />
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-medium ${task.done ? "line-through text-text-muted" : "text-text-primary"}`}>
                      {task.time && <span className="text-text-muted font-mono mr-1">{task.time}</span>}
                      {task.text}
                    </span>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${PRI_DOT[task.priority]}`} />
                </motion.div>
              ))}
            </AnimatePresence>

            {total > 0 && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-text-muted">{done}/{total} tamamlandı</span>
                {pct === 100 && <span className="text-[10px] text-green-400 font-semibold">Harika! 🎉</span>}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
