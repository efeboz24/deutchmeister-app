"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import type { ExamResult } from "@/types";

interface RecentExamsProps {
  exams: ExamResult[];
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(date)
  );
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.35 },
  }),
};

export function RecentExams({ exams }: RecentExamsProps) {
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
          <CardTitle>Son Sınavlar</CardTitle>
          <Button asChild size="sm" variant="secondary">
            <Link href="/exam" className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              Yeni Sınav
            </Link>
          </Button>
        </CardHeader>

        {exams.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-muted text-sm">Henüz sınav girmediniz.</p>
            <p className="text-text-muted text-xs mt-1">İlk sınavınızı başlatın!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {exams.map((exam, i) => (
              <motion.div
                key={exam.id}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex items-center justify-between p-3 bg-navy rounded-lg border border-navy-border hover:border-navy-border/80 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{exam.examName}</p>
                  <p className="text-xs text-text-muted">{formatDate(exam.attemptDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${exam.passed ? "text-green-400" : "text-red-400"}`}>
                    %{Math.round(exam.score)}
                  </span>
                  <Badge variant={exam.passed ? "success" : "error"}>
                    {exam.passed ? "Geçti" : "Kaldı"}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
