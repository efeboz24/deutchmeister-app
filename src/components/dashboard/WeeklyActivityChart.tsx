"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

const DAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

interface WeeklyActivityChartProps {
  sessions: { date: Date | string; minutesWorked: number }[];
  goalMinutes?: number;
}

export function WeeklyActivityChart({ sessions, goalMinutes = 420 }: WeeklyActivityChartProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const today = new Date();
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dayMinutes = sessions
      .filter((s) => {
        const sd = new Date(s.date);
        return (
          sd.getDate() === d.getDate() &&
          sd.getMonth() === d.getMonth() &&
          sd.getFullYear() === d.getFullYear()
        );
      })
      .reduce((sum, s) => sum + s.minutesWorked, 0);
    return { day: DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1], minutes: dayMinutes };
  });

  const maxMinutes = Math.max(...weekData.map((d) => d.minutes), 60);
  const totalMinutes = weekData.reduce((sum, d) => sum + d.minutes, 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Bu Haftaki Çalışma</CardTitle>
          <div className="text-right">
            <p className="text-xs text-text-muted">Toplam</p>
            <p className="text-sm font-semibold text-text-primary">{totalMinutes} dk</p>
          </div>
        </CardHeader>

        <div className="flex items-end gap-2 h-28">
          {weekData.map(({ day, minutes }, i) => {
            const heightPct = (minutes / maxMinutes) * 100;
            const isToday = i === 6;
            const barH = Math.max(heightPct, minutes > 0 ? 8 : 4);
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative flex items-end" style={{ height: "88px" }}>
                  <motion.div
                    className={`w-full rounded-t-sm ${
                      isToday ? "bg-gold" : minutes > 0 ? "bg-skill-horen/60" : "bg-navy-border"
                    }`}
                    initial={{ height: "4%" }}
                    animate={inView ? { height: `${barH}%` } : { height: "4%" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 + i * 0.06 }}
                    title={`${minutes} dk`}
                  />
                </div>
                <span className={`text-xs ${isToday ? "text-gold font-semibold" : "text-text-muted"}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 pt-3 border-t border-navy-border flex items-center justify-between">
          <span className="text-xs text-text-muted">Hedef: {goalMinutes} dk/hafta</span>
          <span className={`text-xs font-medium ${totalMinutes >= goalMinutes ? "text-green-400" : "text-text-secondary"}`}>
            {totalMinutes >= goalMinutes ? "Hedef tamamlandı! 🎉" : `${goalMinutes - totalMinutes} dk kaldı`}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
