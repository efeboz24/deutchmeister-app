"use client";

import { useRouter } from "next/navigation";
import { BookOpen, ChevronRight } from "lucide-react";

interface LevelCount {
  name: string;
  count: number;
}

const LEVEL_COLORS: Record<string, string> = {
  A1: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20",
  A2: "text-blue-400 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20",
  B1: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20",
  B2: "text-orange-400 border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20",
  C1: "text-red-400 border-red-500/30 bg-red-500/10 hover:bg-red-500/20",
};

interface LevelBrowserProps {
  levelCounts: LevelCount[];
}

export function LevelBrowser({ levelCounts }: LevelBrowserProps) {
  const router = useRouter();

  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-gold" />
        <h3 className="text-sm font-semibold text-text-primary">Kelime Listesi</h3>
      </div>
      <div className="flex flex-col gap-2">
        {levelCounts.map((lvl) => (
          <button
            key={lvl.name}
            onClick={() => router.push(`/vocabulary/browse/${lvl.name}`)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all duration-200 ${
              LEVEL_COLORS[lvl.name] ?? "text-text-secondary border-navy-border bg-navy-light hover:bg-navy-border"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{lvl.name}</span>
              <span className="text-xs opacity-70">{lvl.count} kelime</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        ))}
      </div>
      <p className="text-xs text-text-muted mt-3 text-center">
        Tüm kelimeleri görmek için tıkla
      </p>
    </div>
  );
}
