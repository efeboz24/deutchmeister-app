"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Headphones, BookOpen, PenLine, Mic, Layers, BarChart3, ArrowRight, X, ChevronRight } from "lucide-react";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

const LEVEL_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  A1: { bg: "bg-emerald-500/10", border: "border-emerald-500/30 hover:border-emerald-500/60", text: "text-emerald-400" },
  A2: { bg: "bg-blue-500/10",    border: "border-blue-500/30 hover:border-blue-500/60",    text: "text-blue-400" },
  B1: { bg: "bg-violet-500/10",  border: "border-violet-500/30 hover:border-violet-500/60",  text: "text-violet-400" },
  B2: { bg: "bg-orange-500/10",  border: "border-orange-500/30 hover:border-orange-500/60",  text: "text-orange-400" },
  C1: { bg: "bg-gold/10",        border: "border-gold/30 hover:border-gold/60",        text: "text-gold" },
};

const skillTools = [
  {
    slug: "listening",
    icon: Headphones,
    title: "Hören",
    description: "Gerçek sınav formatında dinleme alıştırmaları.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
    hasLevel: true,
  },
  {
    slug: "reading",
    icon: BookOpen,
    title: "Lesen",
    description: "Gazete haberleri ve duyurularla okuma becerisi.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "hover:border-green-500/40",
    hasLevel: true,
  },
  {
    slug: "writing",
    icon: PenLine,
    title: "Schreiben",
    description: "E-posta ve mektup yazma. Claude AI değerlendirmesi.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "hover:border-yellow-500/40",
    hasLevel: true,
  },
  {
    slug: "speaking",
    icon: Mic,
    title: "Sprechen",
    description: "Mikrofon ile konuşma pratiği. Yapay zeka analizi.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/40",
    hasLevel: true,
  },
];

const otherTools = [
  {
    href: "/vocabulary",
    icon: Layers,
    title: "Spaced Repetition",
    description: "SM-2 algoritmasıyla kelime kartları. Doğru zamanda doğru tekrar.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "hover:border-teal-500/40",
  },
  {
    href: "/dashboard",
    icon: BarChart3,
    title: "İlerleme Analizi",
    description: "Beceri bazlı analiz, streak sayacı ve haftalık çalışma raporları.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
];

const AVAILABLE: Record<string, string[]> = {
  listening: ["A1", "A2", "B1", "B2", "C1"],
  reading: ["A1", "A2", "B1", "B2", "C1"],
  writing: ["A1", "A2", "B1", "B2", "C1"],
};

export default function PracticePage() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const activeSkillData = skillTools.find((t) => t.slug === activeSkill);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Pratik Araçları</h1>
        <p className="text-text-secondary">Hangi beceriyi geliştirmek istiyorsun?</p>
      </div>

      {/* Skill cards (Hören, Lesen, Schreiben, Sprechen) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillTools.map(({ slug, icon: Icon, title, description, color, bg, border }) => {
          const isActive = activeSkill === slug;
          return (
            <button
              key={slug}
              onClick={() => setActiveSkill(isActive ? null : slug)}
              className={`text-left bg-navy-card border rounded-xl p-6 transition-all duration-200 group cursor-pointer ${
                isActive
                  ? "border-gold/50 bg-gold/5"
                  : `border-navy-border ${border}`
              }`}
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              <div className={`flex items-center gap-1 text-sm font-medium mt-3 ${isActive ? "text-gold opacity-100" : `${color} opacity-0 group-hover:opacity-100`} transition-opacity`}>
                {isActive ? "Seviye seç ↓" : "Seviye seç"} <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Level selector panel */}
      <AnimatePresence>
        {activeSkill && activeSkillData && (
          <motion.div
            key={activeSkill}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="bg-navy-card border border-gold/30 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <activeSkillData.icon className={`w-5 h-5 ${activeSkillData.color}`} />
                <span className="font-bold text-text-primary">
                  {activeSkillData.title} — Seviye Seç
                </span>
              </div>
              <button
                onClick={() => setActiveSkill(null)}
                className="w-7 h-7 rounded-lg bg-navy border border-navy-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {LEVELS.map((level) => {
                const lc = LEVEL_COLORS[level];
                const isAvailable = AVAILABLE[activeSkill]?.includes(level);
                if (isAvailable) {
                  return (
                    <div key={level} className="relative group">
                      <Link
                        href={`/practice/${activeSkill}/${level.toLowerCase()}`}
                        className={`w-full py-3 rounded-xl border font-bold text-sm transition-all duration-200 ${lc.bg} ${lc.border} ${lc.text} flex flex-col items-center gap-1 hover:scale-105`}
                      >
                        {level}
                        <span className="text-[9px] font-normal opacity-80">Başla →</span>
                      </Link>
                    </div>
                  );
                }
                return (
                  <div key={level} className="relative group">
                    <button
                      className={`w-full py-3 rounded-xl border font-bold text-sm transition-all duration-200 ${lc.bg} ${lc.border} ${lc.text} flex flex-col items-center gap-1 cursor-not-allowed opacity-50`}
                      disabled
                    >
                      {level}
                    </button>
                  </div>
                );
              })}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Other tools */}
      <div>
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Diğer Araçlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherTools.map(({ href, icon: Icon, title, description, color, bg, border }) => (
            <Link
              key={href}
              href={href}
              className={`block bg-navy-card border border-navy-border rounded-xl p-6 transition-all duration-200 group ${border}`}
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">{description}</p>
              <div className={`flex items-center gap-1 text-sm font-medium ${color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                Başla <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
