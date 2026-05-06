"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WelcomeBannerProps {
  userName: string;
  streak: number;
  currentLevel: string;
  continueUnit: string;
}

export function WelcomeBanner({ userName, streak, currentLevel, continueUnit }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-to-r from-navy-card to-navy-light border border-navy-border rounded-xl p-6 flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          Merhaba, {userName}! 👋
        </h1>
        {streak > 0 ? (
          <p className="text-text-secondary flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-semibold">{streak} günlük</span>
            {" "}serindesiniz. Bugün de devam edin!
          </p>
        ) : (
          <p className="text-text-secondary">Çalışmaya başlamak için hazır mısın?</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-text-muted mb-1">Mevcut ünite</p>
          <p className="text-sm font-medium text-text-primary">{continueUnit}</p>
        </div>
        <Button asChild>
          <Link href="/learn" className="flex items-center gap-2">
            Devam Et
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
