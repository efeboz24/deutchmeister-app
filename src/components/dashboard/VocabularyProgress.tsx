"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface VocabularyProgressProps {
  learned: number;
  goal: number;
  level: string;
}

export function VocabularyProgress({ learned, goal, level }: VocabularyProgressProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const percent = goal > 0 ? Math.round((learned / goal) * 100) : 0;
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const targetOffset = circumference - (Math.min(percent, 100) / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Kelime Hazinesi</CardTitle>
        </CardHeader>

        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50" cy="50" r={r}
                fill="none"
                stroke="#243650"
                strokeWidth="10"
              />
              <motion.circle
                cx="50" cy="50" r={r}
                fill="none"
                stroke="#F5A623"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={inView ? { strokeDashoffset: targetOffset } : { strokeDashoffset: circumference }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-text-primary">{percent}%</span>
            </div>
          </div>

          <p className="text-sm text-text-secondary text-center mb-1">
            <span className="font-semibold text-text-primary">{learned}</span> / {goal} kelime
          </p>
          <p className="text-xs text-text-muted mb-4">{level} hedefinin {percent}%&apos;ine ulaştınız</p>

          <Button asChild variant="secondary" size="sm" className="w-full">
            <Link href="/vocabulary" className="flex items-center justify-center gap-2">
              Kelime Çalış <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
