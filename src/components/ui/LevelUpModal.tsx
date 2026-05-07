"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const LEVEL_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  A2: { bg: "bg-blue-500/20",   border: "border-blue-500/40",   text: "text-blue-400",   glow: "shadow-blue-500/20" },
  B1: { bg: "bg-violet-500/20", border: "border-violet-500/40", text: "text-violet-400", glow: "shadow-violet-500/20" },
  B2: { bg: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-400", glow: "shadow-orange-500/20" },
  C1: { bg: "bg-gold/20",       border: "border-gold/40",       text: "text-gold",       glow: "shadow-gold/20" },
};

const LEVEL_MESSAGES: Record<string, string> = {
  A2: "Temel iletişim becerisine ulaştın. Artık günlük konuşmalarda çok daha güçlüsün!",
  B1: "Orta seviyeye geçtin. Seyahat ve güncel konularda bağımsız iletişim kurabilirsin!",
  B2: "İleri orta seviye! Karmaşık metinleri anlayabilir, akıcı konuşabilirsin.",
  C1: "Zirveye ulaştın! Akademik ve profesyonel ortamlarda ustaca iletişim kurabilirsin.",
};

interface LevelUpModalProps {
  newLevel: string;
  onClose: () => void;
}

function Particle({ delay }: { delay: number }) {
  const x = (Math.random() - 0.5) * 300;
  const y = (Math.random() - 0.5) * 300;
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gold"
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{ opacity: 0, x, y, scale: 0 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

export function LevelUpModal({ newLevel, onClose }: LevelUpModalProps) {
  const col = LEVEL_COLORS[newLevel] ?? LEVEL_COLORS.C1;
  const message = LEVEL_MESSAGES[newLevel] ?? "Yeni seviyeye ulaştın!";
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className={`relative w-full max-w-sm bg-navy-card border ${col.border} rounded-3xl p-8 text-center shadow-2xl ${col.glow} overflow-hidden`}
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {/* Particles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map((i) => (
              <Particle key={i} delay={i * 0.04} />
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-navy border border-navy-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon */}
          <motion.div
            className={`w-24 h-24 ${col.bg} rounded-full flex items-center justify-center mx-auto mb-6 border ${col.border}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
          >
            <Trophy className={`w-12 h-12 ${col.text}`} />
          </motion.div>

          {/* Texts */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-2">
              Seviye Atladın!
            </p>
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${col.bg} border ${col.border} mb-4`}>
              <Star className={`w-5 h-5 ${col.text}`} />
              <span className={`text-3xl font-black ${col.text}`}>{newLevel}</span>
              <Star className={`w-5 h-5 ${col.text}`} />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {message}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Link
              href="/learn"
              onClick={onClose}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${col.bg} ${col.text} border ${col.border} hover:opacity-80`}
            >
              <Zap className="w-4 h-4" />
              {newLevel} Derslerine Git
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              Kapat
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
