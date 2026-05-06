"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { SkillScore } from "@/types";

interface SkillProgressPanelProps {
  skills: SkillScore[];
}

const SKILL_CONFIG: Record<string, { label: string; color: string }> = {
  horen:     { label: "Hören (Dinleme)",  color: "bg-skill-horen" },
  lesen:     { label: "Lesen (Okuma)",    color: "bg-skill-lesen" },
  schreiben: { label: "Schreiben (Yazma)", color: "bg-skill-schreiben" },
  sprechen:  { label: "Sprechen (Konuşma)", color: "bg-skill-sprechen" },
  grammatik: { label: "Grammatik",        color: "bg-skill-grammatik" },
};

export function SkillProgressPanel({ skills }: SkillProgressPanelProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Beceri Puanlarım</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {skills.map(({ skill, score }, i) => {
            const config = SKILL_CONFIG[skill];
            if (!config) return null;
            return (
              <div key={skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-text-secondary">{config.label}</span>
                  <span className="text-sm font-semibold text-text-primary">{Math.round(score)}%</span>
                </div>
                <div className="h-2 bg-navy-border rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${config.color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${score}%` } : { width: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
