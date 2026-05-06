"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Trophy, TrendingUp, Target, BookOpen } from "lucide-react";

interface StatsGridProps {
  currentLevel: string;
  levelProgress: number;
  examReadiness: number;
  examCount: number;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 22 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("tr-TR") + suffix);

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  return <motion.span>{display}</motion.span>;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export function StatsGrid({ currentLevel, levelProgress, examReadiness, examCount }: StatsGridProps) {
  const items = [
    {
      label: "Mevcut Seviye",
      value: currentLevel,
      isText: true,
      sub: "Almanca Sertifika",
      icon: Trophy,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Seviye İlerlemesi",
      value: levelProgress,
      isText: false,
      sub: `${currentLevel} seviyesi`,
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      suffix: "%",
    },
    {
      label: "Sınav Hazırlığı",
      value: examReadiness,
      isText: false,
      sub: "Ortalama beceri skoru",
      icon: Target,
      color: "text-green-400",
      bg: "bg-green-500/10",
      suffix: "%",
    },
    {
      label: "Mock Sınavlar",
      value: examCount,
      isText: false,
      sub: "Tamamlanan",
      icon: BookOpen,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ label, value, isText, sub, icon: Icon, color, bg, suffix }, i) => (
        <motion.div
          key={label}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="h-full">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {isText ? (value as string) : (
                <><AnimatedNumber value={value as number} />{suffix && <span className="text-lg">{suffix}</span>}</>
              )}
            </p>
            <p className="text-xs text-text-muted mt-0.5">{sub}</p>
            <p className="text-sm text-text-secondary mt-1">{label}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
